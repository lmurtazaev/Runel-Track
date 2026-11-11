import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  useTrackerPluginContext,
  trackerApi,
  storageApi,
  hostApi,
  uiApi,
} from '@weavix/tracker-plugin-sdk-react';

// --- Модульный лог (проверка загрузки) ---
console.log('[runel-track] Module loaded at', new Date().toISOString(), '| location:', window.location.href);

// --- Глобальные стили ---
const globalStyles = `
  html, body { margin: 0 !important; padding: 0 !important; scrollbar-width: none !important; -ms-overflow-style: none !important; }
  html::-webkit-scrollbar, body::-webkit-scrollbar { display: none !important; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .worklog-card .worklog-options { opacity: 0; }\n  .worklog-card:hover .worklog-options { opacity: 1; }\n  .loading-spinner { display: inline-block; width: 11px; height: 11px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; vertical-align: -2px; animation: wt-spin .7s linear infinite; }
  @keyframes wt-spin { to { transform: rotate(360deg); } }
  .day-worklogs-scroll { scrollbar-width: thin; }
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
const BG_LIGHT = '#F4F4F6';
const BG_DARK = '#687381';
const TEXT_LIGHT = '#494949';
const TEXT_DARK = '#FFFFFF';

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

// Отдельный стиль для основных кнопок управления таймером.
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
function getCommentFieldStyle(isDark: boolean): React.CSSProperties {
  return isDark
    ? { ...inputStyle }
    : {
        width: '100%',
        padding: '7px 12px',
        border: '1px solid #8B7FE0',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        color: '#252525',
        fontSize: '13px',
        boxSizing: 'border-box',
      };
}

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
    const isoMatch = val.match(/^P(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/i);
    if (isoMatch) {
      const weeks = parseInt(isoMatch[1] || '0', 10);
      const days = parseInt(isoMatch[2] || '0', 10);
      const hours = parseInt(isoMatch[3] || '0', 10);
      const minutes = parseInt(isoMatch[4] || '0', 10);
      const seconds = parseInt(isoMatch[5] || '0', 10);
      // Tracker counts a workday as 8 hours and a workweek as 5 workdays.
      return (weeks * 5 * 8 * 3600 + days * 8 * 3600 + hours * 3600 + minutes * 60 + seconds) * 1000;
    }
    const n = parseFloat(val);
    if (!isNaN(n)) return n > 100000 ? n : n * 60000;
  }
  return 0;
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
  const ctx = useTrackerPluginContext();
  console.log('[runel-track] App() render | slot =', ctx.slot, '| slotContext =', ctx.slotContext);
  const { slot, slotContext, theme } = ctx;
  if (slot === 'navigation') return <NavigationPage theme={theme} />;
  if (slot === 'issue.block' || slot === 'drawer.issue.block') {
    const compact = slot === 'drawer.issue.block';
    const issueKey = (slotContext as any)?.entityId || (slotContext as any)?.key || '';
    return <TimerWidget issueKey={issueKey} compact={compact} theme={theme} />;
  }
  return null;
}

// --- TimerWidget ---
// Иконки кнопок таймера (SVG)
const PlayIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={(size * 17) / 15} viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M13.5295 6.30843C14.9334 7.125 14.9334 9.15293 13.5295 9.9695L3.18262 15.9875C1.77086 16.8086 0.000286102 15.7902 0.000286102 14.157L0.000286102 2.12095C0.000286102 0.487766 1.77087 -0.530702 3.18262 0.290412L13.5295 6.30843Z" fill="#FFFFFF"/>
  </svg>
);

const PlayOutlinedIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={(size * 19) / 18} viewBox="0 -1 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
    <path d="M13.6423 6.29774C15.068 7.11819 15.068 9.17537 13.6423 9.99581L3.19758 16.0063C1.77536 16.8247 0.000205994 15.7982 0.000205994 14.1573L0.000205994 2.13628C0.000205994 0.495384 1.77536 -0.531182 3.19758 0.287245L13.6423 6.29774Z" fill="#FFFFFF" stroke="#FF6F00" strokeWidth="1.3"/>
  </svg>
);

const PauseIcon = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={(size * 14) / 13} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
    <rect width="6" height="16" rx="2.11765" fill="#463F91"/>
    <rect x="7.22" width="6" height="16" rx="2.11765" fill="#463F91"/>
  </svg>
);

const StopIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
    <rect width="15.8824" height="16" rx="3.17647" fill="#FF4800"/>
  </svg>
);

// Стили кнопок таймера
const timerBtnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  padding: '7px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 500,
  border: 'none',
  whiteSpace: 'nowrap',
};
const startBtnStyle: React.CSSProperties = { ...timerBtnBase, backgroundColor: '#FF6F00', color: '#FFFFFF' };
const pauseBtnStyle: React.CSSProperties = { ...timerBtnBase, backgroundColor: '#FFFFFF', border: '1.6px solid #FF6F00', color: '#463F91' };
const resumeBtnStyle: React.CSSProperties = { ...timerBtnBase, backgroundColor: '#FFFFFF', border: '1.6px solid #FF6F00', color: '#463F91' };
const stopBtnStyle: React.CSSProperties = { ...timerBtnBase, backgroundColor: '#131962', color: '#FFFFFF' };
const submitBtnStyle: React.CSSProperties = { ...timerBtnBase, backgroundColor: '#FF6F00', color: '#FFFFFF' };
const cancelBtnStyle: React.CSSProperties = { ...timerBtnBase, backgroundColor: '#FFFFFF', border: '1.6px solid #463F91', color: '#463F91' };

// Компактный вид: крупные кнопки
const compactBtnBase: React.CSSProperties = {
  ...timerBtnBase,
  height: '40px',
  padding: '0 18px',
  fontSize: '18px',
  gap: '12px',
  borderRadius: '8px',
  margin: '6px 0'
};
const compactStartBtnStyle: React.CSSProperties = { ...compactBtnBase, backgroundColor: '#FF6F00', color: '#FFFFFF' };
const compactPauseBtnStyle: React.CSSProperties = { ...compactBtnBase, backgroundColor: '#FFFFFF', border: '1.6px solid #FF6F00', color: '#463F91' };
const compactResumeBtnStyle: React.CSSProperties = { ...compactBtnBase, backgroundColor: '#FFFFFF', border: '1.6px solid #FF6F00', color: '#463F91' };
const compactStopBtnStyle: React.CSSProperties = { ...compactBtnBase, backgroundColor: '#131962', color: '#FFFFFF' };
const compactSubmitBtnStyle: React.CSSProperties = { ...compactBtnBase, backgroundColor: '#FF6F00', color: '#FFFFFF' };
const compactCancelBtnStyle: React.CSSProperties = { ...compactBtnBase, backgroundColor: '#FFFFFF', border: '1.6px solid #463F91', color: '#463F91' };

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
  const isDark = theme?.startsWith('dark') ?? false;
  const bgColor = isDark ? BG_DARK : '#F0EDFF';
  const timeColor = isDark ? '#FFFFFF' : '#131962';

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;

    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, [bgColor]);

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
    // Комментарий не сбрасываем: он мог быть введён до старта или во время работы.
    setShowForm(true); setErrorMsg('');
  };

  const handleCancel = () => {
    setShowForm(false);
    setErrorMsg('');
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
      setState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs });
      saveState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs });
      setShowForm(false);
      setComment('');
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

  // Кнопки: одновременно показывается только одна группа состояний.
  // showForm (после Стопа) -> Отмена + Отправить; иначе Старт / Пауза+Стоп / Продолжить+Стоп.
  const buttons = (
    <>
      {showForm ? (
        <>
          <button onClick={handleCancel} disabled={submitting} style={cancelBtnStyle}>Отмена</button>
          <button onClick={handleSubmit} disabled={submitting} style={submitBtnStyle}>{submitting ? 'Отправка…' : 'Отправить'}</button>
        </>
      ) : (
        <>
          {state.status === 'idle' && <button onClick={handleStart} style={startBtnStyle}><PlayIcon size={13} /> Старт</button>}
          {isRunning && <button onClick={handlePause} style={pauseBtnStyle}><PauseIcon /> Пауза</button>}
          {isPaused && <button onClick={handleResume} style={resumeBtnStyle}><PlayOutlinedIcon /> Продолжить</button>}
          {(isRunning || isPaused) && <button onClick={handleStop} style={stopBtnStyle}><StopIcon /> Стоп</button>}
        </>
      )}
    </>
  );

  // Поле комментария: светлая тема — белый фон и контур #8B7FE0, тёмная — прежние стили.
  if (compact) {
    // Компактный вид: верхняя линия — кнопки слева, время справа (одна горизонталь).
    // Поле комментария появляется только после нажатия на Стоп.
    const topButtons = (
      <>
        {state.status === 'idle' && <button onClick={handleStart} style={compactStartBtnStyle}><PlayIcon size={20} /> Старт</button>}
        {isRunning && <button onClick={handlePause} style={compactPauseBtnStyle}><PauseIcon size={20} /> Пауза</button>}
        {isPaused && <button onClick={handleResume} style={compactResumeBtnStyle}><PlayOutlinedIcon size={20} /> Продолжить</button>}
        {(isRunning || isPaused) && <button onClick={handleStop} style={compactStopBtnStyle}><StopIcon size={20} /> Стоп</button>}
      </>
    );

    return (
      <div className="no-scrollbar" style={{ padding: '12px 16px', backgroundColor: bgColor, color: getTextColor(theme), overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>{topButtons}</div>
          <div className="timer-font" style={{ fontSize: '36px', fontWeight: 700, color: timeColor, whiteSpace: 'nowrap' }}>{formatTime(displayMs)}</div>
        </div>
        {showForm && (
          <div style={{ marginTop: '12px', padding: '12px', background: isDark ? 'rgba(255,255,255,0.15)' : '#DFD9FF', borderRadius: '8px' }}>
            {errorMsg && <div style={{ color: '#c62828', fontSize: '13px', padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '6px', marginBottom: '10px' }}>{errorMsg}</div>}
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Комментарий к работе:</div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ваш комментарий (над чем работаете, что сделано...)"
              rows={2}
              autoFocus
              style={{ ...getCommentFieldStyle(isDark), resize: 'vertical', minHeight: '52px', lineHeight: 1.5, fontFamily: 'inherit' }}
            />
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={handleCancel} disabled={submitting} style={compactCancelBtnStyle}>Отмена</button>
              <button onClick={handleSubmit} disabled={submitting} style={compactSubmitBtnStyle}>{submitting ? 'Отправка…' : 'Отправить'}</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="no-scrollbar" style={{ padding: '16px', backgroundColor: bgColor, color: getTextColor(theme), overflow: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '28px' }}>
        {/* Левая колонка: время сверху, кнопки прижаты к нижней границе */}
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
          <div className="timer-font" style={{ fontSize: '34px', fontWeight: 700, lineHeight: 1.15, color: timeColor, whiteSpace: 'nowrap' }}>{formatTime(displayMs)}</div>
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px' }}>{buttons}</div>
        </div>
        {/* Правая колонка: комментарий, нижняя граница поля совпадает с нижней границей кнопок */}
        <div style={{ flex: '1 1 auto', minWidth: '220px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px', marginTop: '6px' }}>Комментарий к работе:</div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш комментарий (над чем работаете, что сделано...)"
            rows={2}
            autoFocus
            style={{ ...getCommentFieldStyle(isDark), resize: 'vertical', minHeight: '52px', lineHeight: 1.5, fontFamily: 'inherit' }}
          />
        </div>
      </div>
      {errorMsg && (
        <div style={{ marginTop: '10px', color: '#c62828', fontSize: '13px', padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '6px' }}>{errorMsg}</div>
      )}
    </div>
  );
}

// --- NavigationPage ---
function NavigationPage({ theme }: { theme?: string }) {
  const [view, setView] = useState<'work' | 'reports'>('work');
  const bgColor = getBgColor(theme);
  return (
    <div className="no-scrollbar" style={{ backgroundColor: bgColor, color: getTextColor(theme), minHeight: '100vh', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        <button onClick={() => setView('work')} style={{ padding: '10px 20px', border: 'none', borderBottom: view === 'work' ? '2px solid #FF6F00' : '2px solid transparent', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: view === 'work' ? 600 : 400, color: 'inherit' }}><span style={{ fontSize: 20, color: view === 'work' ? '#FF6F00' : 'inherit', marginRight: 7, verticalAlign: '-2px' }}>☑︎</span>Моя работа</button>
        <button onClick={() => setView('reports')} style={{ padding: '10px 20px', border: 'none', borderBottom: view === 'reports' ? '2px solid #FF6F00' : '2px solid transparent', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '14px', fontWeight: view === 'reports' ? 600 : 400, color: 'inherit' }}><span style={{ fontSize: 20, color: view === 'reports' ? '#FF6F00' : 'inherit', marginRight: 7, verticalAlign: '-2px' }}>⏍︎</span>Отчеты</button>
      </div>
      {view === 'work' ? <MyWorkView theme={theme} /> : <ReportsView theme={theme} />}
    </div>
  );
}

type IssueOption = { key: string; summary: string; type?: string };
type WorklogRow = { id: string; issueKey: string; summary: string; comment: string; date: string; durationMs: number; type?: string };

function isoDate(d: Date): string {
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}
function weekStart(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
function displayDate(date: Date): string {
  return pad2(date.getDate()) + '.' + pad2(date.getMonth() + 1);
}
function hoursLabel(ms: number): string {
  const mins = Math.round(ms / 60000);
  return Math.floor(mins / 60) + 'ч ' + pad2(mins % 60) + 'м';
}
function totalHoursLabel(ms: number): string {
  const mins = Math.round(ms / 60000);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return (hours ? hours + ' ч' : '') + (hours && minutes ? ' ' : '') + (minutes ? minutes + ' мин' : (!hours ? '0 ч' : ''));
}
function parseHumanDuration(value: string): number {
  const h = value.match(/(\d+)\s*ч/i);
  const m = value.match(/(\d+)\s*м/i);
  if (!h && !m) return 0;
  return ((h ? Number(h[1]) : 0) * 60 + (m ? Number(m[1]) : 0)) * 60000;
}
function dateToRu(value: string): string {
  if (!value) return '';
  const d = new Date(value + 'T00:00:00');
  return displayDate(d) + '.' + String(d.getFullYear()).slice(-2);
}

function TaskAutocomplete({ value, onChange, onSelect, disabled }: {
  value: string; onChange: (value: string) => void; onSelect: (issue: IssueOption) => void; disabled?: boolean;
}) {
  const [results, setResults] = useState<IssueOption[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const query = value.trim();
    if (!focused || query.length < 2) { setResults([]); setOpen(false); return; }
    const timer = setTimeout(async () => {
      setBusy(true);
      try {
        const response = await (trackerApi as any).v3.get['/issues/_suggest']({
          queryParams: { input: query, full: true, fields: ['summary', 'type'] },
        });
        let rows = (response as any)?.data || response || [];
        // _suggest focuses on summaries; the query search also finds issue-key fragments.
        if (rows.length < 5) {
          const searchResponse = await (trackerApi as any).v3.post['/issues/_search']({
            queryParams: { perPage: 5, page: 1 },
            bodyParams: { query },
          });
          const searchRows = (searchResponse as any)?.data || [];
          const byKey = new Map<string, any>();
          [...rows, ...searchRows].forEach((item: any) => { if (item?.key) byKey.set(item.key, item); });
          rows = Array.from(byKey.values());
        }
        setResults(rows.slice(0, 5).map((item: any) => ({
          key: item.key, summary: item.summary || '', type: item.type?.key || item.type?.id || '',
        })));
        setOpen(true);
      } catch (error) {
        console.warn('Issue search failed:', error);
        setResults([]);
        setOpen(false);
      } finally { setBusy(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [value, focused]);
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input value={value} disabled={disabled} placeholder="Ключ или название задачи" autoComplete="off"
        onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setOpen(false), 160)}
        onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      {open && (results.length > 0 || busy) && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 40, background: 'var(--g-color-base-float, #fff)', color: 'var(--g-color-text-primary, #222)', border: '1px solid var(--g-color-line-generic, #ccc)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,.18)', overflow: 'hidden' }}>
          {busy && <div style={{ padding: 10, fontSize: 12 }}>Поиск...</div>}
          {results.map((issue) => (
            <button key={issue.key} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { onSelect(issue); setOpen(false); setFocused(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', border: 0, borderBottom: '1px solid rgba(128,128,128,.15)', background: 'transparent', color: 'inherit', cursor: 'pointer' }}>
              <strong>{issue.key}</strong><span style={{ marginLeft: 8, opacity: .8 }}>{issue.summary}</span>
            </button>
          ))}
          {!busy && results.length === 0 && <div style={{ padding: 10, fontSize: 12, opacity: .7 }}>Ничего не найдено</div>}
        </div>
      )}
    </div>
  );
}

function WorklogModal({ theme, initial, initialDate, onClose, onSaved }: {
  theme?: string; initial?: WorklogRow; initialDate?: string; onClose: () => void; onSaved: (row: WorklogRow, previousId?: string) => Promise<void> | void;
}) {
  const [task, setTask] = useState(initial ? `${initial.issueKey}: ${initial.summary}` : '');
  const [issueKey, setIssueKey] = useState(initial?.issueKey || '');
  const [comment, setComment] = useState(initial?.comment || '');
  const [date, setDate] = useState(initial?.date || initialDate || isoDate(new Date()));
  const [duration, setDuration] = useState(initial ? hoursLabel(initial.durationMs) : '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const isDark = theme?.startsWith('dark');
  const surface = isDark ? '#303640' : '#FFFFFF';
  const text = isDark ? '#F3F4F6' : '#252525';
  const handleSave = async () => {
    const ms = parseHumanDuration(duration);
    const resolvedKey = issueKey || (task.trim().match(/^([A-Z][A-Z0-9_]+-\d+)/i)?.[1] || '');
    if (!resolvedKey || ms <= 0 || !date) { setError('Укажите задачу, дату и корректное время.'); return; }
    setSaving(true); setError('');
    try {
      const start = new Date(date + 'T09:00:00');
      const startISO = getLocalISOStringFor(start);
      const api = trackerApi as any;
      let response: any;
      if (initial && date === initial.date) {
        response = await api.v3.patch['/issues/{issue}/worklog/{id}']({
          pathParams: { issue: initial.issueKey, id: initial.id },
          bodyParams: { duration: formatDurationISO(ms), comment },
        });
      } else {
        // For a date change, create the replacement before deleting the original.
        response = await api.v3.post['/issues/{issue}/worklog']({
          pathParams: { issue: initial ? initial.issueKey : resolvedKey },
          bodyParams: { start: startISO, duration: formatDurationISO(ms), comment: comment || undefined },
        });
        if (initial) {
          await api.v3.delete['/issues/{issue}/worklog/{id}']({
            pathParams: { issue: initial.issueKey, id: initial.id },
          });
        }
      }
      const responseData = (response as any)?.data || response || {};
      const nextRow: WorklogRow = {
        id: String(responseData.id || responseData._id || (initial && date === initial.date ? initial.id : `pending-${Date.now()}`)),
        issueKey: initial?.issueKey || resolvedKey,
        summary: initial?.summary || task.trim().split(':').slice(1).join(':').trim(),
        comment,
        date,
        durationMs: ms,
        type: initial?.type,
      };
      await onSaved(nextRow, initial?.id);
      onClose();
    } catch (e: any) { setError(e?.message || 'Не удалось сохранить ворклог'); }
    finally { setSaving(false); }
  };
  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.48)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div role="dialog" aria-modal="true" style={{ width: 'min(480px, 100%)', background: surface, color: text, borderRadius: 14, padding: 22, boxShadow: '0 18px 60px rgba(0,0,0,.3)' }}>
        <div style={{ fontSize: 19, fontWeight: 650, marginBottom: 18 }}>{initial ? 'Редактировать ворклог' : 'Добавить ворклог'}</div>
        <label style={fieldLabel}>Задача</label>
        {initial ? <input value={task} disabled style={inputStyle} /> :
          <TaskAutocomplete value={task} onChange={(v) => { setTask(v); setIssueKey(''); }}
            onSelect={(issue) => { setIssueKey(issue.key); setTask(`${issue.key}: ${issue.summary}`); }} />}
        <label style={fieldLabel}>Комментарий</label>
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Что было сделано?" style={inputStyle} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
          <div><label style={fieldLabel}>Дата</label><div style={{ position: 'relative' }}>
            <input value={dateToRu(date)} readOnly style={{ ...inputStyle, paddingRight: 42 }} />
            <span style={{ position: 'absolute', right: 11, top: 8, pointerEvents: 'none' }}>▦</span>
            <input aria-label="Выбрать дату" type="date" value={date} onChange={(e) => setDate(e.target.value)}
              style={{ position: 'absolute', right: 0, top: 0, width: 38, height: '100%', opacity: 0, cursor: 'pointer' }} />
          </div></div>
          <div><label style={fieldLabel}>Время</label><input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="2ч, 1ч 30м, 45м" style={inputStyle} /></div>
        </div>
        {error && <div style={{ color: '#E05252', fontSize: 13, marginTop: 12 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
          <button onClick={onClose} disabled={saving} style={{ ...btnStyle, padding: '9px 17px', background: isDark ? '#48515E' : '#ECEEF2', border: 0 }}>Отмена</button>
          <button onClick={handleSave} disabled={saving} style={{ ...btnStyle, padding: '9px 18px', color: '#fff', background: '#463F91', border: 0, fontWeight: 600 }}>{saving ? 'Сохранение...' : 'Затрекать'}</button>
        </div>
      </div>
    </div>
  );
}
const fieldLabel: React.CSSProperties = { display: 'block', fontSize: 12, opacity: .72, margin: '13px 0 6px' };
function getLocalISOStringFor(d: Date): string {
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  const sign = offset > 0 ? '-' : '+';
  return local.toISOString().replace('Z', '') + sign + pad2(Math.floor(Math.abs(offset) / 60)) + ':' + pad2(Math.abs(offset) % 60);
}

function MyWorkView({ theme }: { theme?: string }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [logs, setLogs] = useState<WorklogRow[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState<WorklogRow | null | 'new'>(null);
  const [newLogDate, setNewLogDate] = useState(isoDate(new Date()));
  const [menuId, setMenuId] = useState('');
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerSnapshot, setTimerSnapshot] = useState<{status: TimerState['status']; elapsed: number}>({status: 'idle', elapsed: 0});
  const [timerPanelWidth, setTimerPanelWidth] = useState(0);
  const isDark = theme?.startsWith('dark');
  const monday = weekStart(new Date());
  monday.setDate(monday.getDate() + weekOffset * 7);
  const dates = Array.from({ length: 7 }, (_, i) => { const d = new Date(monday); d.setDate(d.getDate() + i); return d; });
  const from = isoDate(dates[0]); const to = isoDate(dates[6]);
  const load = useCallback(async () => {
    setRefreshing(true); setError('');
    try {
      const userId = await hostApi.getUserId();
      if (!userId) throw new Error('Не удалось определить текущего пользователя.');
      let name = '';
      try {
        const me = await (trackerApi as any).v3.get['/myself']();
        const user = (me as any)?.data || me;
        name = user.display || user.name || [user.firstName, user.lastName].filter(Boolean).join(' ') || user.login || '';
      } catch { /* name is optional */ }
      if (name) setUserName(name);
      const raw: any[] = [];
      for (let page = 1; page <= 50; page++) {
        const response = await (trackerApi as any).v3.get['/worklog']({ queryParams: { createdBy: userId, perPage: 100, page } });
        const batch = (response as any)?.data || [];
        raw.push(...batch);
        if (batch.length < 100) break;
      }
      const keys = Array.from(new Set(raw.map((w: any) => extractIssueKey(w)).filter(Boolean)));
      const issueMap: Record<string, any> = {};
      for (let i = 0; i < keys.length; i += 100) {
        const issuesResponse = await (trackerApi as any).v3.post['/issues/_search']({ bodyParams: { keys: keys.slice(i, i + 100), fields: ['summary', 'type'] } });
        for (const issue of (issuesResponse as any)?.data || []) issueMap[issue.key] = issue;
      }
      const rows: WorklogRow[] = raw.map((w: any) => {
        const issueKey = extractIssueKey(w);
        const issue = issueMap[issueKey] || {};
        const d = new Date(w.start);
        return { id: String(w.id || w._id || ''), issueKey, summary: issue.summary || '', comment: w.comment || '', date: isoDate(d), durationMs: parseDurationToMs(w), type: issue.type?.key || '' };
      }).filter((w: WorklogRow) => w.date >= from && w.date <= to);
      setLogs(rows);
    } catch (e: any) { setError(e?.message || 'Не удалось загрузить ворклоги'); }
    finally { setLoading(false); setRefreshing(false); }
  }, [from, to]);
  useEffect(() => { load(); }, [load]);
  const total = logs.reduce((sum, log) => sum + log.durationMs, 0);
  const deleteLog = async (log: WorklogRow) => {
    setRefreshing(true);
    try {
      await (trackerApi as any).v3.delete['/issues/{issue}/worklog/{id}']({ pathParams: { issue: log.issueKey, id: log.id } });
      setLogs((current) => current.filter((item) => item.id !== log.id));
      setMenuId('');
    } catch (e: any) { setError(e?.message || 'Не удалось удалить ворклог'); }
    finally { setRefreshing(false); }
  };
  const applySavedWorklog = useCallback((row: WorklogRow, previousId?: string) => {
    setLogs((current) => {
      const withoutPrevious = current.filter((item) => item.id !== previousId && item.id !== row.id);
      if (row.date < from || row.date > to) return withoutPrevious;
      return [...withoutPrevious, row].sort((a, b) => a.date.localeCompare(b.date));
    });
    setRefreshing(false);
  }, [from, to]);
  const weekLabel = weekOffset === 0 ? 'Текущая неделя' :
    `${displayDate(dates[0])}.${String(dates[0].getFullYear()).slice(-2)} - ${displayDate(dates[6])}.${String(dates[6].getFullYear()).slice(-2)}`;
  const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const today = isoDate(new Date());
  const logoUrl = '/logo.svg';
  return (
    <div style={{ padding: '16px 18px 18px', color: getTextColor(theme), height: 'calc(100vh - 49px)', minHeight: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 0', minWidth: 0 }}>
          <button onClick={() => setWeekOffset((v) => v - 1)} style={weekArrow}>‹</button><span style={{ minWidth: 150, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{weekLabel}</span><button onClick={() => setWeekOffset((v) => v + 1)} style={weekArrow}>›</button>
        </div>
        <div style={{ flex: '1 1 auto', textAlign: 'center', fontSize: 16, fontWeight: 500, whiteSpace: 'nowrap' }}>
          Затрачено времени <strong>{totalHoursLabel(total)}</strong> из 40 ч
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, flex: '1 1 0' }}>
          {timerSnapshot.status !== 'idle' && <span className="timer-font" style={{ fontWeight: 700, color: '#FF6F00', fontSize: 14 }}>{formatTime(timerSnapshot.elapsed)}</span>}
          <button onClick={() => setTimerOpen((v) => !v)} style={{ ...btnStyle, background: timerSnapshot.status !== 'idle' ? '#FF6F00' : (isDark ? '#343052' : '#F0EDFF'), color: timerSnapshot.status !== 'idle' ? '#fff' : 'inherit', border: '1px solid #8B7FE0', fontWeight: 650, padding: '9px 14px' }}>⏱ Таймер</button>
        </div>
      </div>
      {(userName || refreshing) && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexShrink: 0, minHeight: 18 }}>
        <div style={{ fontSize: 13, opacity: .75 }}>{userName}</div>
        {refreshing && <span style={{ fontSize: 12, fontWeight: 400, opacity: .7 }}><span className="loading-spinner" /> Загрузка...</span>}
      </div>}
      {error && <div style={{ padding: 9, color: '#D64B4B', marginBottom: 8, flexShrink: 0 }}>{error} <button onClick={() => void load()} style={weekArrow}>Повторить</button></div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(150px, 1fr))', gap: 8, flex: 1, minHeight: 0, overflowX: 'auto', overflowY: 'hidden', alignItems: 'stretch', opacity: refreshing ? .62 : 1, transition: 'opacity .15s' }}>
        {dates.map((date, index) => {
          const day = isoDate(date);
          const dayLogs = logs.filter((log) => log.date === day);
          const dayTotal = dayLogs.reduce((sum, log) => sum + log.durationMs, 0);
          const weekend = index >= 5;
          return (
            <div key={day} style={{ minWidth: 0, minHeight: 0, padding: 9, borderRadius: 10, background: day === today ? (isDark ? '#343052' : '#F0EDFF') : weekend ? (isDark ? '#343C47' : '#ECEEF2') : (isDark ? '#303741' : '#F7F7F8'), border: day === today ? '1px solid #8B7FE0' : '1px solid rgba(128,128,128,.12)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 5, fontSize: 12, fontWeight: 700, marginBottom: 4, flexShrink: 0 }}><span>{dayNames[index]} {displayDate(date)}</span><span style={{ opacity: .65, whiteSpace: 'nowrap' }}>{hoursLabel(dayTotal)}</span></div>
              <div style={{ fontSize: 10, opacity: .55, margin: '8px 0', flexShrink: 0 }}>Ворклоги</div>
              <div className="day-worklogs-scroll" style={{ overflowY: 'auto', minHeight: 0, flex: 1, paddingRight: 2 }}>
                {dayLogs.map((log) => (
				  <div
				    key={log.id}
				    className="worklog-card"
				    onClick={(e) => {
				      if ((e.target as HTMLElement).closest('a')) return;
				      setModal(log);
				    }}
				    style={{
				      position: 'relative',
				      background: isDark ? '#424B58' : '#FFFFFF',
				      border: '1px solid rgba(128,128,128,.16)',
				      borderRadius: 7,
				      padding: '8px 7px',
				      marginBottom: 7,
				      cursor: 'pointer',
				      minWidth: 0
				    }}
				  >
				    <div style={{
				      fontSize: 12,
				      fontWeight: 650,
				      overflow: 'hidden',
				      textOverflow: 'ellipsis',
				      whiteSpace: 'nowrap',
				      paddingRight: 18
				    }}>
				      {log.summary || log.issueKey}
				    </div>
				
				    <div
				      title={log.comment}
				      style={{
				        fontSize: 11,
				        opacity: .65,
				        overflow: 'hidden',
				        textOverflow: 'ellipsis',
				        whiteSpace: 'nowrap',
				        margin: '4px 0 8px'
				      }}
				    >
				      {log.comment || 'Без комментария'}
				    </div>
				
				    <div style={{
				      display: 'flex',
				      alignItems: 'center',
				      justifyContent: 'space-between',
				      gap: 4,
				      fontSize: 10
				    }}>
				      <a
				        href={`https://tracker.yandex.ru/${log.issueKey}`}
				        target="_blank"
				        rel="noopener noreferrer"
				        style={{
				          color: '#7669C7',
				          fontWeight: 500,
				          textDecoration: 'none',
				          overflow: 'hidden',
				          textOverflow: 'ellipsis',
				          cursor: 'pointer'
				        }}
				      >
				        {log.type === 'bug' ? '🐞' : log.type === 'story' ? '📖' : '☑'} {log.issueKey}
				      </a>
				
				      <strong style={{ whiteSpace: 'nowrap' }}>
				        {hoursLabel(log.durationMs)}
				      </strong>
				    </div>
				
				    <button
				      onClick={(e) => {
				        e.stopPropagation();
				        setMenuId(menuId === log.id ? '' : log.id);
				      }}
				      title="Опции"
				      className="worklog-options"
				      style={dotsButton}
				    >
				      ···
				    </button>
				
				    {menuId === log.id && (
				      <div
				        onClick={(e) => e.stopPropagation()}
				        style={{
				          position: 'absolute',
				          right: 5,
				          top: 27,
				          zIndex: 10,
				          background: isDark ? '#242A32' : '#fff',
				          boxShadow: '0 4px 16px rgba(0,0,0,.2)',
				          borderRadius: 6,
				          padding: 4
				        }}
				      >
				        <button
				          onClick={() => void deleteLog(log)}
				          style={{ ...menuItem, color: '#D34B4B' }}
				        >
				          Удалить
				        </button>
				      </div>
				  )}
				</div>                ))}
              </div>
              <button onClick={() => { setNewLogDate(day); setModal('new'); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: 8, marginTop: 7, flexShrink: 0, border: '1px dashed rgba(128,128,128,.45)', borderRadius: 7, background: 'transparent', color: 'inherit', opacity: .8, cursor: 'pointer', fontSize: 12 }}>
                <img src={logoUrl} alt="" style={{ width: 17, height: 17, objectFit: 'contain' }} /><span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
              </button>
            </div>
          );
        })}
      </div>
      {loading && <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>Загрузка...</div>}
      <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: timerOpen ? 'block' : 'none', pointerEvents: timerOpen ? 'auto' : 'none' }}>
        <div onClick={() => setTimerOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.18)' }} />
        <aside style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: timerPanelWidth > 0 ? 'min(60%, ' + Math.max(390, timerPanelWidth) + 'px)' : 'min(28%, 390px)', minWidth: 300, background: isDark ? '#343052' : '#F0EDFF', color: getTextColor(theme), boxShadow: '-12px 0 32px rgba(0,0,0,.2)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px 0' }}><strong>⏱ Таймер</strong><button onClick={() => setTimerOpen(false)} style={weekArrow}>×</button></div>
          <GlobalTimer theme={theme} onSnapshot={setTimerSnapshot} onWorklogSaved={load} onRequiredWidth={setTimerPanelWidth} />
        </aside>
      </div>
      {modal && <WorklogModal theme={theme} initial={modal === 'new' ? undefined : modal} initialDate={newLogDate} onClose={() => setModal(null)} onSaved={applySavedWorklog} />}
    </div>
  );
}
const weekArrow: React.CSSProperties = { width: 30, height: 30, borderRadius: 7, border: '1px solid rgba(128,128,128,.3)', background: 'transparent', color: 'inherit', fontSize: 21, cursor: 'pointer', lineHeight: '20px' };
const dotsButton: React.CSSProperties = { position: 'absolute', top: 3, right: 4, border: 0, borderRadius: 5, background: 'transparent', color: 'inherit', opacity: .55, cursor: 'pointer', padding: '0 4px', fontSize: 17 };
const menuItem: React.CSSProperties = { border: 0, background: 'transparent', padding: '7px 12px', whiteSpace: 'nowrap', cursor: 'pointer', fontSize: 12 };
// --- GlobalTimer ---
function GlobalTimer({ theme, onSnapshot, onWorklogSaved, onRequiredWidth }: { theme?: string; onSnapshot?: (snapshot: {status: TimerState['status']; elapsed: number}) => void; onWorklogSaved?: () => Promise<void> | void; onRequiredWidth?: (width: number) => void }) {
  const isDark = theme?.startsWith('dark') ?? false;
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
  const buttonsRowRef = useRef<HTMLDivElement | null>(null);

  // Измеряем фактическую ширину строки кнопок и сообщаем её наверх,
  // чтобы боковая панель расширилась, если кнопки не помещаются.
  useEffect(() => {
    const el = buttonsRowRef.current;
    if (!el || !onRequiredWidth) return;
    const report = () => {
      const w = el.scrollWidth;
      if (w > 0) onRequiredWidth(Math.ceil(w) + 20 + 8); // + горизонтальные паддинги панели и запас
    };
    report();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(report);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onRequiredWidth]);

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
  useEffect(() => {
    const elapsed = state.status === 'running' && state.startedAt ? state.accumulatedMs + (Date.now() - state.startedAt) : state.accumulatedMs;
    onSnapshot?.({ status: state.status, elapsed });
  }, [state.status, state.startedAt, state.accumulatedMs, displayMs, onSnapshot]);

  const handleStart = async () => {
    const key = taskKey.trim().split(':')[0].trim().toUpperCase();
    if (!key) {
      try { uiApi.toaster.add({ title: 'Укажите ключ задачи', theme: 'warning', content: 'Например TEST-123' }); }
      catch (e) { console.warn(e); }
      return;
    }
    try {
      if (!taskKey.includes(':')) {
        const response = await (trackerApi as any).v3.post['/issues/_search']({ bodyParams: { keys: [key], fields: ['summary'] } });
        const issue = ((response as any)?.data || [])[0];
        if (issue?.summary) setTaskKey(`${key}: ${issue.summary}`);
      }
    } catch (e) { console.warn('Could not resolve task title:', e); }
    const ns: TimerState = { ...state, status: 'running', startedAt: Date.now() };
    setState(ns); saveState(ns, key);
  };
  const handlePause = () => {
    if (!state.startedAt) return;
    const elapsed = Date.now() - state.startedAt;
    const ns: TimerState = { ...state, status: 'paused', startedAt: null, accumulatedMs: state.accumulatedMs + elapsed };
    setState(ns); saveState(ns, taskKey.trim().split(':')[0].trim());
  };
  const handleResume = () => {
    const ns: TimerState = { ...state, status: 'running', startedAt: Date.now() };
    setState(ns); saveState(ns, taskKey.trim().split(':')[0].trim());
  };
  const handleStop = () => {
    let finalMs = state.accumulatedMs;
    if (state.status === 'running' && state.startedAt) finalMs += Date.now() - state.startedAt;
    submitMsRef.current = finalMs;
    const ns: TimerState = { status: 'idle', startedAt: null, accumulatedMs: finalMs, totalMs: state.totalMs + finalMs };
    setState(ns); saveState(ns, taskKey.trim().split(':')[0].trim());
    setShowForm(true); setComment(''); setErrorMsg('');
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true); setErrorMsg('');
    const ms = submitMsRef.current;
    try {
      const duration = formatDurationISO(ms);
      const startISO = getLocalISOString();
      console.log('Submitting worklog:', { issueKey: taskKey.trim().split(':')[0].trim(), duration, startISO, comment });
      const res = await trackerApi.v3.post['/issues/{issue}/worklog']({
        pathParams: { issue: taskKey.trim().split(':')[0].trim() },
        bodyParams: { start: startISO, duration, comment: comment || undefined },
      });
      console.log('Worklog response:', res);
      setState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs });
      setTaskKey('');
      await saveState({ status: 'idle', startedAt: null, accumulatedMs: 0, totalMs: state.totalMs }, '');
      setShowForm(false);
      await onWorklogSaved?.();
      try { uiApi.toaster.add({ title: 'Время отправлено', theme: 'success', content: formatDuration(ms) + ' - ' + taskKey.trim().split(':')[0].trim() }); }
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

  return (
    <div style={{ padding: '24px 20px' }}>
      <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px', opacity: 0.7 }}>Ключ задачи</label>
      <div style={{ marginBottom: 40, opacity: timerActive ? 0.5 : 1 }}>
        <TaskAutocomplete value={taskKey} onChange={(value) => setTaskKey(value.toUpperCase())}
          onSelect={(issue) => setTaskKey(`${issue.key}: ${issue.summary}`)} disabled={timerActive} />
      </div>
      <div className="timer-font" style={{ fontSize: '40px', fontWeight: 600, textAlign: 'center', marginBottom: '30px' }}>{formatTime(displayMs)}</div>
      <div ref={buttonsRowRef} style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'nowrap' }}>
        {state.status === 'idle' && <button onClick={handleStart} style={startBtnStyle}><PlayIcon /> Старт</button>}
        {isRunning && <button onClick={handlePause} style={pauseBtnStyle}><PauseIcon /> Пауза</button>}
        {isPaused && <button onClick={handleResume} style={resumeBtnStyle}><PlayOutlinedIcon /> Продолжить</button>}
        {timerActive && <button onClick={handleStop} style={stopBtnStyle}><StopIcon /> Стоп</button>}
      </div>
      {state.status === 'idle' && displayMs === 0 && !showForm && (
        <div style={{ marginTop: '36px', fontSize: '13px', opacity: 0.6, textAlign: 'center' }}>
          Введите ключ задачи и нажмите «Старт».<br />Таймер можно приостановить, нажав на кнопку «Пауза», а затем возобновить по кнопке «Продолжить».<br />После остановки по кнопке «Стоп» откроется панель для ввода комментария.
        </div>
      )}
      {showForm && (
        <div style={{ marginTop: '32px', padding: '24px', background: isDark? 'rgba(255,255,255,0.15)' : '#DFD9FF', borderRadius: '12px', border: isDark ? undefined : '1px solid #B8B8C2' }}>
          {errorMsg && <div style={{ color: '#c62828', fontSize: '13px', padding: '8px', background: 'rgba(255,0,0,0.1)', borderRadius: '6px', marginBottom: '16px' }}>{errorMsg}</div>}
          <div style={{ fontSize: '16px', fontWeight: 600, opacity: 1, marginBottom: '8px' }}>Комментарий к работе:</div>
          <textarea
		    value={comment}
		    onChange={(e) => setComment(e.target.value)}
		    placeholder="Ваш комментарий (над чем работаете, что сделано...)"
		    rows={2}
		    autoFocus
		    style={{ ...getCommentFieldStyle(isDark), resize: 'vertical', minHeight: '52px', lineHeight: 1.5, fontFamily: 'inherit' }}
		  />
          <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => setShowForm(false)} disabled={submitting} style={cancelBtnStyle}>Отмена</button>
            <button onClick={handleSubmit} disabled={submitting} style={submitBtnStyle}>{submitting ? 'Отправка…' : 'Отправить'}</button>
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
function ReportsView({ theme }: { theme?: string }) {
  const [worklogs, setWorklogs] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const [selectedQueues, setSelectedQueues] = useState<Set<string>>(new Set());
  const [queueFilterOpen, setQueueFilterOpen] = useState(false);
  const fetchedRef = useRef(false);
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [showWorklogs, setShowWorklogs] = useState(true);

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
        // Получаем ID текущего пользователя напрямую из SDK хоста.
        const userId = await hostApi.getUserId();
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

  const isDark = theme?.startsWith('dark') ?? false;
  
  const tableColors = isDark
    ? {
		header: '#343B46',
		subtotal: '#3B4653',
		total: '#303944',
		normal: '#424D5B',
		worklog: '#38424F',
		weekend: '#3A4552',
		text: '#EFEFEF',
		muted: 'rgba(255,255,255,0.6)',
		border: 'rgba(130,130,130,1)',
	  }
	: {
		header: '#E6E6E6',
		subtotal: '#DCDCDC',
		total: '#D0D0D0',
		normal: '#E6E6E6',
		worklog: '#F0F0F0',
		weekend: '#F0F0F0',
		text: '#2C2C2C',
		muted: 'rgba(0,0,0,0.6)',
		border: 'rgba(190,190,190,0.5)',
	  };
   
  const BG_SUBTOTAL = tableColors.subtotal;
  const BG_TOTAL = tableColors.total;
  const BG_NORMAL = tableColors.normal;
  const BG_WORKLOG = tableColors.worklog;
  
  const thStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderBottom: `2px solid ${tableColors.border}`,
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: tableColors.header,
    color: tableColors.text,
  };
  const thSticky = (left: number): React.CSSProperties => ({
    ...thStyle,
    position: 'sticky',
    left,
    zIndex: 3,
    backgroundColor: tableColors.header,
    color: tableColors.text,
  });
  const tdStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderBottom: `1px solid ${tableColors.border}`,
    fontSize: '12px',
    whiteSpace: 'nowrap',
    color: tableColors.text,
  };
  const tdSticky = (left: number, _bg: string): React.CSSProperties => ({
    ...tdStyle,
    position: 'sticky',
    left,
    zIndex: 2,
    backgroundColor: tableColors.header,
  });
  const tdTime: React.CSSProperties = {
    ...tdStyle,
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
  };
  const subtotalRowStyle: React.CSSProperties = {
    backgroundColor: BG_SUBTOTAL,
    color: tableColors.text,
    fontWeight: 600,
  };

  const totalRowStyle: React.CSSProperties = {
    backgroundColor: BG_TOTAL,
    color: tableColors.text,
    fontWeight: 700,
    position: 'sticky' as const,
    bottom: 0,
    zIndex: 3,
  };

  const worklogRowStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 400,
    color: tableColors.muted,
    backgroundColor: BG_WORKLOG,
    fontStyle: 'normal',
  };

  const navBtnStyle: React.CSSProperties = {
    ...btnStyle,
    padding: '4px 10px',
    fontSize: '14px',
    minWidth: '32px',
  };

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
                background: isDark ? '#343B46' : '#FFFFFF',
                color: tableColors.text,
                border: `1px solid ${tableColors.border}`,
                borderRadius: '6px',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
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
        {viewMode === 'table' && (
		  <label
		    style={{
		      display: 'flex',
		      alignItems: 'center',
		      gap: '5px',
		      marginLeft: '12px',
		      fontSize: '12px',
		      cursor: 'pointer',
		      userSelect: 'none',
		    }}
		  >
		    <input
		      type="checkbox"
		      checked={showWorklogs}
		      onChange={(e) => setShowWorklogs(e.target.checked)}
		    />
		    Ворклог
		  </label>
		)}
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
                    <td style={{ ...tdSticky(COL_Q + COL_K, BG_SUBTOTAL), fontStyle: 'normal', opacity: 1 }}>Подытог:</td>
                    <td style={{ ...tdSticky(LEFT_T, BG_SUBTOTAL), textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                      <strong>{formatDuration(queueTotal(q))}</strong>
                    </td>
                    {dates.map((d) => {
                      const val = queueDayTotal(q, d);
                      return (
                        <td key={d} style={{ ...tdTime, backgroundColor: tableColors.subtotal, fontWeight: 600, color: val === 0 ? 'rgba(128,128,128,0.3)' : 'inherit' }}>
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
                          <td style={{ ...tdSticky(0, BG_NORMAL), opacity: 1 }}></td>
                          
                          <td style={tdSticky(COL_Q, BG_NORMAL)}>
                            <a
                              href={`https://tracker.yandex.ru/${ik}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                              	color: 'inherit',
                              	textDecoration: 'underline',
                              	textUnderlineOffset: '2px',
                              }}
                             >
                               {ik}
                             </a>
                            </td>
                          
                          <td style={{ ...tdSticky(COL_Q + COL_K, BG_NORMAL), maxWidth: COL_N + 'px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={issue.summary}>📌 {issue.summary}</td>
                          <td style={{ ...tdSticky(LEFT_T, BG_NORMAL), textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                            {issueTotal > 0 ? formatDuration(issueTotal) : '—'}
                          </td>
                          {dates.map((d) => {
                            const val = issue.byDay[d] || 0;
                            return (
                              <td key={d} style={{ ...tdTime, color: val === 0 ? 'rgba(128,128,128,0.25)' : 'inherit', backgroundColor: isWeekend(d) ? tableColors.weekend : 'transparent' }}>
                                {val > 0 ? formatDuration(val) : '—'}
                              </td>
                            );
                          })}
                        </tr>
                        {/* Worklog sub-rows */}
                        {showWorklogs && dates.map((d) => {
                          const dayWorklogs = worklogsByDay[d];
                          if (!dayWorklogs || dayWorklogs.length === 0) return null;
                          return dayWorklogs.map((wl, wi) => (
                            <tr key={ik + '_wl_' + d + '_' + wi} style={worklogRowStyle}>
                              <td style={tdSticky(0, BG_WORKLOG)}></td>
                              <td style={tdSticky(COL_Q, BG_WORKLOG)}></td>
                              
                              <td
                                style={{
                                  ...tdSticky(COL_Q + COL_K, BG_WORKLOG),
                                  maxWidth: COL_N + 'px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
							      fontSize: '12px',
								  fontWeight: 400,
							      fontStyle: 'normal',
							      color: tableColors.muted,
							    }}
								title={wl.comment || '(без комментария)'}
                              >
                                <span style={{ display: 'inline-block', width: '18px', marginLeft: '28px', color: '#35A56A', fontSize: '11px' }}>
	                              ✓
	                            </span>
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
              <td style={{ ...tdSticky(0, BG_TOTAL), fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 4 }}>
                <strong>Итого:</strong>
              </td>
              <td style={{ ...tdSticky(COL_Q, BG_TOTAL), fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 4 }}></td>
              <td style={{ ...tdSticky(COL_Q + COL_K, BG_TOTAL), fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 4 }}></td>
              <td style={{ ...tdSticky(LEFT_T, BG_TOTAL), fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 4, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                <strong>{formatDuration(grandTotal)}</strong>
              </td>
              {dates.map((d) => (
                <td key={d} style={{ ...tdTime, backgroundColor: tableColors.total, fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 3 }}>
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
                    <td style={{ backgroundColor: tableColors.subtotal, fontWeight: 600 }} colSpan={3}></td>
                  </tr>
                  {issueKeys.map((ik) => {
                    const issue = queueMap[q][ik];
                    let issueTotal = 0;
                    for (const d of dates) issueTotal += issue.byDay[d] || 0;
                    return (
                      <React.Fragment key={ik}>
                        <tr>
                          <td style={{ ...tdSticky(0, BG_NORMAL), opacity: 1 }}></td>
                          <td style={tdSticky(COL_Q, BG_NORMAL)}>
						    <a
						      href={`https://tracker.yandex.ru/${ik}`}
						      target="_blank"
						      rel="noopener noreferrer"
						      style={{
						        color: 'inherit',
						        textDecoration: 'underline',
						        textUnderlineOffset: '2px',
						        cursor: 'pointer',
						       }}
						    >
						      {ik}
						    </a>
						  </td>
                          
                          <td
                            style={{
                              ...tdSticky(COL_Q + COL_K, BG_NORMAL),
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={issue.summary}
                          >
                            📌 {issue.summary}
                          </td>
                          <td style={{ ...tdSticky(LEFT_T, BG_NORMAL), textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                            {issueTotal > 0 ? formatDuration(issueTotal) : '—'}
                          </td>
                          <td style={{ ...tdStyle, color: tableColors.muted, fontSize: '11px' }} colSpan={3}>{issue.worklogs.length} ворклог(ов)</td>
                        </tr>
                        {issue.worklogs.map((wl, wi) => (
                          <tr key={ik + '_wl_' + wi} style={worklogRowStyle}>
                            <td style={tdSticky(0, BG_WORKLOG)}></td>
                            <td style={tdSticky(COL_Q, BG_WORKLOG)}></td>
                            <td style={tdSticky(COL_Q + COL_K, BG_WORKLOG)}></td>
                            <td style={tdSticky(LEFT_T, BG_WORKLOG)}></td>
                            <td style={{ ...tdStyle, fontSize: '12px', whiteSpace: 'nowrap' }}>
                              {formatDateHeader(wl.day)}
                            </td>
                            <td style={{ ...tdTime, fontSize: '12px' }}>
                              {formatDuration(wl.durationMs)}
                            </td>
                            <td
                              style={{
                              	...tdStyle,
                              	fontSize: '12px',
                              	fontWeight: 400,
							    fontStyle: 'normal',
							    whiteSpace: 'pre-wrap',
							    wordBreak: 'break-word',
							    lineHeight: '1.4',
							    paddingLeft: '18px',
                              }}
                            >
                              <span style={{ color: '#35A56A', marginRight: '6px' }}>
                                ✓
                              </span>
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
              <td style={{ ...tdSticky(0, BG_TOTAL), fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 4 }} colSpan={3}>
                <strong>Итого:</strong>
              </td>
              <td style={{ ...tdSticky(LEFT_T, BG_TOTAL), fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 4, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                <strong>{formatDuration(grandTotal)}</strong>
              </td>
              <td style={{ backgroundColor: tableColors.total, fontSize: '14px', fontWeight: 700, position: 'sticky' as const, bottom: 0, zIndex: 3}} colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
