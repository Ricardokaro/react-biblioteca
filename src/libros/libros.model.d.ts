import { autorDTO, autorLibroDTO } from "../autores/autores.model";
import { categoriaDTO } from "../categorias/categorias.model";

export interface libroDTO{
    id: number;
    titulo: string;
    subtitulo: string;
    fechaPublicacion: Date;
    editor?: string;
    descripcion: string;
    imagen: string;    
    categorias: categoriaDTO[];
    autores: autorLibroDTO[];       
}

export interface libroCreacionDTO {
    titulo: string;        
    subtitulo: string;
    fechaPublicacion?: Date;
    editor?: string;
    descripcion: string;
    imagen?: File;
    imagenURL?: string;
    categoriasIds?: number[];
    autores?: autorLibroDTO[];    
}

export interface landingPageDTO {
    enCines?: peliculaDTO[];
    proximosEstrenos?: peliculaDTO[];
}

export interface peliculasPostGetDTO{
    categorias: categoriaDTO[];
    cines: cineDTO[]
}

export interface librosPutGetDTO {
    libro: libroDTO;
    categoriasSeleccionados: categoriaDTO[];
    categoriasNoSeleccionados: categoriaDTO[];    
    autores: autorLibroDTO[];
}