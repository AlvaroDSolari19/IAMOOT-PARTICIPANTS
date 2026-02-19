import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../context/LanguageContext';

const pageText = {
    EN: {
        mainTitle: 'IAMOOT 2026 - Request Password',
        teamLabel: 'Team ID',
        emailLabel: 'Participant Email',
        submitBtn: 'Send Password Link',
        successMsg: 'If the information matches our records, an email has been sent with a password setup link.',
        returnLink: 'Return to Login', 
        teamRequired: 'Team ID is required.',
        emailRequired: 'Email is required.'
    },
    ES: {
        mainTitle: 'IAMOOT 2026 - Solicitar Contraseña',
        teamLabel: 'ID del Equipo',
        emailLabel: 'Correo Electrónico del Participante',
        submitBtn: 'Enviar Enlace de Contraseña',
        successMsg: 'Si la información coincide con nuestros registros, se ha enviado un correo electrónico con un enlace para establecer la contraseña.',
        returnLink: 'Volver al Inicio de Sesión',
        teamRequired: 'El ID del equipo es obligatorio.',
        emailRequired: 'El correo electrónico es obligatorio.',
    },
    POR: {
        mainTitle: 'IAMOOT 2026 - Solicitar Senha',
        teamLabel: 'ID da Equipe',
        emailLabel: 'Email do Participante',
        submitBtn: 'Enviar Link de Senha',
        successMsg: 'Se as informações corresponderem aos nossos registros, um email foi enviado com um link para definir a senha.',
        returnLink: 'Voltar ao Login',
        teamRequired: 'O ID da equipe é obrigatório.',
        emailRequired: 'O email é obrigatório.',
    }
}

export default function RequestPassword() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage];

    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            teamID: '',
            participantEmail: ''
        }
    })

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
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.teamLabel}</Form.Label>
                    <Form.Control disabled={showSuccess} isInvalid={!!errors.teamID} {...register('teamID', {
                        required: actualText.teamRequired
                    })} />
                </div>
                {errors.teamID && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.teamID.message}</Alert>
                )}
            </Form.Group>

            <Form.Group className='mb-3 px-4' >
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.emailLabel}</Form.Label>
                    <Form.Control type='email' disabled={showSuccess} isInvalid={!!errors.participantEmail} {...register('participantEmail', {
                        required: actualText.emailRequired
                    })} />
                </div>
                {errors.participantEmail && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.participantEmail.message}</Alert>
                )}
            </Form.Group>

            <div className='d-grid gap-2'>
                <Button type='submit' disabled={showSuccess}>{actualText.submitBtn}</Button>
            </div>
        </Form>

        {showSuccess && (
            <>
                <Alert variant='success' className='mt-3 text-center text-success fw-semibold'>
                    {actualText.successMsg}
                </Alert>

                <div className=' text-center mt-3'>
                    <Link className='text-muted fw-semibold' to='/login'>{actualText.returnLink}</Link>
                </div>
            </>
        )}
    </div>
}