import { useState, useEffect } from "react";

import { IoSpeedometerOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import Ripples from 'react-ripples'

// Importing i18 for language
import i18n from "../../../../../i18n";

import { useTranslation } from 'react-i18next';

import styles from "./style.module.css";
// import "./style.css";

const percentage = 30;

interface GroupsProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,

    // For Current Language
    currentLang: string,
    setCurrentLang: any
}

const Groups: React.FC<GroupsProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,

    // For Current Language
    currentLang,
    setCurrentLang
}) => {
    const { t } = useTranslation();

    const currentFormatedDate: string = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // For checkbox
    const settings = [
        {
            id: 1,
            title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.Meeting.title'),
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    id: 1,
                    title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.Meeting.s1.title'),
                    description: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.Meeting.s1.subTitle'),
                    checked: false,
                    icon: <IoSpeedometerOutline size={30} />,
                },
                {
                    id: 2,
                    title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.Meeting.s2.title'),
                    description: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.Meeting.s2.subTitle'),
                    checked: false,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
        {
            id: 2,
            title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.MinuteofMeeting.title'),
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    id: 1,
                    title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.MinuteofMeeting.s1.title'),
                    description: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.MinuteofMeeting.s1.subTitle'),
                    checked: false,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
        {
            id: 3,
            title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.TaskManagement.title'),
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    id: 1,
                    title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.TaskManagement.s1.title'),
                    description: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.TaskManagement.s1.subTitle'),
                    checked: false,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
        {
            id: 4,
            title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.CommitteeManagement.title'),
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    id: 1,
                    title: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.TaskManagement.s1.title'),
                    description: t('Home.Sidebar.list.settings.subMenu.general.details.Settings.TaskManagement.s1.subTitle'),
                    checked: false,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        }
    ];

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

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FOR CHECKBOX STATE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const [settingsState, setSettingsState] = useState(settings);

    const handleChange = (checked: boolean, parentId: number, childId: number) => {
        // Update the settings in the dom as well as the settings array
        const newSettings = settingsState.map((setting) => {
            if (setting.id === parentId) {
                setting.settingsItems.map((item) => {
                    if (item.id === childId) {
                        item.checked = checked;
                    }
                });
            }
            return setting;
        });

        // Update the state with the new settings
        setSettingsState(newSettings);

        // Store the updated settings in local storage
        localStorage.setItem("settings", JSON.stringify(newSettings));
    };

    useEffect(() => {
        // Re-render the component whenever the language changes
        // setSettingsState(settings);

        const storedSettings = localStorage.getItem("settings");
        if (storedSettings) {
            setSettingsState(JSON.parse(storedSettings));
        }
        else {
            setSettingsState(settings);
        }
    },
    [
        i18n.language
    ] 
    );

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FOR CHECKBOX STATE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


    return (
        <div className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`}
            onClick={() => {
                if ((windowSize[0] < 991) && isOpen)
                    setIsOpen(false);
            }}>
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    {t('Home.Sidebar.list.settings.subMenu.general.details.breadcrumb.f1')} / {t('Home.Sidebar.list.settings.subMenu.general.details.breadcrumb.f2')} / <span style={{ color: "#4f747a" }}> {t('Home.Sidebar.list.settings.subMenu.general.details.breadcrumb.f3')} </span>
                </div>
                <div>
                    <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                </div>
            </div>

            <hr />

            <h2 style={{ color: "#4f747a" }}>{t('Home.Sidebar.list.settings.subMenu.general.details.Settings.title')}</h2>

            <Stack sx={{ mt: 3 }}
                direction="row"
                spacing={2}
                dir={(currentLang === "ar" ? "rtl" : "ltr")}
            >
                <Button
                    variant="contained"
                    dir={(currentLang === "ar" ? "rtl" : "ltr")}
                    size="large"
                    sx={{
                        backgroundColor: "#e79f43",
                        // textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#e79f43",
                        }
                    }}
                    onClick={() => {
                        // navigate("/usermanagement/users/adduser");
                    }}
                    endIcon={<SaveIcon />}
                    className={styles.saveBtn}
                >
                    {t('Home.Sidebar.list.settings.subMenu.general.details.Settings.topButtons.btn1')}
                </Button>

                <Button
                    variant="outlined"
                    dir={(currentLang === "ar" ? "rtl" : "ltr")}
                    size="large"
                    sx={{
                        // textTransform: "none",
                        // marginRight: 2,
                    }}
                    endIcon={<DeleteIcon />}
                    color="error"
                >
                    {t('Home.Sidebar.list.settings.subMenu.general.details.Settings.topButtons.btn2')}
                </Button>
            </Stack>

            <section>
                {/* Rendering settings items using map */}
                {
                    settingsState.map((setting: any, index: number) => {
                        return (
                            <Box
                                dir={(currentLang === "ar" ? "rtl" : "ltr")}
                                key={index}
                                sx={{
                                    mt: 5, border: 1, borderColor: "#e8ebef", borderTopLeftRadius: 4,
                                    borderTopRightRadius: 4
                                }}
                            >
                                <Typography
                                    // dir="rtl"
                                    variant="h4"
                                    component="div"
                                    sx={{
                                        fontSize: {
                                            xs: 22, // theme.breakpoints.up('xs')
                                            sm: 23, // theme.breakpoints.up('sm')
                                            md: 24, // theme.breakpoints.up('md')
                                            lg: 26, // theme.breakpoints.up('lg')
                                            xl: 26, // theme.breakpoints.up('xl')
                                        },
                                        color: '#fff',
                                        padding: 0.5,
                                        borderTopLeftRadius: 4,
                                        borderTopRightRadius: 4,
                                        paddingLeft: 3,
                                        textAlign: "left",
                                        backgroundColor: "#4f7679",
                                        cursor: "default",
                                        transition: "all 0.3s ease 0s;",
                                        boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;",
                                        "&:hover": {
                                            // color: "#e9a037",
                                            backgroundColor: "#4f7679",
                                            boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;",
                                            transition: "all 0.3s ease 0s;"
                                        },
                                    }}
                                >
                                    {setting.title}
                                </Typography>

                                {/* Please render the settings subItems using map */}
                                {
                                    setting.settingsItems.map((settingsItem: any, index: number) => {
                                        return (
                                            <Box
                                                dir={(currentLang === "ar" ? "rtl" : "ltr")}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: (currentLang === "ar" ? "row-reverse" : "row"),
                                                    alignItems: (currentLang === "ar" ? "flex-start" : "flex-start"),
                                                    mt: 3
                                                }}
                                                key={index}
                                            >
                                                <Box
                                                    dir={(currentLang === "ar" ? "rtl" : "ltr")}
                                                    sx={{
                                                        paddingLeft: (currentLang === "ar") ? ("1%") : ("1%"),
                                                        paddingRight: (currentLang === "ar") ? ("1%") : ("1%"),
                                                        mt: 1,
                                                    }}
                                                >
                                                    <Checkbox
                                                        checked={settingsItem.checked}
                                                        onChange={
                                                            (e: any) => handleChange(
                                                                e.target.checked,
                                                                setting.id,
                                                                settingsItem.id
                                                            )
                                                        }
                                                        color="success"
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 25,
                                                                color: "#6bb6b5",
                                                            },
                                                            /// CHECKBOX COLOR
                                                            '& .Mui-checked': {
                                                                color: "#6bb6b5",
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                                <Box
                                                    sx={{
                                                        borderLeft: "1px solid rgba(9, 30, 66, 0.25)",
                                                        paddingLeft: "2%"
                                                    }}
                                                    dir={(currentLang === "ar" ? "rtl" : "ltr")}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        component="div"
                                                        sx={{
                                                            fontSize: {
                                                                xs: 20, // theme.breakpoints.up('xs')
                                                                sm: 20, // theme.breakpoints.up('sm')
                                                                md: 22, // theme.breakpoints.up('md')
                                                                lg: 22, // theme.breakpoints.up('lg')
                                                                xl: 22, // theme.breakpoints.up('xl')
                                                            },
                                                            textAlign: "left",
                                                            marginTop: 1
                                                        }}
                                                        className="text-dark"
                                                        role={"button"}
                                                    // onClick={
                                                    //     () => {
                                                    //         handleChange();
                                                    //     }
                                                    // }
                                                    >
                                                        {settingsItem.title}
                                                    </Typography>
                                                    <p style={{
                                                        color: "#b5b5b5",
                                                        textAlign: (currentLang === "ar") ? ("right") : ("left"),
                                                    }}>
                                                        {settingsItem.description}
                                                    </p>
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }
                                <br />
                            </Box>
                        )
                    })
                }
            </section>
            {/* Rendering settings items using map */}
            <br />
            <br />
            <br />
            <br />
        </div >
    )
}
export default Groups;