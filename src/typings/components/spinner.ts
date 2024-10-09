export const SPINNER_SIZES = [32, 48, 64, 80, 120] as const;
export const BORDER_WIDTH = [2, 4, 8, 16] as const;
export const BORDER_STYLE = ['solid', 'dashed', 'dotted'] as const;

// 定義類型，確保這些屬性只允許傳入預定義的選項
export type SpinnerSize = typeof SPINNER_SIZES[number];
export type BorderWidth = typeof BORDER_WIDTH[number];
export type BorderStyle = typeof BORDER_STYLE[number];
