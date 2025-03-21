"use strict";

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __makeTemplateObject = void 0 && (void 0).__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Playground = exports.GraphQLEditor = void 0;

var React = require("react");

var GraphQLEditor_1 = require("./Playground/GraphQLEditor");

exports.GraphQLEditor = GraphQLEditor_1["default"];

var TabBar_1 = require("./Playground/TabBar");

var HistoryPopup_1 = require("./HistoryPopup");

var styled_1 = require("../styled");

var Settings_1 = require("./Settings");

var SettingsEditor_1 = require("./SettingsEditor");

var FileEditor_1 = require("./FileEditor");

var app = require("../../package.json");

var react_redux_1 = require("react-redux");

var actions_1 = require("../state/sessions/actions");

var actions_2 = require("../state/general/actions");

var actions_3 = require("../state/workspace/actions");

var graphql_1 = require("graphql");

var reselect_1 = require("reselect");

var selectors_1 = require("../state/sessions/selectors");

var selectors_2 = require("../state/general/selectors");

var fetchingSagas_1 = require("../state/sessions/fetchingSagas");

var getWorkspaceId_1 = require("./Playground/util/getWorkspaceId");

var reducers_1 = require("../state/workspace/reducers");

var fibonacci_backoff_1 = require("./Playground/util/fibonacci-backoff");

var lodash_1 = require("lodash");

var util_1 = require("./util");

var InvalidSchemaError_1 = require("./Playground/util/InvalidSchemaError");

