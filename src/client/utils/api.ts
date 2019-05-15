import * as fetch from "isomorphic-fetch"

export const fwt = async <T = any>(token:string,uri: string, method: string = "GET", body?: {}) => {
    let headers: any = {
        "Content-type": "application/json",
        "Authorization":`Bearer ${token}`
    };

   try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        
        if (result.ok) {
            return result
        }
    } catch (e) {
        throw (e)
    }
}
