import { useState, useRef, useEffect } from 'react';
import { Button, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import './FormLogin.css';
import SubmitButton from '../ButtonSubmit/Button.tsx';
import { api } from '../../services/api.service.ts';
import { useDocumentMask } from '../../hooks/masks/useDocumentMask.ts';
import { CustomTextField, IconWrapper } from '../Mui/Mui.tsx';

function FormLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [userDocument, setDocument, getRawDocument] = useDocumentMask('');
    const documentInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const isButtonDisabled = !userDocument || !password;

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

    useEffect(() => {
        if (documentInputRef.current && userDocument) {
            documentInputRef.current.focus();
        }
        if (passwordInputRef.current && password) {
            passwordInputRef.current.focus();
        }
    }, [userDocument, password]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = async () => {
        navigate('/esqueci-senha');
    };

    return (
        <div className="box">
            <div>
                <CustomTextField
                    inputRef={documentInputRef}
                    value={userDocument}
                    name="document"
                    onChange={handleInputChange}
                    fullWidth
                    style={{ marginTop: '1.5em' }}
                    placeholder="000.000.000-00"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconWrapper>
                                    <BadgeOutlinedIcon
                                        style={{ color: 'gray' }}
                                    />{' '}
                                </IconWrapper>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div>
                <CustomTextField
                    inputRef={passwordInputRef}
                    name="password"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconWrapper>
                                    <LockOutlinedIcon
                                        style={{ color: 'gray' }}
                                    />{' '}
                                </IconWrapper>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconWrapper
                                    onClick={handleClickShowPassword}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? (
                                        <VisibilityOff
                                            style={{ color: 'gray' }}
                                        />
                                    ) : (
                                        <Visibility style={{ color: 'gray' }} />
                                    )}
                                </IconWrapper>
                            </InputAdornment>
                        ),
                    }}
                    value={password}
                    onChange={handleInputChange}
                />
            </div>
            <SubmitButton
                type="submit"
                variant="primary"
                onClick={handleLogin}
                disabled={isButtonDisabled}
                className="custom-button"
            >
                ENTRAR
            </SubmitButton>

            <div className="box-forgot-password">
                <Button onClick={handleForgotPassword} variant="text">
                    Esqueceu a senha?
                </Button>
            </div>
        </div>
    );
}

export default FormLogin;
