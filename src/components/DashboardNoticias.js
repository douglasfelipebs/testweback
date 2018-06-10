import React, { Component } from 'react'
import {connect} from "react-redux"
import {divDashboardVoluntarios, divDashboardNoticiaGeral, divDashboardNoticiaButtons,
        errorMessage, centerAll, centerStar, plusToCross } from './Layout.css'
import ReactTable from 'react-table'
import {Button, ButtonToolbar, ControlLabel, Modal, FormGroup, Col, HelpBlock, FormControl,
        Form} from 'react-bootstrap'
import * as FontAwesome from 'react-icons/lib/fa'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import {addNoticiaApi, getNoticiaApi, deleteNoticiaApi, updateNoticiaApi} from "../actions/dashboardNoticia"
import swal from "sweetalert"

class DashboardNoticias extends Component {

    constructor(props) {
        super(props)
        moment.locale('pt-BR')
        this.state = {
            modalNoticia: {
                isOpen      : false,
                imgUrl      : '',
                imgDescricao: '',
                titulo      : '',
                corpoTexto  : '',
                favorito    : false,
            },
            modalAlterNoticia: {
                isOpen      : false,
                _id         : '',
                imgUrl      : '',
                imgDescricao: '',
                titulo      : '',
                corpoTexto  : '',
                favorito    : false,
            },
            columns: [{
                Header: 'URL da Imagem',
                accessor: 'imgUrl' // String-based value accessors!
            }, {
                Header: 'Descrição da Imagem',
                accessor: 'imgDescricao',
            }, {
                Header: 'Título', // Required because our accessor is not a string
                accessor: 'titulo',
            }, {
                Header: 'Texto', // Custom header components!
                accessor: 'corpoTexto'
            }, {
                columns: [{
                    Header: 'Data',
                    accessor: 'date',
                    Cell: row => (
                        <div className='rt-td' role='gridcell'>
                            {moment(new Date(row.original.date).valueOf()).fromNow()}
                        </div>
                    )
                }]
            }, {
                columns: [{
                    Header: 'Favorito',
                    accessor: 'favorito',
                    Cell: row => (
                        <div className='rt-td' role='gridcell'>
                            {(row.original.favorito)
                                ? <FontAwesome.FaStar className={centerStar} />
                                : <FontAwesome.FaStarO className={centerStar} />}
                        </div>
                    ),
                    filterMethod: (filter, row) => {
                        if (filter.value === "all") {
                            return true;
                        }
                        if (filter.value === "true") {
                            return (row.favorito) && Boolean(row.favorito) === true;
                        }
                        if (filter.value === "false") {
                            if (row.favorito === undefined) {
                                return true
                            } else {
                                return (row.favorito) && Boolean(row.favorito) === false;
                            }

                        }
                    },
                    Filter: ({ filter, onChange }) =>
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "all"}
                        >
                            <option value="all">Todos</option>
                            <option value="true"> Somente Favoritos </option>
                            <option value="false">Somente Não Favoritos</option>
                        </select>
                }]
            },{
                columns: [{
                    Header: 'Ações',
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
            }]
        }

        this.handleSubmit                            = this.handleSubmit.bind(this)
        this.handleSubmitUpdate                      = this.handleSubmitUpdate.bind(this)
        this.handleClickAddNoticia                   = this.handleClickAddNoticia.bind(this)
        this.handleCloseModalNoticia                 = this.handleCloseModalNoticia.bind(this)
        this.handleChangeNoticiaTexto                = this.handleChangeNoticiaTexto.bind(this)
        this.handleChangeNoticiaTitulo               = this.handleChangeNoticiaTitulo.bind(this)
        this.handleChangeNoticiaFavorito             = this.handleChangeNoticiaFavorito.bind(this)
        this.handleCloseModalAlterNoticia            = this.handleCloseModalAlterNoticia.bind(this)
        this.handleChangeNoticiaImagemUrl            = this.handleChangeNoticiaImagemUrl.bind(this)
        this.handleChangeAlterNoticiaTexto           = this.handleChangeAlterNoticiaTexto.bind(this)
        this.handleChangeAlterNoticiaTitulo          = this.handleChangeAlterNoticiaTitulo.bind(this)
        this.handleChangeAlterNoticiaFavorito        = this.handleChangeAlterNoticiaFavorito.bind(this)
        this.handleChangeAlterNoticiaImagemUrl       = this.handleChangeAlterNoticiaImagemUrl.bind(this)
        this.handleChangeNoticiaImagemDescricao      = this.handleChangeNoticiaImagemDescricao.bind(this)
        this.handleChangeAlterNoticiaImagemDescricao = this.handleChangeAlterNoticiaImagemDescricao.bind(this)
    }

    handleClickAddNoticia(e) {
        e.preventDefault()
        this.setState({
            modalNoticia: {
                isOpen: true
            }
        })
    }

    getValidationStateImagemUrl() {
        const length = (this.state.modalNoticia.imgUrl) ? (this.state.modalNoticia.imgUrl.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateImagemDescricao() {
        const length = (this.state.modalNoticia.imgDescricao) ? (this.state.modalNoticia.imgDescricao.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateTitulo() {
        const length = (this.state.modalNoticia.titulo) ? (this.state.modalNoticia.titulo.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateCorpoTexto() {
        const length = (this.state.modalNoticia.corpoTexto) ? (this.state.modalNoticia.corpoTexto.length) : (0)
        if (length > 10) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateAlterImagemUrl() {
        const length = (this.state.modalAlterNoticia.imgUrl) ? (this.state.modalAlterNoticia.imgUrl.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateAlterImagemDescricao() {
        const length = (this.state.modalAlterNoticia.imgDescricao) ? (this.state.modalAlterNoticia.imgDescricao.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateAlterTitulo() {
        const length = (this.state.modalAlterNoticia.titulo) ? (this.state.modalAlterNoticia.titulo.length) : (0)
        if (length > 4) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    getValidationStateAlterCorpoTexto() {
        const length = (this.state.modalAlterNoticia.corpoTexto) ? (this.state.modalAlterNoticia.corpoTexto.length) : (0)
        if (length > 10) return 'success'
        else if (length > 0) return 'error'
        return null;
    }

    handleChangeNoticiaImagemUrl(e) {
        e.preventDefault()
        this.setState({
            ...this.state,
            modalNoticia: {
                ...this.state.modalNoticia,
                imgUrl: e.target.value
            }
        })
    }

    handleChangeAlterNoticiaImagemUrl(e) {
        e.preventDefault()
        this.setState({
            ...this.state,
            modalAlterNoticia: {
                ...this.state.modalAlterNoticia,
                imgUrl: e.target.value
            }
        })
    }

    handleChangeNoticiaImagemDescricao(e) {
        e.preventDefault()
        this.setState({
            modalNoticia: {
                ...this.state.modalNoticia,
                imgDescricao: e.target.value
            }
        })
    }

    handleChangeAlterNoticiaImagemDescricao(e) {
        e.preventDefault()
        this.setState({
            modalAlterNoticia: {
                ...this.state.modalAlterNoticia,
                imgDescricao: e.target.value
            }
        })
    }

    handleChangeNoticiaTitulo(e) {
        e.preventDefault()
        this.setState({
            modalNoticia: {
                ...this.state.modalNoticia,
                titulo: e.target.value
            }
        })
    }

    handleChangeAlterNoticiaTitulo(e) {
        e.preventDefault()
        this.setState({
            modalAlterNoticia: {
                ...this.state.modalAlterNoticia,
                titulo: e.target.value
            }
        })
    }

    handleChangeNoticiaFavorito(e) {
        e.preventDefault()
        this.setState({
            modalNoticia: {
                ...this.state.modalNoticia,
                favorito: e.target.value
            }
        })
    }

    handleChangeAlterNoticiaFavorito(e) {
        e.preventDefault()
        this.setState({
            modalAlterNoticia: {
                ...this.state.modalAlterNoticia,
                favorito: e.target.value
            }
        })
    }

    handleChangeNoticiaTexto(e) {
        e.preventDefault()
        this.setState({
            modalNoticia: {
                ...this.state.modalNoticia,
                corpoTexto: e.target.value
            }
        })
    }

    handleChangeAlterNoticiaTexto(e) {
        e.preventDefault()
        this.setState({
            modalAlterNoticia: {
                ...this.state.modalAlterNoticia,
                corpoTexto: e.target.value
            }
        })
    }

    handleCloseModalNoticia() {
        this.setState({
            modalNoticia: {
                ...this.state.modalNoticia,
                isOpen: false
            }
        })
    }

    handleCloseModalAlterNoticia() {
        this.setState({
            modalAlterNoticia: {
                ...this.state.modalAlterNoticia,
                isOpen: false
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        var date = new Date();
        if ((this.getValidationStateImagemDescricao() && this.getValidationStateImagemUrl()
             && this.getValidationStateTitulo() && this.getValidationStateCorpoTexto()) === 'success'){
            let noticia = {
                imgUrl      : this.state.modalNoticia.imgUrl,
                imgDescricao: this.state.modalNoticia.imgDescricao,
                titulo      : this.state.modalNoticia.titulo,
                corpoTexto  : this.state.modalNoticia.corpoTexto,
                favorito    : this.state.modalNoticia.favorito,
                date        : date
            }
            this.props.addNoticia(noticia)
            swal("Adicionada", "A notícia foi adicionada com sucesso!", "success");
            this.handleCloseModalNoticia()
        } else {
            swal("Algo de errado aconteceu", "Verifique o preenchimento dos campos!", "error");
        }

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
                    this.props.deleteNoticia(row.original._id)
                    swal("Ok! Sua notícia foi deletada com sucesso!", {
                        icon: "success",
                    });
                } else {
                    swal("Sua notícia não foi deletada!");
                }
            });
    }

    handleUpdate(e, row) {
        e.preventDefault()

        this.setState({
            ...this.state,
            modalAlterNoticia: {
                isOpen      : true,
                _id         : row.original._id,
                imgUrl      : row.original.imgUrl,
                imgDescricao: row.original.imgDescricao,
                titulo      : row.original.titulo,
                corpoTexto  : row.original.corpoTexto,
                favorito    : row.original.favorito,
            }
        })
    }

    handleSubmitUpdate() {
        if ((this.getValidationStateAlterImagemDescricao() && this.getValidationStateAlterImagemUrl()
            && this.getValidationStateAlterTitulo() && this.getValidationStateAlterCorpoTexto()) === 'success'){
            let noticia = {
                _id         : this.state.modalAlterNoticia._id,
                imgUrl      : this.state.modalAlterNoticia.imgUrl,
                imgDescricao: this.state.modalAlterNoticia.imgDescricao,
                titulo      : this.state.modalAlterNoticia.titulo,
                corpoTexto  : this.state.modalAlterNoticia.corpoTexto,
                favorito    : this.state.modalAlterNoticia.favorito
            }
            this.props.putNoticia(noticia._id, noticia)
            swal("Alterada", "A notícia foi alterada com sucesso!", "success");
            this.handleCloseModalAlterNoticia()
        } else {
            swal("Algo de errado aconteceu", "Verifique o preenchimento dos campos!", "error");
        }
    }

    componentDidMount() {
        this.props.getNoticia()
    }

    render () {
        return (
            <div className={divDashboardNoticiaGeral}>
                <div className={divDashboardNoticiaButtons}>
                    <Button
                        onClick={(e) => this.handleClickAddNoticia(e)}
                    ><FontAwesome.FaPlus/></Button>
                </div>
                <div className={divDashboardVoluntarios}>
                    <ReactTable
                        data={this.props.data}
                        columns={this.state.columns}
                        defaultPageSize={10}
                        pageSizeOptions={[10, 13, 15, 20]}
                        filterable={true}
                        defaultSorted={[
                            {
                                id: "favorito",
                                desc: true
                            },
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
                    />
                </div>
                <Modal
                    show={this.state.modalNoticia.isOpen}
                    onEntered={() => {this.inputImgUrl.focus()}}
                    onHide={this.handleCloseModalNoticia}

                >
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Notícia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup
                                validationState={this.getValidationStateImagemUrl()}
                            >
                                <ControlLabel>
                                    Url da Imagem
                                </ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.modalNoticia.imgUrl}
                                    placeholder='ex.: https://i.imgur.com/AH5p6N6.jpg'
                                    onChange={this.handleChangeNoticiaImagemUrl}
                                    inputRef={ input => {this.inputImgUrl = input}}
                                />
                                <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                validationState={this.getValidationStateImagemDescricao()}
                            >
                                <ControlLabel >
                                    Descrição da Imagem
                                </ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.modalNoticia.imgDescricao}
                                    placeholder='Descrição da Imagem'
                                    onChange={this.handleChangeNoticiaImagemDescricao}
                                />
                                <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                validationState={this.getValidationStateTitulo()}
                            >
                                <ControlLabel >
                                    Título da Notícia
                                </ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.modalNoticia.titulo}
                                    placeholder='Informe o Título da Notícia'
                                    onChange={this.handleChangeNoticiaTitulo}
                                />
                                <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel >
                                    Favorito
                                </ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="É Favorito?"
                                    value={this.state.modalNoticia.favorito}
                                    onChange={this.handleChangeNoticiaFavorito}
                                >
                                    <option value={false}>Não</option>
                                    <option value={true}>Sim</option>
                                </FormControl>
                                <HelpBlock>Indica se a notícia deve aparecer na página inicial</HelpBlock>
                            </FormGroup><
                            FormGroup
                                validationState={this.getValidationStateCorpoTexto()}
                            >
                                <ControlLabel >
                                    Texto da Notícia
                                </ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    value={this.state.modalNoticia.corpoTexto}
                                    placeholder='Informe todo o corpo da notícia'
                                    onChange={this.handleChangeNoticiaTexto}
                                />
                                <HelpBlock>Informe aqui todo o texto da notícia</HelpBlock>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.handleSubmit}
                        >Confirmar</Button>
                        <Button
                            onClick={this.handleCloseModalNoticia}
                        >Fechar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.modalAlterNoticia.isOpen}
                    onEntered={() => {this.inputAlterImgUrl.focus()}}
                    onHide={this.handleCloseModalAlterNoticia}

                >
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar Notícia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup
                                validationState={this.getValidationStateAlterImagemUrl()}
                            >
                                <ControlLabel>
                                    Url da Imagem
                                </ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.modalAlterNoticia.imgUrl}
                                    placeholder='ex.: https://i.imgur.com/AH5p6N6.jpg'
                                    onChange={this.handleChangeAlterNoticiaImagemUrl}
                                    inputRef={ input => {this.inputAlterImgUrl = input}}
                                />
                                <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                validationState={this.getValidationStateAlterImagemDescricao()}
                            >
                                <ControlLabel >
                                    Descrição da Imagem
                                </ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.modalAlterNoticia.imgDescricao}
                                    placeholder='Descrição da Imagem'
                                    onChange={this.handleChangeAlterNoticiaImagemDescricao}
                                />
                                <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                validationState={this.getValidationStateAlterTitulo()}
                            >
                                <ControlLabel >
                                    Título da Notícia
                                </ControlLabel>
                                <FormControl
                                    type='text'
                                    value={this.state.modalAlterNoticia.titulo}
                                    placeholder='Informe o Título da Notícia'
                                    onChange={this.handleChangeAlterNoticiaTitulo}
                                />
                                <HelpBlock>Mínimo de 5 caracteres</HelpBlock>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel >
                                    Favorito
                                </ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="É Favorito?"
                                    value={this.state.modalAlterNoticia.favorito}
                                    onChange={this.handleChangeAlterNoticiaFavorito}
                                >
                                    <option value={false}>Não</option>
                                    <option value={true}>Sim</option>
                                </FormControl>
                                <HelpBlock>Indica se a notícia deve aparecer na página inicial</HelpBlock>
                            </FormGroup><
                            FormGroup
                                validationState={this.getValidationStateAlterCorpoTexto()}
                            >
                                <ControlLabel >
                                    Texto da Notícia
                                </ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    value={this.state.modalAlterNoticia.corpoTexto}
                                    placeholder='Informe todo o corpo da notícia'
                                    onChange={this.handleChangeAlterNoticiaTexto}
                                />
                                <HelpBlock>Informe aqui todo o texto da notícia</HelpBlock>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.handleSubmitUpdate}
                        >Confirmar</Button>
                        <Button
                            onClick={this.handleCloseModalAlterNoticia}
                        >Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps (state) {
    return {
        data: state.bombeiros.dashboardNoticias
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNoticia   : (Noticia) => dispatch(addNoticiaApi(Noticia)),
        getNoticia   : () => dispatch(getNoticiaApi()),
        deleteNoticia: (id) => dispatch(deleteNoticiaApi(id)),
        putNoticia   : (id, noticia) => dispatch(updateNoticiaApi(id, noticia))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardNoticias)