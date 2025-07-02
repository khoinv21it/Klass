import styles from './GetAppleButton.module.css';
import { Apple } from 'lucide-react'
const GetAppleButton = () => {
    return (
        <button className={styles.button}>
            <Apple className={styles.apple} />
            <span>Continue with Apple</span>
        </button>
    );
    }

export default GetAppleButton;