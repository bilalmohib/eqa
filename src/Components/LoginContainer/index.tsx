import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

// Importing CSS
import styles from './style.module.css';

const LoginContainer = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const jsonData = [
        {
            email: "bilalmohib7896@gmail.com",
            password: "bilal"
        },
        {
            email: "bilalmohib123@gmail.com",
            password: "bilal"
        },
        {
            email: "bilalmohib789@gmail.com",
            password: "bilal"
        },
        {
            email: "bilalmohib@gmail.com",
            password: "bilal"
        },
        {
            email: "bilal@gmail.com",
            password: "bilal"
        },
        {
            email: "mohib7896@gmail.com",
            password: "bilal"
        }
    ]

    const validateForm = () => {
        if (email === "" && password === "") {
            alert("Please fill the values first");
            return;
        }
        for (let i = 0; i < jsonData.length; i++) {
            if (email === jsonData[i].email && password === jsonData[i].password) {
                alert("Validated Correctly");
                navigate("/")
            }
        }
        alert("Validation Failed");
    }

    return (
        <form className={styles.loginContainer} action="return false" >
            <div className={styles.mobileCenter}>
                <img
                    className={styles.logoRight}
                    src={logo}
                    alt={`${t('login.rightSide.loginContainer.img.alt')}`}
                    title={`${t('login.rightSide.loginContainer.img.title')}`}
                />
            </div>
            <h2 className={styles.titleLoginAccount}>{t('login.rightSide.loginContainer.title')}</h2>
            <section className={styles.form_inputs}>
                <div>
                    <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.userName.label')}</label>
                    <input
                        className={`form-control ${styles.email}`}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={`${t('login.rightSide.loginContainer.formInputs.userName.placeHolder')}`}
                    />
                </div>
                <div>
                    <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.password.label')}</label>
                    <input
                        className={`form-control ${styles.password}`}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={`${t('login.rightSide.loginContainer.formInputs.password.placeHolder')}`}
                    />
                </div>
                {/* Default radio */}
                <div className={`form-check ${styles.rememberMeBlock}`}>
                    <input className={`form-check-input`} type="radio" checked={isChecked} name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className={`form-check-label ${styles.rmt}`} htmlFor="flexRadioDefault1" onClick={() => setIsChecked(!isChecked)}> {t('login.rightSide.loginContainer.formInputs.rememberMeText')}</label>
                </div>
                <button type='button' className={`btn ${styles.btn_login}`} onClick={validateForm}>
                    {t('login.rightSide.loginContainer.formInputs.btnLogin')}
                </button>
                <div className={styles.forgotPassword}>
                    {t('login.rightSide.loginContainer.formInputs.forgetPassword')}
                    <Link to="/forgetpassword"> <span style={{ color: "#e79f43" }}> {t('login.rightSide.loginContainer.formInputs.clickHere')} </span></Link>
                </div>
            </section>
        </form>
    )
}
export default LoginContainer;