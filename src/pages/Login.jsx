import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export default function Login() {

    const { currentLanguage } = useContext(LanguageContext);

    return <div>
        <h1>Login</h1>
        <p>Selected language: {currentLanguage || '(none)'}</p>
    </div>
}