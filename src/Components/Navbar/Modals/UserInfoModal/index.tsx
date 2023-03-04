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

    // Data from Local Storage for logged in user
    const user = JSON.parse(localStorage.getItem('user') || '{}');

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
                                        user.fullName,
                                        1000,
                                        user.Designataion,
                                        1000
                                    ]}
                                    speed={10} // Custom Speed from 1-99 - Default Speed: 40
                                    wrapper="span" // Animation will be rendered as a <span>
                                    repeat={Infinity} // Repeat this Animation Sequence infinitely
                                />

                            </Typography>
                            <Typography className={styles.headerEmail}>
                                {user.Email}
                            </Typography>
                            <Typography className={styles.headerSubInfo}>
                                {t('Home.Header.Modals.ProfileModal.Designation.title')}&nbsp;{user.Designataion}
                                {/* {t('Home.Header.Modals.ProfileModal.Role.value')} */}
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
                                            {/* {t('Home.Header.Modals.ProfileModal.College.value')} */}
                                            {user.College}
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
                                            {/* {t('Home.Header.Modals.ProfileModal.Campus.value')} */}
                                            {user.Campus}
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
                                            {/* {t('Home.Header.Modals.ProfileModal.Designation.value')} */}
                                            {user.Designataion}
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
                                            {/* {t('Home.Header.Modals.ProfileModal.Phone.value')} */}
                                            {user.Phone}
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
                                            {/* {t('Home.Header.Modals.ProfileModal.LastLogin.value')} */}
                                            {user.LastLogin}
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
                                            {/* {t('Home.Header.Modals.ProfileModal.Department.value')} */}
                                            {user.Department}
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
                                                {/* {t('Home.Header.Modals.ProfileModal.Linkedin.value')} */}
                                                {user.userName}
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
                                                {/* {t('Home.Header.Modals.ProfileModal.Twitter.value')} */}
                                                {user.userName}
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
                                                {/* {t('Home.Header.Modals.ProfileModal.Facebook.value')} */}
                                                {user.userName}
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