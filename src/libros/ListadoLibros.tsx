import { libroDTO } from './libros.model'
import LibroIndividual from './Libroindividual' 
import css from './ListadoLibro.module.css'
import ListadoGenerico from '../utils/ListadoGenerico'

export default function ListadoLibros(props:listadoLibrosProps){
    return(       
        <ListadoGenerico listado = { props.libros }>
            <div className = { css.div }>
                { props.libros?.map(libro => <LibroIndividual libro={ libro } key={ libro.id }/>) }
            </div>
        </ListadoGenerico>    
        
    )
    
}

interface listadoLibrosProps{
    libros?: libroDTO[]
}