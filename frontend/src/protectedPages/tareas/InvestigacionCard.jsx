import styles from "./investigacioncard.module.css";

const InvestigacionCard = ({id, tipo, estado, fecha_inicio, fecha_fin, descripcion, archivos}) => {
    return (
        <div className={styles.investigacionCard}>
            <p>{id}</p>
            <p>{tipo}</p>
            <p>{estado}</p>
            <p>{fecha_inicio.split("T")[0]} - {fecha_inicio.split("T")[1].split(".")[0]}</p>
            <p>{fecha_fin}</p>
            <p>{descripcion}</p>
            {archivos && <img src={archivos} alt={`Imagen Investigacion`} />}

        </div>
    )

}

export default InvestigacionCard;