import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import styles from './Cart.module.css'
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = props => {

    const [isSubmiting, setIsSubmitting] = useState(false)

    const [isCheckout, setIsCheckout] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const  submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await axios.post('https://food-order-backend-c480a-default-rtdb.firebaseio.com/orders.json', {
            user: userData,
            orderedItems: cartCtx.items
        })
        setIsSubmitting(false);
        setDidSubmit(true)
        cartCtx.clearCart()
    }



    const cartItems = <ul className={styles['cart-items']}>{cartCtx.items
    .map(item => 
                <CartItem key={item.id} name={item.name} amount={item.amount} price = {item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd ={cartItemAddHandler.bind(null, item)}
                />
                )}</ul>;

 

   
   const modalActions = <div className={styles.actions}>
                        <button className={styles['button-alt']} onClick={props.onHideCart}>Close</button>
                        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
                        </div>

    const isSubmittingModalContent = <p>Sending order data... </p>
   const didSubmitModalContent = <div><p>Successfully sent the order! </p>
   <div className={styles.actions}>
     <button className={styles['button']} onClick={props.onHideCart}>Close</button>
             </div>
        </div>

    const cartModalContent = <div>
                            {cartItems}
                            <div className={styles.total}>
                            
                                <span>Total Amount</span>
                                <span>{totalAmount}</span>
                            </div>
                            {isCheckout && <Checkout onConfirm={submitOrderHandler} onHideCart={props.onHideCart} />}
                            {!isCheckout && modalActions}
                            
                            </div>

    return (
        <Modal onHideCart={props.onHideCart}>
         {!isSubmiting && !didSubmit && cartModalContent}
             {isSubmiting && isSubmittingModalContent}
             {!isSubmiting && didSubmit && didSubmitModalContent}
           
        </Modal>
    )
}

export default Cart;