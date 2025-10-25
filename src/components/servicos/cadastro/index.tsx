"use client";

import { useState } from 'react'
import { Layout } from 'components'
import { Input, Message } from 'components'
import { useServicoService } from 'app/services'
import { Servico } from 'app/models/servicos'
import { converterEmBigDecimal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'

const validationSchema = yup.object().shape({
    servico: yup.string().trim().required("Campo obrigatório"),
    descricao: yup.string().trim().required("Campo obrigatório"),
    preco: yup.number().required("Campo obrigatório").moreThan(0, "Preço deve ser diferente de zero!"),
    duracao: yup.number().required("Campo obrigatório").moreThan(0, "A duração deve ser diferente de zero!")
})

interface FormErrors {
    servico?: string
    descricao?: string
    preco?: string
    duracao?: string
}

export const CadastroServicos: React.FC = ()=>{

    const service = useServicoService();
    const [ servico, setServico ] = useState<string>('')
    const [ descricao, setDescricao ] = useState<string>('')
    const [ preco, setpreco ] = useState<string>('')
    const [ duracao, setDuracao ] = useState<string>('')
    const [ id, setId ] = useState<string>('')
    const [ dataCadastro, setDataCadastro ] = useState<string>('')
    const [ messages, setMessages] = useState<Array<Alert>>([])
    const [ errors, setErrors ] = useState<FormErrors>({})

    const submit = () => {
        const novoServico: Servico = {
            id,
            dataCadastro,
            servico, 
            descricao, 
            valor: converterEmBigDecimal(preco), 
            duracao: converterEmBigDecimal(duracao)
        }
        validationSchema.validate(novoServico).then(obj => {
            setErrors({})

            if(id){
                service
                    .atualizar(novoServico)
                    .then(response => {
                        setMessages([
                            { texto:"Serviço atualizado com sucesso!", tipo:"success", titulo:"Sucesso!" }
                        ])
                    })
            }
            service
                .salvar(novoServico)
                .then(servicoResposta => {
                    setId(servicoResposta.id ?? '')
                    setDataCadastro(servicoResposta.dataCadastro ?? '')
                    setMessages([
                            { texto:"Serviço salvo com sucesso!", tipo:"success", titulo:"Sucesso!" }
                        ])
                })
        }).catch(err => {
            const field = err.path
            const message = err.message
            
            setErrors({
                [field]: message
            })
        })

            
    }

    return (
        <Layout titulo='Cadastro de Serviços' mensagens={messages}>
            {id &&
                <div className="field is-horizontal">
                    <Input value={id} label="Código:" id="codigo" columnClasses='is-half' disabled />
                    <Input value={dataCadastro} label="Data de Cadastro:" id="dataCadastro" columnClasses='is-half' disabled/>
                </div>         
            }
            <Input 
                onChange={setServico} 
                value={servico} 
                label="Serviço:" 
                id="servico" 
                columnClasses='is-full' 
                type='text' 
                placeholder='Lavagem Simples'
                error={errors.servico}
            />
            <Input 
                onChange={setDescricao} 
                value={descricao} 
                label="Breve Descição:" 
                id="descricao" 
                columnClasses='is-full' 
                type='text' 
                placeholder='Lavagem interna + aspiração'
                error={errors.descricao}
            />
            <div className="field is-horizontal">
                <Input 
                    onChange={setpreco} 
                    value={preco} 
                    label="Preço:" 
                    id="preco" 
                    columnClasses='is-half' 
                    type='text' 
                    placeholder='1.000,00' 
                    currency 
                    maxLength={16}
                    error={errors.preco}
                />
                <Input 
                    onChange={setDuracao} 
                    value={duracao} 
                    label="Duração em minutos:" 
                    id="duracao" 
                    columnClasses='is-half' 
                    type='number' 
                    placeholder='Quanto tempo dura o serviço?'
                    error={errors.duracao}
                />
            </div>
            
            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-primary is-dark" onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/servicos">
                        <button className="button">Voltar</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}