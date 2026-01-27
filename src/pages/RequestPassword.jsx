import { useContext, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../context/LanguageContext';

export default function RequestPassword() {

    const [showSuccess, setShowSuccess] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccess(true); 
    }

    const pageText = {
        EN: {
            mainTitle: 'IAMOOT 2026 - Request Password',
            teamLabel: 'Team ID',
            emailLabel: 'Participant Email',
            submitBtn: 'Send Password Link',
            successMsg: 'If the information matches our records, an email has been sent with a password setup link.',
            errorMsg: 'Email does not match participant of specified team.'
        },
        ES: {
            mainTitle: 'IAMOOT 2026 - Solicitar Contraseña',
            teamLabel: 'ID del Equipo',
            emailLabel: 'Correo Electrónico del Participante',
            submitBtn: 'Enviar Enlace de Contraseña',
            successMsg: 'Si la información coincide con nuestros registros, se ha enviado un correo electrónico con un enlace para establecer la contraseña.',
            errorMsg: 'El correo electrónico no coincide con un participante del equipo especificado.'
        },
        POR: {
            mainTitle: 'IAMOOT 2026 - Solicitar Senha',
            teamLabel: 'ID da Equipe',
            emailLabel: 'Email do Participante',
            submitBtn: 'Enviar Link de Senha',
            successMsg: 'Se as informações corresponderem aos nossos registros, um email foi enviado com um link para definir a senha.',
            errorMsg: 'O email não corresponde a um participante da equipe especificada.'
        }
    }

    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage]; 

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'> 
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.teamLabel}</Form.Label>
                    <Form.Control />
                </div>
            </Form.Group>

            <Form.Group className='mb-3 px-4' >
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.emailLabel}</Form.Label>
                    <Form.Control type='email' />
                </div>
            </Form.Group>

            <div className='d-grid gap-2'><Button type='submit'>{actualText.submitBtn}</Button></div>
        </Form>

        {showSuccess && (
            <Alert variant='success' className='mt-3 text-center text-success fw-semibold'>{actualText.successMsg}</Alert>
        )}
    </div>
}