import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {

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
                    onChange={ props.handleChange }
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