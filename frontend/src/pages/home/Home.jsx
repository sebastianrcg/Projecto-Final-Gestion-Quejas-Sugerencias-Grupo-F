import styles from "./home.module.css";

import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className={styles.hero}>
                <h1 className={styles.title}>Sistema de Gestión de Quejas y Acciones Correctivas (CAPA)</h1>
                <h2>Centraliza tus reclamos, investiga causas raíz y asegura la calidad de tus productos.</h2>

                <p>Tu voz importa. Registra tus quejas y haz seguimiento en tiempo real.</p>
                <p>Centraliza la recepción de reclamos, automatiza la ivestigacion de causa raíz y gestiona planes de acción correctiva para evitar la recurrencia de fallas.</p>

                <div className={styles.heroBtns}>
                    <button onClick={()=> navigate('/reportarQuejas')} className={`${styles.heroButton} ${styles.primaryButton}`}>Registrar Queja</button>
                    <button onClick={()=> navigate('/tracking')}className={`${styles.heroButton} ${styles.secondaryButton}`}>Consultar Estado</button>
                </div>
            </div>

            {/* Agregar seccion de beneficios, quizas un footer */}
        </>
    )
}

export default Home;