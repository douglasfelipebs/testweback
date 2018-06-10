import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import * as FontAwesome from 'react-icons/lib/fa'
import swal from "sweetalert"
import md5 from 'md5'
import {Button, ButtonToolbar, ControlLabel, Modal, FormGroup, HelpBlock, FormControl } from 'react-bootstrap'
import {
    centerAll,
    divDashboardNoticiaButtons,
    divDashboardNoticiaGeral,
    divDashboardVoluntarios,
    plusToCross,
    buttonModalSintomasDescricao
} from "./Layout.css";
import { getPrimeirosSocorrosApi, addPrimeirosSocorrosApi, deletePrimeirosSocorrosApi,
         updatePrimeirosSocorrosApi } from "../actions/dashboardPrimeirosSocorros";

class DashboardPrimeirosSocorros extends Component {

    constructor(props) {
        super(props)
        moment.locale('pt-BR')

        this.state = {
            modalPrimeirosSocorros: {
                isAddModalOpen: false,
                isAlterModalOpen: false,
                isAlterModalReagir: false,
                isAlterModalSintomas: false,
                sintomas: {
                  _id: '',
                  idAlteracao: '',
                  descricao: ''
                },
                reagir: {
                  _id: '',
                  idAlteracao: '',
                  descricao: ''
                },
                primeirosSocorros: {
                    _id     : '',
                    titulo  : '',
                    sintomas: [],
                    reagir  : []
                }
            },
            columnsPrimeirosSocorros: [{
                Header: 'Primeiros Socorros',
                columns: [
                    {
                        Header: "Título",
                        accessor: "titulo"
                    },
                    {
                        Header: 'Data',
                        accessor: 'date',
                        Cell: row => (
                            <div className='rt-td' role='gridcell'>
                                {moment(new Date(row.original.date).valueOf()).fromNow()}
                            </div>
                        )
                    },
                    {
                        Header: 'Ações',
                        minWidth: 40,
                        Cell: row => (
                            <div className='rt-td'
                                 style={{ width: "100%" }}
                                 role='gridcell'>
                                {<ButtonToolbar className={centerAll}>
                                    <Button
                                        onClick={(e) => this.handleDelete(e, row)}
                                    >
                                        <FontAwesome.FaPlus className={plusToCross}/>
                                    </Button>
                                    <Button
                                        onClick={(e) => this.handleUpdate(e, row)}
                                    >
                                        <FontAwesome.FaPencilSquare/></Button>
                                </ButtonToolbar>}
                            </div>
                        ),
                        Filter: ({ filter, onChange }) =>
                            <div
                                onChange={event => onChange(event.target.value)}
                                style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", marginTop: "2%" }}
                            >
                                <strong>Excluir / Alterar</strong>
                            </div>
                    }]
            }],
            columns: [
                {
                    Header: 'Sintomas',
                    columns: [
                        {
                            Header: 'Descrição',
                            id: 'SintomasDescricao',
                            accessor: r => r.sintomas
                        }
                    ]
                },
                {
                    Header: 'Reações',
                    columns: [
                        {
                            Header: 'Descrição',
                            id: 'ReagirDescricao',
                            accessor: r => r.reagir
                        }
                    ]
                }
            ]
        }

        this.handleSubmit                              = this.handleSubmit.bind(this)
        this.handleUpdate                              = this.handleUpdate.bind(this)
        this.handleCloseModals                         = this.handleCloseModals.bind(this)
        this.handleSubmitUpdate                        = this.handleSubmitUpdate.bind(this)
        this.handleUpdateReagir                        = this.handleUpdateReagir.bind(this)
        this.handleDeleteReagir                        = this.handleDeleteReagir.bind(this)
        this.onClickAlterarReacao                      = this.onClickAlterarReacao.bind(this)
        this.handleUpdateSintomas                      = this.handleUpdateSintomas.bind(this)
        this.handleDeleteSintomas                      = this.handleDeleteSintomas.bind(this)
        this.handleClickAddReagir                      = this.handleClickAddReagir.bind(this)
        this.handleClickAddSintomas                    = this.handleClickAddSintomas.bind(this)
        this.onClickAlterarSintomas                    = this.onClickAlterarSintomas.bind(this)
        this.handleChangeReagirDescricao               = this.handleChangeReagirDescricao.bind(this)
        this.onClickCancelarAlterarReacao              = this.onClickCancelarAlterarReacao.bind(this)
        this.handleChangeSintomasDescricao             = this.handleChangeSintomasDescricao.bind(this)
        this.onClickCancelarAlteracaoReacao            = this.onClickCancelarAlteracaoReacao.bind(this)
        this.handleClickAddPrimeirosSocorros           = this.handleClickAddPrimeirosSocorros.bind(this)
        this.getValidationStateReagirDescricao         = this.getValidationStateReagirDescricao.bind(this)
        this.getValidationStateSintomaDescricao        = this.getValidationStateSintomaDescricao.bind(this)
        this.handleChangePrimeirosSocorrosTitulo       = this.handleChangePrimeirosSocorrosTitulo.bind(this)
        this.getValidationStatePrimeirosSocorrosTitulo = this.getValidationStatePrimeirosSocorrosTitulo.bind(this)
    }

