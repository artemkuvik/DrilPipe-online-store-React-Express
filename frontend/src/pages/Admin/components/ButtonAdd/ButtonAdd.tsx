import styles from "./ButtonAdd.module.css";

export default function ButtonAdd({children, onClick}: {children: React.ReactNode, onClick: () => void}) {
  return <button onClick={onClick} className={styles.button}>{children}</button>;
}