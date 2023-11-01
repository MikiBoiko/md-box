import { createContext } from "react"
import { Directory, ElementQuery } from "../types/files"

type appContextType = {
    logged: boolean | undefined
    system: Directory | undefined,
    file: string,
    setFile: (state: string) => void
}

const appContext = createContext<appContextType>({
    logged: undefined,
    system: undefined,
    file: '',
    setFile: () => { }
})

export default appContext