import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../context/LanguageContext';

const pageText = {
    EN: {
        mainTitle: 'IAMOOT 2026 - Set Password',
        passwordLabel: 'New Password',
        confirmPasswordLabel: 'Confirm Password',
        passwordRequired: 'New Password is required.',
        confirmPasswordRequired: 'Please confirm your password.',
        passwordsMustMatch: 'Passwords do not match.',
        submitBtn: 'Set Password',
        successMsg: 'Your password has been set successfully. You may now log in.',
        errorMsg: 'Passwords do not match.',
        returnLink: 'Return to Login'
    },
    ES: {
        mainTitle: 'IAMOOT 2026 - Establecer Contraseña',
        passwordLabel: 'Nueva Contraseña',
        confirmPasswordLabel: 'Confirmar Contraseña',
        passwordRequired: 'La nueva contraseña es obligatoria.',
        confirmPasswordRequired: 'Por favor confirma tu contraseña.',
        passwordsMustMatch: 'Las contraseñas no coinciden.',
        submitBtn: 'Establecer Contraseña',
        successMsg: 'Tu contraseña se ha establecido correctamente. Ahora puedes iniciar sesión.',
        errorMsg: 'Las contraseñas no coinciden.',
        returnLink: 'Volver a Iniciar Sesión'
    },
    POR: {
        mainTitle: 'IAMOOT 2026 - Definir Senha',
        passwordLabel: 'Nova Senha',
        confirmPasswordLabel: 'Confirmar Senha',
        passwordRequired: 'A nova senha é obrigatória.',
        confirmPasswordRequired: 'Por favor, confirme sua senha.',
        passwordsMustMatch: 'As senhas não coincidem.',
        submitBtn: 'Definir Senha',
        successMsg: 'Sua senha foi definida com sucesso. Agora você pode entrar.',
        errorMsg: 'As senhas não coincidem.',
        returnLink: 'Voltar para Login'
    }
}

export default function SetPassword() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage]

    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        }
    })

    const newPasswordValue = watch('newPassword');

    const handleFormSubmit = async (someData) => {
        setShowSuccess(true);
        reset();
    }

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.passwordLabel}</Form.Label>
                    <Form.Control type='password' disabled={showSuccess || isSubmitting} isInvalid={!!errors.newPassword} {...register('newPassword', {
                        required: actualText.passwordRequired
                    })} />
                </div>
                {errors.newPassword && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.newPassword.message}</Alert>
                )}
            </Form.Group>

            <Form.Group className='mb-3 px-4' >
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.confirmPasswordLabel}</Form.Label>
                    <Form.Control type='password' disabled={showSuccess || isSubmitting} isInvalid={!!errors.confirmPassword} {...register('confirmPassword', {
                        required: actualText.confirmPasswordRequired,
                        validate: (currentValue) => currentValue === newPasswordValue || actualText.passwordsMustMatch
                    })} />
                </div>
                {errors.confirmPassword && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.confirmPassword.message}</Alert>
                )}
            </Form.Group>

            <div className='d-grid gap-2'>
                <Button type='submit' disabled={showSuccess || isSubmitting}>{actualText.submitBtn}</Button>
            </div>
        </Form>

        {showSuccess && (
            <>
                <Alert variant='success' className='mt-3 text-center text-success fw-semibold'>{actualText.successMsg}</Alert>

                <div className=' text-center mt-3'>
                    <Link className='text-muted fw-semibold' to='/login'>{actualText.returnLink}</Link>
                </div>
            </>
        )}
    </div>
}