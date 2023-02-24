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
    Snackbar
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
                                setSnackbarMessage(`App ${appName} has been created successfully`);
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
                    setAppNameError(true);
                    setAppDescriptionError(true);
                    setAppUrlError(true);
                    setAppOrderError(true);
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
                                id="appNameTextField"
                                label="App Name"
                                placeholder="Enter App name"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="appDescriptionTextField"
                                label="Description"
                                placeholder="Enter app description"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="appUrlTextField"
                                label="App URL"
                                placeholder="Enter app url"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="appOrderTextField"
                                label="App Order"
                                placeholder="Enter app order"
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