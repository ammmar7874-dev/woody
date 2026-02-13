import React, { useEffect } from 'react';

const GoogleTranslate = () => {
    useEffect(() => {
        // Ensure the script is loaded if not already
        if (!window.google || !window.google.translate) {
            const script = document.createElement('script');
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div id="google_translate_element" style={{ marginLeft: '10px' }}></div>
    );
};

export default GoogleTranslate;
