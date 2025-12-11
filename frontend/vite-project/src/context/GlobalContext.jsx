import { createContext } from "react";

export const GlobalContext = new createContext();

function ContextProvider({children}){
    

   

    return (
        <GlobalContext.Provider value = {{
           
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextProvider;