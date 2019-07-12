import * as fetch from "isomorphic-fetch"

export const fwt=<T = any>(token:string,uri: string, method: string = "GET", body?: {}) => {
    let headers: any = {
        "Content-type": "application/json",
        "Authorization":`Bearer ${token}`
    };

       return fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
}
