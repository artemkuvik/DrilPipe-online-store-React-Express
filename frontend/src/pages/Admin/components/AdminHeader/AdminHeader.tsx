import styles from "./AdminHeader.module.css";

export default function AdminHeader({ children }: { children: React.ReactNode }) {
    return (
       <div className={styles.header}>
        {children}
      </div>
    )
}