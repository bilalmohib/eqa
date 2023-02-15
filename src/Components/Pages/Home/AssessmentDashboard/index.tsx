import { useState, useEffect } from "react";

import { IoSpeedometerOutline } from "react-icons/io5";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// Importing components
import DataTableMD from "../../../DataTableMD";

// @@@@@@@@@@@@@@ IMPORTING COURSE OFFERING TABLE DATA @@@@@@@@@@@@@@@@@
// Importing the course offering table data
import { data, states } from '../../../../Data/Tables/CourseOfferings';

import styles from "./style.module.css";
import "./style.css";
// import GradeComparison from "../../../GradeComparison";

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

const percentage = 30;

interface AssessmentDashboardProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string
}

const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    currentLang
}) => {
    const { t } = useTranslation();

    const currentFormatedDate: string = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const styleFirstRowCB = {
        marginBottom: 24,
        marginLeft: -36,
        marginRight: -36,
    };

    const styleForResponsiveFirstRowCB = {
        marginBottom: 0,
        marginLeft: -36,
        marginRight: -36,
    }

    const tableColHeaders = [
        [
            'Course Code',
            'name',
            'section',
            'noofstudent',
            'coordinator',
            'instructor',
            'campus',
            'semester',
        ]
    ];

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <div className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`} onClick={() => {
            if ((windowSize[0] < 991) && isOpen)
                setIsOpen(false)
        }}>
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    <span style={{ color: "#4f747a" }}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.pages.eqa')}</span> / {t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.pages.assessment')} / {t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.pages.dashboard')}
                </div>
                <div>
                    <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                </div>
            </div>

            {/* <hr />
            <br /> */}
            {/* Top Container */}
            <div className={styles.topContainer}>
                <div className={styles.leftTopContainer}>
                    <IoSpeedometerOutline size={27} style={{ marginTop: "3px" }} color="#4f747a" />
                    <p className={styles.topContainerLeftText}> <b style={{ fontWeight: "bold" }}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.pages.assessment')}</b> {t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.pages.dashboard')} </p>
                </div>
                <div className={styles.rightTopContainer}>
                    <div className={styles.progressBarTopContainer}>
                        <div style={{ width: "60px" }}>
                            <CircularProgressbar
                                value={70}
                                strokeWidth={15}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `rgba(79,116,122,0.8)`,
                                    trailColor: 'rgba(79,116,122,0.4)'
                                })}
                            />
                        </div>
                        <div className={styles.containerRightProgress}>
                            <p style={{ fontSize: "15px", marginTop: 3 }}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.presentStudents.title')}</p>
                            <p style={{ fontSize: 20, marginTop: -18, fontWeight: "bold" }}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.presentStudents.number')}</p>
                        </div>
                    </div>
                    <div className={styles.progressBarTopContainer}>
                        <div style={{ width: "60px" }}>
                            <CircularProgressbar
                                value={percentage}
                                strokeWidth={15}
                                styles={buildStyles({
                                    // Rotation of path and trail, in number of turns (0-1)
                                    rotation: 0,

                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',

                                    // Text size
                                    textSize: '16px',

                                    // How long animation takes to go from one percentage to another, in seconds
                                    pathTransitionDuration: 0.5,

                                    // Can specify path transition in more detail, or remove it entirely
                                    // pathTransition: 'none',

                                    // Colors
                                    pathColor: `rgba(0,138,248)`,
                                    trailColor: '#9acffa'
                                })}
                            />
                        </div>
                        <div className={styles.containerRightProgress}>
                            <p style={{ fontSize: "15px", marginTop: 3 }}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.total_no_of_login.title')}</p>
                            <p style={{ fontSize: 20, marginTop: -18, fontWeight: "bold" }}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.total_no_of_login.number')}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Top Container */}

            {/* Box Container */}
            <div className={`container-fluid ${styles.containerBoxes}`}>
                <div className="row gx-4" style={(windowSize[0] > 767) ? (styleFirstRowCB) : (styleForResponsiveFirstRowCB)}>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#a5b3e9" }}>
                            <div className={styles.countICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.courses.number')}</div>
                            <p className={styles.infoICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.courses.title')}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#ffcda1" }}>
                            <div className={styles.countICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.campuses.number')}</div>
                            <p className={styles.infoICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.campuses.title')}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#77d16d" }}>
                            <div className={styles.countICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.assessments.number')}</div>
                            <p className={styles.infoICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.assessments.title')}</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-4" style={{ marginLeft: "-36px", marginRight: "-36px" }}>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#83b5dd" }}>
                            <div className={styles.countICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.graduates.number')}</div>
                            <p className={styles.infoICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.graduates.title')}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#eadeaa" }}>
                            <div className={styles.countICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.libraries.number')}</div>
                            <p className={styles.infoICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.libraries.title')}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#a3c890" }}>
                            <div className={styles.countICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.faculty.number')}</div>
                            <p className={styles.infoICB}>{t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.stats.faculty.title')}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Box Container */}

            <div style={{ marginTop: 30 }}>
                <DataTableMD
                    isOpen={isOpen}
                    data={data}
                    states={states}
                    ColHeader={tableColHeaders}
                    columnName={"CourseOfferingTypes"}
                    tableInfo={`${t('Home.Sidebar.list.Dashboard.subMenu.Dashboard.details.table.subTitle')}`}
                    buttonTitle={"Create New Course Offering"}
                    tableTitle={"<b style={{ fontWeight: 'bold' }}>Offered</b> <i>Courses</i>"}
                    currentLang={currentLang}
                />
            </div>

            {/* <div style={{ marginTop: 40 }}>
                <GradeComparison
                    isOpen={isOpen}
                    data={data}
                    states={states}
                    columnValues={"CourseOfferingTypes"}
                    buttonTitle={"Create New Course Offering"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Grade Comparison</b>`}
                />
            </div> */}

            <br /><br /> <br />
        </div>
    )
}
export default AssessmentDashboard;