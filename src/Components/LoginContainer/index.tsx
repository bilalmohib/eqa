// Importing CSS
import styles from './style.module.css';

import { Link } from 'react-router-dom';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';

const LoginContainer = () => {
    return (
        <form className={styles.loginContainer} action="return false">
            <div className={styles.mobileCenter}>
                <img
                    className={styles.logoRight}
                    src={logo}
                    alt={"EQA University"}
                    title={"EQA University"}
                />
            </div>
            <h2 className={styles.titleLoginAccount}>Login With Your Account</h2>
            <section className={styles.form_inputs}>
                <div>
                    <label className={styles.label_info}>User Name</label>
                    <input
                        className={`form-control ${styles.email}`}
                        type="text"
                        placeholder='Enter User Name'
                    />
                </div>
                <div>
                    <label className={styles.label_info}>Password</label>
                    <input
                        className={`form-control ${styles.password}`}
                        type="password"
                        placeholder='Enter Password'
                    />
                </div>
                {/* Default radio */}
                <div className={`form-check ${styles.rememberMeBlock}`}>
                    <input className={`form-check-input`} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className={`form-check-label ${styles.rmt}`} htmlFor="flexRadioDefault1">Remember me for the next 30 days</label>
                </div>
                <button type='button' className={`btn ${styles.btn_login}`}>
                    Login
                </button>
                <div className={styles.forgotPassword}>
                    Forgot Password?
                    <Link to="/forgetpassword">click here</Link>
                </div>
            </section>
        </form>
    )
}
export default LoginContainer;