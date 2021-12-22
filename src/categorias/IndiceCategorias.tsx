import { urlCategorias } from "../utils/endpoints"
import IndiceEntidad from "../utils/IndiceEntidad"
import { categoriaDTO } from "./categorias.model"

export default function IndiceCategorias() {
    return (
        <>
            <IndiceEntidad<categoriaDTO>
            url={urlCategorias} urlCrear="categorias/crear" titulo="Categorias"
            nombreEntidad="Categoria"
            >
                {(categorias, botones) => <>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias?.map(categoria =>
                        <tr key={categoria.id}>
                            <td>
                                {botones(`categorias/editar/${categoria.id}`, categoria.id)}
                            </td>
                            <td>
                                {categoria.nombre}
                            </td>
                        </tr>)}
                </tbody>
                </>}                
            </IndiceEntidad>
        </>
    )
}

