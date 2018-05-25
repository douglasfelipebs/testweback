const url = 'http://localhost:5000' //|| process.env.APP_URL + ':' + process.env.PORT;
import axios from 'axios'
import 'babel-polyfill'

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
}

    //,


// Return all the categories
export const getAllUsers = async () =>
        await fetch(`${url}/api/user`, { headers })
            .then((res) => res.json())
            .then(data => data);




function resolveGetAllUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getAllUsers())
        }, 1000)
    })
}



export const login = (user) => {
    const response = {
        token: '0000',
        data: {
            name: 'data',
            password: 'joaooo'
        }
    };
    try {
        var aUsers = getAllUsers();

    } catch (e) {
        console.log(e)
    }

    var axisValue = {};
    async () => {
        var axiosInstance = axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
                'Accept': 'application/json'
            }
        })

        try {
            let response = await axiosInstance.get('/repos')
            axisValue ={
                repos: response.data,
                btnPressed: true
            }
            console.log(response)
            console.log(axisValue)
        } catch (err) {
            console.error(err)
        }
    }
    let bCadastrado = false
    let md5 = require('md5')
    var x = axios.get('/api/user')

    console.log(JSON.stringify(x))
    debugger;


        getAllUsers()
            .then((data) => {
                data.map((data) => {
                    console.log(data)
                    if (data.username === user.user && data.password === user.password) {
                        bCadastrado = true
                        debugger;
                        response.data({
                            name: data.username,
                            password: data.password
                        })
                        response.token = md5(response.data.name)
                    }
                    return data
                })
            })
    return new Promise(resolve => setTimeout(resolve(response), 1000))
};



export const logout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};
