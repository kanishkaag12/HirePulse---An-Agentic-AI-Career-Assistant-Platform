const KEYS = {
  history: 'hirepulse.history',
  profile: 'hirepulse.profile',
  settings: 'hirepulse.settings',
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked (e.g. private mode) – the app keeps working in memory.
  }
}

export const storage = {
  getHistory: () => read(KEYS.history, null),
  saveHistory: (history) => write(KEYS.history, history),
  getProfile: () => read(KEYS.profile, null),
  saveProfile: (profile) => write(KEYS.profile, profile),
  getSettings: () => read(KEYS.settings, null),
  saveSettings: (settings) => write(KEYS.settings, settings),
};
