import { FC } from "react";
import { ImFacebook2, ImGoogle2 } from "react-icons/im";
import { FaTwitterSquare } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

// Importing CSS
import styles from './style.module.css';

// importing components
import LoginContainer from "../../Components/LoginContainer";

interface LoginProps {
    mobileViewContainer: any,
    currentTab: any,
    setCurrentTab: any
}

const Login2: FC<LoginProps> = ({
    mobileViewContainer,
    currentTab,
    setCurrentTab
}): JSX.Element => {

    const { t } = useTranslation();

    return (
        <div className={`${styles.containerCustom}`}>
            <div className="container">
                <div className="row">
                    <div className={`col-md-6 ${styles.leftSide}`}>
                        {/* If for Mobile The login container is selected then this should be shown */}
                        <div className={`${(mobileViewContainer === "Login") ? (styles.hideForMobile) : ("")} ${styles.topContainerLeftLogin}`}>
                            <div>
                                <h3 className={styles.left_heading_about}>
                                    {(currentTab === 1) ? (t('login.leftSide.tabs.aboutus.name')) : (t('login.leftSide.tabs.noticeboard.title'))}
                                </h3>
                                <p className={styles.desc_left_login}>
                                    {(currentTab === 1) ? (t('login.leftSide.tabs.aboutus.subTitle')) : (t('login.leftSide.tabs.noticeboard.subTitle'))}
                                </p>
                            </div>
                            <div className={`${styles.mobileTabLogin} ${styles.hideForMobile}`} style={{ direction: "ltr" }}>
                                <div className={styles.tabLogin}>
                                    <div className={`${styles.generalLeft} ${(currentTab === 1) ? (styles.leftSelectedTabLogin) : (styles.leftTabLogin)}`} onClick={() => { setCurrentTab(1); }}>
                                        {t('login.leftSide.tabs.aboutus.name')}
                                    </div>
                                    <div className={`${styles.generalRight} ${(currentTab === 2) ? (styles.rightSelectedTabLogin) : (styles.rightTabLogin)}`} onClick={() => { setCurrentTab(2); }}>
                                        {t('login.leftSide.tabs.noticeboard.name')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className={`${(mobileViewContainer === "About" || mobileViewContainer === "Announcement") ? ("") : (styles.hideForMobile)}`}>
                            {(currentTab === 1) ? (
                                <div className={`${(mobileViewContainer === "About") ? ("") : (styles.hideForMobile)} ${styles.aboutContainer}`}>
                                    <h1 className={styles.heading_info_login} >
                                        {t('login.leftSide.tabs.aboutus.title')}
                                    </h1>
                                    <p className={styles.bottom_desc_login}>
                                        {t('login.leftSide.tabs.aboutus.description')}
                                    </p>
                                    <div className={styles.bottomContainerTopContainer}>
                                        <button
                                            type="button"
                                            title={`${t('login.leftSide.tabs.aboutus.learnMoreBtn')}`}
                                            className={`btn btn-outline-warning ${styles.btn_learn_more}`}
                                            data-mdb-ripple-color="dark"
                                        >
                                            {t('login.leftSide.tabs.aboutus.learnMoreBtn')}
                                        </button>

                                        <h5 className={styles.findustext}>
                                            {t('login.leftSide.tabs.aboutus.findUs')}
                                        </h5>
                                        <ul className={styles.socialIconsList}>
                                            <li>
                                                <a href="https://www.facebook.com/">
                                                    <ImFacebook2 role={"button"} size={35} color="#c7d5d5" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://twitter.com/">
                                                    <FaTwitterSquare role={"button"} size={40} style={{ marginTop: -3 }} color="#c7d5d5" />
                                                </a>

                                            </li>
                                            <li>
                                                <a href="https://google.com/">
                                                    <ImGoogle2 size={35} role="button" color="#c7d5d5" />
                                                </a>

                                            </li>
                                            <li>
                                                <a href="https://linkedin.com/">
                                                    <GrLinkedin size={35} role="button" color="#c7d5d5" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (currentTab === 2) ? (
                                <div className={`${(mobileViewContainer === "Announcement") ? ("") : (styles.hideForMobile)} ${styles.announcementListContainer}`}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                                        return (
                                            <div key={index} className={styles.announcementSubContainer}>
                                                <div className={styles.leftAnnouncementSubContainer}>
                                                    <p className={styles.dateCountAnnouncementSC}>21</p> <br />
                                                    <p className={styles.dateMonthAnnouncementSC}>July 2022</p>
                                                </div>
                                                <div className={styles.rightAnnouncementSubContainer}>
                                                    <p className={styles.descHAnnouncementSC}>+12 class exam result announcement</p>
                                                    <p className={styles.descDAnnouncementSC}>The result announcement of +12 class exam will be on 30 July 2022</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div>
                                    <h1 className={styles.heading_info_login}>
                                        Please select appropriate tab
                                    </h1>
                                </div>
                            )}
                        </section>
                    </div>
                    <div
                        className={`
                        col-md-6 
                        ${styles.rightSide} 
                        ${(mobileViewContainer !== "Login") ?
                                (styles.hideForMobile) :
                                ("")}`}>
                        <LoginContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login2;