import './FormLogin.css';
import Button from '../ButtonSubmit/Button.tsx';
import { TextField } from '@mui/material';

function FormLogin() {
    const handleLogin = () => {
        // Lógica de login
        console.log('Login button clicked');
    };

    // Estilos unificados
    const textFieldStyles = {
        input: { color: 'white' },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomColor: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiInputLabel-root': {
            color: 'white',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
        },
    };

    return (
        <div className="box">
            <div>
                <TextField
                    id="username"
                    label="Usuário"
                    variant="standard" // Mudança aqui
                    fullWidth
                    size="small"
                    sx={textFieldStyles}
                />
            </div>
            <div>
                <TextField
                    id="password"
                    label="Senha"
                    variant="standard" // Mudança aqui
                    fullWidth
                    size="small"
                    sx={textFieldStyles}
                />
            </div>
            <Button type="submit" variant="primary" onClick={handleLogin}>
                ENTRAR
            </Button>
            <div className="box-forgot-password">
                <p>Esqueceu a senha?</p>
            </div>
        </div>
    );
}

export default FormLogin;
