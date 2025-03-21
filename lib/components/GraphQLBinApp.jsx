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
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var createStore_1 = require("../state/createStore");
require("isomorphic-fetch");
var EndpointPopup_1 = require("./EndpointPopup");
var styled_1 = require("../styled");
var PlaygroundWrapper_1 = require("./PlaygroundWrapper");
var actions_1 = require("../state/workspace/actions");
exports.store = createStore_1.default();
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regexa = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regexa.exec(url);
    if (!results || !results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var GraphQLBinApp = /** @class */ (function (_super) {
    __extends(GraphQLBinApp, _super);
    function GraphQLBinApp(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChangeEndpoint = function (endpoint) {
            _this.setState({ endpoint: endpoint });
            localStorage.setItem('last-endpoint', endpoint);
        };
        _this.state = {
            endpoint: props.endpoint,
            subscriptionEndpoint: props.subscriptionEndpoint,
            loading: false,
            headers: props.headers || {},
        };
        return _this;
    }
    GraphQLBinApp.prototype.UNSAFE_componentWillMount = function () {
        var _this = this;
        if (this.props.match.params.id) {
            if (this.props.match.params.id === 'new') {
                return;
            }
            this.setState({ loading: true });
            // DOM side-effect:
            // #loading-wrapper is a hardcoded DOM element in the HTML entrypoint
            var loadingWrapper_1 = document.getElementById('loading-wrapper');
            if (loadingWrapper_1) {
                loadingWrapper_1.classList.remove('fadeOut');
            }
            setTimeout(function () {
                if (loadingWrapper_1) {
                    loadingWrapper_1.remove();
                }
            }, 1000);
            fetch('https://api.graphqlbin.com', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: "\n            query ($id: String!) {\n              session(id: $id) {\n                data\n                endpoint\n              }\n            }\n          ",
                    variables: { id: this.props.match.params.id },
                }),
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                if (loadingWrapper_1) {
                    loadingWrapper_1.classList.add('fadeOut');
                }
                if (!res.data || res.data.session === null) {
                    location.href = location.origin + "/v2/new";
                }
                var state = JSON.parse(res.data.session.data);
                _this.props.injectState(state);
                _this.setState({
                    endpoint: res.data.session.endpoint,
                    loading: false,
                });
            });
        }
    };
    GraphQLBinApp.prototype.render = function () {
        var _a = this.state, endpoint = _a.endpoint, subscriptionEndpoint = _a.subscriptionEndpoint;
        // If no  endpoint passed tries to get one from url
        if (!endpoint) {
            endpoint = getParameterByName('endpoint');
        }
        if (!subscriptionEndpoint) {
            subscriptionEndpoint = getParameterByName('subscription');
        }
        return (<Wrapper>
        {this.state.loading ? null : !this.state.endpoint ||
            this.state.endpoint.length === 0 ? (<styled_1.ThemeProvider theme={styled_1.theme}>
            <EndpointPopup_1.default onRequestClose={this.handleChangeEndpoint} endpoint={this.state.endpoint || ''}/>
          </styled_1.ThemeProvider>) : (<PlaygroundWrapper_1.default endpoint={endpoint} headers={this.state.headers} subscriptionEndpoint={subscriptionEndpoint}/>)}
      </Wrapper>);
    };
    return GraphQLBinApp;
}(React.Component));
var ConnectedGraphQLBinApp = react_redux_1.connect(null, { injectState: actions_1.injectState })(GraphQLBinApp);
// tslint:disable
var GraphQLBinAppHOC = /** @class */ (function (_super) {
    __extends(GraphQLBinAppHOC, _super);
    function GraphQLBinAppHOC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphQLBinAppHOC.prototype.render = function () {
        return (<react_redux_1.Provider store={exports.store}>
        <ConnectedGraphQLBinApp {...this.props}/>
      </react_redux_1.Provider>);
    };
    return GraphQLBinAppHOC;
}(React.Component));
exports.default = GraphQLBinAppHOC;
var Wrapper = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n"], ["\n  width: 100%;\n  height: 100%;\n"])));
var templateObject_1;
//# sourceMappingURL=GraphQLBinApp.jsx.map