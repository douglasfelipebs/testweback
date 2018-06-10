import React, { Component } from 'react'
import ReactTable from 'react-table'
import { Button, ButtonToolbar } from 'react-bootstrap'
import * as FontAwesome from 'react-icons/lib/fa'
import { getVoluntarioApi, deleteVoluntarioApi } from '../actions/bombeiroVoluntario'
import {centerAll, divDashboardVoluntarios, plusToCross} from './Layout.css'
import {connect} from "react-redux"
import * as moment from 'moment'
import 'moment/locale/pt-br'
import swal from "sweetalert";

class DashboardBombeirosVoluntarios extends Component {

    constructor(props) {
        super(props)
        moment.locale('pt-BR')
        this.state = {
            columns: [{
                Header: 'Nome',
                accessor: 'name' // String-based value accessors!
            }, {
                Header: 'Email',
                accessor: 'email',
            }, {
                Header: 'Telefone', // Required because our accessor is not a string
                accessor: 'telefone',
            }, {
                Header: 'Endereco', // Custom header components!
                accessor: 'endereco'
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
                            </ButtonToolbar>}
                        </div>
                    ),
                    Filter: ({ filter, onChange }) =>
                        <div
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", marginTop: "2%" }}
                        >
                            <strong>Excluir</strong>
                        </div>
                }]
            }]
        }

        this.handleDelete = this.handleDelete.bind(this)
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
                    this.props.delVoluntario(row.original._id)
                    swal("Ok! O bombeiro voluntário foi deletado com sucesso!", {
                        icon: "success",
                    });
                } else {
                    swal("O bombeiro voluntário não foi deletado!");
                }
            });
    }

    componentDidMount() {
        this.props.getVoluntarios()
    }

    render() {
        return (
            <div className={divDashboardVoluntarios}>
                <ReactTable
                    data={this.props.data}
                    columns={this.state.columns}
                    defaultPageSize={10}
                    pageSizeOptions={[10, 13, 15, 20]}
                    filterable={true}
                    noDataText={'Nenhum Registro Foi Encontrado'}
                    previousText={'Anterior'}
                    nextText={'Próxima'}
                    pageText={'Página'}
                    ofText={'de'}
                    rowsText={'Registros'}
                    defaultSorted={[
                        {
                            id: "date",
                            desc: true
                        }
                    ]}
                    className="-striped -highlight"
                />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        data: state.bombeiros.bombeirosVoluntarios
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getVoluntarios: () => dispatch(getVoluntarioApi()),
        delVoluntario : (id) => dispatch(deleteVoluntarioApi(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardBombeirosVoluntarios)