import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { urlCategorias } from '../utils/endpoints'
import MostrarErrores from '../utils/MostrarErrores'
import FormularioCategoria from "./FormularioCategoria"
import { categoriaCreacionDTO } from './categorias.model'

export default function CrarCategoria(){
    const history = useHistory()
    const [errores, setErrores] = useState<string[]>([])

    async function crear(genero:categoriaCreacionDTO){        
        await axios.post(urlCategorias, genero).then((response) => {
            console.log(response.data)
            history.push('/categorias')
        }).catch((error) => {
            console.log(error.response)
            setErrores(error.response.data)
        })
    }
    return(
        <>
            <h3>Crear genero</h3>
            <MostrarErrores errores={errores}/>
            <FormularioCategoria modelo={{nombre:''}}
                onSubmit={async valores => {
                    await crear(valores)
                }}    
            />
        </>
    )
}