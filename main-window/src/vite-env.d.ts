/// <reference types="vite/client" />

// 为别名添加类型支持
declare module '@/components/*' {
  import type { DefineComponent } from 'react';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
