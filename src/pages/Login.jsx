import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap'

import { LanguageContext } from '../context/LanguageContext';

export default function Login() {

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        navigate('/upload'); 
    }

    const { currentLanguage } = useContext(LanguageContext);

    const pageText = {
        EN: {
            mainTitle: 'IAMOOT 2026 - Access the Platform',
            userLabel: 'Team ID',
            passwordLabel: 'Password',
            submitBtn: 'Sign In',
            passwordHelp: 'Set / Reset Password'
        },
        ES: {
            mainTitle: 'IAMOOT 2026 - Acceso a la Plataforma',
            userLabel: 'ID del Equipo',
            passwordLabel: 'Contraseña',
            submitBtn: 'Iniciar Sesión',
            passwordHelp: 'Establecer / Restablecer Contraseña'
        },
        POR: {
            mainTitle: 'IAMOOT 2026 - Acesse a Plataforma',
            userLabel: 'ID da Equipe',
            passwordLabel: 'Senha',
            submitBtn: 'Entrar',
            passwordHelp: 'Definir / Redefinir Senha'
        }
    }

    const actualText = pageText[currentLanguage];

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'> 
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.userLabel}</Form.Label>
                    <Form.Control />
                </div>
            </Form.Group>

            <Form.Group className='mb-3 px-4' >
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.passwordLabel}</Form.Label>
                    <Form.Control type='password' />
                </div>
            </Form.Group>

            <div className='d-grid gap-2'><Button type='submit'>{actualText.submitBtn}</Button></div>
        </Form>

        <div className='text-center mt-3'><Link className='text-muted fw-semibold' to='/request-password'>{actualText.passwordHelp}</Link></div>

    </div>
}