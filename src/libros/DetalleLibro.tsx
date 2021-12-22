import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlLibros } from "../utils/endpoints";
import { libroDTO } from "./libros.model";
import Cargando from "../utils/Cargando";

export default function DetalleLibro() {
    const { id }: any = useParams();
    const [libro, setLibro] = useState<libroDTO>();

    useEffect(() => {
        axios.get(`${urlLibros}/${id}`)
            .then((respuesta: AxiosResponse<libroDTO>) => {
                respuesta.data.fechaPublicacion = new Date(respuesta.data.fechaPublicacion);
                setLibro(respuesta.data);
            })
    }, [id])

    return (
        libro ?
            <div style={{ display: 'flex' }}>
                <div>
                    <h2>{libro.titulo} ({libro.fechaPublicacion.getFullYear()})</h2>
                    {libro.categorias?.map(categoria =>
                        <Link key={categoria.id} style={{ marginRight: '5px' }}
                            className="btn btn-primary btn-sm rounded-pill"
                            to={`/categorias/filtrar?categoriaId=${categoria.id}`}
                        >{categoria.nombre}</Link>)
                    }
                    | {libro.fechaPublicacion.toDateString()}
                    
                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                        <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                            <img src={libro.imagen}
                                style={{ width: '225px', height: '315px' }}
                                alt="poster"
                            />
                        </span>                        
                    </div>

                    {libro.subtitulo ?
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Sub titulo</h3>
                            <div>
                                <ReactMarkdown>{libro.subtitulo}</ReactMarkdown>
                            </div>
                        </div> : null}

                    {libro.autores && libro.autores.length > 0 ?
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Autores</h3>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {libro.autores?.map(autor =>
                                    <div key={autor.id} style={{ marginBottom: '2px' }}>
                                        <img alt="foto" src={autor.foto}
                                            style={{ width: '50px', verticalAlign: 'middle' }} />
                                        <span style={{
                                            display: 'inline-block', width: '200px',
                                            marginLeft: '1rem'
                                        }}>
                                            {autor.nombre}
                                        </span>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '45px'
                                        }}>...</span>                                        
                                    </div>)}
                            </div>
                        </div> : null}
                </div>
            </div> : <Cargando />
    )
}