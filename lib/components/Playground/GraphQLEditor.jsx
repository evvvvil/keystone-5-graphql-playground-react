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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var graphql_1 = require("graphql");
// Query & Response Components
var ExecuteButton_1 = require("./ExecuteButton");
var QueryEditor_1 = require("./QueryEditor");
var EditorWrapper_1 = require("./EditorWrapper");
var CodeMirrorSizer_1 = require("graphiql/dist/utility/CodeMirrorSizer");
var TopBar_1 = require("./TopBar/TopBar");
var VariableEditor_1 = require("./VariableEditor");
var Spinner_1 = require("../Spinner");
var Results_1 = require("./Results");
var ResponseTracing_1 = require("./ResponseTracing");
var QueryPlan_1 = require("./QueryPlan");
var fillLeafs_1 = require("graphiql/dist/utility/fillLeafs");
var elementPosition_1 = require("graphiql/dist/utility/elementPosition");
// Explorer Components
var SideTab_1 = require("./ExplorerTabs/SideTab");
var SideTabs_1 = require("./ExplorerTabs/SideTabs");
var SDLView_1 = require("./SchemaExplorer/SDLView");
var GraphDocs_1 = require("./DocExplorer/GraphDocs");
var index_1 = require("../../styled/index");
// Redux Dependencies
var react_redux_1 = require("react-redux");
var reselect_1 = require("reselect");
var selectors_1 = require("../../state/sessions/selectors");
var actions_1 = require("../../state/sessions/actions");
var selectors_2 = require("../../state/docs/selectors");
var actions_2 = require("../../state/docs/actions");
var GraphQLEditor = /** @class */ (function (_super) {
    __extends(GraphQLEditor, _super);
    function GraphQLEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setQueryVariablesRef = function (ref) {
            _this.queryVariablesRef = ref;
        };
        _this.setHttpHeadersRef = function (ref) {
            _this.httpHeadersRef = ref;
        };
        _this.setQueryPlanRef = function (ref) {
            _this.queryPlanRef = ref;
        };
        _this.setTracingRef = function (ref) {
            _this.tracingRef = ref;
        };
        _this.setQueryResizer = function (ref) {
            _this.queryResizer = ReactDOM.findDOMNode(ref);
        };
        _this.setResponseResizer = function (ref) {
            _this.responseResizer = ReactDOM.findDOMNode(ref);
        };
        _this.setEditorBarComponent = function (ref) {
            _this.editorBarComponent = ref;
        };
        _this.setQueryEditorComponent = function (ref) {
            _this.queryEditorComponent = ref;
        };
        _this.setVariableEditorComponent = function (ref) {
            _this.variableEditorComponent = ref;
        };
        _this.setResultComponent = function (ref) {
            _this.resultComponent = ref;
        };
        _this.setDocExplorerRef = function (ref) {
            if (ref) {
                _this.docExplorerComponent = ref.getWrappedInstance();
            }
        };
        _this.setGraphExplorerRef = function (ref) {
            if (ref) {
                _this.graphExplorerComponent = ref.getWrappedInstance();
            }
        };
        _this.setSchemaExplorerRef = function (ref) {
            if (ref) {
                _this.schemaExplorerComponent = ref.getWrappedInstance();
            }
        };
        _this.setContainerComponent = function (ref) {
            _this.containerComponent = ref;
        };
        _this.handleClickReference = function (reference) {
            if (_this.docExplorerComponent) {
                _this.docExplorerComponent.showDocFromType(reference.field || reference);
            }
        };
        _this.setSideTabActiveContentRef = function (ref) {
            if (ref) {
                _this.activeSideTabContent = ref.getWrappedInstance();
            }
        };
        _this.runQueryAtCursor = function () {
            if (_this.props.queryRunning) {
                _this.props.stopQuery(_this.props.sessionId);
                return;
            }
            var editor = _this.queryEditorComponent.getCodeMirror();
            if (editor.hasFocus()) {
                var cursor = editor.getCursor();
                var cursorIndex = editor.indexFromPos(cursor);
                _this.props.runQueryAtPosition(cursorIndex);
            }
        };
        _this.handleHintInformationRender = function (elem) {
            elem.addEventListener('click', _this.onClickHintInformation);
            var onRemoveFn;
            elem.addEventListener('DOMNodeRemoved', (onRemoveFn = function () {
                elem.removeEventListener('DOMNodeRemoved', onRemoveFn);
                elem.removeEventListener('click', _this.onClickHintInformation);
            }));
        };
        _this.handleResizeStart = function (downEvent) {
            if (!_this.didClickDragBar(downEvent)) {
                return;
            }
            downEvent.preventDefault();
            var offset = downEvent.clientX - elementPosition_1.getLeft(downEvent.target);
            var onMouseMove = function (moveEvent) {
                if (moveEvent.buttons === 0) {
                    return onMouseUp();
                }
                var editorBar = ReactDOM.findDOMNode(_this.editorBarComponent);
                var leftSize = moveEvent.clientX - elementPosition_1.getLeft(editorBar) - offset;
                var rightSize = editorBar.clientWidth - leftSize;
                _this.props.setEditorFlex(leftSize / rightSize);
            };
            var onMouseUp = function () {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                onMouseMove = null;
                onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.handleExtensionsDrawerResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var didMove = false;
            var wasOpen = _this.props.isExtensionsDrawerOpen;
            var hadHeight = _this.props.responseTracingHeight;
            var offset = downEvent.clientY - elementPosition_1.getTop(downEvent.target);
            if (wasOpen &&
                (downEvent.target === _this.tracingRef ||
                    downEvent.target === _this.queryPlanRef)) {
                return;
            }
            var onMouseMove = function (moveEvent) {
                if (moveEvent.buttons === 0) {
                    return onMouseUp();
                }
                didMove = true;
                var editorBar = ReactDOM.findDOMNode(_this.editorBarComponent);
                var topSize = moveEvent.clientY - elementPosition_1.getTop(editorBar) - offset;
                var bottomSize = editorBar.clientHeight - topSize;
                if (bottomSize < 60) {
                    _this.props.closeTracing(hadHeight);
                }
                else {
                    _this.props.openTracing(hadHeight);
                }
            };
            var onMouseUp = function () {
                if (!didMove) {
                    _this.props.toggleTracing();
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                onMouseMove = null;
                onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.handleVariableResizeStart = function (downEvent) {
            downEvent.preventDefault();
            var didMove = false;
            var wasOpen = _this.props.variableEditorOpen;
            var hadHeight = _this.props.variableEditorHeight;
            var offset = downEvent.clientY - elementPosition_1.getTop(downEvent.target);
            if (wasOpen &&
                (downEvent.target === _this.queryVariablesRef ||
                    downEvent.target === _this.httpHeadersRef)) {
                return;
            }
            var onMouseMove = function (moveEvent) {
                if (moveEvent.buttons === 0) {
                    return onMouseUp();
                }
                didMove = true;
                var editorBar = ReactDOM.findDOMNode(_this.editorBarComponent);
                var topSize = moveEvent.clientY - elementPosition_1.getTop(editorBar) - offset;
                var bottomSize = editorBar.clientHeight - topSize;
                if (bottomSize < 60) {
                    _this.props.closeVariables(hadHeight);
                }
                else {
                    _this.props.openVariables(bottomSize);
                }
            };
            var onMouseUp = function () {
                if (!didMove) {
                    _this.props.toggleVariables();
                }
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                onMouseMove = null;
                onMouseUp = null;
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        _this.onClickHintInformation = function (event) {
            if (event.target.className === 'typeName') {
                var typeName = event.target.innerHTML;
                var schema = _this.props.schema;
                if (schema) {
                    // TODO: There is no way as of now to retrieve the NAMED_TYPE of a GraphQLList(Type).
                    // We're therefore removing any '[' or '!' characters, to properly find its NAMED_TYPE. (eg. [Type!]! => Type)
                    // This should be removed as soon as there's a safer way to do that.
                    var namedTypeName = typeName.replace(/[\]\[!]/g, '');
                    var type = schema.getType(namedTypeName);
                    if (graphql_1.isNamedType(type)) {
                        _this.docExplorerComponent.showDocFromType(type);
                    }
                }
            }
        };
        _this.setDocsWidth = function (props) {
            if (props === void 0) { props = _this.props; }
            if (!_this.activeSideTabContent) {
                return;
            }
            if (!_this.props.docsOpen) {
                return;
            }
            requestAnimationFrame(function () {
                var width = _this.activeSideTabContent.getWidth();
                var maxWidth = _this.containerComponent.getWidth() - 86;
                _this.props.changeWidthDocs(props.sessionId, Math.min(width, maxWidth));
            });
        };
        return _this;
    }
    GraphQLEditor.prototype.componentDidMount = function () {
        // Ensure a form of a schema exists (including `null`) and
        // if not, fetch one using an introspection query.
        // this.props.fetchSchema()
        // Utility for keeping CodeMirror correctly sized.
        this.codeMirrorSizer = new CodeMirrorSizer_1.default();
        global.g = this;
    };
    GraphQLEditor.prototype.componentDidUpdate = function () {
        // If this update caused DOM nodes to have changed sizes, update the
        // corresponding CodeMirror instance sizes to match.
        // const components = [
        // this.queryEditorComponent,
        // this.variableEditorComponent,
        // this.resultComponent,
        // ]
        // this.codeMirrorSizer.updateSizes(components)
        if (this.resultComponent && Boolean(this.props.subscriptionActive)) {
            this.resultComponent.scrollTop = this.resultComponent.scrollHeight;
        }
    };
    GraphQLEditor.prototype.render = function () {
        return (<EditorWrapper_1.Container ref={this.setContainerComponent}>
        <EditorWrapper_1.default>
          <TopBar_1.default shareEnabled={this.props.shareEnabled} fixedEndpoint={this.props.fixedEndpoint}/>
          <EditorBar ref={this.setEditorBarComponent} onMouseDown={this.handleResizeStart}>
            <QueryWrap flex={this.props.editorFlex}>
              <QueryEditor_1.default getRef={this.setQueryEditorComponent} schema={this.props.schema} onHintInformationRender={this.handleHintInformationRender} onRunQuery={this.runQueryAtCursor} onClickReference={this.handleClickReference}/>
              <VariableEditor isOpen={this.props.variableEditorOpen} height={this.props.variableEditorHeight}>
                <VariableEditorTitle isOpen={this.props.variableEditorOpen} onMouseDown={this.handleVariableResizeStart}>
                  <DrawerTab isActive={this.props.queryVariablesActive} ref={this.setQueryVariablesRef} onClick={this.props.openQueryVariables}>
                    Query Variables
                  </DrawerTab>
                  <DrawerTab isActive={!this.props.queryVariablesActive} ref={this.setHttpHeadersRef} onClick={this.props.closeQueryVariables}>
                    {'HTTP Headers ' +
            (this.props.headersCount && this.props.headersCount > 0
                ? "(" + this.props.headersCount + ")"
                : '')}
                  </DrawerTab>
                </VariableEditorTitle>
                {this.props.queryVariablesActive ? (<VariableEditor_1.VariableEditorComponent getRef={this.setVariableEditorComponent} onHintInformationRender={this.props.queryVariablesActive
            ? this.handleHintInformationRender
            : undefined} onRunQuery={this.runQueryAtCursor}/>) : (<VariableEditor_1.HeadersEditorComponent getRef={this.setVariableEditorComponent} onHintInformationRender={this.props.queryVariablesActive
            ? this.handleHintInformationRender
            : undefined} onRunQuery={this.runQueryAtCursor}/>)}
              </VariableEditor>
              <QueryDragBar ref={this.setQueryResizer}/>
            </QueryWrap>
            <ResultWrap>
              <ResultDragBar ref={this.setResponseResizer}/>
              <ExecuteButton_1.default />
              {this.props.queryRunning &&
            this.props.responses.size === 0 && <Spinner_1.default />}
              <Results_1.default setRef={this.setResultComponent}/>
              {!this.props.queryRunning &&
            (!this.props.responses || this.props.responses.size === 0) && (<Intro>Hit the Play Button to get a response here</Intro>)}
              {this.props.subscriptionActive && (<Listening>Listening &hellip;</Listening>)}
              <ExtensionsDrawer isOpen={this.props.isExtensionsDrawerOpen} height={this.props.responseTracingHeight}>
                <ExtensionsDrawerTitle isOpen={this.props.isExtensionsDrawerOpen} onMouseDown={this.handleExtensionsDrawerResizeStart}>
                  <DrawerTab isActive={this.props.isTracingActive} ref={this.setTracingRef} onClick={this.props.openTracing}>
                    Tracing
                  </DrawerTab>
                  <DrawerTab isActive={!this.props.isTracingActive} ref={this.setQueryPlanRef} onClick={this.props.closeTracing}>
                    Query Plan
                  </DrawerTab>
                </ExtensionsDrawerTitle>
                {this.props.isTracingActive ? (<ResponseTracing_1.default />) : (<QueryPlan_1.QueryPlan />)}
              </ExtensionsDrawer>
            </ResultWrap>
          </EditorBar>
        </EditorWrapper_1.default>
        <SideTabs_1.default sessionId={this.props.sessionId} schema={this.props.schema} setActiveContentRef={this.setSideTabActiveContentRef} setWidth={this.setDocsWidth} maxWidth={10000}>
          <SideTab_1.default label="Docs" activeColor="green" tabWidth="49px">
            <GraphDocs_1.default schema={this.props.schema} ref={this.setDocExplorerRef}/>
          </SideTab_1.default>
          <SideTab_1.default label="Schema" activeColor="blue" tabWidth="65px">
            <SDLView_1.default schema={this.props.schema} ref={this.setSchemaExplorerRef} sessionId={this.props.sessionId} setWidth={this.setDocsWidth}/>
          </SideTab_1.default>
        </SideTabs_1.default>
      </EditorWrapper_1.Container>);
    };
    /**
     * Inspect the query, automatically filling in selection sets for non-leaf
     * fields which do not yet have them.
     *
     * @public
     */
    GraphQLEditor.prototype.autoCompleteLeafs = function () {
        var _a = fillLeafs_1.fillLeafs(this.props.schema, this.props.query), insertions = _a.insertions, result = _a.result;
        if (insertions && insertions.length > 0) {
            var editor_1 = this.queryEditorComponent.getCodeMirror();
            editor_1.operation(function () {
                var cursor = editor_1.getCursor();
                var cursorIndex = editor_1.indexFromPos(cursor);
                editor_1.setValue(result);
                var added = 0;
                try {
                    /* tslint:disable-next-line */
                    var markers_1 = insertions.map(function (_a) {
                        var index = _a.index, string = _a.string;
                        return editor_1.markText(editor_1.posFromIndex(index + added), editor_1.posFromIndex(index + (added += string.length)), {
                            className: 'autoInsertedLeaf',
                            clearOnEnter: true,
                            title: 'Automatically added leaf fields',
                        });
                    });
                    setTimeout(function () { return markers_1.forEach(function (marker) { return marker.clear(); }); }, 7000);
                }
                catch (e) {
                    //
                }
                var newCursorIndex = cursorIndex;
                /* tslint:disable-next-line */
                insertions.forEach(function (_a) {
                    var index = _a.index, string = _a.string;
                    if (index < cursorIndex && string) {
                        newCursorIndex += string.length;
                    }
                });
                editor_1.setCursor(editor_1.posFromIndex(newCursorIndex));
            });
        }
        return result;
    };
    GraphQLEditor.prototype.didClickDragBar = function (event) {
        // Only for primary unmodified clicks
        return (event.target === this.queryResizer ||
            event.target === this.responseResizer);
    };
    return GraphQLEditor;
}(React.PureComponent));
var mapStateToProps = reselect_1.createStructuredSelector({
    queryRunning: selectors_1.getQueryRunning,
    responses: selectors_1.getResponses,
    subscriptionActive: selectors_1.getSubscriptionActive,
    variableEditorOpen: selectors_1.getVariableEditorOpen,
    variableEditorHeight: selectors_1.getVariableEditorHeight,
    isExtensionsDrawerOpen: selectors_1.getIsExtensionsDrawerOpen,
    isTracingActive: selectors_1.getIsTracingActive,
    responseTracingHeight: selectors_1.getResponseTracingHeight,
    responseExtensions: selectors_1.getResponseExtensions,
    currentQueryStartTime: selectors_1.getCurrentQueryStartTime,
    currentQueryEndTime: selectors_1.getCurrentQueryEndTime,
    tracingSupported: selectors_1.getTracingSupported,
    editorFlex: selectors_1.getEditorFlex,
    queryVariablesActive: selectors_1.getQueryVariablesActive,
    headers: selectors_1.getHeaders,
    operations: selectors_1.getOperations,
    operationName: selectors_1.getOperationName,
    headersCount: selectors_1.getHeadersCount,
    sessionId: selectors_1.getSelectedSessionIdFromRoot,
    isQueryPlanSupported: selectors_1.getIsQueryPlanSupported,
    docsOpen: selectors_2.getDocsOpen,
});
exports.default = react_redux_1.connect(mapStateToProps, {
    updateQueryFacts: actions_1.updateQueryFacts,
    stopQuery: actions_1.stopQuery,
    runQueryAtPosition: actions_1.runQueryAtPosition,
    openQueryVariables: actions_1.openQueryVariables,
    closeQueryVariables: actions_1.closeQueryVariables,
    openVariables: actions_1.openVariables,
    closeVariables: actions_1.closeVariables,
    openTracing: actions_1.openTracing,
    closeTracing: actions_1.closeTracing,
    toggleTracing: actions_1.toggleTracing,
    setEditorFlex: actions_1.setEditorFlex,
    toggleVariables: actions_1.toggleVariables,
    fetchSchema: actions_1.fetchSchema,
    changeWidthDocs: actions_2.changeWidthDocs,
}, null, {
    withRef: true,
})(GraphQLEditor);
var EditorBar = index_1.styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: row;\n  flex: 1;\n  height: 100%;\n"])));
var ResultWrap = index_1.styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  height: 100%;\n  position: relative;\n  border-left: none;\n  background: ", ";\n  overflow-anchor: auto;\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  height: 100%;\n  position: relative;\n  border-left: none;\n  background: ", ";\n  overflow-anchor: auto;\n"])), function (p) { return p.theme.editorColours.resultBackground; });
var DragBar = index_1.styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 15px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  cursor: col-resize;\n"], ["\n  width: 15px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  cursor: col-resize;\n"])));
var QueryDragBar = index_1.styled(DragBar)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  right: 0px;\n"], ["\n  right: 0px;\n"])));
var ResultDragBar = index_1.styled(DragBar)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  left: 0px;\n  z-index: 1;\n"], ["\n  left: 0px;\n  z-index: 1;\n"])));
var BottomDrawer = index_1.styled('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  background: #0b1924;\n  flex-direction: column;\n  position: relative;\n  height: ", ";\n"], ["\n  display: flex;\n  background: #0b1924;\n  flex-direction: column;\n  position: relative;\n  height: ", ";\n"])), function (props) { return (props.isOpen ? props.height + "px" : '43px'); });
var BottomDrawerTitle = index_1.styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: #0b1924;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  line-height: 14px;\n  font-size: 14px;\n  padding: 14px 14px 15px 21px;\n  user-select: none;\n"], ["\n  background: #0b1924;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  line-height: 14px;\n  font-size: 14px;\n  padding: 14px 14px 15px 21px;\n  user-select: none;\n"])));
var VariableEditor = index_1.styled(BottomDrawer)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  .CodeMirror {\n    padding-left: 4px;\n    width: calc(100% - 4px);\n    background: ", ";\n  }\n  .CodeMirror-lines {\n    padding: 10px 0 20px 0;\n  }\n  .CodeMirror-linenumbers {\n    background: ", ";\n  }\n"], ["\n  .CodeMirror {\n    padding-left: 4px;\n    width: calc(100% - 4px);\n    background: ", ";\n  }\n  .CodeMirror-lines {\n    padding: 10px 0 20px 0;\n  }\n  .CodeMirror-linenumbers {\n    background: ", ";\n  }\n"])), function (p) { return p.theme.editorColours.leftDrawerBackground; }, function (p) { return p.theme.editorColours.leftDrawerBackground; });
var VariableEditorTitle = index_1.styled(function (_a) {
    var isOpen = _a.isOpen, rest = __rest(_a, ["isOpen"]);
    return (<BottomDrawerTitle {...rest}/>);
})(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  cursor: ", ";\n  background: ", ";\n"], ["\n  cursor: ", ";\n  background: ", ";\n"])), function (p) { return (p.isOpen ? 'row-resize' : 'n-resize'); }, function (p) { return p.theme.editorColours.leftDrawerBackground; });
var ExtensionsDrawer = index_1.styled(BottomDrawer)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background: ", ";\n"], ["\n  background: ", ";\n"])), function (p) { return p.theme.editorColours.rightDrawerBackground; });
var ExtensionsDrawerTitle = index_1.styled(function (_a) {
    var isOpen = _a.isOpen, rest = __rest(_a, ["isOpen"]);
    return (<BottomDrawerTitle {...rest}/>);
})(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  text-align: right;\n  background: ", ";\n  cursor: ", ";\n  color: ", ";\n"], ["\n  text-align: right;\n  background: ", ";\n  cursor: ", ";\n  color: ", ";\n"])), function (p) { return p.theme.editorColours.rightDrawerBackground; }, function (props) { return (props.isOpen ? 's-resize' : 'n-resize'); }, function (p) { return p.theme.editorColours.drawerTextInactive; });
var DrawerTab = index_1.styled('button')(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  padding: 0;\n  margin-right: 10px;\n  background: transparent;\n\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  line-height: 14px;\n  font-size: 14px;\n  color: ", ";\n  &:last-child {\n    margin-right: 0;\n  }\n"], ["\n  padding: 0;\n  margin-right: 10px;\n  background: transparent;\n\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.53px;\n  line-height: 14px;\n  font-size: 14px;\n  color: ",
    ";\n  &:last-child {\n    margin-right: 0;\n  }\n"])), function (p) {
    return p.isActive
        ? p.theme.editorColours.drawerText
        : p.theme.editorColours.drawerTextInactive;
});
var QueryWrap = index_1.styled('div')(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  flex: ", " 1 0%;\n  border-top: 8px solid ", ";\n"], ["\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  flex: ", " 1 0%;\n  border-top: 8px solid ", ";\n"])), function (props) { return props.flex; }, function (props) { return props.theme.editorColours.resultBackground; });
var Intro = index_1.styled.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  width: 235px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: ", ";\n  font-size: ", ";\n  font-family: 'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono',\n    'Monaco', monospace;\n  text-align: center;\n  letter-spacing: 0.6px;\n"], ["\n  width: 235px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: ", ";\n  font-size: ", ";\n  font-family: 'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono',\n    'Monaco', monospace;\n  text-align: center;\n  letter-spacing: 0.6px;\n"])), function (p) { return p.theme.colours.textInactive; }, function (p) { return p.theme.sizes.small16; });
var Listening = index_1.styled.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 0;\n  color: ", ";\n  background: ", ";\n  font-size: ", ";\n  font-family: ", ";\n  letter-spacing: 0.6px;\n  padding-left: 24px;\n  padding-bottom: 60px;\n"], ["\n  position: absolute;\n  bottom: 0;\n  color: ", ";\n  background: ", ";\n  font-size: ", ";\n  font-family: ", ";\n  letter-spacing: 0.6px;\n  padding-left: 24px;\n  padding-bottom: 60px;\n"])), function (p) { return p.theme.editorColours.text; }, function (p) { return p.theme.editorColours.resultBackground; }, function (p) { return p.theme.sizes.small16; }, function (p) { return p.theme.settings['editor.fontFamily']; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15;
//# sourceMappingURL=GraphQLEditor.jsx.map