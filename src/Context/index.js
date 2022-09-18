import { createContext,useContext } from "react";

const MainContext = createContext()
const DetailContext = createContext()
export{
    DetailContext,
    MainContext,
    useContext
} 