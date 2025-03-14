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

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = exports.normalizeSettingsString = exports.getSettings = exports.getSettingsString = exports.getSessionCounts = exports.makeWorkspace = exports.rootReducer = exports.RootState = exports.defaultSettings = exports.Workspace = exports.getSelectedWorkspace = exports.getSelectedWorkspaceId = void 0;

var redux_immutable_1 = require("redux-immutable");

var reducers_1 = require("../docs/reducers");

var reducers_2 = require("../sessions/reducers");

var reducers_3 = require("../sharing/reducers");

var reducers_4 = require("../history/reducers");

var immutable_1 = require("immutable");

var reducers_5 = require("../general/reducers");

var immutableMemoize_1 = require("../../components/Playground/util/immutableMemoize");

var reselect_1 = require("reselect");

var deserialize_1 = require("./deserialize");

var reducers_6 = require("../appHistory/reducers");

function getSelectedWorkspaceId(state) {
  return state.get('selectedWorkspace');
}

exports.getSelectedWorkspaceId = getSelectedWorkspaceId;

function getSelectedWorkspace(state) {
  return state.getIn(['workspaces', getSelectedWorkspaceId(state)]);
}

exports.getSelectedWorkspace = getSelectedWorkspace;

var Workspace =
/** @class */
function (_super) {
  __extends(Workspace, _super);

  function Workspace() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return Workspace;
}(immutable_1.Record({
  docs: immutable_1.Map({}),
  sessions: reducers_2.makeSessionState(''),
  sharing: new reducers_3.SharingState(),
  history: immutable_1.OrderedMap()
}));

exports.Workspace = Workspace;
exports.defaultSettings = {
  'editor.cursorShape': 'line',
  'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
  'editor.fontSize': 14,
  'editor.reuseHeaders': true,
  'editor.theme': 'dark',
  'general.betaUpdates': false,
  'prettier.printWidth': 80,
  'prettier.tabWidth': 2,
  'prettier.useTabs': false,
  'request.credentials': 'omit',
  'schema.disableComments': true,
  'schema.polling.enable': true,
  'schema.polling.endpointFilter': '*localhost*',
  'schema.polling.interval': 2000,
  'tracing.hideTracingResponse': true,
  'queryPlan.hideQueryPlanResponse': true
}; // tslint:disable-next-line:max-classes-per-file

var RootState =
/** @class */
function (_super) {
  __extends(RootState, _super);

  function RootState() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return RootState;
}(immutable_1.Record({
  workspaces: immutable_1.Map({
    '': makeWorkspace('')
  }),
  selectedWorkspace: '',
  settingsString: JSON.stringify(exports.defaultSettings, null, 2),
  stateInjected: false,
  appHistory: new reducers_6.AppHistory(),
  general: new reducers_5.GeneralState()
}));

exports.RootState = RootState;
var workspaceReducers = redux_immutable_1.combineReducers({
  docs: reducers_1["default"],
  sessions: reducers_2["default"],
  sharing: reducers_3["default"],
  history: reducers_4["default"],
  general: reducers_5["default"],
  appHistory: reducers_6["default"]
}); // todo: add lru-cache later when the localStorage is full

exports.rootReducer = function (state, action) {
  if (state === void 0) {
    state = new RootState();
  }

  if (action.type === 'SELECT_WORKSPACE') {
    return state.set('selectedWorkspace', action.payload.workspace);
  }

  if (action.type === 'SET_SETTINGS_STRING') {
    return state.set('settingsString', action.payload.settingsString);
  }

  if (action.type === 'INIT_STATE' && !state.stateInjected) {
    var _a = action.payload,
        workspaceId = _a.workspaceId,
        endpoint = _a.endpoint;

    if (!state.workspaces.get(workspaceId)) {
      var newState = state.setIn(['workspaces', workspaceId], makeWorkspace(endpoint));
      return newState.set('selectedWorkspace', workspaceId);
    }

    return state.set('selectedWorkspace', workspaceId);
  }

  if (action.type === 'INJECT_STATE') {
    return deserialize_1.deserializePersistedState(action.payload.state).set('stateInjected', true);
  }

  if (action.type === 'INJECT_TABS') {
    return makeStateFromTabs(action.payload.tabs);
  }

  if (action.type === 'SELECT_APP_HISTORY_ITEM') {
    return state.set('appHistory', reducers_6["default"](state.appHistory, action));
  }

  var generalActions = {
    OPEN_HISTORY: true,
    CLOSE_HISTORY: true,
    SET_ENDPOINT_DISABLED: true,
    SET_CONFIG_STRING: true
  };

  if (generalActions[action.type]) {
    return state.set('general', reducers_5["default"](state.general, action));
  }

  var selectedWorkspaceId = action.payload && action.payload.workspaceId ? action.payload.workspaceId : getSelectedWorkspaceId(state);
  var path = ['workspaces', selectedWorkspaceId];
  return state.setIn(path, workspaceReducers(state.getIn(path), action));
};

function makeStateFromTabs(tabs) {
  var endpoint = tabs[0].endpoint;
  var tabSessions = immutable_1.OrderedMap(tabs.map(reducers_2.sessionFromTab).reduce(function (acc, curr) {
    var _a;

    return __assign(__assign({}, acc), (_a = {}, _a[curr.id] = curr, _a));
  }, {})); // @ts-ignore

  var selectedSessionId = tabSessions.first().id;
  var workspace = makeWorkspace(endpoint).setIn(['sessions', 'sessions'], tabSessions).setIn(['sessions', 'selectedSessionId'], selectedSessionId);
  return new RootState().setIn(['workspaces', endpoint], workspace).set('selectedWorkspace', endpoint);
}

function makeWorkspace(endpoint) {
  var _a;

  var sessionState = reducers_2.makeSessionState(endpoint); // weird typescript error

  return new Workspace({
    docs: immutable_1.Map((_a = {}, _a[sessionState.selectedSessionId] = new reducers_1.DocsSession(), _a)),
    sessions: sessionState,
    sharing: new reducers_3.SharingState(),
    history: immutable_1.OrderedMap()
  });
}

exports.makeWorkspace = makeWorkspace;
exports["default"] = exports.rootReducer;
exports.getSessionCounts = immutableMemoize_1.immutableMemoize(function (state) {
  return state.workspaces.map(function (w) {
    return w.sessions.sessionCount;
  });
});

exports.getSettingsString = function (state) {
  return state.settingsString;
};

exports.getSettings = reselect_1.createSelector([exports.getSettingsString], parseSettingsString);

function normalizeSettings(settings) {
  var theme = settings['editor.theme'];

  if (theme !== 'dark' && theme !== 'light') {
    settings['editor.theme'] = 'dark';
  }

  return __assign(__assign({}, exports.defaultSettings), settings);
}

function parseSettingsString(settingsString) {
  try {
    return normalizeSettings(JSON.parse(settingsString));
  } catch (e) {
    return exports.defaultSettings;
  }
}

function normalizeSettingsString(settingsString) {
  return JSON.stringify(parseSettingsString(settingsString), null, 2);
}

exports.normalizeSettingsString = normalizeSettingsString;

exports.getTheme = function (state, customSettings) {
  var settings = customSettings || exports.getSettings(state);
  return settings['editor.theme'] || 'dark';
};