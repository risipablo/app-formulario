import { useLocation } from "react-router-dom"
import "./comprobante.css"


export function Comprobante() {

    const location = useLocation()
    const {name} = location.state || {name: 'Usuario'}

    return(
        <div className="comprobante-container">
            <h2> Recibimos tu inscripción</h2>
            <p> Gracias por registrarte {name}, te esperamos el "18/12/2025"</p>
            <div className="consulta">
                <p> Para cualquier consulta comunicarse al instagram  <a href="https://www.instagram.com/casavita.salud/"> Casa Vita </a> </p>
            </div>
            
        </div>
    )
}