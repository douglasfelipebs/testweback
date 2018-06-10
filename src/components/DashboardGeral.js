import React, { Component } from 'react'
import { connect } from "react-redux"
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Form, Col} from 'react-bootstrap'
import { formDiasSemAcidentes, divTotal, btnEvniarBombVolun } from './Layout.css'
import {getAppApi, putAppApi} from "../actions/app"
import swal from "sweetalert"

class DashboardGeral extends Component {

    constructor(props) {
        super(props)

        this.state = {
            diasSemAcidentes: 0,
            alterar         : false
        }

        this.onClickAlterar           = this.onClickAlterar.bind(this)
        this.onClickConfirmar         = this.onClickConfirmar.bind(this)
        this.onChangeDiasSemAcidentes = this.onChangeDiasSemAcidentes.bind(this)
    }

    componentDidMount() {
        this.props.getDiasSemAcidentes()
    }

    onChangeDiasSemAcidentes(e) {
        e.preventDefault()
        this.setState({diasSemAcidentes: e.target.value})
    }

    onClickAlterar(e) {
        e.preventDefault()
        this.setState({
            diasSemAcidentes: this.props.diasSemAcidentes,
            alterar         : true
        })
    }

    onClickConfirmar(e) {
        e.preventDefault()
        let app = {
            _id             : this.props.appId,
            diasSemAcidentes: this.state.diasSemAcidentes
        }
        this.props.putDiasSemAcidentes(this.props.appId, app)
        swal("Alterado", "A quantidade de Dias sem acidentes foi alterada com sucesso!", "success");
        this.setState({alterar: false})
    }

    render() {
        return (
            <div className={divTotal}>
                <div className={formDiasSemAcidentes}>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Quantidade de Dias Sem Acidentes</ControlLabel>
                            {(this.state.alterar)
                                ? <FormControl
                                    type='number'
                                    value={this.state.diasSemAcidentes}
                                    onChange={this.onChangeDiasSemAcidentes}
                                 />
                                : <FormControl
                                    type='number'
                                    value={this.props.diasSemAcidentes}
                                    disabled={true}
                                  />
                            }
                        </FormGroup>
                        {(!this.state.alterar)
                            ? <Button
                                type='submit'
                                className={btnEvniarBombVolun}
                                onClick={this.onClickAlterar}
                                >Alterar
                            </Button>
                            :  <Button
                                type='submit'
                                className={btnEvniarBombVolun}
                                onClick={this.onClickConfirmar}
                                >Confirmar
                            </Button>
                        }

                    </Form>

                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        diasSemAcidentes: state.bombeiros.app.diasSemAcidentes,
        appId           : state.bombeiros.app._id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDiasSemAcidentes: () => dispatch(getAppApi()),
        putDiasSemAcidentes: (id, app) => dispatch(putAppApi(id, app))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardGeral)