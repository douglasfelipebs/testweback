export default function removeAcento (text) {
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;
}

export default function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

/*<div
                    className={divItens}
                >
                    <li>
                        <ul>
                            <Link to="/Dashboard/Advices">Primeiros Socorros</Link>
                        </ul>
                        <ul>
                            <Link to="/Dashboard/News">Noticias</Link>
                        </ul>
                        <ul>
                            <Link to="/Dashboard/About">Sobre</Link>
                        </ul>
                        <ul>
                            <Link to="/Dashboard/Voluntary">Voluntários</Link>
                        </ul>
                    </li>
                </div>*/