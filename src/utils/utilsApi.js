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

export const getBombeiroVoluntario = () =>
    fetch(`${url}/api/bombeirovoluntario`, { headers })
        .then((res) => res.json())
        .then(data => data);

export const deleteBombeiro = (id) =>
    fetch(`${url}/api/dashboard/bombeirovoluntario/${id}`,
        {
            method: 'delete',
            headers
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const addNoticia = (noticia) =>
    fetch(`${url}/api/dashboard/noticia`,
        {
            method: 'post',
            headers,
            body: JSON.stringify(noticia)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const getNoticia = () =>
    fetch(`${url}/api/dashboard/noticia`, { headers })
        .then((res) => res.json())
        .then(data => data);

export const alterNoticia = (id, noticia) =>
    fetch(`${url}/api/dashboard/noticias/${id}`,
        {
            method: 'put',
            headers,
            body: JSON.stringify(noticia)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const deleteNoticia = (id) =>
    fetch(`${url}/api/dashboard/noticias/${id}`,
        {
            method: 'delete',
            headers
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const getApp = () =>
    fetch(`${url}/api/app`, { headers })
        .then((res) => res.json())
        .then(data => data);

export const alterApp = (id, app) =>
    fetch(`${url}/api/app/${id}`,
        {
            method: 'put',
            headers,
            body: JSON.stringify(app)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const addPrimeirosSocorros = (primeirosSocorros) =>
    fetch(`${url}/api/dashboard/primeirossocorros`,
        {
            method: 'post',
            headers,
            body: JSON.stringify(primeirosSocorros)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const getPrimeirosSocorros = () =>
    fetch(`${url}/api/dashboard/primeirossocorros`, { headers })
        .then((res) => res.json())
        .then(data => data);

export const deletePrimeirosSocorros = (id) =>
    fetch(`${url}/api/dashboard/primeirossocorros/${id}`,
        {
            method: 'delete',
            headers
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });

export const putPrimeirosSocorros = (id, primeirosSocorros) =>
    fetch(`${url}/api/dashboard/primeirossocorros/${id}`,
        {
            method: 'put',
            headers,
            body: JSON.stringify(primeirosSocorros)
        })
        .then((res) => res.json())
        .then(data => data)
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ' + error.message + error);
        });