    handleClickAddPrimeirosSocorros(e) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                isAddModalOpen: true,
            }
        })
    }

    handleUpdate(e, row) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                isAlterModalOpen: true,
                primeirosSocorros: {
                    _id: row.original._id,
                    titulo: row.original.titulo,
                    reagir: row.original.reagir,
                    sintomas: row.original.sintomas,
                }
            }
        })

    }

    handleClickAddSintomas(e) {
        e.preventDefault()

        if (this.getValidationStateSintomaDescricao() === 'success') {

            let sintoma = {
                idAlteracao : md5(this.state.modalPrimeirosSocorros.sintomas.descricao),
                descricao   : this.state.modalPrimeirosSocorros.sintomas.descricao,
            }

            this.setState({
                ...this.state,
                modalPrimeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros,
                    sintomas: {
                        descricao  : '',
                        _id        : '',
                        idAlteracao: '',
                    },
                    primeirosSocorros: {
                        ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                        sintomas: this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas.concat(sintoma)
                    }
                }
            })
        } else {
            swal("Algo de errado aconteceu", "Verifique o campo Sintoma - Descrição!", "error");
        }

        this.inputSintomaDescricao.focus()
    }

    handleClickAddReagir(e) {
        e.preventDefault()

        if (this.getValidationStateReagirDescricao() === 'success') {
            let reagir = {
                descricao: this.state.modalPrimeirosSocorros.reagir.descricao,
                idAlteracao: md5(this.state.modalPrimeirosSocorros.reagir.descricao)
            }

            this.setState({
                ...this.state,
                modalPrimeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros,
                    isAlterModalReagir: false,
                    isAlterModalSintomas: false,
                    reagir: {
                        _id        : '',
                        idAlteracao: '',
                        descricao  : ''
                    },
                    primeirosSocorros: {
                        ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                        reagir: this.state.modalPrimeirosSocorros.primeirosSocorros.reagir.concat(reagir)
                    }
                }
            })
        } else {
            swal("Algo de errado aconteceu", "Verifique o campo Reagir - Descrição!", "error");
        }

        this.inputReagirDescricao.focus()
    }

    getValidationStateSintomaDescricao() {
        const length = (this.state.modalPrimeirosSocorros.sintomas.descricao) ? (this.state.modalPrimeirosSocorros.sintomas.descricao.length) : (0)
        if (length > 5) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateReagirDescricao() {
        const length = (this.state.modalPrimeirosSocorros.reagir.descricao) ? (this.state.modalPrimeirosSocorros.reagir.descricao.length) : (0)
        if (length > 5) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStatePrimeirosSocorrosTitulo() {
        const length = (this.state.modalPrimeirosSocorros.primeirosSocorros.titulo) ? (this.state.modalPrimeirosSocorros.primeirosSocorros.titulo.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    handleChangePrimeirosSocorrosTitulo(e) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                primeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                    titulo: e.target.value
                }
            }
        })
    }

    handleChangeSintomasDescricao(e) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                sintomas: {
                    ...this.state.modalPrimeirosSocorros.sintomas,
                    descricao: e.target.value
                }
            }
        })
    }

    handleChangeReagirDescricao(e) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                reagir: {
                    ...this.state.modalPrimeirosSocorros.reagir,
                    descricao: e.target.value
                }
            }
        })
    }

    handleSubmit() {
        var date = new Date();
        if ((this.getValidationStatePrimeirosSocorrosTitulo()) === 'success'){
            let primeirosSocorros = {
                titulo  : this.state.modalPrimeirosSocorros.primeirosSocorros.titulo,
                reagir  : this.state.modalPrimeirosSocorros.primeirosSocorros.reagir,
                sintomas: this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas,
                date    : date
            }
            this.props.addPrimeirosSocorros(primeirosSocorros)
            swal("Adicionar", "O Primeiro Socorro foi incluído com sucesso!", "success");
            this.handleCloseModals()
        } else {
            swal("Algo de errado aconteceu", "Verifique o preenchimento dos campos!", "error");
        }
    }

    handleSubmitUpdate() {
        if ((this.getValidationStatePrimeirosSocorrosTitulo()) === 'success'){
            let primeirosSocorros = {
                _id     : this.state.modalPrimeirosSocorros.primeirosSocorros._id,
                titulo  : this.state.modalPrimeirosSocorros.primeirosSocorros.titulo,
                reagir  : this.state.modalPrimeirosSocorros.primeirosSocorros.reagir,
                sintomas: this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas
            }
            this.props.putPrimeirosSocorros(this.state.modalPrimeirosSocorros.primeirosSocorros._id, primeirosSocorros)
            swal("Alterar", "O Primeiro Socorro foi alterado com sucesso!", "success");
            this.handleCloseModals()
        } else {
            swal("Algo de errado aconteceu", "Verifique o preenchimento dos campos!", "error");
        }
    }

    handleCloseModals() {
        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                isAddModalOpen: false,
                isAlterModalOpen: false,
                sintomas: {
                    _id        : '',
                    idAlteracao: '',
                    descricao  : ''
                },
                reagir: {
                    _id        : '',
                    idAlteracao: '',
                    descricao  : ''
                },
                primeirosSocorros: {
                    titulo: '',
                    sintomas: [],
                    reagir: []
                }
            }
        })
    }

    onClickAlterarReacao(e) {
        e.preventDefault()

        if (this.getValidationStateReagirDescricao() === 'success') {
            this.setState((prevState) => ({
                ...this.state,
                modalPrimeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros,
                    isAlterModalReagir: false,
                    primeirosSocorros: {
                        ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                        reagir: this.state.modalPrimeirosSocorros.primeirosSocorros.reagir.map((reagir) => {
                            if (prevState.modalPrimeirosSocorros.reagir._id) {
                                if (reagir._id === prevState.modalPrimeirosSocorros.reagir._id){
                                    reagir.descricao = prevState.modalPrimeirosSocorros.reagir.descricao
                                }
                            } else {
                                if (md5(reagir.descricao) === prevState.modalPrimeirosSocorros.reagir.idAlteracao){
                                    reagir.descricao = prevState.modalPrimeirosSocorros.reagir.descricao
                                }
                            }
                            return reagir
                        })
                    },
                    reagir: {
                        _id        : '',
                        idAlteracao: '',
                        descricao  : ''
                    }
                }
            }))
        } else {
            swal("Algo de errado aconteceu", "Verifique o campo Reagir - Descrição!", "error");
        }

    }

    onClickCancelarAlterarReacao(e) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                isAlterModalReagir: false,
                reagir: {
                    _id        : '',
                    idAlteracao: '',
                    descricao  : ''
                },
            }
        })
    }

    handleDelete(e, row) {
        e.preventDefault()
        swal({
            title: "Você tem certeza disso?",
            text: "Uma vez deletado, não há como voltar atrás!",
            icon: "warning",
            buttons: true,
            cancel: {
                text: "Cancelar",
                value: null,
                visible: false,
                className: "",
                closeModal: true,
            },
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.delPrimeirosSocorros(row.original._id)
                    swal("Ok! Seu Primeiro Socorro foi deletado com sucesso!", {
                        icon: "success",
                    });
                } else {
                    swal("Seu Primeiro Socorro não foi deletado!");
                }
            });
    }

    handleUpdateSintomas(e, row) {
        e.preventDefault()
        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                isAlterModalSintomas: true,
                sintomas: {
                    _id        : row.original._id,
                    descricao  : row.original.descricao,
                    idAlteracao: row.original.idAlteracao
                }
            }
        })
    }

    handleUpdateReagir(e, row) {
        e.preventDefault()
        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                isAlterModalReagir: true,
                reagir: {
                    _id        : row.original._id,
                    idAlteracao: row.original.idAlteracao,
                    descricao  : row.original.descricao
                }
            }
        })
    }

    handleDeleteSintomas(e, row) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                primeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                    sintomas: this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas
                                .filter((sintoma) => {
                                    if (row.original._id){
                                        return sintoma._id !== row.original._id
                                    } else {
                                        return md5(sintoma.descricao) !== row.original.idAlteracao
                                    }
                                })
                }
            }
        })
    }

    handleDeleteReagir(e, row) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                reagir: {
                    _id: '',
                    idAlteracao: '',
                    descricao: ''
                },
                isAlterModalReagir: false,
                primeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                    reagir: this.state.modalPrimeirosSocorros.primeirosSocorros.reagir
                                .filter((reagir) => {
                                    if (row.original._id) {
                                        return reagir._id !== row.original._id
                                    } else {
                                        return md5(reagir.descricao) !== row.original.idAlteracao
                                    }
                                })
                }
            }
        })
    }

    onClickCancelarAlteracaoReacao(e) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalPrimeirosSocorros: {
                ...this.state.modalPrimeirosSocorros,
                isAlterModalSintomas: false,
                sintomas: {
                    _id        : '',
                    descricao  : '',
                    idAlteracao: ''
                }
            }
        })
    }

    onClickAlterarSintomas(e) {
        e.preventDefault()

        if (this.getValidationStateSintomaDescricao() === 'success') {
            this.setState((prevState) => ({
                ...this.state,
                modalPrimeirosSocorros: {
                    ...this.state.modalPrimeirosSocorros,
                    isAlterModalSintomas: false,
                    primeirosSocorros: {
                        ...this.state.modalPrimeirosSocorros.primeirosSocorros,
                        sintomas: this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas.map((sintoma) => {
                            if (prevState.modalPrimeirosSocorros.sintomas._id) {
                                if (sintoma._id === prevState.modalPrimeirosSocorros.sintomas._id){
                                    sintoma.descricao = prevState.modalPrimeirosSocorros.sintomas.descricao
                                }
                            } else {
                                if (md5(sintoma.descricao) === prevState.modalPrimeirosSocorros.sintomas.idAlteracao){
                                    sintoma.descricao = prevState.modalPrimeirosSocorros.sintomas.descricao
                                }
                            }

                            return sintoma
                        })
                    },
                    sintomas: {
                        _id      : '',
                        descricao: ''
                    },
                }
            }))
        } else {
            swal("Algo de errado aconteceu", "Verifique o campo Sintomas - Descrição!", "error");
        }
    }

    componentDidMount() {
        this.props.getPrimeirosSocorros()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.length !== this.props.data.length) {
            this.props.getPrimeirosSocorros()
        }
    }

    render() {

        return (
            <div className={divDashboardNoticiaGeral}>
                <div className={divDashboardNoticiaButtons}>
                    <Button
                        onClick={(e) => this.handleClickAddPrimeirosSocorros(e)}
                    ><FontAwesome.FaPlus/></Button>
                </div>
                <div className={divDashboardVoluntarios}>
                    <ReactTable
                        data={this.props.data}
                        columns={this.state.columnsPrimeirosSocorros}
                        defaultPageSize={10}
                        pageSizeOptions={[10, 13, 15, 20]}
                        filterable={true}
                        defaultSorted={[
                            {
                                id: "date",
                                desc: true
                            }
                        ]}
                        noDataText={'Nenhum Registro Foi Encontrado'}
                        previousText={'Anterior'}
                        nextText={'Próxima'}
                        pageText={'Página'}
                        ofText={'de'}
                        rowsText={'Registros'}
                        className="-striped -highlight"
                        SubComponent={row => {
                            let myData = []
                            var iTamanho = row.original.sintomas.length
                            if (iTamanho < row.original.reagir.length){
                                iTamanho =  row.original.reagir.length
                            }
                            for (let j = 0; j < iTamanho; j++){
                                let theData = {
                                    sintomas: '',
                                    reagir  : '',
                                }
                                theData.sintomas = (row.original.sintomas[j]) ? (row.original.sintomas[j].descricao) : ('')
                                theData.reagir = (row.original.reagir[j]) ? (row.original.reagir[j].descricao) : ('')
                                myData.push(theData)
                            }
                            return (
                                <ReactTable
                                    data={myData}
                                    columns={this.state.columns}
                                    defaultPageSize={3}
                                    pageSizeOptions={[3, 5, 10, 20]}
                                    noDataText={'Nenhum Registro Foi Encontrado'}
                                    className="-striped -highlight"
                                    previousText={'Anterior'}
                                    nextText={'Próxima'}
                                    pageText={'Página'}
                                    ofText={'de'}
                                    rowsText={'Registros'}
                                />
                            )
                        }}
                    />
                </div>
                <Modal
                    show={this.state.modalPrimeirosSocorros.isAddModalOpen}
                    onEntered={() => {this.inputTitulo.focus()}}
                    onHide={this.handleCloseModals}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Primeiros Socorros</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            validationState={this.getValidationStatePrimeirosSocorrosTitulo()}
                        >
                            <ControlLabel>Título</ControlLabel>
                            <FormControl
                                type='text'
                                value={this.state.modalPrimeirosSocorros.primeirosSocorros.titulo}
                                placeholder='Informe o Título'
                                onChange={this.handleChangePrimeirosSocorrosTitulo}
                                inputRef={ input => {this.inputTitulo = input}}
                            />
                            <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                        </FormGroup>
                        <FormGroup
                            validationState={this.getValidationStateSintomaDescricao()}
                        >
                            <ControlLabel>Sintomas - Descrição</ControlLabel>
                            <FormControl
                                type='text'
                                value={this.state.modalPrimeirosSocorros.sintomas.descricao}
                                placeholder='Informe a Descrição do Sintoma'
                                onChange={this.handleChangeSintomasDescricao}
                                inputRef={ input => {this.inputSintomaDescricao = input}}
                            />
                            <HelpBlock>Mínimo de 6 caracteres</HelpBlock>
                            <Button
                                className={buttonModalSintomasDescricao}
                                onClick={(e) => this.handleClickAddSintomas(e)}
                            >Adicionar</Button>
                            <ReactTable
                                data={this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas}
                                columns={[
                                    {
                                        Header: 'Sintomas',
                                        columns: [
                                            {
                                                Header: 'Descrição',
                                                accessor: 'descricao'
                                            }]
                                    }]}
                                defaultPageSize={3}
                                pageSizeOptions={[3, 5, 10]}
                                noDataText={'Nenhum Registro Cadastrado'}
                                className="-striped -highlight"
                                previousText={'Anterior'}
                                nextText={'Próxima'}
                                pageText={'Página'}
                                ofText={'de'}
                                rowsText={'Registros'}
                            />
                        </FormGroup>
                        <FormGroup
                            validationState={this.getValidationStateReagirDescricao()}
                        >
                            <ControlLabel>Reação - Descrição</ControlLabel>
                            <FormControl
                                type='text'
                                value={this.state.modalPrimeirosSocorros.reagir.descricao}
                                placeholder='Informe a Descrição de Como Reagir'
                                onChange={this.handleChangeReagirDescricao}
                                inputRef={ input => {this.inputReagirDescricao = input}}
                            />
                            <HelpBlock>Mínimo de 6 caracteres</HelpBlock>
                            <Button
                                className={buttonModalSintomasDescricao}
                                onClick={(e) => this.handleClickAddReagir(e)}
                            >Adicionar</Button>
                            <ReactTable
                                data={this.state.modalPrimeirosSocorros.primeirosSocorros.reagir}
                                columns={[
                                    {
                                        Header: 'Reações',
                                        columns: [
                                            {
                                                Header: 'Descrição',
                                                accessor: 'descricao'
                                            }]
                                    }]}
                                noDataText={'Nenhum Registro Cadastrado'}
                                defaultPageSize={3}
                                pageSizeOptions={[3, 5, 10]}
                                className="-striped -highlight"
                                previousText={'Anterior'}
                                nextText={'Próxima'}
                                pageText={'Página'}
                                ofText={'de'}
                                rowsText={'Registros'}
                            />
                        </FormGroup>
                    </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={this.handleSubmit}
                            >Confirmar</Button>
                            <Button
                                onClick={this.handleCloseModals}
                            >Fechar</Button>
                        </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.modalPrimeirosSocorros.isAlterModalOpen}
                    onEntered={() => {this.inputTitulo.focus()}}
                    onHide={this.handleCloseModals}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar Primeiros Socorros</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup
                            validationState={this.getValidationStatePrimeirosSocorrosTitulo()}
                        >
                            <ControlLabel>Título</ControlLabel>
                            <FormControl
                                type='text'
                                value={this.state.modalPrimeirosSocorros.primeirosSocorros.titulo}
                                placeholder='Informe o Título'
                                onChange={this.handleChangePrimeirosSocorrosTitulo}
                                inputRef={ input => {this.inputTitulo = input}}
                            />
                            <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                        </FormGroup>
                        <FormGroup
                            validationState={this.getValidationStateSintomaDescricao()}
                        >
                            <ControlLabel>Sintomas - Descrição</ControlLabel>
                            <FormControl
                                type='text'
                                value={this.state.modalPrimeirosSocorros.sintomas.descricao}
                                placeholder='Informe a Descrição do Sintoma'
                                onChange={this.handleChangeSintomasDescricao}
                                inputRef={ input => {this.inputSintomaDescricao = input}}
                            />
                            <HelpBlock>Mínimo de 6 caracteres</HelpBlock>
                            {(this.state.modalPrimeirosSocorros.isAlterModalSintomas)
                                ? <ButtonToolbar
                                    className={buttonModalSintomasDescricao}
                                    onClick={(e) => this.onClickAlterarSintomas(e)}
                                >
                                    <Button>
                                        Alterar
                                    </Button>
                                    <Button
                                        onClick={(e) => this.onClickCancelarAlteracaoReacao(e)}
                                    >
                                        Cancelar
                                    </Button>
                                </ButtonToolbar>
                                :<Button
                                    className={buttonModalSintomasDescricao}
                                    onClick={(e) => this.handleClickAddSintomas(e)}
                                >Adicionar</Button>}

                            <ReactTable
                                data={this.state.modalPrimeirosSocorros.primeirosSocorros.sintomas}
                                columns={[
                                    {
                                        Header: 'Sintomas',
                                        columns: [
                                            {
                                                Header: 'Descrição',
                                                accessor: 'descricao'
                                            },
                                            {
                                                Header: 'Ações',
                                                minWidth: 40,
                                                Cell: row => (
                                                    <div className='rt-td'
                                                         style={{ width: "100%" }}
                                                         role='gridcell'>
                                                        {<ButtonToolbar className={centerAll}>
                                                            <Button
                                                                onClick={(e) => this.handleDeleteSintomas(e, row)}
                                                            >
                                                                <FontAwesome.FaPlus className={plusToCross}/>
                                                            </Button>
                                                            <Button
                                                                onClick={(e) => this.handleUpdateSintomas(e, row)}
                                                            >
                                                                <FontAwesome.FaPencilSquare/></Button>
                                                        </ButtonToolbar>}
                                                    </div>
                                                ),
                                                Filter: ({ filter, onChange }) =>
                                                    <div
                                                        onChange={event => onChange(event.target.value)}
                                                        style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", marginTop: "2%" }}
                                                    >
                                                        <strong>Excluir / Alterar</strong>
                                                    </div>
                                            }]
                                    }]}
                                defaultPageSize={3}
                                pageSizeOptions={[3, 5, 10]}
                                noDataText={'Nenhum Registro Cadastrado'}
                                className="-striped -highlight"
                                previousText={'Anterior'}
                                nextText={'Próxima'}
                                pageText={'Página'}
                                ofText={'de'}
                                rowsText={'Registros'}
                            />
                        </FormGroup>
                        <FormGroup
                            validationState={this.getValidationStateReagirDescricao()}
                        >
                            <ControlLabel>Reação - Descrição</ControlLabel>
                            <FormControl
                                type='text'
                                value={this.state.modalPrimeirosSocorros.reagir.descricao}
                                placeholder='Informe a Descrição de Como Reagir'
                                onChange={this.handleChangeReagirDescricao}
                                inputRef={ input => {this.inputReagirDescricao = input}}
                            />
                            <HelpBlock>Mínimo de 6 caracteres</HelpBlock>
                            {(this.state.modalPrimeirosSocorros.isAlterModalReagir)
                                ? <ButtonToolbar
                                    className={buttonModalSintomasDescricao}
                                >
                                    <Button
                                        onClick={(e) => this.onClickAlterarReacao(e)}
                                    >
                                        Alterar
                                    </Button>
                                    <Button
                                        onClick={(e) => this.onClickCancelarAlterarReacao(e)}
                                    >
                                        Cancelar
                                    </Button>
                                </ButtonToolbar>
                                : <Button
                                    className={buttonModalSintomasDescricao}
                                    onClick={(e) => this.handleClickAddReagir(e)}
                                >Adicionar</Button>}
                            <ReactTable
                                data={this.state.modalPrimeirosSocorros.primeirosSocorros.reagir}
                                columns={[
                                    {
                                        Header: 'Reações',
                                        columns: [
                                            {
                                                Header: 'Descrição',
                                                accessor: 'descricao'
                                            },
                                            {
                                                Header: 'Ações',
                                                minWidth: 40,
                                                Cell: row => (
                                                    <div className='rt-td'
                                                         style={{ width: "100%" }}
                                                         role='gridcell'>
                                                        {<ButtonToolbar className={centerAll}>
                                                            <Button
                                                                onClick={(e) => this.handleDeleteReagir(e, row)}
                                                            >
                                                                <FontAwesome.FaPlus className={plusToCross}/>
                                                            </Button>
                                                            <Button
                                                                onClick={(e) => this.handleUpdateReagir(e, row)}
                                                            >
                                                                <FontAwesome.FaPencilSquare/></Button>
                                                        </ButtonToolbar>}
                                                    </div>
                                                ),
                                                Filter: ({ filter, onChange }) =>
                                                    <div
                                                        onChange={event => onChange(event.target.value)}
                                                        style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", marginTop: "2%" }}
                                                    >
                                                        <strong>Excluir / Alterar</strong>
                                                    </div>
                                            }]
                                    }]}
                                noDataText={'Nenhum Registro Cadastrado'}
                                defaultPageSize={3}
                                pageSizeOptions={[3, 5, 10]}
                                className="-striped -highlight"
                                previousText={'Anterior'}
                                nextText={'Próxima'}
                                pageText={'Página'}
                                ofText={'de'}
                                rowsText={'Registros'}
                            />
                        </FormGroup>
                    </Modal.Body>
                        <Modal.Footer>
                            <Button
                                onClick={this.handleSubmitUpdate}
                            >Alterar</Button>
                            <Button
                                onClick={this.handleCloseModals}
                            >Cancelar</Button>
                        </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        data: state.bombeiros.dashboardPrimeirosSocorros
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPrimeirosSocorros: () => dispatch(getPrimeirosSocorrosApi()),
        addPrimeirosSocorros: (primeirosSocorros) => dispatch(addPrimeirosSocorrosApi(primeirosSocorros)),
        delPrimeirosSocorros: (id) => dispatch(deletePrimeirosSocorrosApi(id)),
        putPrimeirosSocorros: (id, primeirosSocorros) => dispatch(updatePrimeirosSocorrosApi(id, primeirosSocorros)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPrimeirosSocorros)