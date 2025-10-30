import {
  APP_BOOTSTRAP_LISTENER,
  ApplicationRef,
  DestroyRef,
  EnvironmentInjector,
  ErrorHandler,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  PendingTasks,
  RuntimeError,
  assertInInjectionContext,
  assertNotInReactiveContext,
  computed,
  createEnvironmentInjector,
  inject,
  isPromise,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
  runInInjectionContext,
  setClassMetadata,
  signal,
  untracked,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-YPOJXTPD.js";
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  buffer,
  catchError,
  config,
  debounceTime,
  defaultIfEmpty,
  distinctUntilChanged,
  filter,
  finalize,
  forkJoin,
  from,
  isObservable,
  map,
  mergeMap,
  of,
  shareReplay,
  skip,
  startWith,
  take,
  takeUntil
} from "./chunk-SCE2THVU.js";
import {
  __name,
  __publicField,
  __spreadProps,
  __spreadValues
} from "./chunk-ICHT5QNQ.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function toSignal(source, options) {
  typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  if (ngDevMode && requiresCleanup && !options?.injector) {
    assertInInjectionContext(toSignal);
  }
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, { equal });
  } else {
    state = signal({ kind: 1, value: options?.initialValue }, { equal });
  }
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: /* @__PURE__ */ __name((value) => state.set({ kind: 1, value }), "next"),
    error: /* @__PURE__ */ __name((error) => {
      state.set({ kind: 2, error });
      destroyUnregisterFn?.();
    }, "error"),
    complete: /* @__PURE__ */ __name(() => {
      destroyUnregisterFn?.();
    }, "complete")
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  destroyUnregisterFn = cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, { equal: options?.equal });
}
__name(toSignal, "toSignal");
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}
__name(makeToSignalEqual, "makeToSignalEqual");

// node_modules/@ngxs/store/fesm2022/ngxs-store-internals.mjs
var ɵMETA_KEY = "NGXS_META";
var ɵMETA_OPTIONS_KEY = "NGXS_OPTIONS_META";
var ɵSELECTOR_META_KEY = "NGXS_SELECTOR_META";
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var ɵhasOwnProperty = /* @__PURE__ */ __name((target, key) => _hasOwnProperty.call(target, key), "ɵhasOwnProperty");
var ɵdefineProperty = Object.defineProperty;
function ɵensureStoreMetadata(target) {
  if (!ɵhasOwnProperty(target, ɵMETA_KEY)) {
    const defaultMetadata = {
      name: null,
      actions: {},
      defaults: {},
      path: null,
      makeRootSelector(context) {
        return context.getStateGetter(defaultMetadata.name);
      },
      children: []
    };
    ɵdefineProperty(target, ɵMETA_KEY, {
      value: defaultMetadata
    });
  }
  return ɵgetStoreMetadata(target);
}
__name(ɵensureStoreMetadata, "ɵensureStoreMetadata");
function ɵgetStoreMetadata(target) {
  return target[ɵMETA_KEY];
}
__name(ɵgetStoreMetadata, "ɵgetStoreMetadata");
function ɵensureSelectorMetadata(target) {
  if (!ɵhasOwnProperty(target, ɵSELECTOR_META_KEY)) {
    const defaultMetadata = {
      makeRootSelector: null,
      originalFn: null,
      containerClass: null,
      selectorName: null,
      getSelectorOptions: /* @__PURE__ */ __name(() => ({}), "getSelectorOptions")
    };
    ɵdefineProperty(target, ɵSELECTOR_META_KEY, {
      value: defaultMetadata
    });
  }
  return ɵgetSelectorMetadata(target);
}
__name(ɵensureSelectorMetadata, "ɵensureSelectorMetadata");
function ɵgetSelectorMetadata(target) {
  return target[ɵSELECTOR_META_KEY];
}
__name(ɵgetSelectorMetadata, "ɵgetSelectorMetadata");
function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }
  const length = prev.length;
  for (let i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }
  return true;
}
__name(areArgumentsShallowlyEqual, "areArgumentsShallowlyEqual");
function ɵmemoize(func, equalityCheck = Object.is) {
  let lastArgs = null;
  let lastResult = null;
  function memoized() {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      lastResult = func.apply(null, arguments);
    }
    lastArgs = arguments;
    return lastResult;
  }
  __name(memoized, "memoized");
  memoized.reset = function() {
    lastArgs = null;
    lastResult = null;
  };
  return memoized;
}
__name(ɵmemoize, "ɵmemoize");
var _StateToken = class _StateToken {
  _name;
  constructor(_name) {
    this._name = _name;
    const selectorMetadata = ɵensureSelectorMetadata(this);
    selectorMetadata.makeRootSelector = (runtimeContext) => {
      return runtimeContext.getStateGetter(this._name);
    };
  }
  getName() {
    return this._name;
  }
  toString() {
    return `StateToken[${this._name}]`;
  }
};
__name(_StateToken, "StateToken");
var StateToken = _StateToken;
var _ɵInitialState = class _ɵInitialState {
  static set(state) {
    this._value = state;
  }
  static pop() {
    const state = this._value;
    this._value = {};
    return state;
  }
};
__name(_ɵInitialState, "ɵInitialState");
__publicField(_ɵInitialState, "_value", {});
var ɵInitialState = _ɵInitialState;
var ɵINITIAL_STATE_TOKEN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "INITIAL_STATE_TOKEN" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ __name(() => ɵInitialState.pop(), "factory")
});
var _ɵNgxsAppBootstrappedState = class _ɵNgxsAppBootstrappedState extends BehaviorSubject {
  constructor() {
    super(false);
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => this.complete());
  }
  bootstrap() {
    this.next(true);
  }
};
__name(_ɵNgxsAppBootstrappedState, "ɵNgxsAppBootstrappedState");
/** @nocollapse */
__publicField(_ɵNgxsAppBootstrappedState, "ɵfac", /* @__PURE__ */ __name(function ɵNgxsAppBootstrappedState_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ɵNgxsAppBootstrappedState)();
}, "ɵNgxsAppBootstrappedState_Factory"));
/** @nocollapse */
__publicField(_ɵNgxsAppBootstrappedState, "ɵprov", ɵɵdefineInjectable({
  token: _ɵNgxsAppBootstrappedState,
  factory: _ɵNgxsAppBootstrappedState.ɵfac,
  providedIn: "root"
}));
var ɵNgxsAppBootstrappedState = _ɵNgxsAppBootstrappedState;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵNgxsAppBootstrappedState, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var ɵNGXS_STATE_FACTORY = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ɵNGXS_STATE_FACTORY" : "");
var ɵNGXS_STATE_CONTEXT_FACTORY = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ɵNGXS_STATE_CONTEXT_FACTORY" : "");
function orderedQueueOperation(operation) {
  const callsQueue = [];
  let busyPushingNext = false;
  return /* @__PURE__ */ __name(function callOperation(...args) {
    if (busyPushingNext) {
      callsQueue.unshift(args);
      return;
    }
    busyPushingNext = true;
    operation(...args);
    while (callsQueue.length > 0) {
      const nextCallArgs = callsQueue.pop();
      nextCallArgs && operation(...nextCallArgs);
    }
    busyPushingNext = false;
  }, "callOperation");
}
__name(orderedQueueOperation, "orderedQueueOperation");
var _ɵOrderedSubject = class _ɵOrderedSubject extends Subject {
  _orderedNext = orderedQueueOperation((value) => super.next(value));
  next(value) {
    this._orderedNext(value);
  }
};
__name(_ɵOrderedSubject, "ɵOrderedSubject");
var ɵOrderedSubject = _ɵOrderedSubject;
var _ɵOrderedBehaviorSubject = class _ɵOrderedBehaviorSubject extends BehaviorSubject {
  _orderedNext = orderedQueueOperation((value) => super.next(value));
  _currentValue;
  constructor(value) {
    super(value);
    this._currentValue = value;
  }
  getValue() {
    return this._currentValue;
  }
  next(value) {
    this._currentValue = value;
    this._orderedNext(value);
  }
};
__name(_ɵOrderedBehaviorSubject, "ɵOrderedBehaviorSubject");
var ɵOrderedBehaviorSubject = _ɵOrderedBehaviorSubject;
function ɵwrapObserverCalls(invokeFn) {
  return (source) => {
    return new Observable((subscriber) => {
      return source.subscribe({
        next(value) {
          invokeFn(() => subscriber.next(value));
        },
        error(error) {
          invokeFn(() => subscriber.error(error));
        },
        complete() {
          invokeFn(() => subscriber.complete());
        }
      });
    });
  };
}
__name(ɵwrapObserverCalls, "ɵwrapObserverCalls");
var _ɵStateStream = class _ɵStateStream extends ɵOrderedBehaviorSubject {
  state = toSignal(this.pipe(ɵwrapObserverCalls(untracked)), {
    manualCleanup: true,
    requireSync: true
  });
  constructor() {
    super({});
    inject(DestroyRef).onDestroy(() => this.complete());
  }
};
__name(_ɵStateStream, "ɵStateStream");
/** @nocollapse */
__publicField(_ɵStateStream, "ɵfac", /* @__PURE__ */ __name(function ɵStateStream_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ɵStateStream)();
}, "ɵStateStream_Factory"));
/** @nocollapse */
__publicField(_ɵStateStream, "ɵprov", ɵɵdefineInjectable({
  token: _ɵStateStream,
  factory: _ɵStateStream.ɵfac,
  providedIn: "root"
}));
var ɵStateStream = _ɵStateStream;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵStateStream, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var _ɵNgxsActionRegistry = class _ɵNgxsActionRegistry {
  // Instead of going over the states list every time an action is dispatched,
  // we are constructing a map of action types to lists of action metadata.
  // If the `@@Init` action is handled in two different states, the action
  // metadata list will contain two objects that have the state `instance` and
  // method names to be used as action handlers (decorated with `@Action(InitState)`).
  _actionTypeToHandlersMap = /* @__PURE__ */ new Map();
  constructor() {
    inject(DestroyRef).onDestroy(() => this._actionTypeToHandlersMap.clear());
  }
  get(type) {
    return this._actionTypeToHandlersMap.get(type);
  }
  register(type, handler) {
    const handlers = this._actionTypeToHandlersMap.get(type) ?? /* @__PURE__ */ new Set();
    handlers.add(handler);
    this._actionTypeToHandlersMap.set(type, handlers);
    return () => {
      const handlers2 = this._actionTypeToHandlersMap.get(type);
      handlers2.delete(handler);
    };
  }
};
__name(_ɵNgxsActionRegistry, "ɵNgxsActionRegistry");
/** @nocollapse */
__publicField(_ɵNgxsActionRegistry, "ɵfac", /* @__PURE__ */ __name(function ɵNgxsActionRegistry_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ɵNgxsActionRegistry)();
}, "ɵNgxsActionRegistry_Factory"));
/** @nocollapse */
__publicField(_ɵNgxsActionRegistry, "ɵprov", ɵɵdefineInjectable({
  token: _ɵNgxsActionRegistry,
  factory: _ɵNgxsActionRegistry.ɵfac,
  providedIn: "root"
}));
var ɵNgxsActionRegistry = _ɵNgxsActionRegistry;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵNgxsActionRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@ngxs/store/fesm2022/ngxs-store-plugins.mjs
var _InitState = class _InitState {
};
__name(_InitState, "InitState");
__publicField(_InitState, "type", "@@INIT");
var InitState = _InitState;
var _UpdateState = class _UpdateState {
  addedStates;
  constructor(addedStates) {
    this.addedStates = addedStates;
  }
};
__name(_UpdateState, "UpdateState");
__publicField(_UpdateState, "type", "@@UPDATE_STATE");
var UpdateState = _UpdateState;
var NGXS_PLUGINS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_PLUGINS" : "");
function ɵisPluginClass(plugin) {
  return !!plugin.prototype.handle;
}
__name(ɵisPluginClass, "ɵisPluginClass");
function getActionTypeFromInstance(action) {
  return action.constructor?.type || action.type;
}
__name(getActionTypeFromInstance, "getActionTypeFromInstance");
function actionMatcher(action1) {
  const type1 = getActionTypeFromInstance(action1);
  return function(action2) {
    return type1 === getActionTypeFromInstance(action2);
  };
}
__name(actionMatcher, "actionMatcher");
var setValue = /* @__PURE__ */ __name((obj, prop, val) => {
  obj = __spreadValues({}, obj);
  const split = prop.split(".");
  const lastIndex = split.length - 1;
  split.reduce((acc, part, index) => {
    if (index === lastIndex) {
      acc[part] = val;
    } else {
      acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : __spreadValues({}, acc[part]);
    }
    return acc?.[part];
  }, obj);
  return obj;
}, "setValue");
var getValue = /* @__PURE__ */ __name((obj, prop) => prop.split(".").reduce((acc, part) => acc?.[part], obj), "getValue");

