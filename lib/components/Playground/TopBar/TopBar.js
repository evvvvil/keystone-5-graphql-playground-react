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
exports.Button = void 0;

var React = require("react");

var index_1 = require("../../../styled/index");

var copy = require("copy-to-clipboard");

var Share_1 = require("../../Share");

var SchemaReload_1 = require("./SchemaReload");

var reselect_1 = require("reselect");

var selectors_1 = require("../../../state/sessions/selectors");

var react_redux_1 = require("react-redux");

var selectors_2 = require("../../../state/general/selectors");

var PropTypes = require("prop-types");

var actions_1 = require("../../../state/sessions/actions");

var actions_2 = require("../../../state/sharing/actions");

var actions_3 = require("../../../state/general/actions");

var reducers_1 = require("../../../state/workspace/reducers");

var TopBar =
/** @class */
function (_super) {
  __extends(TopBar, _super);

  function TopBar() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.copyCurlToClipboard = function () {
      var curl = _this.getCurl();

      copy(curl);
    };

    _this.onChange = function (e) {
      _this.props.editEndpoint(e.target.value);
    };

    _this.onKeyDown = function (e) {
      if (e.keyCode === 13) {
        _this.props.refetchSchema();
      }
    };

    _this.openHistory = function () {
      _this.props.openHistory();
    };

    _this.getCurl = function () {
      // no need to rerender the whole time. only on-demand the store is fetched
      var session = selectors_1.getSelectedSession(_this.context.store.getState());
      var variables;

      try {
        variables = JSON.parse(session.variables);
      } catch (e) {//
      }

      var data = JSON.stringify({
        query: session.query,
        variables: variables,
        operationName: session.operationName
      });
      var sessionHeaders;

      try {
        sessionHeaders = JSON.parse(session.headers);
      } catch (e) {//
      }

      var headers = __assign({
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Connection: 'keep-alive',
        DNT: '1',
        Origin: location.origin || session.endpoint
      }, sessionHeaders);

      var headersString = Object.keys(headers).map(function (key) {
        var value = headers[key];
        return "-H '" + key + ": " + value + "'";
      }).join(' ');
      return "curl '" + session.endpoint + "' " + headersString + " --data-binary '" + data + "' --compressed";
    };

    return _this;
  }

  TopBar.prototype.render = function () {
    var _a = this.props,
        endpointUnreachable = _a.endpointUnreachable,
        settings = _a.settings;
    return /*#__PURE__*/React.createElement(TopBarWrapper, null, /*#__PURE__*/React.createElement(exports.Button, {
      onClick: this.props.prettifyQuery
    }, "Prettify"), /*#__PURE__*/React.createElement(exports.Button, {
      onClick: this.openHistory
    }, "History"), /*#__PURE__*/React.createElement(UrlBarWrapper, null, /*#__PURE__*/React.createElement(UrlBar, {
      value: this.props.endpoint,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onBlur: this.props.refetchSchema,
      disabled: this.props.fixedEndpoint,
      active: !this.props.fixedEndpoint
    }), endpointUnreachable ? /*#__PURE__*/React.createElement(ReachError, null, /*#__PURE__*/React.createElement("span", null, "Server cannot be reached"), /*#__PURE__*/React.createElement(Spinner, null)) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        left: '6px'
      }
    }, /*#__PURE__*/React.createElement(SchemaReload_1["default"], {
      settings: settings,
      isPollingSchema: this.props.isPollingSchema,
      onReloadSchema: this.props.refetchSchema
    }))), /*#__PURE__*/React.createElement(exports.Button, {
      onClick: this.copyCurlToClipboard
    }, "Copy CURL"), this.props.shareEnabled && /*#__PURE__*/React.createElement(Share_1["default"], null, /*#__PURE__*/React.createElement(exports.Button, null, "Share Playground")));
  };

  TopBar.contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    })
  };
  return TopBar;
}(React.Component);

