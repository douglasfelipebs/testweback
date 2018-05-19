import React from 'react';
import { Header } from 'semantic-ui-react';
import *  as utilApi  from '../utils/utilsApi'
import Layout from './Layout';

let bigx;
var x;
utilApi.getAllUsers().
    then((data) =>  {
    bigx = data;
    console.log(data)
    x= bigx;
})
    console.log(JSON.stringify(bigx))
const DynamicPage = (x) => {
    return (
        <Layout>
            <Header as="h2">Dynamic Page</Header>
            <p>This page was loaded asynchronously!!!</p>
            <h2>{JSON.stringify(x)}</h2>
        </Layout>
    );
};

export default DynamicPage;