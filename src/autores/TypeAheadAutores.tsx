import axios, { AxiosResponse } from "axios"
import { useState } from "react"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { ReactElement } from "react-markdown/lib/react-markdown"
import { urlAutores } from "../utils/endpoints"
import { autorLibroDTO } from "./autores.model"

export default function TypeAheadActores(props: typeAheadActoresProps){
    const [estaCargando, setEstaCargando] = useState(false)
    const [opciones, setOpciones] = useState<autorLibroDTO[]>([])
    const seleccion: autorLibroDTO[] = [] 

    const [elementoArrastrado, setElementoArrastrado] = 
        useState<autorLibroDTO | undefined>(undefined)    
    

    function manejarBusqueda(query:string){
        setEstaCargando(true)
        axios.get(`${urlAutores}/buscarPorNombre/${query}`).then((respuesta:AxiosResponse<autorLibroDTO[]>)=>{
            setOpciones(respuesta.data)
            setEstaCargando(false)
        })
    }
    
    function manejarDragStart(actor:autorLibroDTO){
        setElementoArrastrado(actor)
    }

    function manejarDragOver(actor:autorLibroDTO){
        if(!elementoArrastrado){
            return
        }

        if(actor.id !== elementoArrastrado.id){
            const elementoArrastradoIndice = props.autores.findIndex(x => x.id === elementoArrastrado.id)
            const actorIndice = props.autores.findIndex(x => x.id === actor.id)
            const actores = [...props.autores]
            actores[actorIndice] = elementoArrastrado
            actores[elementoArrastradoIndice] = actor
            props.onAdd(actores)
        }
    }

    return(
        <>
            <label>Actores</label>
            <AsyncTypeahead
                id="typeahead"
                onChange={autores => {
                    if(props.autores.findIndex(x => x.id === autores[0].id) === -1){
                        props.onAdd([...props.autores, autores[0]])                            
                    }
                }}
                options={opciones}
                labelKey={actor => actor.nombre}
                filterBy={()=>true}
                isLoading={estaCargando}
                onSearch={manejarBusqueda}
                placeholder="Escriba el nombre del actor..."
                minLength={2}
                flip={true}
                selected={seleccion}
                renderMenuItemChildren={actor => (
                    <>
                        <img alt="imagen actor" src={ actor.foto }
                            style={{
                                height: '64px',
                                marginRight: '10px',
                                width: '64px'
                            }}
                        />
                        <span>{actor.nombre}</span>
                    </>
                )}              
            />
            <ul className="list-group">
                {props.autores.map(autor => <li 
                draggable={true}
                onDragStart={()=>manejarDragStart(autor)}
                onDragOver={()=>manejarDragOver(autor)}
                className="list-group-item list-group-item-action"
                key={autor.id}>
                    {props.listadoUI(autor)}
                    <span className="badge badge-primary badge-pill pointer" style={{marginLeft:'0.5rem'}}
                    onClick={()=>props.onRemove(autor)}
                    >X</span>
                </li>)}                
            </ul>
        </>
    )
}

interface typeAheadActoresProps{
    autores: autorLibroDTO[]
    onAdd(actores: autorLibroDTO[]): void
    listadoUI(actor: autorLibroDTO): ReactElement
    onRemove(actor: autorLibroDTO):void
}