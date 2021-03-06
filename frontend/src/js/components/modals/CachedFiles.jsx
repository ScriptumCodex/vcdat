import React from 'react'
import FileExplorer from './FileExplorer.jsx'

var CachedFiles = React.createClass({
    componentDidUpdate(){
        $('#cache-tree').quicktree();
    },
    componentDidMount(){
        $('#cache-tree').quicktree();
    },
    loadVariable(event){
       let selected = $('#cache-tree').find('.active');
       let var_name = selected.text();
       let filename = selected.parent().attr('data-filename');
       let path = selected.parent().attr('data-path');
       let var_obj = {};
       var_obj[var_name] = {
               cdms_var_name: var_name,
               filename: filename,
               path: path
           }
       this.props.loadVariables([var_obj])
       $('#cached-files').modal('hide');
   },
    render() {
        return (
            <div className="modal fade" id='cached-files' data-backdrop='static' data-keyboard='false'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Recent Files</h4>
                            <button onClick={() => {$('#file-explorer').modal('show')}} className='btn btn-default'>Add</button>
                        </div>
                        <div className="modal-body">
                            <ul id='cache-tree' className='tree-view no-bullets'>
                                {Object.keys(this.props.cachedFiles).map((filename, index) => {
                                    return (
                                        <li key={index}>
                                            <a>{filename}</a>
                                            <ul>
                                                {this.props.cachedFiles[filename].variables.map((var_name, index)=>{
                                                    return (<li key={index} data-filename={filename} data-path={this.props.cachedFiles[filename].filepath} style={{'display': 'none'}}>
                                                        <a>{var_name}</a>
                                                    </li>)
                                                })}
                                            </ul>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.loadVariable}>Open</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

export default CachedFiles;
