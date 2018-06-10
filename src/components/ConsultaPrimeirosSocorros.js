import React, { Component } from 'react'
import ReactTable from 'react-table'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import { connect } from 'react-redux'
import {divDashboardNoticiaGeral, divDashboardVoluntarios} from "./Layout.css";
import {getPrimeirosSocorrosApi} from "../actions/dashboardPrimeirosSocorros";

class ConsultaPrimeirosSocorros extends Component {

    constructor(props) {
        super(props)
        moment.locale('pt-BR')

        this.state = {
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
    }

    componentDidMount() {
        this.props.getPrimeirosSocorros()
    }

    render() {

        return(
            <div
                className={divDashboardVoluntarios}
            >
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsultaPrimeirosSocorros)