"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TracingRow_1 = require("./TracingRow");
var styled_1 = require("../../styled/styled");
var reselect_1 = require("reselect");
var selectors_1 = require("../../state/sessions/selectors");
var react_redux_1 = require("react-redux");
var TracingWrapper = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding-top: 6px;\n  padding-left: 25px;\n  padding-right: 25px;\n  color: ", ";\n  overflow: auto;\n  position: relative;\n  height: 100%;\n"], ["\n  padding-top: 6px;\n  padding-left: 25px;\n  padding-right: 25px;\n  color: ", ";\n  overflow: auto;\n  position: relative;\n  height: 100%;\n"])), function (p) { return p.theme.editorColours.text; });
var ReRun = styled_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 14px;\n"], ["\n  font-size: 14px;\n"])));
var NotSupported = styled_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 14px;\n  color: rgba(241, 143, 1, 1);\n"], ["\n  font-size: 14px;\n  color: rgba(241, 143, 1, 1);\n"])));
var TracingRows = styled_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding-left: 100px;\n  padding-bottom: 100px;\n  padding-top: 16px;\n  position: absolute;\n  overflow: auto;\n  top: 0;\n  left: 0;\n  width: calc(100% + 100px);\n  height: calc(100% + 116px);\n"], ["\n  padding-left: 100px;\n  padding-bottom: 100px;\n  padding-top: 16px;\n  position: absolute;\n  overflow: auto;\n  top: 0;\n  left: 0;\n  width: calc(100% + 100px);\n  height: calc(100% + 116px);\n"])));
var ResponseTracing = /** @class */ (function (_super) {
    __extends(ResponseTracing, _super);
    function ResponseTracing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResponseTracing.prototype.render = function () {
        var _a = this.props, tracing = _a.tracing, tracingSupported = _a.tracingSupported, startTime = _a.startTime, endTime = _a.endTime;
        var requestMs = tracing && startTime
            ? Math.abs(new Date(tracing.startTime).getTime() - startTime.getTime())
            : 0;
        var responseMs = tracing && endTime
            ? Math.abs(endTime.getTime() - new Date(tracing.endTime).getTime())
            : 0;
        var requestDuration = 1000 * 1000 * requestMs;
        return (<TracingWrapper>
        {tracing ? (<TracingRows>
            <TracingRow_1.default path={['Request']} startOffset={0} duration={requestDuration}/>
            {tracing.execution.resolvers.map(function (res) { return (<TracingRow_1.default key={res.path.join('.')} path={res.path} startOffset={res.startOffset + requestDuration} duration={res.duration}/>); })}
            <TracingRow_1.default path={['Response']} startOffset={tracing.duration + requestDuration} duration={1000 * 1000 * responseMs}/>
          </TracingRows>) : tracingSupported ? (<ReRun>
            {this.props.queryRunning
            ? 'Running query ...'
            : 'Please re-run the query to show tracing results.'}
          </ReRun>) : (<NotSupported>
            This GraphQL server doesn’t support tracing. See the following page
            for instructions:<br />
            https://github.com/apollographql/apollo-tracing
          </NotSupported>)}
      </TracingWrapper>);
    };
    return ResponseTracing;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({
    tracing: selectors_1.getTracing,
    startTime: selectors_1.getCurrentQueryStartTime,
    endTime: selectors_1.getCurrentQueryEndTime,
    tracingSupported: selectors_1.getTracingSupported,
    queryRunning: selectors_1.getQueryRunning,
});
exports.default = react_redux_1.connect(mapStateToProps)(ResponseTracing);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=ResponseTracing.jsx.map