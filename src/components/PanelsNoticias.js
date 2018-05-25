import React, { Component } from 'react'
import  CardNoticia  from './CardNoticia'

class PanelsNoticias extends Component {

    render() {
        return(
            <div>
                <CardNoticia/>
                <CardNoticia/>
                <CardNoticia/>
                <CardNoticia/>
                <CardNoticia/>
            </div>
        )
    }

}
export default PanelsNoticias

