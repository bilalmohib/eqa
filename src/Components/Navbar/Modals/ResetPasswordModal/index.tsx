import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

// importing from material ui
import {
    Box,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    IconButton,
} from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2";

// Importing icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import SnackBar from "../../../../Components/SnackBar";

// Importing Services Layer API
import { resetPassword } from "../../../../Service/ResetPassword";

import { useTranslation } from "react-i18next";

import styles from "./style.module.css";

interface ResetPasswordModalProps {
    openResetPasswordModal: boolean;
    setOpenResetPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;

    // Current Language
    currentLang: string;
    setCurrentLang: React.Dispatch<React.SetStateAction<string>>;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
    openResetPasswordModal,
    setOpenResetPasswordModal,

    // Current Language
    currentLang,
    setCurrentLang,
}) => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    // For handling errors of oldPassword, newPassword and confirmPassword
    const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

    // For handling show/hide password
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    ///////////////////////////////// Snackbar State /////////////////////////////////
    const [snackBarHandler, setSnackBarHandler] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    ///////////////////////////////// Snackbar State /////////////////////////////////

    const handleClickShowOldPassword = () =>
        setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () =>
        setShowNewPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    // For handling show/hide password

    const validateForm = () => {

        // {{{{{{{{{{{{{{{{{{{{ Change Password Policy }}}}}}}}}}}}}}}}}}}}
        // 1. Password must be at least 8 characters long.
        // 2. Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.
        // 3. Password must not contain any spaces.

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setSnackBarHandler({
                severity: "warning",
                open: true,
                message: "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character."
            });

            setNewPasswordError(true);
            setNewPassword("");
            setConfirmPassword("");

            return false;
        }

        if (oldPassword === "") {
            setOldPasswordError(true);
        }
        if (newPassword === "") {
            setNewPasswordError(true);
        }
        if (confirmPassword === "") {
            setConfirmPasswordError(true);
        }

        if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
            // setValidationStatusEmail(false);
            // setValidationStatusPassword(false);
            // alert("Please enter all the fields");
            setSnackBarHandler({
                severity: "warning",
                open: true,
                message: "Please enter all the fields"
            });
            return;
        } else if (newPassword !== confirmPassword) {
            setSnackBarHandler({
                severity: "warning",
                open: true,
                message: "New Password and Confirm Password should be same"
            });
            return;
        }
        else {
            let accessToken: any = Cookies.get("accessToken");

            if (accessToken === undefined || accessToken === null) {
                accessToken = null;
            }

            console.log(
                "Access Token in View All Apps Data ===> ",
                accessToken
            );

            if (accessToken !== null) {
                resetPassword(
                    {
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                    },
                    accessToken
                )
                    .then((response) => {
                        console.log("Presetation layer response: ", response);
                        setSnackBarHandler({
                            severity: (response === "OK") ? "success" : "warning",
                            open: true,
                            message: (response === "OK") ? `Password has been reset successfully` : "Please enter correct current password"
                        });
                        setTimeout(() => {
                            setOpenResetPasswordModal(false);
                        }, 3000);
                    })
                    .catch((error) => {
                        console.log("Error in response : ", error);
                        // setOldPassword("");
                        // setNewPassword("");
                        // setConfirmPassword("");
                        setSnackBarHandler({
                            severity: "error",
                            open: true,
                            message: error.message
                        });
                        return;
                    });
            }
            else {
                alert("Please login to change password");
                navigate("/login");
            }
        }
    }

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                        {t('Home.Header.Modals.ChangePassword.title')}
                    </Typography>
                    <Grid2
                        sx={{
                            mt: (windowDimensions.width < 400) ? 0 : 2,
                        }}
                        container
                        spacing={2}
                    >
                        <Grid2 xs={12} sm={12} md={6} lg={6} xl={6}>
                            <FormControl className={styles.formControlBox} sx={{ mt: 2.5 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="old-password-textfield">{t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.label')}</InputLabel>
                                <OutlinedInput
                                    id="old-password-textfield"
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    error={oldPasswordError}
                                    // dir="rtl"
                                    onChange={(e) => {
                                        if (oldPasswordError) {
                                            setOldPasswordError(false);
                                        }
                                        setOldPassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowOldPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={(oldPasswordError) ? `${t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.error')}` : `${t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.label')}`}
                                    placeholder={(oldPasswordError) ? `${t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.error')}` : `${t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.placeholder')}`}
                                />
                            </FormControl>
                            <FormControl className={styles.formControlBox} sx={{ mt: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="newPassword">{t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.label')}</InputLabel>
                                <OutlinedInput
                                    id="newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    error={newPasswordError}
                                    // dir="rtl"
                                    onChange={(e) => {
                                        if (newPasswordError) {
                                            setNewPasswordError(false);
                                        }
                                        setNewPassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={(newPasswordError) ? `${t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.error')}` : `${t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.label')}`}
                                    placeholder={(newPasswordError) ? `${t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.error')}` : `${t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.placeholder')}`}
                                />
                            </FormControl>
                            <FormControl className={styles.formControlBox} sx={{ mt: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="ConfirmPassword">{t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.label')}</InputLabel>
                                <OutlinedInput
                                    id="ConfirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    error={confirmPasswordError}
                                    // dir="rtl"
                                    onChange={(e) => {
                                        if (confirmPasswordError) {
                                            setConfirmPasswordError(false);
                                        }
                                        setConfirmPassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={(confirmPasswordError) ? `${t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.error')}` : `${t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.label')}`}
                                    placeholder={(confirmPasswordError) ? `${t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.error')}` : `${t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.placeholder')}`}
                                />
                            </FormControl>
                        </Grid2>
                        <Grid2 xs={12} sm={12} md={6} lg={6} xl={6}>
                            <Typography className={styles.resetPasswordPolicy} sx={{ mt: 2 }}>
                                {t('Home.Header.Modals.ChangePassword.policy.title')}
                            </Typography>
                            <Typography sx={{ mt: 2 }} className={`${styles.passwordPolicyPoints}`}>
                                {t('Home.Header.Modals.ChangePassword.policy.Points.Point1')}
                            </Typography>
                            <Typography sx={{ mt: 2 }} className={`${styles.passwordPolicyPoints}`}>
                                {t('Home.Header.Modals.ChangePassword.policy.Points.Point2')}
                            </Typography>
                            <Typography sx={{ mt: 2 }} className={`${styles.passwordPolicyPoints}`}>
                                {t('Home.Header.Modals.ChangePassword.policy.Points.Point3')}
                            </Typography>
                        </Grid2>
                    </Grid2>
                    <Box className={styles.buttonsContainer}>
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
                            {t('Home.Header.Modals.ChangePassword.policy.Buttons.ChangePassword')}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            size="large"
                            className={styles.cancelButton}
                            sx={{
                                //backgroundColor: "#e79f43",
                                mt: 2,
                                // textTransform: "none",
                                // "&:hover": {
                                //     backgroundColor: "#e79f43",
                                // }
                            }}
                            onClick={() => setOpenResetPasswordModal(false)}
                        >
                            {t('Home.Header.Modals.ChangePassword.policy.Buttons.Cancel')}
                        </Button>
                    </Box>
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
                </Box>
            </Fade>
        </Modal>
    )
}
export default ResetPasswordModal;