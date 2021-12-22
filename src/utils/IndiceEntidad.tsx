import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Button from "../utils/Button"
import confirmar from "./Confirmar";
import Paginacion from "./Paginacion";
import ListadoGenerico from "../utils/ListadoGenerico"

export default function IndiceEntidad<T>(props: indiceEntidadProps<T>) {
    const [entidades, setEntidades] = useState<T[]>()
    const [totalDePaginas, setTotalDePaginas] = useState(0)
    const [recordsPorPagina, setRecordsPorPagina] = useState(3)
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        cargarDatos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, recordsPorPagina])

    function cargarDatos() {
        axios.get(props.url, {
            params: { pagina, recordsPorPagina }
        })
            .then((respuesta: AxiosResponse<T[]>) => {
                const totalDeRegistros = parseInt(respuesta.headers['cantidadtotalregistros'], 10)
                setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina))
                console.log(respuesta.data)
                setEntidades(respuesta.data)
            })
    }

    async function borrar(id: number) {
        await axios.delete(`${props.url}/${id}`).then(response => {
            cargarDatos()
        })
            .catch(error => {

            })
    }

    const botones = (urlEditar: string, id: number) => <>
        <Link className="btn btn-success" to={urlEditar}>Editar</Link>
        <Button
            onClick={() => confirmar(() => borrar(id))}
            className="btn btn-danger">Borrar</Button>
    </>

    return (
        <>
            <h3>{props.titulo}</h3>
            {props.urlCrear ? <Link className="btn btn-primary" to={props.urlCrear}>
                Crear {props.nombreEntidad}
            </Link> : null}

            <div className="form-group" style={{ width: '150px' }}>
                <label>Registros por página:</label>
                <select
                    className="form-control"
                    defaultValue={10}
                    onChange={e => {
                        setPagina(1)
                        setRecordsPorPagina(parseInt(e.currentTarget.value, 10))
                    }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <Paginacion cantidadTotalDePaginas={totalDePaginas}
                paginaActual={pagina} onChange={nuevaPagina => setPagina(nuevaPagina)} />

            <ListadoGenerico listado={entidades}>
                <table className="table table-striped">
                    {props.children(entidades!, botones)}
                </table>
            </ListadoGenerico>
        </>
    )
}

interface indiceEntidadProps<T> {
    url: string
    urlCrear?: string
    children(entidades: T[],
        botones: (urlEditar: string, id: number) => ReactElement): ReactElement
    titulo: string
    nombreEntidad?: string
}