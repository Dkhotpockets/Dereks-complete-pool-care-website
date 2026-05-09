/**
 * Persistence utility for form data.
 * Saves data to localStorage in case of network failure or service outage.
 */

const FORM_PERSISTENCE_KEY = 'dereks_pool_care_pending_submission';

export interface PendingSubmission {
  data: any;
  timestamp: number;
}

export const savePendingSubmission = (data: any) => {
  if (typeof window === 'undefined') return;
  
  const submission: PendingSubmission = {
    data,
    timestamp: Date.now()
  };
  
  localStorage.setItem(FORM_PERSISTENCE_KEY, JSON.stringify(submission));
};

export const getPendingSubmission = (): PendingSubmission | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(FORM_PERSISTENCE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
};

export const clearPendingSubmission = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(FORM_PERSISTENCE_KEY);
};
