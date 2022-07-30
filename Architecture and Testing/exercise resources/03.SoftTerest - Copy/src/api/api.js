const host = 'http://localhost:3030/';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    //if no data provided, don't attach headers and body
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    };

    //if signed in -> authorize the request
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    };

    try {
        const response = await fetch(host + url, options);

        //if response not ok
        if (response.ok == false) {

            //if local storage token is invalid
            if(response.status == 403){
                localStorage.removeItem('user');
            };

            const error = await response.json();
            throw Error(error.message);
        }

        //if response empty, return it without reading it through .json()
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        };

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

//decoration
const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

//export decorated funcs
export {
    get,
    post,
    put,
    del as delete
};
