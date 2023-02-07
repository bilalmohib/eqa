import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";

import AddIcon from '@mui/icons-material/Add';
// Importing material ui components
import Button from '@mui/material/Button';

// Importing components
import DataTableMD from "../../../../../DataTableMD";

import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

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
                {(t('Home.Sidebar.list.userManagement.subMenu.roles.details.breadcrumb.f1'))} / {(t('Home.Sidebar.list.userManagement.subMenu.roles.details.breadcrumb.f2'))} /<span style={{ color: "#4f747a" }}> {(t('Home.Sidebar.list.userManagement.subMenu.roles.details.breadcrumb.f3'))} </span>
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
                    <p className={`${styles.topContainerLeftText}`}> 
                    {/* <b style={{ fontWeight: "bold", color: "#4f747a" }}>Roles</b> Management  */}
                    {(t('Home.Sidebar.list.userManagement.subMenu.roles.details.title'))}
                    </p>
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
                            navigate("/usermanagement/roles/addrole");
                        }}
                        startIcon={<AddIcon />}
                    >
                        {(t('Home.Sidebar.list.userManagement.subMenu.roles.details.addUser'))}
                    </Button>
                </div>
            </div>
            {/* Top Container */}

            <div style={{ marginTop: 30 }}>
                <DataTableMD
                    isOpen={isOpen}
                    data={data}
                    states={states}
                    ColHeader={tableColHeaders}
                    columnName={"CourseOfferingTypes"}
                    tableInfo={(t('Home.Sidebar.list.userManagement.subMenu.roles.details.table.subTitle'))}
                    buttonTitle={"Create New Role"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Roles</b> <i>List</i>`}
                />
            </div>

            <br /> <br /> <br />
        </div>
    )
}
export default ViewRoles;