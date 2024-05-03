import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

// action creator
export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

// action creator
export const search = () => {
    return (dispatch, getState) => {
        
        const description = getState().todo.description
        const search = description ? `&description__regex=/${ description }/i` : ''

        const request = axios.get(`${ URL }?sort=-createdAt${ search }`)
                             .then(resp => dispatch(
                                { 
                                    type: 'TODO_SEARCHED', 
                                    payload: resp.data 
                                }
                            ))
    }
}

// retorno de array possibilitado pelo redux-multi
export const clear = () => {
    return [
               { type: 'TODO_CLEAR' },  // action 1
               search()                 // action 2
           ]
}

/*
    action creator add
*/

/* usando redux-thunk - controle da promise */
export const add = (description) => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search())) 
    }
}

/* usando redux-thunk - controle da promise */
export const remove = todo => {
    return dispatch => {
        axios.delete(`${ URL }/${ todo._id }`)

            /* desnecessário */
            // .then(resp => dispatch(
            //     { 
            //         type: 'TODO_MARKED_AS_DONE', 
            //         payload: resp.data 
            //     }
            // ))

            // dispara action search
            .then(resp => dispatch(
                search()
            )) 
    }
}

/* usando redux-thunk - controle da promise */
export const markAsDone = todo => {
    return dispatch => {
        axios.put(`${ URL }/${ todo._id }`, { ...todo, done: true })

            /* desnecessário */
            // .then(resp => dispatch(
            //     { 
            //         type: 'TODO_MARKED_AS_DONE', 
            //         payload: resp.data 
            //     }
            // ))

            // dispara action search
            .then(resp => dispatch(
                search()
            )) 
    }
}

/* usando redux-thunk - controle da promise */
export const markAsPending = todo => {
    return dispatch => {
        axios.put(`${ URL }/${ todo._id }`, { ...todo, done: false })

            /* desnecessário */
            // .then(resp => dispatch(
            //     { 
            //         type: 'TODO_MARKED_AS_DONE', 
            //         payload: resp.data 
            //     }
            // ))

            // dispara action search
            .then(resp => dispatch(
                search()
            )) 
    }
}

/* usando redux-multi - array de actions */
export const add_old_1 = (description) => {
    const request = axios.post(URL, { description })
    return [

        // action 1
        {
            type: 'TODO_ADDED',
            payload: request    // uma promise
        },

        //action 2
        search()  // executada com add ainda não concluído
        
    ]
}

/* não executa o search para recarregar a página */
export const add_old_2 = (description) => {
    const request = axios.post(URL, { description })
    return {
        type: 'TODO_ADDED',
        payload: request        // uma promise
    }
}
