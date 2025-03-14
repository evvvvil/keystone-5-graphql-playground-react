"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.fecthingSagas = exports.formatError = exports.setLinkCreator = exports.schemaFetcher = exports.defaultLinkCreator = exports.setSubscriptionEndpoint = void 0;

var apollo_link_1 = require("apollo-link");

var parseHeaders_1 = require("../../components/Playground/util/parseHeaders");

var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");

var apollo_link_http_1 = require("apollo-link-http");

var apollo_link_ws_1 = require("apollo-link-ws");

var hasSubscription_1 = require("../../components/Playground/util/hasSubscription");

var effects_1 = require("redux-saga/effects");

var redux_saga_1 = require("redux-saga");

var makeOperation_1 = require("../../components/Playground/util/makeOperation");

var actions_1 = require("./actions");

var selectors_1 = require("./selectors");

var SchemaFetcher_1 = require("../../components/Playground/SchemaFetcher");

var reducers_1 = require("../workspace/reducers");

var cuid = require("cuid");

var reducers_2 = require("./reducers");

var actions_2 = require("../history/actions");

var utils_1 = require("../../utils");

var immutable_1 = require("immutable"); // tslint:disable


var subscriptionEndpoint;

function setSubscriptionEndpoint(endpoint) {
  subscriptionEndpoint = endpoint;
}

exports.setSubscriptionEndpoint = setSubscriptionEndpoint;

exports.defaultLinkCreator = function (session, subscriptionEndpoint) {
  var connectionParams = {};
  var headers = session.headers,
      credentials = session.credentials;

  if (headers) {
    connectionParams = __assign({}, headers);
  }

  var httpLink = new apollo_link_http_1.HttpLink({
    uri: session.endpoint,
    headers: headers,
    credentials: credentials
  });

  if (!subscriptionEndpoint) {
    return {
      link: httpLink
    };
  }

  var subscriptionClient = new subscriptions_transport_ws_1.SubscriptionClient(subscriptionEndpoint, {
    timeout: 20000,
    lazy: true,
    connectionParams: connectionParams
  });
  var webSocketLink = new apollo_link_ws_1.WebSocketLink(subscriptionClient);
  return {
    link: apollo_link_1.ApolloLink.split(function (operation) {
      return hasSubscription_1.isSubscription(operation);
    }, webSocketLink, httpLink),
    subscriptionClient: subscriptionClient
  };
};

var linkCreator = exports.defaultLinkCreator;
exports.schemaFetcher = new SchemaFetcher_1.SchemaFetcher(linkCreator);
window.schemaFetcher = exports.schemaFetcher;

function setLinkCreator(newLinkCreator) {
  if (newLinkCreator) {
    linkCreator = newLinkCreator;
    exports.schemaFetcher = new SchemaFetcher_1.SchemaFetcher(newLinkCreator);
  }
}

exports.setLinkCreator = setLinkCreator;
var subscriptions = {};

