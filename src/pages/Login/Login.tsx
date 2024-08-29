import './Login.css';
import loginImg from '../../assets/loginImg.jpg';
import FormLogin from '../../components/FormLogin/FormLogin';

function Login() {
    return (
        <div className="container">
            <div className="boxForm">
                <div className="form">
                    <h1>Login</h1>
                    <FormLogin />
                </div>
            </div>
            <div className="boxImg">
                <img src={loginImg} alt="Login" />
            </div>
        </div>
    );
}

export default Login;
