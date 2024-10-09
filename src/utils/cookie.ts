import Cookies from 'js-cookie';

export const useCookieHandler = () => {
  const getCookie = (name: string): string | undefined => Cookies.get(name);
  const removeCookie = (name: string): void => {
    Cookies.remove(name);
  };
  const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes): void => {
    Cookies.set(name, value, options); // 直接調用，不需要指定回傳值
  };

  return {
    getCookie,
    removeCookie,
    setCookie,
  };
};
