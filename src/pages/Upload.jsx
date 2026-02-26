import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Form, ListGroup } from 'react-bootstrap'

import { LanguageContext } from '../context/LanguageContext'
import api from '../services/api';

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
        submittedAtLabel: 'Submitted at',
        submitBtn: 'Submit Files',
        logoutBtn: 'Log out',
        successMsg: 'Your files have been submitted successfully. Further changes are no longer allowed.',
        deadlineClosedMsg: 'The submission deadline has passed. Uploading files is no longer permitted.',
        validation: {
            stateRequired: 'State memorandum is required.',
            victimRequired: 'Victim memorandum is required.',
            docxOnly: 'Only .docx files are accepted.',
            confirmRequired: 'You must confirm your submission is final.'
        }
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
        submittedAtLabel: 'Enviado el',
        submitBtn: 'Enviar Archivos',
        logoutBtn: 'Cerrar sesión',
        successMsg: 'Tus archivos se han enviado correctamente. No se permiten más cambios.',
        deadlineClosedMsg: 'La fecha límite de envío ha pasado. Ya no es posible subir archivos.',
        validation: {
            stateRequired: 'El memorando del Estado es obligatorio.',
            victimRequired: 'El memorando de la Víctima es obligatorio.',
            docxOnly: 'Solo se aceptan archivos .docx.',
            confirmRequired: 'Debes confirmar que el envío es final.'
        }
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
        submittedAtLabel: 'Enviado em',
        submitBtn: 'Enviar Arquivos',
        logoutBtn: 'Encerrar sessão',
        successMsg: 'Seus arquivos foram enviados com sucesso. Não são permitidas alterações.',
        deadlineClosedMsg: 'O prazo de envio expirou. Não é mais possível enviar arquivos.',
        validation: {
            stateRequired: 'O memorando do Estado é obrigatório.',
            victimRequired: 'O memorando da Vítima é obrigatório.',
            docxOnly: 'Apenas arquivos .docx são aceitos.',
            confirmRequired: 'Você deve confirmar que o envio é final.'
        }
    }
}

export default function Upload() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage];

    /* SETS THE SUBMISSION DEADLINE */
    const SUBMISSION_DEADLINE_UTC = '2026-03-26T03:59:00Z';
    const isDeadlinePassed = new Date() > new Date(SUBMISSION_DEADLINE_UTC);

    const [isAuthLoading, setIsAuthLoading] = useState(true); 
    const [submissionReceipt, setSubmissionReceipt] = useState(null);
    const navigate = useNavigate();

    /* VALIDATES AUTHENTICATED SESSION (JWT CHECK) */
    useEffect( () => { 
        
        const validateSession = async () => {
            const storedToken = localStorage.getItem('writtenTeamToken'); 
            
            if (!storedToken){
                navigate('/', { replace: true });
                return; 
            }

            try {
                await api.get('/api/participants/me'); 
                setIsAuthLoading(false); 
            } catch (requestError) {
                localStorage.removeItem('writtenTeamToken'); 
                navigate('/', { replace: true }); 
            }   
        }

        validateSession();

    }, [navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            stateFile: null,
            victimFile: null,
            confirmFinal: false
        }
    })

    const handleFormSubmit = async (someData) => {
        setSubmissionReceipt({
            submittedAtISO: new Date().toISOString(),
            stateFileName: someData.stateFile?.[0]?.name ?? '',
            victimFileName: someData.victimFile?.[0]?.name ?? ''
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('writtenTeamToken'); 
        setSubmissionReceipt(null); 
        navigate('/');
    }

    if (isAuthLoading) return null; 

    return <div>
        <Card className='text-center'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        {submissionReceipt && (
            <Card>
                <Card.Body>
                    <Card.Title className='text-success fw-bold'>{actualText.successMsg}</Card.Title>
                    <ListGroup variant='flush' className='mt-3'>
                        <ListGroup.Item>
                            <strong>{actualText.stateLabel}:</strong> {submissionReceipt.stateFileName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>{actualText.victimLabel}:</strong> {submissionReceipt.victimFileName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>{actualText.submittedAtLabel}:</strong> {new Date(submissionReceipt.submittedAtISO).toLocaleString()}
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        )}

        {!submissionReceipt && (
            <>
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

                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Group className='mb-3 px-4'>
                        <Form.Label className='fw-bold'>{actualText.stateLabel}</Form.Label>
                        <Form.Control type='file' accept='.docx' disabled={isDeadlinePassed} {...register('stateFile', {
                            required: actualText.validation.stateRequired,
                            validate: {
                                docxOnly: (allFiles) =>
                                    !allFiles?.[0] || allFiles[0].name.toLowerCase().endsWith('.docx') || actualText.validation.docxOnly
                            }
                        })} />
                        {errors.stateFile && (
                            <Alert variant='danger'>{errors.stateFile.message}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group className='mb-3 px-4'>
                        <Form.Label className='fw-bold'>{actualText.victimLabel}</Form.Label>
                        <Form.Control type='file' accept='.docx' disabled={isDeadlinePassed} {...register('victimFile', {
                            required: actualText.validation.victimRequired,
                            validate: {
                                docxOnly: (allFiles) =>
                                    !allFiles?.[0] || allFiles[0].name.toLowerCase().endsWith('.docx') || actualText.validation.docxOnly
                            }
                        })} />
                        {errors.victimFile && (
                            <Alert variant='danger'>{errors.victimFile.message}</Alert>
                        )}
                    </Form.Group>

                    <Form.Group className='mb-3 px-4'>
                        <Form.Check type='checkbox' label={actualText.confirmLabel} disabled={isDeadlinePassed} {...register('confirmFinal', {
                            required: actualText.validation.confirmRequired
                        })} />
                        {errors.confirmFinal && (
                            <Alert variant='danger'>{errors.confirmFinal.message}</Alert>
                        )}
                    </Form.Group>

                    <div className='d-grid mb-3'>
                        <Button type='submit' disabled={isSubmitting || isDeadlinePassed}>{actualText.submitBtn}</Button>
                    </div>
                </Form>
            </>
        )}

        {isDeadlinePassed && <Alert variant='danger' className='mt-3 text-center fw-semibold'>{actualText.deadlineClosedMsg}</Alert>}

        <div className='d-grid'>
            <Button variant='danger' type='button' onClick={handleLogout}>{actualText.logoutBtn}</Button>
        </div>

    </div>
}