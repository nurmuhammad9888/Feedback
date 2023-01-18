import axios from "axios";
import {createContext, useEffect, useState} from "react";

export const UserContext = createContext()
const token = localStorage.getItem("token")

export const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9090/user/get", {headers:{
            token
        }})
        .then(res => {
            if(res.status === 200){
                setUser(res.data)
            }})
        .catch(err => console.log(err))
    }, [])

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}