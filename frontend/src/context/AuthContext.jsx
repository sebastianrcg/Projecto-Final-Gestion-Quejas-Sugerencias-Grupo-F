import { useState, createContext, useContext, useEffect } from "react";
import axios from "../axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const signOut = async () => {
        await axios.post("http://localhost:5000/auth/logout");
        setSession(null);
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/session");
                setSession({
                    user: response.data.user,
                    token: response.data.token
                })


            } catch (err) {
                setSession(null)
            } finally {
                setLoading(false)
            }
        }
        checkSession()
    }, []);

    return (
        <AuthContext value={{session, loading, setSession, signOut}}>
            {children}
        </AuthContext>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
