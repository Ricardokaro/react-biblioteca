import {Form, Formik, FormikHelpers } from "formik"
import { Link } from "react-router-dom"
import Button from "../utils/Button"
import * as Yup from "yup"
import FormGroupText from "../utils/FormGroupText"
import { categoriaCreacionDTO } from "./categorias.model"

export default function FormularioCategorias(props: FormularioCategoriasProps){
    return(
        <Formik initialValues={ props.modelo }
        onSubmit={ props.onSubmit }
        validationSchema={Yup.object({
            nombre: Yup.string().required('Este campo es requerido.').primeraLetraMayuscula()
            .max(50, 'La longitud máxima es de 50 caracteres')
        })}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre categoria"/>
                    <Button disabled = {formikProps.isSubmitting}  type="submit">Salvar</Button>
                    <Link className="btn btn-secondary" to="/categorias">Cancelar</Link>
                </Form>
            )}                
        </Formik>          
    )
}

interface FormularioCategoriasProps{
    modelo: categoriaCreacionDTO
    onSubmit(valores: categoriaCreacionDTO, accion: FormikHelpers<categoriaCreacionDTO>): void
}