import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { categoriaDTO } from "../categorias/categorias.model"
import Cargando from "../utils/Cargando"
import { urlLibros } from "../utils/endpoints"
import { convertirLibroAFormData } from "../utils/formDataUtils"
import MostrarErrores from "../utils/MostrarErrores"
import FormularioLibros from "./FormularioLibros"
import { libroCreacionDTO, peliculasPostGetDTO } from "./libros.model"
export default function CrarLibros(){

    const [categoriasNoSeleccionados, setCategoriasNoSeleccionados] = useState<categoriaDTO[]>([])    
    const [cargando, setCargando] = useState(false)
    const [errores, setErrores] = useState<string[]>([])
    const history = useHistory()

    useEffect(()=>{
        axios.get(`${urlLibros}/postGet`).then((response: AxiosResponse<peliculasPostGetDTO>)=>{
            setCategoriasNoSeleccionados(response.data.categorias)            
            setCargando(true)
        })
    },[])

    async function crear(pelicula:libroCreacionDTO) {
        const formData = convertirLibroAFormData(pelicula)
        await axios({
            method: 'post',
            url: urlLibros,
            data: formData,
            headers:{'Content-Type': 'multipart/form-data'}
        }).then((response: AxiosResponse<number>)=>{
            history.push(`/libros/${response.data}`)
        })
        .catch(error=>{
            setErrores(error.response.data);            
        })
    }
    
    return(
        <>
            <h3>Crear Libro</h3>
            <MostrarErrores errores={errores}/>
            {cargando ? <FormularioLibros 
                autoresSeleccionados={[]}                                
                categoriasNoSeleccionados={categoriasNoSeleccionados}
                categoriasSeleccionados={[]}
                modelo= { {titulo:'',  subtitulo:'', descripcion:''} }
                onSubmit={ async valores => crear(valores) }
            />:<Cargando/> }      
            
        </>        
    )    
}

