import FormularioCategorias from "./FormularioCategoria"
import EditarEntidad from "../utils/EditarEntidad"
import { categoriaCreacionDTO, categoriaDTO } from "./categorias.model"
import { urlCategorias } from "../utils/endpoints"


export default function EditarCategoria(){
    
    

    return(
        <>
            <EditarEntidad<categoriaCreacionDTO, categoriaDTO>
                url={urlCategorias} urlIndice="/categorias" nombreEntidad="Categorias"
            >
                {(entidad, editar) => 
                    <FormularioCategorias modelo={entidad}
                    onSubmit={async valores => {
                        await editar(valores)
                    }}    
                />             
                }
            </EditarEntidad>                        
        </>
    )
}