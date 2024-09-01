import { useEffect, useRef, useState } from 'react';
import { InputAdornment } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

import './ForgotPassword.css';

import { CustomTextField, IconWrapper } from '../Mui/Mui';
import { useDocumentMask } from '../../hooks/masks/useDocumentMask';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SubmitButton from '../ButtonSubmit/Button';
import { api } from '../../services/api.service';

function ForgotPassword() {
    const [userDocument, setDocument, getRawDocument] = useDocumentMask('');
    const [userEmail, setEmail] = useState('');
    const documentInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const isButtonDisabled = !userDocument || !userEmail;

    const handleValidData = async () => {
        const doc = getRawDocument();
        const data = await api.post('/users/forgot-password', {
            document: doc,
            email: userEmail,
        });

        console.log(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'document') {
            setDocument(value);
        } else {
            setEmail(value);
        }
    };

    useEffect(() => {
        if (documentInputRef.current && userDocument) {
            documentInputRef.current.focus();
        }
        if (emailInputRef.current && userEmail) {
            emailInputRef.current.focus();
        }
    }, [userDocument, userEmail]);

    return (
        <div className="box">
            <div>
                <CustomTextField
                    style={{ marginTop: '1.5em' }}
                    fullWidth
                    name="document"
                    placeholder="000.000.000-00"
                    value={userDocument}
                    onChange={handleInputChange}
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
                    fullWidth
                    name="email"
                    placeholder="exemplo@gmail.com"
                    value={userEmail}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconWrapper>
                                    <EmailOutlinedIcon
                                        style={{ color: 'gray' }}
                                    />{' '}
                                </IconWrapper>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <SubmitButton
                type="submit"
                variant="primary"
                onClick={handleValidData}
                disabled={isButtonDisabled}
                className="custom-button"
            >
                RECEBER CÓDIGO
            </SubmitButton>
        </div>
    );
}

export default ForgotPassword;
