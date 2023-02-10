import type { ReactContext } from 'shared/ReactTypes'
import { REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE } from 'shared/ReactSymbols'
import type { ReactProviderType } from 'shared/ReactTypes'

export function createContext<T>(defaultValue: T): ReactContext<T> {
  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider(null: any),
    Consumer: (null: any),
    _defaultValue: (null: any),
    _globalName: (null: any)
  }
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  }
  let hasWarnedAboutUsingNestedContextConsumers = false
  let hasWarnedAboutUsingConsumerProvider = false
  let hasWarnedAboutDisplayNameOnConsumer = false
  if (__DEV__) {
    const Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context
    }
    Object.defineProperties(Consumer, {
      Provider: {
        get() {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true
            console.error(
              'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' +
              'a future major release. Did you mean to render <Context.Provider> instead?',
            );
          }
          return context.Provider
        },
        set(_Provider: ReactProviderType<T>) {
          context.Provider = _Provider
        }
      },
      _currentValue: {
        get() {
          return context._currentValue
        },
        set(_currentValue: T) {
          context._currentValue = _currentValue
        }
      },
      _currentValue2: {
        get() {
          return context._currentValue2
        },
        set(_currentValue2) {
          context._currentValue2 = _currentValue2
        }
      },
      _threadCount: {
        get() {
          return context._threadCount
        },
        set(_threadCount: number) {
          context._threadCount = _threadCount
        }
      },
      Consumer: {
        get() {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true
            console.error(
              'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' +
              'a future major release. Did you mean to render <Context.Consumer> instead?',
            );
          }
          return context.Consumer
        }
      },
      displayName: {
        get() {
          return context.displayName
        },
        set(displayName: void | string) {
          if (!hasWarnedAboutDisplayNameOnConsumer) {
            hasWarnedAboutDisplayNameOnConsumer = true
            console.warn(
              'Setting `displayName` on Context.Consumer has no effect. ' +
              "You should set it directly on the context with Context.displayName = '%s'.",
              displayName,
            );
          }
        }
      }
    })
    context.Consumer = Consumer
  } else {
    context.Consumer = context
  }
  if (__DEV__) {
    context._currentRenderer = null
    context._currentRenderer2 = null
  }
  return context
}