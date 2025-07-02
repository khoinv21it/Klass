import styles from './GetStartedButton.module.css';
import { ArrowRight } from 'lucide-react';
const GetStartedButton = () => {
    return (
        <button className={styles.button}>
            <span>Get Started</span>
            <ArrowRight className={styles.arrow} />
        </button>
    );
    }

export default GetStartedButton;