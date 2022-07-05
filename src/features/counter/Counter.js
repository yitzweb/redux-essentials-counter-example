import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,         // YR: action creator
  increment,         // YR: action creator
  incrementByAmount, // YR: action creator
  incrementAsync, //YR:thunk = (amount)=>(dispatch)=>{setTimeout(()=>{dispatch(incrementByAmount(amount))},1000)}
  selectCount, //YR:selector = (state) => state.counter.value
} from './counterSlice';
import styles from './Counter.module.css'; //YR: css module

export function Counter() {
  const count = useSelector(selectCount); //YR: get back what selectCount(state) returns
  const dispatch = useDispatch();  // YR: needed to be able to dispatch an action with an actionCreator function
  const [incrementAmount, setIncrementAmount] = useState('2'); //YR:question - why '2' and not 2 ?

  return (
    <div>
      <div className={styles.row}>  {/*YR: use the css module identified by styles variable*/}
        <button
          className={  styles.button    /* YR: use the css module identified by styles variable */ }
          aria-label="Increment value"
          onClick={() => dispatch(increment())  /*YR:dispatch the action returned from the actionCreator function */}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>  {/*YR: count is returned from useSelector(selectCount)*/}
                                                       {/*YR: use the css module identified by styles variable*/}
        <button
          className={styles.button}     // YR: use the css module identified by styles variable 
          aria-label="Decrement value"  // label an interactive element (ARIA=Accessible Rich Internet Applications)
          onClick={() => dispatch(decrement())} //YR:dispatch the action returned from the actionCreator function
        >
          -
        </button>
      </div>
      <div className={styles.row}>  {/* YR: use the css module identified by styles variable */}
        <input
          className={styles.textbox}  // YR: use the css module identified by styles variable
          aria-label="Set increment amount"  // label an interactive element (ARIA=Accessible Rich Internet Applications)
          value={incrementAmount}   //YR:useState variable
          onChange={e => setIncrementAmount(e.target.value)}  //YR: useState setter
        />
        <button
          className= {styles.button /* YR: use the css module identified by styles variable */
          }
          onClick={() =>    /*YR: in JSX, onClick has a function, not a string with a function call*/
            dispatch(incrementByAmount(Number(incrementAmount) || 0))  /*YR:dispatch the action returned from the actionCreator function*/
          }
        >
          Add Amount
        </button>

        {/* YR: I think this button should also have an aria-label */}
        <button
          className={  styles.asyncButton }   // YR: use the css module identified by styles variable
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
