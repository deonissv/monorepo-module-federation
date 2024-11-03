declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'app1/App' {}

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}
