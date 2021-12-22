import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCuentas } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import AutenticacionContext from "./AutenticacionContext";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";

export default function Login() {

    const {actualizar} = useContext(AutenticacionContext);
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();
    
    async function login(credenciales: credencialesUsuario) {
        await axios.post(`${urlCuentas}/login`, credenciales).then((respuesta:AxiosResponse<respuestaAutenticacion>)=>{
            guardarTokenLocalStorage(respuesta.data);
            actualizar(obtenerClaims());
            history.push("/");
            console.log(respuesta);    
        }) 
        .catch(error=>{
            setErrores(error.response.data);
        })    
    }

    return (
        <>
            <h3>Login</h3>
            <MostrarErrores errores={errores} />
            <FormularioAuth
                modelo={{ email: '', password: '' }}
                onSubmit={async valores => await login(valores)}
            />
        </>
    )
}