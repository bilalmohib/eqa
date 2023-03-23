import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';

import { useNavigate, useLocation } from 'react-router-dom';

import "./loader.css";

import MaterialReactTable, {
    // MaterialReactTableProps,
    MRT_Cell,
    MRT_ColumnDef,
    MRT_Row,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

// Importing Edit Table Modal
import EditTableModal from '../EditTableModal';

// importing modular css
import styles from './style.module.css';

// Importing the simple css
import './style.css';

interface CustomTableProps {
    data: any,
    states: string[],
    columnName: string,
    buttonTitle: string,
    isOpen: Boolean,
    currentLang: string,
    ColHeader: any,
    setFetchUpdate: any
}

const CustomTableCrud: FC<CustomTableProps> = ({
    data,
    states,
    columnName,
    buttonTitle,
    isOpen,
    currentLang,
    ColHeader,
    setFetchUpdate
}): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openModal, setOpenModal] = useState(false);

    const [originalValues, setOriginalValues] = useState<any>(null);
    const [currentRowIndex, setCurrentRowIndex] = useState<number>(-1);

    // const [columnStateValues, setColumnStateValues] = useState<any>(null);

    // const [createModalOpen, setCreateModalOpen] = useState(false);

    // const [tableData, setTableData] = useState<any>(() => data);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    // For Checking the Editable and Deletable Permission
    let FinalsidebarAppsListArray = JSON.parse(localStorage.getItem("sidebarAppsListArray") || '[]');

    const [editable, setEditable] = useState<boolean>(false);
    const [deletable, setDeletable] = useState<boolean>(false);

    const [URL, setURL] = useState<string>("");

    useEffect(() => {
        // For getting the current location path
        const currentLocationPath = location.pathname;

        console.log("Current Location Path is: ", currentLocationPath);

        // Do it using for loop
        for (let i = 0; i < FinalsidebarAppsListArray.length; i++) {
            let subMenu = FinalsidebarAppsListArray[i].subMenu;
            for (let j = 0; j < subMenu.length; j++) {
                // alert("Current Location Path is: " + currentLocationPath + " and the subMenu[j].formUrl is: " + subMenu[j].formUrl + " and the i is: " + i + " and the Menu URL is: " + FinalsidebarAppsListArray[i].appUrl);
                if (subMenu[j].formUrl === currentLocationPath || FinalsidebarAppsListArray[i].appUrl === currentLocationPath) {
                    // alert("Equal" + FinalsidebarAppsListArray[i].appName)
                    if (subMenu[j].updatePermission === true) {
                        setEditable(true);
                        console.log("Is Editable ===> ", editable);
                    }
                    if (subMenu[j].deletePermission === true) {
                        setDeletable(true);
                        console.log("Is Deletable ===> ", deletable);
                    }
                }
            }
        }
    }, [FinalsidebarAppsListArray, deletable, editable, location.pathname]);
    // For Checking the Editable and Deletable Permission

    const getCommonEditTextFieldProps = useCallback(
        (
            cell: MRT_Cell<any>,
        ): MRT_ColumnDef<any>['muiTableBodyCellEditTextFieldProps'] => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
                                ? validateAge(+event.target.value)
                                : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );

    // Column definitions for CourseOffering
    // const columnsCourseOffering = useMemo<MRT_ColumnDef<any>[]>(
    //     () => [
    //         {
    //             accessorKey: 'id',
    //             header: 'Course Code',
    //             enableColumnOrdering: false,
    //             enableEditing: false, //disable editing on this column
    //             enableSorting: false,
    //             size: 120,
    //         },
    //         {
    //             accessorKey: 'name',
    //             header: 'Name',
    //             size: 200,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //                 ...getCommonEditTextFieldProps(cell),
    //             }),
    //         },
    //         {
    //             accessorKey: 'section',
    //             header: 'Section',
    //             size: 40,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //                 ...getCommonEditTextFieldProps(cell),
    //             }),
    //         },
    //         {
    //             accessorKey: 'noofstudent',
    //             header: 'No. of Students',
    //             size: 40,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //                 ...getCommonEditTextFieldProps(cell),
    //                 type: 'email',
    //             }),
    //         },
    //         {
    //             accessorKey: 'coordinator',
    //             header: 'Co-ordinator',
    //             size: 40,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //                 ...getCommonEditTextFieldProps(cell),
    //                 type: 'number',
    //             }),
    //         },
    //         {
    //             accessorKey: 'instructor',
    //             header: 'Instructor',
    //             size: 40,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: {
    //                 select: true, //change to select for a dropdown
    //                 children: states.map((state) => (
    //                     <MenuItem key={state} value={state}>
    //                         {state}
    //                     </MenuItem>
    //                 )),
    //             },
    //         },
    //         {
    //             accessorKey: 'campus',
    //             header: 'Campus',
    //             size: 40,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //                 ...getCommonEditTextFieldProps(cell),
    //                 type: 'number',
    //             }),
    //         },
    //         {
    //             accessorKey: 'semester',
    //             header: 'Semester',
    //             size: 40,
    //             // enableClickToCopy: true,
    //             muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
    //                 ...getCommonEditTextFieldProps(cell),
    //                 type: 'number',
    //             }),
    //         }
    //     ],
    //     [getCommonEditTextFieldProps],
    // );


    // useMemo(() => {
    //     if (columnName === "CourseOfferingTypes") {
    //         setColumnStateValues(columnsCourseOffering);
    //     }
    //     else if (columnName === "CourseOfferingTypes") {
    //         setColumnStateValues(columnsCourseOffering);
    //     }
    //     else {
    //         setColumnStateValues(columnsCourseOffering);
    //     }
    // }, [data]);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    // Function to generate columns
    // const generateColumns = useCallback((data: any) => {
    //     if (!data || !data.length) return [];

    //     const keyOrder = ColHeader.flat();

    //     const keys = Object.keys(data[0]).sort((a, b) => {
    //         const indexA = keyOrder.indexOf(a);
    //         const indexB = keyOrder.indexOf(b);
    //         return indexA - indexB;
    //     });

    //     const generate = keys.map((key) => ({
    //         accessorKey: key.toString(),
    //         header: key.toString(),
    //         size: (key.toString() === 'appDetails' || key.toString() === 'formUrl') ? 280 : 120,
    //         muiTableBodyCellEditTextFieldProps: ({ cell }: any) => ({
    //             ...getCommonEditTextFieldProps(cell),
    //         }),
    //     }));
    //     return generate;
    // }, [ColHeader, getCommonEditTextFieldProps]);

    const generateColumns = useCallback((data: any, currentLang: string) => {
        if (!data || !data.length) return [];

        const keyOrder = ColHeader.flat();

        const keys = Object.keys(data[0]).sort((a, b) => {
            const indexA = keyOrder.indexOf(a);
            const indexB = keyOrder.indexOf(b);
            return indexA - indexB;
        });

        let columnNamesArabic: any = null;

        if (columnName === "ViewUsers") {
            columnNamesArabic = {
                "createdBy": 'تم الإنشاء بواسطة',
                "creationDateAndTime": 'تاريخ ووقت الإنشاء',
                "updatedBy": 'تم التحديث بواسطة',
                "updateDateAndTime": 'تاريخ ووقت التحديث',
                "userId": 'معرّف المستخدم',
                "firstName": 'الاسم الأول',
                "lastName": 'اسم العائلة',
                "userName": 'اسم المستخدم',
                "password": 'كلمة السر',
                "emailId": 'البريد الإلكتروني',
                "collegeId": 'معرّف الكلية',
                "campusId": 'معرّف الحرم الجامعي',
                "departmentId": 'معرّف القسم',
                "emailStatus": 'حالة البريد الإلكتروني',
                "staff": 'الموظفين',
                "superUser": 'المستخدم الفائق',
                "active": 'نشط'
            };
        }
        else if (columnName === "ViewApps") {
            columnNamesArabic = {
                "createdBy": "تم الإنشاء بواسطة",
                "creationDateAndTime": "تاريخ ووقت الإنشاء",
                "updatedBy": "تم التحديث بواسطة",
                "updateDateAndTime": "تاريخ ووقت التحديث",
                "appId": "معرّف التطبيق",
                "appName": "اسم التطبيق",
                "appName_Ar": "اسم التطبيق بالعربية",
                "appIcon": "رمز التطبيق",
                "appDescription": "وصف التطبيق",
                "appUrl": "رابط التطبيق",
                "appOrder": "ترتيب التطبيق",
                "active": "نشط"
            }
        }
        else if (columnName === "ViewGroups") {
            columnNamesArabic = {
                "createdBy": "المُنشئ",
                "creationDateAndTime": "تاريخ ووقت الإنشاء",
                "updatedBy": "المُحدّث",
                "updateDateAndTime": "تاريخ ووقت التحديث",
                "grpId": "معرّف المجموعة",
                "grpName": "اسم المجموعة",
                "grpDescription": "وصف المجموعة",
                "active": "نشط"
            };
        }
        else if (columnName === "ViewRoles") {
            columnNamesArabic = {
                "createdBy": 'المنشئ',
                "creationDateAndTime": 'تاريخ الإنشاء والوقت',
                "updatedBy": 'المحدث',
                "updateDateAndTime": 'تاريخ التحديث والوقت',
                "roleId": 'رقم الدور',
                "roleName": 'اسم الدور',
                "roleDescription": 'وصف الدور',
                "active": 'نشط'
            };
        }
        else if (columnName === "ViewAppForm") {
            columnNamesArabic = {
                "createdBy": "صُنِّعَ بواسطة",
                "creationDateAndTime": "تاريخ ووقت الإنشاء",
                "updatedBy": "تحديث بواسطة",
                "updateDateAndTime": "تاريخ ووقت التحديث",
                "formId": "معرّف النموذج",
                "moduleName": "اسم الوحدة النمطية",
                "formName": "اسم النموذج",
                "formName_Ar": "اسم النموذج بالعربية",
                "formIcon": "رمز النموذج",
                "formUrl": "عنوان URL للنموذج",
                "appDetails": "وصف التطبيق",
                "active": "نشط؟",
                "appId": "معرّف التطبيق"
            }
        }
        else if (columnName === "ViewRoleApp") {
            columnNamesArabic = {
                "createdBy": "المنشئ",
                "creationDateAndTime": "تاريخ ووقت الإنشاء",
                "updatedBy": "المحدث",
                "updateDateAndTime": "تاريخ ووقت التحديث",
                "privilegeId": "معرّف الصلاحية",
                "role": "الدور",
                "appDetails": "تفاصيل التطبيق",
                "appForms": "أشكال التطبيق",
                "createPermission": "صلاحية الإنشاء",
                "readPermission": "صلاحية القراءة",
                "updatePermission": "صلاحية التحديث",
                "deletePermission": "صلاحية الحذف",
                "active": "نشط؟"
            }
        } else if (columnName === "ViewGroupRole") {
            columnNamesArabic = {
                "createdBy": "صُنِّعَ بواسطة",
                "creationDateAndTime": "تاريخ ووقت الإنشاء",
                "updatedBy": "تحديث بواسطة",
                "updateDateAndTime": "تاريخ ووقت التحديث",
                "groupRoleId": "معرف دور المجموعة",
                "groupDetails": "تفاصيل المجموعة",
                "role": "الدور",
                "grpRoleDescription": "وصف دور المجموعة",
                "grpId": "معرّف المجموعة",
                "roleId": "معرّف الدور",
                "active": "نشط؟"
            }
        } else if (columnName === "ViewUserGroup") {
            columnNamesArabic = {
                "createdBy": "تم إنشاؤه بواسطة",
                "creationDateAndTime": "تاريخ ووقت الإنشاء",
                "updatedBy": "تم التحديث بواسطة",
                "updateDateAndTime": "تاريخ ووقت التحديث",
                "userGroupId": "معرّف مجموعة المستخدمين",
                "user": "المستخدم",
                "group": "المجموعة",
                "active": "نشط",
                "userId": "معرف المستخدم",
                "grpId": "معرف المجموعة"
            }
        }

        // console.log("Cols data[0] ===> ", data[0]);

        const generate = keys.map((key) => {
            let header = key
                .toString()
                .replace(/([a-z])([A-Z])/g, '$1 $2') // add space between camelCase words
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // add space between consecutive capital letters
                .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter

            if (currentLang === 'ar' && columnName !== "CourseOfferingTypes") {
                // Map column name to Arabic if current language is Arabic
                header = columnNamesArabic[key] || header;
            }

            return {
                accessorKey: key.toString(),
                header,
                size: (key.toString() === 'appDetails' || key.toString() === 'formUrl') ? 280 : 120,
                muiTableBodyCellEditTextFieldProps: ({ cell }: any) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            };
        });

        return generate;
    }, [ColHeader, columnName, getCommonEditTextFieldProps]);

    // Usage:
    const columnsNew = useMemo(() => generateColumns(data, currentLang), [currentLang, data, generateColumns]);

    // State to Store rows 
    const [tableData, setTableData] = useState<any>(null);

    // Function to generate rows
    const generateRows = useCallback((data: any) => {
        if (!data || !data.length) return [];

        // Sort the data in descending order such that creationDateAndTime latest entry is shown first
        // Do this only if the data has creationDateAndTime property
        if (data[0].hasOwnProperty('creationDateAndTime')) {
            data.sort((a: any, b: any) => {
                return b.creationDateAndTime[0] - a.creationDateAndTime[0] ||
                    b.creationDateAndTime[1] - a.creationDateAndTime[1] ||
                    b.creationDateAndTime[2] - a.creationDateAndTime[2] ||
                    b.creationDateAndTime[3] - a.creationDateAndTime[3] ||
                    b.creationDateAndTime[4] - a.creationDateAndTime[4] ||
                    b.creationDateAndTime[5] - a.creationDateAndTime[5];
            });
        }

        let BigRow = [];

        for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            let newRow: any = {};
            for (const prop in data[i]) {
                switch (prop) {
                    case 'creationDateAndTime':
                        if (currentLang === 'ar') {
                            // Date in Arabic
                            newRow[prop] = new Date(
                                data[i][prop][0],
                                data[i][prop][1] - 1,
                                data[i][prop][2],
                                data[i][prop][3],
                                data[i][prop][4],
                                data[i][prop][5]
                            ).toLocaleString('ar-EG');
                        }
                        else {
                            // Date in English
                            newRow[prop] = new Date(
                                data[i][prop][0],
                                data[i][prop][1] - 1,
                                data[i][prop][2],
                                data[i][prop][3],
                                data[i][prop][4],
                                data[i][prop][5]
                            ).toLocaleString();

                        }
                        break;
                    case 'updateDateAndTime':
                        if (data[i][prop] !== null) {
                            console.log('updateDateAndTime', data[i][prop]);
                            if (currentLang === 'ar') {
                                // Date in Arabic
                                newRow[prop] = new Date(
                                    data[i][prop][0],
                                    data[i][prop][1] - 1,
                                    data[i][prop][2],
                                    data[i][prop][3],
                                    data[i][prop][4],
                                    data[i][prop][5]
                                ).toLocaleString('ar-EG');
                            }
                            else {
                                // Date in English
                                newRow[prop] = new Date(
                                    data[i][prop][0],
                                    data[i][prop][1] - 1,
                                    data[i][prop][2],
                                    data[i][prop][3],
                                    data[i][prop][4],
                                    data[i][prop][5]
                                ).toLocaleString();

                            }
                        }
                        else {
                            newRow[prop] = '';
                            // console.log('updateDateAndTime Null --> ', data[i][prop]);
                        }
                        break;
                    case 'appDetails':
                        //newRow[prop] = data[i][prop] ? 'true' : 'false';
                        // newRow[prop] = data[i][prop]."appName";
                        newRow[prop] = data[i][prop].appId + ": " + data[i][prop].appName;
                        // newRow['appId'] = data[i][prop].appId;
                        break;
                    case 'active':
                        console.log("Active : ", data[i][prop]);
                        newRow[prop] = data[i][prop].toString();
                        break;
                    case 'staff':
                        newRow[prop] = data[i][prop].toString();
                        break;
                    case 'superUser':
                        newRow[prop] = data[i][prop].toString();
                        break;
                    default:
                        newRow[prop] = data[i][prop] || '';
                }
            }

            // Push the new row to the big row
            BigRow.push(newRow);
        }

        setTableData(BigRow);

        // console.log("Generate Big Row ===> ", BigRow);
        return BigRow;
    }, [currentLang]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rowsNew = useMemo(() => generateRows(data), [data, generateRows]);

    // console.log("Columns New ===> ", columnsNew);

    console.log("Columns New ===> ", columnsNew);
    console.log("Rows New ===> ", tableData);

    // Get width and height current window

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const handleDeleteRow = useCallback(
        (row: MRT_Row<any>) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            let colName = columnsNew[0].accessorKey;
            //send api delete request here, then refetch or update local table data for re-render

            let accessToken: any = Cookies.get("accessToken");

            if (accessToken === undefined || accessToken === null) {
                accessToken = null;
            }

            if (accessToken !== null) {
                console.log("Column Name ===> ", columnName);

                let url = "";
                let message = "";
                let deleteMessage = "";

                if (columnName === "ViewUsers") {
                    const userId = row.getValue('userId');
                    const userName = row.getValue('userName');

                    // Get the user id from the row values
                    // console.log("User ID ===> ", userId);
                    // console.log("User Name ===> ", userName);

                    // Send a DELETE request to delete the row in the server also pass the header of access token as x-access-token
                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteUser/${userId}`;
                    message = `Are you sure you want to delete user: ${userName} ?`;
                    deleteMessage = `User: ${userName} deleted successfully`;
                }
                else if (columnName === "ViewApps") {
                    const appId = row.getValue('appId');
                    const appName = row.getValue('appName');

                    // Get the user id from the row values
                    // console.log("User ID ===> ", appId);
                    // console.log("User Name ===> ", appName);

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteAppDetails/${appId}`;
                    message = "Are you sure you want to delete App " + appName + " ?";
                    deleteMessage = `App ${appName} Deleted Successfully`;
                }
                else if (columnName === "ViewGroups") {
                    const grpId = row.getValue('grpId');
                    const grpName = row.getValue('grpName');

                    // Get the user id from the row values
                    // console.log("Group ID ===> ", grpId);
                    // console.log("Group Name ===> ", grpName);

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteGroup/${grpId}`;
                    message = "Are you sure you want to delete Group " + grpName + " ?";
                    deleteMessage = `Group ${grpName} Deleted Successfully`;
                }
                else if (columnName === "ViewRoles") {
                    const roleId = row.getValue('roleId');
                    const roleName = row.getValue('roleName');

                    // Get the user id from the row values
                    // console.log("Role ID ===> ", roleId);
                    // console.log("Role Name ===> ", roleName);

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteRole/${roleId}`;
                    message = "Are you sure you want to delete Group " + roleName + " ?";
                    deleteMessage = `Group ${roleName} Deleted Successfully`;
                }
                else if (columnName === "ViewAppForm") {
                    const formId = row.getValue('formId');
                    const formName = row.getValue('formName');

                    // Get the user id from the row values
                    // console.log("form ID ===> ", formId);
                    // console.log("form Name ===> ", formName);

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteAppForm/${formId}`;
                    message = "Are you sure you want to delete AppForm " + formName + " ?";
                    deleteMessage = `AppForm ${formName} Deleted Successfully`;
                }
                else if (columnName === "ViewRoleApp") {
                    const privilegeId = row.getValue('privilegeId');

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deletePrivilege/${privilegeId}`;
                    message = "Are you sure you want to delete AppRole Privilege " + privilegeId + " ?";
                    deleteMessage = `AppRole Privilege with Id: ${privilegeId} Deleted Successfully`;
                } else if (columnName === "ViewGroupRole") {
                    const groupRoleId = row.getValue('groupRoleId');

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteGroupRole/${groupRoleId}`;
                    message = "Are you sure you want to delete GroupRole " + groupRoleId + " ?";
                    deleteMessage = `GroupRole with Id: ${groupRoleId} Deleted Successfully`;
                } else if (columnName === "ViewUserGroup") {
                    const userGroupId = row.getValue('userGroupId');

                    url = `https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteUserGroup/${userGroupId}`;
                    message = "Are you sure you want to delete UserGroup " + userGroupId + " ?";
                    deleteMessage = `UserGroup with Id: ${userGroupId} Deleted Successfully`;
                }
                else {
                    alert("Wrong Column Name");
                    // tableData.splice(row.index, 1);
                    // setTableData([...tableData]);
                }

                if (url !== "" && message !== "" && deleteMessage !== "") {
                    if (
                        // eslint-disable-next-line no-restricted-globals
                        !confirm(`${message}`)
                    ) {
                        return;
                    }

                    // Send a DELETE request to delete the row in the server also pass the header of access token as x-access-token
                    axios.delete(`${url}`, {
                        headers: {
                            'x-api-key': accessToken
                        }
                    })
                        .then(res => {
                            console.log(`Delete ${columnName} Response ===> `, res.data);
                            if (res.data.status === "OK") {
                                tableData.splice(row.index, 1);
                                setTableData([...tableData]);
                                alert(deleteMessage);
                            }
                        })
                        .catch(err => {
                            console.log(`Error Deleting ${columnName} ===> `, err);
                        });
                    // Send a DELETE request to delete the row in the server also pass the header of access token as x-access-token
                }
            }
            else {
                alert("Please login first");
                navigate('/login');
            }
        },
        [columnName, columnsNew, navigate, tableData],
    );

    // const handleSaveRowEdits = async ({
    //     exitEditingMode,
    //     row,
    //     table,
    //     values,
    // }: any): Promise<void> => {
    //     // try {
    //     // Send a POST request to update the row in the server

    //     alert("Save Row Edits 111");

    //     setOpenModal(true);

    //     // alert("Save Row Edits");
    //     console.log("Values ===> ", values);
    //     // console.log("Row ===> ", row);

    //     //////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////
    //     //////////////////////////////////////////////////////////////
    //     ////////////////////////  API CALL  //////////////////////////
    //     const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
    //     if (userLocalStorage !== null && userLocalStorage !== undefined) {
    //         const loggedInUser = userLocalStorage.userName;
    //         console.log("Logged In UserName ===> ", loggedInUser);

    //         let accessToken: any = Cookies.get("accessToken");

    //         if (accessToken === undefined || accessToken === null) {
    //             accessToken = null;
    //         }

    //         if (accessToken !== null) {
    //             //////////////////////////////////////////@
    //             let url = "";
    //             let newValues: any = null;

    //             if (columnName === "ViewUsers") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateUser";

    //                 // Fetch all the properties of the object [...tableData]
    //                 newValues = {
    //                     "userId": values.userId,
    //                     "firstName": values.firstName,
    //                     "lastName": values.lastName,
    //                     "userName": values.userName,
    //                     "password": "123456",
    //                     "emailId": values.emailId,
    //                     "collegeId": values.collegeId,
    //                     "campusId": values.campusId,
    //                     "departmentId": values.departmentId,
    //                     "loggedInUser": loggedInUser,
    //                     "active": values.active === "true" ? true : false,
    //                     "staff": values.staff === "true" ? true : false,
    //                     "superUser": values.superUser === "true" ? true : false
    //                 };
    //             } else if (columnName === "ViewRoles") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateRole";

    //                 newValues = {
    //                     "roleId": values.roleId,
    //                     "roleName": values.roleName,
    //                     "roleDescription": values.roleDescription,
    //                     "loggedInUser": loggedInUser,
    //                     "active": values.active === "true" ? true : false
    //                 };
    //             } else if (columnName === "ViewGroups") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateGroup";

    //                 // Fetch all the properties of the object [...tableData]
    //                 newValues = {
    //                     "grpId": values.grpId,
    //                     "grpName": values.grpName,
    //                     "grpDescription": values.grpDescription,
    //                     "active": values.active === "true" ? true : false,
    //                     "loggedInUser": loggedInUser
    //                 }

    //             } else if (columnName === "ViewApps") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/saveAppDetails";

    //                 // Fetch all the properties of the object [...tableData]
    //                 newValues = {
    //                     "appId": values.appId,
    //                     "appName": values.appName,
    //                     "appDescription": values.appDescription,
    //                     "appUrl": values.appUrl,
    //                     "appOrder": values.appOrder,
    //                     "active": values.active === "true" ? true : false,
    //                     "loggedInUser": loggedInUser
    //                 }

    //             } else if (columnName === "ViewAppForm") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateAppForm";

    //                 // Fetch all the properties of the object [...tableData]
    //                 newValues = {
    //                     "formId": values.formId,
    //                     "appId": values.appId,
    //                     "moduleName": values.moduleName,
    //                     "formName": values.formName,
    //                     "formUrl": values.formUrl,
    //                     "active": values.active === "true" ? true : false,
    //                     "loggedInUser": loggedInUser
    //                 }

    //             } else if (columnName === "ViewGroupRole") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateGroupRole";

    //                 // Fetch all the properties of the object [...tableData]
    //                 newValues = {
    //                     "groupRoleId": values.groupRoleId,
    //                     "roleIds": [values.roleId],
    //                     "grpId": values.grpId,
    //                     "grpRoleDescription": values.grpRoleDescription,
    //                     "active": true
    //                 }
    //             } else if (columnName === "ViewUserGroup") {
    //                 url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateUserGroup";

    //                 // Fetch all the properties of the object [...tableData]
    //                 newValues = {
    //                     "userGroupId": values.userGroupId,
    //                     "userId": values.userId,
    //                     "grpId": values.grpId,
    //                     "active": true
    //                 }
    //             }
    //             else {
    //                 url = "";
    //                 newValues = null;
    //                 tableData[row.index] = values;
    //                 //send/receive api updates here, then refetch or update local table data for re-render
    //                 setTableData([...tableData]);
    //             }

    //             if (url !== "" && newValues !== null) {
    //                 try {
    //                     if (columnName === "ViewApps") {
    //                         const response = await axios.post(
    //                             url,
    //                             newValues,
    //                             {
    //                                 headers: {
    //                                     "x-api-key": accessToken,
    //                                 },
    //                             }
    //                         );

    //                         console.log("Response Data ==> ", response.data);
    //                         if (response.data.status === "OK") {
    //                             // setFetchUpdate(true);
    //                             tableData[row.index] = values;
    //                             //send/receive api updates here, then refetch or update local table data for re-render
    //                             setTableData([...tableData]);
    //                             alert("App Updated Successfully");
    //                         }
    //                     } else {
    //                         const response = await axios.put(
    //                             url,
    //                             newValues,
    //                             {
    //                                 headers: {
    //                                     "Content-Type": "application/json",
    //                                     "x-api-key": accessToken,
    //                                 },
    //                             }
    //                         );

    //                         console.log("Response Data ==> ", response.data);
    //                         if (response.data.status === "OK") {
    //                             // setFetchUpdate(true);
    //                             tableData[row.index] = values;
    //                             //send/receive api updates here, then refetch or update local table data for re-render
    //                             setTableData([...tableData]);
    //                             alert("Updated Successfully");
    //                         }
    //                     }
    //                 } catch (err) {
    //                     console.log("Error Updating User ===> ", err);
    //                     alert("Error Updating User : " + err);
    //                 }
    //             }
    //             else {
    //                 console.log("URL is empty");
    //                 alert("URL is empty");
    //             }
    //         }
    //         else {
    //             alert("Please login first");
    //             navigate('/login');
    //         }
    //     }
    //     else {
    //         alert("Please login first");
    //         navigate('/login');
    //     }

    //     // Exit editing mode
    //     exitEditingMode();
    // }

    // const handleEditRow = async ({
    //     enterEditingMode,
    //     exitEditingMode,
    //     row,
    //     table,
    //     values,
    // }: any): Promise<void> => {
    const handleEditRow = (row: any) => {
        // Enter editing mode
        setOpenModal(true);
        setCurrentRowIndex(row.index);
        //alert("Edit Row");
        console.log(row.original);

        let values: any = row.original;
        // alert("Save Row Edits");
        console.log("Values ===> ", values);
        // console.log("Row ===> ", row);

        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////
        ////////////////////////  API CALL  //////////////////////////
        const userLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
        if (userLocalStorage !== null && userLocalStorage !== undefined) {
            const loggedInUser = userLocalStorage.userName;
            console.log("Logged In UserName ===> ", loggedInUser);

            let accessToken: any = Cookies.get("accessToken");

            if (accessToken === undefined || accessToken === null) {
                accessToken = null;
            }

            if (accessToken !== null) {
                //////////////////////////////////////////@
                let url = "";
                let newValues: any = null;

                if (columnName === "ViewUsers") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateUser";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "userId": values.userId,
                        "firstName": values.firstName,
                        "lastName": values.lastName,
                        "userName": values.userName,
                        "password": "123456",
                        "emailId": values.emailId,
                        "collegeId": values.collegeId,
                        "campusId": values.campusId,
                        "departmentId": values.departmentId,
                        "loggedInUser": loggedInUser,
                        "active": values.active === "true" ? true : false,
                        "staff": values.staff === "true" ? true : false,
                        "superUser": values.superUser === "true" ? true : false
                    };
                } else if (columnName === "ViewRoles") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateRole";

                    newValues = {
                        "roleId": values.roleId,
                        "roleName": values.roleName,
                        "roleDescription": values.roleDescription,
                        "loggedInUser": loggedInUser,
                        "active": values.active === "true" ? true : false
                    };
                } else if (columnName === "ViewGroups") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateGroup";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "grpId": values.grpId,
                        "grpName": values.grpName,
                        "grpDescription": values.grpDescription,
                        "active": values.active === "true" ? true : false,
                        "loggedInUser": loggedInUser
                    }

                } else if (columnName === "ViewApps") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateAppDetails";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "appId": values.appId,
                        "appName": values.appName,
                        "appDescription": values.appDescription,
                        "appUrl": values.appUrl,
                        "appName_Ar": values.appName_Ar,
                        "appIcon": values.appIcon,
                        "appOrder": values.appOrder,
                        "active": values.active === "true" ? true : false,
                        "loggedInUser": loggedInUser
                    }

                } else if (columnName === "ViewAppForm") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateAppForm";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "formId": values.formId,
                        "moduleName": values.moduleName,
                        "formName": values.formName,
                        "formUrl": values.formUrl,
                        "formName_Ar": values.formName_Ar,
                        "formIcon": values.formIcon,
                        "appId": values.appId,
                        "active": values.active === "true" ? true : false
                    }

                } else if (columnName === "ViewGroupRole") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateGroupRole";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "groupRoleId": values.groupRoleId,
                        "roleId": values.roleId,
                        "grpId": values.grpId,
                        "grpRoleDescription": values.grpRoleDescription,
                        "loggedInUser": loggedInUser,
                        "active": values.active === "true" ? true : false
                    }
                } else if (columnName === "ViewUserGroup") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updateUserGroup";

                    // alert(values.active)

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "userGroupId": values.userGroupId,
                        "userId": values.userId,
                        "grpId": values.grpId,
                        "active": values.active === "true" ? true : false
                    }
                } else if (columnName === "ViewRoleApp") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updatePrivilege";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "privilegeId": values.privilegeId,
                        "roleId": values.roleId,
                        "formId": values.formId,
                        "appId": values.appId,
                        "loggedInUser": loggedInUser,
                        "createPermission": values.createPermission === "true" ? true : false,
                        "readPermission": values.readPermission === "true" ? true : false,
                        "updatePermission": values.updatePermission === "true" ? true : false,
                        "deletePermission": values.deletePermission === "true" ? true : false,
                        "active": values.active === "true" ? true : false
                    }
                }
                else {
                    url = "";
                    newValues = null;
                    tableData[row.index] = values;
                    //send/receive api updates here, then refetch or update local table data for re-render
                    setTableData([...tableData]);
                }

                if (url !== "" && newValues !== null) {
                    // try {
                    //     if (columnName === "ViewApps") {
                    //         const response = await axios.post(
                    //             url,
                    //             newValues,
                    //             {
                    //                 headers: {
                    //                     "x-api-key": accessToken,
                    //                 },
                    //             }
                    //         );

                    //         console.log("Response Data ==> ", response.data);
                    //         if (response.data.status === "OK") {
                    //             // setFetchUpdate(true);
                    //             tableData[row.index] = values;
                    //             //send/receive api updates here, then refetch or update local table data for re-render
                    //             setTableData([...tableData]);
                    //             alert("App Updated Successfully");
                    //         }
                    //     } else {
                    //         const response = await axios.put(
                    //             url,
                    //             newValues,
                    //             {
                    //                 headers: {
                    //                     "Content-Type": "application/json",
                    //                     "x-api-key": accessToken,
                    //                 },
                    //             }
                    //         );

                    //         console.log("Response Data ==> ", response.data);
                    //         if (response.data.status === "OK") {
                    //             // setFetchUpdate(true);
                    //             tableData[row.index] = values;
                    //             //send/receive api updates here, then refetch or update local table data for re-render
                    //             setTableData([...tableData]);
                    //             alert("Updated Successfully");
                    //         }
                    //     }
                    // } catch (err) {
                    //     console.log("Error Updating User ===> ", err);
                    //     alert("Error Updating User : " + err);
                    // }
                    setOriginalValues(newValues);
                    setURL(url);
                }
                else {
                    console.log("URL is empty");
                    alert("URL is empty");
                }
            }
            else {
                alert("Please login first");
                navigate('/login');
            }
        }
        else {
            alert("Please login first");
            navigate('/login');
        }
        // enterEditingMode(row.index);
    }

    return (
        <div>

            <div className={styles.container}>
                <div className={styles.insideTableContainer}
                    style={{
                        height: (windowSize[0] < 600) ? ('400px') : ('100%'),
                        overflowY: (windowSize[0] < 600) ? ('auto') : ('unset'),
                    }}
                >
                    {(
                        data && data.length > 0
                    ) ? (
                        <MaterialReactTable
                            displayColumnDefOptions={{
                                'mrt-row-actions': {
                                    muiTableHeadCellProps: {
                                        align: 'center',
                                    },
                                    size: 170,
                                },
                            }}
                            // sx={{
                            //     '& .MuiTableBody-root': {
                            //         height: 'calc(300px)',
                            //         overflowY: 'auto',
                            //     },
                            // }}
                            columns={columnsNew}
                            data={tableData}
                            editingMode="modal" //default
                            enableColumnOrdering
                            enableEditing
                            enableClickToCopy
                            onEditingRowSave={handleEditRow}
                            onEditingRowCancel={handleCancelRowEdits}
                            initialState={{
                                density: 'compact',
                                columnVisibility: {
                                    createdBy: false,
                                    creationDateAndTime: false,
                                    updateDateAndTime: false,
                                    updatedBy: false
                                }
                            }}
                            renderRowActions={({ row, table }) => (
                                <Box sx={{ display: 'flex', gap: '1rem', justifyContent: "center" }}>
                                    {(editable) && (
                                        <Tooltip arrow placement="left" title="Edit">
                                            <IconButton onClick={() => {
                                                // table.setEditingRow(row)
                                                // alert("Edit Clicked");
                                                //console.log(row);
                                                handleEditRow(row);
                                            }
                                            }>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                    )}

                                    {(deletable) && (
                                        <Tooltip arrow placement="right" title="Delete">
                                            <IconButton
                                                color="error"
                                                // @ts-ignore
                                                onClick={() => handleDeleteRow(row)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>
                            )}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}
                        >
                            <Box sx={{
                                height: "300px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                            }}>
                                <div className="lds-roller">
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                    <div>
                                    </div>
                                </div>

                            </Box>
                        </Box>
                    )}
                </div>
            </div>
            <EditTableModal
                openUpdateTableModal={openModal}
                setOpenUpdateTableModal={setOpenModal}
                originalValues={originalValues}
                columnName={columnName}
                url={URL}
                currentRowIndex={currentRowIndex}
                tableData={tableData}
                setTableData={setTableData}
            />
        </div>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal: FC<{
    columns: MRT_ColumnDef<any>[];
    onClose: () => void;
    onSubmit: (values: any) => void;
    open: boolean;
    buttonTitle?: string;
}> = ({ open, columns, onClose, onSubmit, buttonTitle }) => {
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">{buttonTitle}</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                // @ts-ignore
                                key={column.accessorKey}
                                // @ts-ignore
                                label={column.header}
                                // @ts-ignore
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Account
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age: number) => age >= 18 && age <= 50;

export default CustomTableCrud;