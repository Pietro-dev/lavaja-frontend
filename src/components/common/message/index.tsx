'use client'

import { useState } from 'react'

interface MessageProps {
    tipo: string
    texto: string
    titulo: string
    field?: string
}

export interface Alert {
    tipo: string
    texto: string
    titulo: string
    field?: string
}

export const Message: React.FC<MessageProps> = ({
    texto,
    tipo,
    titulo,
    field
}) => {
    const [ visible, setVisible ] = useState<Boolean>(true);

    if(!visible) return null
    return(
        <article className={`message is-${tipo}`}>
        <div className="message-header">
            <p>{titulo}</p>
            <button className="delete" aria-label="delete" onClick={()=>{setVisible(false)}}></button>
        </div>
        <div className="message-body">
            { field && `${field}: `}{texto}
        </div>
        </article>
    )
}