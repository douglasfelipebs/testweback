import React, { Component } from 'react'
import { indice, textoSobre, corpo, fantasma, content, partCorpo } from './Layout.css'

class Sobre extends Component {

    constructor() {
        super()

        this.state = {
            dumpIpmsum: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Ut a sem eu orci imperdiet tincidunt ut tempor sem.',
                'Integer ornare dictum tortor mattis dapibus.',
                'Donec sit amet sagittis ligula.'
            ]
        }

    }

    render() {
        return(
            <div className={content}>
                <div className={indice}>
                    <ul>
                        <li
                            onClick={() => {
                                this.refs.volu.focus()
                            }}
                        >História do CBI</li>
                        <li>Diferença entre Bombeiros e SAMU</li>
                        <li>Equipamentos</li>
                        <li>Bombeiros</li>
                        <li>Voluntários</li>
                    </ul>
                </div>
                <div className={fantasma}></div>
                <div className={corpo}>
                    <div ref='hist' className={partCorpo}>
                        <h1>História do CBI</h1>
                        <p className={textoSobre}>
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                        </p>
                    </div>
                    <div ref='dife' className={partCorpo}>
                        <h1>Diferença entre Bombeiros e SAMU</h1>
                        <p className={textoSobre}>
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                            {this.state.dumpIpmsum.slice(0, 3)}
                        </p>
                    </div>
                    <div ref='equi' className={partCorpo}>
                        <h1>Equipamentos:</h1>
                        <ul>
                            <li>Equipamento Teste 01</li>
                            <li>Equipamento Teste 02</li>
                            <li>Equipamento Teste 03</li>
                            <li>Equipamento Teste 04</li>
                            <li>Equipamento Teste 05</li>
                            <li>Equipamento Teste 06</li>
                            <li>Equipamento Teste 07</li>
                            <li>Equipamento Teste 08</li>
                            <li>Equipamento Teste 09</li>
                            <li>Equipamento Teste 10</li>
                            <li>Equipamento Teste 11</li>
                            <li>Equipamento Teste 12</li>
                            <li>Equipamento Teste 13</li>
                        </ul>
                    </div>
                    <div ref='bomb' className={partCorpo}>
                        <h1>Bombeiros:</h1>
                        <ul>
                            <li>Bombeiro Teste 01</li>
                            <li>Bombeiro Teste 02</li>
                            <li>Bombeiro Teste 03</li>
                            <li>Bombeiro Teste 04</li>
                            <li>Bombeiro Teste 05</li>
                            <li>Bombeiro Teste 06</li>
                            <li>Bombeiro Teste 07</li>
                            <li>Bombeiro Teste 08</li>
                            <li>Bombeiro Teste 09</li>
                            <li>Bombeiro Teste 10</li>
                            <li>Bombeiro Teste 11</li>
                            <li>Bombeiro Teste 12</li>
                            <li>Bombeiro Teste 13</li>
                        </ul>
                    </div>
                    <div ref='volu' className={partCorpo}>
                        <h1>Voluntários:</h1>
                        <ul>
                            <li>Voluntário Teste 01</li>
                            <li>Voluntário Teste 02</li>
                            <li>Voluntário Teste 03</li>
                            <li>Voluntário Teste 04</li>
                            <li>Voluntário Teste 05</li>
                            <li>Voluntário Teste 06</li>
                            <li>Voluntário Teste 07</li>
                            <li>Voluntário Teste 08</li>
                            <li>Voluntário Teste 09</li>
                            <li>Voluntário Teste 10</li>
                            <li>Voluntário Teste 11</li>
                            <li>Voluntário Teste 12</li>
                            <li>Voluntário Teste 13</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
export default Sobre