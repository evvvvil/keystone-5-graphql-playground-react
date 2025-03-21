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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var keycode = require("keycode");
var elementPosition_1 = require("graphiql/dist/utility/elementPosition");
var actions_1 = require("../../../state/docs/actions");
var selectors_1 = require("../../../state/docs/selectors");
var selectors_2 = require("../../../state/sessions/selectors");
var reselect_1 = require("reselect");
var styled_1 = require("../../../styled");
var SideTab_1 = require("./SideTab");
var SideTabs = /** @class */ (function (_super) {
    __extends(SideTabs, _super);
    function SideTabs(props) {
        var _this = _super.call(this, props) || this;
        _this.clientX = 0;
        _this.clientY = 0;
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        _this.setContentContainerRef = function (ref) {
            _this.refContentContainer = ref;
        };
        _this.handleTabClick = function (idx) { return function () {
            if (_this.props.docs.activeTabIdx === idx) {
                _this.props.setDocsVisible(_this.props.sessionId, false);
                return _this.props.setWidth();
            }
            if (_this.props.docs.activeTabIdx !== idx) {
                _this.props.setDocsVisible(_this.props.sessionId, false, _this.props.docs.activeTabIdx);
                _this.props.setDocsVisible(_this.props.sessionId, true, idx);
                return _this.props.setWidth();
            }
            else {
                _this.props.setDocsVisible(_this.props.sessionId, true, idx);
                return _this.props.setWidth();
            }
        }; };
        _this.handleKeyDown = function (e) {
            // we don't want to interfere with inputs
            if (e.target instanceof HTMLInputElement ||
                e.metaKey ||
                e.shiftKey ||
                e.altKey ||
                e.ctrlKey) {
                return;
            }
            var keyPressed = keycode(e);
            switch (keyPressed) {
                case 'esc':
                    _this.props.changeKeyMove(_this.props.sessionId, true);
                    e.preventDefault();
                    _this.props.setDocsVisible(_this.props.sessionId, false);
                    break;
            }
        };
        _this.handleDocsResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var hadWidth = _this.props.docs.docsWidth;
            var offset = downEvent.clientX - elementPosition_1.getLeft(downEvent.target);
            var onMouseMove = function (moveEvent) {
                if (moveEvent.buttons === 0) {
                    return onMouseUp();
                }
                var app = _this.ref;
                var cursorPos = moveEvent.clientX - elementPosition_1.getLeft(app) - offset;
                var newSize = app.clientWidth - cursorPos;
                var maxSize = window.innerWidth - 50;
                var docsSize = maxSize < newSize ? maxSize : newSize;
                if (docsSize < 100) {
                    _this.props.setDocsVisible(_this.props.sessionId, false, _this.props.docs.activeTabIdx);
                }
                else {
                    _this.props.setDocsVisible(_this.props.sessionId, true, _this.props.docs.activeTabIdx);
                    _this.props.changeWidthDocs(_this.props.sessionId, docsSize);
                }
            };
            var onMouseUp = function () {
                if (!_this.props.docs.docsOpen) {
                    _this.props.changeWidthDocs(_this.props.sessionId, hadWidth);
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                onMouseMove = null;
                onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.handleMouseMove = function (e) {
            _this.clientX = e.clientX;
            _this.clientY = e.clientY;
            if (_this.props.docs.keyMove &&
                _this.clientX !== e.clientX &&
                _this.clientY !== e.clientY) {
                _this.props.changeKeyMove(_this.props.sessionId, false);
            }
        };
        window.d = _this;
        return _this;
    }
    SideTabs.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.docs.activeTabIdx && this.props.docs.activeTabIdx) {
            this.props.setDocsVisible(this.props.sessionId, true, this.props.docs.activeTabIdx);
        }
        if (prevProps.activeTabIdx && !this.props.docs.activeTabIdx) {
            this.props.setDocsVisible(this.props.sessionId, false);
        }
        this.props.setWidth();
        if (this.props.docs.activeTabIdx !== prevProps.docs.activeTabIdx &&
            this.refContentContainer) {
            this.refContentContainer.focus();
        }
    };
    SideTabs.prototype.componentDidMount = function () {
        if (!this.props.docs.activeTabIdx) {
            this.props.setDocsVisible(this.props.sessionId, false);
        }
        return this.props.setWidth();
    };
    SideTabs.prototype.render = function () {
        var _this = this;
        var _a = this.props.docs, docsOpen = _a.docsOpen, docsWidth = _a.docsWidth, activeTabIdx = _a.activeTabIdx;
        var docsStyle = { width: docsOpen ? docsWidth : 0 };
        var activeTab = docsOpen &&
            React.Children.toArray(this.props.children)[activeTabIdx];
        return (<Tabs open={docsOpen} style={docsStyle} ref={this.setRef}>
        <TabsContainer>
          {React.Children.toArray(this.props.children).map(function (child, index) {
            return React.cloneElement(child, __assign(__assign({}, child.props), { key: index, onClick: _this.handleTabClick(index), active: index === activeTabIdx }));
        })}
        </TabsContainer>
        <TabContentResizer onMouseDown={this.handleDocsResizeStart}/>
        <TabsGradient index={activeTabIdx}/>
        <TabContentContainer onKeyDown={this.handleKeyDown} onMouseMove={this.handleMouseMove} tabIndex={activeTabIdx} color={activeTab ? activeTab.props.activeColor : undefined} ref={this.setContentContainerRef}>
          {activeTab &&
            React.cloneElement(activeTab.props.children, __assign(__assign({}, activeTab.props), { ref: this.props.setActiveContentRef, setWidth: this.props.setWidth }))}
        </TabContentContainer>
      </Tabs>);
    };
    return SideTabs;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        addStack: actions_1.addStack,
        toggleDocs: actions_1.toggleDocs,
        changeKeyMove: actions_1.changeKeyMove,
        setDocsVisible: actions_1.setDocsVisible,
        changeWidthDocs: actions_1.changeWidthDocs
    }, dispatch);
};
var mapStateToProps = reselect_1.createStructuredSelector({
    docs: selectors_1.getSessionDocs,
    sessionId: selectors_2.getSelectedSessionIdFromRoot,
});
var ConnectedGraphDocs = react_redux_1.connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SideTabs);
// @ts-ignore
ConnectedGraphDocs.Tab = SideTab_1.default;
exports.default = ConnectedGraphDocs;
var Tabs = styled_1.styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: white;\n  outline: none;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);\n  position: absolute;\n  right: 0px;\n  z-index: ", ";\n  height: 100%;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  .doc-type-description p {\n    padding: 16px;\n    font-size: 14px;\n  }\n  .field-name {\n    color: #1f61a0;\n  }\n  .type-name {\n    color: rgb(245, 160, 0);\n  }\n  .arg-name {\n    color: #1f61a9;\n  }\n  code {\n    font-family: 'Source Code Pro', monospace;\n    border-radius: 2px;\n    padding: 1px 2px;\n    background: rgba(0, 0, 0, 0.06);\n  }\n"], ["\n  background: white;\n  outline: none;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);\n  position: absolute;\n  right: 0px;\n  z-index: ", ";\n  height: 100%;\n  font-family: 'Open Sans', sans-serif;\n  -webkit-font-smoothing: antialiased;\n  .doc-type-description p {\n    padding: 16px;\n    font-size: 14px;\n  }\n  .field-name {\n    color: #1f61a0;\n  }\n  .type-name {\n    color: rgb(245, 160, 0);\n  }\n  .arg-name {\n    color: #1f61a9;\n  }\n  code {\n    font-family: 'Source Code Pro', monospace;\n    border-radius: 2px;\n    padding: 1px 2px;\n    background: rgba(0, 0, 0, 0.06);\n  }\n"])), function (p) { return (p.open ? 2000 : 3); });
var TabContentContainer = styled_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: white;\n  display: flex;\n  position: relative;\n  height: 100%;\n  letter-spacing: 0.3px;\n  box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n  outline: none;\n  &::before {\n    top: 0;\n    bottom: 0;\n    background: ", ";\n    position: absolute;\n    z-index: 3;\n    left: 0px;\n    content: '';\n    width: 6px;\n  }\n"], ["\n  background: white;\n  display: flex;\n  position: relative;\n  height: 100%;\n  letter-spacing: 0.3px;\n  box-shadow: -1px 1px 6px 0 rgba(0, 0, 0, 0.3);\n  outline: none;\n  &::before {\n    top: 0;\n    bottom: 0;\n    background: ",
    ";\n    position: absolute;\n    z-index: 3;\n    left: 0px;\n    content: '';\n    width: 6px;\n  }\n"])), function (props) {
    return props.color ? props.theme.colours[props.color] : '#3D5866';
});
var TabContentResizer = styled_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  cursor: col-resize;\n  outline: none !important;\n  height: 100%;\n  left: -5px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  z-index: 10;\n"], ["\n  cursor: col-resize;\n  outline: none !important;\n  height: 100%;\n  left: -5px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  z-index: 10;\n"])));
var TabsContainer = styled_1.styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  outline: none !important;\n  z-index: 2;\n  height: 0;\n  top: 129px;\n"], ["\n  position: absolute;\n  outline: none !important;\n  z-index: 2;\n  height: 0;\n  top: 129px;\n"])));
var TabsGradient = styled_1.styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 20px;\n  z-index: 1;\n  pointer-events: none;\n  content: '';\n  background: ", ";\n"], ["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 20px;\n  z-index: 1;\n  pointer-events: none;\n  content: '';\n  background: ",
    ";\n"])), function (p) {
    return p.index === 0
        ? "linear-gradient(\n\t\tto right,\n\t\trgba(255, 255, 255, 1) 30%,\n\t\trgba(255, 255, 255, 0))"
        : "transparent";
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=SideTabs.jsx.map