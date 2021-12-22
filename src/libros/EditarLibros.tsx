import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cargando from "../utils/Cargando";
import { urlLibros } from "../utils/endpoints";
import { convertirLibroAFormData } from "../utils/formDataUtils";
import MostrarErrores from "../utils/MostrarErrores";
import FormularioLibros from "./FormularioLibros";
import { libroCreacionDTO, librosPutGetDTO } from "./libros.model";

export default function EditarLibros() {

    const [libro, setLibro] = useState<libroCreacionDTO>();
    const [libroPutGet, setLibroPutGet] = useState<librosPutGetDTO>();
    const { id }: any = useParams();
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlLibros}/PutGet/${id}`)
            .then((respuesta: AxiosResponse<librosPutGetDTO>) => {
                const modelo: libroCreacionDTO = {
                    titulo: respuesta.data.libro.titulo,   
                    subtitulo: respuesta.data.libro.subtitulo,
                    editor: respuesta.data.libro.editor,   
                    descripcion: respuesta.data.libro.descripcion,                                 
                    imagenURL: respuesta.data.libro.imagen,                    
                    fechaPublicacion: new Date(respuesta.data.libro.fechaPublicacion)                
                };
                setLibro(modelo);
                setLibroPutGet(respuesta.data);
                console.log(respuesta.data)
            })
    }, [id])

    async function editar(libroEditar: libroCreacionDTO) {        
        const formData = convertirLibroAFormData(libroEditar);
        await axios({
            method: 'put',
            url: `${urlLibros}/${id}`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(respuesta => {
            history.push(`/libro/${id}`);
        })
        .catch(error=>{
            setErrores(error.response.data);
        });            
    }

    return (
        <>
            <h3>Editar Libro</h3>
            <MostrarErrores errores={errores} />
            {libro && libroPutGet ? <FormularioLibros
                autoresSeleccionados={libroPutGet.autores}                
                categoriasNoSeleccionados={libroPutGet.categoriasNoSeleccionados}
                categoriasSeleccionados={libroPutGet.categoriasSeleccionados}
                modelo={libro}
                onSubmit={async valores => await editar(valores)}
            /> : <Cargando />}


        </>

    )
}