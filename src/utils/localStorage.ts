export const useLocalStorageHandler = () => {
  const getLocalStorage = (key: string): string | null => localStorage.getItem(key);
  const setLocalStorage = (key: string, value: string): void => localStorage.setItem(key, value);
  const removeLocalStorage = (key: string): void => localStorage.removeItem(key);

  return {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
  };
};
