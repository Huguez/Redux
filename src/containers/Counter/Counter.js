import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'; 


class Counter extends Component {

    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={ this.props.ctr } />
                <CounterControl label="Increment" clicked={ this.props.onIncrementCounter } />
                <CounterControl label="Decrement" clicked={ this.props.ondDecrementCounter }  />
                <CounterControl label="Add 5" clicked={ this.props.onAddCounter }  />
                <CounterControl label="Subtract 5" clicked={ this.props.onSubtractCounter }  />
                <hr/>
                <button onClick={ () => this.props.onStoreResults( this.props.ctr ) }> Store Result </button>
                <ul>
                    { this.props.storeResults.map( res => {
                        return <li key ={ res.id } onClick={ () => this.props.onDeleteResults(res.id) }> { res.value } </li>
                    } ) }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        onStoreResults: state.res.results
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIncrementCounter: () => dispatch( { type: actionTypes.INCREMENT } ), 
        ondDecrementCounter: () => dispatch( { type: actionTypes.DECREMENT } ), 
        onAddCounter: () => dispatch( { type: actionTypes.ADD, val: 7 } ), 
        onSubtractCounter: () => dispatch( { type: actionTypes.SUBTRACT, val: 8 } ),
        onStoreResults: (res) => dispatch( { type: actionTypes.STORE_RESULT,  result: res } ),
        onDeleteResults: (id) => dispatch( { type: actionTypes.DELETE_RESULT, resultElId: id } )
    }; 
}

export default connect(mapStateToProps, mapDispatchToProps )(Counter);