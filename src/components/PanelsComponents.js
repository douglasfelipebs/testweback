import React, { Component } from 'react'
import PanelsLeft from './PanelsLeft'
import PanelsNoticias from './PanelsNoticias'
import { AllPanels, panelsLeft, panelsNoticias } from './Layout.css'


class PanelsComponents extends Component {

    render() {
        return(
            <div className={AllPanels}>
                <div className={panelsLeft}>
                    <PanelsLeft />
                </div>
                <div className={panelsNoticias}>
                    <PanelsNoticias />
                </div>
            </div>
        )
    }

}
export default PanelsComponents