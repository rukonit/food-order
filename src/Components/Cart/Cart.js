import Modal from '../UI/Modal';
import styles from './Cart.module.css'

const Cart = props => {
    const cartItems = <ul className={styles['cart-items']}>{[{id: 'c1', name: 'Sushi', amont: 2, price: 12}]
    .map(item => <li>{item.name}</li>)}</ul>;

    return (
        <Modal onHideCart={props.onHideCart}>
       
            <div className={styles.total}>
                {cartItems}
                <span>Total Amount</span>
                <span>35.2</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button-alt']} onClick={props.onHideCart}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart;