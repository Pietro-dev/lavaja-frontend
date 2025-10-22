import { ReactNode } from 'react'
import { Menu } from './menu'

interface LayoutProps {
    titulo?: string  
    children?: ReactNode
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps)=>{
    return (
        <div className="app">
            <section className="main-content columns is-fullheight">
                <Menu />

                <div className="container column is-10">
                    <div className="section">
                        <div className="card">
                            <header className="card-header">
                                <div className="card-content">
                                <p className="title">
                                  {props.titulo}  
                                </p>                                   
                                </div>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}