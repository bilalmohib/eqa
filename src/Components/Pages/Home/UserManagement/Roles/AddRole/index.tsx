import * as React from 'react';
import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

// Importing Icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SendIcon from '@mui/icons-material/Send';

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
    Radio
} from '@mui/material';
import SnackBar from '../../../../../SnackBar';

import { useTranslation } from "react-i18next";

import Cookies from 'js-cookie';

import axios from 'axios';

import styles from "./style.module.css";

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string
}

const AddRole: React.FC<UserProps> = ({
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

    /// Handling the data of the form
    // For field validation
    const [roleName, setRoleName] = useState<string>("");
    const [roleDescription, setRoleDescription] = useState<string>("");

    // Error messages
    const [roleNameErrorMessage, setRoleNameErrorMessage] = useState<string>("");
    const [roleDescriptionErrorMessage, setRoleDescriptionErrorMessage] = useState<string>("");

    // For field validation
    const [roleNameError, setRoleNameError] = useState<boolean>(false);
    const [roleDescriptionError, setRoleDescriptionError] = useState<boolean>(false);

    // Status radio buttons
    const [status, setStatus] = useState("Active");

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus((event.target as HTMLInputElement).value);
    };
    // Status radio buttons

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
                if (roleName === "") {
                    setRoleNameErrorMessage("Role Name is required");
                    setRoleNameError(true);
                }
                if (roleDescription === "") {
                    setRoleDescriptionErrorMessage("Role Description is required");
                    setRoleDescriptionError(true);
                }
                // Set the validation errors

                if (
                    roleName !== "" &&
                    roleDescription !== ""
                ) {
                    const formState = {
                        "roleId": "OR05",
                        "roleName": roleName,
                        "roleDescription": roleDescription,
                        "loggedInUser": loggedInUser,
                        "active": (status === "Active") ? true : false
                    };

                    console.log("User Form Data ===> ", formState);

                    axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createRole',
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
                                    severity: (response.data.code === "200.200") ? "success" : "error",
                                    message: (response.data.code === "200.200") ? `Role ${roleName} has been created successfully` : (response.data.message),
                                    open: true
                                })
                                const m = response.data.message;
                                if (response.data.code === "200.200") {
                                    setTimeout(() => {
                                        navigate("/account/roles/view");
                                    }, 3000);
                                }
                                console.log(m);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // set the errors
                    setRoleNameError(true);
                    setRoleDescriptionError(true);
                    setSnackBarHandler({
                        open: true,
                        message: "Please fill all the required fields",
                        severity: 'error'
                    });
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
    /// Handling the data of the form

    return (
        <Box
            className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`}
            onClick={() => {
                if ((windowSize[0] < 991) && isOpen)
                    setIsOpen(false);
            }}
        >
            <div style={{ marginTop: 5, flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row") }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    {(currentLang === "ar") ? (
                        <>
                            <span style={{ color: "#4f747a" }}> Add Role </span> / Roles / Account / EQA
                        </>
                    ) : (
                        <>
                            EQA / Account / Roles / <span style={{ color: "#4f747a" }}> Add Role </span>
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
                        // border: "1px solid black",
                        // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
                        // boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
                        width: 60,
                        height: 60,
                        borderRadius: 1.25,
                        backgroundColor: "#fffefe",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <PeopleOutlineIcon
                            sx={{
                                color: "#4f747a",
                                fontSize: 35,
                                // boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;", 
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
                            Add Role
                        </Typography>
                        <Typography variant="body1" sx={{
                            // color: "#4f747a" 
                            // color: "#C0C0C0"
                            color: "#696969",
                            fontWeight: 300
                        }}>
                            Add a new role to the system
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    <Grid container spacing={
                        // Categorize according to small, medium, large screen
                        (windowSize[0] < 576) ? (0) : ((windowSize[0] < 768) ? (1) : ((windowSize[0] < 992) ? (2) : (3)))
                    }>
                        <Grid item xs={12}>
                            <TextField
                                id="roleNameTextField"
                                label="Role Name"
                                placeholder="Enter role name"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                value={roleName}
                                onChange={(e) => {
                                    setRoleName(e.target.value);
                                    if (roleNameError) {
                                        setRoleNameError(false);
                                    }
                                }}
                                error={roleNameError}
                                helperText={roleNameError ? roleNameErrorMessage : ""}
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="roleDescriptionTextField"
                                label="Description"
                                placeholder="Enter role description"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                value={roleDescription}
                                onChange={(e) => {
                                    setRoleDescription(e.target.value);
                                    if (roleDescriptionError) {
                                        setRoleDescriptionError(false);
                                    }
                                }}
                                error={roleDescriptionError}
                                helperText={roleDescriptionError ? roleDescriptionErrorMessage : ""}
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
                            <FormControl
                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                sx={{
                                    width: "100%"
                                }}
                            >
                                <FormLabel
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    id="demo-row-radio-buttons-group-label"
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
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
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

            <br /><br />
        </Box>
    )
}
export default AddRole;