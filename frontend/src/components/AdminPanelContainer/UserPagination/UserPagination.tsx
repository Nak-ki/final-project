import { Pagination } from "@mui/material";
import { useAppUserPagination } from "../../../hooks/useAppUserPagination";



const UserPagination = () => {

    const {pages, page, handleChange} = useAppUserPagination()



    return (
        <div>
            {
                pages !== 1  &&  <Pagination size={"medium"} count={pages} page={+page} boundaryCount={1} siblingCount={2} onChange={handleChange}/>

            }
        </div>
    );
};

export { UserPagination };
