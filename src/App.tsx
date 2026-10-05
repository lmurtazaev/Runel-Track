import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  useTrackerPluginContext,
  trackerApi,
  storageApi,
  uiApi,
} from '@weavix/tracker-plugin-sdk-react';
import { Button } from '@gravity-ui/uikit';

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

let _parseLogCount = 0;
function parseDurationToMs(w: any): number {
  let val = w.duration;
  if (val == null) return 0;
  if (_parseLogCount < 3) {
    _parseLogCount++;
    console.log('parseDurationToMs sample:', { type: typeof val, value: JSON.stringify(val), start: w.start, id: w.id });
  }
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

// --- Date helpers ---
function getMonthRange(): [string, string] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  return [first.getFullYear() + '-' + pad2(first.getMonth() + 1) + '-' + pad2(first.getDate()),
          last.getFullYear() + '-' + pad2(last.getMonth() + 1) + '-' + pad2(last.getDate())];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}

function daysBetween(from: string, to: string): number {
  const d1 = new Date(from + 'T00:00:00');
  const d2 = new Date(to + 'T00:00:00');
  return Math.round((d2.getTime() - d1.getTime()) / 86400000) + 1;
}

function generateDateRange(from: string, to: string): string[] {
  const days = daysBetween(from, to);
  const dates: string[] = [];
  for (let i = 0; i < days; i++) dates.push(addDays(from, i));
  return dates;
}

const WEEKDAY_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function formatDateHeader(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const wd = WEEKDAY_SHORT[d.getDay()];
  return wd + ' ' + pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1);
}

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDay() === 0 || d.getDay() === 6;
}

function isFullMonth(from: string, to: string): boolean {
  const d1 = new Date(from + 'T00:00:00');
  const d2 = new Date(to + 'T00:00:00');
  if (d1.getDate() !== 1) return false;
  const lastDay = new Date(d1.getFullYear(), d1.getMonth() + 1, 0).getDate();
  return d2.getDate() === lastDay && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
}

function periodLabel(from: string, to: string): string {
  if (isFullMonth(from, to)) {
    const d = new Date(from + 'T00:00:00');
    return MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();
  }
  const fmt = (s: string) => {
    const d = new Date(s + 'T00:00:00');
    return pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.' + d.getFullYear();
  };
  return fmt(from) + ' — ' + fmt(to);
}

