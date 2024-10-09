import { getConfig } from '../configs/env';
import type { LogLevel, LogConfig } from '../typings/utils/log';

const { enableLog } = getConfig();

const defaultLogConfig: LogConfig = {
  enabledLevels: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
};

const getSourceLocation = (): string => {
  try {
    const error = new Error();
    const stack = error.stack?.split('\n') || [];

    const relevantStack = stack.find((line) => (
      (line.includes('http://') || line.includes('https://'))
      && !line.includes('log.ts')
      && !line.includes('eval')
      && !line.includes('<anonymous>')
    ));

    if (relevantStack) {
      const match = relevantStack.match(/(http.*):(\d+):(\d+)/);
      if (match) {
        const [filePath, lineNumber] = [
          match[1].split('?')[0].replace(/^.*\/src/, 'src'),
          match[2],
        ];
        return `[${filePath}][line ${lineNumber}]`;
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error parsing stack trace:', e);
  }
  return '[unknown source]';
};

const log = (
  level: LogLevel,
  label: string,
  value: any,
  config: LogConfig = defaultLogConfig,
): void => {
  // 如果 enableLog 為 false，則直接返回，跳過 log
  if (!enableLog) return;

  if (!config.enabledLevels.includes(level)) return;

  const location = getSourceLocation();
  const logMessage = `${location} ${label}:`;

  switch (level) {
    case 'trace':
      // eslint-disable-next-line no-console
      console.trace(logMessage, value);
      break;
    case 'debug':
      // eslint-disable-next-line no-console
      console.debug(logMessage, value);
      break;
    case 'info':
      // eslint-disable-next-line no-console
      console.log(logMessage, value);
      break;
    case 'warn':
      // eslint-disable-next-line no-console
      console.warn(logMessage, value);
      break;
    case 'error':
      // eslint-disable-next-line no-console
      console.error(logMessage, value);
      break;
    case 'fatal':
      // eslint-disable-next-line no-console
      console.error(logMessage, value);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(logMessage, value);
      break;
  }
};

// 基於不同的 log level 生成具體方法
export const logger = {
  trace: (label: string, value: any) => log('trace', label, value),
  debug: (label: string, value: any) => log('debug', label, value),
  info: (label: string, value: any) => log('info', label, value),
  warn: (label: string, value: any) => log('warn', label, value),
  error: (label: string, value: any) => log('error', label, value),
  fatal: (label: string, value: any) => log('fatal', label, value),
};
