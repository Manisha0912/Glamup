import {createContext} from "react";
import {beautician} from "../assets/assets"
import Beautician from "../pages/Beautician";


export const AppContext=createContext()
const AppContextProvider = (props) => {
 
    const value={
        beautician

    }
  return (
    <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
  )
}

export default AppContextProvider