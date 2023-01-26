import { useState, useEffect } from "react";

import { useNavigate } from "react-router";

// Importing Icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

// Importing material ui components
import {
    Button,
    Box,
    Typography
} from '@mui/material';


import styles from "./style.module.css";
// import "./style.css";

const percentage = 30;

interface UserProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
}

const AddUser: React.FC<UserProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {

    const navigate = useNavigate();

    const currentFormatedDate: string = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const styleFirstRowCB = {
        marginBottom: 24,
        marginLeft: -36,
        marginRight: -36,
    };

    const styleForResponsiveFirstRowCB = {
        marginBottom: 0,
        marginLeft: -36,
        marginRight: -36,
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <div
            className={`${styles.container} ${(windowSize[0] < 991 && isOpen) ? ("bgMobileOnSideOpen") : ("")}`}
            onClick={() => {
                if ((windowSize[0] < 991) && isOpen)
                    setIsOpen(false);
            }}
        >
            <div style={{ marginTop: 5 }} className={`${(windowSize[0] > 990) ? ("d-flex justify-content-between") : ("d-flex flex-column justify-content-start")}`}>
                <div>
                    EQA / User Management / Users / <span style={{ color: "#4f747a" }}> Add Users </span>
                </div>
                <div>
                    <span style={{ color: "#4f747a", paddingRight: 10 }}>{currentFormatedDate}</span>
                </div>
            </div>

            <hr />

            <Box sx={{
                border: "1px solid red",
                display: "flex",
            }}>
                <Box sx={{
                    border: "1px solid black",
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    backgroundColor: "#4f747a",
                }}>
                    <PeopleOutlineIcon sx={{ color: "#4f747a", fontSize: 40 }} />
                </Box>
                <Box sx={{ ml: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Add User
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#4f747a" }}>
                        Add a new user to the system
                    </Typography>
                </Box>
            </Box>

        </div>
    )
}
export default AddUser;