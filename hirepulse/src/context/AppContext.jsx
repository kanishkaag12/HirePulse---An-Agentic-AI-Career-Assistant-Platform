import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../utils/storage';
import { buildSeedHistory } from '../utils/mockAnalysis';
import { DEFAULT_PROFILE, DEFAULT_SETTINGS } from '../data/mockData';

const AppContext = createContext(null);
const DARK_QUERY = '(prefers-color-scheme: dark)';

export function AppProvider({ children }) {
  const [history, setHistory] = useState(() => storage.getHistory() ?? buildSeedHistory());
  const [profile, setProfile] = useState(() => ({ ...DEFAULT_PROFILE, ...storage.getProfile() }));
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS, ...storage.getSettings() }));
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(DARK_QUERY).matches);

  useEffect(() => {
    storage.saveHistory(history);
  }, [history]);

  useEffect(() => {
    storage.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    storage.saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = (event) => setSystemDark(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme = settings.theme === 'system' ? (systemDark ? 'dark' : 'light') : settings.theme;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const addAnalysis = useCallback((analysis) => setHistory((prev) => [analysis, ...prev]), []);
  const deleteAnalysis = useCallback((id) => setHistory((prev) => prev.filter((a) => a.id !== id)), []);
  const clearHistory = useCallback(() => setHistory([]), []);
  const resetDemoData = useCallback(() => setHistory(buildSeedHistory()), []);
  const getAnalysis = useCallback((id) => history.find((a) => a.id === id), [history]);
  const updateProfile = useCallback((patch) => setProfile((prev) => ({ ...prev, ...patch })), []);
  const updateSettings = useCallback((patch) => setSettings((prev) => ({ ...prev, ...patch })), []);

  const value = useMemo(
    () => ({
      history,
      addAnalysis,
      deleteAnalysis,
      clearHistory,
      resetDemoData,
      getAnalysis,
      profile,
      updateProfile,
      settings,
      updateSettings,
      resolvedTheme,
    }),
    [history, addAnalysis, deleteAnalysis, clearHistory, resetDemoData, getAnalysis, profile, updateProfile, settings, updateSettings, resolvedTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside <AppProvider>');
  return context;
}
