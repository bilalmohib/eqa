import * as React from 'react';
import { useState, useEffect } from "react";

// Importing Icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
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
    Radio
} from '@mui/material';
import SnackBar from '../../../../../SnackBar';

import styles from "./style.module.css";

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const AddGroup: React.FC<UserProps> = ({
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
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    // Error messages
    const [groupNameErrorMessage, setGroupNameErrorMessage] = useState("");
    const [groupDescriptionErrorMessage, setGroupDescriptionErrorMessage] = useState("");

    // For field validation
    const [groupNameError, setGroupNameError] = useState(false);
    const [groupDescriptionError, setGroupDescriptionError] = useState(false);

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
                if (groupName === "") {
                    setGroupNameErrorMessage("Group Name is required");
                    setGroupNameError(true);
                }
                if (groupDescription === "") {
                    setGroupDescriptionErrorMessage("Group Description is required");
                    setGroupDescriptionError(true);
                }
                // Set the validation errors

                if (
                    groupName !== "" &&
                    groupDescription !== ""
                ) {
                    const formState = {
                        "grpName": groupName,
                        "grpDescription": groupDescription,
                        "loggedInUser": loggedInUser,
                        "active": (status === "Active") ? true : false
                    };

                    console.log("User Form Data ===> ", formState);

                    axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveGroup',
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
                                    open: true,
                                    message: `Group ${groupName} has been created successfully`,
                                });
                                const m = response.data.message;
                                // navigate("/usermanagement/users/viewusers");
                                console.log(m);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    setSnackBarHandler({
                        severity: 'error',
                        open: true,
                        message: "Please fill all fields",
                    });
                    // set the errors
                    setGroupNameError(true);
                    setGroupDescriptionError(true);
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
                    EQA / User Management / Groups / <span style={{ color: "#4f747a" }}> Add Groups </span>
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
                        <PeopleOutlineIcon
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
                            Add Group
                        </Typography>
                        <Typography variant="body1" sx={{
                            // color: "#4f747a" 
                            // color: "#C0C0C0"
                            color: "#696969",
                            fontWeight: 300
                        }}>
                            Add a new group to the system
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
                                id="groupNameTextField"
                                label="Group Name"
                                placeholder="Enter group name"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                error={groupNameError}
                                helperText={groupNameErrorMessage}
                                value={groupName}
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                    if (groupNameError) {
                                        setGroupNameError(false);
                                        setGroupNameErrorMessage("");
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="groupDescriptionTextField"
                                label="Description"
                                placeholder="Enter group description"
                                variant="standard"
                                margin="normal"
                                fullWidth // t
                                error={groupDescriptionError}
                                helperText={groupDescriptionErrorMessage}
                                value={groupDescription}
                                onChange={(e) => {
                                    setGroupDescription(e.target.value);
                                    if (groupDescriptionError) {
                                        setGroupDescriptionError(false);
                                        setGroupDescriptionErrorMessage("");
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
                            <FormControl>
                                <FormLabel
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
export default AddGroup;