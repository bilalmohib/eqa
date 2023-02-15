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

import Loader from '../../../../../Loader';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTranslation } from "react-i18next";

import styles from "./style.module.css";

export interface State extends SnackbarOrigin {
    open: boolean;
}

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

    const currentFormatedDate: string = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    interface OptionType {
        title: string;
        value: string;
    }

    // For College autocomplete component
    const collegeList: OptionType[] = [
        {
            title: 'College of Arts and Sciences',
            value: 'adsf;lkjdasf',
        }
    ];

    // For autocomplete component
    const collegeDefaultProps = {
        options: collegeList,
        getOptionLabel: (option: any) => option.title,
    };
    // const flatProps = {
    //     options: top100Films.map((option) => option.title),
    // };
    // const [value, setValue] = useState<FilmOptionType | null>(null);
    // For autocomplete component

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
    // const error = [group1, group2].filter((v) => v).length !== 2;
    // Assign group checkboxes

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

    // All the states for the form
    const [formState, setFormState] = useState<FormState>({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        confirmPassword: "sadf",
        emailId: "",
        collegeId: "adsf",
        campusId: "adsf",
        departmentId: "asddsaf",
        loggedInUser: "lkajsdf",
        active: false,
        staff: false,
        superUser: false
    });


    useEffect(() => {
        console.log("User Form Data ===> ", formState);
    });

    const [userNameError, setUserNameError] = useState(false);

    const submitForm = (e: any) => {
        e.preventDefault();

        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        if (viewAllUsersData !== null && accessToken !== null) {
            // if (formState.firstName !== "" && formState.lastName !== "" && formState.userName !== "" && formState.password !== "" && formState.emailId !== "" && formState.collegeId !== "" && formState.campusId !== "" && formState.departmentId !== "") {
            if (
                true
                //formState.userName !== "" &&
                // formState.password !== "" &&
                // formState.emailId !== "" &&
                // formState.firstName !== "" &&
                // formState.lastName !== ""
                // &&
                // formState.collegeId !== "" &&
                // formState.campusId !== "" &&
                // formState.departmentId !== "" &&
                // formState.loggedInUser !== ""
                // &&
                // formState.active !== null &&
                // formState.staff !== null &&
                // formState.superUser !== null
            ) {
                axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createUser', {
                    // "firstName": formState.firstName,
                    // "lastName": formState.lastName,
                    // "userName": formState.userName,
                    // "password": formState.password,
                    // "emailId": formState.emailId,
                    // "collegeId": formState.collegeId,
                    // "campusId": formState.campusId,
                    // "departmentId": formState.departmentId,
                    // "loggedInUser": formState.loggedInUser,
                    // "active": formState.active,
                    // "staff": formState.staff,
                    // "superUser": formState.superUser
                    "firstName" : "Ali",
                    "lastName" : "Moen",
                    "userName" : "moen",
                    "password" : "123456",
                    "emailId" : "bilalmohib78964567@gmail.com",
                    "collegeId" : "CL001",
                    "campusId" : "CP001",
                    "departmentId" : "DM003",
                    "loggedInUser" : "shabbir",
                    "active" : true,
                    "staff" : false,
                    "superUser" : false
                }, {
                    headers: {
                        'x-api-key': accessToken
                    }
                })
                    .then(function (response) {
                        console.log("Response ===> ", response);
                        if (response.status === 200) {
                            // setState({ open: true, vertical: 'top', horizontal: 'center' });
                            // navigate("/usermanagement/users/viewusers");
                            console.log("Form submitted");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                alert("Please enter user name");
            }
        } else {
            alert("Please login first");
            navigate("/login");
        }
    }

    useEffect(() => {
        console.log("User Name ===> ", formState.userName);

        if (viewAllUsersData !== null && viewAllUsersData !== undefined)
            // Loop through all the users and check if the user name is already taken or not
            if (viewAllUsersData.obj.length > 0 && viewAllUsersData) {
                for (let i = 0; i < viewAllUsersData.obj.length; i++) {
                    if (viewAllUsersData.obj[i].userName === formState.userName) {
                        setUserNameError(true);
                        break;
                    } else {
                        setUserNameError(false);
                    }
                }
            }
    }, [formState, viewAllUsersData]);

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
                                    helperText=""
                                    margin="normal"
                                    value={formState.firstName}
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            firstName: e.target.value,
                                        });
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
                                    helperText=""
                                    margin="normal"
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    value={formState.lastName}
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            lastName: e.target.value,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Email.label')}
                                    placeholder={`${t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Email.placeholder')}`}
                                    variant="standard"
                                    helperText=""
                                    margin="normal"
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    value={formState.emailId}
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            emailId: e.target.value,
                                        });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    {...collegeDefaultProps}
                                    id="collegeAutoComplete"
                                    autoHighlight
                                    // value={formState.collegeId}
                                    // onChange={(event, newValue) => {
                                    //     setFormState({
                                    //         ...formState,
                                    //         collegeId: newValue
                                    //     });
                                    // }}
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.College.label')}
                                            variant="standard"
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    {...collegeDefaultProps}
                                    id="campusAutoComplete"
                                    autoHighlight
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Campus.label')}
                                            variant="standard"
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    {...collegeDefaultProps}
                                    id="departmentAutoComplete"
                                    autoHighlight
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Department.label')}
                                            variant="standard"
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
                                    helperText={userNameError ? t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Username.error') : ""}
                                    type="text"
                                    margin="normal"
                                    fullWidth // t
                                    dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    // InputProps={{
                                    //     readOnly: true,
                                    // }}
                                    value={formState.userName}
                                    error={userNameError}
                                    onChange={(e) => {
                                        setFormState({
                                            ...formState,
                                            userName: e.target.value
                                        })
                                    }}
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
                                        value="123456"
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
                                                checked={group1}
                                                onChange={handleChangeAssignGroup}
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
                                                name="Super User"
                                                checked={group2}
                                                onChange={handleChangeAssignGroup}
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
                                    >
                                        <FormControlLabel
                                            value="active"
                                            control={<Radio />}
                                            label={t('Home.Sidebar.list.userManagement.subMenu.Users.details.Permissions.fields.status.checkbox1.label')}
                                            dir={(currentLang === "ar") ? ('rtl') : ('ltr')}
                                        />
                                        <FormControlLabel
                                            value="deactive"
                                            control={<Radio />}
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

                <br /><br /><br />
            </Box>
        )
    }
}
export default AddUser;