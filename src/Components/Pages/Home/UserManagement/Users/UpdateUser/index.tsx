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
    ListItemText,
    MenuItem,
    OutlinedInput,
    FormHelperText
} from '@mui/material';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import SnackBar from '../../../../../SnackBar';

import Loader from '../../../../../Loader';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTranslation } from "react-i18next";

import styles from "./style.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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

const UpdateUser = React.forwardRef<UpdateRef, UpdateProps>(
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

        // const newValues = {
        //     "userId": values.userId,
        //     "firstName": values.firstName,
        //     "lastName": values.lastName,
        //     "userName": values.userName,
        //     "password": "123456",
        //     "emailId": values.emailId,
        //     "collegeId": values.collegeId,
        //     "campusId": values.campusId,
        //     "departmentId": values.departmentId,
        //     "loggedInUser": loggedInUser,
        //     "active": values.active === "true" ? true : false,
        //     "staff": values.staff === "true" ? true : false,
        //     "superUser": values.superUser === "true" ? true : false
        // };

        // Data from Local Storage for logged in user
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // FOR REACT MULTI SELECT
        const [groupName, setGroupName] = useState<any>([]);

        const handleChangeGroups = (event: SelectChangeEvent<typeof groupName>) => {
            const {
                target: { value },
            } = event;
            if (groupNameError) {
                setGroupNameError(false);
            }
            setGroupName(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        };
        // FOR REACT MULTI SELECT

        const [departmentDropDownOpen, setDepartmentDropDownOpen] = useState(false);

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
            window.innerHeight
        ]);

        // For College autocomplete component
        const [collegeList, setCollegeList] = useState<any>([]);

        // For autocomplete component
        const collegeDefaultProps = {
            options: collegeList,
            getOptionLabel: (option: any) => option.collegeName
        };
        // For College autocomplete component

        // For Campus autocomplete component
        const [campusList, setCampusList] = useState<any>([]);

        // For autocomplete component
        const campusDefaultProps = {
            options: campusList,
            getOptionLabel: (option: any) => option.campusName,
        };
        // For Campus autocomplete component

        // For Department autocomplete component
        const [departmentList, setDepartmentList] = useState<any>([]);

        // For autocomplete component
        const departmentDefaultProps = {
            options: departmentList,
            getOptionLabel: (option: any) => option.departmentName,
        };
        // For Department autocomplete component

        // Assign group checkboxes
        // Assign group checkboxes

        // Staff access level checkboxes
        const [staffAccessLevelState, setStaffAccessLevelState] = useState({
            staffStatus: originalValues.staff,
            isSuperUser: originalValues.superUser
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
        const [statusState, setStatusState] = useState(originalValues.active ? "Active" : "Deactive");

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

        const [viewAllGroupsData, setViewAllGroupsData] = useState<any>(null);
        // Loading state
        const [loading, setLoading] = useState(true)

        // Form States
        const [firstName, setFirstName] = useState(originalValues.firstName);
        const [lastName, setLastName] = useState(originalValues.lastName);
        const [password, setPassword] = useState(originalValues.password);
        const [emailId, setEmailId] = useState(originalValues.emailId);
        const [collegeId, setCollegeId] = useState<any>(originalValues.collegeId);
        const [campusId, setCampusId] = useState<any>(originalValues.campusId);
        const [departmentId, setDepartmentId] = useState<any>(originalValues.departmentId);

        // Errors
        const [userNameError, setUserNameError] = useState(false);
        const [firstNameError, setFirstNameError] = useState(false);
        const [lastNameError, setLastNameError] = useState(false);
        const [passwordError, setPasswordError] = useState(false);
        const [emailIdError, setEmailIdError] = useState(false);
        const [collegeIdError, setCollegeIdError] = useState(false);
        const [campusIdError, setCampusIdError] = useState(false);
        const [departmentIdError, setDepartmentIdError] = useState(false);
        const [groupNameError, setGroupNameError] = useState(false);

        // useEffect(()=>{
        //     console.log("The ")
        // })

        useEffect(() => {
            let accessToken: any = Cookies.get("accessToken");

            if (accessToken === undefined || accessToken === null) {
                accessToken = null;
            }

            console.log("Access Token in View Users ===> ", accessToken);

            if (accessToken !== null) {
                // @1) Fetching Users
                axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchUsers", {
                    headers: {
                        "x-api-key": accessToken
                    }
                })
                    .then((res) => {
                        if (res.data.code === "200.200") {
                            setViewAllUsersData(res.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                // @2) Fetching Groups
                axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchGroups", {
                    headers: {
                        "x-api-key": accessToken
                    }
                })
                    .then((res) => {
                        if (res.data.code === "200.200") {
                            setViewAllGroupsData(res.data.obj);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                // @3) Fetching All Colleges
                axios.get("https://eqa.datadimens.com:8443/EQACORE-SERVICE/colleges", {
                    headers: {
                        "x-api-key": accessToken
                    }
                })
                    .then((res) => {
                        if (res.data.code === "200.200") {
                            setCollegeList(res.data.obj);

                            let collegeList = res.data.obj;

                            for (let i = 0; i < collegeList.length; i++) {
                                if (collegeList[i].collegeId === originalValues.collegeId) {
                                    let value = collegeList[i];
                                    console.log("College Value Matches is here: ", value);
                                    setCollegeId(value);
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                // @4) Fetching All Campuses by College Id
                if (collegeId !== null) {
                    console.log("College ID New ::: ", collegeId.collegeId);
                    axios.get(`https://eqa.datadimens.com:8443/EQACORE-SERVICE/getAllCampusesByCollegeId/${collegeId.collegeId}`, {
                        headers: {
                            "x-api-key": accessToken
                        }
                    })
                        .then((res) => {
                            if (res.data.code === "200.200") {
                                setCampusList(res.data.obj);

                                let campusList = res.data.obj;

                                for (let i = 0; i < campusList.length; i++) {
                                    if (campusList[i].campusId === originalValues.campusId) {
                                        let value = campusList[i];
                                        console.log("Campus Value Matches is here: ", value);
                                        setCampusId(value);
                                    } else {
                                        setCampusList([]);
                                        setLoading(false);
                                    }
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }

                // @5) Fetching All Departments
                axios.get("https://eqa.datadimens.com:8443/EQACORE-SERVICE/department", {
                    headers: {
                        "x-api-key": accessToken
                    }
                })
                    .then((res) => {
                        if (res.data.code === "200.200") {
                            setDepartmentList(res.data.obj);

                            let departmentList = res.data.obj;

                            for (let i = 0; i < departmentList.length; i++) {
                                if (departmentList[i].departmentId === originalValues.departmentId) {
                                    let value = departmentList[i];
                                    console.log("Department Value Matches is here: ", value);
                                    setDepartmentId(value);
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                setLoading(false);
            }
            else {
                navigate("/login");
            }
        }, [collegeId, navigate, originalValues.campusId, originalValues.collegeId, originalValues.departmentId]);

        console.log("Original Values ===> ", originalValues);

        const submitForm = () => {

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
                    if (groupName.length === 0) {
                        setGroupNameError(true);
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
                        departmentId !== null &&
                        groupName.length !== 0
                    ) {
                        const formState = {
                            "firstName": firstName,
                            "lastName": lastName,
                            "userName": emailId.split('@')[0],
                            "password": password,
                            "emailId": emailId,
                            "collegeId": collegeId.collegeId,
                            "campusId": campusId.campusId,
                            "departmentId": departmentId.departmentId,
                            "loggedInUser": loggedInUser,
                            "active": (statusState === "Active") ? true : false,
                            "staff": staffStatus,
                            "superUser": isSuperUser,
                            "groupIds": groupName
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
                                    setSnackBarHandler({
                                        open: true,
                                        message: (response.data.code === "200.200") ? (`User ${emailId.split('@')[0]} has been created successfully`) : (response.data.message),
                                        severity: (response.data.code === "200.200") ? ("success") : ("error")
                                    })
                                    const m = response.data.message;
                                    console.log(m);
                                    if (response.data.code === "200.200") {
                                        setTimeout(() => {
                                            navigate("/account/users/view");
                                        }, 3000);
                                    }
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
                        setGroupNameError(true);
                        setUserNameError(true);
                        setSnackBarHandler({
                            open: true,
                            message: "Please fill all the fields",
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

        useEffect(() => {
            let userName = emailId.split('@')[0];
            console.log("User Name ===> ", userName);

            if (viewAllUsersData !== null && viewAllUsersData !== undefined)
                // Loop through all the users and check if the user name is already taken or not
                if (viewAllUsersData.obj.length > 0 && viewAllUsersData) {
                    for (let i = 0; i < viewAllUsersData.obj.length; i++) {
                        if (viewAllUsersData.obj[i].userName === userName && userName !== originalValues.userName) {
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

        // Define any functions or state that you want to expose to the parent component

        React.useImperativeHandle(ref, () => ({
            submitForm
        }));

        if (loading) { // if your component doesn't have to wait for async data, remove this block 
            return (
                <Box className={styles.loader}>
                    <Loader />
                </Box>
            ) // render Loader here
        } else {
            return (
                <Box className={styles.container}>
                    {/* <div style={{ marginTop: 5, flexDirection: (currentLang === "ar") ? ("row-reverse") : ("row") }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                    <div>
                        {(currentLang === "ar") ? (
                            <>
                                <span style={{ color: "#4f747a" }}> {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f4')} </span> / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f3')} / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f2')} / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f1')}
                            </>
                        ) : (
                            <>
                                {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f1')} / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f2')} / {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f3')} / <span style={{ color: "#4f747a" }}> {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.breadcrumb.f4')} </span>
                            </>
                        )}
                    </div>
                    <div>
                        <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                    </div>
                </div> */}

                    {/* <hr /> */}

                    <Box
                        sx={{
                            padding:
                                // Categorize according to small, medium, large screen
                                (windowSize[0] < 991) ? (2) : (windowSize[0] < 1200) ? (3) : (4),
                            boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
                        }}
                    >
                        {/* <Box sx={{
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
                    </Box> */}

                        <Box sx={{ flexGrow: 1, mt: 0 }}>
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
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
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
                                    <Autocomplete
                                        {...collegeDefaultProps}
                                        id="collegeAutoComplete"
                                        autoHighlight
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
                                                placeholder='Select College ...'
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
                                                placeholder='Select Campus ...'
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
                                        value={departmentId}
                                        open={departmentDropDownOpen}
                                        // onOpen={() => {
                                        //     setDepartmentDropDownOpen(!departmentDropDownOpen);
                                        // }}
                                        onClick={() => {
                                            setDepartmentDropDownOpen(true);
                                        }}
                                        onClose={() => {
                                            setDepartmentDropDownOpen(!departmentDropDownOpen);
                                        }}
                                        // onOpen={() => {
                                        //     setOpen(true);
                                        // }}
                                        // onClose={() => {
                                        //     setOpen(false);
                                        // }}
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
                                                placeholder='Select Department ...'
                                                helperText={(departmentIdError) ? ("* Please select any College.") : ("")}
                                                error={departmentIdError}
                                                onClick={() => {
                                                    setDepartmentDropDownOpen(true);
                                                }}
                                                dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        sx={{ width: '100%' }}
                                        variant="standard"
                                        dir={(currentLang === "ar") ? "rtl" : "ltr"}
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">{t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.Inputs.Password.label')}</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
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
                                            dir={(currentLang === "ar") ? "rtl" : "ltr"}
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
                                            id="multipleGroupsSelect"
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
                                        <div>
                                            <FormControl sx={{
                                                mt: 2,
                                                width: {
                                                    xs: 210, // theme.breakpoints.up('xs')
                                                    sm: 300, // theme.breakpoints.up('sm')
                                                    md: 340, // theme.breakpoints.up('md')
                                                    lg: 340, // theme.breakpoints.up('lg')
                                                    xl: 340, // theme.breakpoints.up('xl')
                                                }
                                            }}
                                            >
                                                <Select
                                                    id="multipleGroupsSelect"
                                                    displayEmpty
                                                    multiple
                                                    value={groupName}
                                                    onChange={handleChangeGroups}
                                                    input={<OutlinedInput />}
                                                    error={groupNameError}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return <span>
                                                                {t('Home.Sidebar.list.userManagement.subMenu.Users.details.Add.Users.selectGroups.label')}
                                                            </span>
                                                        }

                                                        return selected.join(', ');
                                                    }}
                                                    MenuProps={MenuProps}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    {
                                                        (viewAllGroupsData !== null) ? (
                                                            viewAllGroupsData.map((groups: any, index: number) => (
                                                                <MenuItem key={index} value={groups.grpId}>
                                                                    <Checkbox checked={groupName.indexOf(groups.grpId) > -1} />
                                                                    <ListItemText primary={groups.grpName} />
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem key="No Groups" value="No Groups">
                                                                No Groups
                                                            </MenuItem>
                                                        )
                                                    }
                                                </Select>
                                                <FormHelperText sx={{ color: "red" }}>{(groupNameError) ? ("* Please select any group from the list") : ("")}</FormHelperText>
                                            </FormControl>
                                        </div>
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

                    <br />
                </Box>
            )
        }
    }
)
export default UpdateUser;