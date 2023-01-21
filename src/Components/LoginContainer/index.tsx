import { useEffect, useState } from 'react';
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

    const [validationStatusEmail, setValidationStatusEmail] = useState<boolean>(false);
    const [validationStatusPassword, setValidationStatusPassword] = useState<boolean>(false);

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [validateNow, setValidateNow] = useState<boolean>(false);

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

    // Validation for Email
    useEffect(() => {
        if (email.length !== 0) {
            setValidationStatusEmail(true);
        }
        else {
            setValidationStatusEmail(false);
        }
    }, [email]);

    // Validation for Password
    useEffect(() => {
        if (password.length !== 0) {
            setValidationStatusPassword(true);
        }
        else {
            setValidationStatusPassword(false);
        }
    }, [password]);

    const validateForm = () => {
        setValidateNow(true);
        // if (email === "" && password === "") {
        //     setValidationStatusEmail(false);
        //     setValidationStatusPassword(false);
        //     return;
        // }
        // for (let i = 0; i < jsonData.length; i++) {
        //     if (email === jsonData[i].email && password === jsonData[i].password) {
        //         alert("Validated Correctly");
        //         setValidationStatusEmail(true);
        //         setValidationStatusPassword(true);
        //         navigate("/")
        //     }
        // }
        if (email.length !== 0 && (document.getElementById("userName") !== document.activeElement)) {
            // @ts-ignore
            document.getElementById("emailLabel").style = "display:none; !important";
        }
        // 
        if (password.length !== 0 && (document.getElementById("passwordInput") !== document.activeElement)) {

            // @ts-ignore
            document.getElementById("passwordLabel").style = "display:none; !important";
        }
    }

    return (
        <form className={styles.loginContainer} action="return false" noValidate
            onClick={
                () => {
                    if (email.length === 0 && (document.getElementById("userName") !== document.activeElement)) {
                        // @ts-ignore
                        document.getElementById("emailLabel").style = "display:block";
                    }
                    if (password.length === 0 && (document.getElementById("passwordInput") !== document.activeElement)) {
                        // @ts-ignore
                        document.getElementById("passwordLabel").style = "display:block";
                    }
                }
            }
        >
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
                {/* VALIDATION GOES HERE */}
                {(validateNow === false) ? (
                    <div>
                        <div>
                            <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.userName.label')}</label>
                            <input
                                className={`form-control ${styles.email}`}
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={`${t('login.rightSide.loginContainer.formInputs.userName.placeHolder')}`}
                                style={{
                                    paddingLeft: 20,
                                }}
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
                                style={{
                                    paddingLeft: 20,
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.userName.label')}</label>
                            <div className={`form-outline ${styles.email} ${(validationStatusEmail) && (styles.inputValidatedTrue)} ${(!validationStatusEmail) && (styles.inputValidatedFalse)}`}>
                                <i className={`${(!validationStatusEmail) && (`fas fa-exclamation-circle ${styles.validatedFalse}`)}  ${(validationStatusEmail) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
                                <input
                                    onFocus={
                                        () => {
                                            if (email.length === 0 && (document.getElementById("userName") === document.activeElement)) {
                                                // @ts-ignore
                                                document.getElementById("emailLabel").style = "display:none;";
                                            }
                                        }
                                    }
                                    type="text"
                                    value={email}
                                    onChange={(e: any) => {
                                        setEmail(e.target.value)
                                        if (email.length === 0 && (document.getElementById("userName") === document.activeElement)) {
                                            // @ts-ignore
                                            document.getElementById("emailLabel").style = "display:none;";
                                        }
                                    }}
                                    placeholder={`${t('login.rightSide.loginContainer.formInputs.userName.placeHolder')}`}
                                    className="form-control form-icon-trailing"
                                    style={{ height: 50, paddingLeft: 21, paddingBottom: 10 }}
                                    id="userName"
                                />
                                {(!validationStatusEmail) && (email.length === 0) && (<p className={styles.infoInputs}>Please fill out the email field</p>)}
                                {/* <label className={`form-label ${styles.formLabelStyles}`} id="emailLabel" htmlFor="userName">
                                    Enter User Name
                                </label> */}
                            </div>
                        </div>
                        <div style={{ marginTop: (!validationStatusEmail) ? (20) : (0) }}>
                            <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.password.label')}</label>
                            <div className={`form-outline ${styles.password} ${(validationStatusPassword) && (styles.inputValidatedTrue)} ${(!validationStatusPassword) && (styles.inputValidatedFalse)}`}>
                                <i className={`${(!validationStatusPassword) && (`fas fa-exclamation-circle ${styles.validatedFalse}`)}  ${(validationStatusPassword) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
                                <input
                                    onFocus={
                                        () => {
                                            if (password.length === 0 && (document.getElementById("passwordInput") === document.activeElement)) {
                                                // @ts-ignore
                                                document.getElementById("passwordLabel").style = "display:none;";
                                            }
                                        }
                                    }
                                    type="password"
                                    value={password}
                                    onChange={(e: any) => {
                                        setPassword(e.target.value)
                                        if (password.length === 0 && (document.getElementById("passwordInput") === document.activeElement)) {
                                            // @ts-ignore
                                            document.getElementById("passwordLabel").style = "display:none;";
                                        }
                                    }}
                                    placeholder={`${t('login.rightSide.loginContainer.formInputs.password.placeHolder')}`}
                                    className="form-control form-icon-trailing"
                                    style={{ height: 50, paddingLeft: 21, paddingBottom: 10 }}
                                    id="passwordInput"
                                />
                                {(!validationStatusPassword) && (password.length === 0) && (<p className={styles.infoInputs}>Please fill out the password field</p>)}
                                <label className={`form-label ${styles.formLabelStyles}`} id="passwordLabel" htmlFor="passwordInput">
                                    Enter Password
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {/* VALIDATION ENDS HERE */}

                {(validateNow === false) ? (
                    <div style={{marginTop:0}}>
                    </div>
                ) : (
                    <div style={{marginTop:25}}>
                    </div>
                )}

                <div>
                    {/* Remember Me Checkbox */}
                    <div className={`form-check ${styles.rememberMeBlock}`} style={{ marginTop: ((!validationStatusPassword)?(40):(0)) }}>
                        <input type="checkbox" style={{ direction: "ltr",width:20,height:20 }} checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
                        <label className={`form-check-label ${styles.rmt}`} onClick={() => setIsChecked(!isChecked)}> {t('login.rightSide.loginContainer.formInputs.rememberMeText')}</label>
                    </div>
                    <button type='button' className={`btn ${styles.btn_login}`} onClick={validateForm}>
                        {t('login.rightSide.loginContainer.formInputs.btnLogin')}
                    </button>
                    <div className={styles.forgotPassword}>
                        {t('login.rightSide.loginContainer.formInputs.forgetPassword')}
                        <Link to="/forgetpassword"> <span style={{ color: "#e79f43" }}> {t('login.rightSide.loginContainer.formInputs.clickHere')} </span></Link>
                    </div>
                </div>

            </section>
        </form>
    )
}
export default LoginContainer;