// importing from material ui
import {
    Box,
    Typography,
    Modal,
    Backdrop,
    Fade,
    TextField,
    Button
} from "@mui/material";

import styles from "./style.module.css";

interface ResetPasswordModalProps {
    openResetPasswordModal: boolean,
    setOpenResetPasswordModal: any,
}

const ResetPasswordModal = ({
    openResetPasswordModal,
    setOpenResetPasswordModal
}: ResetPasswordModalProps) => {

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
                    <Typography className={styles.transition_modal_reset} sx={{ mt: 2 }}>
                        Enter your old password and new password to reset your password.
                    </Typography>
                    <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id="outlined-basic"
                        label="Old Password"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id="outlined-basic"
                        label="New Password"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id="outlined-basic"
                        label="Confirm Password"
                        variant="outlined"
                    />
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