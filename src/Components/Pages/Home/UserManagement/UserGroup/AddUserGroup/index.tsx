import * as React from 'react';
import { useState, useEffect } from "react";

// Importing Icons
import AppsIcon from '@mui/icons-material/Apps';
import SendIcon from '@mui/icons-material/Send';

import { Theme, useTheme } from '@mui/material/styles';

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
    Autocomplete,
    Chip,
    MenuItem,
    InputLabel,
    OutlinedInput,
    Checkbox,
    FormGroup,
    FormHelperText,
    ListItemText
} from '@mui/material';
import SnackBar from '../../../../../SnackBar';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import styles from "./style.module.css";

interface AddUserGroupProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

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

    // For Selecting one user
    const [userId, setUserId] = useState<any>(null);

    // Error messages
    const [userIdErrorMessage, setUserIdErrorMessage] = useState("");

    // For field validation
    const [userIdError, setUserIdError] = useState(false);

    // Status radio buttons
    const [status, setStatus] = useState("Active");

    const [description, setDescription] = useState("");

    const [descriptionError, setDescriptionError] = useState(false);

    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");


    // For fetching data from API
    const [groupsList, setGroupsList] = useState<any>([]);
    const [userList, setUserList] = useState<any>([]);
    // For fetching data from API

    // For checking loading state of API
    const [loadData, setLoadData] = useState(true);

    // FOR REACT MULTI SELECT

    // @1) groupName
    const [groupName, setGroupName] = useState<any>([]);

    const [groupNameError, setGroupNameError] = useState(false);
    const [groupNameErrorMessage, setGroupNameErrorMessage] = useState("");

    const handleChangeGroups = (event: SelectChangeEvent<typeof groupName>) => {
        const {
            target: { value },
        } = event;
        if (groupNameError === true) {
            setGroupNameError(false);
            setGroupNameErrorMessage("");
        }
        setGroupName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    // FOR REACT MULTI SELECT

    useEffect(() => {
        let accessToken: any = Cookies.get("accessToken");

        if (accessToken === undefined || accessToken === null) {
            accessToken = null;
        }

        console.log("Access Token in View Users ===> ", accessToken);

        if (accessToken !== null && loadData === true) {
            // Fetching Users
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchUsers", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setUserList(res.data.obj);
                })
                .catch((err) => {
                    console.log(err);
                });

            // Fetching Group
            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchGroups", {
                headers: {
                    "x-api-key": accessToken
                }
            })
                .then((res) => {
                    setGroupsList(res.data.obj);
                })
                .catch((err) => {
                    console.log(err);
                });

            // At the end set the load data to false
            setLoadData(false);
        }


    }, [loadData]);

    // --------------------- AUTO COMPLETE DEFAULT PROPS ---------------------

    // @1 FOR USER ID AUTO COMPLETE
    const userIdDefaultProps = {
        options: userList,
        getOptionLabel: (option: any) => option.userName
    };
    // FOR USER ID AUTO COMPLETE
    // --------------------- AUTO COMPLETE DEFAULT PROPS ---------------------

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
                if (userId === null) {
                    setUserIdErrorMessage("* Please select any User from the list.");
                    setUserIdError(true);
                }
                if (description === "") {
                    setDescriptionErrorMessage("* Please enter the Description.");
                    setDescriptionError(true);
                }
                if (groupName.length < 1) {
                    setGroupNameErrorMessage("* Please select atleast one group.");
                    setGroupNameError(true);
                }
                // Set the validation errors

                if (
                    userId !== null &&
                    description !== "" &&
                    groupName.length > 0
                ) {
                    const formState = {
                        "groupIds": groupName,
                        "userId": userId.userId,
                        "description": description,
                        "active": (status === "Active") ? true : false,
                        "loggedInUser": loggedInUser
                    };

                    console.log("User Form Data ===> ", formState);

                    axios.post('https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/createUserGroup',
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
                                    message: (response.data.code === "200.200") ? "User Group Created Successfully." : (response.data.message),
                                    open: true
                                })
                                const m = response.data.message;
                                if (response.data.code === "200.200") {
                                    setTimeout(() => {
                                        navigate("/account/role-app/view");
                                    }, 2000);
                                }
                                console.log(m);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    // set the errors
                    // setUserIdError(true);
                    // setDescriptionError(true);
                    // setGroupNameError(true);
                    // if (userId === null) {
                    //     setUserIdErrorMessage("* Please select any User from the list.");
                    //     setUserIdError(true);
                    // }
                    // if (description === "") {
                    //     setDescriptionErrorMessage("* Please enter the Description.");
                    //     setDescriptionError(true);
                    // }
                    // if (groupName.length < 1) {
                    //     setGroupNameErrorMessage("* Please select atleast one group.");
                    //     setGroupNameError(true);
                    // }
                    // set the errors

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
                            Add User Group
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

                <Box sx={{ flexGrow: 1, mt: 4 }}>
                    <Grid container spacing={
                        // Categorize according to small, medium, large screen
                        (windowSize[0] < 576) ? (0) : ((windowSize[0] < 768) ? (1) : ((windowSize[0] < 992) ? (2) : (3)))
                    }>

                        {/* Select one USER ID */}
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <Autocomplete
                                {...userIdDefaultProps}
                                id="userIdAutoComplete"
                                autoHighlight
                                value={userId}
                                onChange={(event, newValue) => {
                                    setUserId(newValue);
                                    if (userIdError) {
                                        setUserIdError(false);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={"Select User"}
                                        placeholder="Please select a User from the list"
                                        variant="outlined"
                                        helperText={(userIdError) ? (userIdErrorMessage) : ("")}
                                        error={userIdError}
                                    />
                                )}
                            />
                        </Grid>
                        {/* Select one USER ID */}

                        {/* Select one or more groups from the list */}
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <FormControl
                                sx={{
                                    width: "100%",
                                }}
                            >
                                {/* <FormLabel
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
                                >
                                    User Groups
                                </FormLabel> */}
                                <div>
                                    <FormControl sx={{
                                        // mt: 2,
                                        // width: {
                                        //     xs: 210, // theme.breakpoints.up('xs')
                                        //     sm: 300, // theme.breakpoints.up('sm')
                                        //     md: 340, // theme.breakpoints.up('md')
                                        //     lg: 340, // theme.breakpoints.up('lg')
                                        //     xl: 340, // theme.breakpoints.up('xl')
                                        // }
                                        width: "100%",
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
                                                    return <span
                                                        style={{
                                                            color: (groupNameError) ? ("red") : ("#818181")
                                                        }}
                                                    >Select groups</span>;
                                                }

                                                return selected.join(', ');
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            {
                                                (groupsList !== null) ? (
                                                    groupsList.map((groups: any, index: number) => (
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
                                        <FormHelperText
                                            sx={{
                                                color: "#f44336",
                                                // fontSize: {
                                                //     xs: 12, // theme.breakpoints.up('xs')
                                                //     sm: 12, // theme.breakpoints.up('sm')
                                                //     md: 14, // theme.breakpoints.up('md')
                                                //     lg: 14, // theme.breakpoints.up('lg')
                                                //     xl: 14, // theme.breakpoints.up('xl')
                                                // },
                                            }}
                                        >
                                            {(groupNameError) ? (groupNameErrorMessage) : ("")}
                                        </FormHelperText>
                                    </FormControl>
                                </div>
                            </FormControl>
                        </Grid>
                        {/* Select one or more groups from the list */}

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

                        {/* Description */}
                        <Grid item xs={12}>
                            <FormControl
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <FormLabel
                                    id="description"
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
                                    Description
                                </FormLabel>
                                <TextField
                                    id="description"
                                    label="Description"
                                    placeholder='Enter Description'
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    error={descriptionError}
                                    helperText={(descriptionError) ? (descriptionErrorMessage) : ("")}
                                    variant="outlined"
                                    value={description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                        if (descriptionError) {
                                            setDescriptionError(false);
                                        }
                                    }}
                                    sx={{
                                        width: "100%",
                                        mt: 2
                                    }}
                                />
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