var mapStateToProps = reselect_1.createStructuredSelector({
  endpoint: selectors_1.getEndpoint,
  fixedEndpoint: selectors_2.getFixedEndpoint,
  isPollingSchema: selectors_1.getIsPollingSchema,
  endpointUnreachable: selectors_1.getEndpointUnreachable,
  settings: reducers_1.getSettings
});
exports["default"] = react_redux_1.connect(mapStateToProps, {
  editEndpoint: actions_1.editEndpoint,
  prettifyQuery: actions_1.prettifyQuery,
  openHistory: actions_3.openHistory,
  share: actions_2.share,
  refetchSchema: actions_1.refetchSchema
})(TopBar);
exports.Button = index_1.styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-transform: uppercase;\n  font-weight: 600;\n  color: ", ";\n  background: ", ";\n  border-radius: 2px;\n  flex: 0 0 auto;\n  letter-spacing: 0.53px;\n  font-size: 14px;\n  padding: 6px 9px 7px 10px;\n  margin-left: 6px;\n\n  cursor: pointer;\n  transition: 0.1s linear background-color;\n  &:first-child {\n    margin-left: 0;\n  }\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  text-transform: uppercase;\n  font-weight: 600;\n  color: ", ";\n  background: ", ";\n  border-radius: 2px;\n  flex: 0 0 auto;\n  letter-spacing: 0.53px;\n  font-size: 14px;\n  padding: 6px 9px 7px 10px;\n  margin-left: 6px;\n\n  cursor: pointer;\n  transition: 0.1s linear background-color;\n  &:first-child {\n    margin-left: 0;\n  }\n  &:hover {\n    background-color: ", ";\n  }\n"])), function (p) {
  return p.theme.editorColours.buttonText;
}, function (p) {
  return p.theme.editorColours.button;
}, function (p) {
  return p.theme.editorColours.buttonHover;
});
var TopBarWrapper = index_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  background: ", ";\n  padding: 10px 10px 4px;\n  align-items: center;\n"], ["\n  display: flex;\n  background: ", ";\n  padding: 10px 10px 4px;\n  align-items: center;\n"])), function (p) {
  return p.theme.editorColours.navigationBar;
});
var UrlBar = index_1.styled('input')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: ", ";\n  border-radius: 4px;\n  color: ", ";\n  border: 1px solid ", ";\n  padding: 6px 12px;\n  padding-left: 30px;\n  font-size: 13px;\n  flex: 1;\n"], ["\n  background: ", ";\n  border-radius: 4px;\n  color: ", ";\n  border: 1px solid ", ";\n  padding: 6px 12px;\n  padding-left: 30px;\n  font-size: 13px;\n  flex: 1;\n"])), function (p) {
  return p.theme.editorColours.button;
}, function (p) {
  return p.active ? p.theme.editorColours.navigationBarText : p.theme.editorColours.textInactive;
}, function (p) {
  return p.theme.editorColours.background;
});
var UrlBarWrapper = index_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex: 1;\n  margin-left: 6px;\n  position: relative;\n  display: flex;\n  align-items: center;\n"], ["\n  flex: 1;\n  margin-left: 6px;\n  position: relative;\n  display: flex;\n  align-items: center;\n"])));
var ReachError = index_1.styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  right: 5px;\n  display: flex;\n  align-items: center;\n  color: #f25c54;\n"], ["\n  position: absolute;\n  right: 5px;\n  display: flex;\n  align-items: center;\n  color: #f25c54;\n"])));
var Pulse = index_1.styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 16px;\n  height: 16px;\n  background-color: ", ";\n  border-radius: 100%;\n"], ["\n  width: 16px;\n  height: 16px;\n  background-color: ", ";\n  border-radius: 100%;\n"])), function (p) {
  return p.theme.editorColours.icon;
});
var SpinnerWrapper = index_1.styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  position: relative;\n  margin: 6px;\n"], ["\n  position: relative;\n  margin: 6px;\n"])));

var Spinner = function Spinner() {
  return /*#__PURE__*/React.createElement(SpinnerWrapper, null, /*#__PURE__*/React.createElement(Pulse, null));
};

var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;