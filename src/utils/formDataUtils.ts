import { autorCreacionDTO } from "../autores/autores.model"
import { libroCreacionDTO } from "../libros/libros.model";

export function convertirActorAFormData(actor:autorCreacionDTO):FormData{
    const formData = new FormData();

    formData.append('nombre', actor.nombre)
    if(actor.biografia){
        formData.append('biografia', actor.biografia)
    }

    if(actor.fechaNacimiento){
        formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento))
    }

    if(actor.foto){
        formData.append('foto', actor.foto)
    }

    return formData
}

export function convertirLibroAFormData(libro:libroCreacionDTO): FormData{
    const formData = new FormData()
    formData.append('titulo', libro.titulo)

    if(libro.subtitulo){
        formData.append('subtitulo', libro.subtitulo)
    }

    if(libro.fechaPublicacion){
        formData.append('fechaPublicacion', formatearFecha(libro.fechaPublicacion))
    }

    if(libro.editor){
        formData.append('editor', libro.editor)
    }

    if(libro.descripcion){
        formData.append('descripcion', libro.descripcion)
    }

    if(libro.imagen){
        formData.append('imagen', libro.imagen)
    }

    formData.append('categoriasIds', JSON.stringify(libro.categoriasIds))
    formData.append('autores', JSON.stringify(libro.autores))
    

    return formData
}

function formatearFecha(date: Date){
    date = new Date(date)
    const formato = new Intl.DateTimeFormat("en",{
        year:'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    const [
        {value: monst},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date)

    return `${year}-${monst}-${day}`
}