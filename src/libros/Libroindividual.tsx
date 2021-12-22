import { libroDTO } from "./libros.model";
import css from './LibroIndividual.module.css'
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import confirmar from "../utils/Confirmar";
import axios from "axios";
import { urlLibros } from "../utils/endpoints";
import { useContext } from "react";
import AlertaContext from '../utils/AlertaContext';
import Autorizado from "../auth/Autorizado";

export default function LibroIndividual(props: libroIndividualProps) {

    const construirLink = () => `/libro/${props.libro.id}`
    const alerta = useContext(AlertaContext)

    function borrarLibro() {
        axios.delete(`${urlLibros}/${props.libro.id}`)
            .then(() => {
                alerta();
            })
    }

    return (
        <div className={css.div}>
            <Link to={construirLink()}>
                <img src={props.libro.imagen} alt="Libro" />
            </Link>
            <p>
                <Link to={construirLink()}>{props.libro.titulo}</Link>
            </p>
            <Autorizado role="admin"
                autorizado={
                    <div>
                        <Link style={{ marginRight: '1rem' }} className="btn btn-info"
                            to={`/libros/editar/${props.libro.id}`}>Editar</Link>
                        <Button
                            onClick={() => confirmar(() => borrarLibro())}
                            className="btn btn-danger">Borrar</Button>
                    </div>
                }
            />
        </div>
    )
}

interface libroIndividualProps {
    libro: libroDTO;
}