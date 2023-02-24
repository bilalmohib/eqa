import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { HiUserGroup } from "react-icons/hi2";

import AddIcon from '@mui/icons-material/Add';
// Importing material ui components
import Button from '@mui/material/Button';

import axios from "axios";
import Cookies from "js-cookie";

// Importing components
import DataTableMD from "../../../../../DataTableMD";

import { useTranslation } from "react-i18next";

// @@@@@@@@@@@@@@ IMPORTING COURSE OFFERING TABLE DATA @@@@@@@@@@@@@@@@@
// Importing the course offering table data
import { data, states } from '../../../../../../Data/Tables/CourseOfferings';

import styles from "./style.module.css";
interface RolesProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string
}

const ViewRoles: React.FC<RolesProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    currentLang
}) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const currentFormatedDate: string = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    // Fetching data using axios
    const [viewAllUsersData, setViewAllUsersData] = useState(null);

    const [fetchUpdate, setFetchUpdate] = useState(true);

    useEffect(() => {
        console.log("View All Users Data ===> ", viewAllUsersData);
    });

    useEffect(() => {

        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        console.log("Access Token in View Users ===> ", accessToken);

        if (accessToken !== null && fetchUpdate === true) {
            // Fetching data using axios and also pass the header x-api-key for auth
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchRoles", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setViewAllUsersData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
            setFetchUpdate(false);
        }
    }, [fetchUpdate]);

    const tableColHeaders = [
        [
            'roleId',
            'roleName',
            'roleDescription',
            'active',
            'createdBy',
            'creationDateAndTime',
            'updatedBy',
            'updateDateAndTime'
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
                            navigate("/account/roles/addrole");
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
                    data={(
                        viewAllUsersData !== null
                    ) ? (
                        // @ts-ignore
                        viewAllUsersData.obj
                    ) : ([])}
                    states={states}
                    ColHeader={tableColHeaders}
                    columnName={"ViewRoles"}
                    tableInfo={(t('Home.Sidebar.list.userManagement.subMenu.roles.details.table.subTitle'))}
                    buttonTitle={"Create New Role"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Roles</b> <i>List</i>`}
                    currentLang={currentLang}
                    setFetchUpdate={setFetchUpdate}
                />
            </div>

            <br /> <br /> <br />
        </div>
    )
}
export default ViewRoles;