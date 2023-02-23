import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";
import axios from 'axios';

// Importing Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SendIcon from '@mui/icons-material/Send';

// Importing material ui components
import {
    Button,
    Box,
    Typography,
    Grid,
    TextField,
    Autocomplete,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    InputAdornment,
    IconButton,
    InputLabel,
    Input,
    Snackbar
} from '@mui/material';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

import Loader from '../../../../../Loader';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTranslation } from "react-i18next";

import styles from "./style.module.css";

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentLang: string
}

interface ViewAllUsersData {
    timestamp: string;
    transactionId: string;
    status: string;
    code: string;
    message: string[];
    obj: {
        createdBy: string;
        creationDateAndTime: number[];
        updatedBy: string | null;
        updateDateAndTime: number[] | null;
        userId: string;
        firstName: string;
        lastName: string;
        userName: string;
        password: string;
        emailId: string;
        collegeId: string;
        campusId: string;
        departmentId: string;
        emailStatus: string | null;
        staff: boolean;
        superUser: boolean;
        active: boolean;
    }[];
}

interface FormState {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmPassword: string;
    emailId: string;
    collegeId: string;
    campusId: string;
    departmentId: string;
    loggedInUser: string;
    active: boolean;
    staff: boolean;
    superUser: boolean;
}

const AddUser: React.FC<UserProps> = ({
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
        window.innerHeight
    ]);

    interface OptionType {
        id: string;
        title: string;
        value: string;
    }

    // For College autocomplete component
    const collegeList: OptionType[] = [
        {
            id: '0C01',
            title: 'College of Computers & Information Technology',
            value: 'College of Computers & Information Technology'
        },
        {
            id: '0C02',
            title: 'College of Science',
            value: 'College of Science'
        }
    ];

    // For autocomplete component
    const collegeDefaultProps = {
        options: collegeList,
        getOptionLabel: (option: any) => option.title
    };
    // For College autocomplete component

    // For Campus autocomplete component
    const campusList: OptionType[] = [
        {
            id: '0CP01',
            title: 'Boy',
            value: 'Boy'
        },
        {
            id: '0CP02',
            title: 'Girl',
            value: 'Girl'
        }
    ];

    // For autocomplete component
    const campusDefaultProps = {
        options: campusList,
        getOptionLabel: (option: any) => option.title,
    };
    // For Campus autocomplete component

    // For Department autocomplete component
    const departmentList: OptionType[] = [
        {
            id: '0D01',
            title: 'Computer Science',
            value: 'Computer Science'
        },
        {
            id: '0D02',
            title: 'Computer Engineering',
            value: 'Computer Engineering'
        },
        {
            id: '0D03',
            title: 'Information Technology',
            value: 'Information Technology'
        }
    ];

    // For autocomplete component
    const departmentDefaultProps = {
        options: departmentList,
        getOptionLabel: (option: any) => option.title,
    };
    // For Department autocomplete component

    // Assign group checkboxes
    const [assignGroupState, setAssignGroupState] = useState({
        group1: true,
        group2: false
    });

    const handleChangeAssignGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssignGroupState({
            ...assignGroupState,
            [event.target.name]: event.target.checked,
        });
    };

    const { group1, group2 } = assignGroupState;
    // Assign group checkboxes

    // Staff access level checkboxes
    const [staffAccessLevelState, setStaffAccessLevelState] = useState({
        staffStatus: true,
        isSuperUser: false
    });

    const handleChangeStaffAccessLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStaffAccessLevelState({
            ...staffAccessLevelState,
            [event.target.name]: event.target.checked,
        });
    };

    const { staffStatus, isSuperUser } = staffAccessLevelState;
    // Staff access level checkboxes

    // Status radio buttons
    const [statusState, setStatusState] = useState("Active");

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusState((event.target as HTMLInputElement).value);
    };
    // Status radio buttons

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    // Fetching data using axios
    const [viewAllUsersData, setViewAllUsersData] = useState<ViewAllUsersData | null>(null);
    // Loading state
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        console.log("Access Token in View Users ===> ", accessToken);

        if (accessToken !== null) {
            // Fetching data using axios and also pass the header x-api-key for auth
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchUsers", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    if (res.data.code === "200.200") {
                        setViewAllUsersData(res.data);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            navigate("/login");
        }
    }, []);

    // Form States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [emailId, setEmailId] = useState("");
    const [collegeId, setCollegeId] = useState<any>(null);
    const [campusId, setCampusId] = useState<any>(null);
    const [departmentId, setDepartmentId] = useState<any>(null);

    const [userNameError, setUserNameError] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailIdError, setEmailIdError] = useState(false);
    const [collegeIdError, setCollegeIdError] = useState(false);
    const [campusIdError, setCampusIdError] = useState(false);
    const [departmentIdError, setDepartmentIdError] = useState(false);


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

            if (viewAllUsersData !== null && accessToken !== null) {
                // Set the validation errors
                if (firstName === "") {
                    setFirstNameError(true);
                }
                if (lastName === "") {
                    setLastNameError(true);
                }
                if (password === "") {
                    setPasswordError(true);
                }
                if (emailId === "") {
                    setEmailIdError(true);
                }
                if (collegeId === null) {
                    setCollegeIdError(true);
                }
                if (campusId === null) {
                    setCampusIdError(true);
                }
                if (departmentId === null) {
                    setDepartmentIdError(true);
                }
                if (emailId.split('@')[0] === "") {
                    setUserNameError(true);
                }
                // Set the validation errors

                if (
                    firstName !== "" &&
                    lastName !== "" &&
                    password !== "" &&
                    emailId !== "" &&
                    emailId.includes("@") &&
                    collegeId !== null &&
                    campusId !== null &&
                    departmentId !== null
                ) {
                    const formState = {
                        "firstName": firstName,
                        "lastName": lastName,
                        "userName": emailId.split('@')[0],
                        "password": password,
                        "emailId": emailId,
                        "collegeId": collegeId.id,
                        "campusId": campusId.id,
                        "departmentId": departmentId.id,
                        "loggedInUser": loggedInUser,
                        "active": (statusState === "Active") ? true : false,
                        "staff": staffStatus,
                        "superUser": isSuperUser
                    };

                    console.log("User Form Data ===> ", formState);

                    axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createUser',
                        formState
                        , {
                            headers: {
                                'x-api-key': accessToken
                            }
                        })
                        .then(function (response) {
                            console.log("Response ===> ", response);
                            if (response.status === 200) {
                                setSnackbarMessage(`User ${emailId.split('@')[0]} has been created successfully`);
                                setTransition(() => TransitionRight);
                                setOpen(true);
                                const m = response.data.message;
                                // navigate("/usermanagement/users/viewusers");
                                console.log(m);
                                setTimeout(() => {
                                    navigate("/account/view");
                                }, 2000);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // alert("Please fill All fields");
                    // set the errors
                    setFirstNameError(true);
                    setLastNameError(true);
                    setPasswordError(true);
                    setEmailIdError(true);
                    setCollegeIdError(true);
                    setCampusIdError(true);
                    setDepartmentIdError(true);
                    setUserNameError(true);
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

    useEffect(() => {
        let userName = emailId.split('@')[0];
        console.log("User Name ===> ", userName);

        if (viewAllUsersData !== null && viewAllUsersData !== undefined)
            // Loop through all the users and check if the user name is already taken or not
            if (viewAllUsersData.obj.length > 0 && viewAllUsersData) {
                for (let i = 0; i < viewAllUsersData.obj.length; i++) {
                    if (viewAllUsersData.obj[i].userName === userName) {
                        setUserNameError(true);
                        break;
                    } else {
                        setUserNameError(false);
                    }
                }
            }
    }, [emailId, viewAllUsersData]);

    // useEffect(() => {
    //     if (firstName !== "" || lastName !== "" || password !== "" || emailId !== "" || collegeId !== null || campusId !== null || departmentId !== null) {
    //         setFirstNameError(false);
    //         setLastNameError(false);
    //         setPasswordError(false);
    //         setEmailIdError(false);
    //         setCollegeIdError(false);
    //         setCampusIdError(false);
    //         setDepartmentIdError(false);
    //     }
    // }, [firstName, lastName, password, emailId, collegeId, campusId, departmentId]);

    if (loading) { // if your component doesn't have to wait for async data, remove this block 
        return <Loader /> // render Loader here
    } else {
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
                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f1')} / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f2')} / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f3')} / <span style={{ color: "#4f747a" }}> {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f3')} </span>
                    </div>
                    <div>
                        <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                    </div>
                </div>

                <hr />

                <Box
                    sx={{
                        padding:
                            // Categorize according to small, medium, large screen
                            (windowSize[0] < 991) ? (2) : (windowSize[0] < 1200) ? (3) : (4),
                        boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        marginBottom: 2,
                        alignItems: (currentLang === "ar") ? ("flex-end") : ("flex-start"),
                        flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row"),
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
                            <PersonOutlineIcon
                                sx={{
                                    color: "#4f747a",
                                    fontSize: 35,
                                }}
                            />
                        </Box>
                        <Box sx={{ ml: 3 }}>
                            <Typography variant="h5" sx={{
                                color: "#3c6766",
                                fontWeight: 500,
                                marginTop: (windowSize[0] < 600) ? (0) : (0.5),
                                display: "flex",
                                flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row"),
                            }}>
                                {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.title')}
                            </Typography>
                            <Typography variant="body1" sx={{
                                color: "#696969",
                                fontWeight: 300,
                            }}>
                                {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.description')}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 1, mt: 2 }}>
                        <Grid container spacing={
                            // Categorize according to small, medium, large screen
                            (windowSize[0] < 576) ? (0) : ((windowSize[0] < 768) ? (1) : ((windowSize[0] < 992) ? (2) : (3)))
                        }>
                            <Grid
                                item
                                xs={
                                    // Categorize according to small, medium, large screen
                                    ((windowSize[0] < 600) ? (12) : (6))
                                }
                            >
                                <TextField
                                    id="fn"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.FirstName.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.FirstName.placeholder')}`}
                                    variant="standard"
                                    helperText={(firstNameError) ? ("Please fill out the first Name field") : ("")}
                                    error={firstNameError}
                                    margin="normal"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);  // set the value of the input
                                        if (firstNameError) {
                                            setFirstNameError(false);
                                        }
                                    }}
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={
                                    // Categorize according to small, medium, large screen
                                    ((windowSize[0] < 600) ? (12) : (6))
                                }
                            >
                                <TextField
                                    id="ln"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.LastName.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.LastName.placeholder')}`}
                                    variant="standard"
                                    helperText={(lastNameError) ? ("Please fill out the Last Name field") : ("")}
                                    error={lastNameError}
                                    margin="normal"
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);  // set the value of the input
                                        if (lastNameError) {
                                            setLastNameError(false);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Email.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Email.placeholder')}`}
                                    variant="standard"
                                    helperText={(emailIdError) ? ("* Email field Required") : ("")}
                                    error={emailIdError}
                                    margin="normal"
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    value={emailId}
                                    onChange={(e) => {
                                        setEmailId(e.target.value);  // set the value of the input
                                        if (emailIdError) {
                                            setEmailIdError(false);
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    {...collegeDefaultProps}
                                    id="collegeAutoComplete"
                                    autoHighlight
                                    // helperText={(collegeIdError) ? ("* Please select any College.") : ("")}
                                    // error={collegeIdError}
                                    value={collegeId}
                                    onChange={(event, newValue: string) => {
                                        setCollegeId(newValue);
                                        if (collegeIdError) {
                                            setCollegeIdError(false);
                                        }
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.College.label')}
                                            variant="standard"
                                            helperText={(collegeIdError) ? ("* Please select any College.") : ("")}
                                            error={collegeIdError}
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    {...campusDefaultProps}
                                    id="campusAutoComplete"
                                    autoHighlight
                                    // helperText={(campusIdError) ? ("* Please select any Campus.") : ("")}
                                    // error={campusIdError}
                                    value={campusId}
                                    onChange={(event, newValue) => {
                                        setCampusId(newValue);
                                        if (campusIdError) {
                                            setCampusIdError(false);
                                        }
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Campus.label')}
                                            variant="standard"
                                            helperText={(campusIdError) ? ("* Please select any College.") : ("")}
                                            error={campusIdError}
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    {...departmentDefaultProps}
                                    id="departmentAutoComplete"
                                    autoHighlight
                                    // helperText={(departmentIdError) ? ("* Please select any Department.") : ("")}
                                    // error={departmentIdError}
                                    value={departmentId}
                                    onChange={(event, newValue) => {
                                        setDepartmentId(newValue);
                                        if (departmentIdError) {
                                            setDepartmentIdError(false);
                                        }
                                    }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Department.label')}
                                            variant="standard"
                                            helperText={(departmentIdError) ? ("* Please select any College.") : ("")}
                                            error={departmentIdError}
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="username"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Username.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Username.placeholder')}`}
                                    variant="standard"
                                    helperText={userNameError ? (`${(emailId === "") ? ("Please fill out the user Name field") : (`${t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Username.error')}`)}`) : ""}
                                    type="text"
                                    margin="normal"
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={
                                        //Extract username from email
                                        emailId.split('@')[0]
                                    }
                                    error={userNameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                >
                                    <InputLabel htmlFor="standard-adornment-password">{t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Password.label')}</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        // helperText={passwordError ? t("* Please fill out the password field") : ""}
                                        error={passwordError}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);  // set the value of the input
                                            if (passwordError) {
                                                setPasswordError(false);
                                            }
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box sx={{
                    // border: "1px solid red",
                    padding:
                        // Categorize according to small, medium, large screen
                        (windowSize[0] < 991) ? (2) : (windowSize[0] < 1200) ? (3) : (4),
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
                    mt:
                        // Categorize according to small, medium, large screen
                        (windowSize[0] < 991) ? (2) : (windowSize[0] < 1200) ? (3) : (4),
                }}>

                    <Box sx={{
                        // border: "1px solid red",
                        display: "flex",
                        marginBottom: 2,
                        alignItems: (currentLang === "ar") ? ("flex-end") : ("flex-start"),
                        flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row"),
                    }}>
                        <Box
                            sx={{
                                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
                                width: 60,
                                height: 60,
                                borderRadius: 1.25,
                                backgroundColor: "#fffefe",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <LockOpenIcon
                                sx={{
                                    color: "#4f747a",
                                    fontSize: 35,
                                    // boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;", 
                                }}
                            />
                        </Box>
                        <Box sx={{ ml: 3 }}>
                            <Typography variant="h5"
                                sx={{
                                    // color: "#312a2c",
                                    color: "#3c6766",
                                    fontWeight: 500,
                                    marginTop: (windowSize[0] < 600) ? (0) : (0.5),
                                    display: "flex",
                                    flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row"),
                                }}
                            >
                                {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.title')}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    // color: "#4f747a" 
                                    // color: "#C0C0C0"
                                    color: "#696969",
                                    fontWeight: 300
                                }}
                            >
                                {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.subTitle')}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            mt: 2
                        }}
                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                    >
                        <Grid
                            container
                            spacing={
                                // Categorize according to small, medium, large screen
                                (windowSize[0] < 576) ? (0) : ((windowSize[0] < 768) ? (1) : ((windowSize[0] < 992) ? (2) : (3)))
                            }
                            sx={{
                                paddingTop:
                                    // Categorize according to small, medium, large screen
                                    (windowSize[0] < 576) ? (1) : ((windowSize[0] < 768) ? (1.5) : ((windowSize[0] < 992) ? (2) : (3))),
                            }}
                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                        >
                            <Grid item xs={12}
                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                            >
                                {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
                                <FormControl
                                    dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                >
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
                                            marginTop: 1
                                        }}
                                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                    >
                                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.staffaccess.title')}
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        // Add spacing between radio buttons
                                        sx={{
                                            '& .MuiFormControlLabel-root': {
                                                marginRight: 8.5
                                            },
                                            mt: 1
                                        }}
                                    >
                                        <FormControlLabel
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.staffaccess.checkbox1.label')}
                                            value={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.staffaccess.checkbox1.label')}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                            control={<Checkbox
                                                name="staffStatus"
                                                checked={staffStatus}
                                                onChange={handleChangeStaffAccessLevel}
                                                color="success"
                                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                                            />}
                                        />
                                        <FormControlLabel
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.staffaccess.checkbox2.label')}
                                            value={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.staffaccess.checkbox2.label')}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                            control={<Checkbox
                                                name="isSuperUser"
                                                checked={isSuperUser}
                                                onChange={handleChangeStaffAccessLevel}
                                                color="success"
                                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                                            />}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}
                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                            >
                                {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
                                <FormControl
                                    dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                >
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
                                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                    >
                                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.status.title')}
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
                                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                        value={statusState}
                                        onChange={handleChangeStatus}
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={"Active"}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.status.checkbox1.label')}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            value={"DeActive"}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.status.checkbox2.label')}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}
                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                            >
                                {/* Define here two radio buttons active and inactive from material ui. Also import them for me */}
                                <FormControl
                                    dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                >
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
                                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                    >
                                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.assignGroups.title')}
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        // Add spacing between radio buttons
                                        sx={{
                                            '& .MuiFormControlLabel-root': {
                                                marginRight: 8.5
                                            },
                                            mt: 1
                                        }}
                                        dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                    >
                                        <FormControlLabel
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.assignGroups.checkbox1.label')}
                                            value="Group 1"
                                            control={<Checkbox
                                                name="group1"
                                                checked={group1}
                                                onChange={handleChangeAssignGroup}
                                                color="success"
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                            />}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                        />
                                        <FormControlLabel
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.assignGroups.checkbox2.label')}
                                            value="Group 2"
                                            control={<Checkbox
                                                name="group2"
                                                checked={group2}
                                                onChange={handleChangeAssignGroup}
                                                color="success"
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                                                dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                            />}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
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

                <br /><br /><br />
            </Box>
        )
    }
}
export default AddUser;