import React from 'react'
import Toolbar from '../components/Toolbar.jsx'
import LeftSideBar from './LeftSideBar.jsx'
import RightSideBar from './RightSideBar.jsx'
import SpreadsheetContainer from './SpreadsheetContainer.jsx'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'
import {ActionCreators as UndoActionCreators} from 'redux-undo'
import {connect} from 'react-redux'

var AppContainer = React.createClass({
    render() {
        return (
            <div id='app-container'>
                <Toolbar onUndo={this.props.undo} onRedo={this.props.redo} undoEnabled={this.props.undoEnabled} redoEnabled={this.props.redoEnabled}/>
                <div id='main-container'>
                    <RightSideBar resizeSpreadsheet={this.resizeSpreadsheet}/>
                    <LeftSideBar resizeSpreadsheet={this.resizeSpreadsheet}/>
                    <SpreadsheetContainer/>
                </div>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    var undoEnabled = state.past.length > 0;
    var redoEnabled = state.future.length > 0;
    return jQuery.extend({}, state.present, {
        undoEnabled: undoEnabled,
        redoEnabled: redoEnabled
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        undo: () => dispatch(UndoActionCreators.undo()),
        redo: () => dispatch(UndoActionCreators.redo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
