import styles from "./homeapp.module.css";
import { useState, useEffect } from "react";
import axios from "../../axiosConfig"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Cell, Text } from 'recharts';
// import { generateMockData, RechartsDevtools } from '@recharts/devtools';



const HomeApp = () => {

    const [stats1, setStats1] = useState({});
    const [stats2, setStats2] = useState({})

    useEffect(() => {
        const getStats1 = async () => {

            try {
                const response = await axios.get("http://localhost:5000/analytics/stats1");
                setStats1(response.data.stats);

            } catch (error) {

            }
        }

        const getStats2 = async () => {
            try {
                const response = await axios.get("http://localhost:5000/analytics/stats2");
                setStats2(response.data);
            } catch (error) {

            }
        }

        getStats1()
        getStats2()

    }, []);

    const data = [
        { label: "abiertas", cantidad: stats1.total_abiertas, color: "#3b82f6" }, 
        { label: "cerradas", cantidad: stats1.total_cerradas, color: "#ef4444" }, 
        { label: "registradas", cantidad: stats1.total_registradas, color: "#10b981" }, 
        { label: "En proceso", cantidad: stats1.total_proceso, color: "#8b5cf6" }, 
        {label: "Por Verificar", cantidad: stats1.total_verificar, color: "#f59e0b"}];

    const data2 = [
        { label: "Defectos de\n Productos", cantidad: stats2.defectosProductos, color: "#ef4444" },
        { label: "Problema de Proceso", cantidad: stats2.problemaProceso, color: "#3b82f6" },
        { label: "Distribución y Logistica", cantidad: stats2.distribucionLogistica, color: "#10b981" },
        { label: "Atención al Cliente", cantidad: stats2.atencionCliente, color: "#f59e0b" },
        { label: "Cumplimiento y Normas", cantidad: stats2.cumplimientoNormas, color: "#dbd814" },
        { label: "Otra", cantidad: stats2.otra, color: "#8b5cf6" }];


    return (
        <>
            <h3 className={styles.title}>Dashboard</h3>

            <div className={styles.dashboard}>
                <div className={styles.data}> <p className={styles.dashboardTitle}>Abiertas</p> <p style={{ color: "#3b82f6", fontWeight: "bold", fontSize: "28px" }}>{stats1.total_abiertas}</p></div>

                <div className={styles.data}><p className={styles.dashboardTitle}>Cerradas</p>
                    <p style={{ color: "#ef4444", fontWeight: "bold", fontSize: "28px" }}>{stats1.total_cerradas}</p>
                </div>
                <div className={styles.data}> <p className={styles.dashboardTitle}>Registradas</p><p style={{ color: "#10b981", fontWeight: "bold", fontSize: "28px" }}>{stats1.total_registradas}</p>
                </div>

                <div className={styles.data}><p className={styles.dashboardTitle}>En Proceso</p>
                    <p style={{ color: "#8b5cf6", fontWeight: "bold", fontSize: "28px" }}>{stats1.total_proceso}</p>
                </div>

                <div className={styles.data}><p className={styles.dashboardTitle}>Por Verificar</p><p style={{ color: "#f59e0b", fontWeight: "bold", fontSize: "28px" }}>{stats1.total_verificar}</p></div>
            </div>

            <div className={styles.chart}>
                <h4 className={styles.chartTitle}>Estado de Quejas</h4>
                <BarChart
                    style={{ width: '75%', maxWidth: '650px', maxHeight: '50vh', aspectRatio: 1 }}
                    responsive
                    data={data}

                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}>

                    <CartesianGrid />
                    <XAxis dataKey="label" />
                    <YAxis width="auto" domain={["auto", "auto"]} />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="cantidad" label={{ position: "top", fill: "#000000", fontWeight: "bold" }} radius={[10, 10, 0, 0]}  >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Bar>
                    {/* <RechartsDevtools /> */}
                </BarChart>
            </div>

            <div className={styles.chart}>
                <h4 className={styles.chartTitle}>Tipos de Quejas</h4>
                <BarChart
                    style={{ width: '85%', maxWidth: '750px', maxHeight: '50vh', aspectRatio: 1 }}
                    responsive
                    data={data2}

                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}>

                    <CartesianGrid />
                    <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                    <YAxis width="auto" domain={["auto", "auto"]} />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="cantidad" label={{ position: "top", fill: "#000000", fontWeight: "bold" }} radius={[10, 10, 0, 0]} >
                        {data2.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Bar>
                    {/* <RechartsDevtools /> */}
                </BarChart>
            </div>
        </>
    )
}

export default HomeApp;