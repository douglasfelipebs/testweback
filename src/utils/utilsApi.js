const url = 'http://localhost:5000'; //|| process.env.APP_URL + ':' + process.env.PORT;
import axios from 'axios'

let token = localStorage.token

if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',

}

    //'Content-Type': 'application/json',
    //,'Access-Control-Allow-Origin': '*'
/*
*     'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin'
* */

// Return all the users
export const getAllUsers = () =>
    fetch(`${url}/api/user`, { headers })
            .then((res) => res.json())
            .then(data => data);




function resolveGetAllUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getAllUsers())
        }, 2000)
    })
}



export const login = (user) => {
    const response1 = {
        token: '0000',
        data: {
            name: 'data',
            password: 'joaooo'
        }
    };

    return new Promise(resolve => setTimeout(resolve(response1), 1000))
};



export const logout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};


export const initLogin = () =>
    fetch(`${url}/api/user`,
        {
            method: 'get',
            headers
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });