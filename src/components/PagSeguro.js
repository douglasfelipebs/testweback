
const PagSeguro = () => {
    return (
        <form action="https://pagseguro.uol.com.br/checkout/v2/donation.html" method="post">
            <input type="hidden" name="currency" value="BRL" />
            <input type="hidden" name="receiverEmail" value="bombeirosibirama@ibnet.com.br" />
            <input type="hidden" name="iot" value="button" />
            <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/205x30-doar.gif" name="submit" alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
        </form>
    )
}
export default PagSeguro