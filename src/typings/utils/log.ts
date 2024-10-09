export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogConfig {
  enabledLevels: LogLevel[]; // 可配置哪些級別應該被啟用
}
