export interface autorDTO{
    id: number
    nombre: string
    biografia: string
    fechaNacimiento: Date
    foto: string
}

export interface autorCreacionDTO{
    nombre: string
    fechaNacimiento?: Date
    foto?: File
    fotoURL?: string
    biografia?: string
}

export interface autorLibroDTO{
    id: number
    nombre: string    
    foto: string
}