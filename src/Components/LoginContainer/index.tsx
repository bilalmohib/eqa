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

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const [validateNow, setValidateNow] = useState<boolean>(false);

    // Validation for Email
    useEffect(() => {
        if (email.length !== 0) {
            setValidateNow(false);
            setValidationStatusEmail(true);
        }
        else {
            setValidationStatusEmail(false);
        }
    }, [email]);

    // Validation for Password
    useEffect(() => {
        if (password.length !== 0) {
            setValidateNow(false);
            setValidationStatusPassword(true);
        }
        else {
            setValidationStatusPassword(false);
        }
    }, [password]);

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const validateForm = () => {
        setValidateNow(true);
        if (email === "" && password === "") {
            setValidationStatusEmail(false);
            setValidationStatusPassword(false);
            return;
        } else {
            postData('http://eqa.datadimens.com:8080/IDENTITY-SERVICE/login/permissions', {
                "userName": email,
                "password": password
            }).then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
                if (data.status === "SUCCESS") {
                    alert("Validated Correctly");
                    navigate("/");
                } else {
                    setValidationStatusEmail(false);
                    setValidationStatusPassword(false);
                    alert("Invalid Credentials");
                    return;
                }
                if (data.error) {
                    alert(data.error);
                    return;
                }
            });
        }
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
            autoComplete='off'
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
                            <div className={`form-outline ${styles.email} ${(validationStatusEmail) && (styles.inputValidatedTrue)}`}>
                                <i className={`${(validationStatusEmail) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
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
                            </div>
                            {/* <TextField
                                dir={direction}
                                id="username"
                                label={t('login.rightSide.loginContainer.formInputs.userName.label')}
                                // Change label color
                                InputLabelProps={{
                                    style: {
                                        color: "#4b7579",
                                        fontSize: 16,
                                        fontFamily: "AppleSystemUIFont, Helvetica Neue, Helvetica, Arial, sans-serif",
                                        fontWeight: 400,
                                        direction: direction === "ltr" ? "ltr" : "rtl"
                                    }
                                }}
                                placeholder="Enter username"
                                variant="standard"
                                type="text"
                                helperText=""
                                margin="normal"
                                sx={{
                                    width: '92%',
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#3E68A8',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderBottomColor: '#3E68A8',
                                        },
                                        '&:hover fieldset': {
                                            borderBottomColor: '#3E68A8',
                                            borderWidth: '0.15rem',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderBottomColor: '#3E68A8',
                                        },
                                    },
                                }}

                                // Change the border color
                                InputProps={{
                                    style: {
                                        color: "#4b7579",
                                        fontSize: 16,
                                        fontFamily: "AppleSystemUIFont, Helvetica Neue, Helvetica, Arial, sans-serif",
                                        fontWeight: 400,
                                        // borderBottom: "1px solid #4b7579"
                                    }
                                }}
                            // fullWidth // t
                            // InputProps={{

                            // }}
                            /> */}
                        </div>
                        <div style={{ marginTop: (!validationStatusEmail) ? (5) : (5) }}>
                            <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.password.label')}</label>
                            <div className={`form-outline ${styles.password} ${(validationStatusPassword) && (styles.inputValidatedTrue)}`}>
                                <i className={`${(validationStatusPassword) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
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
                                {/* <label className={`form-label ${styles.formLabelStyles}`} id="passwordLabel"
                                    style={{
                                        direction: direction === "ltr" ? "ltr" : "rtl",
                                    }}
                                    htmlFor="passwordInput">
                                    {t('login.rightSide.loginContainer.formInputs.password.label')}
                                </label> */}
                            </div>
                            {/* <TextField
                                dir={
                                    direction === "ltr" ? "ltr" : "rtl"
                                }
                                id="password"
                                label={t('login.rightSide.loginContainer.formInputs.password.label')}
                                // Change label color
                                InputLabelProps={{
                                    style: {
                                        color: "#4b7579",
                                        fontSize: 16,
                                        fontFamily: "AppleSystemUIFont, Helvetica Neue, Helvetica, Arial, sans-serif",
                                        fontWeight: 400,
                                        direction: direction === "ltr" ? "ltr" : "rtl"
                                    }
                                }}
                                placeholder={`${t('login.rightSide.loginContainer.formInputs.password.placeHolder')}`}
                                variant="standard"
                                type="password"
                                helperText=""
                                margin="normal"
                                sx={{
                                    width: '92%',
                                    '& .MuiInput-underline:after': {
                                        borderBottomColor: '#3E68A8',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderBottomColor: '#3E68A8',
                                        },
                                        '&:hover fieldset': {
                                            borderBottomColor: '#3E68A8',
                                            borderWidth: '0.15rem',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderBottomColor: '#3E68A8',
                                        },
                                    },
                                }}

                                // Change the border color
                                InputProps={{
                                    style: {
                                        color: "#4b7579",
                                        fontSize: 16,
                                        fontFamily: "AppleSystemUIFont, Helvetica Neue, Helvetica, Arial, sans-serif",
                                        fontWeight: 400,
                                        // borderBottom: "1px solid #4b7579"
                                    }
                                }}
                            /> */}
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
                                {/* <label className={`form-label ${styles.formLabelStyles}`} id="passwordLabel" htmlFor="passwordInput">
                                    Enter Password
                                </label> */}
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