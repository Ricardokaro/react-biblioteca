import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { urlAutores } from "../utils/endpoints"
import MostrarErrores from "../utils/MostrarErrores"
import { autorCreacionDTO } from "./autores.model"
import FormularioActores from "./FormularioAutores"
import { convertirActorAFormData } from "../utils/formDataUtils"

export default function CrarAutores(){
    const [errores, setErrores] = useState<string[]>([])
    const history = useHistory()

    async function crear(actor:autorCreacionDTO) {
        const formData = convertirActorAFormData(actor)
        await axios({
            method: 'post',
            url: urlAutores,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}    
        }).then(respuesta => {            
            history.push('/autores')
        })
        .catch(error => {
            setErrores(error.response.data)
        })
    }
    return(
        
        <>
            <h3>Crear actores</h3>
            <MostrarErrores errores={errores}/>
            <FormularioActores
                modelo={{nombre:'', fechaNacimiento: undefined}}
                onSubmit ={ async (valores) => await crear(valores) }
            />
        </>
    )
}