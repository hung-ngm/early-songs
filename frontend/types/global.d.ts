declare module 'react-interpunct' {
    import { FC } from 'react'
    import PropTypes from 'prop-types'
    interface InterpunctProps {
        
    }
    const Interpunct: FC<InterpunctProps>

    export default Interpunct
}

declare module 'react-slick' {
    import {FC} from 'react'
    import PropTypes from 'prop-types'
    interface SliderProps {
        className?:string,
        children:React.ReactNode
    }
    const Slider: FC<SliderProps>

    export default Slider
}

declare module 'use-dark-mode' {
    /**
     * A config object allowing you to specify certain aspects of `useDarkMode`
     */
    export interface DarkModeConfig {
      classNameDark?: string; // A className to set "dark mode". Default = "dark-mode".
      classNameLight?: string; // A className to set "light mode". Default = "light-mode".
      element?: HTMLElement; // The element to apply the className. Default = `document.body`
      onChange?: (val?: boolean) => void; // Overide the default className handler with a custom callback.
      storageKey?: string; // Specify the `localStorage` key. Default = "darkMode". Set to `null` to disable persistent storage.
      storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
      global?: Window; // The global object. Default = `window`.
    }
  
    /**
     * An object returned from a call to `useDarkMode`.
     */
    export interface DarkMode {
      readonly value: boolean;
      enable: () => void;
      disable: () => void;
      toggle: () => void;
    }
  
    /**
     * A custom React Hook to help you implement a "dark mode" component for your application.
     */
    export default function useDarkMode(
      initialState?: boolean,
      config?: DarkModeConfig
    ): DarkMode;
  }

declare module 'body-scroll-lock' {
  export interface BodyScrollOptions {
    reserveScrollBarGap?: boolean | undefined;
    allowTouchMove?: ((el: HTMLElement | Element) => boolean) | undefined;
  }

  export function disableBodyScroll(targetElement: null | Element, options?: BodyScrollOptions): void;
  export function enableBodyScroll(targetElement: HTMLElement | Element): void;
  export function clearAllBodyScrollLocks(): void;

  export as namespace bodyScrollLock;
}

declare global {
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider;
  }
}