function runQuerySaga(action) {
  var operationName, selectedWorkspaceId, session, request, operation, operationIsSubscription, workspace, settings, headers, lol, _a, link, subscriptionClient, firstResponse, channel, _b, value, error, extensions, response, errorMessage;

  return __generator(this, function (_c) {
    switch (_c.label) {
      case 0:
        operationName = action.payload.operationName;
        return [4
        /*yield*/
        , effects_1.select(reducers_1.getSelectedWorkspaceId)];

      case 1:
        selectedWorkspaceId = _c.sent();
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSelectedSession)];

      case 2:
        session = _c.sent();
        request = {
          query: session.query,
          operationName: operationName,
          variables: selectors_1.getParsedVariablesFromSession(session)
        };
        operation = makeOperation_1.makeOperation(request);
        operationIsSubscription = hasSubscription_1.isSubscription(operation);
        return [4
        /*yield*/
        , effects_1.select(reducers_1.getSelectedWorkspaceId)];

      case 3:
        workspace = _c.sent();
        return [4
        /*yield*/
        , effects_1.select(reducers_1.getSettings)];

      case 4:
        settings = _c.sent();
        return [4
        /*yield*/
        , effects_1.put(actions_1.setSubscriptionActive(hasSubscription_1.isSubscription(operation)))];

      case 5:
        _c.sent();

        return [4
        /*yield*/
        , effects_1.put(actions_1.startQuery())];

      case 6:
        _c.sent();

        headers = parseHeaders_1.parseHeaders(session.headers);

        if (session.tracingSupported && session.isExtensionsDrawerOpen) {
          headers = immutable_1.set(headers, 'X-Apollo-Tracing', '1');
        }

        if (session.isQueryPlanSupported && session.isExtensionsDrawerOpen) {
          // Breaking the X- header pattern here since it's dated, and not
          // recommended: https://www.mnot.net/blog/2009/02/18/x-
          headers = immutable_1.set(headers, 'Apollo-Query-Plan-Experimental', '1');
        }

        lol = {
          endpoint: session.endpoint,
          headers: headers,
          credentials: settings['request.credentials']
        };
        _a = linkCreator(lol, subscriptionEndpoint), link = _a.link, subscriptionClient = _a.subscriptionClient;
        return [4
        /*yield*/
        , effects_1.put(actions_1.setCurrentQueryStartTime(new Date()))];

      case 7:
        _c.sent();

        firstResponse = false;
        channel = redux_saga_1.eventChannel(function (emitter) {
          var closed = false;

          if (subscriptionClient && operationIsSubscription) {
            subscriptionClient.onDisconnected(function () {
              closed = true;
              emitter({
                error: new Error("Could not connect to websocket endpoint " + subscriptionEndpoint + ". Please check if the endpoint url is correct.")
              });
              emitter(redux_saga_1.END);
            });
          }

          var subscription = apollo_link_1.execute(link, operation).subscribe({
            next: function next(value) {
              emitter({
                value: value
              });
            },
            error: function error(_error) {
              emitter({
                error: _error
              });
              emitter(redux_saga_1.END);
            },
            complete: function complete() {
              emitter(redux_saga_1.END);
            }
          });

          var unsubscribe = function unsubscribe() {
            if (!closed) {
              try {
                subscription.unsubscribe();
              } catch (e) {
                console.error(e);
              }
            }
          };

          var key = workspace + "~" + session.id;
          subscriptions[key] = {
            unsubscribe: unsubscribe
          };
          return unsubscribe;
        });
        _c.label = 8;

      case 8:
        _c.trys.push([8,, 23, 26]);

        _c.label = 9;

      case 9:
        if (!true) return [3
        /*break*/
        , 22];
        return [4
        /*yield*/
        , effects_1.take(channel)];

      case 10:
        _b = _c.sent(), value = _b.value, error = _b.error;
        if (!(value && value.extensions)) return [3
        /*break*/
        , 12];
        extensions = value.extensions;
        return [4
        /*yield*/
        , effects_1.put(actions_1.setResponseExtensions(extensions))];

      case 11:
        _c.sent();

        if (value.extensions.tracing && settings['tracing.hideTracingResponse']) {
          delete value.extensions.tracing;
        }

        if (value.extensions.__queryPlanExperimental && settings['queryPlan.hideQueryPlanResponse']) {
          delete value.extensions.__queryPlanExperimental;
        }

        if (value.extensions && Object.keys(value.extensions).length === 0) {
          delete value.extensions;
        }

        _c.label = 12;

      case 12:
        response = new reducers_2.ResponseRecord({
          date: JSON.stringify(value ? value : formatError(error), null, 2),
          time: new Date(),
          resultID: cuid()
        });
        errorMessage = extractMessage(error);
        if (!(errorMessage === 'Failed to fetch')) return [3
        /*break*/
        , 14];
        return [4
        /*yield*/
        , effects_1.put(actions_1.setEndpointUnreachable(session.endpoint))];

      case 13:
        _c.sent();

        _c.label = 14;

      case 14:
        if (!operationIsSubscription) return [3
        /*break*/
        , 18];
        if (!firstResponse) return [3
        /*break*/
        , 16];
        return [4
        /*yield*/
        , effects_1.put(actions_1.clearResponses())];

      case 15:
        _c.sent();

        firstResponse = false;
        _c.label = 16;

      case 16:
        return [4
        /*yield*/
        , effects_1.put(actions_1.addResponse(selectedWorkspaceId, session.id, response))];

      case 17:
        _c.sent();

        return [3
        /*break*/
        , 20];

      case 18:
        return [4
        /*yield*/
        , effects_1.put(actions_1.setResponse(selectedWorkspaceId, session.id, response))];

      case 19:
        _c.sent();

        _c.label = 20;

      case 20:
        return [4
        /*yield*/
        , effects_1.put(actions_2.addHistoryItem(session))];

      case 21:
        _c.sent();

        return [3
        /*break*/
        , 9];

      case 22:
        return [3
        /*break*/
        , 26];

      case 23:
        return [4
        /*yield*/
        , effects_1.put(actions_1.setCurrentQueryEndTime(new Date()))];

      case 24:
        _c.sent();

        return [4
        /*yield*/
        , effects_1.put(actions_1.stopQuery(session.id, selectedWorkspaceId))];

      case 25:
        _c.sent();

        return [7
        /*endfinally*/
        ];

      case 26:
        return [2
        /*return*/
        ];
    }
  });
}

function formatError(error, fetchingSchema) {
  if (fetchingSchema === void 0) {
    fetchingSchema = false;
  }

  var message = extractMessage(error);

  if (message === 'Failed to fetch') {
    var schemaMessage = fetchingSchema ? ' schema' : '';
    return {
      error: "" + message + schemaMessage + ". Please check your connection"
    };
  }

  try {
    var ee = JSON.parse(message);
    return ee;
  } catch (e) {//
  }

  return {
    error: message
  };
}

exports.formatError = formatError;

function extractMessage(error) {
  if (error instanceof Error) {
    // Errors from apollo-link-http may include a "result" object, which is a JSON response from
    // the server. We should surface that to the client
    if (!!error['result'] && _typeof(error['result']) === 'object') {
      return error.result;
    }

    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return error;
}

function stopQuerySaga(action) {
  var _a, sessionId, workspaceId, sessions, session, workspace, key, subscription;

  return __generator(this, function (_b) {
    switch (_b.label) {
      case 0:
        _a = action.payload, sessionId = _a.sessionId, workspaceId = _a.workspaceId;
        return [4
        /*yield*/
        , effects_1.select(selectors_1.getSessionsState)];

      case 1:
        sessions = _b.sent().sessions;
        session = sessions.get(sessionId);
        return [4
        /*yield*/
        , workspaceId || effects_1.select(reducers_1.getSelectedWorkspaceId)];

      case 2:
        workspace = _b.sent();
        key = workspace + "~" + session.id;
        subscription = subscriptions[key];

        if (subscription && subscription.unsubscribe) {
          subscription.unsubscribe();
        }

        delete subscriptions[key];
        return [2
        /*return*/
        ];
    }
  });
}

exports.fecthingSagas = [effects_1.takeEvery('RUN_QUERY', utils_1.safely(runQuerySaga)), effects_1.takeLatest('STOP_QUERY', utils_1.safely(stopQuerySaga))];