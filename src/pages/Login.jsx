import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap'

import { LanguageContext } from '../context/LanguageContext';
import api from '../services/api';

const pageText = {
    EN: {
        mainTitle: 'IAMOOT 2026 - Access the Platform',
        userLabel: 'Team ID',
        passwordLabel: 'Password',
        submitBtn: 'Sign In',
        passwordHelp: 'Set / Reset Password',
        teamIDRequired: 'Team ID is required.',
        passwordRequired: 'Password is required.',
        invalidCredentials: 'Team ID or password is incorrect.'
    },
    ES: {
        mainTitle: 'IAMOOT 2026 - Acceso a la Plataforma',
        userLabel: 'ID del Equipo',
        passwordLabel: 'Contraseña',
        submitBtn: 'Iniciar Sesión',
        passwordHelp: 'Establecer / Restablecer Contraseña',
        teamIDRequired: 'El ID del equipo es obligatorio.',
        passwordRequired: 'La contraseña es obligatoria.',
        invalidCredentials: 'El ID del equipo o la contraseña es incorrecto.'
    },
    POR: {
        mainTitle: 'IAMOOT 2026 - Acesse a Plataforma',
        userLabel: 'ID da Equipe',
        passwordLabel: 'Senha',
        submitBtn: 'Entrar',
        passwordHelp: 'Definir / Redefinir Senha',
        teamIDRequired: 'O ID da equipe é obrigatório.',
        passwordRequired: 'A senha é obrigatória.',
        invalidCredentials: 'O ID da equipe ou a senha está incorreto.',
    }
}

export default function Login() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage];

    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        resetField, 
        setFocus, 
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            teamID: '',
            teamPassword: ''
        }
    })

    const handleFormSubmit = async (someData) => {
        
        try {
            await api.post('written/auth/login', {
                teamID: someData.teamID, 
                password: someData.teamPassword
            });
            navigate('/upload', {replace: true });
        } catch (err) {
            setAuthError(actualText.invalidCredentials); 
            resetField('teamPassword'); 
            setFocus('teamPassword');
        }

    }

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        {authError && (
            <Alert variant='danger' className='mx-4 text-center'>{authError}</Alert>
        )}

        <Form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.userLabel}</Form.Label>
                    <Form.Control autoComplete='username' disabled={isSubmitting} isInvalid={!!errors.teamID} {...register('teamID', {
                        required: actualText.teamIDRequired,
                        onChange: () => authError && setAuthError('')
                    })} />
                </div>
                {errors.teamID && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.teamID.message}</Alert>
                )}
            </Form.Group>

            <Form.Group className='mb-3 px-4' >
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.passwordLabel}</Form.Label>
                    <Form.Control type='password' autoComplete='current-password' isInvalid={!!errors.teamPassword} {...register('teamPassword', {
                        required: actualText.passwordRequired, 
                        onChange: () => authError && setAuthError('')
                    })} />
                </div>
                {errors.teamPassword && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.teamPassword.message}</Alert>
                )}
            </Form.Group>

            <div className='d-grid gap-2'><Button type='submit' disabled={isSubmitting}>{actualText.submitBtn}</Button></div>
        </Form>

        <div className='text-center mt-3'><Link className='text-muted fw-semibold' to='/request-password'>{actualText.passwordHelp}</Link></div>

    </div>
}