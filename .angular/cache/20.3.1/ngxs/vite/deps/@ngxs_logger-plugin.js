import {
  Store,
  getActionTypeFromInstance,
  withNgxsPlugin
} from "./chunk-5CM2OCKZ.js";
import {
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  inject,
  makeEnvironmentProviders,
  runInInjectionContext,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-YPOJXTPD.js";
import {
  catchError,
  tap
} from "./chunk-SCE2THVU.js";
import {
  __name,
  __publicField,
  __spreadValues
} from "./chunk-ICHT5QNQ.js";

// node_modules/@ngxs/logger-plugin/fesm2022/ngxs-logger-plugin.mjs
var _LogWriter = class _LogWriter {
  options;
  logger;
  constructor(options) {
    this.options = options;
    this.options = this.options || {};
    this.logger = options.logger || console;
  }
  startGroup(message) {
    const startGroupFn = this.options.collapsed ? this.logger.groupCollapsed : this.logger.group;
    try {
      startGroupFn.call(this.logger, message);
    } catch (e) {
      console.log(message);
    }
  }
  endGroup() {
    try {
      this.logger.groupEnd();
    } catch (e) {
      this.logger.log("—— log end ——");
    }
  }
  logGrey(title, payload) {
    const greyStyle = "color: #9E9E9E; font-weight: bold";
    this.log(title, greyStyle, payload);
  }
  logGreen(title, payload) {
    const greenStyle = "color: #4CAF50; font-weight: bold";
    this.log(title, greenStyle, payload);
  }
  logRedish(title, payload) {
    const redishStyle = "color: #FD8182; font-weight: bold";
    this.log(title, redishStyle, payload);
  }
  log(title, color, payload) {
    this.logger.log("%c " + title, color, payload);
  }
};
__name(_LogWriter, "LogWriter");
var LogWriter = _LogWriter;
var repeat = /* @__PURE__ */ __name((str, times) => new Array(times + 1).join(str), "repeat");
var pad = /* @__PURE__ */ __name((num, maxLength) => repeat("0", maxLength - num.toString().length) + num, "pad");
function formatTime(time) {
  return pad(time.getHours(), 2) + `:` + pad(time.getMinutes(), 2) + `:` + pad(time.getSeconds(), 2) + `.` + pad(time.getMilliseconds(), 3);
}
__name(formatTime, "formatTime");
var _ActionLogger = class _ActionLogger {
  action;
  store;
  logWriter;
  constructor(action, store, logWriter) {
    this.action = action;
    this.store = store;
    this.logWriter = logWriter;
  }
  dispatched(state) {
    const actionName = getActionTypeFromInstance(this.action);
    const formattedTime = formatTime(/* @__PURE__ */ new Date());
    const message = `action ${actionName} @ ${formattedTime}`;
    this.logWriter.startGroup(message);
    if (this._hasPayload(this.action)) {
      this.logWriter.logGrey("payload", __spreadValues({}, this.action));
    }
    this.logWriter.logGrey("prev state", state);
  }
  completed(nextState) {
    this.logWriter.logGreen("next state", nextState);
    this.logWriter.endGroup();
  }
  errored(error) {
    this.logWriter.logRedish("next state after error", this.store.snapshot());
    this.logWriter.logRedish("error", error);
    this.logWriter.endGroup();
  }
  _hasPayload(event) {
    const nonEmptyProperties = this._getNonEmptyProperties(event);
    return nonEmptyProperties.length > 0;
  }
  _getNonEmptyProperties(event) {
    const keys = Object.keys(event);
    const values = keys.map((key) => event[key]);
    return values.filter((value) => value !== void 0);
  }
};
__name(_ActionLogger, "ActionLogger");
var ActionLogger = _ActionLogger;
var NGXS_LOGGER_PLUGIN_OPTIONS = new InjectionToken("NGXS_LOGGER_PLUGIN_OPTIONS");
var _NgxsLoggerPlugin = class _NgxsLoggerPlugin {
  _store;
  _logWriter;
  _options = inject(NGXS_LOGGER_PLUGIN_OPTIONS);
  _injector = inject(Injector);
  handle(state, event, next) {
    if (this._options.disabled || this._skipLogging(state, event)) {
      return next(state, event);
    }
    this._logWriter ||= new LogWriter(this._options);
    this._store ||= this._injector.get(Store);
    const actionLogger = new ActionLogger(event, this._store, this._logWriter);
    actionLogger.dispatched(state);
    return next(state, event).pipe(tap((nextState) => {
      actionLogger.completed(nextState);
    }), catchError((error) => {
      actionLogger.errored(error);
      throw error;
    }));
  }
  _skipLogging(state, event) {
    const allowLogging = runInInjectionContext(this._injector, () => this._options.filter(event, state));
    return !allowLogging;
  }
};
__name(_NgxsLoggerPlugin, "NgxsLoggerPlugin");
/** @nocollapse */
__publicField(_NgxsLoggerPlugin, "ɵfac", /* @__PURE__ */ __name(function NgxsLoggerPlugin_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsLoggerPlugin)();
}, "NgxsLoggerPlugin_Factory"));
/** @nocollapse */
__publicField(_NgxsLoggerPlugin, "ɵprov", ɵɵdefineInjectable({
  token: _NgxsLoggerPlugin,
  factory: _NgxsLoggerPlugin.ɵfac
}));
var NgxsLoggerPlugin = _NgxsLoggerPlugin;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsLoggerPlugin, [{
    type: Injectable
  }], null, null);
})();
var USER_OPTIONS = new InjectionToken("LOGGER_USER_OPTIONS");
function loggerOptionsFactory(options) {
  const defaultLoggerOptions = {
    logger: console,
    collapsed: false,
    disabled: false,
    filter: /* @__PURE__ */ __name(() => true, "filter")
  };
  return __spreadValues(__spreadValues({}, defaultLoggerOptions), options);
}
__name(loggerOptionsFactory, "loggerOptionsFactory");
var _NgxsLoggerPluginModule = class _NgxsLoggerPluginModule {
  static forRoot(options) {
    return {
      ngModule: _NgxsLoggerPluginModule,
      providers: [withNgxsPlugin(NgxsLoggerPlugin), {
        provide: USER_OPTIONS,
        useValue: options
      }, {
        provide: NGXS_LOGGER_PLUGIN_OPTIONS,
        useFactory: loggerOptionsFactory,
        deps: [USER_OPTIONS]
      }]
    };
  }
};
__name(_NgxsLoggerPluginModule, "NgxsLoggerPluginModule");
/** @nocollapse */
__publicField(_NgxsLoggerPluginModule, "ɵfac", /* @__PURE__ */ __name(function NgxsLoggerPluginModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgxsLoggerPluginModule)();
}, "NgxsLoggerPluginModule_Factory"));
/** @nocollapse */
__publicField(_NgxsLoggerPluginModule, "ɵmod", ɵɵdefineNgModule({
  type: _NgxsLoggerPluginModule
}));
/** @nocollapse */
__publicField(_NgxsLoggerPluginModule, "ɵinj", ɵɵdefineInjector({}));
var NgxsLoggerPluginModule = _NgxsLoggerPluginModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxsLoggerPluginModule, [{
    type: NgModule
  }], null, null);
})();
function withNgxsLoggerPlugin(options) {
  return makeEnvironmentProviders([withNgxsPlugin(NgxsLoggerPlugin), {
    provide: USER_OPTIONS,
    useValue: options
  }, {
    provide: NGXS_LOGGER_PLUGIN_OPTIONS,
    useFactory: loggerOptionsFactory,
    deps: [USER_OPTIONS]
  }]);
}
__name(withNgxsLoggerPlugin, "withNgxsLoggerPlugin");
export {
  NGXS_LOGGER_PLUGIN_OPTIONS,
  NgxsLoggerPlugin,
  NgxsLoggerPluginModule,
  withNgxsLoggerPlugin
};
//# sourceMappingURL=@ngxs_logger-plugin.js.map
