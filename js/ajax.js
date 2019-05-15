const POST = "POST";
const GET = "GET";

export const AJAX_SUCCESS = "AJAX_SUCCESS";
export const AJAX_ERROR = "AJAX_ERROR";

const doRequest  = async (url, method, data) => {
    const queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    const options = { method: method || GET }; //default to GET

    if(method === POST) {
        options.headers = {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        options.body = queryString;
    } else {
        url += "?" + queryString;
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return {status : AJAX_SUCCESS, data};

    } catch (e) {
        return {status : AJAX_ERROR, error: {...e}};
    }
}


export const get = async (url, data) => doRequest(url, GET, data);
export const post = async (url, data) => doRequest(url, POST, data);

