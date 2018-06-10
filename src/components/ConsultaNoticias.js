import React, { Component } from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import * as moment from 'moment'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import {getNoticiaApi} from "../actions/dashboardNoticia";
import {centerStar, divDashboardNoticiaGeral, divDashboardVoluntarios} from './Layout.css'

class ConsultaNoticias extends Component {

    constructor(props) {
        super(props)
        moment.locale('pt-BR')
        this.state = {
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
            }]
        }
    }

    componentDidMount() {
        this.props.getNoticia()
    }

    render () {
        return (
            <div className={divDashboardNoticiaGeral}>
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
        getNoticia: () => dispatch(getNoticiaApi())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsultaNoticias)

/* */