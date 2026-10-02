import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  useTrackerPluginContext,
  trackerApi,
  storageApi,
  uiApi,
} from '@weavix/tracker-plugin-sdk-react';
import { Button, Table } from '@gravity-ui/uikit';

// --- Глобальные стили ---
const globalStyles = `
  html, body { margin: 0 !important; padding: 0 !important; scrollbar-width: none !important; -ms-overflow-style: none !important; }
  html::-webkit-scrollbar, body::-webkit-scrollbar { display: none !important; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .timer-font {
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
  }
`;

const styleEl = document.createElement('style');
styleEl.textContent = globalStyles;
styleEl.id = 'custom-styles';
if (!document.getElementById('custom-styles')) document.head.appendChild(styleEl);

// --- Типы ---
type TimerState = {
  status: 'idle' | 'running' | 'paused';
  startedAt: number | null;
  accumulatedMs: number;
  totalMs: number;
};

// --- Константы ---
const BG_LIGHT = '#E6E6E6';
const BG_DARK = '#687381';
const USER_ID_KEY = 'runel_user_id';
const TEXT_LIGHT = '#494949';
const TEXT_DARK = '#ECECEC';

function getTextColor(theme: string | undefined): string {
  if (!theme) return TEXT_LIGHT;
  return theme.startsWith('dark') ? TEXT_DARK : TEXT_LIGHT;
}

function getBgColor(theme: string | undefined): string {
  if (!theme) return BG_LIGHT;
  return theme.startsWith('dark') ? BG_DARK : BG_LIGHT;
}

function sanitizeBucket(name: string): string {
  return name.replace(/[^A-Za-z0-9._-]/g, '_');
}

// --- Стили ---
const btnStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
  backgroundColor: 'rgba(255,255,255,0.25)',
  color: 'inherit',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px 10px',
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: '6px',
  backgroundColor: 'rgba(255,255,255,0.5)',
  color: 'inherit',
  fontSize: '13px',
  boxSizing: 'border-box',
};

// --- Утилиты ---
function pad2(num: number): string {
  const s = String(num);
  return s.length === 1 ? '0' + s : s;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds);
}

function formatDurationISO(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  let result = 'PT';
  if (hours > 0) result += hours + 'H';
  if (minutes > 0) result += minutes + 'M';
  if (seconds > 0) result += seconds + 'S';
  return result === 'PT' ? 'PT0S' : result;
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return hours + 'h ' + minutes + 'm';
  return minutes + 'm';
}

function getLocalISOString(): string {
  const d = new Date();
  const tz = d.getTimezoneOffset();
  const sign = tz > 0 ? '-' : '+';
  const tzH = pad2(Math.abs(Math.floor(tz / 60)));
  const tzM = pad2(Math.abs(tz % 60));
  const local = new Date(d.getTime() - tz * 60000);
  return local.toISOString().replace('Z', '') + sign + tzH + ':' + tzM;
}

