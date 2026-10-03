'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { AnimatedReveal } from './animated-reveal';

interface Props { config: { eventDate: string; eventTime: string; eventDateLabel: string; eventDateLabelEn?: string; showCountdown: boolean; countdownStyle: 'flip' | 'simple'; } }

function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

interface MonthGrid {
  year: number;
  month: number;
  eventDay: number;
  cells: (number | null)[];
}

function buildMonthGrid(dateStr: string): MonthGrid | null {
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = d.getMonth();
  const eventDay = d.getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  return { year, month, eventDay, cells };
}

const DOW = ['\uC77C', '\uC6D4', '\uD654', '\uC218', '\uBAA9', '\uAE08', '\uD1A0'];

function MiniCalendar({ dateStr }: { dateStr: string }) {
  const grid = useMemo(() => buildMonthGrid(dateStr), [dateStr]);
  if (!grid) return null;
  return (
    <div className="inv-cal">
      <p className="inv-cal-head">{grid.year}.{String(grid.month + 1).padStart(2, '0')}</p>
      <div className="inv-cal-grid">
        {DOW.map((d) => (<div key={d} className="inv-cal-dow">{d}</div>))}
        {grid.cells.map((day, i) => (
          <div key={i} className={`inv-cal-cell ${day === grid.eventDay ? 'inv-cal-cell--active' : ''}`}>
            {day ?? ''}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlipCard({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
        prevRef.current = value;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative overflow-hidden inv-card inv-dday-card" style={{ perspective: '600px' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: flipping ? 'rotateX(-15deg)' : 'rotateX(0deg)',
          }}
        >
          <span className="tabular-nums" style={{ fontFamily: 'var(--inv-font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--inv-accent-solid)' }}>
            {String(display).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="inv-counter-label">{label}</span>
    </div>
  );
}

function SimpleCounter({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center px-2">
      <div className="tabular-nums" style={{ fontFamily: 'var(--inv-font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--inv-accent-solid)', lineHeight: 1.2 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="inv-counter-label" style={{ marginTop: '0.375rem' }}>{label}</div>
    </div>
  );
}

function ColonSep() {
  return <div className="inv-colon-sep">:</div>;
}

export function CountdownSection({ config }: Props) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  const targetMs = useMemo(
    () => new Date(`${config.eventDate}T${config.eventTime || '00:00'}:00`).getTime(),
    [config.eventDate, config.eventTime],
  );

  useEffect(() => {
    const target = new Date(targetMs);
    setTimeLeft(getTimeLeft(target));
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [targetMs]);

  const CounterCard = config.countdownStyle === 'simple' ? SimpleCounter : FlipCard;

  return (
    <AnimatedReveal>
      <section className="inv-section-decorated" style={{ background: 'var(--inv-bg-alt)' }}>
        <p className="inv-eyebrow">COUNTDOWN</p>
        {config.eventDate && <MiniCalendar dateStr={config.eventDate} />}
        {config.showCountdown && timeLeft && !timeLeft.expired && (
          <div className="inv-countdown">
            <CounterCard value={timeLeft.days} label="DAYS" />
            <ColonSep />
            <CounterCard value={timeLeft.hours} label="HOURS" />
            <ColonSep />
            <CounterCard value={timeLeft.minutes} label="MIN" />
            <ColonSep />
            <CounterCard value={timeLeft.seconds} label="SEC" />
          </div>
        )}
        {timeLeft?.expired && (
          <div className="inv-dday-today">
            <div className="inv-headline-divider" aria-hidden="true">
              <span className="inv-headline-divider-mark">&#10022;</span>
            </div>
            <p className="inv-dday-today-text">{'\uC624\uB298, \uC18C\uC911\uD55C \uBD84\uB4E4\uACFC \uD568\uAED8\uD569\uB2C8\uB2E4'}</p>
            <div className="inv-headline-divider" aria-hidden="true">
              <span className="inv-headline-divider-mark">&#10022;</span>
            </div>
          </div>
        )}
        <p className="inv-date-label">{config.eventDateLabel}</p>
      </section>
    </AnimatedReveal>
  );
}
