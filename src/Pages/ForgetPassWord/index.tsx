import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

import {
    TextField
} from '@mui/material';

import SnackBar from "../../Components/SnackBar";

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';
import forgetPassword_logo from '../../assets/Images/ForgetPassword/lock.png';

// Importing CSS
import styles from './style.module.css';

interface ForgetPasswordProps {
    setShowHeader: any;
}

const ForgetPassWord: React.FC<ForgetPasswordProps> = ({ setShowHeader }) => {
    const location = useLocation();

    ///////////////////////////////// Snackbar State /////////////////////////////////
    const [snackBarHandler, setSnackBarHandler] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    ///////////////////////////////// Snackbar State /////////////////////////////////

    useEffect(() => {
        // The current location.
        // console.clear();
        console.log('The current location is: ', location.pathname);
        const url = location.pathname;

        if ((url === '/login' || url === '/' || url === '/forgetpassword')) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    }, [location, setShowHeader]);

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (emailError) {
            setEmailError(false);
        }
        setEmail(event.target.value);
    };

    const handleResetPassword = () => {
        if (email === '') {
            setEmailError(true);
            setSnackBarHandler({
                open: true,
                severity: 'error',
                message: 'Please enter your email address'
            });
            return;
        } else {
            setSnackBarHandler({
                open: true,
                severity: 'success',
                message: 'Password reset link has been sent to your email address'
            });
        }
    };

    const { t } = useTranslation();

    return (
        <div className={styles.containerCustom}>
            <div className={styles.forgetPasswordContainer}>
                <form className={styles.loginContainer} action="return false">
                    <div className={styles.logo_mobile_container}>
                        <img
                            className={styles.logo}
                            src={logo}
                            alt={`${t('forgetPassword.img.img1.alt')}`}
                            title={`${t('forgetPassword.img.img1.title')}`}
                        />
                    </div>
                    <div>
                        <img
                            className={styles.logoLock}
                            src={forgetPassword_logo}
                            alt={`${t('forgetPassword.img.img2.alt')}`}
                            title={`${t('forgetPassword.img.img2.title')}`}
                        />
                    </div>
                    <h2 className={styles.titleForgetPassword}>{t('forgetPassword.title')}</h2>
                    <p className={styles.infoForgotPassword}>{t('forgetPassword.subTitle')}</p>
                    <section className={styles.form_inputs}>
                        <div>
                            {/* <label className={styles.label_info}>{t('forgetPassword.formInputs.userName.label')}</label> */}
                            {/* <input
                                className={`form-control ${styles.email}`}
                                type="text"
                                placeholder={`${t('forgetPassword.formInputs.userName.placeHolder')}`}
                            /> */}
                            <br />
                            <TextField
                                id="standard-basic"
                                label={t('forgetPassword.formInputs.userName.label')}
                                variant="standard"
                                value={email}
                                onChange={handleEmailChange}
                                error={emailError}
                                sx={{
                                    width: '84%',
                                    ml: "8%",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#E5E5E5',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#E5E5E5',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#E5E5E5',
                                        },
                                    }
                                }}
                                placeholder={`${t('forgetPassword.formInputs.userName.placeHolder')}`}
                            />
                        </div>

                        <button
                            type='button'
                            className={`btn ${styles.btn_forgetPassword}`}
                            onClick={handleResetPassword}
                        >
                            {t('forgetPassword.formInputs.btnResetPassword')}
                        </button>
                    </section>
                </form>
                <SnackBar
                    isOpen={snackBarHandler.open}
                    message={snackBarHandler.message}
                    severity={snackBarHandler.severity}
                    setIsOpen={
                        // Only pass the setIsOpen function to the SnackBar component
                        // and not the whole state object
                        (isOpen: boolean) => setSnackBarHandler({ ...snackBarHandler, open: isOpen })
                    }
                />
            </div>
        </div>
    )
}
export default ForgetPassWord;