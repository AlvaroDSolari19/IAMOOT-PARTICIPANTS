import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap';

import { LanguageContext } from '../context/LanguageContext';

export default function LanguageSelection() {

    const { setLanguage } = useContext(LanguageContext);
    const navigate = useNavigate(); 

    const pickLanguage = (someLanguage) => {
        setLanguage(someLanguage);
        navigate('/login');
    }

    return <div className='d-grid gap-2'>

        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>IAMOOT 2026 - Language Selection</Card.Header>
        </Card>

        <Button variant='primary' onClick={() => pickLanguage('EN')}>English</Button>
        <Button variant='primary' onClick={() => pickLanguage('ES')}>Español</Button>
        <Button variant='primary' onClick={() => pickLanguage('POR')}>Português</Button>

    </div>
}