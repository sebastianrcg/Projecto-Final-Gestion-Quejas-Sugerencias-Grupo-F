import styles from "./quejasregistradas.module.css";
import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import { useSearchParams } from "react-router-dom";


const QuejasRegistradas = () => {

    const [quejas, setQuejas] = useState([]);
    const [totalPaginas, setTotalPaginas] = useState(0);
    
    const [searchParams, setSearchParams] = useSearchParams();


    const pagina = parseInt(searchParams.get("pagina")) || 1;
    const limite = parseInt(searchParams.get("limite")) || 20; 
    
    
    // const [limite, setLimite] = useState(20);
    // const [pagina, setPagina] = useState(1);

    const navigate = useNavigate();

    const topPageRef = useOutletContext();

    const setParams = (nuevaPagina, nuevoLimite = limite) => {
        setSearchParams({pagina: nuevaPagina, limite: nuevoLimite});
    }

    

    const irPagina = (nuevaPagina) => {
        setParams(nuevaPagina)
    }
    const siguientePagina = () => {
        irPagina(pagina + 1);
    }

    const paginaAnterior = () => {
        irPagina(pagina - 1);
    }

    const cambiarLimite = (event) => {
        const nuevoLimite = parseInt(event.target.value);
        setParams(1, nuevoLimite);
    }


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
    }, [pagina, limite])

    return (
        <>

            <h3 className={styles.title}>Quejas</h3>

            <div className={styles.filtros}>
                <p>Barra de filtros</p>
                <select  title="Numero de Registros" value={limite} onChange={cambiarLimite}>
                    <option value={10}>10</option>
                    <option value={20} selected>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
            </div>

            <table className={styles.table}>
                <thead>
                    <th>ID</th>
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
                                <td>{queja.id}</td>
                                <td>{queja.nombre}</td>
                                <td>{queja.tipoqueja}</td>
                                <td>{queja.estado}</td>
                                <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                <td><div className={styles.acciones}><button onClick={() => navigate(`/app/quejas/${queja.id}`)} className={styles.btnVer}>Ver</button> <button className={styles.btnAsignar}>Asignar</button></div></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            <div className={styles.pageBtns}>
                <button disabled={pagina === 1}
                    onClick={paginaAnterior}>Prev</button>
                <span>{pagina} / {totalPaginas}</span>
                <button disabled={pagina === totalPaginas} onClick={siguientePagina}>Next</button>
            </div>

        </>
    )
}

export default QuejasRegistradas;