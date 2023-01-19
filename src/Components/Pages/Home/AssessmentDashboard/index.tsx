import { IoSpeedometerOutline } from "react-icons/io5";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

// Importing components
import DataTableMD from "../../../DataTableMD";

import styles from "./style.module.css";

const percentage = 30;

const AssessmentDashboard = () => {
    return (
        <div className={`${styles.container}`}>
            <div>
                <span style={{ color: "#4f747a" }}>EQA</span> / Assessment / Dashboard
            </div>

            <br />
            {/* <hr />
            <br /> */}
            {/* Top Container */}
            <div className={styles.topContainer}>
                <div className={styles.leftTopContainer}>
                    <IoSpeedometerOutline size={27} style={{ marginTop: "3px" }} color="#4f747a" />
                    <p className={styles.topContainerLeftText}> <b style={{ fontWeight: "bold" }}>Assessment</b> Dashboard </p>
                </div>
                <div className="d-flex">
                    <div className={styles.progressBarTopContainer} style={{ marginRight: 20 }}>
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

            {/* <div className={`container-fluid px-4 ${styles.containerBoxes}`}>
                <div className="row gx-5 gy-5">
                    <div className={`col-4 ${styles.insideContainerBox}`}>
                        1
                    </div>
                    <div className={`col-4 ${styles.insideContainerBox}`}>
                        2
                    </div>
                    <div className={`col-4 ${styles.insideContainerBox}`}>
                        3
                    </div>
                </div>
                <div className="row gx-5 gy-5">
                    <div className={`col-4 ${styles.insideContainerBox}`}>
                        4
                    </div>
                    <div className={`col-4 ${styles.insideContainerBox}`}>
                        5
                    </div>
                    <div className={`col-4 ${styles.insideContainerBox}`}>
                        6
                    </div>
                </div>
            </div> */}

            <div className={`container-fluid ${styles.containerBoxes}`}>
                <div className="row gx-3" style={{marginBottom:25}}>
                    <div className={`col-md-4 ${styles.insideContainerBox}`}>
                        <div className="p-3 border bg-light">Custom Number 1</div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border bg-light">Custom Number 2</div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border bg-light">Custom Number 3</div>
                    </div>
                </div>
                <div className="row gx-3">
                    <div className="col-md-4">
                        <div className="p-3 border bg-light">Custom Number 1</div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border bg-light">Custom Number 2</div>
                    </div>
                    <div className="col-md-4">
                        <div className="p-3 border bg-light">Custom Number 3</div>
                    </div>
                </div>
            </div>

            <br />
            <hr />
            <br />


            <div>
                <DataTableMD />
            </div>

            <br /><br /><br /><br /><br />

        </div>
    )
}
export default AssessmentDashboard;