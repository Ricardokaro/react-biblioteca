import AutenticacionContext from '../auth/AutenticacionContext';
import Autorizado from '../auth/Autorizado';
import { logout } from '../auth/manejadorJWT';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import Button from './Button';

export default function Menu() {
    const claseActiva = "active";
    const {actualizar, claims} = useContext(AutenticacionContext);

    function obtenerNombreUsuario(): string {
        return claims.filter(x => x.nombre === "email")[0]?.valor;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand"
                    activeClassName={claseActiva}
                    to="/">Biblioteca</NavLink>
                <div className="collapse navbar-collapse" 
                style={{display: 'flex', justifyContent: 'space-between' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName={claseActiva}
                                to="/libros/filtrar">
                                Filtrar Libros
                            </NavLink>
                        </li>
                        <Autorizado role="admin"
                            autorizado={
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/categorias">
                                            Categorias
                            </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/autores">
                                            Autores
                            </NavLink>
                                    </li>                                    
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/libros/crear">
                                            Crear Libros
                            </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" activeClassName={claseActiva}
                                            to="/usuarios">
                                            Usuarios
                            </NavLink>
                                    </li>
                                </>
                            }
                        />


                    </ul>

                    <div className="d-flex">
                        <Autorizado
                            autorizado={<>
                            <span className="nav-link">Hola, {obtenerNombreUsuario()}</span>
                            <Button 
                            onClick={() => {
                                logout();
                                actualizar([]);
                            }}
                            className="nav-link btn btn-link">Log out</Button>
                            </>}
                            noAutorizado={<>
                                <Link to="/Registro" className="nav-link btn btn-link">
                                    Registro
                                        </Link>
                                <Link to="/Login" className="nav-link btn btn-link">
                                    Login
                                        </Link>
                            </>}
                        />
                    </div>

                </div>
            </div>
        </nav>
    )
}