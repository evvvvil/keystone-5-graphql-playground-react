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
var React = require("react");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var keycode = require("keycode");
var FieldDoc_1 = require("./FieldDoc");
var ColumnDoc_1 = require("./ColumnDoc");
var actions_1 = require("../../../state/docs/actions");
var Spinner_1 = require("../../Spinner");
var constants_1 = require("../../../constants");
var RootColumn_1 = require("./RootColumn");
var stack_1 = require("../util/stack");
var selectors_1 = require("../../../state/docs/selectors");
var selectors_2 = require("../../../state/sessions/selectors");
var reselect_1 = require("reselect");
var ErrorContainer_1 = require("./ErrorContainer");
var styled_1 = require("../../../styled");
var GraphDocs = /** @class */ (function (_super) {
    __extends(GraphDocs, _super);
    // private refDocExplorer: any;
    function GraphDocs(props) {
        var _this = _super.call(this, props) || this;
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        _this.showDocFromType = function (type) {
            _this.props.addStack(_this.props.sessionId, type, 0, 0);
        };
        _this.handleSearch = function (value) {
            _this.setState({ searchValue: value });
        };
        _this.handleKeyDown = function (e) {
            // we don't want to interfere with inputs
            if (e.target instanceof HTMLInputElement ||
                e.metaKey ||
                e.shiftKey ||
                e.altKey ||
                e.ctrlKey) {
                return;
            }
            e.preventDefault();
            _this.props.changeKeyMove(_this.props.sessionId, true);
            var lastNavStack = _this.props.docs.navStack.length > 0 &&
                _this.props.docs.navStack[_this.props.docs.navStack.length - 1];
            var beforeLastNavStack = _this.props.docs.navStack.length > 0 &&
                _this.props.docs.navStack[_this.props.docs.navStack.length - 2];
            var keyPressed = keycode(e);
            switch (keyPressed) {
                case 'esc':
                    _this.props.setDocsVisible(_this.props.sessionId, false);
                    break;
                case 'left':
                    if (beforeLastNavStack) {
                        _this.props.addStack(_this.props.sessionId, beforeLastNavStack.field, beforeLastNavStack.x, beforeLastNavStack.y);
                    }
                    break;
                case 'right':
                    if (lastNavStack) {
                        var obj = stack_1.serialize(_this.props.schema, lastNavStack.field);
                        var firstElement = stack_1.getElement(obj, 0);
                        if (firstElement) {
                            _this.props.addStack(_this.props.sessionId, firstElement, lastNavStack.x + 1, 0);
                        }
                    }
                    else {
                        var obj = stack_1.serializeRoot(_this.props.schema);
                        var element = stack_1.getElementRoot(obj, 0);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, 0, 0);
                        }
                    }
                    break;
                case 'up':
                case 'down':
                    if (beforeLastNavStack) {
                        var obj = stack_1.serialize(_this.props.schema, beforeLastNavStack.field);
                        var element = stack_1.getElement(obj, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, lastNavStack.x, keyPressed === 'up' ? lastNavStack.y - 1 : lastNavStack.y + 1);
                        }
                    }
                    else {
                        var obj = stack_1.serializeRoot(_this.props.schema);
                        var y = lastNavStack ? lastNavStack.y : 0;
                        var element = stack_1.getElementRoot(obj, keyPressed === 'up' ? y - 1 : y + 1);
                        if (element) {
                            _this.props.addStack(_this.props.sessionId, element, 0, keyPressed === 'up' ? y - 1 : y + 1);
                        }
                    }
                    break;
            }
        };
        _this.state = {
            searchValue: '',
            widthMap: {},
        };
        window.d = _this;
        return _this;
    }
    GraphDocs.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        // If user use default column size % columnWidth
        // Make the column follow the clicks
        if (this.props.docs.navStack.length !== nextProps.docs.navStack.length ||
            this.props.docs.navStack.slice(-1)[0] !==
                nextProps.docs.navStack.slice(-1)[0] ||
            (!this.props.schema && nextProps.schema)) {
            this.setWidth(nextProps);
        }
    };
    GraphDocs.prototype.setWidth = function (props) {
        if (props === void 0) { props = this.props; }
        this.props.setWidth(props);
    };
    GraphDocs.prototype.getWidth = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var rootWidth = this.state.widthMap.root || constants_1.columnWidth;
        var stackWidths = props.docs.navStack.map(function (stack) { return _this.state.widthMap[stack.field.path] || constants_1.columnWidth; });
        return [rootWidth].concat(stackWidths).reduce(function (acc, curr) { return acc + curr; }, 0);
    };
    GraphDocs.prototype.componentDidMount = function () {
        this.setWidth();
    };
    GraphDocs.prototype.render = function () {
        var _this = this;
        var navStack = this.props.docs.navStack;
        var schema = this.props.schema;
        var emptySchema;
        if (schema === undefined) {
            // Schema is undefined when it is being loaded via introspection.
            emptySchema = <Spinner_1.default />;
        }
        else if (schema === null) {
            // Schema is null when it explicitly does not exist, typically due to
            // an error during introspection.
            emptySchema = <ErrorContainer_1.ErrorContainer>{'No Schema Available'}</ErrorContainer_1.ErrorContainer>;
        }
        return (<DocsExplorerContainer onKeyDown={this.handleKeyDown} tabIndex={0} ref={this.setRef}>
        {emptySchema && <ColumnDoc_1.default>{emptySchema}</ColumnDoc_1.default>}
        {!emptySchema &&
            schema && (<RootColumn_1.default schema={schema} width={this.state.widthMap.root || constants_1.columnWidth - 1} searchValue={this.state.searchValue} handleSearch={this.handleSearch} sessionId={this.props.sessionId}/>)}
        {navStack.map(function (stack, index) { return (<ColumnDoc_1.default key={index} width={_this.state.widthMap[stack.field.path] || constants_1.columnWidth}>
            <FieldDoc_1.default schema={schema} field={stack.field} level={index + 1} sessionId={_this.props.sessionId}/>
          </ColumnDoc_1.default>); })}
      </DocsExplorerContainer>);
    };
    return GraphDocs;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        addStack: actions_1.addStack,
        toggleDocs: actions_1.toggleDocs,
        changeWidthDocs: actions_1.changeWidthDocs,
        changeKeyMove: actions_1.changeKeyMove,
        setDocsVisible: actions_1.setDocsVisible,
    }, dispatch);
};
var mapStateToProps = reselect_1.createStructuredSelector({
    docs: selectors_1.getSessionDocs,
    sessionId: selectors_2.getSelectedSessionIdFromRoot,
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(GraphDocs);
var DocsExplorerContainer = styled_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  outline: none !important;\n"], ["\n  display: flex;\n  position: relative;\n  height: 100%;\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  outline: none !important;\n"])));
var templateObject_1;
//# sourceMappingURL=GraphDocs.jsx.map