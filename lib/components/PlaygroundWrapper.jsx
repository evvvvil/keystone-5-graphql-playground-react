"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Playground_1 = require("./Playground");
var react_helmet_1 = require("react-helmet");
var yaml = require("js-yaml");
var ProjectsSideNav_1 = require("./ProjectsSideNav");
var styled_1 = require("../styled");
var theme_1 = require("../styled/theme");
// import OldThemeProvider from './Theme/ThemeProvider'
var util_1 = require("./util");
var react_redux_1 = require("react-redux");
var reducers_1 = require("../state/workspace/reducers");
var actions_1 = require("../state/workspace/actions");
var graphql_1 = require("graphql");
function getParameterByName(name, uri) {
    var url = uri || window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regexa = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regexa.exec(url);
    if (!results || !results[2]) {
        return null;
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var PlaygroundWrapper = /** @class */ (function (_super) {
    __extends(PlaygroundWrapper, _super);
    function PlaygroundWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.handleUpdateSessionCount = function () {
            _this.forceUpdate();
        };
        _this.getPlaygroundRef = function (ref) {
            _this.playground = ref;
            if (typeof _this.props.getRef === 'function') {
                _this.props.getRef(ref);
            }
        };
        _this.handleChangeConfig = function (configString) {
            _this.setState({ configString: configString });
        };
        _this.handleSaveConfig = function () {
            /* tslint:disable-next-line */
            if (typeof _this.props.onSaveConfig === 'function') {
                /* tslint:disable-next-line */
                _this.props.onSaveConfig(_this.state.configString);
            }
        };
        _this.handleSelectEnv = function (env, projectName) {
            var _a = util_1.getActiveEndpoints(_this.props.config, env, projectName), endpoint = _a.endpoint, subscriptionEndpoint = _a.subscriptionEndpoint, headers = _a.headers;
            _this.setState({
                activeEnv: env,
                endpoint: endpoint,
                headers: headers,
                subscriptionEndpoint: _this.normalizeSubscriptionUrl(endpoint, subscriptionEndpoint),
                activeProjectName: projectName,
            });
        };
        _this.handleChangeEndpoint = function (endpoint) {
            _this.setState({ endpoint: endpoint });
        };
        _this.handleChangeSubscriptionsEndpoint = function (subscriptionEndpoint) {
            _this.setState({ subscriptionEndpoint: subscriptionEndpoint });
        };
        global.m = _this;
        _this.state = _this.mapPropsToState(props);
        _this.removeLoader();
        return _this;
    }
    PlaygroundWrapper.prototype.mapPropsToState = function (props) {
        var configIsYaml = props.configString
            ? this.isConfigYaml(props.configString)
            : false;
        var _a = this.getInitialActiveEnv(props.config), activeEnv = _a.activeEnv, projectName = _a.projectName;
        var endpoint = props.endpoint ||
            props.endpointUrl ||
            getParameterByName('endpoint') ||
            location.href;
        var result = this.extractEndpointAndHeaders(endpoint);
        endpoint = result.endpoint;
        var headers = result.headers;
        var subscriptionEndpoint = props.subscriptionEndpoint || getParameterByName('subscriptionEndpoint');
        if (props.configString && props.config && activeEnv) {
            var endpoints = util_1.getActiveEndpoints(props.config, activeEnv, projectName);
            endpoint = endpoints.endpoint;
            subscriptionEndpoint = endpoints.subscriptionEndpoint;
            headers = endpoints.headers;
        }
        subscriptionEndpoint =
            this.normalizeSubscriptionUrl(endpoint, subscriptionEndpoint) || undefined;
        return {
            endpoint: this.absolutizeUrl(endpoint),
            platformToken: props.platformToken ||
                localStorage.getItem('platform-token') ||
                undefined,
            subscriptionEndpoint: subscriptionEndpoint,
            configIsYaml: configIsYaml,
            configString: props.configString,
            activeEnv: activeEnv,
            activeProjectName: projectName,
            headers: headers,
        };
    };
    PlaygroundWrapper.prototype.extractEndpointAndHeaders = function (endpoint) {
        var splitted = endpoint.split('?');
        if (splitted.length === 1) {
            return { endpoint: endpoint };
        }
        var mainEndpoint = splitted[0];
        try {
            // Special case to make apollo-server-azure-functions work
            // out of the box: preserve 'code' parameter.
            var code = getParameterByName('code', endpoint);
            if (code) {
                mainEndpoint = mainEndpoint + "?code=" + encodeURIComponent(code);
            }
            var headers = getParameterByName('headers', endpoint);
            if (headers) {
                return { headers: JSON.parse(headers), endpoint: mainEndpoint };
            }
        }
        catch (e) {
            //
        }
        return { endpoint: mainEndpoint };
    };
    PlaygroundWrapper.prototype.removeLoader = function () {
        var loadingWrapper = document.getElementById('loading-wrapper');
        if (loadingWrapper) {
            loadingWrapper.remove();
        }
    };
    PlaygroundWrapper.prototype.normalizeSubscriptionUrl = function (endpoint, subscriptionEndpoint) {
        if (subscriptionEndpoint) {
            if (subscriptionEndpoint.startsWith('/')) {
                var secure = endpoint.includes('https') || location.href.includes('https')
                    ? 's'
                    : '';
                return "ws" + secure + "://" + location.host + subscriptionEndpoint;
            }
            else {
                return subscriptionEndpoint.replace(/^http/, 'ws');
            }
        }
        return this.getGraphcoolSubscriptionEndpoint(endpoint).replace(/^http/, 'ws');
    };
    PlaygroundWrapper.prototype.getGraphcoolSubscriptionEndpoint = function (endpoint) {
        if (endpoint.includes('api.graph.cool')) {
            return "wss://subscriptions.graph.cool/v1/" + endpoint.split('/').slice(-1)[0];
        }
        return endpoint.replace(/^http/, 'ws');
    };
    PlaygroundWrapper.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        // Reactive props (props that cause a state change upon being changed)
        if (nextProps.endpoint !== this.props.endpoint ||
            nextProps.endpointUrl !== this.props.endpointUrl ||
            nextProps.subscriptionEndpoint !== this.props.subscriptionEndpoint ||
            nextProps.configString !== this.props.configString ||
            nextProps.platformToken !== this.props.platformToken ||
            nextProps.config !== this.props.config) {
            this.setState(this.mapPropsToState(nextProps));
            this.setInitialWorkspace(nextProps);
        }
    };
    PlaygroundWrapper.prototype.getInitialActiveEnv = function (config) {
        if (config) {
            if (config.extensions && config.extensions.endpoints) {
                return {
                    activeEnv: Object.keys(config.extensions.endpoints)[0],
                };
            }
            if (config.projects) {
                var projectName = Object.keys(config.projects)[0];
                var project = config.projects[projectName];
                if (project.extensions && project.extensions.endpoints) {
                    return {
                        activeEnv: Object.keys(project.extensions.endpoints)[0],
                        projectName: projectName,
                    };
                }
            }
        }
        return {};
    };
    PlaygroundWrapper.prototype.isConfigYaml = function (configString) {
        try {
            yaml.safeLoad(configString);
            return true;
        }
        catch (e) {
            //
        }
        return false;
    };
    PlaygroundWrapper.prototype.absolutizeUrl = function (url) {
        if (url.startsWith('/')) {
            return location.origin + url;
        }
        return url;
    };
    PlaygroundWrapper.prototype.UNSAFE_componentWillMount = function () {
        var platformToken = getParameterByName('platform-token');
        if (platformToken && platformToken.length > 0) {
            localStorage.setItem('platform-token', platformToken);
            window.location.replace(window.location.origin + window.location.pathname);
        }
    };
    PlaygroundWrapper.prototype.componentDidMount = function () {
        var _this = this;
        if (this.state.subscriptionEndpoint === '') {
            this.updateSubscriptionsUrl();
        }
        setTimeout(function () {
            _this.removePlaygroundInClass();
        }, 5000);
        this.setInitialWorkspace();
        if (this.props.tabs) {
            this.props.injectTabs(this.props.tabs);
        }
        else {
            var query = getParameterByName('query');
            if (query) {
                var endpoint = getParameterByName('endpoint') || this.state.endpoint;
                this.props.injectTabs([{ query: query, endpoint: endpoint }]);
            }
            else {
                var tabsString = getParameterByName('tabs');
                if (tabsString) {
                    try {
                        var tabs = JSON.parse(tabsString);
                        this.props.injectTabs(tabs);
                    }
                    catch (e) {
                        //
                    }
                }
            }
        }
        if (this.props.schema) {
            // in this case it's sdl
            if (typeof this.props.schema === 'string') {
                this.setState({ schema: graphql_1.buildSchema(this.props.schema) });
                // if it's an object, it must be an introspection query
            }
            else {
                this.setState({ schema: graphql_1.buildClientSchema(this.props.schema) });
            }
        }
    };
    PlaygroundWrapper.prototype.setInitialWorkspace = function (props) {
        if (props === void 0) { props = this.props; }
        if (props.config) {
            var activeEnv = this.getInitialActiveEnv(props.config);
            var endpoints = util_1.getActiveEndpoints(props.config, activeEnv.activeEnv, activeEnv.projectName);
            var endpoint = endpoints.endpoint;
            var subscriptionEndpoint = endpoints.subscriptionEndpoint ||
                this.normalizeSubscriptionUrl(endpoint, endpoints.subscriptionEndpoint);
            var headers = endpoints.headers;
            this.setState({
                endpoint: endpoint,
                subscriptionEndpoint: subscriptionEndpoint,
                headers: headers,
                activeEnv: activeEnv.activeEnv,
                activeProjectName: activeEnv.projectName,
            });
        }
    };
    PlaygroundWrapper.prototype.removePlaygroundInClass = function () {
        var root = document.getElementById('root');
        if (root) {
            root.classList.remove('playgroundIn');
        }
    };
    PlaygroundWrapper.prototype.render = function () {
        var title = this.props.setTitle ? (<react_helmet_1.Helmet>
        <title>{this.getTitle()}</title>
      </react_helmet_1.Helmet>) : null;
        var defaultHeaders = this.props.headers || {};
        var stateHeaders = this.state.headers || {};
        var combinedHeaders = __assign(__assign({}, defaultHeaders), stateHeaders);
        var theme = this.props.theme;
        return (<div>
        {title}
        <styled_1.ThemeProvider theme={__assign(__assign({}, styled_1.theme), { mode: theme, colours: theme === 'dark' ? theme_1.darkColours : theme_1.lightColours, editorColours: __assign(__assign({}, (theme === 'dark' ? theme_1.darkEditorColours : theme_1.lightEditorColours)), this.props.codeTheme), settings: this.props.settings })}>
          <App>
            {this.props.config &&
            this.state.activeEnv && (<ProjectsSideNav_1.default config={this.props.config} folderName={this.props.folderName || 'GraphQL App'} theme={theme} activeEnv={this.state.activeEnv} onSelectEnv={this.handleSelectEnv} onNewWorkspace={this.props.onNewWorkspace} showNewWorkspace={Boolean(this.props.showNewWorkspace)} isElectron={Boolean(this.props.isElectron)} activeProjectName={this.state.activeProjectName} configPath={this.props.configPath}/>)}
            <Playground_1.default endpoint={this.state.endpoint} shareEnabled={this.props.shareEnabled} subscriptionEndpoint={this.state.subscriptionEndpoint} shareUrl={this.state.shareUrl} onChangeEndpoint={this.handleChangeEndpoint} onChangeSubscriptionsEndpoint={this.handleChangeSubscriptionsEndpoint} adminAuthToken={this.state.platformToken} getRef={this.getPlaygroundRef} config={this.props.config} configString={this.state.configString} configIsYaml={this.state.configIsYaml} canSaveConfig={Boolean(this.props.canSaveConfig)} onChangeConfig={this.handleChangeConfig} onSaveConfig={this.handleSaveConfig} onUpdateSessionCount={this.handleUpdateSessionCount} fixedEndpoints={Boolean(this.state.configString)} fixedEndpoint={this.props.fixedEndpoint} headers={combinedHeaders} configPath={this.props.configPath} workspaceName={this.props.workspaceName || this.state.activeProjectName} createApolloLink={this.props.createApolloLink} schema={this.state.schema}/>
          </App>
        </styled_1.ThemeProvider>
      </div>);
    };
    PlaygroundWrapper.prototype.getTitle = function () {
        if (this.state.platformToken ||
            this.state.endpoint.includes('api.graph.cool')) {
            var projectId = this.getProjectId(this.state.endpoint);
            var cluster = this.state.endpoint.includes('api.graph.cool')
                ? 'shared'
                : 'local';
            return cluster + "/" + projectId + " - Playground";
        }
        return "Playground - " + this.state.endpoint;
    };
    PlaygroundWrapper.prototype.updateSubscriptionsUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var candidates, validCandidate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        candidates = this.getSubscriptionsUrlCandidated(this.state.endpoint);
                        return [4 /*yield*/, find(candidates, function (candidate) {
                                return _this.wsEndpointValid(candidate);
                            })];
                    case 1:
                        validCandidate = _a.sent();
                        if (validCandidate) {
                            this.setState({ subscriptionEndpoint: validCandidate });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PlaygroundWrapper.prototype.getSubscriptionsUrlCandidated = function (endpoint) {
        var candidates = [];
        candidates.push(endpoint.replace('https', 'wss').replace('http', 'ws'));
        if (endpoint.includes('graph.cool')) {
            candidates.push("wss://subscriptions.graph.cool/v1/" + this.getProjectId(endpoint));
        }
        if (endpoint.includes('/simple/v1/')) {
            // it's a graphcool local endpoint
            var host = endpoint.match(/https?:\/\/(.*?)\//);
            candidates.push("ws://" + host[1] + "/subscriptions/v1/" + this.getProjectId(endpoint));
        }
        return candidates;
    };
    PlaygroundWrapper.prototype.wsEndpointValid = function (url) {
        return new Promise(function (resolve) {
            var socket = new WebSocket(url, 'graphql-ws');
            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify({ type: 'connection_init' }));
            });
            socket.addEventListener('message', function (event) {
                var data = JSON.parse(event.data);
                if (data.type === 'connection_ack') {
                    resolve(true);
                }
            });
            socket.addEventListener('error', function (event) {
                resolve(false);
            });
            setTimeout(function () {
                resolve(false);
            }, 1000);
        });
    };
    PlaygroundWrapper.prototype.getProjectId = function (endpoint) {
        return endpoint.split('/').slice(-1)[0];
    };
    return PlaygroundWrapper;
}(React.Component));
var mapStateToProps = function (state, ownProps) {
    var theme = ownProps.theme || reducers_1.getTheme(state, ownProps.settings);
    var settings = reducers_1.getSettings(state);
    return { theme: theme, settings: settings };
};
exports.default = react_redux_1.connect(mapStateToProps, { injectTabs: actions_1.injectTabs })(PlaygroundWrapper);
function find(iterable, predicate) {
    return __awaiter(this, void 0, void 0, function () {
        var i, element, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < iterable.length)) return [3 /*break*/, 4];
                    element = iterable[i];
                    return [4 /*yield*/, predicate(element, i)];
                case 2:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, element];
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, null];
            }
        });
    });
}
var appearIn = styled_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from { \n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to { \n    opacity: 1;\n    transform: translateY(0);\n  }\n"], ["\n  from { \n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to { \n    opacity: 1;\n    transform: translateY(0);\n  }\n"])));
var App = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  opacity: 0;\n  transform: translateY(10px);\n  animation: ", " 0.5s ease-out forwards 0.2s;\n"], ["\n  display: flex;\n  width: 100%;\n  opacity: 0;\n  transform: translateY(10px);\n  animation: ", " 0.5s ease-out forwards 0.2s;\n"])), appearIn);
var templateObject_1, templateObject_2;
//# sourceMappingURL=PlaygroundWrapper.jsx.map