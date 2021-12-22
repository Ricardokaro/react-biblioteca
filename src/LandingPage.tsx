import { useState, useEffect } from "react";
import { landingPageDTO, libroDTO } from './libros/libros.model'
import ListadoLibros from './libros/ListadoLibros'
import axios, { AxiosResponse } from "axios";
import { urlLibros } from "./utils/endpoints";
import AlertarContext from './utils/AlertaContext'

export default function LandingPage() {

    const [libros, setLibros] = useState<libroDTO[]>([])

    useEffect(() => {
        cargarDatos();
    }, [])

    function cargarDatos() {
        axios.get(urlLibros)
            .then((respuesta: AxiosResponse<libroDTO[]>) => {
                setLibros(respuesta.data);
            })
    }

    return (
        <>
            <AlertarContext.Provider value={() => cargarDatos()}>
                <h3>Libros</h3>
                <ListadoLibros libros={libros} />                
            </AlertarContext.Provider>

        </>
    )
}