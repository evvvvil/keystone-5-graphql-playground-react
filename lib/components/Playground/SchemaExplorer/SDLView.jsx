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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../../state/docs/actions");
var Spinner_1 = require("../../Spinner");
var constants_1 = require("../../../constants");
var selectors_1 = require("../../../state/sessions/selectors");
var selectors_2 = require("../../../state/docs/selectors");
var reselect_1 = require("reselect");
var ErrorContainer_1 = require("../DocExplorer/ErrorContainer");
var SDLStyles_1 = require("./SDLTypes/SDLStyles");
var SDLHeader_1 = require("./SDLHeader");
var SDLEditor_1 = require("./SDLEditor");
var reducers_1 = require("../../../state/workspace/reducers");
var SDLView = /** @class */ (function (_super) {
    __extends(SDLView, _super);
    function SDLView(props) {
        var _this = _super.call(this, props) || this;
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        window.d = _this;
        return _this;
    }
    SDLView.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        // If user use default column size % columnWidth
        // Make the column follow the clicks
        if (!this.props.schema && nextProps.schema) {
            this.setWidth(nextProps);
        }
    };
    SDLView.prototype.setWidth = function (props) {
        if (props === void 0) { props = this.props; }
        this.props.setWidth(props);
    };
    SDLView.prototype.getWidth = function (props) {
        if (props === void 0) { props = this.props; }
        var rootWidth = props.docs.docsWidth || constants_1.columnWidth;
        return rootWidth;
    };
    SDLView.prototype.componentDidMount = function () {
        this.setWidth();
    };
    SDLView.prototype.render = function () {
        var _a = this.props, schema = _a.schema, settings = _a.settings, isPollingSchema = _a.isPollingSchema;
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
        // let types
        // if (schema instanceof GraphQLSchema) {
        // 	types = sdlArray(schema)
        // }
        return (<SDLStyles_1.SchemaExplorerContainer ref={this.setRef}>
        {emptySchema ? (<SDLStyles_1.SDLColumn>{emptySchema}</SDLStyles_1.SDLColumn>) : (<SDLStyles_1.SDLColumn width={this.props.docs.docsWidth || constants_1.columnWidth - 1}>
            <SDLHeader_1.default schema={schema}/>
            <SDLEditor_1.default schema={schema} settings={settings} isPollingSchema={isPollingSchema} width={this.props.docs.docsWidth || constants_1.columnWidth}/>
          </SDLStyles_1.SDLColumn>)}
      </SDLStyles_1.SchemaExplorerContainer>);
    };
    return SDLView;
}(React.Component));
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        toggleDocs: actions_1.toggleDocs,
        changeWidthDocs: actions_1.changeWidthDocs,
        setDocsVisible: actions_1.setDocsVisible,
    }, dispatch);
};
var mapStateToProps = reselect_1.createStructuredSelector({
    settings: reducers_1.getSettings,
    docs: selectors_2.getSessionDocs,
    sessionId: selectors_1.getSelectedSessionIdFromRoot,
    isPollingSchema: selectors_1.getIsPollingSchema,
});
exports.default = react_redux_1.connect(mapStateToProps, 
// @ts-ignore
mapDispatchToProps, null, { withRef: true })(SDLView);
//# sourceMappingURL=SDLView.jsx.map