var Playground =
/** @class */
function (_super) {
  __extends(Playground, _super);

  function Playground(props) {
    var _this = _super.call(this, props) || this;

    _this.apolloLinks = {};
    _this.observers = {};
    _this.graphiqlComponents = []; // debounce as we call this on each http header or endpoint edit

    _this.getSchema = lodash_1.debounce(function (props) {
      if (props === void 0) {
        props = _this.props;
      }

      return __awaiter(_this, void 0, void 0, function () {
        var first;

        var _this = this;

        return __generator(this, function (_a) {
          if (props.schema) {
            return [2
            /*return*/
            ];
          }

          if (this.mounted && this.state.schema && !props.isPollingSchema) {
            this.setState({
              schema: undefined
            });
          }

          first = true;

          if (this.backoff) {
            this.backoff.stop();
          }

          this.backoff = new fibonacci_backoff_1.Backoff(function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    if (!first) return [3
                    /*break*/
                    , 2];
                    return [4
                    /*yield*/
                    , this.schemaGetter(props)];

                  case 1:
                    _a.sent();

                    first = false;
                    return [3
                    /*break*/
                    , 4];

                  case 2:
                    return [4
                    /*yield*/
                    , this.schemaGetter()];

                  case 3:
                    _a.sent();

                    _a.label = 4;

                  case 4:
                    return [2
                    /*return*/
                    ];
                }
              });
            });
          });
          this.backoff.start();
          return [2
          /*return*/
          ];
        });
      });
    }, 600, {
      trailing: true
    });
    _this.initialIndex = -1;
    _this.mounted = false;
    _this.initialSchemaFetch = true;

    _this.setRef = function (index, ref) {
      _this.graphiqlComponents[index] = ref ? ref.getWrappedInstance() : ref;
    };

    _this.closeTab = function () {
      _this.props.closeSelectedTab();
    };

    _this.nextTab = function () {
      _this.props.selectNextTab();
    };

    _this.prevTab = function () {
      _this.props.selectPrevTab();
    };

    _this.switchTab = function (index) {
      _this.props.selectTabIndex(index);
    };

    _this.handleSaveConfig = function () {
      _this.props.saveConfig();

      _this.props.onSaveConfig();
    };

    _this.handleSaveSettings = function () {
      _this.props.saveSettings();

      _this.props.onSaveSettings();
    };

    _this.createSession = function () {
      _this.props.newSession(_this.props.endpoint, _this.props.settings['editor.reuseHeaders']);
    };

    if (props.schema) {
      var validationErrors = graphql_1.validateSchema(props.schema);

      if (validationErrors && validationErrors.length > 0) {
        throw new InvalidSchemaError_1.InvalidSchemaError(validationErrors);
      }
    }

    _this.state = {
      schema: props.schema
    };
    global.p = _this;

    if (typeof _this.props.getRef === 'function') {
      _this.props.getRef(_this);
    }

    fetchingSagas_1.setLinkCreator(props.createApolloLink);

    _this.getSchema();

    fetchingSagas_1.setSubscriptionEndpoint(props.subscriptionEndpoint);
    return _this;
  }

  Playground.prototype.UNSAFE_componentWillMount = function () {
    // init redux
    this.props.initState(getWorkspaceId_1.getWorkspaceId(this.props), this.props.endpoint);
    this.props.setConfigString(this.props.configString);
    this.props.injectHeaders(this.props.headers, this.props.endpoint);
  };

  Playground.prototype.componentDidMount = function () {
    if (this.initialIndex > -1) {
      this.setState({
        selectedSessionIndex: this.initialIndex
      });
    }

    this.mounted = true;
  };

  Playground.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
    var _this = this;

    if (this.props.createApolloLink !== nextProps.createApolloLink) {
      fetchingSagas_1.setLinkCreator(nextProps.createApolloLink);
    }

    if (nextProps.headers !== this.props.headers || nextProps.endpoint !== this.props.endpoint || nextProps.workspaceName !== this.props.workspaceName || nextProps.sessionHeaders !== this.props.sessionHeaders || nextProps.sessionEndpoint !== this.props.sessionEndpoint) {
      this.getSchema(nextProps);
    }

    if (this.props.isReloadingSchema && !nextProps.isReloadingSchema) {
      setTimeout(function () {
        _this.getSchema(nextProps);
      });
    }

    if (this.props.endpoint !== nextProps.endpoint || this.props.configPath !== nextProps.configPath || nextProps.workspaceName !== this.props.workspaceName) {
      this.props.initState(getWorkspaceId_1.getWorkspaceId(nextProps), nextProps.endpoint);
    }

    if (this.props.subscriptionEndpoint !== nextProps.subscriptionEndpoint) {
      fetchingSagas_1.setSubscriptionEndpoint(nextProps.subscriptionEndpoint);
    }

    if (nextProps.headers !== this.props.headers) {
      this.props.injectHeaders(nextProps.headers, nextProps.endpoint);
    }

    if (nextProps.configString !== this.props.configString) {
      this.props.setConfigString(nextProps.configString);
    }

    if (nextProps.schema !== this.props.schema) {
      var validationErrors = graphql_1.validateSchema(nextProps.schema);

      if (validationErrors && validationErrors.length > 0) {
        throw new InvalidSchemaError_1.InvalidSchemaError(validationErrors);
      }

      this.setState({
        schema: nextProps.schema
      });
    }
  };

  Playground.prototype.schemaGetter = function (propsInput) {
    return __awaiter(this, void 0, void 0, function () {
      var props, endpoint, currentSchema, data_1, schema, e_1;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            props = this.props || propsInput;
            endpoint = props.sessionEndpoint || props.endpoint;
            currentSchema = this.state.schema;
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            data_1 = {
              endpoint: endpoint,
              headers: props.sessionHeaders && props.sessionHeaders.length > 0 ? props.sessionHeaders : props.headers && Object.keys(props.headers).length > 0 ? JSON.stringify(props.headers) : undefined,
              credentials: props.settings['request.credentials']
            };
            return [4
            /*yield*/
            , fetchingSagas_1.schemaFetcher.fetch(data_1)];

          case 2:
            schema = _a.sent();
            fetchingSagas_1.schemaFetcher.subscribe(data_1, function (newSchema) {
              if (data_1.endpoint === _this.props.endpoint || data_1.endpoint === _this.props.sessionEndpoint) {
                _this.updateSchema(currentSchema, newSchema, props);
              }
            });

            if (schema) {
              this.updateSchema(currentSchema, schema.schema, props);

              if (this.initialSchemaFetch) {
                this.props.schemaFetchingSuccess(data_1.endpoint, schema.tracingSupported, schema.isQueryPlanSupported, props.isPollingSchema);
                this.initialSchemaFetch = false;
              }

              this.backoff.stop();
            }

            return [3
            /*break*/
            , 4];

          case 3:
            e_1 = _a.sent(); // tslint:disable-next-line

            console.error(e_1);
            this.props.schemaFetchingError(endpoint, e_1.message);
            return [3
            /*break*/
            , 4];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Playground.prototype.render = function () {
    var version = app.version;
    window.version = version;
    return /*#__PURE__*/React.createElement(PlaygroundContainer, {
      className: "playground"
    }, /*#__PURE__*/React.createElement(TabBar_1["default"], {
      onNewSession: this.createSession,
      isApp: this.props.isApp
    }), /*#__PURE__*/React.createElement(GraphiqlsContainer, null, /*#__PURE__*/React.createElement(GraphiqlWrapper, {
      className: "graphiql-wrapper active"
    }, this.props.isConfigTab ? /*#__PURE__*/React.createElement(SettingsEditor_1.GraphQLConfigEditor, {
      onSave: this.handleSaveConfig,
      isYaml: this.props.configIsYaml,
      isConfig: true,
      readOnly: !this.props.canSaveConfig
    }) : this.props.isSettingsTab ? /*#__PURE__*/React.createElement(SettingsEditor_1.PlaygroundSettingsEditor, {
      onSave: this.handleSaveSettings
    }) : this.props.isFile && this.props.file ? /*#__PURE__*/React.createElement(FileEditor_1["default"], null) : /*#__PURE__*/React.createElement(GraphQLEditor_1["default"], {
      shareEnabled: this.props.shareEnabled,
      fixedEndpoint: this.props.fixedEndpoint,
      schema: this.state.schema
    }))), /*#__PURE__*/React.createElement(Settings_1["default"], null), this.props.historyOpen && this.renderHistoryPopup());
  };

  Playground.prototype.renderHistoryPopup = function () {
    return /*#__PURE__*/React.createElement(HistoryPopup_1["default"], null);
  };

  Playground.prototype.updateSchema = function (currentSchema, newSchema, props) {
    // first check for reference equality
    if (currentSchema !== newSchema) {
      // if references are not equal, do an equality check on the printed schema
      var currentSchemaStr = currentSchema ? util_1.cachedPrintSchema(currentSchema) : null;
      var newSchemaStr = util_1.cachedPrintSchema(newSchema);

      if (newSchemaStr !== currentSchemaStr || !props.isPollingSchema) {
        this.setState({
          schema: newSchema
        });
      }
    }
  };

  Object.defineProperty(Playground.prototype, "httpApiPrefix", {
    get: function get() {
      return this.props.endpoint.match(/(https?:\/\/.*?)\/?/)[1];
    },
    enumerable: false,
    configurable: true
  });
  Playground.defaultProps = {
    shareEnabled: false
  };
  return Playground;
}(React.PureComponent);

exports.Playground = Playground;
var mapStateToProps = reselect_1.createStructuredSelector({
  isConfigTab: selectors_1.getIsConfigTab,
  isSettingsTab: selectors_1.getIsSettingsTab,
  isFile: selectors_1.getIsFile,
  historyOpen: selectors_2.getHistoryOpen,
  file: selectors_1.getFile,
  sessionHeaders: selectors_1.getHeaders,
  settings: reducers_1.getSettings,
  settingsString: reducers_1.getSettingsString,
  isReloadingSchema: selectors_1.getIsReloadingSchema,
  isPollingSchema: selectors_1.getIsPollingSchema,
  sessionEndpoint: selectors_1.getEndpoint
});
exports["default"] = react_redux_1.connect(mapStateToProps, {
  selectTabIndex: actions_1.selectTabIndex,
  selectNextTab: actions_1.selectNextTab,
  selectPrevTab: actions_1.selectPrevTab,
  newSession: actions_1.newSession,
  closeSelectedTab: actions_1.closeSelectedTab,
  initState: actions_3.initState,
  saveSettings: actions_1.saveSettings,
  saveConfig: actions_1.saveConfig,
  setTracingSupported: actions_1.setTracingSupported,
  injectHeaders: actions_1.injectHeaders,
  setConfigString: actions_2.setConfigString,
  schemaFetchingError: actions_1.schemaFetchingError,
  schemaFetchingSuccess: actions_1.schemaFetchingSuccess
})(Playground);
var PlaygroundContainer = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  margin-right: -1px !important;\n\n  line-height: 1.5;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  letter-spacing: 0.53px;\n  color: rgba(0, 0, 0, 0.8);\n\n  a:active,\n  a:focus,\n  button:focus,\n  input:focus {\n    outline: none;\n  }\n"], ["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  margin-right: -1px !important;\n\n  line-height: 1.5;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  letter-spacing: 0.53px;\n  color: rgba(0, 0, 0, 0.8);\n\n  a:active,\n  a:focus,\n  button:focus,\n  input:focus {\n    outline: none;\n  }\n"])));
var GraphiqlsContainer = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  height: calc(100vh - 57px);\n  position: relative;\n  overflow: hidden;\n"], ["\n  height: calc(100vh - 57px);\n  position: relative;\n  overflow: hidden;\n"])));
var GraphiqlWrapper = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  visibility: hidden;\n  &.active {\n    visibility: visible;\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n  visibility: hidden;\n  &.active {\n    visibility: visible;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;