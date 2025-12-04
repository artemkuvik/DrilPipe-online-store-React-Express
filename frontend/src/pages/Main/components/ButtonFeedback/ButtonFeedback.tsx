import feedback from "../../../../images/icons/contact.svg";
import styles from "./ButtonFeedback.module.css";

interface ButtonFeedbackProps {
   onClick: () => void
}

export default function ButtonFeedback({onClick}:ButtonFeedbackProps) {
  return (
    <button className={styles.button} onClick={onClick}>
     <img className={styles.img} src={feedback} alt="feedback" />
    </button>
  );
}