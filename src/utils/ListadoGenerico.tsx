import { ReactElement } from "react";
import Cargando from "./Cargando";

export default function ListadoGenerico(props: listadoGenericoProps){
    if(!props.listado){
        if(props.cargandoUI){
            return props.cargandoUI
        }
        return <Cargando/>
    }else if(props.listado.length === 0){
        if(props.lisadoVacioUI){
            return props.lisadoVacioUI                
        }
        return <>No hay elementos para mostrar</>
    }else{
        return props.children
    }
}

interface listadoGenericoProps{
    listado: any
    children: ReactElement
    cargandoUI?: ReactElement
    lisadoVacioUI?: ReactElement
}