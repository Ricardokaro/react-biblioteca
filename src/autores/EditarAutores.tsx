import EditarEntidad from "../utils/EditarEntidad"
import FormularioActores from "./FormularioAutores"
import { autorDTO,autorCreacionDTO } from "./autores.model"
import { urlAutores } from "../utils/endpoints"
import { convertirActorAFormData } from "../utils/formDataUtils"

export default function EditarAutores(){
    
    const transformar = (actor:autorDTO)=>{
        return{
            nombre: actor.nombre,
            fotoURL: actor.foto,
            biografia: actor.biografia,
            fechaNacimiento: new Date(actor.fechaNacimiento)
        }
    }
    
    return(
        <>
            <EditarEntidad<autorCreacionDTO, autorDTO>
                url={urlAutores} urlIndice="/autores" nombreEntidad="Autores"
                transformarFormData={convertirActorAFormData}
                transformar = {transformar}
            >
                {(entidad, editar) => 
                    <FormularioActores
                        modelo={entidad}                    
                        onSubmit ={ async valores => await editar(valores) }
                    />                                 
                }
            </EditarEntidad>                             
        </>
    )
}