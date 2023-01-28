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
    Radio
} from '@mui/material';

import styles from "./style.module.css";

const percentage = 30;

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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        // padding: theme.spacing(1),
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
    }));

    const navigate = useNavigate();

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

    interface FilmOptionType {
        title: string;
        year: number;
    }

    const top100Films: FilmOptionType[] = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 }
    ];

    // For autocomplete component
    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option: FilmOptionType) => option.title,
    };
    const flatProps = {
        options: top100Films.map((option) => option.title),
    };
    const [value, setValue] = useState<FilmOptionType | null>(null);
    // For autocomplete component

    // For checkbox
    const [checked, setChecked] = useState(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    // For checkbox

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
    const error = [group1, group2].filter((v) => v).length !== 2;
    // Assign group checkboxes

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
                                helperText=""
                                margin="normal"
                                fullWidth // t
                            // InputProps={{
                            // }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="groupDescriptionTextField"
                                label="Description"
                                placeholder="Enter group description"
                                variant="standard"
                                helperText=""
                                margin="normal"
                                fullWidth // t
                            // InputProps={{
                            // }}
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
                                >
                                    <FormControlLabel
                                        value="active"
                                        control={<Radio />}
                                        label="Active"
                                    />
                                    <FormControlLabel
                                        value="deactive"
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
            >
                <Typography style={{ display: "block" }}>Submit</Typography>
            </Button>

            <br /><br /> <br />
        </Box>
    )
}
export default AddGroup;