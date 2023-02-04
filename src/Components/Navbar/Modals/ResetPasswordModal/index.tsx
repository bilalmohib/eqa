import * as React from "react";
import { useState, useEffect } from "react";

// importing from material ui
import {
    Box,
    Typography,
    Modal,
    Backdrop,
    Fade,
    TextField,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton
} from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

// Importing icons 
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Importing Services Layer API
import { resetPassword } from '../../../../Service/ResetPassword';

import styles from "./style.module.css";

interface ResetPasswordModalProps {
    openResetPasswordModal: boolean,
    setOpenResetPasswordModal: any,
}

const ResetPasswordModal = ({
    openResetPasswordModal,
    setOpenResetPasswordModal
}: ResetPasswordModalProps) => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    // For handling show/hide password
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // For handling show/hide password


    const validateForm = () => {
        alert("Validating Form");
        //   setValidateNow(true);
        if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
            // setValidationStatusEmail(false);
            // setValidationStatusPassword(false);
            alert("Please enter all the fields");
            return;
        } else {
            const apiKey = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGFiYmlyIiwiZXhwIjoxNjc1NTk5MDg3LCJpYXQiOjE2NzU1MTI2ODd9.ju77mMNz7aupL4ZP-YGj5_D0mH_UlGhVj2K1uf8St2H3uUtUxIGMRsy-2-JbRV494GTxauirsQDopLYRmytXPA";
            // console.log("Presentation Layer Response: ", email);
            resetPassword({
                "oldPassword": oldPassword,
                "newPassword": newPassword,
            }, apiKey).then(response => {
                console.log("Presetation layer response: ", response);
                if (response === 'SUCCESS') {
                    alert("Password Reset Successfully");
                    // setValidationStatusEmail(true);
                    // setValidationStatusPassword(true);
                    // alert("Validated Correctly");
                    // navigate("/dashboard/assessment");
                }
            }).catch(error => {
                console.log("Error in response : ", error);
                // else if (response === 'FAILED') {
                // setValidateNow(false);
                // setValidationStatusEmail(false);
                // setValidationStatusPassword(false);
                // Clearing the fields
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                alert("Invalid Credentials");
                return;
            });
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openResetPasswordModal}
            onClose={() => setOpenResetPasswordModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openResetPasswordModal}>
                <Box className={styles.modalStyle}>
                    <Typography className={styles.transition_modal_title} variant="h4" component="h2">
                        Reset Password
                    </Typography>
                    {/* <Typography className={styles.transition_modal_reset} sx={{ mt: 2 }}>
                        Enter your old password and new password to reset your password.
                    </Typography> */}
                    {/* <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id="old-password-textfield"
                        label="Old Password"
                        // placeholder="Enter your old password"
                        variant="outlined"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    /> */}
                    <Grid2
                        sx={{ mt: 2 }}
                        container
                        spacing={2}
                    >
                        <Grid2 xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormControl sx={{ mt: 2.5 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="old-password-textfield">Old Password</InputLabel>
                                <OutlinedInput
                                    id="old-password-textfield"
                                    type={showPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Old Password"
                                    placeholder="Old Password"
                                />
                            </FormControl>
                            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                                <OutlinedInput
                                    id="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="New Password"
                                    placeholder="New Password"
                                />
                            </FormControl>
                            <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="ConfirmPassword">Confirm New Password</InputLabel>
                                <OutlinedInput
                                    id="ConfirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm New Password"
                                    placeholder="Confirm New Password"
                                />
                            </FormControl>
                        </Grid2>
                        <Grid2 xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography className={styles.resetPasswordPolicy} sx={{ mt: 2 }}>
                                Reset Password Policy
                            </Typography>
                            <Typography sx={{ mt: 0 }} className="text-left">
                                1. Password must be at least 8 characters long.
                            </Typography>
                            <Typography sx={{ mt: 0 }} className="text-left">
                                2. Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.
                            </Typography>
                            <Typography sx={{ mt: 0 }} className="text-left">
                                3. Password must not contain any spaces.
                            </Typography>
                            <Typography sx={{ mt: 0 }} className="text-left">
                                {/* 4. Password must not contain any of the following characters: < > & # % $ ^ * ( ) + = { } [ ] | \ : ; " ' , . ? / ~ ` ! @ */}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Box className="d-flex">
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                backgroundColor: "#e79f43",
                                mt: 2,
                                // textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#e79f43",
                                }
                            }}
                            onClick={() => validateForm()}
                        >
                            Reset Password
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            size="large"
                            sx={{
                                //backgroundColor: "#e79f43",
                                mt: 2,
                                ml: 2,
                                // textTransform: "none",
                                // "&:hover": {
                                //     backgroundColor: "#e79f43",
                                // }
                            }}
                            onClick={() => setOpenResetPasswordModal(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
export default ResetPasswordModal;