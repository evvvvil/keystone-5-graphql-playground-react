"use strict";

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
exports.sessionsSagas = void 0;

var effects_1 = require("redux-saga/effects");

var redux_saga_1 = require("redux-saga");

var selectors_1 = require("./selectors");

var getSelectedOperationName_1 = require("../../components/Playground/util/getSelectedOperationName");

var getQueryFacts_1 = require("../../components/Playground/util/getQueryFacts");

var immutable_1 = require("immutable");

var actions_1 = require("./actions");

var stack_1 = require("../../components/Playground/util/stack");

var actions_2 = require("../docs/actions");

var actions_3 = require("../history/actions");

var fetchingSagas_1 = require("./fetchingSagas");

var reducers_1 = require("../workspace/reducers");

var selectors_2 = require("../docs/selectors");

var getQueryTypes_1 = require("../../components/Playground/util/getQueryTypes");

var graphql_1 = require("graphql");

var utils_1 = require("../../utils");

var queryString = require("query-string");

function setQueryFacts() {
  var session, schema, ast, queryFacts, immutableQueryFacts, operationName, queryTypes, e_1, queryTypes;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        // debounce by 100 ms
        return [4
        /*yield*/
        , effects_1.call(redux_saga_1.delay, 100)];

      case 1:
        // debounce by 100 ms
        _a.sent();

        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSelectedSession)];

      case 2:
        session = _a.sent();
        return [4
        /*yield*/
        , fetchingSagas_1.schemaFetcher.fetch(session)];

      case 3:
        schema = _a.sent().schema;
        _a.label = 4;

      case 4:
        _a.trys.push([4, 12,, 14]);

        ast = graphql_1.parse(session.query);
        queryFacts = getQueryFacts_1.getQueryFacts(schema, ast);
        if (!queryFacts) return [3
        /*break*/
        , 10];
        immutableQueryFacts = immutable_1.fromJS(queryFacts);
        operationName = getSelectedOperationName_1["default"](session.operations, session.operationName, immutableQueryFacts.operations);
        if (!!immutable_1.is(immutableQueryFacts.get('variableToType'), session.variableToType)) return [3
        /*break*/
        , 6]; // set variableToType

        return [4
        /*yield*/
        , effects_1.put(actions_1.setVariableToType(immutableQueryFacts.get('variableToType')))];

      case 5:
        // set variableToType
        _a.sent();

        _a.label = 6;

      case 6:
        if (!!immutable_1.is(immutableQueryFacts.get('operations'), session.operations)) return [3
        /*break*/
        , 8]; // set operations

        return [4
        /*yield*/
        , effects_1.put(actions_1.setOperations(immutableQueryFacts.get('operations')))];

      case 7:
        // set operations
        _a.sent();

        _a.label = 8;

      case 8:
        if (!(operationName !== session.operationName)) return [3
        /*break*/
        , 10];
        return [4
        /*yield*/
        , effects_1.put(actions_1.setOperationName(operationName))];

      case 9:
        _a.sent();

        _a.label = 10;

      case 10:
        queryTypes = getQueryTypes_1.getQueryTypes(ast);
        return [4
        /*yield*/
        , effects_1.put(actions_1.setQueryTypes(queryTypes))];

      case 11:
        _a.sent();

        return [3
        /*break*/
        , 14];

      case 12:
        e_1 = _a.sent();
        queryTypes = getQueryTypes_1.getQueryTypes(null);
        return [4
        /*yield*/
        , effects_1.put(actions_1.setQueryTypes(queryTypes))];

      case 13:
        _a.sent();

        return [3
        /*break*/
        , 14];

      case 14:
        return [2
        /*return*/
        ];
    }
  });
}

function reflectQueryToUrl(_a) {
  var params, newSearch, url;
  var payload = _a.payload;
  return __generator(this, function (_b) {
    switch (_b.label) {
      case 0:
        // debounce by 100 ms
        return [4
        /*yield*/
        , effects_1.call(redux_saga_1.delay, 100)];

      case 1:
        // debounce by 100 ms
        _b.sent();

        if (!location.search.includes('query')) {
          return [2
          /*return*/
          ];
        }

        params = queryString.parse(location.search);

        if (typeof params.query !== 'undefined') {
          newSearch = queryString.stringify(__assign(__assign({}, params), {
            query: payload.query
          }));
          url = "" + location.origin + location.pathname + "?" + newSearch;
          window.history.replaceState({}, document.getElementsByTagName('title')[0].innerHTML, url);
        }

        return [2
        /*return*/
        ];
    }
  });
}

