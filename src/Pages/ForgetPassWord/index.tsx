import React, { useState, useEffect } from "react";
// Importing CSS
import styles from './style.module.css';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';
import forgetPassword_logo from '../../assets/Images/ForgetPassword/lock.png';

const ForgetPassWord = () => {

    return (
        <div className={styles.containerCustom}>
            <div className={styles.forgetPasswordContainer}>
                <form className={styles.loginContainer} action="return false">
                    <img
                        className={styles.logo}
                        src={logo}
                        alt={"EQA University"}
                        title={"EQA University"}
                    />
                    <div>
                        <img
                            className={styles.logoLock}
                            src={forgetPassword_logo}
                            alt={"EQA Lock"}
                            title={"EQA Lock"}
                        />
                    </div>
                    <h2 className={styles.titleForgetPassword}>Forgot password?</h2>
                    <p className={styles.infoForgotPassword}>You can reset your password here.</p>
                    <section className={styles.form_inputs}>
                        <div>
                            <label className={styles.label_info}>Email Address</label>
                            <input
                                className={`form-control ${styles.email}`}
                                type="text"
                                placeholder='Example@gmail.com'
                            />
                        </div>

                        <button type='button' className={`btn ${styles.btn_forgetPassword}`}>
                            Reset Password
                        </button>
                    </section>
                </form>
            </div>
        </div>
    )
}
export default ForgetPassWord;