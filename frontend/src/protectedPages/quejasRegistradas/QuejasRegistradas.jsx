import styles from "./quejasregistradas.module.css";
import { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {useAuth } from "../../context/AuthContext"

import { useSearchParams } from "react-router-dom";
 

const QuejasRegistradas = () => {

    const [quejas, setQuejas] = useState([]);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const [asignada, setAsignada] = useState(false);
    
    const [searchParams, setSearchParams] = useSearchParams();


    const pagina = parseInt(searchParams.get("pagina")) || 1;
    const limite = parseInt(searchParams.get("limite")) || 20;
    const categoria = searchParams.get("categoria") || "";
    const estado = searchParams.get("estado") || "";
    const orden = searchParams.get("orden") || "ASC";
    
    
    // const [limite, setLimite] = useState(20);
    // const [pagina, setPagina] = useState(1);

    const {session} = useAuth();

    const asignarQueja = async (quejaId, usuarioId) => { 
        // id de queja, usuarioId
        // cambiar estado de queja con el ID a asignada, cambiar asignada a true, agregar id de usuario
        try{
            const response = await axios.put(`http://localhost:5000/quejas/asignar/${quejaId}`, {usuarioId});
            setAsignada(true)

        } catch (error) {

        }

    }

    const navigate = useNavigate();

    const topPageRef = useOutletContext();

    const setParams = (nuevaPagina, nuevoLimite = limite, nuevoOrden = orden,nuevaCategoria = categoria, nuevoEstado = estado) => {
        setSearchParams({pagina: nuevaPagina, limite: nuevoLimite, orden: nuevoOrden,categoria: nuevaCategoria, estado: nuevoEstado});
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

    const cambiarCategoria = (event) => {
        const nuevaCategoria = event.target.value;
        setParams(1, limite, orden, nuevaCategoria , estado);
    }

    const cambiarEstado = (event) => {
        const nuevoEstado = event.target.value;
        setParams(1, limite, orden, categoria, nuevoEstado);
    }

    const cambiarOrden = (event) => {
        const nuevoOrden = event.target.value;
        setParams(1, limite, nuevoOrden, categoria, estado)
    }


    useEffect(() => {

        setAsignada(false)

        const getQuejas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/quejas?pagina=${pagina}&limite=${limite}&categoria=${categoria}&estado=${estado}&orden=${orden}`);

                if (response.data.quejas) {
                    setQuejas(response.data.quejas)
                    setTotalPaginas(response.data.totalPaginas)
                }
            } catch (error) {

            }
        } 
        getQuejas();
        topPageRef.current.scrollTo({ top: 0, behavior: "instant" });
    }, [pagina, limite, orden,categoria, estado, asignada]) 

    return (
        <>

            <h3 className={styles.title}>Quejas</h3>

            <div className={styles.filtros}>
                
                <div className={styles.filtrosContainer}>

                <select className={styles.filtros1} value={categoria} onChange={cambiarCategoria} title="Filtrar quejas por categoria">
                    <option value="" selected>Todas las Categorias</option>
                    <option value="defectosProducto">Defecto de Productos</option>
                    <option value="problemaProceso">Problemas de Proceso</option>
                    <option value="distribucionLogistica">Distribución y Logistica</option>
                    <option value="atencionCliente">Atencion al Cliente</option>
                    <option value="cumplimientoNormas">Cumplimiento y Normas</option>
                    <option value="otra">Otras</option>
                </select>

                <select title="Filtrar quejas por estado" className={styles.filtros1} value={estado} onChange={cambiarEstado}>
                    <option value="">Todos los Estados</option>
                    <option value="registrada">Registradas</option>
                    <option value="asignada">Asignadas</option>
                    <option value="trabajando">En Proceso</option>
                    <option value="verificacion">Por Verificar</option>
                </select>
                </div>

                <div className={styles.filtrosContainer}>
                <select title="Orden de Fecha de Creacion" value={orden} onChange={cambiarOrden}>
                    <option value="DESC">Fecha Decendiente</option>
                    <option value="ASC" selected>Fecha Ascendiente</option>
                </select>

                <select  title="Numero de Registros por Pagina" value={limite} onChange={cambiarLimite}>
                    <option value={10}>10</option>
                    <option value={20} selected>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                </select>
                </div>
            </div>

            <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <th>ID</th>
                    <th>Solicitante</th>
                    <th>Tipo de Queja</th>
                    <th>Estado</th>
                    <th>Fecha de Creacion</th>
                    <th>Acciones</th> 
                </thead>
                <tbody>
                    {quejas.map(queja => {
                        return ( 
                            <tr> 
                                <td>{queja.id}</td>
                                <td>{queja.nombre}</td>
                                <td>{queja.tipoqueja}</td>
                                <td><span className={`${styles.estado} ${styles[queja.estado]}`}>{queja.estado}</span></td>
                                <td>{queja.fechacreacion.split("T")[0]} - {queja.fechacreacion.split("T")[1].split(".")[0]}</td>
                                <td><div className={styles.acciones}><button onClick={() => navigate(`/app/quejas/${queja.id}`)} className={styles.btnVer}>Ver</button> <button className={styles.btnAsignar} onClick={()=> asignarQueja(queja.id, session.user.id)} disabled={queja.estado === "asignada" || queja.estado === "trabajando" || queja.estado === "verificacion"}>Asignar</button></div></td>
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

        </>
    )
}

export default QuejasRegistradas;