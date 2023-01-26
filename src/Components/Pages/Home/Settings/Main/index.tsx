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

const Groups: React.FC<GroupsProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {

    const currentFormatedDate: string = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // For checkbox
    const [checked, setChecked] = useState(false);

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

    const handleChange = (event: any) => {
        setChecked(event.target.checked);
    };

    const settings = [
        {
            title: "Meeting",
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                },
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
        {
            title: "Meeting",
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                },
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
        {
            title: "Meeting",
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                },
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
        {
            title: "Meeting",
            icon: <IoSpeedometerOutline size={30} />,
            settingsItems: [
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                },
                {
                    title: "Enable Email Notifications",
                    description: "Receive email notifications when a new meeting is scheduled",
                    checked: true,
                    icon: <IoSpeedometerOutline size={30} />,
                }
            ]
        },
    ]

    return (
        <div className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`} onClick={() => {
            if (windowSize[0] < 991)
                setIsOpen(!isOpen)
        }}>
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    EQA / Settings /<span style={{ color: "#4f747a" }}> General </span>
                </div>
                <div>
                    <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                </div>
            </div>

            <hr />

            <h2 style={{ color: "#e9a037" }}>Settings</h2>

            <Stack sx={{ mt: 3 }}
                direction="row"
                spacing={2}
            >
                <Button variant="contained"
                    color="success"
                    size="large"
                    sx={{
                        // textTransform: "none",
                    }}
                    endIcon={<SaveIcon />}
                >
                    Save
                </Button>

                <Button variant="outlined" size="large" sx={{
                    // textTransform: "none",
                }}
                    endIcon={<DeleteIcon />}
                    color="error"
                >Discard</Button>
            </Stack>


            {/* <Typography
                    variant="h4"
                    component="div"
                    sx={{
                        color: '#fff',
                        padding: 0.5,
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                        textAlign: "center",
                        backgroundColor: "#4f7679",
                        cursor: "default",
                        transition: "all 0.3s ease 0s;",
                        boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;",
                        "&:hover": {
                            color: "#e9a037",
                            backgroundColor: "#4f7679",
                            boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;",
                            transition: "all 0.3s ease 0s;"
                        },
                    }}
                >
                    Meeting
                </Typography>

                <Box sx={{ display: "flex", mt: 3 }}>
                    <Box sx={{ paddingLeft: "2%", paddingRight: "1%" }}>
                        <Checkbox
                            defaultChecked
                            checked={checked}
                            onChange={handleChange}
                            color="success"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                        />
                    </Box>
                    <Box sx={{ borderLeft: "1px solid rgba(9, 30, 66, 0.25)", paddingLeft: "2%" }}>
                        <h3 style={{ marginTop: 5 }} className="text-dark" role={"button"} onClick={() => setChecked(!checked)}>Enable Email Notificatons</h3>
                        <p style={{ color: "#b5b5b5" }}>;lskdajf;lkjdsaf;lkjdsaf;lkjdsaf;ljdsafk;ljdsaf</p>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 3 }}>
                    <Box sx={{ paddingLeft: "2%", paddingRight: "1%" }}>
                        <Checkbox
                            defaultChecked
                            checked={checked}
                            onChange={handleChange}
                            color="success"
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                        />
                    </Box>
                    <Box sx={{ borderLeft: "1px solid rgba(9, 30, 66, 0.25)", paddingLeft: "2%" }}>
                        <h3 style={{ marginTop: 5 }} className="text-dark" role={"button"} onClick={() => setChecked(!checked)}>sadfjkdsafl;j d;saklfj ;lkdsafj ;lkadsfj</h3>
                        <p style={{ color: "#b5b5b5" }}>;lskdajf;lkjdsaf;lkjdsaf;lkjdsaf;ljdsafk;ljdsaf</p>
                    </Box>
                </Box>
                <br /> */}

            {/* Please render it using map */}
            {
                settings.map((setting: any, index: number) => {
                    return (
                        <Box
                            key={index}
                            sx={{ mt: 5, borderTopLeftRadius: 50, borderTopRightRadius: 50, border: 1, borderColor: "#e8ebef" }}
                        >
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    color: '#fff',
                                    padding: 0.5,
                                    borderTopLeftRadius: 50,
                                    borderTopRightRadius: 50,
                                    textAlign: "center",
                                    backgroundColor: "#4f7679",
                                    cursor: "default",
                                    transition: "all 0.3s ease 0s;",
                                    boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;",
                                    "&:hover": {
                                        color: "#e9a037",
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
                                        <Box sx={{ display: "flex", mt: 3 }} key={index}>
                                            <Box sx={{ paddingLeft: "2%", paddingRight: "1%" }}>
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    color="success"
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                                                />
                                            </Box>
                                            <Box sx={{ borderLeft: "1px solid rgba(9, 30, 66, 0.25)", paddingLeft: "2%" }}>
                                                <h3 style={{ marginTop: 5 }} className="text-dark" role={"button"} onClick={() => setChecked(!checked)}>{settingsItem.title}</h3>
                                                <p style={{ color: "#b5b5b5" }}>{settingsItem.description}</p>
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
            <br />
            <br />
        </div>
    )
}
export default Groups;