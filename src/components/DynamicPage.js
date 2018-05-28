import React from 'react';
import { Header } from 'semantic-ui-react'
import Layout from './Layout';

const DynamicPage = () => {
    return (
        <Layout>
            <Header as="h2">Dynamic Page</Header>
            <p>This page was loaded asynchronously!!!</p>
            <h2>{JSON.stringify(x)}</h2>
        </Layout>
    );
};

export default DynamicPage;