
import { createContext, FC, PropsWithChildren, useState } from "react";
import { ISetState } from "../types/setStateType";

interface IProps extends PropsWithChildren{

}

const Context = createContext<{dropdownOrder: string, setDropdownOrder: ISetState<string>}>(null)

const DropdownOrderContext:FC<IProps>  = ({children}) => {
    const [dropdownOrder, setDropdownOrder] = useState<string>(null);



    return (<Context.Provider value={{dropdownOrder, setDropdownOrder}}>{children}</Context.Provider>)
};

export {Context, DropdownOrderContext};