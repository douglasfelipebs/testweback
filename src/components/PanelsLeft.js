import React, { Component } from 'react'
import img from 'react-image'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { getAppApi } from "../actions/app";
import { acessoRapido, canvasDiasAcidentes } from './Layout.css'

class PanelsLeft extends Component {

    constructor() {
        super()
        this.state = {
            x: 100,
            y: 100
        }

        this.setDiasSemAcidenteCanvas = this.setDiasSemAcidenteCanvas.bind(this)
    }

    componentDidMount() {
        this.setDiasSemAcidenteCanvas()
    }

    setDiasSemAcidenteCanvas() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image
        let y = this.refs.image.height / 4
        let x = this.refs.image.width / 4

        this.setState({x: this.refs.image.width, y: this.refs.image.height})
        img.onload = () => {
            ctx.font = "normal normal bold 75px Franklin"
            let gradient = ctx.createLinearGradient(0,0,this.state.x,0)
            gradient.addColorStop(0,"rgb(150,10,0)")
            ctx.textAlign = "center"
            ctx.textBaseline = 'middle'
            ctx.fillStyle = gradient
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        var ctx = document.getElementById('myCanvas').getContext('2d');
        ctx.fillText(this.props.propDiasSemAcidentes.toString(), (this.state.x / 4),( this.state.y / 4 ))
        return null
    }


    render() {

        return(
            <div>
                <div>
                    <a href="/PrimeirosSocorros"><img src='https://i.imgur.com/ZqIRU4S.jpg' alt='descricaoImg' className={acessoRapido}/></a>
                    <a href="/Voluntario"><img src='https://i.imgur.com/rWUjuP8.jpg' alt='descricaoImg' className={acessoRapido}/></a>
                </div>
                <div>
                    <a href="tel:192"><img src='https://i.imgur.com/AH5p6N6.jpg'  alt='descricaoImg' className={acessoRapido}/></a>
                    <a href="tel:193"><img src='https://i.imgur.com/9Mbzmed.jpg' alt='descricaoImg' className={acessoRapido}/></a>
                </div>
                <div >
                    <a href="/Doacoes"><img src="https://i.imgur.com/YnbS1rw.jpg" alt='Faça sua doação' className={acessoRapido}/></a>
                    <canvas ref="canvas" id="myCanvas" contentEditable={222} width={this.state.y} height={this.state.x} className={canvasDiasAcidentes} />
                    <img src='https://i.imgur.com/kqWb6sZ.jpg' ref="image" alt='Dias sem acidentes'  className={acessoRapido}/>
                </div>
            </div>
        )
    }

}


PanelsLeft.propTypes = {
    propDiasSemAcidentes: PropTypes.number.isRequired
}


function mapStateToProps (state) {
    return {
        diasSemAcidentes: state.bombeiros.app.diasSemAcidentes
    }
}


export default connect(mapStateToProps)(PanelsLeft)