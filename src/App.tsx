import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
const BG_LIGHT = '#FEFEFE';
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
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return hours + ' ч ' + minutes + ' м';
  return minutes + ' м';
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
        <div style={{ flex: '1 1 auto', textAlign: 'center', fontSize: 16, fontWeight: 400, whiteSpace: 'nowrap' }}>
          Затрачено времени <strong>{totalHoursLabel(total)}</strong> из 40 ч
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, flex: '1 1 0' }}>
          {timerSnapshot.status !== 'idle' && <span className="timer-font" style={{ fontWeight: 700, color: '#FF6F00', fontSize: 14 }}>{formatTime(timerSnapshot.elapsed)}</span>}
          <button onClick={() => setTimerOpen((v) => !v)} style={{ ...btnStyle, background: timerSnapshot.status !== 'idle' ? '#FF6F00' : (isDark ? '#343052' : '#F0EDFF'), color: timerSnapshot.status !== 'idle' ? '#fff' : 'inherit', border: '1px solid #8B7FE0', fontWeight: 650, padding: '9px 14px' }}>⏱ Таймер</button>
        </div>
      </div>
      {refreshing && <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, flexShrink: 0, minHeight: 18 }}>
		<span style={{ fontSize: 12, fontWeight: 400, opacity: .7 }}><span className="loading-spinner" /> Загрузка...</span>
	  </div>}
	  {error && <div style={{ padding: 9, color: '#D64B4B', marginBottom: 8, flexShrink: 0 }}>{error} <button onClick={() => void load()} style={weekArrow}>Повторить</button></div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(150px, 1fr))', gap: 8, flex: 1, minHeight: 0, overflowX: 'auto', overflowY: 'hidden', alignItems: 'stretch', opacity: refreshing ? .62 : 1, transition: 'opacity .15s' }}>
        {dates.map((date, index) => {
          const day = isoDate(date);
          const dayLogs = logs.filter((log) => log.date === day);
          const dayTotal = dayLogs.reduce((sum, log) => sum + log.durationMs, 0);
          const weekend = index >= 5;
          return (
            <div key={day} style={{ minWidth: 0, minHeight: 0, padding: 9, borderRadius: 10, background: day === today ? (isDark ? '#343052' : '#F0EDFF') : weekend ? (isDark ? '#343C47' : '#ECEEF2') : (isDark ? '#303741' : '#F7F7F7'), border: day === today ? '1.4px solid #8B7FE0' : '1.5px solid rgba(128,128,128,.12)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
  const timeColor = theme?.startsWith('dark') ? '#FFFFFF' : '#131962';

  return (
    <div style={{ padding: '24px 20px' }}>
      <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px', opacity: 0.7 }}>Ключ задачи</label>
      <div style={{ marginBottom: 40, opacity: timerActive ? 0.5 : 1 }}>
        <TaskAutocomplete value={taskKey} onChange={(value) => setTaskKey(value.toUpperCase())}
          onSelect={(issue) => setTaskKey(`${issue.key}: ${issue.summary}`)} disabled={timerActive} />
      </div>
      <div className="timer-font" style={{ fontSize: '40px', color: timeColor, fontWeight: 600, textAlign: 'center', marginBottom: '30px' }}>{formatTime(displayMs)}</div>
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

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

// --- ReportsView ---
// Модульные кеши: метаданные задач переживают перерисовки и смену периодов.
const reportsIssueCache = new Map<string, any>();
const reportsEpicFetched = new Set<string>();
const reportsTeamsCache: { data: any[] | null } = { data: null };

function reportsObjKey(o: any): string {
  if (!o) return '';
  if (typeof o === 'string') return o;
  return o.key || o.id || '';
}

function reportsObjName(o: any): string {
  if (!o) return '';
  if (typeof o === 'string') return o;
  return o.name || o.display || o.value || o.summary || '';
}

function reportsIsSubtaskMeta(meta: any): boolean {
  if (!meta) return false;
  const tk = String(reportsObjKey(meta.type) || '').toLowerCase();
  const tn = String(reportsObjName(meta.type) || '').toLowerCase();
  return tk === 'subtask' || tn.includes('подзадач') || tn.includes('sub-task') || tn.includes('subtask');
}

// Подзадачей считаем и задачу с родителем-задачей (не Epic/Story): в Трекере
// подзадача может иметь обычный тип «Задача», связь видна только через parent.
function reportsIsSubByParent(meta: any): boolean {
  if (!meta) return false;
  return !!reportsObjKey(meta.parent);
}

// Иконки типов (SVG в стилистике Трекера — API иконки не отдаёт)
function reportsTypeIcon(tk: string, tn: string, size: number): any {
  const k = String(tk || '').toLowerCase();
  const n = String(tn || '').toLowerCase();
  if (k === 'bug' || n.includes('ошиб') || n.includes('bug')) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
        <circle cx="8" cy="8" r="6.2" fill="#E5484D" />
        <path d="M8 4.2v7.6M4.6 6h6.8M4.6 10h6.8" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
      </svg>
    );
  }
  if (k === 'epic' || n.includes('эпик')) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
        <circle cx="8" cy="8" r="6.2" fill="#F5A623" />
        <path d="M3.8 11.5L6.6 5.2L8.8 8.8L10.4 6.6L12.2 11.5Z" fill="#FFFFFF" />
      </svg>
    );
  }
  if (k === 'story' || n.includes('истори') || n.includes('story')) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
        <circle cx="8" cy="8" r="6.2" fill="#2BB673" />
        <path d="M5.6 3.8h4.8v8l-2.4-1.8-2.4 1.8Z" fill="#FFFFFF" />
      </svg>
    );
  }
  if (k === 'subtask' || n.includes('подзадач') || n.includes('sub-task') || n.includes('subtask')) {
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
        <circle cx="8" cy="8" r="6.2" fill="none" stroke="#8B7FE0" strokeWidth="1.3" strokeDasharray="2.5 2" />
        <path d="M5 6.2h6M5 9.8h4" stroke="#8B7FE0" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ flexShrink: 0, display: 'block' }}>
      <circle cx="8" cy="8" r="6.2" fill="#4A7CF7" />
      <path d="M5 8.2l2.1 2.1L11 5.9" stroke="#FFFFFF" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function reportsTypeDisplayName(tk: string, tn: string): string {
  const k = String(tk || '').toLowerCase();
  if (k === 'task') return 'Задача';
  if (k === 'bug') return 'Ошибка';
  if (k === 'epic') return 'Epic';
  if (k === 'story') return 'Story';
  if (k === 'subtask') return 'Sub-task';
  return tn || 'Другое';
}

// Цепочка задачи: эпик / стори / родительская задача / подзадача / fix version.
// Чистый пересчёт из модульного кеша — не хранится в стейте, поэтому устаревших
// или «призрачных» значений быть не может.
function reportsComputeChain(issueKey: string) {
  const selfMeta = reportsIssueCache.get(issueKey) || null;
  let epicKey = '', epicSummary = '', storyKey = '', storySummary = '';
  let taskKey = '', taskSummary = '', subtaskKey = '', subtaskSummary = '';
  let fixVersion = selfMeta && selfMeta.fixVersions && selfMeta.fixVersions[0] ? reportsObjName(selfMeta.fixVersions[0]) : '';
  if (selfMeta) {
    const ek = reportsObjKey(selfMeta.epic);
    if (ek) { epicKey = ek; epicSummary = reportsObjName(selfMeta.epic); }
  }
  if (reportsIsSubtaskMeta(selfMeta) || reportsIsSubByParent(selfMeta)) {
    subtaskKey = issueKey;
    subtaskSummary = (selfMeta && selfMeta.summary) || '';
  }
  let cur = issueKey, hops = 0;
  while (cur && hops < 8) {
    const meta = reportsIssueCache.get(cur);
    if (!meta) break;
    const tk = String(reportsObjKey(meta.type) || '').toLowerCase();
    const isSub = reportsIsSubtaskMeta(meta) || reportsIsSubByParent(meta);
    if (tk === 'story' && !storyKey) { storyKey = cur; storySummary = meta.summary || ''; }
    if (tk === 'epic' && !epicKey) { epicKey = cur; epicSummary = meta.summary || ''; }
    if (!isSub && !taskKey) { taskKey = cur; taskSummary = meta.summary || ''; }
    const ek2 = reportsObjKey(meta.epic);
    if (ek2 && !epicKey) {
      const em = reportsIssueCache.get(ek2);
      epicKey = ek2;
      epicSummary = (em && em.summary) || reportsObjName(meta.epic) || '';
    }
    const pv = meta.fixVersions && meta.fixVersions[0] ? reportsObjName(meta.fixVersions[0]) : '';
    if (pv && !fixVersion) fixVersion = pv;
    const pk = reportsObjKey(meta.parent);
    if (!pk) break;
    cur = pk; hops++;
  }
  return {
    _queue: selfMeta ? reportsObjKey(selfMeta.queue) || '' : '',
    _typeKey: selfMeta ? reportsObjKey(selfMeta.type) || '' : '',
    _typeName: selfMeta ? reportsObjName(selfMeta.type) || '' : '',
    _epicKey: epicKey, _epicSummary: epicSummary,
    _storyKey: storyKey, _storySummary: storySummary,
    _taskKey: taskKey || issueKey,
    _taskSummary: taskSummary || (selfMeta && selfMeta.summary) || '',
    _subtaskKey: subtaskKey, _subtaskSummary: subtaskSummary,
    _fixVersion: fixVersion,
  };
}

const WEEKDAYS_RU: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const reportsLevelNames: Record<string, string> = {
  queue: 'Очередь',
  employee: 'Сотрудник',
  epic: 'Epic',
  story: 'Story',
  fixversion: 'Fix version',
  task: 'Задача',
  subtask: 'Sub-task',
  worklog: 'Ворклог',
};

// Значение строки для уровня группировки. null = уровень к этой строке неприменим
// (например, «Sub-task» у обычной задачи) — строка проходит на следующий уровень.
function reportsLevelValue(row: any, level: string): { key: string; label: string; issueKey?: string; summary?: string } | null {
  const c = row._chain;
  switch (level) {
    case 'queue': {
      const q = c._queue || '—';
      return { key: q, label: q };
    }
    case 'employee':
      return { key: row._userLogin, label: row._userName || row._userLogin };
    case 'epic':
      return c._epicKey
        ? { key: c._epicKey, label: c._epicKey, issueKey: c._epicKey, summary: c._epicSummary }
        : { key: '—', label: '—' };
    case 'story':
      return c._storyKey
        ? { key: c._storyKey, label: c._storyKey, issueKey: c._storyKey, summary: c._storySummary }
        : { key: '—', label: '—' };
    case 'fixversion': {
      const v = c._fixVersion || '—';
      return { key: v, label: v };
    }
    case 'task':
      return { key: c._taskKey, label: c._taskKey, issueKey: c._taskKey, summary: c._taskSummary };
    case 'subtask':
      return c._subtaskKey
        ? { key: c._subtaskKey, label: c._subtaskKey, issueKey: c._subtaskKey, summary: c._subtaskSummary }
        : null;
    case 'worklog':
      return { key: row._wlId, label: '', issueKey: row._issueKey, summary: row._comment };
  }
  return null;
}

function reportsLeafNode(row: any) {
  return {
    level: 'worklog',
    key: row._wlId,
    label: '',
    issueKey: row._issueKey,
    summary: row._comment,
    depth: 0,
    children: [] as any[],
    worklog: row,
    ms: 0,
    byDay: {} as Record<string, number>,
  };
}

// Построение дерева. showWl = в группировке есть уровень «Ворклог»: только тогда
// в таблицу попадают строки-комментарии. Иначе уровни заканчиваются строкой-задачей
// (одна строка на задачу, суммы по дням — из её ворклогов). Уровень «Ворклог» не
// группируется: сразу возвращает листья, иначе были бы группы-дубли строк.
function reportsBuildTree(items: any[], levels: string[], showWl: boolean): any[] {
  if (!levels.length) {
    if (showWl) return items.map((r: any) => reportsLeafNode(r));
    const map = new Map<string, { key: string; summary: string; rows: any[] }>();
    for (const r of items) {
      const k = r._issueKey || '—';
      let g = map.get(k);
      if (!g) {
        g = { key: k, summary: r._chain._taskSummary || r._summary || '', rows: [] };
        map.set(k, g);
      }
      g.rows.push(r);
    }
    return Array.from(map.values()).map((g) => ({
      level: 'task',
      key: g.key,
      label: g.key,
      issueKey: g.key,
      summary: g.summary,
      depth: 0,
      children: [] as any[],
      worklog: null,
      ms: 0,
      byDay: {} as Record<string, number>,
      rows: g.rows,
    }));
  }
  const lvl = levels[0];
  const rest = levels.slice(1);
  if (lvl === 'worklog') return items.map((r: any) => reportsLeafNode(r));
  const groups = new Map<string, { v: any; rows: any[] }>();
  const direct: any[] = [];
  for (const row of items) {
    const v = reportsLevelValue(row, lvl);
    if (!v) { direct.push(row); continue; }
    let g = groups.get(v.key);
    if (!g) { g = { v, rows: [] }; groups.set(v.key, g); }
    g.rows.push(row);
  }
  const nodes: any[] = Array.from(groups.values()).map((g) => {
    // Последний уровень «Задача» сам является конечной строкой, без вложенного дубля.
    const isFinalTask = lvl === 'task' && rest.length === 0 && !showWl;
    return {
      level: lvl,
      key: g.v.key,
      label: g.v.label,
      issueKey: g.v.issueKey || '',
      summary: g.v.summary || '',
      depth: 0,
      children: isFinalTask ? [] : reportsBuildTree(g.rows, rest, showWl),
      worklog: null,
      ms: 0,
      byDay: {} as Record<string, number>,
      ...(isFinalTask ? { rows: g.rows } : {}),
    };
  });
  if (direct.length) nodes.push(...reportsBuildTree(direct, rest, showWl));
  nodes.sort((a: any, b: any) => String(a.label).localeCompare(String(b.label), undefined, { numeric: true }));
  return nodes;
}

// Суммы снизу вверх: свои строки (у листа-задачи) плюс дети; byDay накапливается
// на каждом уровне — время по дням видно у задач, групп и подытогов.
function reportsFinalizeTree(nodes: any[]): number {
  let total = 0;
  for (const n of nodes) {
    let ms = 0;
    const byDay: Record<string, number> = {};
    const own: any[] = (n as any).rows || (n.worklog ? [n.worklog] : []);
    for (const r of own) {
      const wms = r._durationMs || 0;
      ms += wms;
      const day = r._startDate || '';
      if (day) byDay[day] = (byDay[day] || 0) + wms;
    }
    if (n.children.length) ms += reportsFinalizeTree(n.children);
    for (const c of n.children) {
      for (const d in c.byDay) byDay[d] = (byDay[d] || 0) + c.byDay[d];
    }
    n.ms = ms;
    n.byDay = byDay;
    total += ms;
  }
  return total;
}

function reportsSortTree(nodes: any[]) {
  nodes.sort((a: any, b: any) => {
    const aw = !!a.worklog, bw = !!b.worklog;
    if (aw !== bw) return aw ? 1 : -1;
    if (aw) {
      return String(a.worklog._startDate + (a.worklog._startHm || ''))
        .localeCompare(String(b.worklog._startDate + (b.worklog._startHm || '')));
    }
    return String(a.label).localeCompare(String(b.label), undefined, { numeric: true });
  });
  for (const n of nodes) if (n.children.length) reportsSortTree(n.children);
}



function ReportsView({ theme }: { theme?: string }) {
  const isDark = theme?.startsWith('dark') ?? false;
  const panelBg = isDark ? '#303741' : '#FFFFFF';
  const rowBg = isDark ? '#303741' : '#FFFFFF';
  const altBg = isDark ? '#343C47' : '#FAFAFC';
  const groupBg = isDark ? '#3A4655' : '#EEF1FA';
  const lineColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
  const textMain = getTextColor(theme);
  const textMuted = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.7)';
  const linkColor = isDark ? '#8B9BF4' : '#4A5BD4';

  const [worklogs, setWorklogs] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [onlyMine, setOnlyMine] = useState(false);
  const [metaVersion, setMetaVersion] = useState(0);
  const fetchedRangeRef = useRef('');

  const [selQueues, setSelQueues] = useState<Set<string>>(new Set());
  const [selEmployees, setSelEmployees] = useState<Set<string>>(new Set());
  const [selTeams, setSelTeams] = useState<Set<string>>(new Set());
  const [selTypes, setSelTypes] = useState<Set<string>>(new Set());
  const [openPanel, setOpenPanel] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [groupLevels, setGroupLevels] = useState<string[]>(['queue', 'employee', 'task']);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [teamsLoading, setTeamsLoading] = useState(true);

  useEffect(() => {
    const [f, t] = getMonthRange();
    setDateFrom(f);
    setDateTo(t);
  }, []);

  const shiftMonth = (delta: number) => {
    const d = new Date((dateFrom || '') + 'T00:00:00');
    if (isNaN(d.getTime())) return;
    d.setMonth(d.getMonth() + delta);
    const y = d.getFullYear(), m = d.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    setDateFrom(first.getFullYear() + '-' + pad2(first.getMonth() + 1) + '-' + pad2(first.getDate()));
    setDateTo(last.getFullYear() + '-' + pad2(last.getMonth() + 1) + '-' + pad2(last.getDate()));
  };

  const monthLabel = useMemo(() => {
    if (!dateFrom) return '';
    const d = new Date(dateFrom + 'T00:00:00');
    return MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();
  }, [dateFrom]);


  // Загрузка всех доступных ворклогов без фильтра по createdAt.
  // Фактический период отчета определяется только по дате start.
  useEffect(() => {
    if (!dateFrom || !dateTo) return;

    const rangeId = dateFrom + '|' + dateTo;
    if (fetchedRangeRef.current === rangeId) return;

    fetchedRangeRef.current = rangeId;
    let cancelled = false;

    setLoading(true);
    setOnlyMine(false);

    (async () => {
      try {
        const loadStartedAt = performance.now();
        const userId = await hostApi.getUserId();

        const fetchPages = async (createdBy?: string[]) => {
          const perPage = 100;
          const pageConcurrency = 10;
          const seenIds = new Set<string>();
          const out: any[] = [];

          const take = (batch: any[]) => {
            for (const w of batch) {
              const id = w.id || w.self;

              if (id && seenIds.has(id)) continue;
              if (id) seenIds.add(id);

              out.push(w);
            }
          };

          // Важно: здесь намеренно нет фильтра по датам.
          // GET /worklog получает записи независимо от createdAt и start.
          const qp = (page: number): any => {
            const q: any = { perPage, page };
            if (createdBy) q.createdBy = createdBy;
            return q;
          };

          let page = 1;
          let hasMore = true;

          while (hasMore) {
            const pageList: number[] = [];

            for (let p = page; p < page + pageConcurrency; p++) {
              pageList.push(p);
            }

            const results = await Promise.all(
              pageList.map(async (p) => {
                const response = await trackerApi.v3.get['/worklog']({
                  queryParams: qp(p),
                });
                return (response as any)?.data || [];
              })
            );

            for (const batch of results) {
              take(batch);
            }

            // Если хотя бы одна страница неполная, следующей страницы нет.
            hasMore = results.every((batch) => batch.length === perPage);
            page += pageConcurrency;
          }

          return out;
        };

        const worklogsStartedAt = performance.now();
        let all: any[] = [];
        let usedFallback = false;

        try {
          all = await fetchPages();
        } catch (eAll) {
          console.log(
            '[ReportsView] fetch-all failed, fallback to own:',
            eAll
          );

          usedFallback = true;
          all = await fetchPages([String(userId)]);
        }

        if (usedFallback) setOnlyMine(true);
        console.log('[ReportsView] timing: worklogs API', Math.round(performance.now() - worklogsStartedAt), 'ms');

        if (cancelled) return;

        // Фильтруем строго по дате фактической работы - w.start.
        // createdAt не используется для определения периода отчета.
        const filteredAll = all.filter((w: any) => {
          if (!w.start) return false;

          const d = new Date(w.start);
          if (Number.isNaN(d.getTime())) return false;

          const startDate =
            d.getFullYear() +
            '-' +
            pad2(d.getMonth() + 1) +
            '-' +
            pad2(d.getDate());

          return startDate >= dateFrom && startDate <= dateTo;
        });

        console.log(
          '[ReportsView] worklogs loaded:',
          all.length,
          '| in selected start-date range:',
          filteredAll.length,
          usedFallback ? '(own only)' : '(all available)'
        );

        const lite = filteredAll.map((w: any) => {
          const key = extractIssueKey(w);
          const d = new Date(w.start);

          return {
            _wlId: String(w.id || w.self || Math.random()),
            _issueKey: key,
            _durationMs: parseDurationToMs(w),
            _startDate:
              d.getFullYear() +
              '-' +
              pad2(d.getMonth() + 1) +
              '-' +
              pad2(d.getDate()),
            _startHm: pad2(d.getHours()) + ':' + pad2(d.getMinutes()),
            _comment: w.comment || '',
            _userLogin:
              (w.createdBy &&
                (w.createdBy.login || String(w.createdBy.id || ''))) ||
              '—',
            _userName:
              (w.createdBy &&
                (w.createdBy.display || w.createdBy.name)) ||
              '—',
          };
        });

        setWorklogs(lite);
        setLoading(false);

        const bump = () => {
          if (!cancelled) setMetaVersion((v) => v + 1);
        };

        // Метаданные загружаем только для задач из выбранного периода.
        const keysSet = new Set<string>();

        for (const w of filteredAll) {
          const k = extractIssueKey(w);
          if (k) keysSet.add(k);
        }

        const keys = Array.from(keysSet);
        const metadataStartedAt = performance.now();

		const enrichChunk = async (ck: string[]) => {
		  if (!ck.length) return true;
		
		  try {
		    const res = await trackerApi.v3.post['/issues/_search']({
		      bodyParams: {
		        keys: ck,
		        perPage: 100,
		        fields: ['summary', 'queue', 'type', 'fixVersions', 'parent', 'epic'],
		      } as any,
		    });
		
		    for (const it of (res as any)?.data || []) {
		      if (it && it.key) reportsIssueCache.set(it.key, it);
		    }
		
		    return true;
		  } catch (e1) {
		    // Повторяем запрос без epic, если API не принимает это поле
		    try {
		      const res2 = await trackerApi.v3.post['/issues/_search']({
		        bodyParams: {
		          keys: ck,
		          perPage: 100,
		          fields: ['summary', 'queue', 'type', 'fixVersions', 'parent'],
		        } as any,
		      });
		
		      for (const it of (res2 as any)?.data || []) {
		        if (it && it.key) reportsIssueCache.set(it.key, it);
		      }
		
		      return true;
		    } catch (e2) {
		      console.log('[ReportsView] enrich chunk failed:', e2);
		      return false;
		    }
		  }
		};
		
		// Этап 1: метаданные задач пакетами по 100 ключей,
		// одновременно выполняем не более 3 запросов
		for (let i = 0; i < keys.length; i += 300) {
		  const chunks: string[][] = [];
		
		  for (let j = i; j < Math.min(i + 300, keys.length); j += 100) {
		    chunks.push(keys.slice(j, j + 100));
		  }
		
		  await Promise.all(chunks.map((chunk) => enrichChunk(chunk)));
		  bump();
		}
		
        console.log('[ReportsView] timing: direct issue metadata', Math.round(performance.now() - metadataStartedAt), 'ms', '| unique issues:', keys.length);
        const parentsStartedAt = performance.now();

		// Этап 2: расширяем родительские цепочки вверх,
		// пока появляются новые ключи
		for (let round = 0; round < 8; round++) {
		  const missing = new Set<string>();
		
		  for (const k of keys) {
		    let cur = k;
		
		    for (let h = 0; h < 8; h++) {
		      const meta = reportsIssueCache.get(cur);
		      if (!meta) break;
		
		      const pk = reportsObjKey(meta.parent);
		      if (!pk) break;
		
		      if (!reportsIssueCache.has(pk)) {
		        missing.add(pk);
		      }
		
		      cur = pk;
		    }
		  }
		
		  const mList = Array.from(missing);
		  if (!mList.length) break;
		
		  for (let i = 0; i < mList.length; i += 300) {
		    const chunks: string[][] = [];
		
		    for (let j = i; j < Math.min(i + 300, mList.length); j += 100) {
		      chunks.push(mList.slice(j, j + 100));
		    }
		
		    await Promise.all(chunks.map((chunk) => enrichChunk(chunk)));
		  }
		
		  bump();
		}

        console.log('[ReportsView] timing: parent chains', Math.round(performance.now() - parentsStartedAt), 'ms');
        const epicsStartedAt = performance.now();

        // Этап 3: эпики. У _search поле epic может не приходить — добираем полные задачи по ключам.
        const tops = new Set<string>();
        for (const k of keys) {
          const c = reportsComputeChain(k);
          if (c._taskKey) tops.add(c._taskKey);
          if (c._epicKey) tops.add(c._epicKey);
        }
        // _search уже вернул метаданные большинства задач. Запрашиваем только
        // отсутствующие ключи и делаем это пакетами через _search, а не отдельным
        // GET /issues/{issue} для каждой задачи/эпика.
        const toFetch = Array.from(tops).filter(
          (k: string) => k && k !== '—' && !reportsIssueCache.has(k) && !reportsEpicFetched.has(k)
        ).slice(0, 300);
        const doneNow = new Set<string>();
        for (let i = 0; i < toFetch.length; i += 100) {
          const chunk = toFetch.slice(i, i + 100);
          const ok = await enrichChunk(chunk);
          for (const k of chunk) {
            doneNow.add(k);
            if (ok) reportsEpicFetched.add(k);
          }
          if (!ok) {
            console.warn('[ReportsView] batch epic metadata fetch failed:', chunk);
          }
        }
        if (doneNow.size) bump();

        console.log('[ReportsView] timing: epic details', Math.round(performance.now() - epicsStartedAt), 'ms', '| fetched:', doneNow.size);
        const teamsStartedAt = performance.now();
        // Этап 4: команды очередей (для фильтра «Команды»)        
        setTeamsLoading(true);
        if (!reportsTeamsCache.data) {
	      try {
	        const res = await trackerApi.v3.get['/queues']({
	          queryParams: {
	            perPage: 1000,
	            expand: 'team',
	          } as any,
	        });
	
	        const payload = (res as any)?.data ?? res;
	
	        if (Array.isArray(payload)) {
	          reportsTeamsCache.data = payload;
	          console.log('[ReportsView] queues loaded:', payload.length);
	          console.log('[ReportsView] queues sample:', payload[0]);
	        } else {
	          console.error('[ReportsView] unexpected queues response:', res);
	          reportsTeamsCache.data = null;
	        }
	      } catch (e) {
	        console.error('[ReportsView] teams fetch failed:', e);
	        reportsTeamsCache.data = null;
	      }
	    }
	    setTeamsLoading(false);
        console.log('[ReportsView] timing: queues/teams', Math.round(performance.now() - teamsStartedAt), 'ms');
        console.log('[ReportsView] timing: total report load', Math.round(performance.now() - loadStartedAt), 'ms');
	    bump();
      
      } catch (e) {
        console.log('[ReportsView] load error:', e);
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [dateFrom, dateTo]);

  // Производные данные: чистый пересчёт из кеша при каждом обновлении мета-данных.
  const enriched = useMemo(() => {
    return worklogs.map((w: any) => ({ ...w, _chain: reportsComputeChain(w._issueKey) }));
  }, [worklogs, metaVersion]);

  const queueOptions = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of enriched) { const q = r._chain._queue || '—'; if (!m.has(q)) m.set(q, q); }
    return Array.from(m.keys()).sort((a: string, b: string) => a.localeCompare(b, undefined, { numeric: true }));
  }, [enriched]);

  const employeeOptions = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of enriched) if (!m.has(r._userLogin)) m.set(r._userLogin, r._userName || r._userLogin);
    return Array.from(m.entries()).map(([k, v]: [string, any]) => ({ key: k, label: v })).sort((a: any, b: any) => a.label.localeCompare(b.label, 'ru'));
  }, [enriched]);

  const typeOptions = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of enriched) {
      const tk = r._chain._typeKey;
      const tn = reportsTypeDisplayName(tk, r._chain._typeName);
      if (tk) m.set(tk, tn); else m.set('__none__', 'Другое');
    }
    return Array.from(m.entries()).map(([k, v]: [string, any]) => ({ key: k, label: v })).sort((a: any, b: any) => a.label.localeCompare(b.label, 'ru'));
  }, [enriched]);

  const teamOptions = useMemo(() => {
    const list = reportsTeamsCache.data || [];
    const byTeam = new Map<string, { key: string; label: string; members: string[]; queues: string[] }>();

    const collectLogins = (value: any): string[] => {
      if (!value) return [];
      const source = Array.isArray(value) ? value :
        (typeof value === 'object'
          ? (value.users || value.members || value.teamUsers || value.memberships || value.staff || [])
          : [value]);
      if (!Array.isArray(source)) return [];
      return source.map((u: any) => {
        if (typeof u === 'string') return u;
        return (
		  u?.login ||
		  u?.username ||
		  u?.uid ||
		  u?.id ||
		  u?.user?.login ||
		  u?.user?.uid ||
		  u?.user?.id ||
		  ''
		);
      }).filter(Boolean);
    };
    
    for (const q of list) {
      const qk = reportsObjKey(q);
      if (!qk) continue;
      const rawTeam = q.team || q.teamId || q.team_id;
      const teams = Array.isArray(rawTeam) ? rawTeam : (rawTeam ? [rawTeam] : []);
      const queueMembers = [
        ...collectLogins(q.teamUsers),
        ...collectLogins(q.team),
      ];
      if (!teams.length && queueMembers.length) {
        const key = qk;
        const current = byTeam.get(key) || { key, label: (reportsObjName(q) || qk) + ' (команда очереди)', members: [], queues: [] };
        current.members = Array.from(new Set([...current.members, ...queueMembers]));
        current.queues.push(qk);
        byTeam.set(key, current);
        continue;
      }
      for (const team of teams) {
        const teamKey = reportsObjKey(team) || (typeof team === 'string' ? team : '');
        if (!teamKey) continue;
        const teamName = reportsObjName(team) || teamKey;
        const members = collectLogins(team);
        const current = byTeam.get(teamKey) || { key: teamKey, label: teamName, members: [], queues: [] };
        current.members = Array.from(new Set([...current.members, ...members, ...queueMembers]));
        if (!current.queues.includes(qk)) current.queues.push(qk);
        byTeam.set(teamKey, current);
      }
    }
    return Array.from(byTeam.values()).map((t) => ({
      ...t,
      label: t.label + (t.queues.length ? ' (' + t.queues.length + ' очеред.)' : ''),
    })).sort((a, b) => a.label.localeCompare(b.label, 'ru'));
  }, [metaVersion]);
  
    console.log(
	  '[ReportsView] teamUsers JSON:',
	  JSON.stringify(reportsTeamsCache.data?.[0]?.teamUsers, null, 2)
	);

	console.log(
	  '[ReportsView] teamOptions JSON:',
	  JSON.stringify(teamOptions, null, 2)
	);

  const filteredRows = useMemo(() => {
    return enriched.filter((r: any) => {
      const c = r._chain;
      if (selQueues.size && !selQueues.has(c._queue || '—')) return false;
      if (selEmployees.size && !selEmployees.has(r._userLogin)) return false;
      if (selTypes.size && !selTypes.has(c._typeKey || '__none__')) return false;
      if (selTeams.size) {
        let ok = false;
        for (const t of teamOptions) {
          if (!selTeams.has(t.key)) continue;
          if (t.queues.includes(c._queue) || t.members.includes(r._userLogin)) { ok = true; break; }
        }
        if (!ok) return false;
      }
      return true;
    });
  }, [enriched, selQueues, selEmployees, selTeams, selTypes, teamOptions]);

  const tree = useMemo(() => {
    const t = reportsBuildTree(filteredRows, groupLevels, groupLevels.includes('worklog'));
    reportsFinalizeTree(t);
    reportsSortTree(t);
    return t;
  }, [filteredRows, groupLevels]);

  const totalMs = useMemo(() => filteredRows.reduce((s: number, r: any) => s + (r._durationMs || 0), 0), [filteredRows]);

  const flatRows = useMemo(() => {
    const out: any[] = [];
    const walk = (nodes: any[], depth: number, path: string) => {
      for (const n of nodes) {
        const id = (path ? path + '/' : '') + n.key;
        n._depth = depth;
        n._id = id;
        out.push(n);
        if (n.children.length && !collapsed.has(id)) walk(n.children, depth + 1, id);
        if (depth === 0 && n.level !== 'worklog' && !n.worklog && n.ms > 0) {
          out.push({
            level: 'subtotal',
            key: id + '/__sub__',
            label: 'Подытог: ' + (n.label || ''),
            issueKey: '',
            summary: '',
            depth: depth,
            children: [] as any[],
            worklog: null,
            ms: n.ms,
            byDay: n.byDay || {},
            _id: id + '/__sub__',
            _depth: depth,
          });
        }
      }
    };
    walk(tree, 0, '');
    return out;
  }, [tree, collapsed]);

  const days = useMemo(() => (dateFrom && dateTo ? generateDateRange(dateFrom, dateTo) : []), [dateFrom, dateTo]);

  const toggleNode = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const moveLevel = (idx: number, dir: number) => {
    setGroupLevels((prev) => {
      const next = [...prev];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return prev;
      const tmp = next[idx]; next[idx] = next[j]; next[j] = tmp;
      return next;
    });
  };
  const removeLevel = (lvl: string) => setGroupLevels((prev) => prev.filter((x: string) => x !== lvl));
  const addLevel = (lvl: string) => setGroupLevels((prev) => (prev.includes(lvl) ? prev : [...prev, lvl]));

  const issueLink = (key: string) => (
    <a href={'https://tracker.yandex.ru/' + key} target="_blank" rel="noreferrer"
       style={{ color: linkColor, textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 700 }} onClick={(e) => e.stopPropagation()}>
      {key}
    </a>
  );

  const markerFor = (n: any) => (
    <span style={{ display: 'inline-block', width: 14, color: textMuted, fontSize: 10, flexShrink: 0 }}>
      {n.children.length ? (collapsed.has(n._id) ? '▸' : '▾') : ''}
    </span>
  );

  // Универсальная кнопка-фильтр с дропдауном
  const renderFilterButton = (id: string, title: string, activeCount: number, content: any, disabled = false) => (
    <div style={{ position: 'relative' }}>
      <button disabled={disabled}
        onClick={() => setOpenPanel(openPanel === id ? '' : id)}
        style={{
          padding: '7px 12px', border: '1px solid ' + lineColor, borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          fontSize: 13, background: openPanel === id ? groupBg : panelBg, color: textMain, whiteSpace: 'nowrap',
        }}
      >
        {title}{activeCount > 0 ? ' (' + activeCount + ')' : ''} ▾
      </button>
      {openPanel === id && (
        <div style={{
          position: 'absolute', top: '110%', left: 0, zIndex: 60, minWidth: 250, maxHeight: 330, overflowY: 'auto',
          background: panelBg, border: '1px solid ' + lineColor, borderRadius: 10, padding: '6px 0',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        }}>
          {content}
        </div>
      )}
    </div>
  );

  const renderFilterOptions = (all: { key: string; label: string }[], selected: Set<string>, setter: (s: Set<string>) => void, iconOf?: (k: string) => any) => {
    const items: any[] = [];
    for (const opt of all) {
      items.push(
        <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', cursor: 'pointer', fontSize: 12, color: textMain }}>
          <input type="checkbox" checked={selected.has(opt.key)}
            onChange={() => {
              const next = new Set(selected);
              if (next.has(opt.key)) next.delete(opt.key); else next.add(opt.key);
              setter(next);
            }} />
          {iconOf ? iconOf(opt.key) : null}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
        </label>
      );
    }
    return (
      <>
        <div style={{ display: 'flex', gap: 10, padding: '4px 12px 8px', borderBottom: '1px solid ' + lineColor }}>
          <button style={{ ...btnStyle, padding: '3px 8px', fontSize: 11 }} onClick={() => setter(new Set(all.map((o: any) => o.key)))}>Все</button>
          <button style={{ ...btnStyle, padding: '3px 8px', fontSize: 11 }} onClick={() => setter(new Set(all.filter((o: any) => !selected.has(o.key)).map((o) => o.key)))}>Инверсия</button>
          <button style={{ ...btnStyle, padding: '3px 8px', fontSize: 11 }} onClick={() => setter(new Set())}>Сброс</button>
        </div>
        {items.length ? items : <div style={{ padding: '10px 12px', fontSize: 12, color: textMuted }}>Нет данных</div>}
      </>
    );
  };

  const backdrop = openPanel ? (
    <div style={{ position: 'fixed', inset: 0, zIndex: 55 }} onClick={() => setOpenPanel('')} />
  ) : null;

  const exportToCsv = () => {
    // Экспортируем исходный набор за выбранный период, не filteredRows:
    // фильтры и уровни группировки влияют только на отображение отчета.
    const rows = enriched
      .filter((r: any) => r._startDate >= dateFrom && r._startDate <= dateTo)
      .sort((a: any, b: any) => String(a._startDate + (a._startHm || '')).localeCompare(String(b._startDate + (b._startHm || ''))));

    const headers = [
      'Очередь', 'Сотрудник', 'Логин сотрудника', 'Тип задачи',
      'Epic - ключ', 'Epic - название', 'Story - ключ', 'Story - название',
      'Fix version', 'Задача - ключ', 'Задача - название',
      'Подзадача - ключ', 'Подзадача - название', 'ID ворклога',
      'Дата', 'Время начала', 'Длительность, минуты', 'Длительность', 'Комментарий',
    ];
    const csvCell = (value: any) => {
      const str = value == null ? '' : String(value);
      return '"' + str.replace(/"/g, '""') + '"';
    };
    const csvRows = rows.map((r: any) => {
      const c = r._chain || reportsComputeChain(r._issueKey);
      const values = [
        c._queue,
        r._userName,
        r._userLogin,
        reportsTypeDisplayName(c._typeKey, c._typeName),
        c._epicKey,
        c._epicSummary,
        c._storyKey,
        c._storySummary,
        c._fixVersion,
        c._taskKey || r._issueKey,
        c._taskSummary,
        c._subtaskKey,
        c._subtaskSummary,
        r._wlId,
        r._startDate,
        r._startHm,
        Math.round((r._durationMs || 0) / 60000),
        formatDuration(r._durationMs || 0),
        r._comment,
      ];
      return values.map(csvCell).join(',');
    });
    const csv = '\uFEFF' + [headers.map(csvCell).join(','), ...csvRows].join('\r\n');
    // data: URL блокируется защитой навигации Трекера. Используем Blob URL.
    // target=_blank просит браузер открыть загрузку вне iframe плагина, что
    // помогает обойти ограничения frame-src для blob: в некоторых браузерах.
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'worklog-report_' + dateFrom + '_' + dateTo + '.csv';
    link.style.display = 'none';
    link.setAttribute('aria-hidden', 'true');
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);
    }, 5000);
  };

  const groupLabel = groupLevels.map((l: string, i: number) => (i + 1) + '. ' + reportsLevelNames[l]).join(', ') || 'нет уровней';

  // Закреплённые слева колонки: ширины и смещения
  const LEFT_W = [130, 100, 260, 70];
  const LEFT_OFF = [0, 130, 230, 490];
  const renderNodeRow = (n: any, idx: number) => {
    const indent = 8 + (n._depth || 0) * 18;
    const isWl = n.level === 'worklog';
    const isSubT = n.level === 'subtotal';
    const bg = isSubT ? groupBg : (isWl ? rowBg : (idx % 2 === 1 ? altBg : rowBg));
    const td: React.CSSProperties = { padding: '4px 8px', borderBottom: '1px solid ' + lineColor, borderRight: '1px solid ' + lineColor, fontSize: 12, color: textMain, maxWidth: 260 };
    const tdR: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap' };
    const tdL = (i: number, extra?: React.CSSProperties): React.CSSProperties => ({
      ...td, position: 'sticky', left: LEFT_OFF[i], width: LEFT_W[i], minWidth: LEFT_W[i],
      background: bg, zIndex: isSubT ? 4 : 2, ...(extra || {}),
    });
    const flexCell = { display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 } as any;
    let queueCell: any = <span />;
    let taskCell: any = <span />;
    let nameCell: any = <span />;

    if (isSubT) {
      nameCell = <div style={{ ...flexCell, paddingLeft: indent }}><strong>{n.label}</strong></div>;
    } else if (isWl) {
      const showKey = !groupLevels.includes('task') && !groupLevels.includes('subtask');
      taskCell = showKey && n.issueKey ? issueLink(n.issueKey) : null;
      nameCell = (
        <div style={{ ...flexCell, paddingLeft: indent }}>
          <span style={{ color: '#2BB673', fontSize: 12, flexShrink: 0 }}>✔</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textMuted }}>
            {n.summary || '(без комментария)'}
          </span>
        </div>
      );
    } else if (n.level === 'queue') {
      queueCell = <div style={{ ...flexCell, paddingLeft: indent }}>{markerFor(n)}<strong>{n.label}</strong></div>;
    } else if (n.level === 'employee') {
      nameCell = <div style={{ ...flexCell, paddingLeft: indent }}>{markerFor(n)}<span>{n.label}</span></div>;
    } else if (n.level === 'fixversion') {
      nameCell = <div style={{ ...flexCell, paddingLeft: indent }}>{markerFor(n)}<span>{reportsLevelNames.fixversion}: {n.label}</span></div>;
    } else {
      taskCell = n.issueKey && n.issueKey !== '—' ? issueLink(n.issueKey) : <span style={{ color: textMuted }}>—</span>;
      const mark = n.level === 'subtask' ? '↳ ' : '';
      nameCell = (
        <div style={{ ...flexCell, paddingLeft: indent }}>
          {markerFor(n)}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mark + (n.summary || n.label || '')}</span>
        </div>
      );
    }
    return (
      <tr key={n._id} style={{ background: bg, cursor: n.children.length ? 'pointer' : 'default' }}
          onClick={() => { if (n.children.length) toggleNode(n._id); }}>
        <td style={tdL(0, { maxWidth: LEFT_W[0] })}>{queueCell}</td>
        <td style={tdL(1, { maxWidth: LEFT_W[1] })}>{taskCell}</td>
        <td style={tdL(2, { maxWidth: LEFT_W[2] })}>{nameCell}</td>
        <td style={tdL(3, { textAlign: 'right', borderRight: '4px solid ' + lineColor, whiteSpace: 'nowrap', maxWidth: 'none' })}>
          <strong style={isSubT ? { fontWeight: 700 } : undefined}>{n.ms > 0 ? formatDuration(n.ms) : ''}</strong>
        </td>
        {days.map((d: string) => {
          const weekend = [0, 6].includes(new Date(d + 'T00:00:00').getDay());
          return <td key={d} style={{ ...(isSubT ? { ...tdR, fontWeight: 700 } : tdR), background: weekend ? 'rgba(255,100,100,0.1)' : bg }}>{n.byDay[d] ? formatDuration(n.byDay[d]) : ''}</td>;
        })}
      </tr>
    );
  };

  const listColumns = '110px 90px minmax(145px, 0.9fr) 75px 88px 78px minmax(360px, 3fr)';
  const listHeaderCell: React.CSSProperties = {
    padding: '7px 8px', fontSize: 12, color: textMuted, fontWeight: 600,
    borderBottom: '1px solid ' + lineColor, borderRight: '1px solid ' + lineColor,
    whiteSpace: 'nowrap', background: panelBg,
  };
  const listCell: React.CSSProperties = {
    padding: '5px 8px', minWidth: 0, borderRight: '1px solid ' + lineColor,
    borderBottom: '1px solid ' + lineColor, boxSizing: 'border-box',
  };
  const renderListRow = (n: any) => {
    const indent = (n._depth || 0) * 18;
    const isWl = n.level === 'worklog';
    if (n.level === 'subtotal') {
      return (
        <div key={n._id} style={{ display: 'grid', gridTemplateColumns: listColumns, alignItems: 'stretch', fontSize: 12, color: textMain, fontWeight: 700, borderTop: '1px solid ' + lineColor, background: groupBg }}>
          <span style={listCell} /><span style={listCell} /><span style={{ ...listCell, paddingLeft: 8 + indent }}>{n.label}</span>
          <span style={{ ...listCell, textAlign: 'right', whiteSpace: 'nowrap' }}>{formatDuration(n.ms)}</span><span style={listCell} /><span style={listCell} /><span style={listCell} />
        </div>
      );
    }
    if (isWl) {
      const w = n.worklog;
      return (
        <div key={n._id} style={{ display: 'grid', gridTemplateColumns: listColumns, alignItems: 'stretch', fontSize: 12, color: textMuted, background: rowBg }}>
          <span style={listCell} /><span style={listCell} /><span style={listCell} /><span style={listCell} />
          <span style={{ ...listCell, whiteSpace: 'nowrap' }}>{w._startDate ? `${WEEKDAYS_RU[new Date(w._startDate + 'T00:00:00').getDay()]} ${w._startDate.slice(8, 10)}.${w._startDate.slice(5, 7)}` : ''}</span>
          <span style={{ ...listCell, whiteSpace: 'nowrap', textAlign: 'right' }}>{formatDuration(w._durationMs)}</span>
          <span title={w._comment} style={{ ...listCell, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}><span style={{ color: '#2BB673', marginRight: 6 }}>✔</span>{w._comment || '(без комментария)'}</span>
        </div>
      );
    }
    const ownLogs: any[] = n.rows || [];
    const issueKey = n.issueKey || (n.level === 'task' ? n.key : '');
    const summary = n.summary || '';
    const isTask = n.level === 'task' || (!!issueKey && n.level !== 'queue' && n.level !== 'employee');
    const header = (
      <div key={n._id} style={{ display: 'grid', gridTemplateColumns: listColumns, alignItems: 'stretch', fontSize: 12, color: textMain, fontWeight: n.children.length ? 600 : 500, background: n.level === 'queue' || n.level === 'employee' ? groupBg : 'transparent', cursor: n.children.length ? 'pointer' : 'default' }} onClick={() => { if (n.children.length) toggleNode(n._id); }}>
        <span style={{ ...listCell, paddingLeft: 8 + indent }}>{n.level === 'queue' ? n.label : (isTask && ownLogs[0]?._chain?._queue) || ''}</span>
        <span style={listCell}>{isTask && issueKey ? issueLink(issueKey) : ''}</span>
        <span style={{ ...listCell, whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{markerFor(n)}{n.level === 'employee' ? n.label : summary || (isTask ? n.label : '')}</span>
        <strong style={{ ...listCell, textAlign: 'right', whiteSpace: 'nowrap' }}>{formatDuration(n.ms)}</strong>
        <span style={{ ...listCell, color: textMuted, whiteSpace: 'nowrap' }}>{isTask && ownLogs.length ? `${ownLogs.length} ворклог(ов)` : ''}</span><span style={listCell} /><span style={listCell} />
      </div>
    );
    if (!isTask || !ownLogs.length) return header;
    const sortedLogs = [...ownLogs].sort((a, b) => String(b._startDate + (b._startHm || '')).localeCompare(String(a._startDate + (a._startHm || ''))));
    return (
      <React.Fragment key={n._id}>
        {header}
        {sortedLogs.map((w: any) => (
          <div key={`${n._id}/${w._wlId}`} style={{ display: 'grid', gridTemplateColumns: listColumns, alignItems: 'stretch', fontSize: 12, color: textMuted, background: rowBg }}>
            <span style={listCell} /><span style={listCell} /><span style={listCell} /><span style={listCell} />
            <span style={{ ...listCell, whiteSpace: 'nowrap' }}>{w._startDate ? `${WEEKDAYS_RU[new Date(w._startDate + 'T00:00:00').getDay()]} ${w._startDate.slice(8, 10)}.${w._startDate.slice(5, 7)}` : ''}</span>
            <span style={{ ...listCell, whiteSpace: 'nowrap', textAlign: 'right' }}>{formatDuration(w._durationMs)}</span>
            <span title={w._comment} style={{ ...listCell, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}><span style={{ color: '#2BB673', marginRight: 6 }}>✔</span>{w._comment || '(без комментария)'}</span>
          </div>
        ))}
      </React.Fragment>
    );
  };

  const panelOf = (id: string) => {
    if (id === 'queues') return renderFilterOptions(queueOptions.map((q: string) => ({ key: q, label: q })), selQueues, setSelQueues);
    if (id === 'employees') return renderFilterOptions(employeeOptions, selEmployees, setSelEmployees);
    if (id === 'teams') return renderFilterOptions(teamOptions.map((t: any) => ({ key: t.key, label: t.label })), selTeams, setSelTeams);
    if (id === 'types') {
      return renderFilterOptions(typeOptions, selTypes, setSelTypes, (k: string) => reportsTypeIcon(k === '__none__' ? '' : k, k === '__none__' ? 'Другое' : reportsTypeDisplayName(k, ''), 14));
    }
    if (id === 'group') {
      const available = Object.keys(reportsLevelNames).filter((l: string) => !groupLevels.includes(l));
      return (
        <>
          <div style={{ padding: '6px 12px', fontSize: 11, color: textMuted }}>Уровни иерархии</div>
          {groupLevels.length === 0 && <div style={{ padding: '4px 12px', fontSize: 12, color: textMuted }}>Уровни не выбраны</div>}
          {groupLevels.map((l: string, i: number) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', fontSize: 12, color: textMain }}>
              <span style={{ color: textMuted, width: 22 }}>{i + 1}.</span>
              <span style={{ flex: 1 }}>{reportsLevelNames[l]}</span>
              <button title="Выше" style={{ ...btnStyle, padding: '2px 6px', fontSize: 11 }} onClick={() => moveLevel(i, -1)}>↑</button>
              <button title="Ниже" style={{ ...btnStyle, padding: '2px 6px', fontSize: 11 }} onClick={() => moveLevel(i, 1)}>↓</button>
              <button title="Убрать" style={{ ...btnStyle, padding: '2px 6px', fontSize: 11 }} onClick={() => removeLevel(l)}>✕</button>
            </div>
          ))}
          {available.length > 0 && <div style={{ padding: '8px 12px 2px', fontSize: 11, color: textMuted, borderTop: '1px solid ' + lineColor }}>Добавить уровень</div>}
          {available.map((l: string) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', fontSize: 12, color: textMain }}>
              <span style={{ flex: 1 }}>{reportsLevelNames[l]}</span>
              <button title="Добавить" style={{ ...btnStyle, padding: '2px 8px', fontSize: 11 }} onClick={() => addLevel(l)}>＋</button>
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  const thS: React.CSSProperties = {
    padding: '5px 8px', textAlign: 'left', fontSize: 12, color: textMuted,
    borderBottom: '1px solid ' + lineColor, whiteSpace: 'nowrap', position: 'sticky', top: 0, background: panelBg, zIndex: 2,
  };

  return (
    <div style={{ color: textMain, fontSize: 14, height: 'calc(100vh - 49px)', minHeight: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0 8px' }}>
      {backdrop}
      {/* Период и фильтры — один ряд */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 16, marginBottom: 16, flexShrink: 0 }}>
        <button style={weekArrow} onClick={() => shiftMonth(-1)}>‹</button>
        <strong style={{ minWidth: 130, textAlign: 'center' }}>{monthLabel}</strong>
        <button style={weekArrow} onClick={() => shiftMonth(1)}>›</button>
        <input className={isDark ? 'theme-dark' : 'theme-light'} type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
          style={{ ...inputStyle, textAlign: 'center', width: 150, fontSize: 13, padding: '5px 8px' }} />
        <span style={{ color: textMuted }}>—</span>
        <input className={isDark ? 'theme-dark' : 'theme-light'} type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
          style={{ ...inputStyle, textAlign: 'center', width: 150, fontSize: 13, padding: '5px 8px' }} />
        <span style={{ width: 1, height: 22, background: lineColor, flexShrink: 0 }} />
        {renderFilterButton(
		  'teams',
		  'Команды',
		  selTeams.size,
		  panelOf('teams'),
		  teamsLoading || teamOptions.length === 0
		)}
        {renderFilterButton('queues', 'Очереди', selQueues.size, panelOf('queues'))}
        {renderFilterButton('employees', 'Сотрудники', selEmployees.size, panelOf('employees'))}
        {renderFilterButton('types', 'Тип', selTypes.size, panelOf('types'))}
        {(selQueues.size || selEmployees.size || selTeams.size || selTypes.size) > 0 ? (
          <button style={{ ...btnStyle, padding: '4px 10px', fontSize: 11 }}
            onClick={() => { setSelQueues(new Set()); setSelEmployees(new Set()); setSelTeams(new Set()); setSelTypes(new Set()); }}>
            Сбросить фильтры
          </button>
        ) : null}
      </div>

      {/* Режимы и группировка */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10, flexShrink: 0 }}>
        <button onClick={() => setViewMode('table')}
          style={{ ...btnStyle, background: viewMode === 'table' ? groupBg : panelBg, fontWeight: viewMode === 'table' ? 600 : 400 }}>
          Таблица
        </button>
        <button onClick={() => setViewMode('list')}
          style={{ ...btnStyle, background: viewMode === 'list' ? groupBg : panelBg, fontWeight: viewMode === 'list' ? 600 : 400 }}>
          Список
        </button>
        <span style={{ width: 1, height: 22, background: lineColor }} />
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpenPanel(openPanel === 'group' ? '' : 'group')}
            style={{
              padding: '7px 12px', border: '1px solid ' + lineColor, borderRadius: 8, cursor: 'pointer',
              fontSize: 13, background: openPanel === 'group' ? groupBg : panelBg, color: textMain,
              whiteSpace: 'nowrap', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis',
            }}
          >
            Группировать по: {groupLabel} ▾
          </button>
          {openPanel === 'group' && (
            <div style={{
              position: 'absolute', top: '110%', left: 0, zIndex: 60, minWidth: 270, maxHeight: 330, overflowY: 'auto',
              background: panelBg, border: '1px solid ' + lineColor, borderRadius: 10, padding: '6px 0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            }}>
              {panelOf('group')}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={exportToCsv}
          disabled={loading || !dateFrom || !dateTo || worklogs.length === 0}
          style={{ ...btnStyle, marginLeft: 'auto', padding: '7px 13px', background: panelBg, border: '1px solid #FF6F00', fontWeight: 600, opacity: loading || worklogs.length === 0 ? 0.55 : 1, cursor: loading || worklogs.length === 0 ? 'not-allowed' : 'pointer' }}
        >
          Экспорт в CSV
        </button>
      </div>

      {onlyMine && (
        <div style={{ padding: '6px 10px', marginBottom: 10, borderRadius: 8, fontSize: 12, background: groupBg, color: textMuted }}>
          Показаны только ваши записи — недостаточно прав для просмотра чужих трудозатрат.
        </div>
      )}

      {loading ? (
        <div style={{ padding: 20, color: textMuted, flex: 1, minHeight: 0 }}>
          Загрузка отчёта… <span className="loading-spinner" />
        </div>
      ) : flatRows.length === 0 ? (
        <div style={{ padding: 20, color: textMuted, flex: 1, minHeight: 0 }}>За выбранный период записей нет.</div>
      ) : viewMode === 'table' ? (
        <div style={{ overflow: 'auto', flex: 1, minHeight: 0, border: '1px solid ' + lineColor, borderRadius: 10, background: rowBg }}>
          <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%', minWidth: 660 }}>
            <thead>
              <tr>
                {['Очередь', 'Задача', 'Название'].map((h: string, i: number) => (
                  <th key={h} style={{ ...thS, left: LEFT_OFF[i], width: LEFT_W[i], minWidth: LEFT_W[i], zIndex: 5, borderRight: '1px solid ' + lineColor, fontSize: 13 }}>{h}</th>
                ))}
                <th style={{ ...thS, textAlign: 'right', left: LEFT_OFF[3], width: LEFT_W[3], minWidth: LEFT_W[3], zIndex: 5, borderRight: '4px solid ' + lineColor, fontSize: 13 }}>Итого</th>
                {days.map((d: string) => (
                  <th key={d} style={{ ...thS, textAlign: 'right', zIndex: 3, borderRight: '1px solid ' + lineColor, background: [0, 6].includes(new Date(d + 'T00:00:00').getDay()) ? 'rgba(255,100,100,0.3)' : panelBg }}>
                    <div style={{ color: [0, 6].includes(new Date(d + 'T00:00:00').getDay()) ? 'rgba(255,100,100,0.8)' : textMuted, fontSize: 13 }}>{WEEKDAYS_RU[new Date(d + 'T00:00:00').getDay()]}</div>
                    <div>{d.slice(8, 10)}.{d.slice(5, 7)}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {flatRows.map((n: any, idx: number) => renderNodeRow(n, idx))}
              <tr style={{ fontSize: 14, fontWeight: 700 }}>
                <td style={{ position: 'sticky', bottom: 0, left: LEFT_OFF[0], width: LEFT_W[0], minWidth: LEFT_W[0], background: panelBg, borderBottom: '2px solid ' + lineColor, borderTop: '2px solid ' + lineColor, borderRight: '1px solid ' + lineColor, padding: '6px 8px', zIndex: 6 }}>ИТОГО</td>
                <td style={{ position: 'sticky', bottom: 0, left: LEFT_OFF[1], width: LEFT_W[1], minWidth: LEFT_W[1], background: panelBg, borderBottom: '2px solid ' + lineColor, borderTop: '2px solid ' + lineColor, borderRight: '1px solid ' + lineColor, zIndex: 6 }} />
                <td style={{ position: 'sticky', bottom: 0, left: LEFT_OFF[2], width: LEFT_W[2], minWidth: LEFT_W[2], background: panelBg, borderBottom: '2px solid ' + lineColor, borderTop: '2px solid ' + lineColor, borderRight: '1px solid ' + lineColor, zIndex: 6 }} />
                <td style={{ position: 'sticky', bottom: 0, left: LEFT_OFF[3], width: LEFT_W[3], minWidth: LEFT_W[3], background: panelBg, borderBottom: '2px solid ' + lineColor, borderTop: '2px solid ' + lineColor, borderRight: '4px solid ' + lineColor, padding: '6px 8px', textAlign: 'right', whiteSpace: 'nowrap', zIndex: 6 }}>
                  {formatDuration(totalMs)}
                </td>
                {days.map((d: string) => {
                  let dayMs = 0;
                  for (const r of filteredRows) if (r._startDate === d) dayMs += r._durationMs;
                  return (
                    <td key={d} style={{ position: 'sticky', bottom: 0, background: [0, 6].includes(new Date(d + 'T00:00:00').getDay()) ? 'rgba(255,100,100,0.1)' : panelBg, borderBottom: '2px solid ' + lineColor, borderTop: '2px solid ' + lineColor, borderRight: '1px solid ' + lineColor, padding: '6px 8px', textAlign: 'right', whiteSpace: 'nowrap', zIndex: 4 }}>
                      {dayMs ? formatDuration(dayMs) : ''}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto', border: '1px solid ' + lineColor, borderRadius: 10, background: rowBg }}>
          <div style={{ minWidth: 1000 }}>
            <div style={{ display: 'grid', gridTemplateColumns: listColumns, position: 'sticky', top: 0, zIndex: 3, background: panelBg, borderBottom: '1px solid ' + lineColor }}>
              {['Очередь', 'Задача', 'Название', 'Итого', 'Дата', 'Время', 'Комментарий'].map((label) => (
                <div key={label} style={{ ...listHeaderCell, textAlign: label === 'Итого' || label === 'Время' ? 'right' : 'left' }}>{label}</div>
              ))}
            </div>
            {flatRows.map((n: any) => renderListRow(n))}
            <div style={{ display: 'grid', gridTemplateColumns: listColumns, position: 'sticky', bottom: 0, zIndex: 4, background: panelBg, fontSize: 14, fontWeight: 700, color: textMain, borderTop: '2px solid ' + lineColor }}>
              <span style={{ ...listCell, background: panelBg }}>ИТОГО</span><span style={{ ...listCell, background: panelBg }} /><span style={{ ...listCell, background: panelBg }} />
              <span style={{ ...listCell, background: panelBg, textAlign: 'right', whiteSpace: 'nowrap' }}>{formatDuration(totalMs)}</span>
              <span style={{ ...listCell, background: panelBg }} /><span style={{ ...listCell, background: panelBg }} /><span style={{ ...listCell, background: panelBg }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
