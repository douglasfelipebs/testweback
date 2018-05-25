import React, { Component } from 'react'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import removeAcento from '../utils/index'

class ConsultaPrimeirosSocorros extends Component {

    constructor() {
        super()

        this.state = {
            columns : [{
                Header: 'Título',
                accessor: 'titulo', // String-based value accessors!
                filterMethod: (filter, row) => {
                    let pattern = new RegExp(`${filter.value.toLocaleLowerCase()}*`)
                    return pattern.test(row.titulo.toLocaleLowerCase())
                }
            }, {
                Header: 'Sintomas',
                accessor: 'descricaoSintomas',
                Cell: props => <span>
                    {(props.value.length > 100)?( props.value.slice(0, 100) + '...'):(props.value)}
                    </span>, // Custom cell components!
                filterMethod: (filter, row) => {
                    let pattern = new RegExp(`${removeAcento(filter.value.toLocaleLowerCase())}*`)
                    return pattern.test(removeAcento(row.descricaoSintomas.toLocaleLowerCase()))
                }
            },]
        }
    }


    render() {
        console.log('Props', this.props)

        return(
            <div
                className='panelReactTable'
            >
                <ReactTable
                    data={this.props.data}
                    columns={this.state.columns}
                    defaultPageSize={13}
                    pageSizeOptions={[10, 13, 15, 20]}
                    filterable={true}
                    previousText={'Anterior'}
                    nextText={'Próxima'}
                    pageText={'Página'}
                    ofText={'de'}
                    rowsText={'Registros'}
                    className='tableReact'
                />

            </div>
        )
    }

}

function mapStateToProps (state) {
    console.log(state)
    return {
        data:
            [
                {
                    id: 1,
                    titulo: 'Parada Respiratória',
                    sintomasId: [1,2,3],
                    sintomas: [
                        {
                            id: 1,
                            descricao: 'Inconsciêcia',
                            urlImg: '',
                            descricaoImg: ''
                        },
                        {
                            id: 2 ,
                            descricao: 'Tórax imóvel',
                            urlImg: '',
                            descricaoImg: ''
                        },
                        {
                            id: 3,
                            descricao: 'Ausência de saída de ar pelas vias aéreas (boca e nariz)',
                            urlImg: '',
                            descricaoImg: ''
                        }
                    ],
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    oqFazerId: [1,2,3],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 2,
                    titulo: 'Parada Cardíaca',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [1,4,5],
                    oqFazerId: [4],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 3,
                    titulo: 'Vítima inconsciente',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [5,6,7,8,9,10],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 4,
                    titulo: 'Ferimento',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [11 , 12],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 5,
                    titulo: 'Escoriação',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [13,14,15],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 6,
                    titulo: 'Amputação',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [16,17,18],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 7,
                    titulo: 'Ferimentos nos olhos',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [19,20,21],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 8,
                    titulo: 'Ferimentos com objetos encravados',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [22,23,24],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 9,
                    titulo: 'Hemorragias',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [6],
                    oqFazerId: [16 , 25, 26],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 10,
                    titulo: 'Queimaduras',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [7],
                    oqFazerId: [27,28,29,30],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 11,
                    titulo: 'Fratura',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [31],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 12,
                    titulo: 'Desmaios',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [8,9,10,11,12,13,14],
                    oqFazerId: [34,35,36],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 12,
                    titulo: 'Convulsões',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [37,38,39],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 13,
                    titulo: 'Choques Elétricos',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [],
                    oqFazerId: [40,41,42],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 14,
                    titulo: 'Intoxicações',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [15,16,17,18,19,20],
                    oqFazerId: [43,44],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
                {
                    id: 15,
                    titulo: 'Zoonoses - picadas ou contato com animais',
                    descricaoSintomas: 'Sintomas devem vir aqui',
                    sintomasId: [21,22,23,24,25,26,27],
                    oqFazerId: [45,46,47,48,49,50,51],
                    urlImg: '',
                    descricaoImg: '',
                    user: {},
                    dataHora: '',
                    clicked: 0
                },
            ],
    }
}

export default connect(mapStateToProps)(ConsultaPrimeirosSocorros)