declare module 'react-color' {
  import * as React from 'react';

  export interface ColorResult {
    hex: string;
    rgb: {
      r: number;
      g: number;
      b: number;
      a?: number;
    };
    hsl: {
      h: number;
      s: number;
      l: number;
      a?: number;
    };
  }

  export interface ColorPickerProps<A = {}> {
    color?: string | ColorResult;
    onChange?: (color: ColorResult, event: React.ChangeEvent<A>) => void;
    onChangeComplete?: (color: ColorResult, event: React.ChangeEvent<A>) => void;
    disableAlpha?: boolean;
    styles?: Partial<any>; // 根據需要調整
    className?: string;
    width?: string | number;
    // 根據需要添加更多屬性
  }

  export const SketchPicker: React.ComponentType<ColorPickerProps>;
  export const ChromePicker: React.ComponentType<ColorPickerProps>;
  export const TwitterPicker: React.ComponentType<ColorPickerProps>;
  export const CirclePicker: React.ComponentType<ColorPickerProps>;
}
