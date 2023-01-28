import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";

import AddIcon from '@mui/icons-material/Add';
// Importing material ui components
import Button from '@mui/material/Button';

// Importing components
import DataTableMD from "../../../../../DataTableMD";

// @@@@@@@@@@@@@@ IMPORTING COURSE OFFERING TABLE DATA @@@@@@@@@@@@@@@@@
// Importing the course offering table data
import { data, states } from '../../../../../../Data/Tables/CourseOfferings';

import styles from "./style.module.css";
// import "./style.css";

const percentage = 30;

interface RolesProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const ViewRoles: React.FC<RolesProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {
    const navigate = useNavigate();

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
        <div
            className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`}

            // On click of the sidebar, if the sidebar is open, then close it
            onClick={() => {
                if ((windowSize[0] < 991) && isOpen)
                    setIsOpen(false)
            }}
        >
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    EQA / User Management /<span style={{ color: "#4f747a" }}> Roles </span>
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
                    <HiUserGroup size={27} style={{ marginTop: "3px" }} color="#4f747a" />
                    <p className={`${styles.topContainerLeftText}`}> <b style={{ fontWeight: "bold", color: "#4f747a" }}>Roles</b> Management </p>
                </div>
                <div className={styles.rightTopContainer}>
                    {/* <div className={styles.progressBarTopContainer}>
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
                            <p style={{ fontSize: "15px", marginTop: 3 }}>Present Role Members</p>
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
                    </div> */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#e79f43",
                            // textTransform: "none",
                            fontWeight: "bold",
                            height: 40,
                            mt: 1,
                            "&:hover": {
                                backgroundColor: "#e79f43",
                            }
                        }}
                        onClick={() => {
                            navigate("/usermanagement/roles/addrole");
                        }}
                        startIcon={<AddIcon />}
                    >
                        Add Role
                    </Button>
                </div>
            </div>
            {/* Top Container */}

            <div style={{ marginTop: 30 }}>
                <DataTableMD
                    isOpen={isOpen}
                    data={data}
                    states={states}
                    columnValues={"CourseOfferingTypes"}
                    buttonTitle={"Create New Role"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Roles</b> <i>List</i>`}
                />
            </div>

            <br /> <br /> <br />
        </div>
    )
}
export default ViewRoles;