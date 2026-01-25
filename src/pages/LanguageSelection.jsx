import {Button, Card} from 'react-bootstrap';

export default function LanguageSelection() {
    return <div className='d-grid gap-2'>

        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>IAMOOT 2026 - Language Selection</Card.Header>
        </Card>

        <Button variant='primary'>English</Button>
        <Button variant='primary'>Español</Button>
        <Button variant='primary'>Português</Button>

    </div>
}