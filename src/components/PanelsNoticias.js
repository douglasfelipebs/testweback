import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import  CardNoticia  from './CardNoticia'
import {getNoticiaApi} from "../actions/dashboardNoticia";

class PanelsNoticias extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getNoticia()
    }

    render() {

        return(
            <div>
                {this.props.noticias.map((noticia) =>
                    <CardNoticia
                        key={noticia._id}
                        imgUrl={noticia.imgUrl}
                        imgDescricao={noticia.imgDescricao}
                        corpoTexto={noticia.corpoTexto}
                        props={this.props.props}
                    />
                )}
            </div>
        )
    }

}

function mapStateToProps (state) {
    return {
        noticias: state.bombeiros.dashboardNoticias.sort(sortBy('favorito', 'date')).splice(0,5)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNoticia: () => dispatch(getNoticiaApi()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelsNoticias)

