import { Form, Formik, FormikHelpers } from "formik";    
import { libroCreacionDTO } from "./libros.model"
import * as Yup from "yup"
import FormGroupText from "../utils/FormGroupText"
import FormGroupFecha from "../utils/FormGroupFecha"
import FormGroupImagen from "../utils/FormGroupImagen"
import Button from "../utils/Button"
import { Link } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple"
import { categoriaDTO } from "../categorias/categorias.model";
import { useState } from "react";
import TypeAheadActores from "../autores/TypeAheadAutores";
import { autorLibroDTO } from "../autores/autores.model";

export default function FormularioLibros(props: formularioLibrosProps){
    
    const [categoriasSeleccionados, setCategoriasSeleccionados] = useState(mapear(props.categoriasSeleccionados))
    const [categoriasNoSeleccionados, setCategoriasNoSeleccionados] = useState(mapear(props.categoriasNoSeleccionados))

    const [autoresSeleccionados, setAutoresSeleccionados] = useState<autorLibroDTO[]>(props.autoresSeleccionados)

    function mapear(arreglo:{id:number, nombre: string}[]):selectorMultipleModel[]{
        return arreglo.map(valor => {
            return {llave:valor.id, valor: valor.nombre}
        })
    }
    
    return(
        <Formik
            initialValues={ props.modelo }
            onSubmit= { (valores, acciones) => {
                valores.categoriasIds = categoriasSeleccionados.map(valor => valor.llave)                
                valores.autores = autoresSeleccionados
                props.onSubmit(valores, acciones)
            }}
            validationSchema={Yup.object({
                titulo: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()                
            })}
        >
            {FormikProps => (
                <Form>
                    <FormGroupText label="Título" campo="titulo"/>                    
                    <FormGroupText label="Subtitulo" campo="subtitulo"/>
                    <FormGroupFecha campo="fehcaPublicacion" label="Fecha publicacion"/>
                    <FormGroupText label="Editor" campo="editor"/>
                    <FormGroupText label="Descripcion" campo="descripcion"/>
                    <FormGroupImagen campo="imagen" label="Imagen" imagenURL={props.modelo.imagenURL}/>                    
                    <div className="form-group">
                        <label>Categorias:</label>
                        <SelectorMultiple noSeleccionados={categoriasNoSeleccionados}
                            seleccionados={categoriasSeleccionados}
                            onChange={(seleccionados, noSeleccionados) => {
                                setCategoriasSeleccionados(seleccionados)
                                setCategoriasNoSeleccionados(noSeleccionados)
                            }}
                        />
                    </div>                    
                    <div className="form-group">
                        <TypeAheadActores
                            onAdd={autores => {
                                setAutoresSeleccionados(autores)        
                            }}
                            onRemove={actor => {
                                const actores = autoresSeleccionados.filter(x => x!== actor)
                                setAutoresSeleccionados(actores)
                            }} 
                            autores={autoresSeleccionados}
                            listadoUI={(actor:autorLibroDTO) =>
                                <>
                                    {actor.nombre} 
                                </>
                            }
                        />                        
                    </div>
                    <Button disabled={FormikProps.isSubmitting} type="submit">Enviar</Button>
                    <Link className="btn btn-secundary" to="/">Cancelar</Link>
                </Form>
            )}
        </Formik>
    )
}

interface formularioLibrosProps{
    modelo: libroCreacionDTO
    onSubmit(valores: libroCreacionDTO, acciones: FormikHelpers<libroCreacionDTO>): void
    categoriasSeleccionados: categoriaDTO[]
    categoriasNoSeleccionados: categoriaDTO[]    
    autoresSeleccionados: autorLibroDTO[]
}