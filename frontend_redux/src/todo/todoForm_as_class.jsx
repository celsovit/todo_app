import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeDescription, search, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)

        // garante this apontando para o objeto desta classe
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentWillMount() {      // antes de montar a tela
        this.props.search()     // busca dados no backend
    }

    keyHandler(e) {
        const { add, search, description, clear } = this.props     // destructuring actions

        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            clear()
        }

    }

    render() {
        const { add, search, description } = this.props     // destructuring actions

        return (
            <div role='form' className='todoForm'>
    
                {/* <div className="col-xs-12 col-sm-9 col-md-10"> */}
                <Grid cols='12 9 10'>
                    <input id="description" 
                        value={ this.props.description }
                        className="form-control" 
                        placeholder='Adicione uma tarefa' 
                        onChange={ this.props.changeDescription }
                        onKeyUp={ this.keyHandler }
                    />
                </Grid>
    
                {/* <div className="col-xs-12 col-sm-3 col-md-2"> */}
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' onClick={ () => add(description) } />
                    <IconButton style='info' icon='search' onClick={ search } />
                    <IconButton style='default' icon='close' onClick={ this.props.clear } />
                </Grid>
            
            </div>
        )
    }

}

const mapStateToProps = state => ({
    description: state.todo.description     // otém todo de rootReducer
})

// torna changeDescription de todoActions.js acessível como this.props.changeDescription
const mapDispatchToProps = dispatch => 
    bindActionCreators({ add, changeDescription, search, clear }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
