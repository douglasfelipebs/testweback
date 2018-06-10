import React, { Component } from 'react'
import PanelsLeft from './PanelsLeft'
import PanelsNoticias from './PanelsNoticias'
import { AllPanels, panelsLeft, panelsNoticias } from './Layout.css'
import {getAppApi} from "../actions/app";
import {getNoticiaApi} from "../actions/dashboardNoticia";
import {connect} from "react-redux";


class PanelsComponents extends Component {

    componentDidMount() {
        this.props.getDiasSemAcidentes();
        this.props.getNoticias();
    }

    render() {
        return(
            <div className={AllPanels}>
                <div className={panelsLeft}>
                    <PanelsLeft propDiasSemAcidentes={this.props.diasSemAcidentes} />
                </div>
                <div className={panelsNoticias}>
                    <PanelsNoticias props={this.props.props} />
                </div>
            </div>
        )
    }

}

function mapStateToProps (state) {
    return {
        diasSemAcidentes: state.bombeiros.app.diasSemAcidentes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDiasSemAcidentes: () => dispatch(getAppApi()),
        getNoticias: () => dispatch(getNoticiaApi())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PanelsComponents)