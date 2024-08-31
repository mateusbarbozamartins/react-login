import './Login.css';
import FormLogin from '../../components/FormLogin/FormLogin';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import { useLocation } from 'react-router-dom';

function Login() {
    const location = useLocation();
    const isForgotPassword = location.pathname === '/esqueci-senha';

    return (
        <div className="container">
            <div className="box-img"></div>
            <div className="box-form">
                <div className="form">
                    <div>
                        <h1>
                            {isForgotPassword
                                ? 'Esqueci Senha'
                                : 'Seja bem-vindo'}
                        </h1>
                        <p>
                            {isForgotPassword
                                ? 'Informe abaixo e-mail e cpf cadastrados para continuar recuração de senha'
                                : 'Comece a gerenciar suas vendas de forma mais rápida e melhor'}
                        </p>
                    </div>
                    {isForgotPassword ? <ForgotPassword /> : <FormLogin />}
                </div>
                <p className="footer">
                    &copy; 2024 mateusbarbozamartins@gmail.com. Todos os
                    direitos reservados.
                </p>
            </div>
        </div>
    );
}

export default Login;
