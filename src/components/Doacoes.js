import React, { Component } from 'react'
import { botaoPag, textoDoacao} from './Layout.css'

class Doacoes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dumpIpmsum: [
                'Atualmente a equipe dos bombeiros de Ibirama é composta por 30 integrantes, ',
                'dos quais 12 são efetivos e 18 são voluntários.',
                'Devido ao grande numero de voluntários e verbas que nem sempre são suficientes ',
                'para atualizarmos os equipamentos, contamos com a ajuda da população por meio ',
                'de doações para podermos atende-los melhor. A doação pode ser de qualquer valor e será ',
                'de grande ajuda para o Corpo de Bombeiros de Ibirama. Para fazer a sua doação basta  ',
                'clicar no botão abaixo e seguir as intruções.'
            ]
        }
    }

    render() {
        return (
            <div className={botaoPag}>
                <p className={textoDoacao}>
                    {this.state.dumpIpmsum}
                </p>
                <div>
                    <form action="https://pagseguro.uol.com.br/checkout/v2/donation.html" method="post">
                        <input type="hidden" name="currency" value="BRL" />
                        <input type="hidden" name="receiverEmail" value="bombeirosibirama@ibnet.com.br" />
                        <input type="hidden" name="iot" value="button" />
                        <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/205x30-doar.gif" name="submit" alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
                    </form>
                </div>
            </div>
        )
    }
}
export default Doacoes
