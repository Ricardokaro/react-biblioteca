import IndiceCategorias from "./categorias/IndiceCategorias";
import LandingPage from "./LandingPage";
import CrearCategoria from "./categorias/CrearCategoria"
import EditarCategoria from "./categorias/EditarCategoria"

import CrearAutores from './autores/CrearAutores';
import EditarAutores from './autores/EditarAutores';
import IndiceAutores from './autores/IndiceAutores';

import CrearLibros from './libros/CrearLibros'
import EditarLibros from './libros/EditarLibros'
import FiltroLibros from './libros/FiltroLibros'
import DetalleLibro from './libros/DetalleLibro'

import RedireccionarALanding from './utils/RedireccionarALanding'
import Registro from "./auth/Registro";
import Login from "./auth/Login";

import IndiceUsuarios from './auth/IndiceUsuarios';

const rutas = [
    {path: '/categorias/crear', componente: CrearCategoria, esAdmin: true},
    {path: '/categorias/editar/:id(\\d+)', componente: EditarCategoria, esAdmin: true},
    {path: '/categorias', componente: IndiceCategorias, exact: true, esAdmin: true},

    {path: '/autores/crear', componente: CrearAutores, esAdmin: true},
    {path: '/autores/editar/:id(\\d+)', componente: EditarAutores, esAdmin: true},
    {path: '/autores', componente: IndiceAutores, exact: true, esAdmin: true},

    {path: '/libro/:id(\\d+)', componente: DetalleLibro},
    {path: '/libros/crear', componente: CrearLibros, esAdmin: true},
    {path: '/libros/editar/:id(\\d+)', componente: EditarLibros, esAdmin: true},
    {path: '/libros/filtrar', componente: FiltroLibros},    

    {path: '/registro', componente: Registro},
    {path: '/login', componente: Login},
    {path: '/usuarios', componente: IndiceUsuarios, esAdmin: true},

    {path: '/', componente: LandingPage, exact: true},
    {path: '*', componente: RedireccionarALanding}
];

export default rutas;