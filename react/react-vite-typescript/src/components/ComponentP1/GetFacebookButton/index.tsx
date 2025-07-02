import styles from './GetFacebookButton.module.css';
import { Facebook } from 'lucide-react'
const GetFacebookButton = () => {
    return (
        <button className={styles.fbbtn}>
            <Facebook className={styles.facebook} />
            <span>Continue with Facebook</span>
        </button>
    );
    }

export default GetFacebookButton;