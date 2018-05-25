import React from 'react';
import { Header, Container, Divider, Icon } from 'semantic-ui-react';

import { pullRight, h1 } from './Layout.css';

const Layout = ({ children }) => {
    return (
        <Container>
            <a href="/">
                <Header as="h1" className={h1}>
                    Bombeiros Ibirama
                </Header>
            </a>
            {children}
            <Divider />
            <p className={pullRight}>
                Made with a lot of <Icon name="coffee" color="black" /> by, Rafilx Tenfen
            </p>
        </Container>
    );
};

export default Layout;