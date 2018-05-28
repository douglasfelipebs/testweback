import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form, Col} from 'react-bootstrap'
import  swal  from 'sweetalert'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'
import { addVoluntarioApi } from '../actions/bombeiroVoluntario'
import { panelFormVoluntario, formVoluntario, btnEvniarBombVolun,
         btnLimparBombVolun } from './Layout.css'

class FormBombeiroVoluntario extends Component {


    constructor(props) {
        super(props)

        this.state = {
            nomeCompleto: '',
            email: '',
            telefoneContato: '',
            sabeNadar: false,
            endereco: '',
        }

        this.handleSubmit             = this.handleSubmit.bind(this)
        this.handleLimpar             = this.handleLimpar.bind(this)
        this.handleChangeNome         = this.handleChangeNome.bind(this)
        this.handleChangeNome         = this.handleChangeNome.bind(this)
        this.handleChangeEmail        = this.handleChangeEmail.bind(this)
        this.handleChangeTelefone     = this.handleChangeTelefone.bind(this)
        this.handleChangeTelefoneMask = this.handleChangeTelefoneMask.bind(this)
        this.handleChangeSabeNadar    = this.handleChangeSabeNadar.bind(this)
        this.handleChangeEndereco     = this.handleChangeEndereco.bind(this)
    }

    handleChangeNome(e) {
        this.setState({nomeCompleto: e.target.value})
    }
    handleChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    handleChangeTelefone(e) {
        let fim = /\(\d+\) \d+-\d+/g.test(e.target.value)
        if (fim || e.target.value === ''){
            this.setState({telefoneContato: e.target.value})
        } else {
            let text = /\d+/.exec(e.target.value)
            if (text) {
                (text.slice(0,10).toString().length === 11)
                    ? this.setState({telefoneContato: text.slice(0).toString().replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")})
                    : this.setState({telefoneContato: text.slice(0,10).toString()})
            }
        }

    }

    handleChangeTelefoneMask(e) {
        e.preventDefault()
        this.setState({telefoneContato: e.target.value})
    }
    handleChangeSabeNadar(e) {
        e.preventDefault()
        this.setState({sabeNadar: e.target.value})
    }
    handleChangeEndereco(e) {
        e.preventDefault()
        this.setState({endereco: e.target.value})
    }

    getValidationStateNomeCompleto() {
        const length = (this.state.nomeCompleto) ? (this.state.nomeCompleto.length) : (0)
        if (length > 5) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateEndereco() {
        const length = (this.state.endereco) ? (this.state.endereco.length) : (0)
        if (length > 12) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateEmail() {
        const length = (this.state.email) ? (this.state.email.length) : (0)
        let regEx = /\S+@\S+\.\S+/
        var retorno = null;
        if (length > 3) {
            (regEx.test(this.state.email))? retorno = 'success' : retorno = 'error'
        } else if (length > 0){
            retorno = 'error'
        }

        return retorno
    }

    getValidationStatePhone() {
        const length = (this.state.telefoneContato) ? (this.state.telefoneContato.length) : (0)
        let regEx = /\(\d+\) \d+-\d+/g
        var retorno = null;
        if (length > 3) {
            (regEx.test(this.state.telefoneContato))? retorno = 'success' : retorno = 'error'
        } else if (length > 0){
            retorno = 'error'
        }

        return retorno
    }


    handleLimpar(event) {
        event.preventDefault();

        this.limparState()
    }

    limparState() {
        this.setState({
            nomeCompleto: '',
            email: '',
            telefoneContato: '',
            sabeNadar: false,
            endereco: ''
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if ((this.getValidationStateNomeCompleto() && this.getValidationStateEmail() &&
            this.getValidationStatePhone() && this.getValidationStateEndereco()) === 'success' ){

            let voluntario = {
                name: this.state.nomeCompleto,
                email: this.state.email,
                telefone: this.state.telefoneContato,
                endereco: this.state.endereco,
                nadador: this.state.sabeNadar
            }

            this.props.addVoluntario(voluntario)

            swal("Enviado", "Seu formulário foi enviado com sucesso!", "success");
            this.limparState()
        } else {
            swal("Algo de errado aconteceu", "Verifique seu formulário!", "error");
        }
    }

    render() {
        return (
            <div className={panelFormVoluntario}>
                <Form
                    horizontal
                    className={formVoluntario}
                    onSubmit={this.handleSubmit}
                >
                    <FormGroup
                        validationState={this.getValidationStateNomeCompleto()}
                        bsSize='large'
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            Nome
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                value={this.state.nomeCompleto}
                                placeholder='Nome Completo'
                                onChange={this.handleChangeNome}
                            />
                        </Col>
                        <HelpBlock>Mínimo de 6 caracteres</HelpBlock>
                    </FormGroup>
                    <FormGroup
                        validationState={this.getValidationStateEmail()}
                        bsSize='large'
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            E-mail
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type='text'
                                value={this.state.email}
                                placeholder='E-mail'
                                onChange={this.handleChangeEmail}
                            />
                        </Col>
                        <HelpBlock>Formato do email letras@letras.letras</HelpBlock>
                    </FormGroup>
                    <FormGroup
                        bsSize='large'
                        validationState={this.getValidationStatePhone()}
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            Celular
                        </Col>
                        <Col sm={10}>
                            {/*<FormControl
                                type='text'
                                max={11}
                                value={this.state.telefoneContato}
                                placeholder='(__) _____-____'
                                onChange={this.handleChangeTelefone}
                            />*/}
                            <InputMask
                                mask='(99) 99999-9999'
                                className={'form-control'}
                                placeholder='(__) _____-____'
                                value={this.state.telefoneContato}
                                onChange={this.handleChangeTelefoneMask}
                            />
                        </Col>
                        <Col sm={12}>
                            <HelpBlock>Informe Somente Números</HelpBlock>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        bsSize='large'
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            Nadador
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="select"
                                placeholder="Sabe Nadar"
                                value={this.state.sabeNadar}
                                onChange={this.handleChangeSabeNadar}
                            >
                                <option value={false}>Não</option>
                                <option value={true}>Sim</option>
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup
                        bsSize='large'
                        validationState={this.getValidationStateEndereco()}
                    >
                        <Col componentClass={ControlLabel} sm={2}>
                            Endereço
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="textarea"
                                value={this.state.endereco}
                                placeholder='Informe seu Endereço Completo'
                                onChange={this.handleChangeEndereco}
                            />
                        </Col>
                        <Col sm={12}>
                            <HelpBlock>Mínimo de 12 caracteres</HelpBlock>
                        </Col>
                    </FormGroup>

                    <Button type='submit' className={btnEvniarBombVolun}>Enviar</Button>
                    <Button type='button'
                            className={btnLimparBombVolun}
                            onClick={this.handleLimpar}
                    >Limpar</Button>
                </Form>
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        addVoluntario: (voluntario) => dispatch(addVoluntarioApi(voluntario))
    }
}

export default connect(null, mapDispatchToProps)(FormBombeiroVoluntario)