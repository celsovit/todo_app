import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, search } from './todoActions'

const TodoForm = props => {

    const keyHandler = e => {

        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        
        } else if (e.key === 'Escape') {
            props.handleClear()
        
        }

    }

    return (
        <div role='form' className='todoForm'>

            {/* <div className="col-xs-12 col-sm-9 col-md-10"> */}
            <Grid cols='12 9 10'>
                <input id="description" 
                    value={ props.description }
                    className="form-control" 
                    placeholder='Adicione uma tarefa' 
                    onChange={ props.changeDescription }
                    onKeyUp={ keyHandler }
                />
            </Grid>

            {/* <div className="col-xs-12 col-sm-3 col-md-2"> */}
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={ props.handleAdd } />
                <IconButton style='info' icon='search' onClick={ props.handleSearch } />
                <IconButton style='default' icon='close' onClick={ props.handleClear } />
            </Grid>
        
        </div>
    )

}

const mapStateToProps = state => ({
    description: state.todo.description     // otém todo de rootReducer
})

// torna changeDescription de todoActions.js acessível como props.changeDescription
const mapDispatchToProps = dispatch => 
    bindActionCreators({ changeDescription, search }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