function runQueryAtPosition(action) {
  var position, session, operationName_1, operations;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        position = action.payload.position;
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSelectedSession)];

      case 1:
        session = _a.sent();
        if (!session.operations) return [3
        /*break*/
        , 6];
        operations = session.operations.toJS();
        operations.forEach(function (operation) {
          if (operation.loc && operation.loc.start <= position && operation.loc.end >= position) {
            operationName_1 = operation.name && operation.name.value;
          }
        });
        if (!operationName_1) return [3
        /*break*/
        , 3];
        return [4
        /*yield*/
        , effects_1.put(actions_1.runQuery(operationName_1))];

      case 2:
        _a.sent();

        return [3
        /*break*/
        , 5];

      case 3:
        return [4
        /*yield*/
        , effects_1.put(actions_1.runQuery())];

      case 4:
        _a.sent();

        _a.label = 5;

      case 5:
        return [3
        /*break*/
        , 8];

      case 6:
        return [4
        /*yield*/
        , effects_1.put(actions_1.runQuery())];

      case 7:
        _a.sent();

        _a.label = 8;

      case 8:
        return [2
        /*return*/
        ];
    }
  });
}

function getSessionWithCredentials() {
  var session, settings;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSelectedSession)];

      case 1:
        session = _a.sent();
        return [4
        /*yield*/
        , effects_1.select(reducers_1.getSettings)];

      case 2:
        settings = _a.sent();
        return [2
        /*return*/
        , {
          endpoint: session.endpoint,
          headers: session.headers,
          credentials: settings['request.credentials']
        }];
    }
  });
}

function fetchSchemaSaga() {
  var session, _a, _b, _c, e_2;

  return __generator(this, function (_d) {
    switch (_d.label) {
      case 0:
        return [4
        /*yield*/
        , getSessionWithCredentials()];

      case 1:
        session = _d.sent();
        _d.label = 2;

      case 2:
        _d.trys.push([2, 6,, 10]);

        return [4
        /*yield*/
        , fetchingSagas_1.schemaFetcher.fetch(session)];

      case 3:
        _d.sent();

        _a = effects_1.put;
        _b = actions_1.schemaFetchingSuccess;
        _c = [session.endpoint, null, null];
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getIsPollingSchema)];

      case 4:
        return [4
        /*yield*/
        , _a.apply(void 0, [_b.apply(void 0, _c.concat([_d.sent()]))])];

      case 5:
        _d.sent();

        return [3
        /*break*/
        , 10];

      case 6:
        e_2 = _d.sent();
        return [4
        /*yield*/
        , effects_1.put(actions_1.schemaFetchingError(session.endpoint))];

      case 7:
        _d.sent();

        return [4
        /*yield*/
        , effects_1.call(redux_saga_1.delay, 5000)];

      case 8:
        _d.sent();

        return [4
        /*yield*/
        , effects_1.put(actions_1.fetchSchema())];

      case 9:
        _d.sent();

        return [3
        /*break*/
        , 10];

      case 10:
        return [2
        /*return*/
        ];
    }
  });
}

function refetchSchemaSaga() {
  var session, _a, _b, _c, e_3;

  return __generator(this, function (_d) {
    switch (_d.label) {
      case 0:
        return [4
        /*yield*/
        , getSessionWithCredentials()];

      case 1:
        session = _d.sent();
        _d.label = 2;

      case 2:
        _d.trys.push([2, 6,, 10]);

        return [4
        /*yield*/
        , fetchingSagas_1.schemaFetcher.refetch(session)];

      case 3:
        _d.sent();

        _a = effects_1.put;
        _b = actions_1.schemaFetchingSuccess;
        _c = [session.endpoint, null, null];
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getIsPollingSchema)];

      case 4:
        return [4
        /*yield*/
        , _a.apply(void 0, [_b.apply(void 0, _c.concat([_d.sent()]))])];

      case 5:
        _d.sent();

        return [3
        /*break*/
        , 10];

      case 6:
        e_3 = _d.sent();
        return [4
        /*yield*/
        , effects_1.put(actions_1.schemaFetchingError(session.endpoint))];

      case 7:
        _d.sent();

        return [4
        /*yield*/
        , effects_1.call(redux_saga_1.delay, 5000)];

      case 8:
        _d.sent();

        return [4
        /*yield*/
        , effects_1.put(actions_1.refetchSchema())];

      case 9:
        _d.sent();

        return [3
        /*break*/
        , 10];

      case 10:
        return [2
        /*return*/
        ];
    }
  });
}

var lastSchema;

