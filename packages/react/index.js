// 以下方法声明在https://github.com/facebook/flow/blob/main/lib/react.js，例React$StatelessFunctionalCOmponent
// export type/import type是typescript3.8语法，表示仅仅导入导出声明，可以导出类型（默认不可导出类型，会被删除）https://jkchao.github.io/typescript-book-chinese/new/typescript-3.8.html
export type StatelessFunctionalComponent<P> = React$StatelessFunctionalCOmponent<P>
export type ComponentType<-P >= React$ComponentType < P > // ?-P什么意思
export type AbstractComponent<-Config, +Inctance=mixed >= React$AnstractComponent < Comfig, Instance >
export type ElementType = React$ElementType
export type Element<+C >= React$Element < C > // ?+C什么意思
export type Key = React$Key
export type Ref<C> = React$Ref<C>
export type Node = React$Node
export type Context<T> = React$Context<T>
export type Portal = React$Portal
export type ElementProps<C> = React$ElementProps<C>
export type ElementConfig<C> = React$ElementConfig<C>
export type ElementRef<C> = React$ElementRef<C>
export type Config<Props, DefaultProps> = React$Config<Props, DefaultProps>
export type ChildrenArray<+T >= $ReadOnlyArray < ChildrenArray < T >>| T

// 导出所有方法
export {
    __SECRET_INTERANLS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    act as unstable_act, // as进行更名
    Children,
    ComponentType,
    Fragment,
    Profiler,
    PureComponent,
    StrictMode,
    Suspense,
    SuspenseList,
    cloneElement,
    createContext,
    createElement,
    createFactory,
    createMutableSource,
    createRef,
    createServerContext,
    use,
    forwardRef,
    isValidElement,
    lazy,
    memo,
    cache,
    startTransition,
    unstable_Cache,
    unstable_DebugTracingMode,
    unstable_LegacyHidden,
    unstable_Offscreen,
    unstable_Scope,
    unstable_TracingMarker,
    unstable_getCacheSignal,
    unstable_getCacheForType,
    unstable_useCacheRefresh,
    unstable_useMemoCache,
    useId,
    useCallback,
    useContext,
    useDebugValue,
    useDeferredValue,
    useEffect,
    experimental_useEffectEvent,
    useImperativeHandle,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useMutableSource,
    useSyncExternalStore,
    useReducer,
    useRef,
    useState,
    useTransition,
    version,
} from './src/React'
/*
    其中React Hooks有（https://zh-hans.reactjs.org/docs/hooks-reference.html）：
    基础Hook：useState、useEffect、useContext
    额外的Hook：useReducer、useCallback、useMemo、useRef、useImperativeHandle、useLayoutEffect、useDebugValue、useDeferredValue、useTransition、useId
 */