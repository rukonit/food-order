import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef()


  const formHandler = (event) => {
    event.preventDefault();

    const amount = amountInputRef.current.value;
    const amountNumber =+ amount;

    if (amount.trim().legth === 0 || amountNumber < 1 || amountNumber > 5) {
      setAmountIsValid(false)
      return;
    }

    props.onAddToCart(amountNumber);

  }
  return (
    <form className={classes.form} onSubmit={formHandler}>
      <Input 
        ref = {amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;