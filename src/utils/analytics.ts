import { AnalyticsEventRecord } from '../types.ts';

type Listener = (event: AnalyticsEventRecord) => void;
const listeners: Set<Listener> = new Set();
const eventHistory: AnalyticsEventRecord[] = [];

export function subscribeToAnalytics(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getEventHistory(): AnalyticsEventRecord[] {
  return [...eventHistory];
}

export function clearEventHistory(): void {
  eventHistory.length = 0;
  listeners.forEach((cb) =>
    cb({
      id: 'reset',
      eventName: 'history_cleared',
      timestamp: new Date().toLocaleTimeString(),
    })
  );
}

export function trackAnalyticsEvent(
  eventName: string,
  payload?: Record<string, unknown>
): void {
  const record: AnalyticsEventRecord = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    eventName,
    timestamp: new Date().toLocaleTimeString(),
    payload,
  };

  eventHistory.unshift(record);
  if (eventHistory.length > 50) {
    eventHistory.pop();
  }

  // Console output for verification
  if (typeof console !== 'undefined') {
    console.log(`[Kafeco Analytics] 📊 Event: ${eventName}`, payload || {});
  }

  // Dispatch custom DOM event
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('kafeco_analytics_event', { detail: record })
    );
  }

  // Notify active listeners
  listeners.forEach((cb) => {
    try {
      cb(record);
    } catch {
      // ignore
    }
  });
}
