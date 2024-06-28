
const request = {

    get: async function(url){
        const response = await fetch(url);
        return response.json();
    },
    post: async function(url, body, method = "POST"){
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        return response.json();
    },    
    patch: async function(url, body){
        return request.post(url, body, "PATCH");
    }

}

export {request}