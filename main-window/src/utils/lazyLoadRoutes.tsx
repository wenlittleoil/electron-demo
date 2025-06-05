// vite默认自动开启动态加载和代码分割功能，使用React.lazy和Suspense来实现按需加载路由组件即可
// 两种懒加载方式均可
import { lazy, Suspense } from 'react';

// 懒加载Component
export function lazyLoadRouteComponent(pageComponentName: string) {
  const LazyElement = lazy(() => import(`../pages/${pageComponentName}/index.tsx`));
  return () => (
    <Suspense fallback="加载中...">
      <LazyElement />
    </Suspense>
  );
}

// 懒加载Element
export function lazyLoadRouteElement(pageComponentName: string) {
  const LazyElement = lazy(() => import(`../pages/${pageComponentName}/index.tsx`));
  return (
    <Suspense fallback="加载中...">
      <LazyElement />
    </Suspense>
  );
}

