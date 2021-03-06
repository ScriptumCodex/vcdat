import React from 'react'
import VarList from '../components/VarList.jsx'
import GMList from '../components/GMList.jsx'
import TemplateList from '../components/TemplateList.jsx'
import Actions from '../actions/Actions.js'
import {connect} from 'react-redux'

var LeftSideBar = React.createClass({
    initDragListItems(){
        $('.draggable-list-item').draggable({
            opacity: 0.7,
            helper: 'clone',
            zIndex:2,
            cursorAt: {
                left:0,
                bot: 0
            },
            cursor: 'pointer',
            stop(){
                $('.cell-stack-bottom').removeClass('plotter-to-top');
            }

        })
    },
    componentDidMount() {
        $('#left-side-bar').resizable({ghost: true, handles: 'e', minWidth: 100, maxWidth: 500})
        this.initDragListItems();
    },
    componentDidUpdate(){
        this.initDragListItems();
    },
    render() {
        return (
            <div id='left-side-bar' className=''>
                <VarList variables={this.props.variables} loadVariables={this.props.loadVariables} addFileToCache={this.props.addFileToCache} cachedFiles={this.props.cached_files}/>
                <GMList graphicsMethods={this.props.graphics_methods}/>
                <TemplateList templates={this.props.templates}/>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        variables: state.present.variables,
        graphics_methods: state.present.graphics_methods,
        templates: state.present.templates,
        cached_files: state.present.cached_files
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFileToCache: (filename, filepath, variables) => dispatch(Actions.addFileToCache(filename, filepath, variables)),
        loadVariables: (var_list) => dispatch(Actions.loadVariables(var_list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);
