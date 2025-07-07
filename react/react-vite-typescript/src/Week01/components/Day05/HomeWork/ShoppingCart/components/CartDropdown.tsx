import React from 'react'
import styles from '../styles/CartDropdown.module.css'
import { useCart } from '../context/CartContext';

type Props = {}

export default function CartDropdow({}: Props) {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + " ₫";

  return (
    <div className={styles.dropdown}>
      <h3>🛒 Giỏ hàng</h3>
      {cart.length === 0 ? (
        <p>Chưa có sản phẩm nào.</p>
      ) : (
        <>
          <ul className={styles.itemList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.controls}>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <div className={styles.price}>
                    {formatPrice(item.price * item.quantity)}
                </div>
                <button
                  className={styles.remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            Tổng cộng: {formatPrice(getTotalPrice())}
          </div>
          <button className={styles.viewCart}>Xem giỏ hàng</button>
        </>
      )}
    </div>
  )
}