import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../api/userApi';
import styles from './Login.module.scss';
import Header from '../shared/Header/Header';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [tipoDocumento, setTipoDocumento] = useState('DNI');
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [aceptoPolitica, setAceptoPolitica] = useState(false);
  const [aceptoComunicaciones, setAceptoComunicaciones] = useState(false);

  const validateFields = () => {
    if (!documento || !celular) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = validateFields();
    
    if (isValid) {
      try {
        const data = await getUserData();
        navigate('/plans', { state: { userData: data } });
      } catch (error) {
        setError('Hubo un problema al obtener los datos del usuario.');
      }
    }
  };

  return (
    <div className={styles['login-page']}>
        <Header></Header>
        <div className={styles['form-container']}>
        <div className={styles['form-image']}>
            <img
            src="https://s3-alpha-sig.figma.com/img/899f/1030/7a95965972ec7cdab4f8c8d20d4dd8b8?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qw8Dk5NmJ7dRMZjqQo5CA2L6eJK9Vdx~biui3lNps~4z2wYpIXwu1RrvpmvS0UrvK0EMmX7RqFYFTrEYQtOXUcHbZMLft0a21Wa~QVsqN4-9CYfo458UrSPUOxYt7OrOMjhf4LLTrgcv2nb-lXJORxYe5E9nthrCtkhdEb7gFVuq37wVNTOsu0rUd04wHpd8Ii1Led3V-6-d~n4kkTK~Ih7yE9xejLXdn86Bzf0ICEgZpvLeZbqblg8VGZJP7Fz~EkdCLpj58XHnI~3Og~V7-qNzUm3MPoMJKJ6ZVRfZq6g4hjEpHnrv6W7987pwyxYps8Nxz-cX7LHFKh~mdNgZSQ__"
            alt="Onboarding"
            />
        </div>
        <div className={styles['form-content']}>
            <label className={styles['multi']}>Seguro Salud Flexible</label>
            <h2>Creado para ti y tu familia</h2>
            <label>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</label>
            <form onSubmit={handleSubmit}>
            <div>
                <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Carné de extranjería">Carné de extranjería</option>
                </select>
                <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                required
                placeholder='Número de Documento'
                />
            </div>
            <div>
                <input
                type="text"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
                placeholder='Celular'
                />
            </div>
            <div>
                <input
                type="checkbox"
                checked={aceptoPolitica}
                onChange={(e) => setAceptoPolitica(e.target.checked)}
                required
                />
                <label>Acepto la Política de Privacidad</label>
            </div>
            <div>
                <input
                type="checkbox"
                checked={aceptoComunicaciones}
                onChange={(e) => setAceptoComunicaciones(e.target.checked)}
                required
                />
                <label>Acepto la Política de Comunicaciones Comerciales</label>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">Cotiza aquí</button>
            </form>
        </div>
        </div>
    </div>
  );
};

export default Login;