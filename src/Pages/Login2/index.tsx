import React, { useState, useEffect } from "react";
// Importing CSS
import styles from './style.module.css';

// importing components
import LoginContainer from "../../Components/LoginContainer";

const Login2 = () => {

    const [currentTab, setCurrentTab] = useState<Number>(1);

    return (
        <div className={styles.containerCustom}>
            <div className={styles.leftSide}>
                <div className={styles.topContainerLeftLogin}>
                    <div>
                        <h3 className={styles.left_heading_about}>
                            {(currentTab === 1) ? ("About Us") : ("Announcements")}
                        </h3>
                        <p className={styles.desc_left_login}>
                            {(currentTab === 1) ? ("EQA is a web based application to automate") : ("These are recent notifications listed below.")}
                        </p>
                    </div>
                    <div className={styles.mobileTabLogin}>
                        <div className={styles.tabLogin}>
                            <div className={`${styles.generalLeft} ${(currentTab === 1) ? (styles.leftSelectedTabLogin) : (styles.leftTabLogin)}`} onClick={() => { setCurrentTab(1); }}>
                                About Us
                            </div>
                            <div className={`${styles.generalRight} ${(currentTab === 2) ? (styles.rightSelectedTabLogin) : (styles.rightTabLogin)}`} onClick={() => { setCurrentTab(2); }}>
                                Notice Board
                            </div>
                        </div>
                    </div>
                </div>

                {(currentTab === 1) ? (
                    <div className={styles.aboutContainer}>
                        <h1 className={styles.heading_info_login}>
                            Education Quality Assurance (EQA) an <br />
                            Accreditation Framework for NCAA & ABET
                        </h1>
                        <p className={styles.bottom_desc_login}>
                            EQA is a web based application to automate the end to end Academic Accreditation
                            Activities and strictly enforcing compliance requirements outlined by the
                            Accreditation Agencies around the globe to improvise educational delivery methods
                            and practices.
                        </p>
                        <button
                            type="button"
                            className={`btn btn-outline-warning ${styles.btn_learn_more}`}
                            data-mdb-ripple-color="dark"
                        >
                            Learn More
                        </button>
                    </div>
                ) : (
                    <div className={styles.announcementListContainer}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                            return (
                                <div className={styles.announcementSubContainer}>
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
                )}
            </div>
            <div className={styles.rightSide}>
                <LoginContainer />
            </div>
        </div>
    )
}
export default Login2;