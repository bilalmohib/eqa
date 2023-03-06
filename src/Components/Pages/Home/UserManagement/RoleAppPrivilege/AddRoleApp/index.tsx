import * as React from 'react';
import { useState, useEffect } from "react";

// Importing Icons
import AppsIcon from '@mui/icons-material/Apps';
import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from 'react-router';
import { useTranslation } from "react-i18next";

import axios from 'axios';

import Cookies from 'js-cookie';

// Importing material ui components
import {
    Button,
    Box,
    Typography,
    Grid,
    TextField,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    Autocomplete,
    Switch,
    FormGroup
} from '@mui/material';

import SnackBar from '../../../../../SnackBar';

import styles from "./style.module.css";

interface AddRoleAppProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string
}

const AddRoleApp: React.FC<AddRoleAppProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    currentLang
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    ///////////////////////////////// Snackbar State /////////////////////////////////
    const [snackBarHandler, setSnackBarHandler] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    ///////////////////////////////// Snackbar State /////////////////////////////////

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

    // For field validation
    const [roleId, setRoleId] = useState<any>(null);
    const [appId, setAppId] = useState<any>(null);
    const [formId, setFormId] = useState<any>(null);

    // Error messages
    const [roleIdErrorMessage, setRoleIdErrorMessage] = useState("");
    const [appIdErrorMessage, setAppIdErrorMessage] = useState("");
    const [formIdErrorMessage, setFormIdErrorMessage] = useState("");

    // For field validation
    const [roleIdError, setRoleIdError] = useState(false);
    const [appIdError, setAppIdError] = useState(false);
    const [formIdError, setFormIdError] = useState(false);

    // Create Permission radio buttons
    // const [createPermission, setCreatePermission] = useState("Yes");

    // // Read Permission radio buttons
    // const [readPermission, setReadPermission] = useState("Yes");

    // // Update Permission radio buttons
    // const [updatePermission, setUpdatePermission] = useState("Yes");

    // // Delete Permission radio buttons
    // const [deletePermission, setDeletePermission] = useState("Yes");

    // Status radio buttons
    const [status, setStatus] = useState("Active");

    // FOR APP ID AUTO COMPLETE

    // For AppId autocomplete component
    const [appIdList, setAppIdList] = useState<any>([]);
    const [formIdList, setFormIdList] = useState<any>([]);
    const [roleIdList, setRoleIdList] = useState<any>([]);

    const [loadData, setLoadData] = useState(true);

    useEffect(() => {
        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        console.log("Access Token in View Users ===> ", accessToken);

        if (accessToken !== null && loadData === true) {
            // Fetching APP DETAILS
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchAppDetails", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setAppIdList(res.data.obj);
                })
                .catch((err) => {
                    console.log(err);
                });

            // Fetching FORM DETAILS
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchAppForm", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setFormIdList(res.data.obj);
                })
                .catch((err) => {
                    console.log(err);
                });

            // Fetching ROLE DETAILS
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchRoles", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setRoleIdList(res.data.obj);
                })
                .catch((err) => {
                    console.log(err);
                });

            // At the end set the load data to false
            setLoadData(false);
        }


    }, [appIdList, loadData]);

    useEffect(() => {
        if (roleId !== null && appId !== null && formId !== null) {
            console.log("Current Role Id ===> ", roleId.roleId);
            console.log("Current App Id ===> ", appId.appId);
            console.log("Current Form Id ===> ", formId.formId);
        }
    }, [appId, appIdList, formId, roleId]);


    // --------------------- AUTO COMPLETE DEFAULT PROPS ---------------------

    // @1 FOR APP ID AUTO COMPLETE
    const appIdDefaultProps = {
        options: appIdList,
        getOptionLabel: (option: any) => option.appName
    };
    // FOR APP ID AUTO COMPLETE

    // @2 FOR FORM ID AUTO COMPLETE
    const formIdDefaultProps = {
        options: formIdList,
        getOptionLabel: (option: any) => option.formName
    };

    // @3 FOR ROLE ID AUTO COMPLETE
    const roleIdDefaultProps = {
        options: roleIdList,
        getOptionLabel: (option: any) => option.roleName
    };
    // --------------------- AUTO COMPLETE DEFAULT PROPS ---------------------

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus((event.target as HTMLInputElement).value);
    };
    // Status radio buttons

    // Handling Permission Status
    const [permissionState, setPermissionState] = React.useState({
        create: true,
        read: true,
        update: true,
        delete: true,
    });

    const handleChangePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPermissionState({
            ...permissionState,
            [event.target.name]: event.target.checked,
        });
    };
    // Handling Permissions Status


    const submitForm = (e: any) => {
        e.preventDefault();

        // Get the user from local storage
        // Add validation also 
        const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
        if (userLocalStorage !== null && userLocalStorage !== undefined) {
            const loggedInUser = userLocalStorage.userName;
            console.log("Logged In UserName ===> ", loggedInUser);

            let accessToken: any = Cookies.get("accessToken");

            if (accessToken === undefined || accessToken === null) {
                accessToken = null;
            }

            if (accessToken !== null) {
                // Set the validation errors
                if (roleId === null) {
                    setRoleIdErrorMessage("* Please select any RoleId from the list.");
                    setRoleIdError(true);
                }
                if (appId === null) {
                    setAppIdErrorMessage("* Please select any AppId from the list.");
                    setAppIdError(true);
                }
                if (formId === null) {
                    setFormIdErrorMessage("* Please select any FormId from the list.");
                    setFormIdError(true);
                }
                // Set the validation errors

                if (
                    roleId !== null &&
                    appId !== null &&
                    formId !== null
                ) {
                    const formState = {
                        "roleId": (roleId !== null) ? roleId.roleId : null,
                        "appId": (appId !== null) ? appId.appId : null,
                        "formId": (formId !== null) ? formId.formId : null,
                        "loggedInUser": loggedInUser,
                        "createPermission": permissionState.create,
                        "readPermission": permissionState.read,
                        "updatePermission": permissionState.update,
                        "deletePermission": permissionState.delete,
                        "active": (status === "Active") ? true : false
                    };

                    console.log("User Form Data ===> ", formState);

                    axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/savePrivilege',
                        formState
                        , {
                            headers: {
                                'x-api-key': accessToken
                            }
                        })
                        .then(function (response) {
                            console.log("Response ===> ", response);
                            if (response.status === 200) {
                                // setSnackbarMessage(`AppRole Privilege for App : ${appId.appName} , Form : ${formId.formName} and Role : ${roleId.roleName} has been created successfully.`);
                                // setOpen(true);
                                setSnackBarHandler({
                                    open: true,
                                    message: (response.data.code === "200.200") ? `AppRole Privilege for App : ${appId.appName} , Form : ${formId.formName} and Role : ${roleId.roleName} has been created successfully.` : (response.data.message),
                                    severity: (response.data.code === "200.200") ? "success" : "error"
                                });
                                const m = response.data.message;
                                if (response.data.code === "200.200") {
                                    setTimeout(() => {
                                        navigate("/account/role-app/view");
                                    }, 2000);
                                }
                                console.log(m);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // alert("Please fill All fields");
                    // set the errors
                    setAppIdError(true);
                    setSnackBarHandler({
                        open: true,
                        message: "Please fill all the required fields.",
                        severity: "error"
                    })
                }
            } else {
                alert("Please login first");
                navigate("/login");
            }
        } else {
            alert("Please login first");
            navigate("/login");
        }
    }

    return (
        <Box
            className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`}
            onClick={() => {
                if ((windowSize[0] < 991) && isOpen)
                    setIsOpen(false);
            }}
        >
            <div
                className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}
                style={{
                    marginTop: 5,
                    flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row")
                }}
            >
                <div>
                    {(currentLang === "ar") ? (
                        <>
                            <span style={{ color: "#4f747a" }}> Add RoleApp </span> / RoleApp / Account / EQA
                        </>
                    ) : (
                        <>
                            EQA / Account / RoleApp / <span style={{ color: "#4f747a" }}> Add RoleApp </span>
                        </>
                    )}
                </div>
                <div>
                    <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                </div>
            </div>

            <hr />

            <Box sx={{
                // border: "1px solid red",
                padding:
                    // Categorize according to small, medium, large screen
                    (windowSize[0] < 991) ? (2) : (windowSize[0] < 1200) ? (3) : (4),
                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
            }}>

                <Box sx={{
                    // border: "1px solid red",
                    display: "flex",
                    marginBottom: 2,
                    alignItems: (currentLang === "ar") ? ("flex-end") : ("flex-start"),
                    flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row")
                }}>
                    <Box sx={{
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
                        width: 60,
                        height: 60,
                        borderRadius: 1.25,
                        backgroundColor: "#fffefe",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <AppsIcon
                            sx={{
                                color: "#4f747a",
                                fontSize: 35
                            }} />
                    </Box>
                    <Box sx={{ ml: 3 }}>
                        <Typography variant="h5" sx={{
                            // color: "#312a2c",
                            color: "#3c6766",
                            fontWeight: 500,
                            marginTop: (windowSize[0] < 600) ? (0) : (0.5),
                            display: "flex",
                            flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row")
                        }}>
                            Add RoleApp Privilege
                        </Typography>
                        <Typography variant="body1" sx={{
                            // color: "#4f747a" 
                            // color: "#C0C0C0"
                            color: "#696969",
                            fontWeight: 300
                        }}>
                            Add a new RoleApp Privilege to the system
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    <Grid container spacing={
                        // Categorize according to small, medium, large screen
                        (windowSize[0] < 576) ? (0) : ((windowSize[0] < 768) ? (1) : ((windowSize[0] < 992) ? (2) : (3)))
                    }>
                        {/* ROLE ID */}
                        <Grid item xs={12}>
                            <Autocomplete
                                {...roleIdDefaultProps}
                                id="roleIdAutoComplete"
                                autoHighlight
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                value={roleId}
                                onChange={(event, newValue) => {
                                    setRoleId(newValue);
                                    if (roleIdError) {
                                        setRoleIdError(false);
                                    }
                                }}
                                // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={"Select Role"}
                                        placeholder="Please select a Role from the list"
                                        variant="standard"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        helperText={(roleIdError) ? (roleIdErrorMessage) : ("")}
                                        error={roleIdError}
                                    // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                )}
                            />
                        </Grid>

                        {/* APP ID */}
                        <Grid item xs={12}>
                            <Autocomplete
                                {...appIdDefaultProps}
                                id="appIdAutoComplete"
                                autoHighlight
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                value={appId}
                                onChange={(event, newValue) => {
                                    setAppId(newValue);
                                    if (appIdError) {
                                        setAppIdError(false);
                                    }
                                }}
                                // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={"Select App"}
                                        placeholder="Please select an App from the list"
                                        variant="standard"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        helperText={(appIdError) ? (appIdErrorMessage) : ("")}
                                        error={appIdError}
                                    // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                )}
                            />
                        </Grid>

                        {/* FORM ID */}
                        <Grid item xs={12}>
                            <Autocomplete
                                {...formIdDefaultProps}
                                id="formIdAutoComplete"
                                autoHighlight
                                value={formId}
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                onChange={(event, newValue) => {
                                    setFormId(newValue);
                                    if (formIdError) {
                                        setFormIdError(false);
                                    }
                                }}
                                // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={"Select Form"}
                                        placeholder="Please select a Form from the list"
                                        variant="standard"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        helperText={(formIdError) ? (formIdErrorMessage) : ("")}
                                        error={formIdError}
                                    // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Permisson Status List : Create, Read, Update, Delete */}
                        <Grid item xs={12}>
                            <FormControl
                                component="fieldset"
                                variant="standard"
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                sx={{
                                    width: "100%"
                                }}
                            >
                                <FormLabel
                                    component="legend"
                                    sx={{
                                        fontSize: {
                                            xs: 20, // theme.breakpoints.up('xs')
                                            sm: 20, // theme.breakpoints.up('sm')
                                            md: 22, // theme.breakpoints.up('md')
                                            lg: 22, // theme.breakpoints.up('lg')
                                            xl: 22, // theme.breakpoints.up('xl')
                                        },
                                        marginTop: 2
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                >
                                    Permission Status
                                </FormLabel>
                                <FormGroup
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={permissionState.create}
                                                onChange={handleChangePermission}
                                                name="create"
                                                sx={{
                                                    color: "#4f747a",
                                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                                        color: "#3c6766"
                                                    },
                                                    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                                                        backgroundColor: '#4f747a'
                                                    }
                                                }}
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />
                                        }
                                        label="Create"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={permissionState.read}
                                                onChange={handleChangePermission}
                                                name="read"
                                                sx={{
                                                    color: "#4f747a",
                                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                                        color: "#3c6766"
                                                    },
                                                    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                                                        backgroundColor: '#4f747a'
                                                    }
                                                }}
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />
                                        }
                                        label="Read"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={permissionState.update}
                                                onChange={handleChangePermission}
                                                name="update"
                                                sx={{
                                                    color: "#4f747a",
                                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                                        color: "#3c6766"
                                                    },
                                                    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                                                        backgroundColor: '#4f747a'
                                                    }
                                                }}
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />
                                        }
                                        label="Update"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={permissionState.delete}
                                                onChange={handleChangePermission}
                                                name="delete"
                                                sx={{
                                                    color: "#4f747a",
                                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                                        color: "#3c6766"
                                                    },
                                                    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                                                        backgroundColor: '#4f747a'
                                                    }
                                                }}
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />
                                        }
                                        label="Delete"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        {/* Permisson Status List : Create, Read, Update, Delete */}

                        {/* Status */}
                        <Grid item xs={12}>
                            <FormControl
                                sx={{
                                    width: "100%"
                                }}
                            >
                                <FormLabel
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    id="statusAppButtonsLabel"
                                    sx={{
                                        fontSize: {
                                            xs: 20, // theme.breakpoints.up('xs')
                                            sm: 20, // theme.breakpoints.up('sm')
                                            md: 22, // theme.breakpoints.up('md')
                                            lg: 22, // theme.breakpoints.up('lg')
                                            xl: 22, // theme.breakpoints.up('xl')
                                        },
                                        marginTop: 0
                                    }}
                                >
                                    Status
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="statusAppButtonsLabel"
                                    name="statusAppButtons"
                                    // Add spacing between radio buttons
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 10,
                                        },
                                        mt: 1
                                    }}
                                    value={status}
                                    onChange={handleChangeStatus}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                >
                                    <FormControlLabel
                                        value="Active"
                                        control={<Radio
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />}
                                        label="Active"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                    <FormControlLabel
                                        value="DeActive"
                                        control={<Radio
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />}
                                        label="Deactive"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: (currentLang === "ar") ? ('row-reverse') : ('row')
                }}
                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
            >
                <Button
                    dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                    variant="contained"
                    sx={{
                        backgroundColor: "#e79f43",
                        // textTransform: "none",
                        fontWeight: "bold",
                        height: 40,
                        mt:
                        // Give margins based on screen size
                        {
                            xs: 3, // theme.breakpoints.up('xs')
                            sm: 2, // theme.breakpoints.up('sm')
                            md: 2, // theme.breakpoints.up('md')
                            lg: 3, // theme.breakpoints.up('lg')
                            xl: 3, // theme.breakpoints.up('xl')
                        },
                        display: "flex",
                        // justifyContent: (currentLang === "ar") ? ('flex-start') : ('center'),
                        // alignItems:(currentLang === "ar") ? ('flex-end') : ('center'),
                        "&:hover": {
                            backgroundColor: "#e79f43",
                        },
                        // border:"1px solid red"
                    }}
                    // Give full width if screen size if less than 600px otherwise give auto width
                    fullWidth={(
                        windowSize[0] < 600
                    ) ? true : false}
                    // onClick={() => {
                    //     navigate("/");
                    // }}
                    startIcon={
                        (currentLang === "ar") ? (
                            null
                        ) : (
                            <SendIcon />
                        )
                    }
                    endIcon={
                        (currentLang === "ar") ? (
                            <SendIcon />
                        ) : (
                            null
                        )
                    }
                    onClick={submitForm}
                >
                    <Typography
                        style={{ display: "block" }}
                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                    >
                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.submit')}
                    </Typography>
                </Button>
            </Box>

            <SnackBar
                isOpen={snackBarHandler.open}
                message={snackBarHandler.message}
                severity={snackBarHandler.severity}
                setIsOpen={
                    // Only pass the setIsOpen function to the SnackBar component
                    // and not the whole state object
                    (isOpen: boolean) => setSnackBarHandler({ ...snackBarHandler, open: isOpen })
                }
            />

            <br /><br /> <br />
        </Box>
    )
}
export default AddRoleApp;