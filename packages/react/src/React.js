const ReactVersion = '18.2.0'
import {
    REACT_FRAGMENT_TYPE,
    REACT_DEBUG_TRACING_MODE_TYPE,
    REACT_PROFILER_TYPE,
    REACT_STARICT_MODE_TYPE,
    REACT_SUSPENSE_TYPE,
    REACT_SUSPENSE_LIST_TYPE,
    REACT_LEGACY_HIDDEN_TYPE,
    REACT_OFFSCREEN_TYPE,
    REACT_SCOPE_TYPE,
    REACT_CACHE_TYPE,
    REACT_TRACING_MARKER_TYPE
} from 'shared/ReactSymbols'
import { Component, PureComponent } from './ReactBaseClasses'
import { createRef } from './ReactCreateRef'
import { forEach, map, count, toArray, only } from './ReactChildren'
import {
    createElement as createElementProd,
    createFactory as createFactoryProd,
    cloneElement as cloneElementProd,
    isValidElement
} from './ReactElement'
import { createContext } from './ReactContext'
import { lazy } from './ReactLazy'
import { forwardRef } from './ReactForwardRef'
import { memo } from './ReactMemo'
import { cache } from './ReactCache'
import {
    getCacheSignal,
    getCacheForType,
    useCallback,
    useContext,
    useEffect,
    useEffectEvent,
    useImperativeHandle,
    useDebugValue,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useMutableSource,
    useSyncExternalStore,
    useReducer,
    useRef,
    useState,
    useTransition,
    useDeferredValue,
    useId,
    useCacheRefresh,
    use,
    useMemoCache
} from './ReactHooks'
import {
    createElementWithValidation,
    createFactoryWithValidation,
    cloneElementWithValidation
} from './ReactElementValidator'
import { createServerContext } from './ReactServerContext'
import { createMutableSource } from './ReactMutableSource'
import ReactSharedInternals from './ReactSharedInternals'
import { startTransition } from './ReactStartTransition'
import { act } from './ReactAct'

// 重新组合导出字段
const createElement: any = createElementProd
const cloneElement: any = cloneElementProd
const createFactory: any = createFactoryProd
const Children = {
    map,
    forEach,
    count,
    toArray,
    only
}

export {
    Children,
    createMutableSource,
    createRef,
    Component,
    PureComponent,
    createContext,
    createServerContext,
    forwardRef,
    lazy,
    memo,
    cache,
    useCallback,
    useContext,
    useEffect,
    useEffectEvent as experimental_useEffectEvent,
    useImperativeHandle,
    useDebugValue,
    useInsertionEffect,
    useLayoutEffect,
    useMemo,
    useMutableSource,
    useSyncExternalStore,
    useReducer,
    useRef,
    useState,
    REACT_FRAGMENT_TYPE as Fragment,
    REACT_PROFILER_TYPE as Profiler,
    REACT_STARICT_MODE_TYPE as StrictMode,
    REACT_DEBUG_TRACING_MODE_TYPE as unstable_DebugTracingMode,
    REACT_SUSPENSE_TYPE as Suspense,
    createElement,
    cloneElement,
    isValidElement,
    ReactVersion as version,
    ReactSharedInternals as __SECRET_INTERANLS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    createFactory,
    useTransition,
    startTransition,
    useDeferredValue,
    REACT_SUSPENSE_LIST_TYPE as SuspenseList,
    REACT_LEGACY_HIDDEN_TYPE as unstable_LegacyHidden,
    REACT_OFFSCREEN_TYPE as unstable_Offscreen,
    getCacheSignal as unstable_getCacheSignal,
    getCacheForType as unstable_getCacheForType,
    useCacheRefresh as unstable_useCacheRefresh,
    REACT_CACHE_TYPE as unstable_Cache,
    use,
    useMemoCache as unstable_useMemoCache,
    REACT_SCOPE_TYPE as unstable_Scope,
    REACT_TRACING_MARKER_TYPE as unstable_TracingMarker,
    useId,
    act
}