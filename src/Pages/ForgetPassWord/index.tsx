//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';
import forgetPassword_logo from '../../assets/Images/ForgetPassword/lock.png';

// Importing CSS
// import styles from './style.module.css';

const ForgetPassWord = () => {

    const { t } = useTranslation();

    return (
        // <div className={styles.containerCustom}>
        //     <div className={styles.forgetPasswordContainer}>
        //         <form className={styles.loginContainer} action="return false">
        //             <div className={styles.logo_mobile_container}>
        //                 <img
        //                     className={styles.logo}
        //                     src={logo}
        //                     alt={`${t('forgetPassword.img.img1.alt')}`}
        //                     title={`${t('forgetPassword.img.img1.title')}`}
        //                 />
        //             </div>
        //             <div>
        //                 <img
        //                     className={styles.logoLock}
        //                     src={forgetPassword_logo}
        //                     alt={`${t('forgetPassword.img.img2.alt')}`}
        //                     title={`${t('forgetPassword.img.img2.title')}`}
        //                 />
        //             </div>
        //             <h2 className={styles.titleForgetPassword}>{t('forgetPassword.title')}</h2>
        //             <p className={styles.infoForgotPassword}>{t('forgetPassword.subTitle')}</p>
        //             <section className={styles.form_inputs}>
        //                 <div>
        //                     <label className={styles.label_info}>{t('forgetPassword.formInputs.userName.label')}</label>
        //                     <input
        //                         className={`form-control ${styles.email}`}
        //                         type="text"
        //                         placeholder={`${t('forgetPassword.formInputs.userName.placeHolder')}`}
        //                     />
        //                 </div>

        //                 <button type='button' className={`btn ${styles.btn_forgetPassword}`}>
        //                     {t('forgetPassword.formInputs.btnResetPassword')}
        //                 </button>
        //             </section>
        //         </form>
        //     </div>
        // </div>
        <div>
            <h1>Forget Password</h1>
        </div>
    )
}
export default ForgetPassWord;