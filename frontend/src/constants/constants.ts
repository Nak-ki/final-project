const baseURL = "http://localhost:7000";

const auth = "/auth";
const orders ="/orders";
const comments ="/comments";
const groups ="/groups";
const users ="/users";

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
        downloadExcel: (query: string) => `${orders}/download-excel${query}` ,
        getStatistics: `${orders}/statistics`,
    },
    comments: {
        create: (id: string) => `${comments}/${id}`,
    },
    groups: {
        create: groups,
        getAll: groups,
    },
    users: {
        getAll: (query: string) => users + query,
        create: users,


    }


}

export { baseURL, urls };