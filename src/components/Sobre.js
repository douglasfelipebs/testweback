import React, { Component } from 'react'
import { indice, textoSobre, corpo, fantasma, contentSobre, partCorpo, h1, quandoChamar} from './Layout.css'

class Sobre extends Component {

    constructor() {
        super()

    }

    render() {
        return(
            <div className={contentSobre}>
                <div className={corpo}>
                    <div ref='hist' className={partCorpo}>
                        <h1>História do CBI</h1>
                        <div className={textoSobre}>
                            <p>
                            O serviço de bombeiros nasceu como quase tudo o que o homem criou, por necessidade. Necessidade de se evitar possíveis incêndios e perdas insuperáveis. Em épocas remotas apagar as chamas de um incêndio de grandes proporções era obra impossível, devido aos precários recursos, a prevenção tornava-se a melhor solução contra o fogo.
                            </p>
                            <p>
                            No Brasil existem mais de 5.565 municípios (CENSO, 2010) e, destes, menos de 800 possuem bombeiros militares instalados. A solução, principalmente na Região Sul do país, tem sido o modelo de Bombeiro Voluntário.
                            O modelo de Bombeiro Voluntário vem prestando socorro a pessoas, reduzindo danos à vida e ao patrimônio há mais de um século e assim procuram autonomamente resolver problemas da sociedade no que diz respeito à Defesa Civil e atendimento a eventos danosos, já que o erário é insuficiente para atender todas as necessidades das cidades.
                            </p>
                            <p>
                            O modelo propagou-se por todo o Brasil, inicialmente em 1892 e de forma pioneira em nosso estado, com a instalação da corporação de Joinvile, mas nos dias de hoje, ainda encontra-se incipiente, pois cerca de apenas 14,38% das cidades brasileiras contam com serviços de bombeiros, deixando assim a população a mercê de perdas patrimoniais e humanas.
                            </p>
                            <p>
                            Em 06 de novembro de 1979, foi fundado o Corpo de Bombeiros Voluntários de Ibirama, uma entidade sem fins lucrativos que visava o atendimento de urgência e emergência a população em geral. No entanto ficou no papel por alguns anos.  Em 1982, Júlio César Mocelin colocou o Corpo de Bombeiros na ativa, elegendo uma Diretoria e escolhendo o Comandante e Sub-Comandantes. Quem assumiu o Comando foi Bodô Matter e o Sub-Comando Amauri Vipcchi, funcionários da Sadia. Foi a partir desse comando que se formou a escola de treinamento para voluntários, por meio de equipamentos emprestados pela Sadia S/A.
                            </p>
                            <p>
                            Dentre os primeiros bombeiros, alguns foram contratados pela Prefeitura e outros trabalhavam como voluntários. As empresas liberavam os funcionários para que prestasse serviços a Corporação. Até os dias de hoje algumas empresas liberam seus funcionários, sem descontar o dia de trabalho.
                            </p>
                            <p>
                            Através de diversas doações da Prefeitura, do Estado e principalmente da comunidade, construiu-se a sede própria, adquiriu-se caminhões de combate a incêndio, ambulâncias e equipamentos sofisticados, bem como se tem garantido a manutenção da prestação dos serviços com qualidade.
                            </p>
                            <p>
                            Desde lá até os dias atuais foi considerável o crescimento que a entidade teve perante a sociedade e outras corporações. Este crescimento proporcionou inúmeros benefícios para toda a sociedade. Porém, o grande desafio é ampliar a entidade, principalmente com a relação à força de trabalho, significando melhorias no atual atendimento e novas abordagens perante os problemas da sociedade, que contam com a efetiva participação e colaboração dos bombeiros.
                            </p>
                            <p>
                                Atualmente a equipe dos bombeiros de Ibirama é composta por 30 integrantes, dos quais 12 são efetivos e 18 são voluntários.
                            </p>
                            <p>
                            Função Social: Prevenção e combate a incêndio e atendimento de emergência pré-hospitalar, resgate, busca e salvamento.
                            Missão: Salvar vidas e patrimônios.
                            Visão: Ser referência nacional no exercício da função de bombeiros voluntários.
                            Princípios/Valores: Voluntariedade, comprometimento, ética e transparência, valorização social, planejamento e gestão participativa, envolvimento, responsabilidade, profissionalismo e solidariedade.
                            Natureza da Entidade: Assistência social.
                            Registros Legais: Atos constitutivos, Leis de utilidades públicas municipal, estadual e federal, com reconhecimento de filantropia.
                            </p>
                        </div>
                    </div>
                    <div ref='dife' className={partCorpo}>
                        <h1>Diferença entre Bombeiros e SAMU</h1>
                        <div className={textoSobre}>
                            <p>
                            Existem diferenças entre o Corpo de Bombeiros e o SAMU devido a
                            como é feito o treinamento dos profissionais que atuam em cada área.
                            </p>
                            <p>As equipes de SAMU são formadas por técnicos de enfermagem, enfermeiros ou médicos
                            que atendem qualquer situação de origem clínica. Ao ligar para o SAMU os atendentes irão
                            realizar alguns questionamentos sobre o estado da pessoa.
                            </p>
                            <div className={quandoChamar}>
                                <h3>Quando chamar o SAMU:</h3>
                                <ul>
                                    <li>Dores com início súbito.</li>
                                    <li>Envenenamento ou Intoxicação.</li>
                                    <li>Queimaduras graves.</li>
                                    <li>Trabalho de parto com risco.</li>
                                    <li>Convulsões.</li>
                                    <li>Perda de conciência.</li>
                                    <li>Parada cardíaca.</li>
                                    <li>AVC.</li>
                                    <li>Infarto.</li>
                                    <li>Surtos psicóticos.</li>
                                    <li>Tranferência Iter-Hospitalar</li>
                                </ul>
                            </div>
                            <p>
                                Já o corpo de bombeiros presta atendimento de qualquer situação de origem traumática
                                (lesão causada por um agente externo). Ao ligar para o corpo de bombeiros, os questionamentos
                                serão mais simples, como localização e a situação, por exemplo.
                            </p>
                            <div className={quandoChamar}>
                                <h3>Quando chamar o Corpo de Bombeiros:</h3>
                                <ul>
                                    <li>Incêndios.</li>
                                    <li>Salvamento Aquático.</li>
                                    <li>Desabamentos.</li>
                                    <li>Choque elétrico.</li>
                                    <li>Vazamento de gás.</li>
                                    <li>Salvamento em locais de difícil acesso.</li>
                                    <li>Soterramentos.</li>
                                    <li>Acidentes com veículos.</li>
                                    <li>Capotamentos.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Sobre
