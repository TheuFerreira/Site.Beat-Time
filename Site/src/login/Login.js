import './css/Login.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import Context from '../Context/Context';

const schema = Yup
    .object()
    .shape({
        username: Yup.string().required('Insira um nome de usuário'),
        password: Yup.string().required('Insira uma senha'),
    })
    .required();

export default function Login() {

    const [, setUsuario] = useContext(Context);
    const [error, setError] = useState('');

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        
        const result = await fetch('http://localhost/beat-time/API/routes/users/login.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(async (response) => {
            const json = await response.json();
            if (json == null) {
                return null;
            }
            
            return json;
        }).catch(() => {
            return null;
        });
        
        if (result == null) {
            setError('Nome de Usuário ou Senha Inválidos!!!');
            return;
        }

        setError('');
        setUsuario(result);
    }

    return (
        <div className="bg">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>  

            <div className="container">
                <div className="title">
                    <h1>BeatTime</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="userName">Nome de Usuário</label>
                    <div className="input-icon">
                        <input type="text" name="userName" id="userName" autoComplete="username" {...register('username')}/>
                        <i className="material-icons">person</i>
                    </div>
                    { errors.username && <span className='error'>{errors.username?.message}</span> }
                    
                    <label htmlFor="password">Senha</label>
                    <div className="input-icon">
                        <input type="password" name="password" id="password" autoComplete="current-password" {...register('password')}/>
                        <i className="material-icons">lock</i>
                    </div>
                    { errors.password && <span className='error'>{errors.password?.message}</span> }
                    
                    { error !== '' && <span className="error">{error}</span> }
                    
                    <button type="submit" id="btnLogin">Entrar</button>
                </form>
            </div>
        </div>
    );
}