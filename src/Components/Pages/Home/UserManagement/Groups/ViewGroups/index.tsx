import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

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

interface GroupsProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const ViewGroups: React.FC<GroupsProps> = ({
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

    return (
        <div className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`} onClick={() => {
            if ((windowSize[0] < 991) && isOpen)
                setIsOpen(false);
        }}>
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    EQA / User Management /<span style={{ color: "#4f747a" }}> Groups </span>
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
                    <p className={styles.topContainerLeftText}> <b style={{ fontWeight: "bold" }}>Groups</b> Management </p>
                </div>
                <div className={styles.rightTopContainer}>
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
                            navigate("/usermanagement/groups/addgroup");
                        }}
                        startIcon={<AddIcon />}
                    >
                        Add Group
                    </Button>
                </div>
            </div>
            {/* Top Container */}

            {/* Box Container */}
            {/* <div className={`container-fluid ${styles.containerBoxes}`}>
                <div className="row gx-4" style={(windowSize[0] > 767) ? (styleFirstRowCB) : (styleForResponsiveFirstRowCB)}>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#6aac4c" }}>
                            <div className={styles.countICB}>6000</div>
                            <p className={styles.infoICB}>Total Groups</p>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#29aaca" }}>
                            <div className={styles.countICB}>800</div>
                            <p className={styles.infoICB}>Staff</p>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#23272b" }}>
                            <div className={styles.countICB}>700</div>
                            <p className={styles.infoICB}>Students</p>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Box Container */}

            <div style={{ marginTop: 30 }}>
                <DataTableMD
                    isOpen={isOpen}
                    data={data}
                    states={states}
                    ColHeader={tableColHeaders}
                    columnName={"CourseOfferingTypes"}
                    buttonTitle={"Create New Group"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Groups</b> <i>List</i>`}
                />
            </div>

            <br /> <br /> <br />
        </div>
    )
}
export default ViewGroups;