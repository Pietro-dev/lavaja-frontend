import { Layout } from 'components/layout'
import Link from 'next/link'
import { TabelaServicos } from './tabela'
import { Servico } from 'app/models/servicos'

export const ListagemServicos: React.FC = () => {

    const servicos: Servico[] = [{
        id: '1', servico: 'teste', descricao: 'teste', preco: 50, duracao: 30
    },{
        id: '2', servico: 'teste', descricao: 'teste', preco: 50, duracao: 30
    },{
        id: '3', servico: 'teste', descricao: 'teste', preco: 50, duracao: 30
    },{
        id: '4', servico: 'teste', descricao: 'teste', preco: 50, duracao: 30
    }
    ]
    
    return(
        <Layout titulo='Serviços cadastrados'>
            <Link href="/cadastros/servicos">
                <TabelaServicos servicos={servicos}/>
                <button className="button is-primary is-dark">Novo</button>
            </Link>
        </Layout>
 
    )
}