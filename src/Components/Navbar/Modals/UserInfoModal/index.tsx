// importing from material ui
import {
    Box,
    Button,
    Typography,
    Modal,
    Backdrop,
    Fade
} from "@mui/material";

import styles from "./style.module.css";

interface UserInfoModalProps {
    openUserInfoModal: boolean,
    setOpenUserInfoModal: any,
}

const UserInfoModal = ({
    openUserInfoModal,
    setOpenUserInfoModal
}: UserInfoModalProps) => {

    const user = {
        name: "Md Shabbir Hossain",
        email: "shabbirHussain@gmail.com",
        phone: "+880 1711 111 111",
        address: "Dhaka, Bangladesh",
        image: "https://i.pravatar.cc/150?img=32",
        role: "Admin",
        status: "Active",
        lastLogin: "2021-08-01 12:00:00",
        createdAt: "2021-08-01 12:00:00",
        updatedAt: "2021-08-01 12:00:00",
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openUserInfoModal}
            onClose={() => setOpenUserInfoModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openUserInfoModal}>
                <Box className={styles.modalStyle}>
                    <Typography className={styles.transition_modal_title} variant="h4" component="h2">
                        Profile Information
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Name</b> : {user.name}
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Email</b> : {user.email}
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Role</b> : {user.role}
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Created At</b> : {user.createdAt}
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Phone</b> : {user.phone}
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Address</b> : {user.address}
                    </Typography>
                    <Typography className={styles.transition_modal_title} sx={{ mt: 2 }}>
                        <b>Status</b> : {user.status}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}
export default UserInfoModal;