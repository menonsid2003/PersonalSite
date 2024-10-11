// src/vanta.d.ts
declare module 'vanta/dist/vanta.fog.min' {
  const VANTA: {
    (options: VantaEffectOptions): VantaEffect;
  };
  export default VANTA;
}

declare interface VantaEffectOptions {
  el: HTMLElement;
  THREE?: unknown;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
}

declare interface VantaEffect {
  destroy(): void;
}
