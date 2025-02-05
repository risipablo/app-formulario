import { useState } from 'react';
import './formulario.css';
import { toast, Toaster } from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';

const serverFront = 'https://app-formulario.onrender.com';
// const serverFront = 'http://localhost:3001'

export function Formulario() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        phone: '',
        message: '',
    });

    const [errors, setError] = useState({});
    const navigate = useNavigate({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.name) newErrors.name = 'Este campo es obligatorio';
        if (!formData.email) newErrors.email = 'Este campo es obligatorio';
        if (!formData.date) newErrors.date = 'Este campo es obligatorio';
        if (!formData.phone) newErrors.phone = 'Este campo es obligatorio';
        if (!formData.message) newErrors.message = 'Este campo es obligatorio';

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
        } else {
            toast.promise(
                fetch(`${serverFront}/send-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }),
                {
                    loading: 'Enviando...',
                    success: 'Correo enviado',
                    error: 'Error al enviar el correo',
                }
            )
            .then(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    message: ''
                });
                navigate('/comprobante', { state: { name: formData.name } });
            })
            .catch((error) => console.error('Error:', error));
        }
    };


    const borrar = () => {
        setFormData({
            name: '',
            email: '',
            date: '',
            phone: '',
            message: ''
        });
        setError({});
    }

    return (
        <div className="container-formulario">
            <div className="form-container">
                <h1>Formulario de Contacto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre y Apellido *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ingrese su nombre y apellido"
                            className={errors.name ? 'error' : ''}
                            required
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingrese su correo electrónico"
                            className={errors.email ? 'error' : ''}
                            required
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Fecha, Hora Exacta y Lugar de Nacimiento *</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            placeholder="Ingrese fecha, hora y lugar de nacimiento"
                            className={errors.date ? 'error' : ''}
                            required
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Número de Teléfono *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ingrese su número de teléfono"
                            className={errors.phone ? 'error' : ''}
                            required
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>

                    <div className="form-group">    
                        <label htmlFor="message">Comentarios *</label>

                    <input
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Escribe tus comentarios aquí"
                            className={errors.message ? 'error' : ''}
                            required
                        />
                        {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>   

                    <div className="botones">
                        <button type="submit" className="submit-button">Enviar</button>           
                        <button onClick={borrar} className='reset-button'>Borrar</button>
                    </div>
                    
                </form>
                <Toaster />
            </div>
        </div>
    );
}