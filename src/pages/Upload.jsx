import { useContext, useState } from 'react'
import { Alert, Button, Card, Form, ListGroup } from 'react-bootstrap'

import { LanguageContext } from '../context/LanguageContext'

export default function Upload() {

    const [fileStatus, setFileStatus] = useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setFileStatus('success');
    }

    const pageText = {
        EN: {
            mainTitle: 'IAMOOT 2026 - Upload Memoranda',
            introText: 'Before submitting your files, please review the following requirements:',
            requirements: {
                naming:
                    'File naming convention: Files must be named using your Team ID followed by V (Victim) or E (State). Example: TEAM123_V.docx and TEAM123_E.docx',
                format: 'Accepted format: Only .docx files are accepted.',
                deadline: 'Submission deadline: March 25th, 11:59 PM ET (New York / UTC-4).'
            },
            stateLabel: 'State Memorandum',
            victimLabel: 'Victim Memorandum',
            confirmLabel: 'I confirm these are the correct files and my submission is final.',
            submitBtn: 'Submit Files',
            successMsg: 'Your files have been submitted successfully. Further changes are no longer allowed.',
            deadlineClosedMsg: 'The submission deadline has passed. Uploading files is no longer permitted.'
        },
        ES: {
            mainTitle: 'IAMOOT 2026 - Subir Memorandos',
            introText: 'Antes de enviar tus archivos, revisa los siguientes requisitos:',
            requirements: {
                naming:
                    'Convención de nombres: Los archivos deben nombrarse usando el ID del equipo seguido de V (Víctima) o E (Estado). Ejemplo: TEAM123_V.docx y TEAM123_E.docx',
                format: 'Formato aceptado: Solo se aceptan archivos .docx.',
                deadline: 'Fecha límite de envío: 25 de marzo, 11:59 PM ET (Nueva York / UTC-4).'
            },
            stateLabel: 'Memorando del Estado',
            victimLabel: 'Memorando de la Víctima',
            confirmLabel: 'Confirmo que estos son los archivos correctos y que mi envío es final.',
            submitBtn: 'Enviar Archivos',
            successMsg: 'Tus archivos se han enviado correctamente. No se permiten más cambios.',
            deadlineClosedMsg: 'La fecha límite de envío ha pasado. Ya no es posible subir archivos.'
        },
        POR: {
            mainTitle: 'IAMOOT 2026 - Enviar Memorandos',
            introText: 'Antes de enviar seus arquivos, revise os seguintes requisitos:',
            requirements: {
                naming:
                    'Convenção de nomes: Os arquivos devem ser nomeados usando o ID da equipe seguido de V (Vítima) ou E (Estado). Exemplo: TEAM123_V.docx e TEAM123_E.docx',
                format: 'Formato aceito: Apenas arquivos .docx são aceitos.',
                deadline: 'Prazo de envio: 25 de março, 11:59 PM ET (Nova York / UTC-4).'
            },
            stateLabel: 'Memorando do Estado',
            victimLabel: 'Memorando da Vítima',
            confirmLabel: 'Confirmo que estes são os arquivos corretos e que meu envio é final.',
            submitBtn: 'Enviar Arquivos',
            successMsg: 'Seus arquivos foram enviados com sucesso. Não são permitidas alterações.',
            deadlineClosedMsg: 'O prazo de envio expirou. Não é mais possível enviar arquivos.'
        }
    }

    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage];

    return <div>
        <Card className='text-center'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Card className='mb-3'>
            <Card.Body className='px-4'>
                <Card.Title className='fw-bold mb-2'>{actualText.introText}</Card.Title>
                <ListGroup variant='flush'>
                    <ListGroup.Item>{actualText.requirements.naming}</ListGroup.Item>
                    <ListGroup.Item>{actualText.requirements.format}</ListGroup.Item>
                    <ListGroup.Item>{actualText.requirements.deadline}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>

        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3 px-4'>
                <Form.Label className='fw-bold'>{actualText.stateLabel}</Form.Label>
                <Form.Control type='file' />
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <Form.Label className='fw-bold'>{actualText.victimLabel}</Form.Label>
                <Form.Control type='file' />
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <Form.Check type='checkbox' label={actualText.confirmLabel} />
            </Form.Group>

            <div className='d-grid'><Button type='submit'>{actualText.submitBtn}</Button></div>
        </Form>

        {fileStatus === 'success' && (
            <Alert variant='success' className='mt-3 text-center text-success fw-semibold'>{actualText.successMsg}</Alert>
        )}

    </div>
}