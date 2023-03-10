import * as React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

// import Cookies from "js-cookie";

// importing from material ui
import {
    Box,
    Typography,
    Modal,
    Backdrop,
    Fade,
    Button,
    // FormControl,
    // InputLabel,
    // InputAdornment,
    // OutlinedInput,
    // IconButton,
} from "@mui/material";

import Grid2 from "@mui/material/Unstable_Grid2";

// Importing icons
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useTranslation } from "react-i18next";

//Importing Components
// (1) Importing the UpdateUser component
import UpdateUser from "../../Pages/Home/UserManagement/Users/UpdateUser";
// (2) Importing the UpdateRole component
import UpdateRole from "../../Pages/Home/UserManagement/Roles/UpdateRole";
// (3) Importing the UpdateUserGroup component
import UpdateUserGroup from "../../Pages/Home/UserManagement/UserGroup/UpdateUserGroup";
// (4) Importing the UpdateGroup component
import UpdateGroup from "../../Pages/Home/UserManagement/Groups/UpdateGroup";
// (5) Importing the UpdateRoleApp component
import UpdateRoleApp from "../../Pages/Home/UserManagement/RoleAppPrivilege/UpdateRoleApp";
// (6) Importing the UpdateAppForm component
import UpdateAppForm from "../../Pages/Home/UserManagement/AppForm/UpdateAppForm";
// (7) Importing the UpdateApp component
import UpdateApp from "../../Pages/Home/UserManagement/Application/UpdateApp";
// (8) Importing the UpdateGroupRole component
import UpdateGroupRole from "../../Pages/Home/UserManagement/GroupRole/UpdateGroupRole";

import styles from "./style.module.css";

interface EditTableModalModalProps {
    openResetPasswordModal: boolean;
    setOpenResetPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
    originalValues: any;
    columnName: string;
    // Current Language
    // currentLang: string;
}

const EditTableModal: React.FC<EditTableModalModalProps> = ({
    openResetPasswordModal,
    setOpenResetPasswordModal,
    originalValues,
    columnName
    // // Current Language
    // currentLang,
}) => {
    const { t } = useTranslation();

    // const navigate = useNavigate();

    const validateForm = () => {
        // alert("Validating Form");
        //   setValidateNow(true);

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

    let modalContent = null;

    if (columnName === "ViewUsers") {
        modalContent = <UpdateUser
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewRoles") {
        modalContent = <UpdateRole
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewGroups") {
        modalContent = <UpdateGroup
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewApps") {
        modalContent = <UpdateApp
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewAppForm") {
        modalContent = <UpdateAppForm
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewGroupRole") {
        modalContent = <UpdateGroupRole
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewUserGroup") {
        modalContent = <UpdateUserGroup
            currentLang={""}
            originalValues={originalValues}
        />
    } else if (columnName === "ViewRoleApp") {
        modalContent = <UpdateRoleApp
            currentLang={""}
            originalValues={originalValues}
        />
    }
    else {
        modalContent = <UpdateUser
            currentLang={""}
            originalValues={originalValues}
        />
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
                <Box className={styles.modalStyle}
                    sx={{
                        height: (columnName === "ViewUsers") ? "90vh" :
                            (columnName === "ViewRoles") ? "fit-content" :
                                (columnName === "ViewGroups") ? "auto" :
                                    (columnName === "ViewApps") ? "auto" :
                                        (columnName === "ViewAppForm") ? "auto" :
                                            (columnName === "ViewGroupRole") ? "auto" :
                                                (columnName === "ViewUserGroup") ? "auto" :
                                                    (columnName === "ViewRoleApp") ? "auto" :
                                                        "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #54787e",
                            width: "100%"
                        }}
                    >
                        <Typography className={styles.transition_modal_title} variant="h4" component="h2">
                            {/* {t('Home.Header.Modals.ChangePassword.title')} */}
                            {(columnName === "ViewUsers") ? (
                                "Update User"
                            ) : (columnName === "ViewRoles") ? (
                                "Update Role"
                            ) : (columnName === "ViewGroups") ? (
                                "Update Group"
                            ) : (columnName === "ViewApps") ? (
                                "Update App"
                            ) : (columnName === "ViewAppForm") ? (
                                "Update App Form"
                            ) : (columnName === "ViewGroupRole") ? (
                                "Update Group Role"
                            ) : (columnName === "ViewUserGroup") ? (
                                "Update User Group"
                            ) : (columnName === "ViewRoleApp") ? (
                                "Update Role App"
                            ) :
                                (
                                    ""
                                )}
                        </Typography>
                        <Box>
                            <CancelIcon
                                sx={{
                                    // color: "#e79f43",
                                    color: "#332D2D",
                                    fontSize: "2rem",
                                    cursor: "pointer",
                                }}
                                onClick={() => setOpenResetPasswordModal(false)}
                            />
                        </Box>
                    </Box>
                    <Grid2
                        sx={{
                            mt: (windowDimensions.width < 400) ? 0 : 2,
                        }}
                        container
                        spacing={2}
                    >
                        <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
                            {/* {modalContent} */}
                            <Box
                                className={styles.modalContent}
                                sx={{
                                    height: (columnName === "ViewUsers") ? "70vh" :
                                        (columnName === "ViewRoles") ? "fit-content" :
                                            (columnName === "ViewGroups") ? "auto" :
                                                (columnName === "ViewApps") ? "auto" :
                                                    (columnName === "ViewAppForm") ? "auto" :
                                                        (columnName === "ViewGroupRole") ? "auto" :
                                                            (columnName === "ViewUserGroup") ? "auto" :
                                                                (columnName === "ViewRoleApp") ? "auto" :
                                                                    "auto",
                                }}
                            >
                                {modalContent}
                            </Box>
                        </Grid2>
                    </Grid2>
                    <Box className={styles.buttonsContainer}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "40%",
                            }}
                        >

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    // backgroundColor: "#e79f43",
                                    backgroundColor: "#3c6766",
                                    // mt: 2,
                                    // textTransform: "none",
                                    "&:hover": {
                                        // backgroundColor: "#e79f43",
                                        backgroundColor: "#3c6766",
                                    }
                                }}
                                onClick={() => validateForm()}
                            >
                                {/* {t('Home.Header.Modals.ChangePassword.policy.Buttons.ChangePassword')} */}
                                {(columnName === "ViewUsers") ? (
                                    "Update User"
                                ) : (columnName === "ViewRoles") ? (
                                    "Update Role"
                                ) : (columnName === "ViewGroups") ? (
                                    "Update Group"
                                ) : (columnName === "ViewApps") ? (
                                    "Update App"
                                ) : (columnName === "ViewAppForm") ? (
                                    "Update App Form"
                                ) : (columnName === "ViewGroupRole") ? (
                                    "Update Group Role"
                                ) : (columnName === "ViewUserGroup") ? (
                                    "Update User Group"
                                ) : (columnName === "ViewRoleApp") ? (
                                    "Update Role App"
                                ) :
                                    ""
                                }
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                size="large"
                                className={styles.cancelButton}
                                sx={{
                                    //backgroundColor: "#e79f43",
                                    // mt: 2,
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
                </Box>
            </Fade>
        </Modal>
    )
}
export default EditTableModal;