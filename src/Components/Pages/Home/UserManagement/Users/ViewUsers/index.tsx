import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { FaUserAlt } from "react-icons/fa";

import axios from "axios";

// Importing components
import DataTableMD from "../../../../../DataTableMD";

import AddIcon from '@mui/icons-material/Add';
// Importing material ui components
import Button from '@mui/material/Button';

// @@@@@@@@@@@@@@ IMPORTING COURSE OFFERING TABLE DATA @@@@@@@@@@@@@@@@@
// Importing the course offering table data
import { states } from '../../../../../../Data/Tables/CourseOfferings';

import { useTranslation } from "react-i18next";

import Cookies from "js-cookie";

// importing urls
import readAPI from "../../../../../../Data/API/READ";

import styles from "./style.module.css";

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string,
    // creatable: boolean,
}

const ViewUsers: React.FC<UserProps> = ({
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
            axios.get(readAPI.Users, {
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
            'userId',
            'firstName',
            'lastName',
            'userName',
            'emailId',
            'createdBy',
            'creationDateAndTime',
            'updatedBy',
            'updateDateAndTime',
            'password',
            'collegeId',
            'campusId',
            'departmentId',
            'emailStatus',
            'staff',
            'superUser',
            'active'
        ]
    ];

    return (
        <div
            className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`}
            onClick={() => {
                if ((windowSize[0] < 991) && isOpen)
                    setIsOpen(false);
            }}
        >
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    {(t('Home.Sidebar.list.userManagement.subMenu.Users.details.breadcrumb.f1'))} / {(t('Home.Sidebar.list.userManagement.subMenu.Users.details.breadcrumb.f2'))} /<span style={{ color: "#4f747a" }}> {(t('Home.Sidebar.list.userManagement.subMenu.Users.details.breadcrumb.f3'))} </span>
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
                    <p className={styles.topContainerLeftText}>
                        <b>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.title'))} </b>
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
                            navigate("/account/users/adduser");
                        }}
                        disabled={!creatable}
                        startIcon={<AddIcon />}
                    >
                        {(t('Home.Sidebar.list.userManagement.subMenu.Users.details.addUser'))}
                    </Button>
                </div>
            </div>
            {/* Top Container */}

            {/* Box Container */}
            <div className={`container-fluid ${styles.containerBoxes}`}>
                <div className="row gx-4" style={(windowSize[0] > 767) ? (styleFirstRowCB) : (styleForResponsiveFirstRowCB)}>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#488A99" }}>
                            <div className={styles.countICB}>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.boards.activeUsers.number'))}</div>
                            <p className={styles.infoICB}>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.boards.activeUsers.title'))}</p>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#1C4E80" }}>
                            <div className={styles.countICB}>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.boards.inActiveUsers.number'))}</div>
                            <p className={styles.infoICB}>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.boards.inActiveUsers.title'))}</p>
                        </div>
                    </div>
                    <div className={`col-md-4`}>
                        <div className={styles.insideContainerBox} style={{ backgroundColor: "#DBAE58" }}>
                            <div className={styles.countICB}>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.boards.totalUsers.number'))}</div>
                            <p className={styles.infoICB}>{(t('Home.Sidebar.list.userManagement.subMenu.Users.details.boards.totalUsers.title'))}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Box Container */}

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
                    columnName={"ViewUsers"}
                    tableInfo={(t('Home.Sidebar.list.userManagement.subMenu.Users.details.table.subTitle'))}
                    buttonTitle={"Create New User"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Users</b> <i>List</i>`}
                    currentLang={currentLang}
                    setFetchUpdate={setFetchUpdate}
                />
            </div>
            <br /><br />
            <br />
        </div>
    )
}
export default ViewUsers;