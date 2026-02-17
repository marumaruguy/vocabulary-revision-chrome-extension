import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
    const { t } = useTranslation();

    return (
        <div style={{ padding: '20px', width: '300px' }}>
            <h1>{t('from')} {'->'} {t('to')}</h1>
            <p>Popup Content Here</p>
        </div>
    )
}

export default App
