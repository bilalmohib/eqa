import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import AppsIcon from '@mui/icons-material/Apps';

import axios from "axios";
import Cookies from "js-cookie";

import AddIcon from '@mui/icons-material/Add';
// Importing material ui components
import Button from '@mui/material/Button';

// Importing components
import DataTableMD from "../../../../../DataTableMD";

import { useTranslation } from "react-i18next";

// @@@@@@@@@@@@@@ IMPORTING COURSE OFFERING TABLE DATA @@@@@@@@@@@@@@@@@
// Importing the course offering table data
import { states } from '../../../../../../Data/Tables/CourseOfferings';

// importing urls
import readAPI from "../../../../../../Data/API/READ";

import styles from "./style.module.css";

interface ViewGroupRoleProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string,
    // creatable: boolean
}

const ViewGroupRole: React.FC<ViewGroupRoleProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    currentLang,
    // creatable
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // For Checking the Editable and Deletable Permission
    let FinalsidebarAppsListArray = JSON.parse(localStorage.getItem("sidebarAppsListArray") || '[]');

    const [creatable, setCreatable] = useState<boolean>(false);

    useEffect(() => {
        // For getting the current location path
        // eslint-disable-next-line no-restricted-globals
        const currentLocationPath = location.pathname;

        console.log("Current Location Path is: ", currentLocationPath);

        // Do it using for loop
        for (let i = 0; i < FinalsidebarAppsListArray.length; i++) {
            let subMenu = FinalsidebarAppsListArray[i].subMenu;
            for (let j = 0; j < subMenu.length; j++) {
                // alert("Current Location Path is: " + currentLocationPath + " and the subMenu[j].formUrl is: " + subMenu[j].formUrl + " and the i is: " + i + " and the Menu URL is: " + FinalsidebarAppsListArray[i].appUrl);
                if (subMenu[j].formUrl === currentLocationPath || FinalsidebarAppsListArray[i].appUrl === currentLocationPath) {
                    // alert("Equal" + FinalsidebarAppsListArray[i].appName)
                    if (subMenu[j].createPermission === true) {
                        setCreatable(true);
                        console.log("Is Creatable ===> ", creatable);
                    }
                }
            }
        }
    }, [FinalsidebarAppsListArray, creatable]);
    // For Checking the Editable and Deletable Permission

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
    const [viewAllData, setViewAllData] = useState(null);

    const [fetchUpdate, setFetchUpdate] = useState(true);

    useEffect(() => {
        console.log("View All Data ===> ", viewAllData);
    });

    useEffect(() => {

        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        console.log("Access Token in View Users ===> ", accessToken);

        if (accessToken !== null && fetchUpdate === true) {
            // Fetching data using axios and also pass the header x-api-key for auth
            axios.get(readAPI.GroupRole, {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    // console.log("View App Form Data ===> ", res.data.obj);
                    const arr = res.data.obj;

                    // Adding a new property appId in the array
                    arr.forEach((element: any) => {
                        let grpId = element.groupDetails.grpId;
                        element.grpId = grpId;
                        console.log("Group Id ===> ", grpId);
                        element.groupDetails = element.groupDetails.grpId + " : " + element.groupDetails.grpName;
                        let roleId = element.role.roleId;
                        console.log("Role Id ===> ", roleId);
                        element.roleId = roleId;
                        element.role = element.role.roleId + " : " + element.role.roleName;
                    });
                    // console.log("View App Form Data ===> ", arr);
                    setViewAllData(arr);
                })
                .catch((err) => {
                    console.log(err);
                });
            setFetchUpdate(false);
        }
    }, [fetchUpdate]);

    const tableColHeaders = [
        [
            'groupRoleId',
            'groupDetails',
            'role',
            'active',
            'grpRoleDescription',
            'createdBy',
            'creationDateAndTime',
            'updateDateAndTime',
            'updatedBy'
        ]
    ];

    return (
        <div className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`} onClick={() => {
            if ((windowSize[0] < 991) && isOpen)
                setIsOpen(false);
        }}>
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    {(t('Home.Sidebar.list.userManagement.subMenu.groupRole.details.breadcrumb.f1'))}
                    /
                    {(t('Home.Sidebar.list.userManagement.subMenu.groupRole.details.breadcrumb.f2'))}
                    /
                    <span style={{ color: "#4f747a" }}>
                        {(t('Home.Sidebar.list.userManagement.subMenu.groupRole.details.breadcrumb.f3'))}
                    </span>
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
                    <AppsIcon sx={{ marginTop: "3px", color: "#4f747a", fontSize: 27 }} />
                    <p className={styles.topContainerLeftText}>
                        {(t('Home.Sidebar.list.userManagement.subMenu.groupRole.details.title'))}
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
                            navigate("/account/group-role/addGroupRole");
                        }}
                        startIcon={<AddIcon />}
                        disabled={creatable === false ? true : false}
                    >
                        {(t('Home.Sidebar.list.userManagement.subMenu.groupRole.details.addUser'))}
                    </Button>
                </div>
            </div>
            {/* Top Container */}

            <div style={{ marginTop: 30 }}>
                <DataTableMD
                    isOpen={isOpen}
                    data={(
                        viewAllData !== null
                    ) ? (
                        // @ts-ignore
                        viewAllData
                    ) : ([])}
                    states={states}
                    ColHeader={tableColHeaders}
                    columnName={"ViewGroupRole"}
                    tableInfo={(t('Home.Sidebar.list.userManagement.subMenu.groupRole.details.table.subTitle'))}
                    buttonTitle={"Create New Group Role"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Group Role</b> <i>List</i>`}
                    currentLang={currentLang}
                    setFetchUpdate={setFetchUpdate}
                />
            </div>

            <br /> <br /> <br />
        </div>
    )
}
export default ViewGroupRole;