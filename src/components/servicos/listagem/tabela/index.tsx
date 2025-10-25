import { Servico } from 'app/models/servicos'

interface TabelaServicosProps {
    servicos: Array<Servico>
}

export const TabelaServicos: React.FC<TabelaServicosProps> = ({
    servicos
}) => {
    return(
        <table className="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Servico</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Duração</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {servicos.map(servico => <ServicoRow key={servico.id} servico={servico}/>)}
            </tbody>
        </table>
    )
}

interface ServicoRowProps {
    servico: Servico
}

const ServicoRow: React.FC<ServicoRowProps> = ({
    servico
}) => {
    return (
        <tr>
            <td>{servico.id}</td>
            <td>{servico.servico}</td>
            <td>{servico.descricao}</td>
            <td>{servico.valor}</td>
            <td>{servico.duracao}</td>
            <td>
                <div className='buttons'>
                    <button className='button is-warning is-dark'>Editar</button>
                    <button className='button is-danger is-dark'>Deletar</button>
                </div>
            </td>
        </tr>
    )
}