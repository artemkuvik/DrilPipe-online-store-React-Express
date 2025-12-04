import styles from "./ModalApplicationsOrFeedback.module.css"
import { addApplication } from "../../../http/applicationsAPI";
import { useState } from "react";   
import {  MouseEvent } from "react";
import { addFeedback } from "../../../http/feedbackAPI";
import { CreateApplicationDto, CreateFeedbackDto } from "../../../types/types";

interface ModalApplicationsOrFeedbackProps {
    onClose: () => void;
    serviceId?: number
    applicationsOrFeedback?:boolean
}

export default function ModalApplicationsOrFeedback({ onClose, serviceId = 0, applicationsOrFeedback = false }: ModalApplicationsOrFeedbackProps) {
    const [issueText, setIssueText] = useState("");

    
    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            if (applicationsOrFeedback) {
                const applicationData: CreateApplicationDto = {
                service_id: serviceId,
                date: new Date(),
                status: "В обработке",
                issue: issueText
            };
            
            await addApplication(applicationData);
            alert("Заявка отправлена");
            onClose();
            } else if (!applicationsOrFeedback) {
                const feedbackData: CreateFeedbackDto = {
                    feedback_text: issueText,
                    feedback_date: new Date()
                }
                await addFeedback(feedbackData);   
                alert("Заявка отправлена");
                onClose();
            }
        } catch (error: any) {
            console.error("Ошибка при отправке:", error);
            if (error.response?.status === 401) {
                alert("Вы не авторизованы. Пожалуйста, войдите в систему.");
            } else {
                alert("Произошла ошибка при отправке. Попробуйте позже.");
            }
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal_applications}>
                <button className={styles.close_button} onClick={onClose}>×</button>
                {applicationsOrFeedback && <div className={styles.modal_applications_title}>Если у вас есть вопросы по услуге</div> }
                {applicationsOrFeedback && <div className={styles.modal_applications_subtitle}>(необязательно)</div>}
                {!applicationsOrFeedback && <div className={styles.modal_applications_title}>Если у вас есть вопросы, оставьте сообщение</div>}
                <form className={styles.modal_applications_form} onSubmit={handleSubmit}>
                    <textarea className={styles.modal_applications_input} value={issueText} onChange={(e) => setIssueText(e.target.value)} />
                    <button className={styles.module_button}>Оставить заявку</button>
                </form>
            </div>
        </div>
    )
}
