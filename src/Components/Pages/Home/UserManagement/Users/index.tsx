import { useState, useEffect } from "react";

import { IoSpeedometerOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// Importing components
import DataTableMD from "../../../../DataTableMD";

// @@@@@@@@@@@@@@ IMPORTING COURSE OFFERING TABLE DATA @@@@@@@@@@@@@@@@@
// Importing the course offering table data
import { data, states } from '../../../../../Data/Tables/CourseOfferings';

import styles from "./style.module.css";
// import "./style.css";

const percentage = 30;

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const Users: React.FC<UserProps> = ({
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
            if (windowSize[0] < 991)
                setIsOpen(!isOpen)
        }}>
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    EQA / User Management /<span style={{ color: "#4f747a" }}> Users </span>
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
                    <FaUserAlt size={27} style={{ marginTop: "3px" }} color="#4f747a" />
                    <p className={styles.topContainerLeftText}> <b style={{ fontWeight: "bold" }}>Users</b> Management </p>
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
                                    pathColor: `#1c4e80`,
                                    trailColor: '#1c4e8047'
                                })}
                            />
                        </div>
                        <div className={styles.containerRightProgress}>
                            <p style={{ fontSize: "15px", marginTop: 3 }}>Present Staff</p>
                            <p style={{ fontSize: 20, marginTop: -18, fontWeight: "bold" }}>743</p>
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
                                    pathColor: `#dbad58e9`,
                                    trailColor: '#dbad583e'
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
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#488A99" }}>
                            <div className={styles.countICB}>6000</div>
                            <p className={styles.infoICB}>Total Staff</p>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#1C4E80" }}>
                            <div className={styles.countICB}>800</div>
                            <p className={styles.infoICB}>Teachers</p>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#DBAE58" }}>
                            <div className={styles.countICB}>6</div>
                            <p className={styles.infoICB}>HOD's</p>
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
                    buttonTitle={"Create New User"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Users</b> <i>List</i>`}
                />
            </div>

            <br />
        </div>
    )
}
export default Users;