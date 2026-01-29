import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../context/LanguageContext';

export default function SetPassword() {

    const [passwordStatus, setPasswordStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setPasswordStatus('success');
    }

    const pageText = {
        EN: {
            mainTitle: 'IAMOOT 2026 - Set Password',
            passwordLabel: 'New Password',
            confirmPasswordLabel: 'Confirm Password',
            submitBtn: 'Set Password',
            successMsg: 'Your password has been set successfully. You may now log in.',
            errorMsg: 'Passwords do not match.',
            backToLogin: 'Return to Login'
        },
        ES: {
            mainTitle: 'IAMOOT 2026 - Establecer Contraseña',
            passwordLabel: 'Nueva Contraseña',
            confirmPasswordLabel: 'Confirmar Contraseña',
            submitBtn: 'Establecer Contraseña',
            successMsg: 'Tu contraseña se ha establecido correctamente. Ahora puedes iniciar sesión.',
            errorMsg: 'Las contraseñas no coinciden.',
            backToLogin: 'Volver a Iniciar Sesión'
        },
        POR: {
            mainTitle: 'IAMOOT 2026 - Definir Senha',
            passwordLabel: 'Nova Senha',
            confirmPasswordLabel: 'Confirmar Senha',
            submitBtn: 'Definir Senha',
            successMsg: 'Sua senha foi definida com sucesso. Agora você pode entrar.',
            errorMsg: 'As senhas não coincidem.',
            backToLogin: 'Voltar para Login'
        }
    }

    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage]

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.passwordLabel}</Form.Label>
                    <Form.Control type='password' />
                </div>
            </Form.Group>

            <Form.Group className='mb-3 px-4' >
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.confirmPasswordLabel}</Form.Label>
                    <Form.Control type='password' />
                </div>
            </Form.Group>

            <div className='d-grid gap-2'><Button type='submit'>{actualText.submitBtn}</Button></div>
        </Form>

        {passwordStatus === 'success' && (
            <>
                <Alert variant='success' className='mt-3 text-center text-success fw-semibold'>{actualText.successMsg}</Alert>

                <div className=' text-center mt-3'>
                    <Link className='text-muted fw-semibold' to='/login'>{actualText.backToLogin}</Link>
                </div>
            </>
        )}

        {passwordStatus === 'error' && (
            <Alert variant='danger' className='mt-3 text-center fw-semibold'>{actualText.errorMsg}</Alert>
        )}
        
    </div>
}