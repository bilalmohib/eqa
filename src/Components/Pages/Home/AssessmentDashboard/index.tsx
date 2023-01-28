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

const percentage = 30;

interface AssessmentDashboardProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const AssessmentDashboard: React.FC<AssessmentDashboardProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {

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
                    <span style={{ color: "#4f747a" }}>EQA</span> / Assessment / Dashboard
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
                    <p className={styles.topContainerLeftText}> <b style={{ fontWeight: "bold" }}>Assessment</b> Dashboard </p>
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
                            <p style={{ fontSize: "15px", marginTop: 3 }}>Present Students</p>
                            <p style={{ fontSize: 20, marginTop: -18, fontWeight: "bold" }}>200</p>
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
                            <p style={{ fontSize: "15px", marginTop: 3 }}>Total No. of Login</p>
                            <p style={{ fontSize: 20, marginTop: -18, fontWeight: "bold" }}>45698</p>
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
                            <div className={styles.countICB}>80</div>
                            <p className={styles.infoICB}>Total Courses</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#ffcda1" }}>
                            <div className={styles.countICB}>20</div>
                            <p className={styles.infoICB}>Total Campuses</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#77d16d" }}>
                            <div className={styles.countICB}>40000+</div>
                            <p className={styles.infoICB}>No. of assessments created</p>
                        </div>
                    </div>
                </div>
                <div className="row gx-4" style={{ marginLeft: "-36px", marginRight: "-36px" }}>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#83b5dd" }}>
                            <div className={styles.countICB}>50000+</div>
                            <p className={styles.infoICB}>Graduated</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#eadeaa" }}>
                            <div className={styles.countICB}>14</div>
                            <p className={styles.infoICB}>Libraries in Campus</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#a3c890" }}>
                            <div className={styles.countICB}>456</div>
                            <p className={styles.infoICB}>Faculty Members</p>
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
                    columnValues={"CourseOfferingTypes"}
                    buttonTitle={"Create New Course Offering"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Offered</b> <i>Courses</i>`}
                />
            </div>

            <br /><br /> <br />
        </div>
    )
}
export default AssessmentDashboard;