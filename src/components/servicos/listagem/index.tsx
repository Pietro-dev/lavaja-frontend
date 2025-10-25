'use client'

import { Layout } from 'components/layout'
import Link from 'next/link'
import { TabelaServicos } from './tabela'
import { Servico } from 'app/models/servicos'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'

export const ListagemServicos: React.FC = () => {

    const { data:result, error } = useSWR<AxiosResponse<Servico[]>>('/api/servicos', (url:string) => httpClient.get(url) ) 

    if(!result){
        return(
            <div>Carregando</div>
        )
    }
    
    return(
        <Layout titulo='Serviços cadastrados'>
            <Link href="/cadastros/servicos">
                <button className="button is-primary is-dark">Novo</button>
            </Link>
            <TabelaServicos servicos={result?.data || []}/>
        </Layout>
 
    )
}