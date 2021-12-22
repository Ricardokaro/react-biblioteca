import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { categoriaDTO } from "../categorias/categorias.model";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../utils/Button";
import { urlCategorias, urlLibros} from "../utils/endpoints";
import ListadaLibros from "./ListadoLibros";
import { libroDTO } from "./libros.model";
import Paginacion from '../utils/Paginacion'

export default function FiltroLibros() {

    const valorInicial: filtroLibrosForm = {
        titulo: '',
        categoriaId: 0,        
        pagina: 1,
        recordsPorPagina: 1
    }

    const [categorias, setCategorias] = useState<categoriaDTO[]>([]);
    const [libros, setLibros] = useState<libroDTO[]>([]);
    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        axios.get(`${urlCategorias}/todos`)
            .then((respuesta: AxiosResponse<categoriaDTO[]>) => {
                setCategorias(respuesta.data);
            })
    }, [])

    useEffect(() => {

        if (query.get('titulo')) {
            valorInicial.titulo = query.get('titulo')!;
        }

        if (query.get('categoriaId')) {
            valorInicial.categoriaId = parseInt(query.get('categoriaId')!, 10);
        }        

        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10);
        }

        buscarLibros(valorInicial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function buscarLibros(valores: filtroLibrosForm) {
        modificarURL(valores);
        axios.get(`${urlLibros}/filtrar`, { params: valores })
            .then((respuesta: AxiosResponse<libroDTO[]>) => {
                const totalDeRegistros =
                    parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

                setLibros(respuesta.data);
            })
    }

    function modificarURL(valores: filtroLibrosForm) {
        const queryStrings: string[] = [];
        if (valores.titulo) {
            queryStrings.push(`titulo=${valores.titulo}`);
        }

        if (valores.categoriaId !== 0) {
            queryStrings.push(`categoriaId=${valores.categoriaId}`);
        }        

        queryStrings.push(`pagina=${valores.pagina}`);
        // titulo=felipe&pagina=3&...
        history.push(`/libros/filtrar?${queryStrings.join('&')}`)
    }

    return (
        <>
            <h3>Filtrar Libros</h3>

            <Formik initialValues={valorInicial}
                onSubmit={valores => {
                    valores.pagina = 1;
                    buscarLibros(valores)
                }}
            >
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="form-inline">
                                <div className="form-group mb-2">
                                    <label htmlFor="titulo" className="sr-only">Título</label>
                                    <input type="text"
                                        className="form-control" id="titulo"
                                        placeholder="Título de la película"
                                        {...formikProps.getFieldProps('titulo')}
                                    />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <select className="form-control"
                                        {...formikProps.getFieldProps('categoriaId')}
                                    >
                                        <option value="0">--Seleccione una categoria--</option>
                                        {categorias.map(categoria => <option key={categoria.id}
                                            value={categoria.id}>{categoria.nombre}</option>)}
                                    </select>
                                </div>                                                                
                                <Button
                                    className="btn btn-primary mb-2 mx-sm-3"
                                    onClick={() => formikProps.submitForm()}
                                >Filtrar</Button>
                                <Button
                                    className="btn btn-danger mb-2"
                                    onClick={() => {
                                        formikProps.setValues(valorInicial);
                                        buscarLibros(valorInicial)
                                    }}
                                >Limpiar</Button>
                            </div>
                        </Form>

                        <ListadaLibros libros={libros} />
                        <Paginacion cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina} 
                            onChange={nuevaPagina => {
                                formikProps.values.pagina = nuevaPagina;
                                buscarLibros(formikProps.values);
                            }} />
                    </>
                )}
            </Formik>


        </>

    )
}

interface filtroLibrosForm {
    titulo: string;
    categoriaId: number;    
    pagina: number;
    recordsPorPagina: number;
}