function renewStacks() {
  var session, fetchSession, docs, result, schema, tracingSupported, isQueryPlanSupported, rootMap_1, stacks;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSelectedSession)];

      case 1:
        session = _a.sent();
        return [4
        /*yield*/
        , getSessionWithCredentials()];

      case 2:
        fetchSession = _a.sent();
        return [4
        /*yield*/
        , effects_1.select(selectors_2.getSessionDocsState)];

      case 3:
        docs = _a.sent();
        return [4
        /*yield*/
        , fetchingSagas_1.schemaFetcher.fetch(fetchSession)];

      case 4:
        result = _a.sent();
        schema = result.schema, tracingSupported = result.tracingSupported, isQueryPlanSupported = result.isQueryPlanSupported;
        if (!(schema && (!lastSchema || lastSchema !== schema))) return [3
        /*break*/
        , 8];
        rootMap_1 = stack_1.getRootMap(schema);
        stacks = docs.navStack.map(function (stack) {
          return stack_1.getNewStack(rootMap_1, schema, stack);
        }).filter(function (s) {
          return s;
        });
        return [4
        /*yield*/
        , effects_1.put(actions_2.setStacks(session.id, stacks))];

      case 5:
        _a.sent();

        return [4
        /*yield*/
        , effects_1.put(actions_1.setTracingSupported(tracingSupported))];

      case 6:
        _a.sent();

        return [4
        /*yield*/
        , effects_1.put(actions_1.setIsQueryPlanSupported(isQueryPlanSupported))];

      case 7:
        _a.sent();

        lastSchema = schema;
        _a.label = 8;

      case 8:
        return [2
        /*return*/
        ];
    }
  });
}

function addToHistory(_a) {
  var sessionId, workspace, session, history, exists;
  var payload = _a.payload;
  return __generator(this, function (_b) {
    switch (_b.label) {
      case 0:
        sessionId = payload.sessionId;
        return [4
        /*yield*/
        , effects_1.select(reducers_1.getSelectedWorkspace)];

      case 1:
        workspace = _b.sent();
        session = workspace.getIn(['sessions', sessionId]);
        history = workspace.get('history');
        exists = history.toKeyedSeq().find(function (item) {
          return immutable_1.is(item, session);
        });
        if (!!exists) return [3
        /*break*/
        , 3];
        return [4
        /*yield*/
        , effects_1.put(actions_3.addHistoryItem(session))];

      case 2:
        _b.sent();

        _b.label = 3;

      case 3:
        return [2
        /*return*/
        ];
    }
  });
}

function prettifyQuery() {
  var query, settings, prettyQuery, e_4;
  return __generator(this, function (_a) {
    switch (_a.label) {
      case 0:
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSelectedSession)];

      case 1:
        query = _a.sent().query;
        return [4
        /*yield*/
        , effects_1.select(reducers_1.getSettings)];

      case 2:
        settings = _a.sent();
        _a.label = 3;

      case 3:
        _a.trys.push([3, 5,, 6]);

        prettyQuery = utils_1.prettify(query, {
          printWidth: settings['prettier.printWidth'],
          tabWidth: settings['prettier.tabWidth'],
          useTabs: settings['prettier.useTabs']
        });
        return [4
        /*yield*/
        , effects_1.put(actions_1.editQuery(prettyQuery))];

      case 4:
        _a.sent();

        return [3
        /*break*/
        , 6];

      case 5:
        e_4 = _a.sent(); // TODO show errors somewhere
        // tslint:disable-next-line

        console.log(e_4);
        return [3
        /*break*/
        , 6];

      case 6:
        return [2
        /*return*/
        ];
    }
  });
}

exports.sessionsSagas = [effects_1.takeLatest('GET_QUERY_FACTS', utils_1.safely(setQueryFacts)), effects_1.takeLatest('SET_OPERATION_NAME', utils_1.safely(setQueryFacts)), effects_1.takeEvery('EDIT_QUERY', utils_1.safely(setQueryFacts)), effects_1.takeEvery('EDIT_QUERY', utils_1.safely(reflectQueryToUrl)), effects_1.takeEvery('RUN_QUERY_AT_POSITION', utils_1.safely(runQueryAtPosition)), effects_1.takeLatest('FETCH_SCHEMA', utils_1.safely(fetchSchemaSaga)), effects_1.takeLatest('REFETCH_SCHEMA', utils_1.safely(refetchSchemaSaga)), effects_1.takeLatest('SCHEMA_FETCHING_SUCCESS', utils_1.safely(renewStacks)), effects_1.takeEvery('QUERY_SUCCESS', utils_1.safely(addToHistory)), effects_1.takeLatest('PRETTIFY_QUERY', utils_1.safely(prettifyQuery))];