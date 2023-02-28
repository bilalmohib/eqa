import * as React from 'react';
import { useState, useEffect } from "react";

// Importing Icons
import AppsIcon from '@mui/icons-material/Apps';
import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from 'react-router';

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
    Autocomplete
} from '@mui/material';
import SnackBar from '../../../../../SnackBar';

import styles from "./style.module.css";

interface AddUserGroupProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const AddUserGroup: React.FC<AddUserGroupProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {
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
    const [createPermission, setCreatePermission] = useState("Yes");

    // Read Permission radio buttons
    const [readPermission, setReadPermission] = useState("Yes");

    // Update Permission radio buttons
    const [updatePermission, setUpdatePermission] = useState("Yes");

    // Delete Permission radio buttons
    const [deletePermission, setDeletePermission] = useState("Yes");

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

    // Handling Permissions
    const handleChangeCreatePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreatePermission((event.target as HTMLInputElement).value);
    };

    const handleChangeReadPermission = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReadPermission((event.target as HTMLInputElement).value);
    };

    const handleChangeUpdatePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatePermission((event.target as HTMLInputElement).value);
    };

    const handleChangeDeletePermission = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeletePermission((event.target as HTMLInputElement).value);
    };
    // Handling Permissions


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
                        "createPermission": (createPermission === "Yes") ? true : false,
                        "readPermission": (readPermission === "Yes") ? true : false,
                        "updatePermission": (updatePermission === "Yes") ? true : false,
                        "deletePermission": (deletePermission === "Yes") ? true : false,
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
                                setSnackBarHandler({
                                    ...snackBarHandler,
                                    message: `AppRole Privilege for App : ${appId.appName} , Form : ${formId.formName} and Role : ${roleId.roleName} has been created successfully.`,
                                    open: true
                                })
                                const m = response.data.message;
                                setTimeout(() => {
                                    navigate("/account/role-app/view");
                                }, 2000);
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
                        message: `Please fill out all the fields.`,
                        open: true,
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
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    EQA / Account / UserGroup / <span style={{ color: "#4f747a" }}> Add UserGroup </span>
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
                        }}>
                            Add UserGroup
                        </Typography>
                        <Typography variant="body1" sx={{
                            // color: "#4f747a" 
                            // color: "#C0C0C0"
                            color: "#696969",
                            fontWeight: 300
                        }}>
                            Add a new UserGroup to the system
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
                                        helperText={(formIdError) ? (formIdErrorMessage) : ("")}
                                        error={formIdError}
                                    // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                )}
                            />
                        </Grid>

                        {/* Create Permision Status */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel
                                    id="createPermissionStatusLabel"
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
                                    Create Permission
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="createPermissionStatusLabel"
                                    name="createPermissionStatusLabel"
                                    // Add spacing between radio buttons
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 10,
                                        },
                                        mt: 1
                                    }}
                                    value={createPermission}
                                    onChange={handleChangeCreatePermission}
                                >
                                    <FormControlLabel
                                        value="Yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="No"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Read Permision Status */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel
                                    id="readPermissionStatusLabel"
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
                                    Read Permission
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="readPermissionStatusLabel"
                                    name="readPermissionStatusLabel"
                                    // Add spacing between radio buttons
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 10,
                                        },
                                        mt: 1
                                    }}
                                    value={readPermission}
                                    onChange={handleChangeReadPermission}
                                >
                                    <FormControlLabel
                                        value="Yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="No"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Update Permision Status */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel
                                    id="updatePermissionStatusLabel"
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
                                    Update Permission
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="updatePermissionStatusLabel"
                                    name="updatePermissionStatusLabel"
                                    // Add spacing between radio buttons
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 10,
                                        },
                                        mt: 1
                                    }}
                                    value={updatePermission}
                                    onChange={handleChangeUpdatePermission}
                                >
                                    <FormControlLabel
                                        value="Yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="No"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Delete Permision Status */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel
                                    id="updatePermissionStatusLabel"
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
                                    Delete Permission
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="deletePermissionStatusLabel"
                                    name="deletePermissionStatusLabel"
                                    // Add spacing between radio buttons
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 10,
                                        },
                                        mt: 1
                                    }}
                                    value={deletePermission}
                                    onChange={handleChangeDeletePermission}
                                >
                                    <FormControlLabel
                                        value="Yes"
                                        control={<Radio />}
                                        label="Yes"
                                    />
                                    <FormControlLabel
                                        value="No"
                                        control={<Radio />}
                                        label="No"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        {/* Status */}
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel
                                    id="demo-row-radio-buttons-app-label"
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
                                    aria-labelledby="demo-row-radio-buttons-app-label"
                                    name="row-radio-buttons-app"
                                    // Add spacing between radio buttons
                                    sx={{
                                        '& .MuiFormControlLabel-root': {
                                            marginRight: 10,
                                        },
                                        mt: 1
                                    }}
                                    value={status}
                                    onChange={handleChangeStatus}
                                >
                                    <FormControlLabel
                                        value="Active"
                                        control={<Radio />}
                                        label="Active"
                                    />
                                    <FormControlLabel
                                        value="DeActive"
                                        control={<Radio />}
                                        label="Deactive"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Button
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
                    justifyContent: "center",
                    "&:hover": {
                        backgroundColor: "#e79f43",
                    }
                }}
                // Give full width if screen size if less than 600px otherwise give auto width
                fullWidth={(
                    windowSize[0] < 600
                ) ? true : false}
                startIcon={<SendIcon style={{ display: "block" }} />}
                onClick={submitForm}
            >
                <Typography style={{ display: "block" }}>Submit</Typography>
            </Button>

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
export default AddUserGroup;