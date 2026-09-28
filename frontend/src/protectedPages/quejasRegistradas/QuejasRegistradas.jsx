import styles from "./quejasregistradas.module.css";
import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


const QuejasRegistradas = () => {

    const [quejas, setQuejas] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [limite, setLimite] = useState(20);

    const navigate = useNavigate();

    const topPageRef = useOutletContext(); 

    

    useEffect(() => {

        const getQuejas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quejas?pagina=${pagina}&limite=${limite}`);

                if (response.data.quejas) {
                    setQuejas(response.data.quejas)
                    setTotalPaginas(response.data.totalPaginas)
                }

            } catch (error) {

            }
        }
        getQuejas();
        topPageRef.current.scrollTo({ top: 0, behavior: "instant" });
    }, [pagina])

    const siguientePagina = () => {
        setPagina(pagina + 1);
        

    }

    const paginaAnterior = () => {
        setPagina(pagina - 1);
        
    }

    return (
        <>
            <div>
            <h3   className={styles.title}>Quejas</h3>

            <div >
            <table className={styles.table}>
                <thead>
                    <th>Solicitante</th>
                    <th>Tipo de Queja</th>
                    <th>Estado</th>
                    <th>Fecha Creacion</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {quejas.map(queja => {
                        return (
                            <tr>
                                <td>{queja.nombre}</td>
                                <td>{queja.tipoqueja}</td>
                                <td>{queja.estado}</td>
                                <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                <td><div className={styles.acciones}><button onClick={() => navigate(`/app/quejas/${queja.id}`)}>Ver</button> <button>Asignar</button></div></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>

            <div className={styles.pageBtns}>
                <button disabled={pagina === 1}
                    onClick={paginaAnterior}>Prev</button>
                <span>{pagina} / {totalPaginas}</span>
                <button disabled={pagina === totalPaginas} onClick={siguientePagina}>Next</button>
            </div>
            </div>
        </>
    )
}

export default QuejasRegistradas;