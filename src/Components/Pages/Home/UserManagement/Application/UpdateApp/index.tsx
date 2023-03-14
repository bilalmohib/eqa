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
    Radio
} from '@mui/material';
import SnackBar from '../../../../../SnackBar';

import styles from "./style.module.css";

interface UpdateProps {
    currentLang: string
    originalValues: any,
    url: string,
    setOpenUpdateTableModal: any
}

interface UpdateRef {
    // Define any functions that you want to expose to the parent component
    submitForm: any
}

const UpdateApp = React.forwardRef<UpdateRef, UpdateProps>(
    ({
        currentLang,
        originalValues,
        url,
        setOpenUpdateTableModal
    },
        ref
    ) => {
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
        const [appName, setAppName] = useState("");
        const [appDescription, setAppDescription] = useState("");
        const [appUrl, setAppUrl] = useState("");
        const [appOrder, setAppOrder] = useState("");

        // Error messages
        const [appNameErrorMessage, setAppNameErrorMessage] = useState("");
        const [appDescriptionErrorMessage, setAppDescriptionErrorMessage] = useState("");
        const [appUrlErrorMessage, setAppUrlErrorMessage] = useState("");
        const [appOrderErrorMessage, setAppOrderErrorMessage] = useState("");

        // For field validation
        const [appNameError, setAppNameError] = useState(false);
        const [appDescriptionError, setAppDescriptionError] = useState(false);
        const [appUrlError, setAppUrlError] = useState(false);
        const [appOrderError, setAppOrderError] = useState(false);

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
                    if (appName === "") {
                        setAppNameErrorMessage("App Name is required");
                        setAppNameError(true);
                    }
                    if (appDescription === "") {
                        setAppDescriptionErrorMessage("App Description is required");
                        setAppDescriptionError(true);
                    }
                    if (appUrl === "") {
                        setAppUrlErrorMessage("App URL is required");
                        setAppUrlError(true);
                    }
                    if (appOrder === "") {
                        setAppOrderErrorMessage("App Order is required");
                        setAppOrderError(true);
                    }
                    // Set the validation errors

                    if (
                        appName !== "" &&
                        appDescription !== "" &&
                        appUrl !== "" &&
                        appOrder !== ""
                    ) {
                        const formState = {
                            "appName": appName,
                            "appDescription": appDescription,
                            "appUrl": appUrl,
                            "appOrder": appOrder,
                            "loggedInUser": loggedInUser,
                            "active": (status === "Active") ? true : false
                        };

                        console.log("User Form Data ===> ", formState);

                        axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveAppDetails',
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
                                        open: true,
                                        message: (response.data.code === "200.200") ? `App ${appName} has been created successfully` : response.data.message
                                    });
                                    const m = response.data.message;
                                    if (response.data.code === "200.200") {
                                        setTimeout(() => {
                                            navigate("/account/apps/view");
                                        }, 3000);
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
                        setAppNameError(true);
                        setAppDescriptionError(true);
                        setAppUrlError(true);
                        setAppOrderError(true);
                        setSnackBarHandler({
                            severity: 'error',
                            open: true,
                            message: "Please fill all fields"
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

        // Define any functions or state that you want to expose to the parent component

        React.useImperativeHandle(ref, () => ({
            submitForm
        }));

        return (
            <Box
                className={styles.container}
            >
                {/* <div style={{ marginTop: 5, flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row") }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    {(currentLang === "ar") ? (
                        <>
                            <span style={{ color: "#4f747a" }}> {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.breadcrumb.f4')} </span> / {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.breadcrumb.f3')} / {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.breadcrumb.f2')} / EQA
                        </>
                    ) : (
                        <>
                            EQA / {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.breadcrumb.f2')} / {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.breadcrumb.f3')} / <span style={{ color: "#4f747a" }}> {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.breadcrumb.f4')} </span>
                        </>
                    )}
                </div>
                <div>
                    <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                </div>
            </div>

            <hr /> */}

                <Box sx={{
                    // border: "1px solid red",
                    padding:
                        // Categorize according to small, medium, large screen
                        (windowSize[0] < 991) ? (2) : (windowSize[0] < 1200) ? (3) : (4),
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
                }}>

                    {/* <Box sx={{
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
                            {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.title')}
                        </Typography>
                        <Typography variant="body1" sx={{
                            // color: "#4f747a" 
                            // color: "#C0C0C0"
                            color: "#696969",
                            fontWeight: 300
                        }}>
                            {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.subTitle')}
                        </Typography>
                    </Box>
                </Box> */}

                    <Box sx={{ flexGrow: 1, mt: 0 }}>
                        <Grid container spacing={
                            // Categorize according to small, medium, large screen
                            (windowSize[0] < 576) ? (0) : ((windowSize[0] < 768) ? (1) : ((windowSize[0] < 992) ? (2) : (3)))
                        }>
                            <Grid item xs={12}>
                                <TextField
                                    id="appNameTextField"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.appName.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.appName.placeholder')}`}
                                    variant="standard"
                                    margin="normal"
                                    fullWidth // t
                                    error={appNameError}
                                    helperText={appNameErrorMessage}
                                    value={appName}
                                    onChange={(e) => {
                                        setAppName(e.target.value);
                                        if (appNameError) {
                                            setAppNameError(false);
                                            setAppNameErrorMessage("");
                                        }
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="appDescriptionTextField"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.description.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.description.placeholder')}`}
                                    variant="standard"
                                    margin="normal"
                                    fullWidth // t
                                    error={appDescriptionError}
                                    helperText={appDescriptionErrorMessage}
                                    value={appDescription}
                                    onChange={(e) => {
                                        setAppDescription(e.target.value);
                                        if (appDescriptionError) {
                                            setAppDescriptionError(false);
                                            setAppDescriptionErrorMessage("");
                                        }
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="appUrlTextField"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.appUrl.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.appUrl.placeholder')}`}
                                    variant="standard"
                                    margin="normal"
                                    fullWidth // t
                                    error={appUrlError}
                                    helperText={appUrlErrorMessage}
                                    value={appUrl}
                                    onChange={(e) => {
                                        setAppUrl(e.target.value);
                                        if (appUrlError) {
                                            setAppUrlError(false);
                                            setAppUrlErrorMessage("");
                                        }
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="appOrderTextField"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.AppOrder.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.AppOrder.placeholder')}`}
                                    variant="standard"
                                    margin="normal"
                                    fullWidth // t
                                    error={appOrderError}
                                    helperText={appOrderErrorMessage}
                                    value={appOrder}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => {
                                        setAppOrder(e.target.value);
                                        if (appOrderError) {
                                            setAppOrderError(false);
                                            setAppOrderErrorMessage("");
                                        }
                                    }}
                                    type="number"
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
                                <FormControl
                                    sx={{
                                        width: "100%"
                                    }}
                                >
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
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    >
                                        {t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.Status.title')}
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
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    >
                                        <FormControlLabel
                                            value="Active"
                                            control={<Radio
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.Status.radio1.label')}
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                        <FormControlLabel
                                            value="DeActive"
                                            control={<Radio
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.apps.details.Add.fields.Status.radio2.label')}
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* <Box
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
            </Box> */}

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

                <Box sx={{
                    mt: 5,
                }}>
                </Box>
            </Box>
        )
    }
)
export default UpdateApp;