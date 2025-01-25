import { useState } from 'react';
import './formulario.css';
import { toast, Toaster } from 'react-hot-toast';

const serverFront = 'https://app-formulario.onrender.com';

export function Formulario() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        phone: '',
        message: '',
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError({
            ...error,
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
            })
            .catch((error) => console.error('Error:', error));
        }
    };

    return (
        <div className="container-formulario">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre y Apellido *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre y apellido"
                        className={error.name ? 'error' : ''}
                        required
                    />
                    {error.name && <span className="error-text">{error.name}</span>}

                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingrese su correo electrónico"
                        className={error.email ? 'error' : ''}
                        required
                    />
                    {error.email && <span className="error-text">{error.email}</span>}

                    <label htmlFor="date">Fecha, Hora Exacta y Lugar de Nacimiento *</label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Ingrese fecha, hora y lugar de nacimiento"
                        className={error.date ? 'error' : ''}
                        required
                    />
                    {error.date && <span className="error-text">{error.date}</span>}

                    <label htmlFor="phone">Número de Teléfono *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ingrese su número de teléfono"
                        className={error.phone ? 'error' : ''}
                        required
                    />
                    {error.phone && <span className="error-text">{error.phone}</span>}

                    <label htmlFor="message">Comentarios *</label>
                    <input
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escribe tus comentarios aquí"
                        rows="4"
                        className={error.message ? 'error' : ''}
                        required
                    />
                    {error.message && <span className="error-text">{error.message}</span>}

                    
                </form>
                <button type="submit" className="submit-button">Enviar</button>
                <Toaster />
            </div>
        </div>
    );
}
