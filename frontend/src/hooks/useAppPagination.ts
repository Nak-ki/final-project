import { useAppSelector } from "./useAppSelector";
import { useSearchParams } from "react-router-dom";

const useAppPagination = () => {

    const {total, limit} = useAppSelector(state => state.order);
    const [query, setQuery] = useSearchParams({page: "1"})

    const page = query.get("page")

    const pages = Math.ceil(total / limit)

    return {
        page,
        pages,
        handleChange: (event: React.ChangeEvent<unknown>, value: number) => {
            setQuery(prev => {
                prev.set('page', (value).toString())
                return prev
            })
        }
    }
};

export {useAppPagination}