function extractIssueKey(w: any): string {
  if (w.issue && w.issue.key) return w.issue.key;
  if (w.issueKey) return w.issueKey;
  if (w.issue && typeof w.issue === 'string') return w.issue;
  if (w.self) {
    const m = String(w.self).match(/\/issues\/([^/]+)\/worklog\//);
    if (m) return m[1];
  }
  if (w.issue && w.issue.self) {
    const m = String(w.issue.self).match(/\/issues\/([^/]+)$/);
    if (m) return m[1];
  }
  return '';
}

function parseDurationToMs(w: any): number {
  let val = w.duration;
  if (val == null) return 0;
  if (typeof val === 'number') {
    if (val > 100000) return val;
    if (val > 1000) return val * 1000;
    return val * 60000;
  }
  if (typeof val === 'string') {
    const isoMatch = val.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
    if (isoMatch) {
      const h = parseInt(isoMatch[1] || '0', 10);
      const m = parseInt(isoMatch[2] || '0', 10);
      const s = parseInt(isoMatch[3] || '0', 10);
      return (h * 3600 + m * 60 + s) * 1000;
    }
    const n = parseFloat(val);
    if (!isNaN(n)) return n > 100000 ? n : n * 60000;
  }
  return 0;
}

// --- User ID helpers ---
function saveUserId(id: string) {
  try { localStorage.setItem(USER_ID_KEY, id); } catch (e) { console.warn('localStorage save:', e); }
  try {
    storageApi.orgShared.patch({ bucket: sanitizeBucket(USER_ID_KEY), data: { userId: id } });
  } catch (e) { console.warn('storageApi save:', e); }
}

async function loadUserId(): Promise<string | null> {
  try { const v = localStorage.getItem(USER_ID_KEY); if (v) return v; } catch (e) { console.warn('localStorage get:', e); }
  try {
    const record = await storageApi.orgShared.get(sanitizeBucket(USER_ID_KEY));
    if (record && record.data && (record.data as any).userId) return (record.data as any).userId;
  } catch (e) { console.warn('storageApi get:', e); }
  return null;
}

// --- Storage хук ---
function useTimerStorage(bucketName: string) {
  const bucket = sanitizeBucket(bucketName);
  const loadState = useCallback(async (): Promise<{ timerState: TimerState; taskKey?: string } | null> => {
    try {
      const record = await storageApi.orgShared.get(bucket);
      if (record && record.data) {
        return {
          timerState: (record.data as any).timerState || null,
          taskKey: (record.data as any).taskKey || undefined,
        };
      }
    } catch (e) { console.log('Storage get error:', e); }
    return null;
  }, [bucket]);
  const saveState = useCallback(async (timerState: TimerState, taskKey?: string) => {
    try {
      const data: Record<string, unknown> = { timerState };
      if (taskKey !== undefined) data.taskKey = taskKey;
      await storageApi.orgShared.patch({ bucket, data });
    } catch (e) { console.log('Storage patch error:', e); }
  }, [bucket]);
  return { loadState, saveState };
}

// --- App ---
export default function App() {
  const { slot, slotContext, theme } = useTrackerPluginContext();
  if (slot === 'navigation') return <NavigationPage theme={theme} />;
  if (slot === 'issue.block' || slot === 'drawer.issue.block') {
    const compact = slot === 'drawer.issue.block';
    const issueKey = (slotContext as any)?.entityId || (slotContext as any)?.key || '';
    return <TimerWidget issueKey={issueKey} compact={compact} theme={theme} />;
  }
  return null;
}

// --- TimerWidget ---
function TimerWidget({ issueKey, compact = false, theme }: {
  issueKey: string; compact?: boolean; theme?: string;
}) {
  const [state, setState] = useState<TimerState>({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: 0 });
  const [displayMs, setDisplayMs] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const submitMsRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bucketName = 'issue_' + issueKey;
  const { loadState, saveState } = useTimerStorage(bucketName);
  const bgColor = getBgColor(theme);

  useEffect(() => {
    (async () => {
      const loaded = await loadState();
      if (loaded && loaded.timerState) setState(loaded.timerState);
    })();
  }, [loadState]);

  useEffect(() => {
    if (state.status === 'running' && state.startedAt) {
      tickRef.current = setInterval(() => {
        setDisplayMs(state.accumulatedMs + (Date.now() - state.startedAt!));
      }, 1000);
      return () => { if (tickRef.current) clearInterval(tickRef.current); };
    } else {
      setDisplayMs(state.accumulatedMs);
    }
    return undefined;
  }, [state.status, state.startedAt, state.accumulatedMs]);

  const handleStart = () => {
    const ns: TimerState = { ...state, status: 'running', startedAt: Date.now() };
    setState(ns); saveState(ns);
  };
  const handlePause = () => {
    if (!state.startedAt) return;
    const elapsed = Date.now() - state.startedAt;
    const ns: TimerState = { ...state, status: 'paused', startedAt: null, accumulatedMs: state.accumulatedMs + elapsed };
    setState(ns); saveState(ns);
  };
  const handleResume = () => {
    const ns: TimerState = { ...state, status: 'running', startedAt: Date.now() };
    setState(ns); saveState(ns);
  };
  const handleStop = () => {
    let finalMs = state.accumulatedMs;
    if (state.status === 'running' && state.startedAt) finalMs += Date.now() - state.startedAt;
    submitMsRef.current = finalMs;
    const ns: TimerState = { status: 'idle', startedAt: null, accumulatedMs: finalMs, totalMs: state.totalMs + finalMs };
    setState(ns); saveState(ns);
    setShowForm(true); setComment(''); setErrorMsg('');
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true); setErrorMsg('');
    const ms = submitMsRef.current;
    try {
      const duration = formatDurationISO(ms);
      const startISO = getLocalISOString();
      console.log('Submitting worklog:', { issueKey, duration, startISO, comment });
      const res = await trackerApi.v3.post['/issues/{issue}/worklog']({
        pathParams: { issue: issueKey },
        bodyParams: { start: startISO, duration, comment: comment || undefined },
      });
      console.log('Worklog response:', res);
      const authorId = (res as any)?.data?.createdBy?.id;
      if (authorId) { console.log('Got author ID:', authorId); saveUserId(String(authorId)); }
      setState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs });
      saveState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs });
      setShowForm(false);
      try { uiApi.toaster.add({ title: 'Время отправлено', theme: 'success', content: formatDuration(ms) + ' — ' + issueKey }); }
      catch (te) { console.warn('Toaster:', te); }
    } catch (e: any) {
      const msg = e?.message || 'Не удалось отправить время';
      setErrorMsg(msg);
      try { uiApi.toaster.add({ title: 'Ошибка отправки worklog', theme: 'danger', content: msg }); }
      catch (te) { console.warn('Toaster:', te); }
    } finally {
      setSubmitting(false);
    }
  };

  const isRunning = state.status === 'running';
  const isPaused = state.status === 'paused';
  const submitMs = submitMsRef.current;

  if (compact) {
    return (
      <div className="no-scrollbar" style={{ padding: '8px 12px', backgroundColor: bgColor, color: getTextColor(theme), overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        <div className="timer-font" style={{ fontSize: '22px', fontWeight: 600, textAlign: 'center', marginBottom: '8px' }}>{formatTime(displayMs)}</div>
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {state.status === 'idle' && <button onClick={handleStart} style={btnStyle}>▶ Старт</button>}
          {isRunning && <button onClick={handlePause} style={btnStyle}>⏸ Пауза</button>}
          {isPaused && <button onClick={handleResume} style={btnStyle}>▶ Продолжить</button>}
          {(isRunning || isPaused) && <button onClick={handleStop} style={btnStyle}>⏹ Стоп</button>}
        </div>
        {showForm && (
          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px' }}>
            <div className="timer-font" style={{ fontSize: '20px', fontWeight: 600, textAlign: 'center', marginBottom: '8px' }}>{formatTime(submitMs)}</div>
            {errorMsg && <div style={{ color: '#c62828', fontSize: '13px', padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '6px', marginBottom: '12px' }}>{errorMsg}</div>}
            <div style={{ fontSize: '13px', opacity: 0.7, marginBottom: '6px' }}>Комментарий (необязательно):</div>
            <input type="text" placeholder="Что было сделано?" value={comment} onChange={(e) => setComment(e.target.value)} style={inputStyle} autoFocus />
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button view="flat" onClick={() => setShowForm(false)} disabled={submitting}>Отмена</Button>
              <Button view="action" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Отправка…' : 'Отправить'}</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="no-scrollbar" style={{ padding: '16px', backgroundColor: bgColor, color: getTextColor(theme), overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      <div className="timer-font" style={{ fontSize: '28px', fontWeight: 600 }}>{formatTime(displayMs)}</div>
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        {state.status === 'idle' && <button onClick={handleStart} style={btnStyle}>▶ Старт</button>}
        {isRunning && <button onClick={handlePause} style={btnStyle}>⏸ Пауза</button>}
        {isPaused && <button onClick={handleResume} style={btnStyle}>▶ Продолжить</button>}
        {(isRunning || isPaused) && <button onClick={handleStop} style={btnStyle}>⏹ Стоп</button>}
      </div>
      {showForm && (
        <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px' }}>
          <div className="timer-font" style={{ fontSize: '24px', fontWeight: 600, textAlign: 'center', marginBottom: '12px' }}>{formatTime(submitMs)}</div>
          {errorMsg && <div style={{ color: '#c62828', fontSize: '13px', padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '6px', marginBottom: '12px' }}>{errorMsg}</div>}
          <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>Комментарий к работе:</div>
          <input type="text" placeholder="Что было сделано?" value={comment} onChange={(e) => setComment(e.target.value)} style={inputStyle} autoFocus />
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button view="flat" onClick={() => setShowForm(false)} disabled={submitting}>Отмена</Button>
            <Button view="action" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Отправка…' : 'Отправить'}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- NavigationPage ---
function NavigationPage({ theme }: { theme?: string }) {
  const [view, setView] = useState<'timer' | 'reports'>('timer');
  const bgColor = getBgColor(theme);
  return (
    <div className="no-scrollbar" style={{ backgroundColor: bgColor, color: getTextColor(theme), minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <button onClick={() => setView('timer')} style={{ padding: '10px 20px', border: 'none', borderBottom: view === 'timer' ? '2px solid #333' : '2px solid transparent', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: view === 'timer' ? 600 : 400, color: 'inherit' }}>⏱ Таймер</button>
        <button onClick={() => setView('reports')} style={{ padding: '10px 20px', border: 'none', borderBottom: view === 'reports' ? '2px solid #333' : '2px solid transparent', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: view === 'reports' ? 600 : 400, color: 'inherit' }}>📋 Отчёты</button>
      </div>
      {view === 'timer' ? <GlobalTimer /> : <ReportsView />}
    </div>
  );
}

// --- GlobalTimer ---
function GlobalTimer() {
  const [state, setState] = useState<TimerState>({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: 0 });
  const [displayMs, setDisplayMs] = useState(0);
  const [taskKey, setTaskKey] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const submitMsRef = useRef(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { loadState, saveState } = useTimerStorage('global_timer');

  useEffect(() => {
    (async () => {
      const loaded = await loadState();
      if (loaded && loaded.timerState) setState(loaded.timerState);
      if (loaded && loaded.taskKey) setTaskKey(loaded.taskKey);
    })();
  }, [loadState]);

  useEffect(() => {
    if (state.status === 'running' && state.startedAt) {
      tickRef.current = setInterval(() => {
        setDisplayMs(state.accumulatedMs + (Date.now() - state.startedAt!));
      }, 1000);
      return () => { if (tickRef.current) clearInterval(tickRef.current); };
    } else {
      setDisplayMs(state.accumulatedMs);
    }
    return undefined;
  }, [state.status, state.startedAt, state.accumulatedMs]);

  const handleStart = () => {
    if (!taskKey.trim()) {
      try { uiApi.toaster.add({ title: 'Укажите ключ задачи', theme: 'warning', content: 'Например TEST-123' }); }
      catch (e) { console.warn(e); }
      return;
    }
    const ns: TimerState = { ...state, status: 'running', startedAt: Date.now() };
    setState(ns); saveState(ns, taskKey);
  };
  const handlePause = () => {
    if (!state.startedAt) return;
    const elapsed = Date.now() - state.startedAt;
    const ns: TimerState = { ...state, status: 'paused', startedAt: null, accumulatedMs: state.accumulatedMs + elapsed };
    setState(ns); saveState(ns, taskKey);
  };
  const handleResume = () => {
    const ns: TimerState = { ...state, status: 'running', startedAt: Date.now() };
    setState(ns); saveState(ns, taskKey);
  };
  const handleStop = () => {
    let finalMs = state.accumulatedMs;
    if (state.status === 'running' && state.startedAt) finalMs += Date.now() - state.startedAt;
    submitMsRef.current = finalMs;
    const ns: TimerState = { status: 'idle', startedAt: null, accumulatedMs: finalMs, totalMs: state.totalMs + finalMs };
    setState(ns); saveState(ns, taskKey);
    setShowForm(true); setComment(''); setErrorMsg('');
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true); setErrorMsg('');
    const ms = submitMsRef.current;
    try {
      const duration = formatDurationISO(ms);
      const startISO = getLocalISOString();
      console.log('Submitting worklog:', { issueKey: taskKey, duration, startISO, comment });
      const res = await trackerApi.v3.post['/issues/{issue}/worklog']({
        pathParams: { issue: taskKey },
        bodyParams: { start: startISO, duration, comment: comment || undefined },
      });
      console.log('Worklog response:', res);
      const authorId = (res as any)?.data?.createdBy?.id;
      if (authorId) { console.log('Got author ID:', authorId); saveUserId(String(authorId)); }
      setState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs });
      saveState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs }, taskKey);
      setShowForm(false);
      try { uiApi.toaster.add({ title: 'Время отправлено', theme: 'success', content: formatDuration(ms) + ' — ' + taskKey }); }
      catch (te) { console.warn('Toaster:', te); }
    } catch (e: any) {
      const msg = e?.message || 'Не удалось отправить время';
      setErrorMsg(msg);
      try { uiApi.toaster.add({ title: 'Ошибка отправки worklog', theme: 'danger', content: msg }); }
      catch (te) { console.warn('Toaster:', te); }
    } finally {
      setSubmitting(false);
    }
  };

  const isRunning = state.status === 'running';
  const isPaused = state.status === 'paused';
  const timerActive = isRunning || isPaused;
  const submitMs = submitMsRef.current;

  return (
    <div style={{ padding: '24px 20px' }}>
      <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px', opacity: 0.7 }}>Ключ задачи</label>
      <input type="text" placeholder="TEST-123" value={taskKey}
        onChange={(e) => setTaskKey(e.target.value.toUpperCase())} disabled={timerActive}
        style={{ ...inputStyle, marginBottom: '20px', fontSize: '16px', fontWeight: 600, opacity: timerActive ? 0.5 : 1 }} />
      <div className="timer-font" style={{ fontSize: '40px', fontWeight: 600, textAlign: 'center', marginBottom: '20px' }}>{formatTime(displayMs)}</div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {state.status === 'idle' && <button onClick={handleStart} style={{ ...btnStyle, padding: '10px 24px', fontSize: '15px' }}>▶ Старт</button>}
        {isRunning && <button onClick={handlePause} style={{ ...btnStyle, padding: '10px 24px', fontSize: '15px' }}>⏸ Пауза</button>}
        {isPaused && <button onClick={handleResume} style={{ ...btnStyle, padding: '10px 24px', fontSize: '15px' }}>▶ Продолжить</button>}
        {timerActive && <button onClick={handleStop} style={{ ...btnStyle, padding: '10px 24px', fontSize: '15px' }}>⏹ Стоп</button>}
      </div>
      {state.status === 'idle' && displayMs === 0 && !showForm && (
        <div style={{ marginTop: '24px', fontSize: '13px', opacity: 0.6, textAlign: 'center' }}>
          Введите ключ задачи и нажмите «Старт».<br />После остановки откроется панель для комментария.
        </div>
      )}
      {showForm && (
        <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px' }}>
          <div className="timer-font" style={{ fontSize: '32px', fontWeight: 600, textAlign: 'center', marginBottom: '16px' }}>{formatTime(submitMs)}</div>
          {errorMsg && <div style={{ color: '#c62828', fontSize: '13px', padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '6px', marginBottom: '16px' }}>{errorMsg}</div>}
          <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '12px' }}>Комментарий к работе:</div>
          <input type="text" placeholder="Что было сделано?" value={comment} onChange={(e) => setComment(e.target.value)} style={inputStyle} autoFocus />
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button view="flat" onClick={() => setShowForm(false)} disabled={submitting}>Отмена</Button>
            <Button view="action" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Отправка…' : 'Отправить'}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- ReportsView ---
function ReportsView() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const { slotContext } = useTrackerPluginContext();

  useEffect(() => {
    (async () => {
      try {
        let userId: string | null = localStorage.getItem(USER_ID_KEY);
        if (!userId) userId = await loadUserId();
        if (!userId) {
          const u = (slotContext as any)?.user;
          if (u && u.id) userId = String(u.id);
        }
        console.log('ReportsView - userId:', userId);

        if (!userId) {
          setDebugInfo('User ID не найден. Отправьте время хотя бы один раз — ID сохранится автоматически.');
          setLoading(false);
          return;
        }

        console.log('Fetching worklogs for user:', userId);
		let allWorklogs: any[] = [];
		let page = 1;
		const perPage = 100;
		let hasMore = true;
		
		while (hasMore) {
		  console.log('Fetching page', page);
		  const worklogsRes = await trackerApi.v3.get['/worklog']({
		    queryParams: { createdBy: [userId] as any, perPage, page } as any,
		  });
		  const batch = (worklogsRes as any)?.data || [];
		  allWorklogs = allWorklogs.concat(batch);
		  console.log('Page', page, 'got', batch.length, 'worklogs, total so far:', allWorklogs.length);
		  hasMore = batch.length === perPage;
		  page++;
		}
		
		const worklogs = allWorklogs;
		console.log('Worklogs received (total):', worklogs.length);

        if (worklogs.length > 0) console.log('First worklog sample:', JSON.stringify(worklogs[0]));

        if (worklogs.length === 0) {
          setRows([]); setDebugInfo('Нет записей о затраченном времени.');
          setLoading(false);
          return;
        }

        const durationByIssue: Record<string, number> = {};
        for (const w of worklogs) {
          const key = extractIssueKey(w);
          const ms = parseDurationToMs(w);
          if (key) {
            durationByIssue[key] = (durationByIssue[key] || 0) + ms;
          }
        }
        console.log('Duration by issue:', durationByIssue);

        const issueKeys = Object.keys(durationByIssue);
        console.log('Issue keys found:', issueKeys.length, issueKeys);
        if (issueKeys.length === 0) {
          setRows([]); setDebugInfo('Не удалось извлечь ключи задач из ворклогов.');
          setLoading(false);
          return;
        }

        console.log('Searching issues...');
        const issuesRes = await trackerApi.v3.post['/issues/_search']({
          bodyParams: { keys: issueKeys, orderAsc: false, order: 'updated', fields: ['summary', 'queue'] },
        });
        const issues = (issuesRes as any)?.data || [];
        console.log('Issues found:', issues.length);

        const formattedRows = issues.map((issue: any) => ({
          key: issue.key,
          summary: issue.summary || '',
          queue: (issue.queue && issue.queue.key) || '',
          totalDuration: durationByIssue[issue.key] || 0,
        }));
        console.log('Formatted rows:', formattedRows.length, formattedRows);

        setRows(formattedRows);
      } catch (e) {
        console.log('Reports error:', e);
        setDebugInfo('Ошибка: ' + (e as any)?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [slotContext]);

  if (loading) return <div style={{ padding: '20px' }}>Загрузка…</div>;
  if (rows.length === 0) return <div style={{ padding: '20px', color: '#666' }}>{debugInfo || 'Нет записей о затраченном времени.'}</div>;

  const columns = [
    { id: 'key', name: 'Задача' },
    { id: 'summary', name: 'Описание' },
    { id: 'queue', name: 'Очередь' },
    { id: 'totalDuration', name: 'Время' },
  ];

  const tableData = rows.map(r => ({
    id: r.key,
    key: r.key,
    summary: r.summary,
    queue: r.queue,
    totalDuration: formatDuration(r.totalDuration),
  }));

  return (
    <div style={{ padding: '20px' }}>
      <Table columns={columns} data={tableData} />
    </div>
  );
}
