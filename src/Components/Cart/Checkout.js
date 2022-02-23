import React, { useRef, useState } from 'react'
import styles from './Checkout.module.css'

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    });

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const cityInputRef = useRef()
    const postalInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalIsValid = isFiveChars(enteredPostal)

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })
        const isFormValid = enteredNameIsValid && 
                            enteredStreetIsValid &&
                            enteredCityIsValid &&
                            enteredPostalIsValid

    if(!isFormValid) {
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postal: enteredPostal
    })

    } 

    const nameControlClasses = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`
    const streetControlClasses = `${styles.control} ${formInputValidity.street ? '' : styles.invalid}`
    const cityControlClasses = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`
    const postalControlClasses = `${styles.control} ${formInputValidity.postal ? '' : styles.invalid}`
 
 
    return (
    <div>
        <form onSubmit={submitHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type="text" id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>Please entere a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type="text" id='street' ref={streetInputRef}></input>
                {!formInputValidity.street && <p>Please entere a valid street</p>}
            </div>
            <div className={cityControlClasses }>
                <label htmlFor='city'>City</label>
                <input type="text" id='city' ref={cityInputRef}></input>
                {!formInputValidity.city && <p>Please entere a valid city</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type="text" id='postal' ref={postalInputRef}></input>
                {!formInputValidity.postal && <p>Please entere a valid postal code</p>}
            </div>
            <div className={styles.actions}>
            <button type='button' onClick={props.onHideCart}>Cancel</button>
            <button>Confirm</button>
            </div>
        </form>
    </div>
  )
}

export default Checkout