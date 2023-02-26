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
    Snackbar,
    Autocomplete
} from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

import styles from "./style.module.css";

interface AddAppFormProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const AddAppForm: React.FC<AddAppFormProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {
    const navigate = useNavigate();

    ///////////////////////////////// Snackbar State /////////////////////////////////
    type TransitionProps = Omit<SlideProps, 'direction'>;

    function TransitionRight(props: TransitionProps) {
        return <Slide {...props} direction="right" />;
    }

    const [snackbarMessage, setSnackbarMessage] = useState('');

    const vertical = 'bottom';
    const horizontal = 'right';

    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);

    const handleClose = () => {
        setOpen(false);
    };
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
    const [moduleName, setModuleName] = useState("");
    const [formName, setFormName] = useState("");
    const [formUrl, setFormUrl] = useState("");
    const [appId, setAppId] = useState<any>(null);

    // Error messages
    const [moduleNameErrorMessage, setModuleNameErrorMessage] = useState("");
    const [formNameErrorMessage, setFormNameErrorMessage] = useState("");
    const [formUrlErrorMessage, setFormUrlErrorMessage] = useState("");
    const [appIdErrorMessage, setAppIdErrorMessage] = useState("");

    // For field validation
    const [moduleNameError, setModuleNameError] = useState(false);
    const [formNameError, setFormNameError] = useState(false);
    const [formUrlError, setFormUrlError] = useState(false);
    const [appIdError, setAppIdError] = useState(false);

    // Status radio buttons
    const [status, setStatus] = useState("Active");

    // FOR APP ID AUTO COMPLETE

    // For College autocomplete component
    const [appIdList, setAppIdList] = useState<any>([]);
    const [loadData, setLoadData] = useState(true);

    useEffect(() => {
        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        console.log("Access Token in View Users ===> ", accessToken);

        if (accessToken !== null && loadData === true) {
            // Fetching data using axios and also pass the header x-api-key for auth
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchAppDetails", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setAppIdList(res.data.obj);
                    setLoadData(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [appIdList, loadData]);

    useEffect(() => {
        if (appId !== null) {
            console.log("Current App Id ===> ", appId.appId);
        }
    }, [appId, appIdList]);

    // For autocomplete component
    const appIdDefaultProps = {
        options: appIdList,
        getOptionLabel: (option: any) => option.appName
    };
    // For College autocomplete component
    // FOR APP ID AUTO COMPLETE

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
                if (moduleName === "") {
                    setModuleNameErrorMessage("Module Name is required");
                    setModuleNameError(true);
                }
                if (formName === "") {
                    setFormNameErrorMessage("Form Name is required");
                    setFormNameError(true);
                }
                if (formUrl === "") {
                    setFormUrlErrorMessage("Form URL is required");
                    setFormUrlError(true);
                }
                if (appId === null) {
                    setAppIdErrorMessage("* Please select any AppId from the list.");
                    setAppIdError(true);
                }
                // Set the validation errors

                if (
                    moduleName !== "" &&
                    formName !== "" &&
                    formUrl !== "" &&
                    appId !== null
                ) {
                    const formState = {
                        "moduleName": moduleName,
                        "formName": formName,
                        "formUrl": formUrl,
                        "appId": (appId !== null) ? appId.appId : null,
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
                                setSnackbarMessage(`App ${moduleName} has been created successfully`);
                                setTransition(() => TransitionRight);
                                setOpen(true);
                                const m = response.data.message;
                                // navigate("/usermanagement/users/viewusers");
                                console.log(m);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // alert("Please fill All fields");
                    // set the errors
                    setModuleNameError(true);
                    setFormNameError(true);
                    setFormUrlError(true);
                    setAppIdError(true);
                    setSnackbarMessage(`Please fill out all the fields`);
                    setTransition(() => TransitionRight);
                    setOpen(true);
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
                    EQA / Account / AppForm / <span style={{ color: "#4f747a" }}> Add AppForm </span>
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
                            Add App Form
                        </Typography>
                        <Typography variant="body1" sx={{
                            // color: "#4f747a" 
                            // color: "#C0C0C0"
                            color: "#696969",
                            fontWeight: 300
                        }}>
                            Add a new AppForm to the system
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
                                id="moduleNameTextField"
                                label="Module Name"
                                placeholder="Enter Module name"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                error={moduleNameError}
                                helperText={moduleNameErrorMessage}
                                value={moduleName}
                                onChange={(e) => {
                                    setModuleName(e.target.value);
                                    if (moduleNameError) {
                                        setModuleNameError(false);
                                        setModuleNameErrorMessage("");
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="formNameTextField"
                                label="Form Name"
                                placeholder="Enter form name"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                error={formNameError}
                                helperText={formNameErrorMessage}
                                value={formName}
                                onChange={(e) => {
                                    setFormName(e.target.value);
                                    if (formNameError) {
                                        setFormNameError(false);
                                        setFormNameErrorMessage("");
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="formUrlTextField"
                                label="Form URL"
                                placeholder="Enter form url"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                error={formUrlError}
                                helperText={formUrlErrorMessage}
                                value={formUrl}
                                onChange={(e) => {
                                    setFormUrl(e.target.value);
                                    if (formUrlError) {
                                        setFormUrlError(false);
                                        setFormUrlErrorMessage("");
                                    }
                                }}
                            />
                        </Grid>
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
                                        label={"Select App Id"}
                                        variant="standard"
                                        helperText={(appIdError) ? (appIdErrorMessage) : ("")}
                                        error={appIdError}
                                    // dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
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
                // onClick={() => {
                //     navigate("/");
                // }}
                startIcon={<SendIcon style={{ display: "block" }} />}
                onClick={submitForm}
            >
                <Typography style={{ display: "block" }}>Submit</Typography>
            </Button>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                autoHideDuration={3000}
                message={snackbarMessage}
                key={vertical + horizontal}
                sx={{
                    // lift over from below to few pixels up
                    transform: "translateY(-30px)",
                }}
            />

            <br /><br /> <br />
        </Box>
    )
}
export default AddAppForm;