import React, { useState } from 'react';
import './mainfile.css';

function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

    const generatePassword = () => {
        const characters = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            specialChars: '!@#$%^&*()_-+=<>?',
        };

        let selectedChars = '';
        if (includeUppercase) selectedChars += characters.uppercase;
        if (includeLowercase) selectedChars += characters.lowercase;
        if (includeNumbers) selectedChars += characters.numbers;
        if (includeSpecialChars) selectedChars += characters.specialChars;

        if (selectedChars.length === 0) {
            setPassword('Please select at least one character type.');
            return;
        }

        let generatedPassword = '';
        const passwordLength = Math.max(length, 8); 
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * selectedChars.length);
            generatedPassword += selectedChars[randomIndex];
        }

        setPassword(generatedPassword);
    };

    const handleCopyToClipboard = () => {
        
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        
        alert('Password copied to clipboard!');
    };

    const handleLengthChange = (e) => {
        const newLength = parseInt(e.target.value, 10);
        if (!isNaN(newLength) && newLength > 7) {
            setLength(newLength);
        }
    };

    return (
        <div className="password-generator-container">
            <div className="password-generator " >
                <h1>Password Generator</h1>
                <div>

                    <input
                        type="number"
                        value={length}
                        onChange={handleLengthChange}
                    />

                </div>
                <div className="checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            checked={includeUppercase}
                            onChange={() => setIncludeUppercase(!includeUppercase)}
                        />
                        Include Uppercase
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeLowercase}
                            onChange={() => setIncludeLowercase(!includeLowercase)}
                        />
                        Include Lowercase
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeNumbers}
                            onChange={() => setIncludeNumbers(!includeNumbers)}
                        />
                        Include Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeSpecialChars}
                            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
                        />
                        Include Special Characters
                    </label>
                </div>
                <div>
                    <input type="text" value={password} readOnly />
                </div>
                <button onClick={generatePassword} style={{ marginRight: '10px' }}>Generate Password</button>
                
                <button onClick={handleCopyToClipboard} style={{background:'green' }}>Copy to Clipboard</button>
            </div>
        </div>



    );
}

export default PasswordGenerator;