// node_modules/@ngxs/store/fesm2022/ngxs-store-operators.mjs
var isArray = Array.isArray;
var isFunction = /* @__PURE__ */ __name((value) => typeof value == "function", "isFunction");
var isStateOperator = isFunction;

// node_modules/@ngxs/store/fesm2022/ngxs-store.mjs
var _PluginManager = class _PluginManager {
  plugins = [];
  _parentManager = inject(_PluginManager, {
    optional: true,
    skipSelf: true
  });
  _pluginHandlers = inject(NGXS_PLUGINS, {
    optional: true
  });
  constructor() {
    this.registerHandlers();
  }
  get _rootPlugins() {
    return this._parentManager?.plugins || this.plugins;
  }
  registerHandlers() {
    const pluginHandlers = this.getPluginHandlers();
    this._rootPlugins.push(...pluginHandlers);
  }
  getPluginHandlers() {
    const handlers = this._pluginHandlers || [];
    return handlers.map((plugin) => plugin.handle ? plugin.handle.bind(plugin) : plugin);
  }
};
__name(_PluginManager, "PluginManager");
/** @nocollapse */
__publicField(_PluginManager, "ɵfac", /* @__PURE__ */ __name(function PluginManager_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PluginManager)();
}, "PluginManager_Factory"));
/** @nocollapse */
__publicField(_PluginManager, "ɵprov", ɵɵdefineInjectable({
  token: _PluginManager,
  factory: _PluginManager.ɵfac,
  providedIn: "root"
}));
var PluginManager = _PluginManager;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PluginManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function leaveNgxs(ngxsExecutionStrategy) {
  return ɵwrapObserverCalls((fn) => ngxsExecutionStrategy.leave(fn));
}
__name(leaveNgxs, "leaveNgxs");
var ɵɵunhandledRxjsErrorCallbacks = /* @__PURE__ */ new WeakMap();
var installed = false;
function installOnUnhandhedErrorHandler() {
  if (installed) {
    return;
  }
  const existingHandler = config.onUnhandledError;
  config.onUnhandledError = function(error) {
    const unhandledErrorCallback = ɵɵunhandledRxjsErrorCallbacks.get(error);
    if (unhandledErrorCallback) {
      unhandledErrorCallback();
    } else if (existingHandler) {
      existingHandler.call(this, error);
    } else {
      throw error;
    }
  };
  installed = true;
}
__name(installOnUnhandhedErrorHandler, "installOnUnhandhedErrorHandler");
function executeUnhandledCallback(error) {
  const unhandledErrorCallback = ɵɵunhandledRxjsErrorCallbacks.get(error);
  if (unhandledErrorCallback) {
    unhandledErrorCallback();
    return true;
  }
  return false;
}
__name(executeUnhandledCallback, "executeUnhandledCallback");
function assignUnhandledCallback(error, callback) {
  if (error && typeof error === "object") {
    let hasBeenCalled = false;
    ɵɵunhandledRxjsErrorCallbacks.set(error, () => {
      if (!hasBeenCalled) {
        hasBeenCalled = true;
        callback();
      }
    });
  }
  return error;
}
__name(assignUnhandledCallback, "assignUnhandledCallback");
function fallbackSubscriber(ngZone) {
  return (source) => {
    let subscription = source.subscribe({
      error: /* @__PURE__ */ __name((error) => {
        ngZone.runOutsideAngular(() => {
          queueMicrotask(() => {
            if (subscription) {
              executeUnhandledCallback(error);
            }
          });
        });
      }, "error")
    });
    return new Observable((subscriber) => {
      subscription?.unsubscribe();
      subscription = null;
      return source.subscribe(subscriber);
    });
  };
}
__name(fallbackSubscriber, "fallbackSubscriber");
var _InternalDispatchedActionResults = class _InternalDispatchedActionResults extends Subject {
  constructor() {
    super();
    inject(DestroyRef).onDestroy(() => this.complete());
  }
};
__name(_InternalDispatchedActionResults, "InternalDispatchedActionResults");
/** @nocollapse */
__publicField(_InternalDispatchedActionResults, "ɵfac", /* @__PURE__ */ __name(function InternalDispatchedActionResults_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InternalDispatchedActionResults)();
}, "InternalDispatchedActionResults_Factory"));
/** @nocollapse */
__publicField(_InternalDispatchedActionResults, "ɵprov", ɵɵdefineInjectable({
  token: _InternalDispatchedActionResults,
  factory: _InternalDispatchedActionResults.ɵfac,
  providedIn: "root"
}));
var InternalDispatchedActionResults = _InternalDispatchedActionResults;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalDispatchedActionResults, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var _InternalNgxsExecutionStrategy = class _InternalNgxsExecutionStrategy {
  _ngZone = inject(NgZone);
  enter(func) {
    if (false) {
      return this._runInsideAngular(func);
    }
    return this._runOutsideAngular(func);
  }
  leave(func) {
    return this._runInsideAngular(func);
  }
  _runInsideAngular(func) {
    if (NgZone.isInAngularZone()) {
      return func();
    }
    return this._ngZone.run(func);
  }
  _runOutsideAngular(func) {
    if (NgZone.isInAngularZone()) {
      return this._ngZone.runOutsideAngular(func);
    }
    return func();
  }
};
__name(_InternalNgxsExecutionStrategy, "InternalNgxsExecutionStrategy");
/** @nocollapse */
__publicField(_InternalNgxsExecutionStrategy, "ɵfac", /* @__PURE__ */ __name(function InternalNgxsExecutionStrategy_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InternalNgxsExecutionStrategy)();
}, "InternalNgxsExecutionStrategy_Factory"));
/** @nocollapse */
__publicField(_InternalNgxsExecutionStrategy, "ɵprov", ɵɵdefineInjectable({
  token: _InternalNgxsExecutionStrategy,
  factory: _InternalNgxsExecutionStrategy.ɵfac,
  providedIn: "root"
}));
var InternalNgxsExecutionStrategy = _InternalNgxsExecutionStrategy;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalNgxsExecutionStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var ActionStatus;
(function(ActionStatus2) {
  ActionStatus2["Dispatched"] = "DISPATCHED";
  ActionStatus2["Successful"] = "SUCCESSFUL";
  ActionStatus2["Canceled"] = "CANCELED";
  ActionStatus2["Errored"] = "ERRORED";
})(ActionStatus || (ActionStatus = {}));
var _InternalActions = class _InternalActions extends ɵOrderedSubject {
  // This subject will be the first to know about the dispatched action, its purpose is for
  // any logic that must be executed before action handlers are invoked (i.e., cancelation).
  dispatched$ = new Subject();
  constructor() {
    super();
    this.subscribe((ctx) => {
      if (ctx.status === ActionStatus.Dispatched) {
        this.dispatched$.next(ctx);
      }
    });
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      this.complete();
      this.dispatched$.complete();
    });
  }
};
__name(_InternalActions, "InternalActions");
/** @nocollapse */
__publicField(_InternalActions, "ɵfac", /* @__PURE__ */ __name(function InternalActions_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InternalActions)();
}, "InternalActions_Factory"));
/** @nocollapse */
__publicField(_InternalActions, "ɵprov", ɵɵdefineInjectable({
  token: _InternalActions,
  factory: _InternalActions.ɵfac,
  providedIn: "root"
}));
var InternalActions = _InternalActions;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalActions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var _Actions = class _Actions extends Observable {
  constructor() {
    const internalActions$ = inject(InternalActions);
    const internalExecutionStrategy = inject(InternalNgxsExecutionStrategy);
    const sharedInternalActions$ = new Subject();
    internalActions$.pipe(leaveNgxs(internalExecutionStrategy)).subscribe(sharedInternalActions$);
    super((observer) => {
      const childSubscription = sharedInternalActions$.subscribe({
        next: /* @__PURE__ */ __name((ctx) => observer.next(ctx), "next"),
        error: /* @__PURE__ */ __name((error) => observer.error(error), "error"),
        complete: /* @__PURE__ */ __name(() => observer.complete(), "complete")
      });
      observer.add(childSubscription);
    });
  }
};
__name(_Actions, "Actions");
/** @nocollapse */
__publicField(_Actions, "ɵfac", /* @__PURE__ */ __name(function Actions_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Actions)();
}, "Actions_Factory"));
/** @nocollapse */
__publicField(_Actions, "ɵprov", ɵɵdefineInjectable({
  token: _Actions,
  factory: _Actions.ɵfac,
  providedIn: "root"
}));
var Actions = _Actions;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Actions, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var _InternalDispatcher = class _InternalDispatcher {
  _ngZone = inject(NgZone);
  _actions = inject(InternalActions);
  _actionResults = inject(InternalDispatchedActionResults);
  _pluginManager = inject(PluginManager);
  _stateStream = inject(ɵStateStream);
  _ngxsExecutionStrategy = inject(InternalNgxsExecutionStrategy);
  _injector = inject(Injector);
  /**
   * Dispatches event(s).
   */
  dispatch(actionOrActions) {
    const result = this._ngxsExecutionStrategy.enter(() => this.dispatchByEvents(actionOrActions));
    return result.pipe(fallbackSubscriber(this._ngZone), leaveNgxs(this._ngxsExecutionStrategy));
  }
  dispatchByEvents(actionOrActions) {
    if (Array.isArray(actionOrActions)) {
      if (actionOrActions.length === 0) return of(void 0);
      return forkJoin(actionOrActions.map((action) => this.dispatchSingle(action))).pipe(map(() => void 0));
    } else {
      return this.dispatchSingle(actionOrActions);
    }
  }
  dispatchSingle(action) {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      const type = getActionTypeFromInstance(action);
      if (!type) {
        const error = new Error(`This action doesn't have a type property: ${action.constructor.name}`);
        return new Observable((subscriber) => subscriber.error(error));
      }
    }
    const prevState = this._stateStream.getValue();
    const plugins = this._pluginManager.plugins;
    return compose(this._injector, [...plugins, (nextState, nextAction) => {
      if (nextState !== prevState) {
        this._stateStream.next(nextState);
      }
      const actionResult$ = this.getActionResultStream(nextAction);
      actionResult$.subscribe((ctx) => this._actions.next(ctx));
      this._actions.next({
        action: nextAction,
        status: ActionStatus.Dispatched
      });
      return this.createDispatchObservable(actionResult$);
    }])(prevState, action).pipe(shareReplay());
  }
  getActionResultStream(action) {
    return this._actionResults.pipe(filter((ctx) => ctx.action === action && ctx.status !== ActionStatus.Dispatched), take(1), shareReplay());
  }
  createDispatchObservable(actionResult$) {
    return actionResult$.pipe(mergeMap((ctx) => {
      switch (ctx.status) {
        case ActionStatus.Successful:
          return of(this._stateStream.getValue());
        case ActionStatus.Errored:
          throw ctx.error;
        default:
          return EMPTY;
      }
    }), shareReplay());
  }
};
__name(_InternalDispatcher, "InternalDispatcher");
/** @nocollapse */
__publicField(_InternalDispatcher, "ɵfac", /* @__PURE__ */ __name(function InternalDispatcher_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InternalDispatcher)();
}, "InternalDispatcher_Factory"));
/** @nocollapse */
__publicField(_InternalDispatcher, "ɵprov", ɵɵdefineInjectable({
  token: _InternalDispatcher,
  factory: _InternalDispatcher.ɵfac,
  providedIn: "root"
}));
var InternalDispatcher = _InternalDispatcher;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var compose = /* @__PURE__ */ __name((injector, funcs) => (...args) => {
  const curr = funcs.shift();
  return runInInjectionContext(injector, () => curr(...args, (...nextArgs) => compose(injector, funcs)(...nextArgs)));
}, "compose");
var ROOT_STATE_TOKEN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ROOT_STATE_TOKEN" : "");
var FEATURE_STATE_TOKEN = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "FEATURE_STATE_TOKEN" : "");
var NGXS_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_OPTIONS" : "");
var _NgxsConfig = class _NgxsConfig {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   * (default: false)
   *
   * Note: this property will be accounted only in development mode.
   * It makes sense to use it only during development to ensure there're no state mutations.
   * When building for production, the `Object.freeze` will be tree-shaken away.
   */
  developmentMode;
  compatibility = {
    strictContentSecurityPolicy: false
  };
  /**
   * Defining shared selector options
   */
  selectorOptions = {
    injectContainerState: false,
    suppressErrors: false
  };
};
__name(_NgxsConfig, "NgxsConfig");
/** @nocollapse */
__publicField(_NgxsConfig, "ɵfac", /* @__PURE__ */ __name(function NgxsConfig_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsConfig)();
}, "NgxsConfig_Factory"));
/** @nocollapse */
__publicField(_NgxsConfig, "ɵprov", ɵɵdefineInjectable({
  token: _NgxsConfig,
  factory: /* @__PURE__ */ __name(() => (() => {
    const defaultConfig = new _NgxsConfig();
    const config2 = inject(NGXS_OPTIONS);
    return __spreadProps(__spreadValues(__spreadValues({}, defaultConfig), config2), {
      selectorOptions: __spreadValues(__spreadValues({}, defaultConfig.selectorOptions), config2.selectorOptions)
    });
  })(), "factory"),
  providedIn: "root"
}));
var NgxsConfig = _NgxsConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: /* @__PURE__ */ __name(() => {
        const defaultConfig = new NgxsConfig();
        const config2 = inject(NGXS_OPTIONS);
        return __spreadProps(__spreadValues(__spreadValues({}, defaultConfig), config2), {
          selectorOptions: __spreadValues(__spreadValues({}, defaultConfig.selectorOptions), config2.selectorOptions)
        });
      }, "useFactory")
    }]
  }], null, null);
})();
var _NgxsSimpleChange = class _NgxsSimpleChange {
  previousValue;
  currentValue;
  firstChange;
  constructor(previousValue, currentValue, firstChange) {
    this.previousValue = previousValue;
    this.currentValue = currentValue;
    this.firstChange = firstChange;
  }
};
__name(_NgxsSimpleChange, "NgxsSimpleChange");
var NgxsSimpleChange = _NgxsSimpleChange;
var deepFreeze = /* @__PURE__ */ __name((o) => {
  Object.freeze(o);
  const oIsFunction = typeof o === "function";
  Object.getOwnPropertyNames(o).forEach(function(prop) {
    if (ɵhasOwnProperty(o, prop) && (oIsFunction ? prop !== "caller" && prop !== "callee" && prop !== "arguments" : true) && o[prop] !== null && (typeof o[prop] === "object" || typeof o[prop] === "function") && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}, "deepFreeze");
var _InternalStateOperations = class _InternalStateOperations {
  _stateStream = inject(ɵStateStream);
  _dispatcher = inject(InternalDispatcher);
  _config = inject(NgxsConfig);
  /**
   * Returns the root state operators.
   */
  getRootStateOperations() {
    const rootStateOperations = {
      getState: /* @__PURE__ */ __name(() => this._stateStream.getValue(), "getState"),
      setState: /* @__PURE__ */ __name((newState) => this._stateStream.next(newState), "setState"),
      dispatch: /* @__PURE__ */ __name((actionOrActions) => this._dispatcher.dispatch(actionOrActions), "dispatch")
    };
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      return this._config.developmentMode ? ensureStateAndActionsAreImmutable(rootStateOperations) : rootStateOperations;
    } else {
      return rootStateOperations;
    }
  }
  setStateToTheCurrentWithNew(results) {
    const stateOperations = this.getRootStateOperations();
    const currentState = stateOperations.getState();
    stateOperations.setState(__spreadValues(__spreadValues({}, currentState), results.defaults));
  }
};
__name(_InternalStateOperations, "InternalStateOperations");
/** @nocollapse */
__publicField(_InternalStateOperations, "ɵfac", /* @__PURE__ */ __name(function InternalStateOperations_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InternalStateOperations)();
}, "InternalStateOperations_Factory"));
/** @nocollapse */
__publicField(_InternalStateOperations, "ɵprov", ɵɵdefineInjectable({
  token: _InternalStateOperations,
  factory: _InternalStateOperations.ɵfac,
  providedIn: "root"
}));
var InternalStateOperations = _InternalStateOperations;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalStateOperations, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function ensureStateAndActionsAreImmutable(root) {
  return {
    getState: /* @__PURE__ */ __name(() => root.getState(), "getState"),
    setState: /* @__PURE__ */ __name((value) => {
      const frozenValue = deepFreeze(value);
      return root.setState(frozenValue);
    }, "setState"),
    dispatch: /* @__PURE__ */ __name((actions) => {
      return root.dispatch(actions);
    }, "dispatch")
  };
}
__name(ensureStateAndActionsAreImmutable, "ensureStateAndActionsAreImmutable");
function createRootSelectorFactory(selectorMetaData, selectors, memoizedSelectorFn) {
  return (context) => {
    const {
      argumentSelectorFunctions,
      selectorOptions
    } = getRuntimeSelectorInfo(context, selectorMetaData, selectors);
    const {
      suppressErrors
    } = selectorOptions;
    return /* @__PURE__ */ __name(function selectFromRoot(rootState) {
      const results = argumentSelectorFunctions.map((argFn) => argFn(rootState));
      try {
        return memoizedSelectorFn(...results);
      } catch (ex) {
        if (suppressErrors && ex instanceof TypeError) {
          return void 0;
        }
        if (typeof ngDevMode !== "undefined" && ngDevMode) {
          const message = "The selector below has thrown an error upon invocation. Please check for any unsafe property access that may result in null or undefined values.";
          console.error(message, selectorMetaData.originalFn);
        }
        throw ex;
      }
    }, "selectFromRoot");
  };
}
__name(createRootSelectorFactory, "createRootSelectorFactory");
function createMemoizedSelectorFn(originalFn, creationMetadata) {
  const containerClass = creationMetadata?.containerClass;
  const wrappedFn = /* @__PURE__ */ __name(function wrappedSelectorFn() {
    const returnValue = originalFn.apply(containerClass, arguments);
    if (typeof returnValue === "function") {
      const innerMemoizedFn = ɵmemoize.apply(null, [returnValue]);
      return innerMemoizedFn;
    }
    return returnValue;
  }, "wrappedSelectorFn");
  const memoizedFn = ɵmemoize(wrappedFn);
  Object.setPrototypeOf(memoizedFn, originalFn);
  return memoizedFn;
}
__name(createMemoizedSelectorFn, "createMemoizedSelectorFn");
function getRuntimeSelectorInfo(context, selectorMetaData, selectors = []) {
  const localSelectorOptions = selectorMetaData.getSelectorOptions();
  const selectorOptions = context.getSelectorOptions(localSelectorOptions);
  const selectorsToApply = getSelectorsToApply(selectors, selectorOptions, selectorMetaData.containerClass);
  const argumentSelectorFunctions = selectorsToApply.map((selector) => {
    const factory = getRootSelectorFactory(selector);
    return factory(context);
  });
  return {
    selectorOptions,
    argumentSelectorFunctions
  };
}
__name(getRuntimeSelectorInfo, "getRuntimeSelectorInfo");
function getSelectorsToApply(selectors = [], selectorOptions, containerClass) {
  const selectorsToApply = [];
  const canInjectContainerState = selectorOptions.injectContainerState || selectors.length === 0;
  if (containerClass && canInjectContainerState) {
    const metadata = ɵgetStoreMetadata(containerClass);
    if (metadata) {
      selectorsToApply.push(containerClass);
    }
  }
  selectorsToApply.push(...selectors);
  return selectorsToApply;
}
__name(getSelectorsToApply, "getSelectorsToApply");
function getRootSelectorFactory(selector) {
  const metadata = ɵgetSelectorMetadata(selector) || ɵgetStoreMetadata(selector);
  return metadata?.makeRootSelector || (() => selector);
}
__name(getRootSelectorFactory, "getRootSelectorFactory");
function compliantPropGetter(paths) {
  return (obj) => {
    for (let i = 0; i < paths.length; i++) {
      if (!obj) return void 0;
      obj = obj[paths[i]];
    }
    return obj;
  };
}
__name(compliantPropGetter, "compliantPropGetter");
function fastPropGetter(paths) {
  const segments = paths;
  let seg = "store." + segments[0];
  let i = 0;
  const l = segments.length;
  let expr = seg;
  while (++i < l) {
    expr = expr + " && " + (seg = seg + "." + segments[i]);
  }
  const fn = new Function("store", "return " + expr + ";");
  return fn;
}
__name(fastPropGetter, "fastPropGetter");
var ɵPROP_GETTER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "PROP_GETTER" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ __name(() => inject(NgxsConfig).compatibility?.strictContentSecurityPolicy ? compliantPropGetter : fastPropGetter, "factory")
});
function buildGraph(stateClasses) {
  const findName = /* @__PURE__ */ __name((stateClass) => {
    const meta = stateClasses.find((s) => s === stateClass);
    if (typeof ngDevMode !== "undefined" && ngDevMode && !meta) {
      throw new Error(`Child state not found: ${stateClass}. \r
You may have forgotten to add states to module`);
    }
    return meta[ɵMETA_KEY].name;
  }, "findName");
  return stateClasses.reduce((graph, stateClass) => {
    const meta = stateClass[ɵMETA_KEY];
    graph[meta.name] = (meta.children || []).map(findName);
    return graph;
  }, {});
}
__name(buildGraph, "buildGraph");
function nameToState(states) {
  return states.reduce((result, stateClass) => {
    const meta = stateClass[ɵMETA_KEY];
    result[meta.name] = stateClass;
    return result;
  }, {});
}
__name(nameToState, "nameToState");
function findFullParentPath(obj, out = {}) {
  const find = /* @__PURE__ */ __name((graph, target) => {
    for (const key in graph) {
      if (graph[key]?.includes(target)) {
        const parent = find(graph, key);
        return parent ? `${parent}.${key}` : key;
      }
    }
    return null;
  }, "find");
  for (const key in obj) {
    const parent = find(obj, key);
    out[key] = parent ? `${parent}.${key}` : key;
  }
  return out;
}
__name(findFullParentPath, "findFullParentPath");
function topologicalSort(graph) {
  const sorted = [];
  const visited = {};
  const visit = /* @__PURE__ */ __name((name, ancestors = []) => {
    visited[name] = true;
    ancestors.push(name);
    for (const dep of graph[name]) {
      if (typeof ngDevMode !== "undefined" && ngDevMode && ancestors.includes(dep)) {
        throw new Error(`Circular dependency '${dep}' is required by '${name}': ${ancestors.join(" -> ")}`);
      }
      if (!visited[dep]) visit(dep, ancestors.slice());
    }
    if (!sorted.includes(name)) sorted.push(name);
  }, "visit");
  for (const key in graph) visit(key);
  return sorted.reverse();
}
__name(topologicalSort, "topologicalSort");
function throwStateNameError(name) {
  throw new Error(`${name} is not a valid state name. It needs to be a valid object property name.`);
}
__name(throwStateNameError, "throwStateNameError");
function throwStateNamePropertyError() {
  throw new Error(`States must register a 'name' property.`);
}
__name(throwStateNamePropertyError, "throwStateNamePropertyError");
function throwStateUniqueError(current, newName, oldName) {
  throw new Error(`State name '${current}' from ${newName} already exists in ${oldName}.`);
}
__name(throwStateUniqueError, "throwStateUniqueError");
function throwStateDecoratorError(name) {
  throw new Error(`States must be decorated with @State() decorator, but "${name}" isn't.`);
}
__name(throwStateDecoratorError, "throwStateDecoratorError");
function throwActionDecoratorError() {
  throw new Error("@Action() decorator cannot be used with static methods.");
}
__name(throwActionDecoratorError, "throwActionDecoratorError");
function throwSelectorDecoratorError() {
  throw new Error("Selectors only work on methods.");
}
__name(throwSelectorDecoratorError, "throwSelectorDecoratorError");
function getUndecoratedStateWithInjectableWarningMessage(name) {
  return `'${name}' class should be decorated with @Injectable() right after the @State() decorator`;
}
__name(getUndecoratedStateWithInjectableWarningMessage, "getUndecoratedStateWithInjectableWarningMessage");
function getInvalidInitializationOrderMessage(addedStates) {
  let message = "You have an invalid state initialization order. This typically occurs when `NgxsModule.forFeature`\nor `provideStates` is called before `NgxsModule.forRoot` or `provideStore`.\nOne example is when `NgxsRouterPluginModule.forRoot` is called before `NgxsModule.forRoot`.";
  if (addedStates) {
    const stateNames = Object.keys(addedStates).map((stateName) => `"${stateName}"`);
    message += `
Feature states added before the store initialization is complete: ${stateNames.join(", ")}.`;
  }
  return message;
}
__name(getInvalidInitializationOrderMessage, "getInvalidInitializationOrderMessage");
function throwPatchingArrayError() {
  throw new Error("Patching arrays is not supported.");
}
__name(throwPatchingArrayError, "throwPatchingArrayError");
function throwPatchingPrimitiveError() {
  throw new Error("Patching primitives is not supported.");
}
__name(throwPatchingPrimitiveError, "throwPatchingPrimitiveError");
var stateNameRegex = new RegExp("^[a-zA-Z0-9_]+$");
function ensureStateNameIsValid(name) {
  if (!name) {
    throwStateNamePropertyError();
  } else if (!stateNameRegex.test(name)) {
    throwStateNameError(name);
  }
}
__name(ensureStateNameIsValid, "ensureStateNameIsValid");
function ensureStateNameIsUnique(stateName, state, statesByName) {
  const existingState = statesByName[stateName];
  if (existingState && existingState !== state) {
    throwStateUniqueError(stateName, state.name, existingState.name);
  }
}
__name(ensureStateNameIsUnique, "ensureStateNameIsUnique");
function ensureStatesAreDecorated(stateClasses) {
  stateClasses.forEach((stateClass) => {
    if (!ɵgetStoreMetadata(stateClass)) {
      throwStateDecoratorError(stateClass.name);
    }
  });
}
__name(ensureStatesAreDecorated, "ensureStatesAreDecorated");
function ensureStateClassIsInjectable(stateClass) {
  if (jit_hasInjectableAnnotation(stateClass) || aot_hasNgInjectableDef(stateClass)) {
    return;
  }
  console.warn(getUndecoratedStateWithInjectableWarningMessage(stateClass.name));
}
__name(ensureStateClassIsInjectable, "ensureStateClassIsInjectable");
function aot_hasNgInjectableDef(stateClass) {
  return !!stateClass.ɵprov;
}
__name(aot_hasNgInjectableDef, "aot_hasNgInjectableDef");
function jit_hasInjectableAnnotation(stateClass) {
  const annotations = stateClass.__annotations__ || [];
  return annotations.some((annotation) => annotation?.ngMetadataName === "Injectable");
}
__name(jit_hasInjectableAnnotation, "jit_hasInjectableAnnotation");
var NGXS_DEVELOPMENT_OPTIONS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_DEVELOPMENT_OPTIONS" : "", {
  providedIn: "root",
  factory: /* @__PURE__ */ __name(() => ({
    warnOnUnhandledActions: true
  }), "factory")
});
var _NgxsUnhandledActionsLogger = class _NgxsUnhandledActionsLogger {
  /**
   * These actions should be ignored by default; the user can increase this
   * list in the future via the `ignoreActions` method.
   */
  _ignoredActions = /* @__PURE__ */ new Set([InitState.type, UpdateState.type]);
  constructor() {
    const options = inject(NGXS_DEVELOPMENT_OPTIONS);
    if (typeof options.warnOnUnhandledActions === "object") {
      this.ignoreActions(...options.warnOnUnhandledActions.ignore);
    }
  }
  /**
   * Adds actions to the internal list of actions that should be ignored.
   */
  ignoreActions(...actions) {
    for (const action of actions) {
      this._ignoredActions.add(action.type);
    }
  }
  /** @internal */
  warn(action) {
    const actionShouldBeIgnored = Array.from(this._ignoredActions).some((type) => type === getActionTypeFromInstance(action));
    if (actionShouldBeIgnored) {
      return;
    }
    action = action.constructor && action.constructor.name !== "Object" ? action.constructor.name : action.type;
    console.warn(`The ${action} action has been dispatched but hasn't been handled. This may happen if the state with an action handler for this action is not registered.`);
  }
};
__name(_NgxsUnhandledActionsLogger, "NgxsUnhandledActionsLogger");
/** @nocollapse */
__publicField(_NgxsUnhandledActionsLogger, "ɵfac", /* @__PURE__ */ __name(function NgxsUnhandledActionsLogger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsUnhandledActionsLogger)();
}, "NgxsUnhandledActionsLogger_Factory"));
/** @nocollapse */
__publicField(_NgxsUnhandledActionsLogger, "ɵprov", ɵɵdefineInjectable({
  token: _NgxsUnhandledActionsLogger,
  factory: _NgxsUnhandledActionsLogger.ɵfac
}));
var NgxsUnhandledActionsLogger = _NgxsUnhandledActionsLogger;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsUnhandledActionsLogger, [{
    type: Injectable
  }], () => [], null);
})();
var _NgxsUnhandledErrorHandler = class _NgxsUnhandledErrorHandler {
  _ngZone = inject(NgZone);
  _errorHandler = inject(ErrorHandler);
  /**
   * The `_unhandledErrorContext` is left unused internally since we do not
   * require it for internal operations. However, developers who wish to provide
   * their own custom error handler may utilize this context information.
   */
  handleError(error, _unhandledErrorContext) {
    this._ngZone.runOutsideAngular(() => this._errorHandler.handleError(error));
  }
};
__name(_NgxsUnhandledErrorHandler, "NgxsUnhandledErrorHandler");
/** @nocollapse */
__publicField(_NgxsUnhandledErrorHandler, "ɵfac", /* @__PURE__ */ __name(function NgxsUnhandledErrorHandler_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsUnhandledErrorHandler)();
}, "NgxsUnhandledErrorHandler_Factory"));
/** @nocollapse */
__publicField(_NgxsUnhandledErrorHandler, "ɵprov", ɵɵdefineInjectable({
  token: _NgxsUnhandledErrorHandler,
  factory: _NgxsUnhandledErrorHandler.ɵfac,
  providedIn: "root"
}));
var NgxsUnhandledErrorHandler = _NgxsUnhandledErrorHandler;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsUnhandledErrorHandler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function ofAction(...allowedTypes) {
  return ofActionOperator(allowedTypes);
}
__name(ofAction, "ofAction");
function ofActionDispatched(...allowedTypes) {
  return ofActionOperator(allowedTypes, [ActionStatus.Dispatched]);
}
__name(ofActionDispatched, "ofActionDispatched");
function ofActionSuccessful(...allowedTypes) {
  return ofActionOperator(allowedTypes, [ActionStatus.Successful]);
}
__name(ofActionSuccessful, "ofActionSuccessful");
function ofActionCanceled(...allowedTypes) {
  return ofActionOperator(allowedTypes, [ActionStatus.Canceled]);
}
__name(ofActionCanceled, "ofActionCanceled");
function ofActionCompleted(...allowedTypes) {
  const allowedStatuses = [ActionStatus.Successful, ActionStatus.Canceled, ActionStatus.Errored];
  return ofActionOperator(allowedTypes, allowedStatuses, mapActionResult);
}
__name(ofActionCompleted, "ofActionCompleted");
function ofActionErrored(...allowedTypes) {
  return ofActionOperator(allowedTypes, [ActionStatus.Errored], mapActionResult);
}
__name(ofActionErrored, "ofActionErrored");
function ofActionOperator(allowedTypes, statuses, mapOperator = mapAction) {
  const allowedMap = createAllowedActionTypesMap(allowedTypes);
  const allowedStatusMap = statuses && createAllowedStatusesMap(statuses);
  return function(o) {
    return o.pipe(filterStatus(allowedMap, allowedStatusMap), mapOperator());
  };
}
__name(ofActionOperator, "ofActionOperator");
function filterStatus(allowedTypes, allowedStatuses) {
  return filter((ctx) => {
    const actionType = getActionTypeFromInstance(ctx.action);
    const typeMatch = allowedTypes[actionType];
    const statusMatch = allowedStatuses ? allowedStatuses[ctx.status] : true;
    return typeMatch && statusMatch;
  });
}
__name(filterStatus, "filterStatus");
function mapActionResult() {
  return map(({
    action,
    status,
    error
  }) => {
    return {
      action,
      result: {
        successful: ActionStatus.Successful === status,
        canceled: ActionStatus.Canceled === status,
        error
      }
    };
  });
}
__name(mapActionResult, "mapActionResult");
function mapAction() {
  return map((ctx) => ctx.action);
}
__name(mapAction, "mapAction");
function createAllowedActionTypesMap(types) {
  return types.reduce((filterMap, klass) => {
    filterMap[getActionTypeFromInstance(klass)] = true;
    return filterMap;
  }, {});
}
__name(createAllowedActionTypesMap, "createAllowedActionTypesMap");
function createAllowedStatusesMap(statuses) {
  return statuses.reduce((filterMap, status) => {
    filterMap[status] = true;
    return filterMap;
  }, {});
}
__name(createAllowedStatusesMap, "createAllowedStatusesMap");
function simplePatch(value) {
  return (existingState) => {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      if (Array.isArray(value)) {
        throwPatchingArrayError();
      } else if (typeof value !== "object") {
        throwPatchingPrimitiveError();
      }
    }
    const newState = __spreadValues({}, existingState);
    for (const key in value) {
      newState[key] = value[key];
    }
    return newState;
  };
}
__name(simplePatch, "simplePatch");
var _StateContextFactory = class _StateContextFactory {
  _internalStateOperations = inject(InternalStateOperations);
  /**
   * Create the state context
   */
  createStateContext(path) {
    const root = this._internalStateOperations.getRootStateOperations();
    return {
      getState() {
        const currentAppState = root.getState();
        return getState(currentAppState, path);
      },
      patchState(val) {
        const currentAppState = root.getState();
        const patchOperator = simplePatch(val);
        setStateFromOperator(root, currentAppState, patchOperator, path);
      },
      setState(val) {
        const currentAppState = root.getState();
        if (isStateOperator(val)) {
          setStateFromOperator(root, currentAppState, val, path);
        } else {
          setStateValue(root, currentAppState, val, path);
        }
      },
      dispatch(actions) {
        return root.dispatch(actions);
      }
    };
  }
};
__name(_StateContextFactory, "StateContextFactory");
/** @nocollapse */
__publicField(_StateContextFactory, "ɵfac", /* @__PURE__ */ __name(function StateContextFactory_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StateContextFactory)();
}, "StateContextFactory_Factory"));
/** @nocollapse */
__publicField(_StateContextFactory, "ɵprov", ɵɵdefineInjectable({
  token: _StateContextFactory,
  factory: _StateContextFactory.ɵfac,
  providedIn: "root"
}));
var StateContextFactory = _StateContextFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateContextFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function setStateValue(root, currentAppState, newValue, path) {
  const newAppState = setValue(currentAppState, path, newValue);
  root.setState(newAppState);
  return newAppState;
}
__name(setStateValue, "setStateValue");
function setStateFromOperator(root, currentAppState, stateOperator, path) {
  const local = getState(currentAppState, path);
  const newValue = stateOperator(local);
  return setStateValue(root, currentAppState, newValue, path);
}
__name(setStateFromOperator, "setStateFromOperator");
function getState(currentAppState, path) {
  return getValue(currentAppState, path);
}
__name(getState, "getState");
var _InternalActionHandlerFactory = class _InternalActionHandlerFactory {
  _actions = inject(InternalActions);
  _stateContextFactory = inject(StateContextFactory);
  createActionHandler(path, handlerFn, options) {
    const {
      dispatched$
    } = this._actions;
    return (action) => {
      const stateContext = this._stateContextFactory.createStateContext(path);
      let result = handlerFn(stateContext, action);
      if (isPromise(result)) {
        result = from(result);
      }
      if (isObservable(result)) {
        result = result.pipe(
          mergeMap((value) => isPromise(value) || isObservable(value) ? value : of(value)),
          // If this observable has completed without emitting any values,
          // we wouldn't want to complete the entire chain of actions.
          // If any observable completes, then the action will be canceled.
          // For instance, if any action handler had a statement like
          // `handler(ctx) { return EMPTY; }`, then the action would be canceled.
          // See https://github.com/ngxs/store/issues/1568
          // Note that we actually don't care about the return type; we only care
          // about emission, and thus `undefined` is applicable by the framework.
          defaultIfEmpty(void 0)
        );
        if (options.cancelUncompleted) {
          const canceled = dispatched$.pipe(ofActionDispatched(action));
          result = result.pipe(takeUntil(canceled));
        }
        result = result.pipe(
          // Note that we use the `finalize` operator only when the action handler
          // explicitly returns an observable (or a promise) to wait for. This means
          // the action handler is written in a "fire & wait" style. If the handler’s
          // result is unsubscribed (either because the observable has completed or
          // it was unsubscribed by `takeUntil` due to a new action being dispatched),
          // we prevent writing to the state context.
          finalize(() => {
            if (typeof ngDevMode !== "undefined" && ngDevMode) {
              let noopAndWarn = function() {
                console.warn(`"${action}" attempted to change the state, but the change was ignored because state updates are not allowed after the action handler has completed.`);
              };
              __name(noopAndWarn, "noopAndWarn");
              stateContext.setState = noopAndWarn;
              stateContext.patchState = noopAndWarn;
            } else {
              stateContext.setState = noop;
              stateContext.patchState = noop;
            }
          })
        );
      } else {
        result = of(void 0);
      }
      return result;
    };
  }
};
__name(_InternalActionHandlerFactory, "InternalActionHandlerFactory");
/** @nocollapse */
__publicField(_InternalActionHandlerFactory, "ɵfac", /* @__PURE__ */ __name(function InternalActionHandlerFactory_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _InternalActionHandlerFactory)();
}, "InternalActionHandlerFactory_Factory"));
/** @nocollapse */
__publicField(_InternalActionHandlerFactory, "ɵprov", ɵɵdefineInjectable({
  token: _InternalActionHandlerFactory,
  factory: _InternalActionHandlerFactory.ɵfac,
  providedIn: "root"
}));
var InternalActionHandlerFactory = _InternalActionHandlerFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InternalActionHandlerFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function noop() {
}
__name(noop, "noop");
function cloneDefaults(defaults) {
  let value = defaults === void 0 ? {} : defaults;
  if (defaults) {
    if (Array.isArray(defaults)) {
      value = defaults.slice();
    } else if (typeof defaults === "object") {
      value = __spreadValues({}, defaults);
    }
  }
  return value;
}
__name(cloneDefaults, "cloneDefaults");
var _StateFactory = class _StateFactory {
  _injector = inject(Injector);
  _config = inject(NgxsConfig);
  _actionHandlerFactory = inject(InternalActionHandlerFactory);
  _actions = inject(InternalActions);
  _actionResults = inject(InternalDispatchedActionResults);
  _initialState = inject(ɵINITIAL_STATE_TOKEN, {
    optional: true
  });
  _actionRegistry = inject(ɵNgxsActionRegistry);
  _propGetter = inject(ɵPROP_GETTER);
  _actionsSubscription = null;
  _ngxsUnhandledErrorHandler = null;
  _states = [];
  _statesByName = {};
  _statePaths = {};
  getRuntimeSelectorContext = ɵmemoize(() => {
    const stateFactory = this;
    const propGetter2 = stateFactory._propGetter;
    function resolveGetter(key) {
      const path = stateFactory._statePaths[key];
      return path ? propGetter2(path.split(".")) : null;
    }
    __name(resolveGetter, "resolveGetter");
    const context = {
      getStateGetter(key) {
        let getter = (
          /*@__INLINE__*/
          resolveGetter(key)
        );
        if (getter) {
          return getter;
        }
        return (...args) => {
          if (!getter) {
            getter = /*@__INLINE__*/
            resolveGetter(key);
          }
          return getter ? getter(...args) : void 0;
        };
      },
      getSelectorOptions(localOptions) {
        const globalSelectorOptions = stateFactory._config.selectorOptions;
        return __spreadValues(__spreadValues({}, globalSelectorOptions), localOptions || {});
      }
    };
    return context;
  });
  constructor() {
    inject(DestroyRef).onDestroy(() => this._actionsSubscription?.unsubscribe());
  }
  /**
   * Add a new state to the global defs.
   */
  add(stateClasses) {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      ensureStatesAreDecorated(stateClasses);
    }
    const {
      newStates
    } = this.addToStatesMap(stateClasses);
    if (!newStates.length) return [];
    const stateGraph = buildGraph(newStates);
    const sortedStates = topologicalSort(stateGraph);
    const paths = findFullParentPath(stateGraph);
    const nameGraph = nameToState(newStates);
    const bootstrappedStores = [];
    for (const name of sortedStates) {
      const stateClass = nameGraph[name];
      const path = paths[name];
      const meta = stateClass[ɵMETA_KEY];
      this.addRuntimeInfoToMeta(meta, path);
      if (typeof ngDevMode !== "undefined" && ngDevMode) {
        ensureStateClassIsInjectable(stateClass);
      }
      const stateMap = {
        name,
        path,
        isInitialised: false,
        actions: meta.actions,
        instance: inject(stateClass),
        defaults: cloneDefaults(meta.defaults)
      };
      if (!this.hasBeenMountedAndBootstrapped(name, path)) {
        bootstrappedStores.push(stateMap);
      }
      this._states.push(stateMap);
      this.hydrateActionMetasMap(stateMap);
    }
    return bootstrappedStores;
  }
  /**
   * Add a set of states to the store and return the defaults
   */
  addAndReturnDefaults(stateClasses) {
    const classes = stateClasses || [];
    const mappedStores = this.add(classes);
    const defaults = mappedStores.reduce((result, mappedStore) => setValue(result, mappedStore.path, mappedStore.defaults), {});
    return {
      defaults,
      states: mappedStores
    };
  }
  connectActionHandlers() {
    this._actionsSubscription = this._actions.pipe(filter((ctx) => ctx.status === ActionStatus.Dispatched), mergeMap((ctx) => {
      const action = ctx.action;
      return this.invokeActions(action).pipe(map(() => ({
        action,
        status: ActionStatus.Successful
      })), defaultIfEmpty({
        action,
        status: ActionStatus.Canceled
      }), catchError((error) => {
        const ngxsUnhandledErrorHandler = this._ngxsUnhandledErrorHandler ||= this._injector.get(NgxsUnhandledErrorHandler);
        const handleableError = assignUnhandledCallback(error, () => ngxsUnhandledErrorHandler.handleError(error, {
          action
        }));
        return of({
          action,
          status: ActionStatus.Errored,
          error: handleableError
        });
      }));
    })).subscribe((ctx) => this._actionResults.next(ctx));
  }
  /**
   * Invoke actions on the states.
   */
  invokeActions(action) {
    const type = getActionTypeFromInstance(action);
    const results = [];
    let actionHasBeenHandled = false;
    const actionHandlers = this._actionRegistry.get(type);
    if (actionHandlers) {
      for (const actionHandler of actionHandlers) {
        let result;
        try {
          result = actionHandler(action);
        } catch (e) {
          result = new Observable((subscriber) => subscriber.error(e));
        }
        results.push(result);
        actionHasBeenHandled = true;
      }
    }
    if (typeof ngDevMode !== "undefined" && ngDevMode && !actionHasBeenHandled) {
      const unhandledActionsLogger = this._injector.get(NgxsUnhandledActionsLogger, null);
      unhandledActionsLogger?.warn(action);
    }
    if (!results.length) {
      results.push(of(void 0));
    }
    return forkJoin(results);
  }
  addToStatesMap(stateClasses) {
    const newStates = [];
    const statesMap = this._statesByName;
    for (const stateClass of stateClasses) {
      const stateName = ɵgetStoreMetadata(stateClass).name;
      if (typeof ngDevMode !== "undefined" && ngDevMode) {
        ensureStateNameIsUnique(stateName, stateClass, statesMap);
      }
      const unmountedState = !statesMap[stateName];
      if (unmountedState) {
        newStates.push(stateClass);
        statesMap[stateName] = stateClass;
      }
    }
    return {
      newStates
    };
  }
  addRuntimeInfoToMeta(meta, path) {
    this._statePaths[meta.name] = path;
    meta.path = path;
  }
  hasBeenMountedAndBootstrapped(name, path) {
    const valueIsBootstrappedInInitialState = getValue(this._initialState, path) !== void 0;
    return this._statesByName[name] && valueIsBootstrappedInInitialState;
  }
  hydrateActionMetasMap({
    path,
    actions,
    instance
  }) {
    for (const actionType of Object.keys(actions)) {
      const actionHandlers = actions[actionType].map((actionMeta) => {
        const handlerFn = /* @__PURE__ */ __name((ctx, action) => instance[actionMeta.fn](ctx, action), "handlerFn");
        return this._actionHandlerFactory.createActionHandler(path, handlerFn, actionMeta.options);
      });
      for (const actionHandler of actionHandlers) {
        this._actionRegistry.register(actionType, actionHandler);
      }
    }
  }
};
__name(_StateFactory, "StateFactory");
/** @nocollapse */
__publicField(_StateFactory, "ɵfac", /* @__PURE__ */ __name(function StateFactory_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _StateFactory)();
}, "StateFactory_Factory"));
/** @nocollapse */
__publicField(_StateFactory, "ɵprov", ɵɵdefineInjectable({
  token: _StateFactory,
  factory: _StateFactory.ɵfac,
  providedIn: "root"
}));
var StateFactory = _StateFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var _Store = class _Store {
  _stateStream = inject(ɵStateStream);
  _internalStateOperations = inject(InternalStateOperations);
  _config = inject(NgxsConfig);
  _internalExecutionStrategy = inject(InternalNgxsExecutionStrategy);
  _stateFactory = inject(StateFactory);
  /**
   * This is a derived state stream that leaves NGXS execution strategy to emit state changes within the Angular zone,
   * because state is being changed actually within the `<root>` zone, see `InternalDispatcher#dispatchSingle`.
   * All selects would use this stream, and it would call leave only once for any state change across all active selectors.
   */
  _selectableStateStream = this._stateStream.pipe(leaveNgxs(this._internalExecutionStrategy), shareReplay({
    bufferSize: 1,
    refCount: true
  }));
  constructor() {
    this.initStateStream();
  }
  /**
   * Dispatches action(s).
   */
  dispatch(actionOrActions) {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      if (
        // If a single action is dispatched and it's nullable.
        actionOrActions == null || // If a list of actions is dispatched and any of the actions are nullable.
        Array.isArray(actionOrActions) && actionOrActions.some((action) => action == null)
      ) {
        const error = new Error("`dispatch()` was called without providing an action.");
        return new Observable((subscriber) => subscriber.error(error));
      }
    }
    return this._internalStateOperations.getRootStateOperations().dispatch(actionOrActions);
  }
  /**
   * Selects a slice of data from the store.
   */
  select(selector) {
    const selectorFn = this.getStoreBoundSelectorFn(selector);
    return this._selectableStateStream.pipe(map(selectorFn), catchError((error) => {
      if (this._config.selectorOptions.suppressErrors && error instanceof TypeError) {
        return of(void 0);
      }
      throw error;
    }), distinctUntilChanged(), leaveNgxs(this._internalExecutionStrategy));
  }
  /**
   * Select one slice of data from the store.
   */
  selectOnce(selector) {
    return this.select(selector).pipe(take(1));
  }
  /**
   * Select a snapshot from the state.
   */
  selectSnapshot(selector) {
    const selectorFn = this.getStoreBoundSelectorFn(selector);
    return selectorFn(this._stateStream.getValue());
  }
  /**
   * Select a signal from the state.
   */
  selectSignal(selector) {
    const selectorFn = this.getStoreBoundSelectorFn(selector);
    return computed(() => selectorFn(this._stateStream.state()));
  }
  /**
   * Allow the user to subscribe to the root of the state
   */
  subscribe(fn) {
    return this._selectableStateStream.pipe(leaveNgxs(this._internalExecutionStrategy)).subscribe(fn);
  }
  /**
   * Return the raw value of the state.
   */
  snapshot() {
    return this._internalStateOperations.getRootStateOperations().getState();
  }
  /**
   * Reset the state to a specific point in time. This method is useful
   * for plugin's who need to modify the state directly or unit testing.
   */
  reset(state) {
    this._internalStateOperations.getRootStateOperations().setState(state);
  }
  getStoreBoundSelectorFn(selector) {
    const makeSelectorFn = getRootSelectorFactory(selector);
    const runtimeContext = this._stateFactory.getRuntimeSelectorContext();
    return makeSelectorFn(runtimeContext);
  }
  initStateStream() {
    const initialStateValue = inject(ɵINITIAL_STATE_TOKEN);
    const value = this._stateStream.value;
    const storeIsEmpty = !value || Object.keys(value).length === 0;
    if (storeIsEmpty) {
      this._stateStream.next(initialStateValue);
    }
  }
};
__name(_Store, "Store");
/** @nocollapse */
__publicField(_Store, "ɵfac", /* @__PURE__ */ __name(function Store_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Store)();
}, "Store_Factory"));
/** @nocollapse */
__publicField(_Store, "ɵprov", ɵɵdefineInjectable({
  token: _Store,
  factory: _Store.ɵfac,
  providedIn: "root"
}));
var Store = _Store;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Store, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var NGXS_PREBOOT_FNS = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_PREBOOT_FNS" : "");
function withNgxsPreboot(prebootFn) {
  return makeEnvironmentProviders([{
    provide: NGXS_PREBOOT_FNS,
    multi: true,
    useValue: prebootFn
  }]);
}
__name(withNgxsPreboot, "withNgxsPreboot");
var ROOT_STORE_GUARD = new InjectionToken("ROOT_STORE_GUARD", {
  providedIn: "root",
  factory: /* @__PURE__ */ __name(() => ({
    initialized: false
  }), "factory")
});
function assertRootStoreNotInitialized() {
  const rootStoreGuard = inject(ROOT_STORE_GUARD);
  if (rootStoreGuard.initialized) {
    throw new Error("provideStore() should only be called once.");
  }
  rootStoreGuard.initialized = true;
}
__name(assertRootStoreNotInitialized, "assertRootStoreNotInitialized");
var _SelectFactory = class _SelectFactory {
  constructor(store, config2) {
    _SelectFactory.store = store;
    _SelectFactory.config = config2;
    inject(DestroyRef).onDestroy(() => {
      _SelectFactory.store = null;
      _SelectFactory.config = null;
    });
  }
};
__name(_SelectFactory, "SelectFactory");
__publicField(_SelectFactory, "store", null);
__publicField(_SelectFactory, "config", null);
/** @nocollapse */
__publicField(_SelectFactory, "ɵfac", /* @__PURE__ */ __name(function SelectFactory_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SelectFactory)(ɵɵinject(Store), ɵɵinject(NgxsConfig));
}, "SelectFactory_Factory"));
/** @nocollapse */
__publicField(_SelectFactory, "ɵprov", ɵɵdefineInjectable({
  token: _SelectFactory,
  factory: _SelectFactory.ɵfac,
  providedIn: "root"
}));
var SelectFactory = _SelectFactory;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectFactory, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Store
  }, {
    type: NgxsConfig
  }], null);
})();
var _LifecycleStateManager = class _LifecycleStateManager {
  _store = inject(Store);
  _internalStateOperations = inject(InternalStateOperations);
  _stateContextFactory = inject(StateContextFactory);
  _appBootstrappedState = inject(ɵNgxsAppBootstrappedState);
  _initStateHasBeenDispatched;
  ngxsBootstrap(action, results) {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      if (action instanceof InitState) {
        this._initStateHasBeenDispatched = true;
      } else if (
        // This is a dev mode-only check that ensures the correct order of
        // state initialization. The `NgxsModule.forRoot` or `provideStore` should
        // always come first, followed by `forFeature` and `provideStates`. If the
        // `UpdateState` is dispatched before the `InitState` is dispatched, it indicates
        // that modules or providers are in an invalid order.
        action instanceof UpdateState && !this._initStateHasBeenDispatched
      ) {
        console.error(getInvalidInitializationOrderMessage(action.addedStates));
      }
    }
    this._internalStateOperations.getRootStateOperations().dispatch(action).pipe(mergeMap(() => {
      if (!results) {
        return EMPTY;
      }
      this._invokeInitOnStates(results.states);
      return this._appBootstrappedState;
    })).subscribe((appBootstrapped) => {
      if (appBootstrapped) {
        this._invokeBootstrapOnStates(results.states);
      }
    });
  }
  _invokeInitOnStates(mappedStores) {
    for (const mappedStore of mappedStores) {
      const instance = mappedStore.instance;
      if (instance.ngxsOnChanges) {
        let previousValue;
        this._store.select((state) => getValue(state, mappedStore.path)).pipe(
          // Ensure initial state is captured
          startWith(void 0),
          // `skip` is using `filter` internally.
          skip(1)
        ).subscribe((currentValue) => {
          const change = new NgxsSimpleChange(previousValue, currentValue, !mappedStore.isInitialised);
          previousValue = currentValue;
          instance.ngxsOnChanges(change);
        });
      }
      if (instance.ngxsOnInit) {
        instance.ngxsOnInit(this._getStateContext(mappedStore));
      }
      mappedStore.isInitialised = true;
    }
  }
  _invokeBootstrapOnStates(mappedStores) {
    for (const mappedStore of mappedStores) {
      const instance = mappedStore.instance;
      if (instance.ngxsAfterBootstrap) {
        instance.ngxsAfterBootstrap(this._getStateContext(mappedStore));
      }
    }
  }
  _getStateContext(mappedStore) {
    return this._stateContextFactory.createStateContext(mappedStore.path);
  }
};
__name(_LifecycleStateManager, "LifecycleStateManager");
/** @nocollapse */
__publicField(_LifecycleStateManager, "ɵfac", /* @__PURE__ */ __name(function LifecycleStateManager_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LifecycleStateManager)();
}, "LifecycleStateManager_Factory"));
/** @nocollapse */
__publicField(_LifecycleStateManager, "ɵprov", ɵɵdefineInjectable({
  token: _LifecycleStateManager,
  factory: _LifecycleStateManager.ɵfac,
  providedIn: "root"
}));
var LifecycleStateManager = _LifecycleStateManager;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LifecycleStateManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function rootStoreInitializer() {
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    assertRootStoreNotInitialized();
  }
  installOnUnhandhedErrorHandler();
  const prebootFns = inject(NGXS_PREBOOT_FNS, {
    optional: true
  }) || [];
  prebootFns.forEach((prebootFn) => prebootFn());
  const factory = inject(StateFactory);
  const internalStateOperations = inject(InternalStateOperations);
  inject(Store);
  inject(SelectFactory);
  const states = inject(ROOT_STATE_TOKEN, {
    optional: true
  }) || [];
  const lifecycleStateManager = inject(LifecycleStateManager);
  const results = factory.addAndReturnDefaults(states);
  internalStateOperations.setStateToTheCurrentWithNew(results);
  factory.connectActionHandlers();
  lifecycleStateManager.ngxsBootstrap(new InitState(), results);
}
__name(rootStoreInitializer, "rootStoreInitializer");
function featureStatesInitializer() {
  inject(Store);
  const internalStateOperations = inject(InternalStateOperations);
  const factory = inject(StateFactory);
  const states = inject(FEATURE_STATE_TOKEN, {
    optional: true
  }) || [];
  const lifecycleStateManager = inject(LifecycleStateManager);
  const flattenedStates = states.reduce((total, values) => total.concat(values), []);
  const results = factory.addAndReturnDefaults(flattenedStates);
  if (results.states.length) {
    internalStateOperations.setStateToTheCurrentWithNew(results);
    lifecycleStateManager.ngxsBootstrap(new UpdateState(results.defaults), results);
  }
}
__name(featureStatesInitializer, "featureStatesInitializer");
var NGXS_ROOT_STORE_INITIALIZER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_ROOT_STORE_INITIALIZER" : "");
var NGXS_FEATURE_STORE_INITIALIZER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "NGXS_FEATURE_STORE_INITIALIZER" : "");
var NGXS_ROOT_ENVIRONMENT_INITIALIZER = [{
  provide: NGXS_ROOT_STORE_INITIALIZER,
  useFactory: rootStoreInitializer
}, provideEnvironmentInitializer(() => inject(NGXS_ROOT_STORE_INITIALIZER))];
var NGXS_FEATURE_ENVIRONMENT_INITIALIZER = [{
  provide: NGXS_FEATURE_STORE_INITIALIZER,
  useFactory: featureStatesInitializer
}, provideEnvironmentInitializer(() => inject(NGXS_FEATURE_STORE_INITIALIZER))];
var _NgxsRootModule = class _NgxsRootModule {
  constructor() {
    rootStoreInitializer();
  }
};
__name(_NgxsRootModule, "NgxsRootModule");
/** @nocollapse */
__publicField(_NgxsRootModule, "ɵfac", /* @__PURE__ */ __name(function NgxsRootModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsRootModule)();
}, "NgxsRootModule_Factory"));
/** @nocollapse */
__publicField(_NgxsRootModule, "ɵmod", ɵɵdefineNgModule({
  type: _NgxsRootModule
}));
/** @nocollapse */
__publicField(_NgxsRootModule, "ɵinj", ɵɵdefineInjector({}));
var NgxsRootModule = _NgxsRootModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsRootModule, [{
    type: NgModule
  }], () => [], null);
})();
var _NgxsFeatureModule = class _NgxsFeatureModule {
  constructor() {
    featureStatesInitializer();
  }
};
__name(_NgxsFeatureModule, "NgxsFeatureModule");
/** @nocollapse */
__publicField(_NgxsFeatureModule, "ɵfac", /* @__PURE__ */ __name(function NgxsFeatureModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsFeatureModule)();
}, "NgxsFeatureModule_Factory"));
/** @nocollapse */
__publicField(_NgxsFeatureModule, "ɵmod", ɵɵdefineNgModule({
  type: _NgxsFeatureModule
}));
/** @nocollapse */
__publicField(_NgxsFeatureModule, "ɵinj", ɵɵdefineInjector({}));
var NgxsFeatureModule = _NgxsFeatureModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsFeatureModule, [{
    type: NgModule
  }], () => [], null);
})();
function getRootProviders(states, options) {
  return [...states, {
    provide: ROOT_STATE_TOKEN,
    useValue: states
  }, {
    provide: APP_BOOTSTRAP_LISTENER,
    useFactory: /* @__PURE__ */ __name(() => {
      const appBootstrappedState = inject(ɵNgxsAppBootstrappedState);
      return () => appBootstrappedState.bootstrap();
    }, "useFactory"),
    multi: true
  }, {
    provide: NGXS_OPTIONS,
    useValue: options
  }];
}
__name(getRootProviders, "getRootProviders");
function getFeatureProviders(states) {
  return [PluginManager, ...states, {
    provide: FEATURE_STATE_TOKEN,
    multi: true,
    useValue: states
  }];
}
__name(getFeatureProviders, "getFeatureProviders");
var _NgxsModule = class _NgxsModule {
  static forRoot(states = [], options = {}) {
    return {
      ngModule: NgxsRootModule,
      providers: getRootProviders(states, options)
    };
  }
  static forFeature(states = []) {
    return {
      ngModule: NgxsFeatureModule,
      providers: getFeatureProviders(states)
    };
  }
};
__name(_NgxsModule, "NgxsModule");
/** @nocollapse */
__publicField(_NgxsModule, "ɵfac", /* @__PURE__ */ __name(function NgxsModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsModule)();
}, "NgxsModule_Factory"));
/** @nocollapse */
__publicField(_NgxsModule, "ɵmod", ɵɵdefineNgModule({
  type: _NgxsModule
}));
/** @nocollapse */
__publicField(_NgxsModule, "ɵinj", ɵɵdefineInjector({}));
var NgxsModule = _NgxsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsModule, [{
    type: NgModule
  }], null, null);
})();
function Action(actions, options) {
  return (target, name, _descriptor) => {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      const isStaticMethod = ɵhasOwnProperty(target, "prototype");
      if (isStaticMethod) {
        throwActionDecoratorError();
      }
    }
    const meta = ɵensureStoreMetadata(target.constructor);
    const actionArray = Array.isArray(actions) ? actions : [actions];
    for (const action of actionArray) {
      const type = action.type;
      if (!meta.actions[type]) {
        meta.actions[type] = [];
      }
      meta.actions[type].push({
        fn: name,
        options: options || {},
        type
      });
    }
  };
}
__name(Action, "Action");
function State(options) {
  return (target) => {
    const stateClass = target;
    const inherited = Object.getPrototypeOf(stateClass);
    const meta = ɵensureStoreMetadata(stateClass);
    const mergedOptions = __spreadValues(__spreadValues({}, inherited[ɵMETA_OPTIONS_KEY] || {}), options);
    mutateMetaData(meta, inherited, mergedOptions);
    stateClass[ɵMETA_OPTIONS_KEY] = mergedOptions;
  };
}
__name(State, "State");
function mutateMetaData(meta, inherited, options) {
  const {
    name,
    defaults,
    children
  } = options;
  const stateName = typeof name === "string" ? name : name?.getName?.() || null;
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    ensureStateNameIsValid(stateName);
  }
  if (ɵhasOwnProperty(inherited, ɵMETA_KEY)) {
    const inheritedMeta = inherited[ɵMETA_KEY] || {};
    meta.actions = __spreadValues(__spreadValues({}, meta.actions), inheritedMeta.actions);
  }
  meta.name = stateName;
  meta.defaults = defaults;
  meta.children = children;
}
__name(mutateMetaData, "mutateMetaData");
function propGetter(paths, config2) {
  if (config2?.compatibility?.strictContentSecurityPolicy) {
    return compliantPropGetter(paths);
  } else {
    return fastPropGetter(paths);
  }
}
__name(propGetter, "propGetter");
function throwSelectFactoryNotConnectedError() {
  throw new Error("You have forgotten to import the NGXS module!");
}
__name(throwSelectFactoryNotConnectedError, "throwSelectFactoryNotConnectedError");
var DOLLAR_CHAR_CODE = 36;
function createSelectObservable(selector) {
  if (!SelectFactory.store) {
    throwSelectFactoryNotConnectedError();
  }
  return SelectFactory.store.select(selector);
}
__name(createSelectObservable, "createSelectObservable");
function createSelectorFn(name, rawSelector, paths = []) {
  rawSelector = !rawSelector ? removeDollarAtTheEnd(name) : rawSelector;
  if (typeof rawSelector === "string") {
    const propsArray = paths.length ? [rawSelector, ...paths] : rawSelector.split(".");
    return propGetter(propsArray, SelectFactory.config);
  }
  return rawSelector;
}
__name(createSelectorFn, "createSelectorFn");
function removeDollarAtTheEnd(name) {
  const lastCharIndex = name.length - 1;
  const dollarAtTheEnd = name.charCodeAt(lastCharIndex) === DOLLAR_CHAR_CODE;
  return dollarAtTheEnd ? name.slice(0, lastCharIndex) : name;
}
__name(removeDollarAtTheEnd, "removeDollarAtTheEnd");
function Select(rawSelector, ...paths) {
  return function(target, key) {
    const name = key.toString();
    const selectorId = `__${name}__selector`;
    const selector = createSelectorFn(name, rawSelector, paths);
    Object.defineProperties(target, {
      [selectorId]: {
        writable: true,
        enumerable: false,
        configurable: true
      },
      [name]: {
        enumerable: true,
        configurable: true,
        get() {
          return this[selectorId] || (this[selectorId] = createSelectObservable(selector));
        }
      }
    });
  };
}
__name(Select, "Select");
var SELECTOR_OPTIONS_META_KEY = "NGXS_SELECTOR_OPTIONS_META";
var selectorOptionsMetaAccessor = {
  getOptions: /* @__PURE__ */ __name((target) => {
    return target?.[SELECTOR_OPTIONS_META_KEY] || {};
  }, "getOptions"),
  defineOptions: /* @__PURE__ */ __name((target, options) => {
    if (!target) return;
    target[SELECTOR_OPTIONS_META_KEY] = options;
  }, "defineOptions")
};
function setupSelectorMetadata(originalFn, creationMetadata) {
  const selectorMetaData = ɵensureSelectorMetadata(originalFn);
  selectorMetaData.originalFn = originalFn;
  let getExplicitSelectorOptions = /* @__PURE__ */ __name(() => ({}), "getExplicitSelectorOptions");
  if (creationMetadata) {
    selectorMetaData.containerClass = creationMetadata.containerClass;
    selectorMetaData.selectorName = creationMetadata.selectorName || null;
    getExplicitSelectorOptions = creationMetadata.getSelectorOptions || getExplicitSelectorOptions;
  }
  const selectorMetaDataClone = __spreadValues({}, selectorMetaData);
  selectorMetaData.getSelectorOptions = () => getLocalSelectorOptions(selectorMetaDataClone, getExplicitSelectorOptions());
  return selectorMetaData;
}
__name(setupSelectorMetadata, "setupSelectorMetadata");
function getLocalSelectorOptions(selectorMetaData, explicitOptions) {
  return __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, selectorOptionsMetaAccessor.getOptions(selectorMetaData.containerClass) || {}), selectorOptionsMetaAccessor.getOptions(selectorMetaData.originalFn) || {}), selectorMetaData.getSelectorOptions() || {}), explicitOptions);
}
__name(getLocalSelectorOptions, "getLocalSelectorOptions");
function SelectorOptions(options) {
  return /* @__PURE__ */ __name(function decorate(target, methodName, descriptor) {
    if (methodName) {
      descriptor ||= Object.getOwnPropertyDescriptor(target, methodName);
      const originalFn = descriptor.value || descriptor.originalFn;
      if (originalFn) {
        selectorOptionsMetaAccessor.defineOptions(originalFn, options);
      }
    } else {
      selectorOptionsMetaAccessor.defineOptions(target, options);
    }
  }, "decorate");
}
__name(SelectorOptions, "SelectorOptions");
function createSelector(selectors, projector, creationMetadata) {
  const memoizedFn = createMemoizedSelectorFn(projector, creationMetadata);
  const selectorMetaData = setupSelectorMetadata(projector, creationMetadata);
  selectorMetaData.makeRootSelector = createRootSelectorFactory(selectorMetaData, selectors, memoizedFn);
  return memoizedFn;
}
__name(createSelector, "createSelector");
function Selector(selectors) {
  return (target, key, descriptor) => {
    descriptor ||= Object.getOwnPropertyDescriptor(target, key);
    const originalFn = descriptor?.value;
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      if (typeof originalFn !== "function") {
        throwSelectorDecoratorError();
      }
    }
    const memoizedFn = createSelector(selectors, originalFn, {
      containerClass: target,
      selectorName: key.toString(),
      getSelectorOptions() {
        return {};
      }
    });
    const newDescriptor = {
      configurable: true,
      get() {
        return memoizedFn;
      },
      originalFn
    };
    return newDescriptor;
  };
}
__name(Selector, "Selector");
var _ActionDirector = class _ActionDirector {
  _registry = inject(ɵNgxsActionRegistry);
  _actionHandlerFactory = inject(InternalActionHandlerFactory);
  attachAction(stateToken, Action2, handlerFn, options = {}) {
    const actionHandler = this._actionHandlerFactory.createActionHandler(stateToken.getName(), handlerFn, options);
    const detach = this._registry.register(Action2.type, actionHandler);
    return {
      detach
    };
  }
};
__name(_ActionDirector, "ActionDirector");
/** @nocollapse */
__publicField(_ActionDirector, "ɵfac", /* @__PURE__ */ __name(function ActionDirector_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ActionDirector)();
}, "ActionDirector_Factory"));
/** @nocollapse */
__publicField(_ActionDirector, "ɵprov", ɵɵdefineInjectable({
  token: _ActionDirector,
  factory: _ActionDirector.ɵfac,
  providedIn: "root"
}));
var ActionDirector = _ActionDirector;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActionDirector, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _NgxsDevelopmentModule = class _NgxsDevelopmentModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsDevelopmentModule,
      providers: [NgxsUnhandledActionsLogger, {
        provide: NGXS_DEVELOPMENT_OPTIONS,
        useValue: options
      }]
    };
  }
};
__name(_NgxsDevelopmentModule, "NgxsDevelopmentModule");
/** @nocollapse */
__publicField(_NgxsDevelopmentModule, "ɵfac", /* @__PURE__ */ __name(function NgxsDevelopmentModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsDevelopmentModule)();
}, "NgxsDevelopmentModule_Factory"));
/** @nocollapse */
__publicField(_NgxsDevelopmentModule, "ɵmod", ɵɵdefineNgModule({
  type: _NgxsDevelopmentModule
}));
/** @nocollapse */
__publicField(_NgxsDevelopmentModule, "ɵinj", ɵɵdefineInjector({}));
var NgxsDevelopmentModule = _NgxsDevelopmentModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsDevelopmentModule, [{
    type: NgModule
  }], null, null);
})();
function withNgxsDevelopmentOptions(options) {
  return makeEnvironmentProviders([NgxsUnhandledActionsLogger, {
    provide: NGXS_DEVELOPMENT_OPTIONS,
    useValue: options
  }]);
}
__name(withNgxsDevelopmentOptions, "withNgxsDevelopmentOptions");
var _NoopNgxsExecutionStrategy = class _NoopNgxsExecutionStrategy {
  enter(func) {
    return func();
  }
  leave(func) {
    return func();
  }
};
__name(_NoopNgxsExecutionStrategy, "NoopNgxsExecutionStrategy");
/** @nocollapse */
__publicField(_NoopNgxsExecutionStrategy, "ɵfac", /* @__PURE__ */ __name(function NoopNgxsExecutionStrategy_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NoopNgxsExecutionStrategy)();
}, "NoopNgxsExecutionStrategy_Factory"));
/** @nocollapse */
__publicField(_NoopNgxsExecutionStrategy, "ɵprov", ɵɵdefineInjectable({
  token: _NoopNgxsExecutionStrategy,
  factory: _NoopNgxsExecutionStrategy.ɵfac,
  providedIn: "root"
}));
var NoopNgxsExecutionStrategy = _NoopNgxsExecutionStrategy;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopNgxsExecutionStrategy, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function withNgxsNoopExecutionStrategy() {
  return makeEnvironmentProviders([{
    provide: InternalNgxsExecutionStrategy,
    useExisting: NoopNgxsExecutionStrategy
  }]);
}
__name(withNgxsNoopExecutionStrategy, "withNgxsNoopExecutionStrategy");
function getMissingMetaDataError(selector, context = {}) {
  const metadata = ɵgetSelectorMetadata(selector) || ɵgetStoreMetadata(selector);
  if (!metadata) {
    return new Error(`${context.prefix}The value provided as the ${context.noun} is not a valid selector.`);
  }
  return null;
}
__name(getMissingMetaDataError, "getMissingMetaDataError");
function ensureValidSelector(selector, context = {}) {
  const noun = context.noun || "selector";
  const prefix = context.prefix ? context.prefix + ": " : "";
  ensureValueProvided(selector, {
    noun,
    prefix: context.prefix
  });
  const error = getMissingMetaDataError(selector, {
    noun,
    prefix
  });
  if (error) {
    if (!NgZone.isInAngularZone()) {
      Promise.resolve().then(() => {
        const errorAgain = getMissingMetaDataError(selector, {
          noun,
          prefix
        });
        if (errorAgain) {
          console.error(error);
        }
      });
    } else {
      throw error;
    }
  }
}
__name(ensureValidSelector, "ensureValidSelector");
function ensureValueProvided(value, context = {}) {
  const noun = context.noun || "value";
  const prefix = context.prefix ? context.prefix + ": " : "";
  if (!value) {
    throw new Error(`${prefix}A ${noun} must be provided.`);
  }
}
__name(ensureValueProvided, "ensureValueProvided");
function createModelSelector(selectorMap) {
  const selectorKeys = Object.keys(selectorMap);
  const selectors = Object.values(selectorMap);
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    ensureValidSelectorMap({
      prefix: "[createModelSelector]",
      selectorMap,
      selectorKeys,
      selectors
    });
  }
  return createSelector(selectors, (...args) => {
    return selectorKeys.reduce((obj, key, index) => {
      obj[key] = args[index];
      return obj;
    }, {});
  });
}
__name(createModelSelector, "createModelSelector");
function ensureValidSelectorMap({
  prefix,
  selectorMap,
  selectorKeys,
  selectors
}) {
  ensureValueProvided(selectorMap, {
    prefix,
    noun: "selector map"
  });
  ensureValueProvided(typeof selectorMap === "object", {
    prefix,
    noun: "valid selector map"
  });
  ensureValueProvided(selectorKeys.length, {
    prefix,
    noun: "non-empty selector map"
  });
  selectors.forEach((selector, index) => ensureValidSelector(selector, {
    prefix,
    noun: `selector for the '${selectorKeys[index]}' property`
  }));
}
__name(ensureValidSelectorMap, "ensureValidSelectorMap");
function createPickSelector(selector, keys) {
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    ensureValidSelector(selector, {
      prefix: "[createPickSelector]"
    });
  }
  const validKeys = keys.filter(Boolean);
  const selectors = validKeys.map((key) => createSelector([selector], (s) => s[key]));
  return createSelector([...selectors], (...props) => {
    return validKeys.reduce((acc, key, index) => {
      acc[key] = props[index];
      return acc;
    }, {});
  });
}
__name(createPickSelector, "createPickSelector");
function createPropertySelectors(parentSelector) {
  if (typeof ngDevMode !== "undefined" && ngDevMode) {
    ensureValidSelector(parentSelector, {
      prefix: "[createPropertySelectors]",
      noun: "parent selector"
    });
  }
  const cache = {};
  return new Proxy({}, {
    get(_target, prop) {
      const selector = cache[prop] || createSelector([parentSelector], (s) => s?.[prop]);
      cache[prop] = selector;
      return selector;
    }
  });
}
__name(createPropertySelectors, "createPropertySelectors");
function withNgxsPendingTasks() {
  return withNgxsPreboot(() => {
    const actions$ = inject(Actions);
    const appRef = inject(ApplicationRef);
    const pendingTasks = inject(PendingTasks);
    let removeTask = null;
    const executedActions = /* @__PURE__ */ new Set();
    appRef.onDestroy(() => executedActions.clear());
    let isStable = false;
    appRef.whenStable().then(() => {
      isStable = true;
    });
    const subscription = actions$.pipe(
      filter((context) => {
        if (context.status === ActionStatus.Dispatched) {
          executedActions.add(context.action);
          removeTask ||= pendingTasks.add();
          return false;
        } else {
          return true;
        }
      }),
      // Every time an action is completed, we debounce the stream to ensure only one
      // task is removed, even if multiple synchronous actions are completed in a row.
      // We use `buffer` to collect action contexts because, if we only use
      // `debounceTime(0)`, we may lose action contexts that are never removed from the set.
      buffer(actions$.pipe(debounceTime(0)))
    ).subscribe((contexts) => {
      for (const context of contexts) {
        if (!executedActions.has(context.action)) {
          continue;
        }
        executedActions.delete(context.action);
        if (executedActions.size === 0) {
          removeTask?.();
          removeTask = null;
          if (isStable) {
            subscription.unsubscribe();
          }
        }
      }
    });
  });
}
__name(withNgxsPendingTasks, "withNgxsPendingTasks");
function provideStore(states = [], ...optionsAndFeatures) {
  const features = [];
  let options = {};
  if (optionsAndFeatures.length > 0) {
    if (isEnvironmentProvider(optionsAndFeatures[0])) {
      features.push(...optionsAndFeatures);
    } else {
      options = optionsAndFeatures[0];
      features.push(...optionsAndFeatures.slice(1));
    }
  }
  return makeEnvironmentProviders([...getRootProviders(states, options), NGXS_ROOT_ENVIRONMENT_INITIALIZER, features]);
}
__name(provideStore, "provideStore");
function isEnvironmentProvider(target) {
  return !!target.ɵproviders;
}
__name(isEnvironmentProvider, "isEnvironmentProvider");
function provideStates(states, ...features) {
  return makeEnvironmentProviders([...getFeatureProviders(states), features, NGXS_FEATURE_ENVIRONMENT_INITIALIZER]);
}
__name(provideStates, "provideStates");
function withNgxsPlugin(plugin) {
  return makeEnvironmentProviders([
    ɵisPluginClass(plugin) ? {
      provide: NGXS_PLUGINS,
      useClass: plugin,
      multi: true
    } : {
      provide: NGXS_PLUGINS,
      useValue: plugin,
      multi: true
    },
    // We should inject the `PluginManager` to retrieve `NGXS_PLUGINS` and
    // register those plugins. The plugin can be added from inside the child
    // route, so the plugin manager should be re-injected.
    provideEnvironmentInitializer(() => inject(PluginManager))
  ]);
}
__name(withNgxsPlugin, "withNgxsPlugin");
function select(selector) {
  return inject(Store).selectSignal(selector);
}
__name(select, "select");
function dispatch(ActionType) {
  const store = inject(Store);
  return (...args) => store.dispatch(new ActionType(...args));
}
__name(dispatch, "dispatch");
function createSelectMap(selectorMap) {
  const store = inject(Store);
  return Object.entries(selectorMap).reduce((accumulator, [key, selector]) => {
    accumulator[key] = store.selectSignal(selector);
    return accumulator;
  }, {});
}
__name(createSelectMap, "createSelectMap");
function createDispatchMap(actionMap) {
  return Object.entries(actionMap).reduce((accumulator, [key, ActionType]) => {
    accumulator[key] = dispatch(ActionType);
    return accumulator;
  }, {});
}
__name(createDispatchMap, "createDispatchMap");
function isWrappedDefaultExport(value) {
  return value && typeof value === "object" && "default" in value;
}
__name(isWrappedDefaultExport, "isWrappedDefaultExport");
function maybeUnwrapDefaultExport(input) {
  return isWrappedDefaultExport(input) ? input["default"] : input;
}
__name(maybeUnwrapDefaultExport, "maybeUnwrapDefaultExport");
var REGISTERED_PROVIDERS = new InjectionToken("", {
  providedIn: "root",
  factory: /* @__PURE__ */ __name(() => {
    const registeredProviders = /* @__PURE__ */ new Set();
    inject(ApplicationRef).onDestroy(() => registeredProviders.clear());
    return registeredProviders;
  }, "factory")
});
function lazyProvider(factory) {
  return async () => {
    if (typeof ngDevMode !== "undefined" && ngDevMode) {
      assertInInjectionContext(lazyProvider);
    }
    const appRef = inject(ApplicationRef);
    const parentInjector = inject(EnvironmentInjector);
    const registeredProviders = inject(REGISTERED_PROVIDERS);
    const provider = maybeUnwrapDefaultExport(await factory());
    if (registeredProviders.has(provider)) {
      return true;
    }
    registeredProviders.add(provider);
    const injector = createEnvironmentInjector([provider], parentInjector);
    appRef.onDestroy(() => injector.destroy());
    return true;
  };
}
__name(lazyProvider, "lazyProvider");
function ɵprovideNgxsInternalStateTokens() {
  return makeEnvironmentProviders([{
    provide: ɵNGXS_STATE_CONTEXT_FACTORY,
    useExisting: StateContextFactory
  }, {
    provide: ɵNGXS_STATE_FACTORY,
    useExisting: StateFactory
  }]);
}
__name(ɵprovideNgxsInternalStateTokens, "ɵprovideNgxsInternalStateTokens");

export {
  StateToken,
  InitState,
  UpdateState,
  NGXS_PLUGINS,
  getActionTypeFromInstance,
  actionMatcher,
  setValue,
  getValue,
  ActionStatus,
  Actions,
  NgxsConfig,
  NgxsSimpleChange,
  NgxsUnhandledActionsLogger,
  NgxsUnhandledErrorHandler,
  ofAction,
  ofActionDispatched,
  ofActionSuccessful,
  ofActionCanceled,
  ofActionCompleted,
  ofActionErrored,
  Store,
  withNgxsPreboot,
  NgxsRootModule,
  NgxsFeatureModule,
  NgxsModule,
  Action,
  State,
  Select,
  SelectorOptions,
  createSelector,
  Selector,
  ActionDirector,
  NgxsDevelopmentModule,
  withNgxsDevelopmentOptions,
  withNgxsNoopExecutionStrategy,
  createModelSelector,
  createPickSelector,
  createPropertySelectors,
  withNgxsPendingTasks,
  provideStore,
  provideStates,
  withNgxsPlugin,
  select,
  dispatch,
  createSelectMap,
  createDispatchMap,
  lazyProvider,
  ɵprovideNgxsInternalStateTokens
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v20.3.0
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-5CM2OCKZ.js.map
