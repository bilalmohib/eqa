// importing from material ui
import {
    Box,
    Button,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Grid
} from "@mui/material";

import { TypeAnimation } from 'react-type-animation';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

// User Icons 
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HistoryIcon from '@mui/icons-material/History';
// User Icons

import profileImage from "../../../../assets/Images/Navbar/Modal/ProfileInfo/logo.png";

import styles from "./style.module.css";

interface UserInfoModalProps {
    openUserInfoModal: boolean,
    setOpenUserInfoModal: any,
}

const UserInfoModal = ({
    openUserInfoModal,
    setOpenUserInfoModal
}: UserInfoModalProps) => {

    const userData = {
        name: "Md Shabbir Hossain",
        email: "shabbirHussain@gmail.com",
        phone: "+880 1711 111 111",
        address: `
            House # 1, Road # 1, Block # A,
            Banani, Dhaka, Bangladesh
            `,
        college: "College of Computers and Information Technology",
        department: "Computer Science",
        campus: "Dhanmondi",
        image: "https://i.pravatar.cc/150?img=32",
        role: "Admin",
        status: "Active",
        lastLogin: "2021-08-01 12:00:00",
        createdAt: "2021-08-01 12:00:00",
        updatedAt: "2021-08-01 12:00:00",
        job: "Software Engineer",
        linked: {
            link: "https://www.linkedin.com/in/md-shabbir-hossain-0b1b8b1b3/",
            name: "Steve.Cohen"
        },
        twitter: {
            link: "https://twitter.com/SteveCohen",
            name: "stevecohen"
        },
        facebook: {
            link: "https://www.skype.com/en/",
            name: "steve"
        }
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
                    <Box className={styles.modalHeader}>
                        <Box className={styles.modalHeaderLeft}>
                            <img
                                src={profileImage}
                                alt="User Profile"
                                title="User Profile"
                                width={130}
                                height={130}
                                className={styles.userImage}
                            />
                        </Box>
                        <Box className={styles.modalHeaderRight}>
                            <Typography className={styles.headerName}>

                                <TypeAnimation
                                    // Same String at the start will only be typed once, initially
                                    sequence={[
                                        'Steve Cohen',
                                        1000,
                                        'Instructor',
                                        1000
                                    ]}
                                    speed={10} // Custom Speed from 1-99 - Default Speed: 40
                                    wrapper="span" // Animation will be rendered as a <span>
                                    repeat={Infinity} // Repeat this Animation Sequence infinitely
                                />


                            </Typography>
                            <Typography className={styles.headerEmail}>
                                steveCohan@gmail.com
                            </Typography>
                            <Typography className={styles.headerSubInfo}>
                                Role : Admin
                            </Typography>
                        </Box>
                    </Box>
                    {/* Modal Body */}
                    <Box className={styles.modalBody}>
                        <Grid container spacing={2}>
                            <Grid item
                                xl={12} lg={12} md={12} sm={12} xs={12}
                            >
                                <Typography className={styles.modalBodyTitle}>
                                    <SchoolIcon sx={{
                                        marginRight: 2,
                                        width: 20,
                                        height: 20
                                    }} /><b>College</b> :
                                    &nbsp;{userData.college}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={styles.modalBodyTitle}>
                                    <ApartmentIcon sx={{
                                        marginRight: 2.2, width: 20,
                                        height: 20
                                    }} /><b>Campus</b> : {userData.campus}
                                </Typography>
                                <Box
                                    sx={{
                                        marginTop: 3
                                    }}
                                >
                                    <Typography className={styles.modalBodySocial}>
                                        <LinkedInIcon
                                            sx={{
                                                fontSize: 30,
                                                color: "#0A66C2"
                                            }}
                                            color="primary"
                                        />
                                        &nbsp; &nbsp; &nbsp;
                                        {userData.linked.name}
                                    </Typography>
                                    <Typography
                                        className={styles.modalBodySocial}>
                                        <TwitterIcon
                                            sx={{
                                                fontSize: 30,
                                                color: "#00acee"
                                            }}
                                        />
                                        &nbsp; &nbsp; &nbsp;
                                        {userData.twitter.name}
                                    </Typography>
                                    <Typography className={styles.modalBodySocial}>
                                        <FacebookIcon
                                            sx={{
                                                fontSize: 30,
                                                color: "#3b5998"
                                            }}
                                        />
                                        &nbsp; &nbsp; &nbsp;
                                        {userData.facebook.name}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={styles.modalBodyTitle}>
                                    <AccountBalanceIcon sx={{
                                        marginRight: 2.4,
                                        width: 20,
                                        height: 20
                                    }} />
                                    <b>Department</b> : {userData.department}
                                </Typography>
                                <Typography className={styles.modalBodyTitle}>
                                    <EngineeringIcon sx={{
                                        marginRight: 2,
                                        width: 20,
                                        height: 20
                                    }} /> <b>Designation</b> : {userData.job}
                                </Typography>
                                <Typography className={styles.modalBodyTitle}>
                                    <PhoneAndroidIcon
                                        sx={{
                                            marginRight: 2.2,
                                            width: 20,
                                            height: 20
                                        }} />  <b>Phone</b> : {userData.phone}
                                </Typography>
                                <Typography className={styles.modalBodyTitle}>
                                    <HistoryIcon
                                        sx={{
                                            marginRight: 2.2,
                                            width: 20,
                                            height: 20
                                        }} /> <b>Last Login</b> : {userData.lastLogin}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* Modal Body */}
                    <Box className={styles.modalFooter}>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                backgroundColor: "#e79f43",
                                color: "#fff",
                                // textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#e79f43",
                                }
                            }}
                            className={styles.modalFooterButton}
                        >
                            Edit
                        </Button>
                        {/* <Button
                            variant="contained"
                            color="error"
                            className={styles.modalFooterButton}
                        >
                            Delete
                        </Button> */}
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            sx={{
                                marginLeft: "20px",
                            }}
                            className={styles.modalFooterButton}
                            onClick={() => setOpenUserInfoModal(false)}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
export default UserInfoModal;