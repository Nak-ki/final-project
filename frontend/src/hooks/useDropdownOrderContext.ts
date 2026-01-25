import {useContext} from "react";
import { Context } from "../hoc/DropdownOrderContext";


const useDropdownOrderContext = () => useContext(Context);

export {
    useDropdownOrderContext
}