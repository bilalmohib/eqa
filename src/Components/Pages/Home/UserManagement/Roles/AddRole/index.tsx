import * as React from 'react';
import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

import { styled } from '@mui/material/styles';

// Importing Icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SendIcon from '@mui/icons-material/Send';

// Importing material ui components
import {
    Button,
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Autocomplete,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    Snackbar
} from '@mui/material';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

import Cookies from 'js-cookie';

import axios from 'axios';

import styles from "./style.module.css";

const percentage = 30;

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const AddRole: React.FC<UserProps> = ({
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
                                setSnackbarMessage(`Role ${roleName} has been created successfully`);
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
                    // set the errors
                    setRoleNameError(true);
                    setRoleDescriptionError(true);
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
    /// Handling the data of the form

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
                    EQA / User Management / Roles / <span style={{ color: "#4f747a" }}> Add Role </span>
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
                                    if(roleNameError){
                                        setRoleNameError(false);
                                    }
                                }}
                                error={roleNameError}
                                helperText={roleNameError ? roleNameErrorMessage : ""}
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
                                    if(roleDescriptionError){
                                        setRoleDescriptionError(false);
                                    }
                                }}
                                error={roleDescriptionError}
                                helperText={roleDescriptionError ? roleDescriptionErrorMessage : ""}
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

            <br /><br />
        </Box>
    )
}
export default AddRole;