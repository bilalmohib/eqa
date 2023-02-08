import * as React from 'react';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

import {
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';

// Importing CSS
import styles from './style.module.css';

// Importing Services Layer API
import { validateLogin } from '../../Service/Login';

const LoginContainer = () => {
    const navigate = useNavigate();

    // Check if direction is rtl or not
    const { i18n } = useTranslation();
    const direction = i18n.dir();

    const { t } = useTranslation();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [validationStatusEmail, setValidationStatusEmail] = useState<boolean>(false);
    const [validationStatusPassword, setValidationStatusPassword] = useState<boolean>(false);

    const [validationMessageEmail, setValidationMessageEmail] = useState<string>("");
    const [validationMessagePassword, setValidationMessagePassword] = useState<string>("");

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [validateNow, setValidateNow] = useState<boolean>(false);

    // Validation for Email
    useEffect(() => {
        if (email.length !== 0) {
            // setValidateNow(true);
            setValidationStatusEmail(true);
        }
        else {
            setValidationMessageEmail("Please enter correct username");
            setValidationStatusEmail(false);
        }
    }, [email]);

    // Validation for Password
    useEffect(() => {
        if (password.length !== 0) {
            // setValidateNow(true);
            setValidationStatusPassword(true);
        }
        else {
            setValidationMessagePassword("Please enter correct password");
            setValidationStatusPassword(false);
        }
    }, [password]);


    const validateForm = () => {
        setValidateNow(true);
        if (email === "" && password === "") {
            setValidationMessageEmail("Please fill out the username field");
            setValidationMessagePassword("Please fill out the password field");

            setValidationStatusEmail(false);
            setValidationStatusPassword(false);
            return;
        }
        else if(email === "") {
            setValidationMessageEmail("Please fill out the username field");
            setValidationStatusEmail(false);
            return;
        }
        else if(password === "") {
            setValidationMessagePassword("Please fill out the password field");
            setValidationStatusPassword(false);
            return;
        }
        else {
            // console.log("Presentation Layer Response: ", email);
            validateLogin({
                "userName": email,
                "password": password
            }).then(response => {
                console.log("Presetation layer response: ", response);
                if (response === 'SUCCESS') {
                    setValidationStatusEmail(true);
                    setValidationStatusPassword(true);
                    // alert("Validated Correctly");
                    navigate("/dashboard/assessment");
                }
            }).catch(error => {
                console.log("Error in response : ", error);
                // else if (response === 'FAILED') {
                // setValidateNow(false);
                setValidationStatusEmail(false);
                setValidationStatusPassword(false);
                // Clearing the fields
                setEmail("");
                setPassword("");
                return;
            });
        }
    }

    return (
        <form className={styles.loginContainer} action="return false" noValidate
            autoComplete='off'
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
                            <div className={`form-outline ${styles.email} ${(validationStatusEmail) && (styles.inputValidatedTrue)}`}>
                                <i className={`${(validationStatusEmail) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e: any) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder={`${t('login.rightSide.loginContainer.formInputs.userName.placeHolder')}`}
                                    className="form-control form-icon-trailing"
                                    style={{ height: 50, paddingLeft: 21, paddingBottom: 10 }}
                                    id="userName"
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: (!validationStatusEmail) ? (5) : (5) }}>
                            <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.password.label')}</label>
                            <div className={`form-outline ${styles.password} ${(validationStatusPassword) && (styles.inputValidatedTrue)}`}>
                                <i className={`${(validationStatusPassword) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e: any) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder={`${t('login.rightSide.loginContainer.formInputs.password.placeHolder')}`}
                                    className="form-control form-icon-trailing"
                                    style={{ height: 50, paddingLeft: 21, paddingBottom: 10 }}
                                    id="passwordInput"
                                />
                            </div>
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
                            </div>
                        </div>
                    </div>
                )}
                {/* VALIDATION ENDS HERE */}

                {(validateNow === false) ? (
                    <div style={{ marginTop: 30 }}>
                    </div>
                ) : (
                    <div style={{ marginTop: 30 }}>
                    </div>
                )}

                <div>
                    {/* Remember Me Checkbox */}
                    <div className={`form-check ${styles.rememberMeBlock}`} style={{ marginTop: ((!validationStatusPassword) ? (40) : (0)) }}>
                        {/* <input type="checkbox" style={{ direction: "ltr", width: 20, height: 20 }} checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
                         */}
                        <FormControlLabel
                            label={t('login.rightSide.loginContainer.formInputs.rememberMeText')}
                            sx={{
                                '& .MuiFormControlLabel-label': {
                                    fontSize: "18px",
                                    color: "#6bb6b5",
                                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
                                    paddingLeft: (direction === "ltr") ? (2) : (0),
                                    paddingRight: (direction === "rtl") ? (2) : (0),
                                }
                            }}
                            value="rememberMe"
                            control={
                                <Checkbox
                                    name="rememberMe"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 25,
                                            color: "#6bb6b5",
                                        },
                                        style: { direction: "ltr" },
                                        /// CHECKBOX COLOR
                                        '& .Mui-checked': {
                                            color: "#6bb6b5",
                                        },
                                    }}
                                />
                            }
                        />
                        {/* <label className={`form-check-label ${styles.rmt}`} onClick={() => setIsChecked(!isChecked)}> {t('login.rightSide.loginContainer.formInputs.rememberMeText')}</label> */}
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