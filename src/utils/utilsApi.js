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

export const addBombeiroVoluntario = (bombeiroVoluntario) =>
    fetch(`${url}/api/bombeirovoluntario`,
        {
            method: 'post',
            headers,
            body: JSON.stringify(bombeiroVoluntario)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

/*
*   name: bombeiroVoluntario.name,
                email: bombeiroVoluntario.email,
                telefone: bombeiroVoluntario.telefone,
                endereco: bombeiroVoluntario.endereco,
                nadador: bombeiroVoluntario.nadador
* */