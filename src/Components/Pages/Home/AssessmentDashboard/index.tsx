import { IoSpeedometerOutline } from "react-icons/io5";

import styles from "./style.module.css";

const AssessmentDashboard = () => {
    return (
        <div className={`${styles.container}`}>
            <div>
                <span style={{ color: "#4f747a" }}>EQA</span> / Assessment / Dashboard
            </div>

            <br />
            <hr />
            <br />
            {/* Top Container */}
            <div className={styles.topContainer}>
                <div className="d-flex">
                    <IoSpeedometerOutline />
                    <p> Assessment Dashboard </p>
                </div>
                <div className="d-flex">
                    <p>No. of Login</p>
                    <p>Total No. of Login</p>
                </div>
            </div>
            {/* Top Container */}

            <br />
            <hr />
            <br />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 border ml-2">
                        1
                    </div>
                    <div className="col-md-4 border ml-2">
                        2
                    </div>
                    <div className="col-md-4 border ml-2">
                        3
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 border ml-2">
                        4
                    </div>
                    <div className="col-md-4 border ml-2">
                        5
                    </div>
                    <div className="col-md-4 border ml-2">
                        6
                    </div>
                </div>
            </div>

            <br />
            <hr />
            <br />

        </div>
    )
}
export default AssessmentDashboard;