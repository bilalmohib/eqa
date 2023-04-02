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

interface AppsProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string,
    // creatable: boolean
}

const ViewApps: React.FC<AppsProps> = ({
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
            axios.get(readAPI.Apps, {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setViewAllData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
            setFetchUpdate(false);
        }
    }, [fetchUpdate]);

    const tableColHeaders = [
        [
            'appId',
            'appName',
            'appDescription',
            'active',
            'appUrl',
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
                    {(t('Home.Sidebar.list.userManagement.subMenu.apps.details.breadcrumb.f1'))}
                    /
                    {(t('Home.Sidebar.list.userManagement.subMenu.apps.details.breadcrumb.f2'))}
                    /
                    <span style={{ color: "#4f747a" }}>
                        {(t('Home.Sidebar.list.userManagement.subMenu.apps.details.breadcrumb.f3'))}
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
                    <AppsIcon sx={{ marginTop: "3px",color:"#4f747a",fontSize:27 }} />
                    <p className={styles.topContainerLeftText}>
                        {(t('Home.Sidebar.list.userManagement.subMenu.apps.details.title'))}
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
                            navigate("/account/apps/addapp");
                        }}
                        startIcon={<AddIcon />}
                        disabled={!creatable}
                    >
                        {(t('Home.Sidebar.list.userManagement.subMenu.apps.details.addUser'))}
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
                        viewAllData.obj
                    ) : ([])}
                    states={states}
                    columnName={"ViewApps"}
                    tableInfo={(t('Home.Sidebar.list.userManagement.subMenu.apps.details.table.subTitle'))}
                    buttonTitle={"Create New App"}
                    tableTitle={`<b style={{ fontWeight: "bold" }}>Apps</b> <i>List</i>`}
                    currentLang={currentLang}
                    setFetchUpdate={setFetchUpdate}
                />
            </div>

            <br /> <br /> <br />
        </div>
    )
}
export default ViewApps;