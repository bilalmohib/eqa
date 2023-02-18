import * as React from 'react';

import { useEffect, useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { renderToString } from 'react-dom/server';

// Importing Cookies
import Cookies from 'js-cookie';

// Importing Sidebar Icons
import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineFactCheck } from "react-icons/md";
import { RxDot } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

import axios from 'axios';

import {
    TextField,
    Checkbox,
    FormControlLabel
} from '@mui/material';

// Importing CSS
import styles from './style.module.css';

// Importing Services Layer API
// import { validateLogin } from '../../Service/Login';

interface LoginContainerProps {
    setShowHeader: any,

    // Sidebar Apps List
    sidebarAppsListArray: any,
    setSidebarAppsListArray: any
}

const LoginContainer: FC<LoginContainerProps> = ({
    setShowHeader,

    // Sidebar Apps List
    sidebarAppsListArray,
    setSidebarAppsListArray
}): JSX.Element => {
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
            setValidationStatusEmail(true);
        }
    }, [email]);

    // Validation for Password
    useEffect(() => {
        if (password.length !== 0) {
            setValidationStatusPassword(true);
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
        else if (email === "") {
            setValidationMessageEmail("Please fill out the username field");
            setValidationStatusEmail(false);
            return;
        }
        else if (password === "") {
            setValidationMessagePassword("Please fill out the password field");
            setValidationStatusPassword(false);
            return;
        }
        else {
            const postData = {
                "userName": email,
                "password": password
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/login/permissions', JSON.stringify(postData), config)
                .then((response: any) => {
                    console.log(response.data);

                    //@@@@@@@@@@@@@@@@@ Now the most important thing @@@@@@@@@@@@@@@@@
                    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    //@@@@@@@@@@@@@@@@@ Now the most important thing @@@@@@@@@@@@@@@@@

                    let responseStatus = response.data.status;

                    if (responseStatus === 'SUCCESS') {
                        // alert("Validated Correctly");

                        setValidationStatusEmail(true);
                        setValidationStatusPassword(true);

                        let data = response.data;

                        // We are setting the cookie for 60 days
                        Cookies.set("accessToken", data.jwtToken.accessToken, { expires: 60 });

                        if (data.privilege.user !== null && data.privilege.user !== undefined && data.privilege.user !== "") {
                            const userDetails = data.privilege.user;

                            let str = userDetails.emailId;
                            let nameReplace = str.replace(/@.*$/, "");
                            let userName = nameReplace !== str ? nameReplace : null;

                            // Setting the user details in the local storage
                            const user = {
                                Designataion: "Instructor",
                                fullName: userDetails.firstName + " " + userDetails.lastName,
                                userName: userName,
                                College: userDetails.collegeId,
                                Campus: userDetails.campusId,
                                Phone: userDetails.phoneNo ? userDetails.phoneNo : "N/A",
                                LastLogin: userDetails.lastLogin ? userDetails.lastLogin : "N/A",
                                Email: userDetails.emailId,
                                Department: userDetails.departmentId,
                            };

                            // Setting the user details in the local storage
                            localStorage.setItem("user", JSON.stringify(user));
                        }

                        if (data.privilege.apps !== null && data.privilege.apps !== undefined && data.privilege.apps !== "") {
                            const AppsListArray: any = Object.values(data.privilege.apps);
                            // console.log("Apps List: ", AppsListArray);
                            for (let i = 0; i < AppsListArray.length; i++) {
                                if (AppsListArray[i].appName === "Account") {
                                    AppsListArray[i].icon = renderToString(<FaUserAlt size={17} style={{ width: 23, height: 23 }} />);
                                } else if (AppsListArray[i].appName === "Assessment Application") {
                                    AppsListArray[i].icon = renderToString(<MdOutlineFactCheck size={25} style={{ width: 28, height: 28 }} />);
                                } else if (AppsListArray[i].appName === "Settings") {
                                    AppsListArray[i].icon = renderToString(<FiSettings style={{ marginLeft: 2 }} />);
                                } else {
                                    AppsListArray[i].icon = `${i} icon`;
                                }
                                AppsListArray[i].text = AppsListArray[i].appName;
                                AppsListArray[i].subMenu = AppsListArray[i].forms;
                                delete AppsListArray[i].forms;


                                const subMenu = AppsListArray[i].subMenu;
                                for (let j = 0; j < subMenu.length; j++) {
                                    subMenu[j].icon = renderToString(<RxDot style={{ marginLeft: 2 }} />);

                                    subMenu[j].text = subMenu[j].formName;
                                    if (subMenu[j].formUrl === "/account/user") {
                                        subMenu[j].formUrl = "account/users/viewusers";
                                    }
                                    else if (subMenu[j].formUrl === "/account/role") {
                                        subMenu[j].formUrl = "account/roles/viewroles";
                                    }
                                    else if (subMenu[j].formUrl === "/account/group") {
                                        subMenu[j].formUrl = "account/groups/viewgroups";
                                    }
                                }
                            }

                            // console.log("Response Apps List: ", AppsListArray);
                            setSidebarAppsListArray(AppsListArray);

                            // Please save the response in the local storage
                            localStorage.setItem("sidebarAppsListArray", JSON.stringify(AppsListArray));
                        }

                        setShowHeader(false);
                        // Now we will redirect to the dashboard
                        navigate("/dashboard/assessment");
                    }
                    else if (responseStatus === 'FAILED') {
                        alert("Validation Failed");
                        // else if (response === 'FAILED') {
                        // setValidateNow(false);
                        setValidationMessageEmail("Incorrect username or password");
                        setValidationMessagePassword("Incorrect username or password");

                        setValidationStatusEmail(false);
                        setValidationStatusPassword(false);
                        // // Clearing the fields
                        // setEmail("");
                        // setPassword("");
                        return;
                    } else {
                        alert("Something went wrong");
                    }
                    //@@@@@@@@@@@@@@@@@ Now the most important thing @@@@@@@@@@@@@@@@@
                    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    //@@@@@@@@@@@@@@@@@ Now the most important thing @@@@@@@@@@@@@@@@@
                })
                .catch(error => {
                    console.error("Error logging in using post api ==>", error);
                    // handle the error
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
                                    type="text"
                                    value={email}
                                    onChange={(e: any) => {
                                        setValidateNow(false);
                                        setEmail(e.target.value);
                                    }}
                                    placeholder={`${t('login.rightSide.loginContainer.formInputs.userName.placeHolder')}`}
                                    className="form-control form-icon-trailing"
                                    style={{ height: 50, paddingLeft: 21, paddingBottom: 10 }}
                                    id="userName"
                                />
                                {(!validationStatusEmail) && (<p className={styles.infoInputs}>{validationMessageEmail}</p>)}
                            </div>
                        </div>
                        <div style={{ marginTop: (!validationStatusEmail) ? (20) : (0) }}>
                            <label className={styles.label_info}>{t('login.rightSide.loginContainer.formInputs.password.label')}</label>
                            <div className={`form-outline ${styles.password} ${(validationStatusPassword) && (styles.inputValidatedTrue)} ${(!validationStatusPassword) && (styles.inputValidatedFalse)}`}>
                                <i className={`${(!validationStatusPassword) && (`fas fa-exclamation-circle ${styles.validatedFalse}`)}  ${(validationStatusPassword) && (`fas fa-check ${styles.validatedTrue}`)} trailing`} style={{ fontSize: 22 }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e: any) => {
                                        setValidateNow(false);
                                        setPassword(e.target.value);
                                    }}
                                    placeholder={`${t('login.rightSide.loginContainer.formInputs.password.placeHolder')}`}
                                    className="form-control form-icon-trailing"
                                    style={{ height: 50, paddingLeft: 21, paddingBottom: 10 }}
                                    id="passwordInput"
                                />
                                {(!validationStatusPassword) && (<p className={styles.infoInputs}>{validationMessagePassword}</p>)}
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