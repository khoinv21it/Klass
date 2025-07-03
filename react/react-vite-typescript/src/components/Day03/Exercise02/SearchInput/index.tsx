import styles from "./SearchInput.module.css";

type SearchInputProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  boldPlaceholder?: boolean;
};

export const SearchInput = ({
  leftIcon,
  rightIcon,
  placeholder,
  boldPlaceholder,
}: SearchInputProps) => {
  return (
    <div className={styles.container}>
      {leftIcon && <div className={styles.icon}>{leftIcon}</div>}
      <input
        className={`${styles.input} ${
          boldPlaceholder ? styles.boldPlaceholder : ""
        }`}
        placeholder={placeholder}
      />
      {rightIcon && <div className={styles.icon}>{rightIcon}</div>}
    </div>
  );
};
