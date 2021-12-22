import { urlAutores } from "../utils/endpoints"
import IndiceEntidad from "../utils/IndiceEntidad"
import { autorDTO } from "./autores.model"

export default function IndiceActores(){
    return(
        <>
            <IndiceEntidad<autorDTO>
                url={urlAutores} urlCrear="autores/crear" titulo="Autores"
                nombreEntidad="Actor"
            >
                {(autores, botones) => <>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {autores?.map(autor =>
                        <tr key={autor.id}>
                            <td>
                                {botones(`autores/editar/${autor.id}`, autor.id)}
                            </td>
                            <td>
                                {autor.nombre}
                            </td>
                        </tr>)}
                </tbody>
                </>}        
            </IndiceEntidad>
        </>        
    )    
}

