import './Login.css';
import loginImg from '../../../assets/loginImg.jpg';

function Login() {
    return (
        <div className="container">
            <div className="boxForm"></div>
            <div className="boxImg">
                <img src={loginImg} alt="Login" />
            </div>
        </div>
    );
}

export default Login;
