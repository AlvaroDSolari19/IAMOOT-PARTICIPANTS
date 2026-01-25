import { createContext, useEffect, useState } from 'react'; 

export const LanguageContext = createContext(null);

export function LanguageProvider ({ children }) {

    const [currentLanguage, setLanguage] = useState( () => {
        return localStorage.getItem('currentLanguage') || '';
    })

    useEffect( () => {
        if (currentLanguage){
            localStorage.setItem('currentLanguage', currentLanguage);
        } else {
            localStorage.removeItem('currentLanguage');
        }
    }, [currentLanguage])

    return <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
        {children}
    </LanguageContext.Provider>

}