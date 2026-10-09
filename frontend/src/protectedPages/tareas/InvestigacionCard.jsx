import styles from "./investigacioncard.module.css";
import { useState } from "react";

const InvestigacionCard = ({ numero, tipo, estado, fecha_inicio, fecha_fin, descripcion, archivos, id, cerrarInvestigacion }) => {

    const [show, setShow] = useState(false);

    const completarInvestigacion = (id)=> {
        cerrarInvestigacion(id)
        setShow(false);
    }
    
    return (
        <div className={styles.investigacionCard}>
            <div className={styles.cardContainer}>
                <p>{numero}</p>
                <div>
                    <b>Tipo:</b>
                    <p>{tipo}</p>

                </div>
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
                <button onClick={()=>completarInvestigacion(id)} className={styles.btnCerrar} disabled={estado==="completada"}>Completar</button> 
                </div>
            </div>

            {show &&
                <>
                <hr />
                <div className={styles.contentContainer}>
                    <b>Descripción:</b>
                    <p>{descripcion}</p>
                    {archivos && <img src={archivos} alt={`Imagen Investigacion`} />}
                </div>
                </>
            }


        </div>
    )

}

export default InvestigacionCard;