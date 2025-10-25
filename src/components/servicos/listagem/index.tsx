'use client'

import { Layout, Loader } from 'components'
import Link from 'next/link'
import { TabelaServicos } from './tabela'
import { Servico } from 'app/models/servicos'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'

export const ListagemServicos: React.FC = () => {

    const { data:result, error } = useSWR<AxiosResponse<Servico[]>>('/api/servicos', (url:string) => httpClient.get(url) ) 

    const editar = (servico:Servico) => {
        console.log(servico)
    }
    const deletar = (servico:Servico) => {
        console.log(servico)
    }
    
    if(!result){
        return(
            <Loader show={!result}/>
        )
    }
    
    return(
        <Layout titulo='Serviços cadastrados'>
            <Link href="/cadastros/servicos">
                <button className="button is-primary is-dark">Novo</button>
                <br />
                <br />
            </Link>
            <TabelaServicos onEdit={editar} onDelete={deletar} servicos={result?.data || []}/>
        </Layout>
 
    )
}