import React, { Component } from 'react'
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Modal, Button,
    FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import  swal  from 'sweetalert'
import { connect } from 'react-redux'
import Loading from './Loading'
import { navBar, modalLoginOpacity } from './Layout.css'
import {initLoginApi, logoutApi} from "../actions/session"

class NavbarHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ModalLogin: {
                open: false,
                user: '',
                password: ''
            },
            loadingOpen: false
        }

        this.handleCloseModalLogin   = this.handleCloseModalLogin.bind(this)
        this.handleConfirmModalLogin = this.handleConfirmModalLogin.bind(this)
        this.handleChangeUser        = this.handleChangeUser.bind(this)
        this.handleChangePassword    = this.handleChangePassword.bind(this)
        this.limpar                  = this.limpar.bind(this)
    }



    handleOnClickLogin = (e) => {
        e.preventDefault()
        this.setState({
            loadingOpen: false,
            ModalLogin: {
                ...this.state.ModalLogin,
                open: true
            }
        })
    }

    handleOnClickLogout = (e) => {
        e.preventDefault()
        debugger;

        if (this.props.props.history.location.pathname.toLowerCase().indexOf('dashboard'))
            this.props.props.history.push('/')

        const { logout } = this.props
        logout();
    }

    handleCloseModalLogin() {
        this.setState({
            loadingOpen: false,
            ModalLogin: {
                ...this.state.ModalLogin,
                open: false
            }
        })
    }

    handleConfirmModalLogin(e) {
        e.preventDefault()

        this.setState({loadingOpen: true})
        let bCorreto = false;
        if ((this.getValidationStatePassword() && this.getValidationStatePassword()) === 'success') {
            const user = {
                user: this.state.ModalLogin.user,
                password: this.state.ModalLogin.password
            }

            this.props.login(user)
            bCorreto = true;
        }

        if (!bCorreto) {
            swal("Algo de errado aconteceu", "Verifique seu login e senha!", "error");
        } else {
            this.handleCloseModalLogin()
        }

    }

    handleChangeUser(e) {
        this.setState({
            ModalLogin: {
                ...this.state.ModalLogin,
                user: e.target.value
            }
        })
    }

    handleChangePassword(e) {
        this.setState({
            ModalLogin: {
                ...this.state.ModalLogin,
                password: e.target.value
            }
        })
    }

    limpar(bOpen) {
        console.log('Props', this.props)
        this.setState({
            ...this.state,
            ModalLogin: {
                open: bOpen,
                login: '',
                password: ''
            }
        })
    }

    getValidationStateUser() {
        const length = (this.state.ModalLogin.user) ? (this.state.ModalLogin.user.length) : (0)
        if (length > 3) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStatePassword() {
        const length = (this.state.ModalLogin.password) ? (this.state.ModalLogin.password.length) : (0)
        if (length > 3) return 'success'
        else if (length > 0) return 'error'
        return null;
    }


    render() {
        let currentUrl = window.location.href



        return (
            <div className={navBar}>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Bombeiros Ibirama</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        {(this.props.logging) &&
                        <NavItem href='/Dashboard'
                                 active={(currentUrl.indexOf('Dashboard') !== -1)}
                        >
                            DashBoard
                        </NavItem>
                        }
                        <NavItem eventKey={2} href='/PrimeirosSocorros'
                                 active={(currentUrl.indexOf('PrimeirosSocorros') !== -1)}
                        >
                            Primeiros Socorros
                        </NavItem>
                        <NavItem eventKey={3} href="/Noticias"
                                 active={(currentUrl.indexOf('Noticias') !== -1)}
                        >
                            Notícias
                        </NavItem>
                        <NavItem eventKey={4} href="/Sobre"
                                 active={(currentUrl.indexOf('Sobre') !== -1)}
                        >
                            Sobre
                        </NavItem>
                        <NavDropdown eventKey={5} title="Ajude" id="basic-nav-dropdown"
                        >
                            <MenuItem eventKey={5.1} href='/Voluntario'
                                      active={(currentUrl.indexOf('Voluntario') !== -1)}
                            >Seja um Voluntário</MenuItem>
                            <MenuItem eventKey={5.2} href='/Doacoes'
                                      active={(currentUrl.indexOf('Doacoes') !== -1)}
                            >Doações</MenuItem>
                        </NavDropdown>
                        {(!this.props.logging)
                            ?
                            <NavItem
                                onClick={(e) => this.handleOnClickLogin(e)}
                            >
                                <strong>Login</strong>
                            </NavItem>
                            :
                            <NavItem
                                onClick={(e) => this.handleOnClickLogout(e)}
                            >
                                <strong>Logout</strong>
                            </NavItem>
                        }
                    </Nav>
                </Navbar>
                <Modal
                    show={this.state.ModalLogin.open}
                    onHide={this.handleCloseModalLogin}
                    className={(this.state.loadingOpen) && modalLoginOpacity}
                    onEntered={() => {this.inputUser.focus()} }
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                validationState={this.getValidationStateUser()}
                            >
                                <ControlLabel>Usuário</ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.ModalLogin.user}
                                    placeholder='Nome de Usuário'
                                    onChange={this.handleChangeUser}
                                    inputRef={ ref => this.inputUser = ref}
                                />
                                <HelpBlock>Mínimo de 4 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                validationState={this.getValidationStatePassword()}
                            >
                                <ControlLabel>Senha</ControlLabel>
                                <FormControl
                                    type='password'
                                    value={this.state.ModalLogin.password}
                                    placeholder='Senha'
                                    onChange={this.handleChangePassword}
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.handleConfirmModalLogin}>Confirmar</Button>
                        <Button onClick={this.handleCloseModalLogin}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}


function mapStateToProps (state) {
    return {
        logging: state.session.authenticated,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login  : (user) => dispatch(initLoginApi(user)),
        logout : () => dispatch(logoutApi())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader);