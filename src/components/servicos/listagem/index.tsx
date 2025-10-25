import { Layout } from 'components/layout'
import Link from 'next/link'

export const ListagemServicos: React.FC = () => {
    return(
        <Link href="/cadastros/servicos">
            <Layout titulo='Serviços cadastrados'>
                <button className="button is-primary is-dark">Novo</button>
            </Layout>
        </Link>
    )
}