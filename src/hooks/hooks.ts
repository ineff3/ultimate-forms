import { useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export const useData = () => {
    return useContext(DataContext)
}