import styles from "./accionescorrectivascard.module.css";
import { useState } from "react";

const AccionesCorrectivasCard = ({numero, estado, fecha_inicio, fecha_fin, descripcion, resultado, archivos, id, cerrarAccionCorrectiva}) => {

    const [show, setShow] = useState(false);

    const completarAccionCorrectiva = (id) => {
        cerrarAccionCorrectiva(id);
        setShow(false);
    }

    return(
        <div className={styles.accionCard}>
                    <div className={styles.cardContainer}>
                        <p>{numero}</p>
                        
                        <div>
                            <b>Estado:</b>
                            <p>{estado}</p>
                        </div>
                        <div>
                            <b>Fecha Inicio</b>
                            <p>{fecha_inicio.split("T")[0]} - {fecha_inicio.split("T")[1].split(".")[0]}</p>
                        </div>
                        <div>
                            <b>Fecha Fin</b>
                            <p>{fecha_fin ? `${fecha_fin.split("T")[0]} - ${fecha_fin.split("T")[1].split(".")[0]}` : "abierta"}</p>
                        </div>
                        
                        <div>
                        <button onClick={()=>setShow(!show)} className={styles.btnVer}>{show ? "Cerrar" : "Expandir"}</button>
                        <button className={styles.btnCerrar} disabled={estado==="completada"} onClick={()=> completarAccionCorrectiva(id)}>Completar</button> 
                        </div>
                    </div>
        
                    {show &&
                        <>
                        <hr />
                        <div className={styles.contentContainer}>
                            <b>Descripción:</b>
                            <p>{descripcion}</p>
                            <b>Resultado:</b>
                            <p>{resultado}</p>
                            {archivos && <img src={archivos} alt={`Imagen Investigacion`} />}
                        </div>
                        </>
                    }
        
        
                </div>
    )
}

export default AccionesCorrectivasCard; 