"use client";

import { useState } from 'react'
import { Layout } from 'components'
import { Input, Message } from 'components'
import { useServicoService } from 'app/services'
import { Servico } from 'app/models/servicos'
import { converterEmBigDecimal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    servico: yup.string().trim().required("Campo obrigatório"),
    descricao: yup.string().trim().required("Campo obrigatório"),
    preco: yup.number().required("Campo obrigatório").moreThan(0, "Preço deve ser diferente de zero"),
    duracao: yup.string().trim().required("Campo obrigatório")
})

export const CadastroServicos: React.FC = ()=>{

    const service = useServicoService();
    const [ servico, setServico ] = useState<string>('')
    const [ descricao, setDescricao ] = useState<string>('')
    const [ preco, setpreco ] = useState<string>('')
    const [ duracao, setDuracao ] = useState<string>('')
    const [ id, setId ] = useState<string>('')
    const [ dataCadastro, setDataCadastro ] = useState<string>('')
    const [ messages, setMessages] = useState<Array<Alert>>([])

    const submit = () => {
        const novoServico: Servico = {
            id,
            dataCadastro,
            servico, 
            descricao, 
            preco: converterEmBigDecimal(preco), 
            duracao: converterEmBigDecimal(duracao)
        }
        validationSchema.validate(novoServico).then(obj => {
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
                            { texto:"serviço salvo com sucesso!", tipo:"success", titulo:"Sucesso!" }
                        ])
                })
        }).catch(err => {
            const field = err.path
            const message = err.message
            console.log( JSON.parse(JSON.stringify(err)))

            setMessages([
                { titulo: "Algo deu errado :(", field:field, texto:message, tipo:"danger"}
            ])
        })

            
    }

    return (
        <Layout titulo='Cadastro de Serviços' mensagens={messages}>
            {id &&
                <div className="field is-horizontal">
                    <Input value={id} label="Código:" id="codigo" columnClasses='is-half' disabled/>
                    <Input value={dataCadastro} label="Data de Cadastro:" id="dataCadastro" columnClasses='is-half' disabled/>
                </div>         
            }
            <Input onChange={setServico} value={servico} label="Serviço:" id="servico" columnClasses='is-full' type='text' placeholder='Lavagem Simples'/>
            <Input onChange={setDescricao} value={descricao} label="Breve Descição:" id="descricao" columnClasses='is-full' type='text' placeholder='Lavagem interna + aspiração'/>
            <div className="field is-horizontal">
                <Input onChange={setpreco} value={preco} label="Preço:" id="preco" columnClasses='is-half' type='text' placeholder='1.000,00' currency maxLength={16}/>
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