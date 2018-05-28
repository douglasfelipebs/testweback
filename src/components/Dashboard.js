import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import * as FontAwesome from 'react-icons/lib/fa'
import { divDashboard, divItens, iconBurguer, itensListSlide, slideClass,
         iconsAwesome, bodySlide } from './Layout.css'

import { connect } from 'react-redux'

class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dumpIpmsum: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Ut a sem eu orci imperdiet tincidunt ut tempor sem.',
                'Integer ornare dictum tortor mattis dapibus.',
                'Donec sit amet sagittis ligula.'
            ],
            menuOpen: false
        }

    }

    getItens() {
        let items;

        items = [
            <div key='1'>
                <FontAwesome.FaAsterisk className={iconsAwesome}/>
                <Link to="/Dashboard">Geral</Link>
            </div>,
            <div key='2'>
                <FontAwesome.FaPlus className={iconsAwesome}/>
                <Link to="/Dashboard/Advices">Primeiros Socorros</Link>
            </div>,
            <div key='3'>
                <FontAwesome.FaClone className={iconsAwesome}/>
                <Link to="/Dashboard/News">Noticias</Link>
            </div>,
            <div key='4'>
                <FontAwesome.FaPencil className={iconsAwesome}/>
                <Link to="/Dashboard/About">Sobre</Link>
            </div>,
            <div key='5'>
                <FontAwesome.FaPiedPiperAlt className={iconsAwesome}/>
                <Link to="/Dashboard/Voluntary">Voluntários</Link>
            </div>
        ]

        return items
    }


    render() {
        let items = this.getItens()

        return(
            <div
                className={divDashboard}
            >
                <Menu
                    noOverlay
                    disableOverlayClick
                    customBurgerIcon={<FontAwesome.FaAlignJustify/>}
                    burgerButtonClassName={iconBurguer}
                    customCrossIcon={<FontAwesome.FaClose/>}
                    itemListClassName={itensListSlide}
                    menuClassName={slideClass}
                    overlayClassName={bodySlide}
                    id={'slide'}
                    isOpen={false}
                >
                    {items}
                </Menu>
                <Switch>
                    <Route exact path="Dashboard" />
                </Switch>
            </div>
        )
    }


}

function mapStateToProps (state) {
    return {
        logging: state.session.authenticated,
    }
}

export default connect(mapStateToProps, null)(Dashboard)