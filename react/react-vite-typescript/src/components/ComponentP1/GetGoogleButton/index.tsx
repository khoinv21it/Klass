import styles from './GetGoogleButton.module.css';
import { Chrome  } from 'lucide-react';
const GetGoogleButton = () => {
    return (
        <button className={styles.ggbtn}>
            <Chrome   className={styles.google} />
            <span>Continue with Google</span>
        </button>
    );
    }

export default GetGoogleButton;