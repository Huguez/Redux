import * as actionTypes from '../actions'; 

const initialState = {  
    results: []
}

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat( {  id: Date.now() ,  value: action.result } )
            }
        case actionTypes.DELETE_RESULT:
            const updateArray = state.results.filter( res => action.resultElId !== res.id )
            return{
                ...state,
                results: updateArray
            }
    }
    return state;
}

export default reducer;