import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useRouteHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 導航到指定路徑
   * @param path - 目標路徑
   * @param forceReload - 是否強制刷新頁面
   * @example
   * navigateTo('/home');
   * navigateTo('/about', true); // 強制刷新
   */
  const navigateTo = (path: string, forceReload: boolean = false) => {
    if (!path.startsWith('/')) {
      // eslint-disable-next-line no-console
      console.error('Invalid path. Path should start with "/"');
      return;
    }

    if (forceReload) {
      window.location.href = path;
    } else {
      try {
        navigate(path);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Navigation error:', error);
        window.location.href = path;
      }
    }
  };

  /**
   * 獲取當前完整的 URL
   * @returns 當前完整路徑
   * @example
   * const fullUrl = getFullUrl();
   */
  const getFullUrl = () => `${window.location.origin}${location.pathname}${location.search}`;

  /**
   * 返回上一頁
   * @example
   * goBack();
   */
  const goBack = () => navigate(-1);

  /**
   * 前進到下一頁
   * @example
   * goForward();
   */
  const goForward = () => navigate(1);

  /**
   * 取得查詢參數
   * @returns URLSearchParams
   * @example
   * const queryParams = getQueryParams();
   * const search = queryParams.get('search');
   */
  const getQueryParams = () => new URLSearchParams(location.search);

  /**
   * 取得路由參數
   * @returns 路由參數物件
   * @example
   * const { id } = getRouteParams<{ id: string }>();
   */
  const getRouteParams = <T extends Record<string, string>>() => useParams<T>();

  /**
   * 路由守衛，檢查是否有權限訪問
   * @param isAllowed - 是否有權限
   * @param redirectPath - 權限不足時的跳轉路徑
   * @example
   * routeGuard(isAuthenticated, '/login');
   */
  const routeGuard = (isAllowed: boolean, redirectPath: string = '/login') => {
    if (!isAllowed) {
      navigate(redirectPath);
    }
  };

  /**
   * 相對當前路徑的導航
   * @param relativePath - 相對路徑
   * @example
   * navigateRelative('profile');
   */
  const navigateRelative = (relativePath: string) => {
    navigate(`${location.pathname}/${relativePath}`);
  };

  /**
   * 更新查詢參數而不刷新頁面
   * @param newParams - 要更新的查詢參數
   * @example
   * updateQueryParams({ search: 'new-query' });
   */
  const updateQueryParams = (newParams: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(newParams).forEach((key) => {
      searchParams.set(key, newParams[key]);
    });
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  /**
   * 將 URL 進行編碼
   * @param url - 要編碼的 URL
   * @returns 編碼後的 URL
   * @example
   * const encodedUrl = encodeUrl('https://example.com?query=test');
   */
  const encodeUrl = (url: string) => encodeURIComponent(url);

  /**
   * 將編碼的 URL 解碼
   * @param url - 要解碼的 URL
   * @returns 解碼後的 URL
   * @example
   * const decodedUrl = decodeUrl('%3Fquery%3Dtest');
   */
  const decodeUrl = (url: string) => decodeURIComponent(url);

  /**
   * 驗證並過濾網址中的非法字符
   * @param url - 要驗證的 URL
   * @returns 經過驗證或編碼的 URL
   * @example
   * const validUrl = validateUrl('https://example.com?query=<script>');
   */
  const validateUrl = (url: string) => {
    const urlPattern = /^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/;
    if (urlPattern.test(url)) {
      return url;
    }
    return encodeURIComponent(url);
  };

  /**
   * 返回指定步數
   * @param steps - 返回的步數
   * @example
   * goBackSteps(2);
   */
  const goBackSteps = (steps: number) => navigate(-steps);

  /**
   * 獲取歷史紀錄的長度
   * @returns 瀏覽器歷史紀錄的長度
   * @example
   * const historyLength = getHistoryLength();
   */
  const getHistoryLength = () => window.history.length;

  /**
   * 監聽導航事件
   * @param onNavigate - 當導航發生時的回調
   * @example
   * listenForNavigation(() => {
   *   console.log('Navigation occurred');
   * });
   */
  const listenForNavigation = (onNavigate: () => void) => {
    useEffect(() => {
      window.addEventListener('popstate', onNavigate);
      return () => {
        window.removeEventListener('popstate', onNavigate);
      };
    }, [onNavigate]);
  };

  /**
   * 更新部分查詢參數
   * @param newParams - 要更新的查詢參數
   * @example
   * updatePartialQueryParams({ search: 'test' });
   */
  const updatePartialQueryParams = (newParams: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        searchParams.set(key, newParams[key]);
      } else {
        searchParams.delete(key);
      }
    });
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  /**
   * 更新 URL fragment（hash 值）
   * @param fragment - 要更新的 fragment
   * @example
   * updateFragment('section2');
   */
  const updateFragment = (fragment: string) => {
    const url = new URL(window.location.href);
    url.hash = fragment;
    window.history.replaceState(null, '', url.toString());
  };

  /**
   * 獲取當前的 fragment（hash 值）
   * @returns 當前的 fragment
   * @example
   * const fragment = getFragment();
   */
  const getFragment = () => window.location.hash;

  return {
    navigateTo,
    getFullUrl,
    goBack,
    goForward,
    getQueryParams,
    getRouteParams,
    routeGuard,
    navigateRelative,
    updateQueryParams,
    encodeUrl,
    decodeUrl,
    validateUrl,
    goBackSteps,
    getHistoryLength,
    listenForNavigation,
    updatePartialQueryParams,
    updateFragment,
    getFragment,
  };
};
