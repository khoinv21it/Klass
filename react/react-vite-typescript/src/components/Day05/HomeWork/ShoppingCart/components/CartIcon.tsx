import React from 'react'
import styles from '../styles/CartIcon.module.css'
import { useCart } from '../context/CartContext';

type Props = {
  toggleDropdown: () => void;
}

export default function CartIcon({toggleDropdown}: Props) {
  const { getTotalItems } = useCart();

  return (
    <div className={styles.cartIcon} onClick={toggleDropdown}>
      🛒
      <span className={styles.badge}>{getTotalItems()}</span>
    </div>
  );
}