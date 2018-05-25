import React, { Component } from 'react'
import img from 'react-image'
import { connect } from "react-redux"
import { acessoRapido, canvasDiasAcidentes } from './Layout.css'

class PanelsLeft extends Component {

    constructor() {
        super()

        this.state = {
            x: 100,
            y: 100
        }
    }

    componentDidMount() {
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
            ctx.fillText(this.props.diasSemAcidentes.toString(), x, y)
        }
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
                    <canvas ref="canvas" width={this.state.y} height={this.state.x} className={canvasDiasAcidentes} />
                    <img src='https://i.imgur.com/kqWb6sZ.jpg' ref="image" alt='Dias sem acidentes' className={acessoRapido}/>
                </div>
            </div>
        )
    }

}

function mapStateToProps (state) {
    return {
        diasSemAcidentes: 180
    }
}

export default connect(mapStateToProps)(PanelsLeft)