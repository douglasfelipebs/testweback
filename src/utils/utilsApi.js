const url = 'https://testewebpackrafilx.herokuapp.com' ||  process.env.APP_URL + ':' + process.env.PORT;

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

// Return all the categories
export const getAllUsers = () =>
    fetch(`${url}/api/user`, {
        method: "GET",
        headers
    })
        .then(res => res.json())
        .then(data => data);
