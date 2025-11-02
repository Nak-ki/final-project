import { Pagination } from "@mui/material";
import { useAppPagination } from "../../../hooks/useAppPagination";
import "./OrderPagination.css"


const OrderPagination = () => {

    const {pages, page, handleChange} = useAppPagination()



    return (
        <div>
            {
             pages > 1 && pages >= 20 &&  <Pagination size={"medium"} count={pages} page={+page} boundaryCount={1} siblingCount={2} onChange={handleChange}/>
            }
        </div>
    );
};

export { OrderPagination };
