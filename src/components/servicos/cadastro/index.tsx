"use client";

import { useState } from 'react'
import { Layout } from 'components'
import { Input } from 'components'
import { useServicoService } from 'app/services'
import { Servico } from 'app/models/servicos'

export const CadastroServicos: React.FC = ()=>{

    const service = useServicoService();
    const [ servico, setServico ] = useState<string>('')
    const [ descricao, setDescricao ] = useState<string>('')
    const [ valor, setValor ] = useState<string>('')
    const [ duracao, setDuracao ] = useState<string>('')
    const [ id, setId] = useState<string>('')
    const [ dataCadastro, setDataCadastro ] = useState<string>('')

    const submit = () => {
        const novoServico: Servico = {
            id,
            dataCadastro,
            servico, 
            descricao, 
            valor: parseFloat(valor), 
            duracao: parseFloat(duracao)
        }

        if(id){
            service
                .atualizar(novoServico)
                .then(response => {console.log("Atualizado!")
                    
                })
        }
        service
            .salvar(novoServico)
            .then(servicoResposta => {
                setId(servicoResposta.id ?? '')
                setDataCadastro(servicoResposta.dataCadastro ?? '')
            })
            
    }

    return (
        <Layout titulo='Cadastro de Serviços'>
            {id &&
                <div className="field is-horizontal">
                    <Input value={id} label="Código:" id="codigo" columnClasses='is-half' disabled/>
                    <Input value={dataCadastro} label="Data de Cadastro:" id="dataCadastro" columnClasses='is-half' disabled/>
                </div>         
            }
            <Input onChange={setServico} value={servico} label="Serviço:" id="servico" columnClasses='is-full' type='text' placeholder='Lavagem Simples'/>
            <Input onChange={setDescricao} value={descricao} label="Breve Descição:" id="descricao" columnClasses='is-full' type='text' placeholder='Lavagem interna + aspiração'/>
            <div className="field is-horizontal">
                <Input onChange={setValor} value={valor} label="Valor:" id="valor" columnClasses='is-half' type='number' placeholder='Valor do serviço'/>
                <Input onChange={setDuracao} value={duracao} label="Duração em minutos:" id="duracao" columnClasses='is-half' type='number' placeholder='Quanto tempo dura o serviço?'/>
            </div>
            
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-primary is-dark" onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <button className="button">Voltar</button>
                </div>
            </div>
        </Layout>
    )
}