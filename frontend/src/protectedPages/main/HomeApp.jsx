import styles from "./homeapp.module.css";
import { useState, useEffect } from "react";
import axios from "../../axiosConfig"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Cell } from 'recharts';
// import { generateMockData, RechartsDevtools } from '@recharts/devtools';



const HomeApp = () => {

    const [stats1, setStats1] = useState({});

    useEffect(() => {
        const getStats1 = async () => {

            try {
                const response = await axios.get("http://localhost:5000/analytics/stats1");
                setStats1(response.data.stats);
            } catch (error) {

            }
        }

        getStats1()

    }, [])

    const data = [{label: "abiertas", cantidad: stats1.total_abiertas, color: "#3b82f6"},{label: "registradas", cantidad: stats1.total_registradas , color: "#10b981" },  {label: "cerradas", cantidad: stats1.total_cerradas, color: "#ef4444"}, {label: "En proceso", cantidad: stats1.total_proceso , color: "#8b5cf6"}, {label: "Por Verificar", cantidad: stats1.total_verificar, color: "#f59e0b"
    }];


    return (
        <>
            <h3 className={styles.title}>Dashboard</h3>

            <div className={styles.dashboard}>
                <div className={styles.data}> <p>Abiertas</p> <p>{stats1.total_abiertas}</p></div>
                <div className={styles.data}> <p>Registradas</p><p>{stats1.total_registradas}</p></div>
                <div className={styles.data}><p>Cerradas</p><p>{stats1.total_cerradas}</p></div>
                <div className={styles.data}><p>En Proceso</p>{stats1.total_proceso}</div>
                <div className={styles.data}><p>Por Verificar</p><p>{stats1.total_verificar}</p></div>
            </div>

            <div className={styles.chart}>
                <BarChart
                    style={{ width: '80%', maxWidth: '600px', maxHeight: '50vh', aspectRatio: 1 }}
                    responsive
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                    
                >
                    
                    <CartesianGrid />
                    <XAxis dataKey="label" />
                    <YAxis width="auto" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" radius={[10, 10, 0, 0]} > 
                        {data.map((entry, index)=> (
                            <Cell key={index} fill={entry.color}/>
                        ))}
                    </Bar>
                    {/* <RechartsDevtools /> */}
                </BarChart>

            </div>
        </>
    )
}

export default HomeApp;