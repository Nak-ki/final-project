const baseURL = "http://localhost:7000";

const auth = "/auth";
const orders ="/orders";
const comments ="/comments";
const groups ="/groups";

const urls = {
    auth: {
        login: `${auth}/sign-in`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`,
        logout: `${auth}/logout`,
    },
    orders: {
        getAll:  (query: string) => orders + query,
        update:  (id: string) => `${orders}/${id}`,
    },
    comments: {
        create: (id: string) => `${comments}/${id}`,
    },
    groups: {
        create: groups,
        getAll: groups,
    }


}

export { baseURL, urls };