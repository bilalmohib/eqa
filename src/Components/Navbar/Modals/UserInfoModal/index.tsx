import * as React from "react";
import { useState, useEffect, FC } from "react";

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

import { useTranslation } from "react-i18next";

import profileImage from "../../../../assets/Images/Navbar/Modal/ProfileInfo/logo.png";

import styles from "./style.module.css";
import { cu } from "@fullcalendar/core/internal-common";

interface UserInfoModalProps {
    openUserInfoModal: boolean,
    setOpenUserInfoModal: any,

    // Current Language
    currentLang: string,
    setCurrentLang: any
}

const UserInfoModal: FC<UserInfoModalProps> = ({
    openUserInfoModal,
    setOpenUserInfoModal,

    // Current Language
    currentLang,
    setCurrentLang
}) => {
    const { t } = useTranslation();

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

    const instructorTitle = t('Home.Header.Modals.ProfileModal.Instructor.title');
    const instructorValue = t('Home.Header.Modals.ProfileModal.Instructor.value');

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
                                            instructorValue,
                                        1000,
                                            instructorTitle
                                            ,
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
                                {t('Home.Header.Modals.ProfileModal.Role.title')} : {t('Home.Header.Modals.ProfileModal.Role.value')}
                            </Typography>
                        </Box>
                    </Box>
                    {/* Modal Body */}
                    <Box className={styles.modalBody}>
                        <Grid container spacing={2}>
                            <Grid item
                                xl={12} lg={12} md={12} sm={12} xs={12}
                            >
                                <Typography
                                    className={styles.modalBodyTitle}
                                    dir={currentLang === "ar" ? "rtl" : "ltr"}
                                >
                                    <Box
                                        className={styles.modalBodyTitleIcon}
                                        dir={currentLang === "ar" ? "rtl" : "ltr"}
                                    >
                                        <Box>
                                            <SchoolIcon sx={{
                                                marginRight: 2, width: 20,
                                                height: 20
                                            }} />
                                        </Box>
                                        <Box sx={{
                                            width: (currentLang === "ar" ? 35 : 70),
                                            // border: "1px solid red"
                                        }}>
                                            <b>{t('Home.Header.Modals.ProfileModal.College.title')}</b>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ pl: 1 }}>
                                            {t('Home.Header.Modals.ProfileModal.College.value')}
                                        </Box>
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item
                                xl={6} lg={6} md={6} sm={
                                    windowDimensions.width > 730 ? 6 : 12
                                } xs={12}
                            >
                                <Typography
                                    className={styles.modalBodyTitle}
                                    dir={currentLang === "ar" ? "rtl" : "ltr"}
                                >
                                    <Box
                                        className={styles.modalBodyTitleIcon}
                                        dir={currentLang === "ar" ? "rtl" : "ltr"}
                                    >
                                        <Box>
                                            <ApartmentIcon sx={{
                                                marginRight: 2.2, width: 20,
                                                height: 20
                                            }}
                                            />
                                        </Box>
                                        <Box sx={{
                                            width: (currentLang === "ar" ? (70) : (75)),
                                            // border: "1px solid red"
                                        }}>
                                            <b>{t('Home.Header.Modals.ProfileModal.Campus.title')}</b>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ pl: 1 }}>
                                            {t('Home.Header.Modals.ProfileModal.Campus.value')}
                                        </Box>
                                    </Box>
                                </Typography>
                                <Typography
                                    className={styles.modalBodyTitle}
                                    dir={currentLang === "ar" ? "rtl" : "ltr"}
                                >
                                    <Box
                                        className={styles.modalBodyTitleIcon}
                                        dir={currentLang === "ar" ? "rtl" : "ltr"}
                                    >
                                        <Box>
                                            <EngineeringIcon sx={{
                                                marginRight: 2, width: 20,
                                                height: 20
                                            }} />
                                        </Box>
                                        <Box sx={{
                                            width: ((currentLang === "ar") ? (40) : (100)),
                                            // border: "1px solid red"
                                        }}>
                                            <b>{t('Home.Header.Modals.ProfileModal.Designation.title')}</b>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ pl: 1 }}>
                                            {t('Home.Header.Modals.ProfileModal.Designation.value')}
                                        </Box>
                                    </Box>
                                </Typography>
                                <Typography
                                    className={styles.modalBodyTitle}
                                    dir={currentLang === "ar" ? "rtl" : "ltr"}
                                >
                                    <Box
                                        className={styles.modalBodyTitleIcon}
                                        dir={currentLang === "ar" ? "rtl" : "ltr"}
                                    >
                                        <Box>
                                            <PhoneAndroidIcon sx={{
                                                marginRight: 2.2, width: 20,
                                                height: 20
                                            }} />
                                        </Box>
                                        <Box sx={{
                                            width: ((currentLang === "ar") ? (36) : (60)),
                                            // border: "1px solid red"
                                        }}>
                                            <b>{t('Home.Header.Modals.ProfileModal.Phone.title')}</b>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ pl: 1 }}>
                                            {t('Home.Header.Modals.ProfileModal.Phone.value')}
                                        </Box>
                                    </Box>
                                </Typography>
                                <Typography
                                    className={styles.modalBodyTitle}
                                    dir={currentLang === "ar" ? "rtl" : "ltr"}
                                >
                                    <Box
                                        className={styles.modalBodyTitleIcon}
                                        dir={currentLang === "ar" ? "rtl" : "ltr"}
                                    >
                                        <Box>
                                            <HistoryIcon sx={{
                                                marginRight: 2.2, width: 20,
                                                height: 20
                                            }} />
                                        </Box>
                                        <Box sx={{
                                            width: ((currentLang === "ar") ? (95) : (90)),
                                            // border: "1px solid red"
                                        }}>
                                            <b>{t('Home.Header.Modals.ProfileModal.LastLogin.title')}</b>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ pl: 1 }}>
                                            {t('Home.Header.Modals.ProfileModal.LastLogin.value')}
                                        </Box>
                                    </Box>
                                </Typography>
                            </Grid>
                            <Grid item
                                xl={6} lg={6} md={6} sm={
                                    windowDimensions.width > 730 ? 6 : 12
                                } xs={12}
                            >
                                <Typography
                                    className={styles.modalBodyTitle}
                                    dir={currentLang === "ar" ? "rtl" : "ltr"}
                                >
                                    <Box
                                        className={styles.modalBodyTitleIcon}
                                        dir={currentLang === "ar" ? "rtl" : "ltr"}
                                    >
                                        <Box>
                                            <AccountBalanceIcon sx={{
                                                marginRight: 2.4, width: 20,
                                                height: 20
                                            }} />
                                        </Box>
                                        <Box sx={{
                                            width: ((currentLang === "ar") ? (35) : (100)),
                                            // border: "1px solid red"
                                        }}>
                                            <b>{t('Home.Header.Modals.ProfileModal.Department.title')}</b>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ pl: 1 }}>
                                            {t('Home.Header.Modals.ProfileModal.Department.value')}
                                        </Box>
                                    </Box>
                                </Typography>
                                <Box
                                    sx={{
                                        marginTop: 3
                                    }}
                                >
                                    <Typography className={styles.modalBodySocial}>
                                        <Box className="d-flex">
                                            <Box>
                                                <LinkedInIcon
                                                    sx={{
                                                        fontSize: 30,
                                                        color: "#0A66C2"
                                                    }}
                                                    color="primary"
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box sx={{ pl: 2, pt: 0.5 }}>
                                                {t('Home.Header.Modals.ProfileModal.Linkedin.value')}
                                            </Box>
                                        </Box>
                                    </Typography>
                                    <Typography className={styles.modalBodySocial}>
                                        <Box className="d-flex">
                                            <Box>
                                                <TwitterIcon
                                                    sx={{
                                                        fontSize: 30,
                                                        color: "#00acee"
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box sx={{ pl: 2, pt: 0.5 }}>
                                                {t('Home.Header.Modals.ProfileModal.Twitter.value')}
                                            </Box>
                                        </Box>
                                    </Typography>
                                    <Typography className={styles.modalBodySocial}>
                                        <Box className="d-flex">
                                            <Box>
                                                <FacebookIcon
                                                    sx={{
                                                        fontSize: 30,
                                                        color: "#3b5998"
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box sx={{ pl: 2, pt: 0.5 }}>
                                                {t('Home.Header.Modals.ProfileModal.Facebook.value')}
                                            </Box>
                                        </Box>
                                    </Typography>
                                </Box>
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
                            {t('Home.Header.Modals.ProfileModal.Buttons.Edit')}
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            sx={{
                                marginLeft: (currentLang === "ar" ? "0px" : "20px"),
                                marginRight: (currentLang === "ar" ? "20px" : "0px")
                            }}
                            className={styles.modalFooterButton}
                            onClick={() => setOpenUserInfoModal(false)}
                        >
                            {t('Home.Header.Modals.ProfileModal.Buttons.Close')}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}
export default UserInfoModal;