import { useState } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './FormLogin.css';
import Button from '../ButtonSubmit/Button.tsx';
import { api } from '../../services/api.service.ts';
import { useDocumentMask } from '../../hooks/masks/useDocumentMask.ts';

function FormLogin() {
    const [userDocument, setDocument, getRawDocument] = useDocumentMask('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const doc = getRawDocument();
            const { data } = await api.post('/users/login', {
                document: doc,
                password,
            });

            const token = data.data.idToken;
            document.cookie = `token=${token}; path=/; HttpOnly; Secure; SameSite=Strict`;

            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'document') {
            setDocument(value);
        } else {
            setPassword(value);
        }
    };

    const textFieldStyles = {
        input: { color: 'black' },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'black',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomColor: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInputLabel-root': {
            color: 'black',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black',
        },
    };

    const isButtonDisabled = !userDocument || !password;

    return (
        <div className="box">
            <div>
                <TextField
                    name="document"
                    label="usuário"
                    variant="standard"
                    fullWidth
                    size="small"
                    sx={textFieldStyles}
                    value={userDocument}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    name="password"
                    label="senha"
                    variant="standard"
                    fullWidth
                    size="small"
                    sx={textFieldStyles}
                    type="password" // Adicionando tipo password
                    value={password}
                    onChange={handleInputChange}
                />
            </div>
            <Button
                type="submit"
                variant="primary"
                onClick={handleLogin}
                disabled={isButtonDisabled}
            >
                ENTRAR
            </Button>
            <div className="box-forgot-password">
                <p>Esqueceu a senha?</p>
            </div>
        </div>
    );
}

export default FormLogin;
