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

import { useTranslation } from "react-i18next";

import styles from "./style.module.css";

interface ResetPasswordModalProps {
    openResetPasswordModal: boolean,
    setOpenResetPasswordModal: any,

    // Current Language
    currentLang: string,
    setCurrentLang: any
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
    openResetPasswordModal,
    setOpenResetPasswordModal,

    // Current Language
    currentLang,
    setCurrentLang
}) => {
    const { t } = useTranslation();

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
                                    type={showPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    // dir="rtl"
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
                                    label={`${t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.label')}`}
                                    placeholder={`${t('Home.Header.Modals.ChangePassword.policy.Inputs.OldPassword.placeholder')}`}
                                />
                            </FormControl>
                            <FormControl className={styles.formControlBox} sx={{ mt: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="newPassword">{t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.label')}</InputLabel>
                                <OutlinedInput
                                    id="newPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    // dir="rtl"
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
                                    label={`${t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.label')}`}
                                    placeholder={`${t('Home.Header.Modals.ChangePassword.policy.Inputs.NewPassword.placeholder')}`}
                                />
                            </FormControl>
                            <FormControl className={styles.formControlBox} sx={{ mt: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="ConfirmPassword">{t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.label')}</InputLabel>
                                <OutlinedInput
                                    id="ConfirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    // dir="rtl"
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
                                    label={`${t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.label')}`}
                                    placeholder={`${t('Home.Header.Modals.ChangePassword.policy.Inputs.ConfirmPassword.placeholder')}`}
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
                </Box>
            </Fade>
        </Modal>
    )
}
export default ResetPasswordModal;