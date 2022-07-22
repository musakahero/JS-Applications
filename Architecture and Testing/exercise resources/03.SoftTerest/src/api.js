const host = 'http://localhost:3030/';

export async function request(method, url, data){
    const options = {
        method,
        headers: {}
    };

    //if no data provided, don't attach headers and body
    if(data !== undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    };

    //if signed in -> authorize the request
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    };

    //perform request
    try {
        const response = await fetch(host + url, options);

        if(response.ok == false){
            const error = await response.json();
            throw Error(error.message);
        }
    //if response empty, return it without reading it through .json()
        if(response.status == 204){
            return response;
        } else {
            return await response.json();
        };

    } catch (err) {
        alert(err.message);
        throw err;
    }
   
}