// --- ReportsView ---
function ReportsView() {
  const [worklogs, setWorklogs] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const [selectedQueues, setSelectedQueues] = useState<Set<string>>(new Set());
  const [queueFilterOpen, setQueueFilterOpen] = useState(false);
  const { slotContext } = useTrackerPluginContext();
  const fetchedRef = useRef(false);
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');

  // Init default date range = current month
  useEffect(() => {
    const [f, t] = getMonthRange();
    setDateFrom(f);
    setDateTo(t);
  }, []);

  // Fetch worklogs (once, not per date change)
  useEffect(() => {
    if (!dateFrom || !dateTo) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    console.log('[ReportsView] Starting data fetch...');
    (async () => {
      try {
        let userId: string | null = localStorage.getItem(USER_ID_KEY);
        if (!userId) userId = await loadUserId();
        if (!userId) {
          const u = (slotContext as any)?.user;
          if (u && u.id) userId = String(u.id);
        }
        if (!userId) {
          setDebugInfo('User ID не найден. Отправьте время хотя бы один раз — ID сохранится автоматически.');
          setLoading(false);
          return;
        }

        let allWorklogs: any[] = [];
        let page = 1;
        const perPage = 100;
        let hasMore = true;
        const maxPages = 50;
        const seenIds = new Set<string>();

        while (hasMore && page <= maxPages) {
          const worklogsRes = await trackerApi.v3.get['/worklog']({
            queryParams: { createdBy: [userId] as any, perPage, page } as any,
          });
          const batch = (worklogsRes as any)?.data || [];
          if (batch.length === 0) { hasMore = false; break; }
          let duplicates = 0;
          for (const w of batch) {
            const id = w.id || w._id || (w.self ? String(w.self).split('/').pop() : '');
            if (id && seenIds.has(id)) { duplicates++; continue; }
            if (id) seenIds.add(id);
            allWorklogs.push(w);
          }
          console.log('Worklogs page', page, ': got', batch.length, 'dupes:', duplicates, 'total unique:', allWorklogs.length);
          hasMore = batch.length === perPage && duplicates < batch.length;
          page++;
        }
        console.log('Total unique worklogs:', allWorklogs.length);

        if (allWorklogs.length === 0) {
          setDebugInfo('Нет записей о затраченном времени.');
          setLoading(false);
          return;
        }

        // Fetch issue info
        const issueKeysSet = new Set<string>();
        for (const w of allWorklogs) {
          const key = extractIssueKey(w);
          if (key) issueKeysSet.add(key);
        }
        const issueKeys = Array.from(issueKeysSet);

        const issuesRes = await trackerApi.v3.post['/issues/_search']({
          bodyParams: { keys: issueKeys, orderAsc: false, order: 'updated', fields: ['summary', 'queue'] },
        });
        const issues = (issuesRes as any)?.data || [];

        // Build issue lookup
        const issueMap: Record<string, { key: string; summary: string; queue: string }> = {};
        for (const issue of issues) {
          issueMap[issue.key] = {
            key: issue.key,
            summary: issue.summary || '',
            queue: (issue.queue && issue.queue.key) || '',
          };
        }

        // Attach issue info to worklogs and store
        const enriched = allWorklogs.map((w) => {
          const key = extractIssueKey(w);
          const ms = parseDurationToMs(w);
          let startDate = '';
          if (w.start) {
            const d = new Date(w.start);
            startDate = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
          }
          const info = issueMap[key] || { key, summary: '', queue: key.split('-')[0] || '' };
          return { ...w, _issueKey: key, _durationMs: ms, _startDate: startDate, _queue: info.queue, _summary: info.summary, _comment: w.comment || '' };
        });

        // Debug: log total time
        let totalMs = 0;
        for (const w of enriched) totalMs += w._durationMs;
        console.log('Total duration across all worklogs:', formatDuration(totalMs), '(' + enriched.length + ' worklogs)');
        setWorklogs(enriched);
      } catch (e) {
        setDebugInfo('Ошибка: ' + (e as any)?.message);
      } finally {
      	console.log('useEffect: done, setting loading=false');
        setLoading(false);
      }
    })();
  }, [dateFrom, dateTo]);

  // Navigation handlers
  const handlePrev = () => {
    const span = daysBetween(dateFrom, dateTo);
    setDateFrom(addDays(dateFrom, -span));
    setDateTo(addDays(dateTo, -span));
  };
  const handleNext = () => {
    const span = daysBetween(dateFrom, dateTo);
    setDateFrom(addDays(dateFrom, span));
    setDateTo(addDays(dateTo, span));
  };

  if (loading) return <div style={{ padding: '20px' }}>Загрузка…</div>;
  if (worklogs.length === 0) return <div style={{ padding: '20px', color: '#666' }}>{debugInfo || 'Нет записей о затраченном времени.'}</div>;
  if (!dateFrom || !dateTo) return <div style={{ padding: '20px' }}>Загрузка дат…</div>;

  // Filter worklogs by date range
  const filtered = worklogs.filter((w) => w._startDate >= dateFrom && w._startDate <= dateTo);

  // Generate date columns
  const dates = generateDateRange(dateFrom, dateTo);

  // Get all available queues from filtered worklogs
  const allQueues = Array.from(new Set(filtered.map((w) => w._queue || '—'))).sort();
  const activeQueues = selectedQueues.size === 0 ? allQueues : allQueues.filter((q) => selectedQueues.has(q));
  const queueFiltered = filtered.filter((w) => activeQueues.includes(w._queue || '—'));

  // Group by queue -> issue, with worklog entries
  const queueMap: Record<string, Record<string, {
    key: string;
    summary: string;
    byDay: Record<string, number>;
    worklogs: { day: string; durationMs: number; comment: string }[];
  }>> = {};
  for (const w of queueFiltered) {
    const queue = w._queue || '—';
    const issueKey = w._issueKey || '?';
    if (!queueMap[queue]) queueMap[queue] = {};
    if (!queueMap[queue][issueKey]) {
      queueMap[queue][issueKey] = { key: issueKey, summary: w._summary || '', byDay: {}, worklogs: [] };
    }
    const day = w._startDate;
    queueMap[queue][issueKey].byDay[day] = (queueMap[queue][issueKey].byDay[day] || 0) + w._durationMs;
    if (day >= dateFrom && day <= dateTo) {
      queueMap[queue][issueKey].worklogs.push({ day, durationMs: w._durationMs, comment: w._comment || '' });
    }
  }

  // Sort queues alphabetically
  const queues = Object.keys(queueMap).sort();

  // Compute subtotals per queue per day
  function queueDayTotal(queue: string, day: string): number {
    let total = 0;
    for (const issueKey of Object.keys(queueMap[queue])) {
      total += queueMap[queue][issueKey].byDay[day] || 0;
    }
    return total;
  }

  function queueTotal(queue: string): number {
    let total = 0;
    for (const d of dates) total += queueDayTotal(queue, d);
    return total;
  }

  // Grand totals per day
  const grandDayTotals: Record<string, number> = {};
  let grandTotal = 0;
  for (const day of dates) {
    grandDayTotals[day] = 0;
    for (const q of queues) grandDayTotals[day] += queueDayTotal(q, day);
    grandTotal += grandDayTotals[day];
  }

  // --- Styles ---
  const COL_Q = 80;
  const COL_K = 80;
  const COL_N = 250;
  const LEFT_T = COL_Q + COL_K + COL_N;

  const thStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderBottom: '2px solid rgba(128,128,128,0.4)',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'rgba(230,230,230,1)',
  };
  const thSticky = (left: number): React.CSSProperties => ({
    ...thStyle,
    position: 'sticky',
    left,
    zIndex: 3,
    backgroundColor: 'rgba(230,230,230,1)',
  });
  const tdStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderBottom: '1px solid rgba(128,128,128,0.15)',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  };
  const tdSticky = (left: number, bg: string): React.CSSProperties => ({
    ...tdStyle,
    position: 'sticky',
    left,
    zIndex: 2,
    backgroundColor: bg,
  });
  const tdTime: React.CSSProperties = {
    ...tdStyle,
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
  };
  const subtotalRowStyle: React.CSSProperties = {
    backgroundColor: '#E0E0E0',
    fontWeight: 600,
  };
  const totalRowStyle: React.CSSProperties = {
    backgroundColor: '#D0D0D0',
    fontWeight: 700,
    position: 'sticky' as const,
    bottom: 0,
    zIndex: 3,
  };
  const worklogRowStyle: React.CSSProperties = {
    fontSize: '11px',
    color: '#777',
    backgroundColor: '#F8F8F8',
    fontStyle: 'italic',
  };

  const navBtnStyle: React.CSSProperties = {
    ...btnStyle,
    padding: '4px 10px',
    fontSize: '14px',
    minWidth: '32px',
  };

  const BG_SUBTOTAL = '#DCDCDC';
  const BG_TOTAL = '#D0D0D0';
  const BG_NORMAL = '#E6E6E6';
  const BG_WORKLOG = '#F0F0F0';

  return (
    <div style={{ padding: '16px' }}>
      {/* Date navigation + Queue filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={handlePrev} style={navBtnStyle} title="Предыдущий период">←</button>
        <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '160px', textAlign: 'center' }}>
          {periodLabel(dateFrom, dateTo)}
        </span>
        <button onClick={handleNext} style={navBtnStyle} title="Следующий период">→</button>
        <span style={{ margin: '0 4px', opacity: 0.5 }}>|</span>
        <label style={{ fontSize: '12px', opacity: 0.7 }}>С:</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          style={{ ...inputStyle, width: 'auto', fontSize: '12px', padding: '4px 8px' }}
        />
        <label style={{ fontSize: '12px', opacity: 0.7 }}>По:</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          style={{ ...inputStyle, width: 'auto', fontSize: '12px', padding: '4px 8px' }}
        />
        <span style={{ margin: '0 4px', opacity: 0.5 }}>|</span>
        {/* Queue filter */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setQueueFilterOpen(!queueFilterOpen)}
            style={{ ...btnStyle, padding: '4px 10px', fontSize: '12px' }}
          >
            Очереди {selectedQueues.size > 0 ? `(${selectedQueues.size})` : '(все)'} ▾
          </button>
          {queueFilterOpen && (
            <>
              <div
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 }}
                onClick={() => setQueueFilterOpen(false)}
              />
              <div style={{
                position: 'absolute', top: '100%', left: 0, zIndex: 51,
                background: '#fff', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', maxHeight: '300px', overflowY: 'auto',
                minWidth: '200px',
              }}>
                <div style={{ display: 'flex', gap: '8px', padding: '8px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <button
                    onClick={() => setSelectedQueues(new Set())}
                    style={{ ...btnStyle, padding: '2px 8px', fontSize: '11px' }}
                  >Все</button>
                  <button
                    onClick={() => {
                      const next = new Set<string>();
                      for (const q of allQueues) { if (!selectedQueues.has(q)) next.add(q); }
                      setSelectedQueues(next);
                    }}
                    style={{ ...btnStyle, padding: '2px 8px', fontSize: '11px' }}
                  >Инверсия</button>
                </div>
                {allQueues.map((q) => (
                  <label key={q} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 12px', cursor: 'pointer', fontSize: '12px' }}>
                    <input
                      type="checkbox"
                      checked={selectedQueues.has(q)}
                      onChange={(e) => {
                        const next = new Set(selectedQueues);
                        if (e.target.checked) next.add(q); else next.delete(q);
                        setSelectedQueues(next);
                      }}
                    />
                    {q}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* View mode switcher */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        <button
          onClick={() => setViewMode('table')}
          style={{
            ...btnStyle,
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: viewMode === 'table' ? 600 : 400,
            backgroundColor: viewMode === 'table' ? 'rgba(200,200,200,0.6)' : 'transparent',
          }}
        >
          Таблица
        </button>
        <button
          onClick={() => setViewMode('list')}
          style={{
            ...btnStyle,
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: viewMode === 'list' ? 600 : 400,
            backgroundColor: viewMode === 'list' ? 'rgba(200,200,200,0.6)' : 'transparent',
          }}
        >
          Список
        </button>
      </div>

      {/* Calendar table */}
      {viewMode === 'table' && (
      <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={thSticky(0)}>Очередь</th>
              <th style={thSticky(COL_Q)}>Задача</th>
              <th style={{ ...thSticky(COL_Q + COL_K), minWidth: COL_N + 'px', maxWidth: COL_N + 'px', overflow: 'hidden', textOverflow: 'ellipsis' }}>Название</th>
              <th style={{ ...thSticky(LEFT_T), textAlign: 'center' }}>Итого</th>
              {dates.map((d) => (
                <th key={d} style={{ ...thStyle, textAlign: 'center', color: isWeekend(d) ? 'rgba(255,100,100,0.7)' : 'inherit' }}>
                  {formatDateHeader(d)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queues.map((q) => {
              const issueKeys = Object.keys(queueMap[q]).sort();
              return (
                <React.Fragment key={q}>
                  {/* Subtotal row for queue */}
                  <tr style={subtotalRowStyle}>
                    <td style={tdSticky(0, BG_SUBTOTAL)}><strong>{q}</strong></td>
                    <td style={tdSticky(COL_Q, BG_SUBTOTAL)}></td>
                    <td style={{ ...tdSticky(COL_Q + COL_K, BG_SUBTOTAL), fontStyle: 'italic', opacity: 0.6 }}>Подытог:</td>
                    <td style={{ ...tdSticky(LEFT_T, BG_SUBTOTAL), textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                      <strong>{formatDuration(queueTotal(q))}</strong>
                    </td>
                    {dates.map((d) => {
                      const val = queueDayTotal(q, d);
                      return (
                        <td key={d} style={{ ...tdTime, backgroundColor: '#E0E0E0', fontWeight: 600, color: val === 0 ? 'rgba(128,128,128,0.3)' : 'inherit' }}>
                          {val > 0 ? formatDuration(val) : '—'}
                        </td>
                      );
                    })}
                  </tr>
                  {/* Task rows + worklog sub-rows */}
                  {issueKeys.map((ik) => {
                    const issue = queueMap[q][ik];
                    let issueTotal = 0;
                    for (const d of dates) issueTotal += issue.byDay[d] || 0;
                    // Group worklogs by day
                    const worklogsByDay: Record<string, typeof issue.worklogs> = {};
                    for (const wl of issue.worklogs) {
                      if (!worklogsByDay[wl.day]) worklogsByDay[wl.day] = [];
                      worklogsByDay[wl.day].push(wl);
                    }
                    return (
                      <React.Fragment key={ik}>
                        <tr key={ik}>
                          <td style={{ ...tdSticky(0, BG_NORMAL), opacity: 0.3 }}></td>
                          <td style={tdSticky(COL_Q, BG_NORMAL)}>{ik}</td>
                          <td style={{ ...tdSticky(COL_Q + COL_K, BG_NORMAL), maxWidth: COL_N + 'px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={issue.summary}>{issue.summary}</td>
                          <td style={{ ...tdSticky(LEFT_T, BG_NORMAL), textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                            {issueTotal > 0 ? formatDuration(issueTotal) : '—'}
                          </td>
                          {dates.map((d) => {
                            const val = issue.byDay[d] || 0;
                            return (
                              <td key={d} style={{ ...tdTime, color: val === 0 ? 'rgba(128,128,128,0.25)' : 'inherit', backgroundColor: isWeekend(d) ? '#F0F0F0' : 'transparent' }}>
                                {val > 0 ? formatDuration(val) : '—'}
                              </td>
                            );
                          })}
                        </tr>
                        {/* Worklog sub-rows */}
                        {dates.map((d) => {
                          const dayWorklogs = worklogsByDay[d];
                          if (!dayWorklogs || dayWorklogs.length === 0) return null;
                          return dayWorklogs.map((wl, wi) => (
                            <tr key={ik + '_wl_' + d + '_' + wi} style={worklogRowStyle}>
                              <td style={tdSticky(0, BG_WORKLOG)}></td>
                              <td style={tdSticky(COL_Q, BG_WORKLOG)}></td>
                              <td
                                style={{ ...tdSticky(COL_Q + COL_K, BG_WORKLOG), maxWidth: COL_N + 'px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                title={wl.comment || '(без комментария)'}
                              >
                                {wl.comment || '(без комментария)'}
                              </td>
                              <td style={tdSticky(LEFT_T, BG_WORKLOG)}></td>
                              {dates.map((dd) => (
                                <td key={dd} style={{ ...tdTime, ...worklogRowStyle, backgroundColor: isWeekend(dd) ? 'rgba(128,128,128,0.05)' : 'transparent' }}>
                                  {dd === d ? formatDuration(wl.durationMs) : ''}
                                </td>
                              ))}
                            </tr>
                          ));
                        })}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={totalRowStyle}>
              <td style={{ ...tdSticky(0, BG_TOTAL), position: 'sticky' as const, bottom: 0, zIndex: 4 }}>
                <strong>Итого:</strong>
              </td>
              <td style={{ ...tdSticky(COL_Q, BG_TOTAL), position: 'sticky' as const, bottom: 0, zIndex: 4 }}></td>
              <td style={{ ...tdSticky(COL_Q + COL_K, BG_TOTAL), position: 'sticky' as const, bottom: 0, zIndex: 4 }}></td>
              <td style={{ ...tdSticky(LEFT_T, BG_TOTAL), position: 'sticky' as const, bottom: 0, zIndex: 4, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                <strong>{formatDuration(grandTotal)}</strong>
              </td>
              {dates.map((d) => (
                <td key={d} style={{ ...tdTime, backgroundColor: '#D0D0D0', position: 'sticky' as const, bottom: 0, zIndex: 3, fontWeight: 700 }}>
                  {grandDayTotals[d] > 0 ? formatDuration(grandDayTotals[d]) : '—'}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      )}

      {/* List view - full comments */}
      {viewMode === 'list' && (
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ ...thSticky(0), width: '80px' }}>Очередь</th>
              <th style={{ ...thSticky(COL_Q), width: '80px' }}>Задача</th>
              <th style={{ ...thSticky(COL_Q + COL_K), width: '250px' }}>Название</th>
              <th style={{ ...thSticky(LEFT_T), width: '70px', textAlign: 'center' }}>Итого</th>
              <th style={{ ...thStyle, width: '100px' }}>Дата</th>
              <th style={{ ...thStyle, width: '60px', textAlign: 'center' }}>Время</th>
              <th style={{ ...thStyle }}>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((q) => {
              const issueKeys = Object.keys(queueMap[q]).sort();
              return (
                <React.Fragment key={q}>
                  <tr style={subtotalRowStyle}>
                    <td style={tdSticky(0, BG_SUBTOTAL)} colSpan={4}>
                      <strong>{q}</strong> — {formatDuration(queueTotal(q))}
                    </td>
                    <td style={{ backgroundColor: '#E0E0E0', fontWeight: 600 }} colSpan={3}></td>
                  </tr>
                  {issueKeys.map((ik) => {
                    const issue = queueMap[q][ik];
                    let issueTotal = 0;
                    for (const d of dates) issueTotal += issue.byDay[d] || 0;
                    return (
                      <React.Fragment key={ik}>
                        <tr>
                          <td style={{ ...tdSticky(0, BG_NORMAL), opacity: 0.3 }}></td>
                          <td style={tdSticky(COL_Q, BG_NORMAL)}>{ik}</td>
                          <td style={{ ...tdSticky(COL_Q + COL_K, BG_NORMAL), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={issue.summary}>{issue.summary}</td>
                          <td style={{ ...tdSticky(LEFT_T, BG_NORMAL), textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                            {issueTotal > 0 ? formatDuration(issueTotal) : '—'}
                          </td>
                          <td style={{ ...tdStyle, color: '#999', fontSize: '11px' }} colSpan={3}>{issue.worklogs.length} ворклог(ов)</td>
                        </tr>
                        {issue.worklogs.map((wl, wi) => (
                          <tr key={ik + '_wl_' + wi} style={worklogRowStyle}>
                            <td style={tdSticky(0, BG_WORKLOG)}></td>
                            <td style={tdSticky(COL_Q, BG_WORKLOG)}></td>
                            <td style={{ ...tdSticky(COL_Q + COL_K, BG_WORKLOG), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={wl.comment || '(без комментария)'}>
                              {wl.comment || '(без комментария)'}
                            </td>
                            <td style={tdSticky(LEFT_T, BG_WORKLOG)}></td>
                            <td style={{ ...tdStyle, fontSize: '11px', whiteSpace: 'nowrap' }}>
                              {formatDateHeader(wl.day)}
                            </td>
                            <td style={{ ...tdTime, fontSize: '11px' }}>
                              {formatDuration(wl.durationMs)}
                            </td>
                            <td style={{ ...tdStyle, fontSize: '11px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: '1.4' }}>
                              {wl.comment || '(без комментария)'}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
            <tr style={totalRowStyle}>
              <td style={{ ...tdSticky(0, BG_TOTAL), position: 'sticky' as const, bottom: 0, zIndex: 4 }} colSpan={3}>
                <strong>Итого:</strong>
              </td>
              <td style={{ ...tdSticky(LEFT_T, BG_TOTAL), position: 'sticky' as const, bottom: 0, zIndex: 4, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                <strong>{formatDuration(grandTotal)}</strong>
              </td>
              <td style={{ backgroundColor: '#D0D0D0', position: 'sticky' as const, bottom: 0, zIndex: 3, fontWeight: 700 }} colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
