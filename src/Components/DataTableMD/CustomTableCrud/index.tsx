import React, { FC, useCallback, useMemo, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';

import "./loader.css";

import MaterialReactTable, {
    MaterialReactTableProps,
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
    Tooltip,
    CircularProgress
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here

// Importing @@@@@@@@@@@@@@@@@@@ any @@@@@@@@@@@@@@@@@@@@@
// import { CourseOfferingTypes } from '../../../Data/Tables/CourseOfferings/types';

// importing modular css
import styles from './style.module.css';

// Importing the simple css
import './style.css';

// export type Types = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: number;
//     state: string;
// };

interface CustomTableProps {
    searchText?: string,
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
    searchText,
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

    // const [columnStateValues, setColumnStateValues] = useState<any>(null);

    // const [createModalOpen, setCreateModalOpen] = useState(false);

    // const [tableData, setTableData] = useState<any>(() => data);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    // const handleCreateNewRow = (values: any) => {
    //     tableData.push(values);
    //     setTableData([...tableData]);
    // };

    // const handleSaveRowEdits: MaterialReactTableProps<any>['onEditingRowSave'] =
    //     async ({ exitEditingMode, row, values }) => {
    //         // console.log("Row ======================> ", row);
    //         if (!Object.keys(validationErrors).length) {
    //             tableData[row.index] = values;
    //             //send/receive api updates here, then refetch or update local table data for re-render
    //             setTableData([...tableData]);
    //             exitEditingMode(); //required to exit editing mode and close modal
    //         }
    //     };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

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
    const generateColumns = useCallback((data: any) => {
        if (!data || !data.length) return [];

        const keyOrder = ColHeader.flat();

        const keys = Object.keys(data[0]).sort((a, b) => {
            const indexA = keyOrder.indexOf(a);
            const indexB = keyOrder.indexOf(b);
            return indexA - indexB;
        });

        const generate = keys.map((key) => ({
            accessorKey: key.toString(),
            header: key.toString(),
            size: 150,
            muiTableBodyCellEditTextFieldProps: ({ cell }: any) => ({
                ...getCommonEditTextFieldProps(cell),
            }),
        }));
        return generate;
    }, [ColHeader, getCommonEditTextFieldProps]);

    // Usage:
    const columnsNew = useMemo(() => generateColumns(data), [data, generateColumns]);

    // Function to generate rows
    const generateRows = useCallback((data: any) => {
        if (!data || !data.length) return [];

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
                    case 'active':
                        newRow[prop] = data[i][prop] ? 'true' : 'false';
                        break;
                    default:
                        newRow[prop] = data[i][prop] || 'null';
                }
            }

            // Push the new row to the big row
            BigRow.push(newRow);
        }

        // console.log("Generate Big Row ===> ", BigRow);
        return BigRow;
    }, [currentLang]);

    const rowsNew = useMemo(() => generateRows(data), [data, generateRows]);

    // State to Store rows 
    // const [rowsState, setRowsState] = useState<any>(rowsNew);

    // console.log("Columns New ===> ", columnsNew);

    console.log("Rows New ===> ", rowsNew);

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
            if (
                // eslint-disable-next-line no-restricted-globals
                !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render

            let accessToken: any = Cookies.get("accessToken");

            if (accessToken === undefined || accessToken === null) {
                accessToken = null;
            }

            if (accessToken !== null) {

                const userId = row.getValue('userId');

                // Get the user id from the row values
                console.log("Row Values ===> ", userId);

                // Send a DELETE request to delete the row in the server also pass the header of access token as x-access-token
                axios.delete(`https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/deleteUser/${userId}`, {
                    headers: {
                        'x-api-key': accessToken
                    }
                })
                    .then(res => {
                        console.log("Delete User Response ===> ", res.data);
                        if (res.data.status === "OK") {

                            // Fetching data using axios and also pass the header x-api-key for auth
                            axios.get("https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/fetchUsers", {
                                headers: {
                                    "x-api-key": accessToken
                                }
                            })
                                .then((res) => {
                                    // const rowsNew = generateRows(res.data);
                                    // setTableData(rowsNew);
                                    setFetchUpdate(true);
                                    alert("User Deleted Successfully");
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    })
                    .catch(err => {
                        console.log("Error Deleting User ===> ", err);
                    })
            }
            else {
                alert("Please login first");
                navigate('/login');
            }
        },
        [navigate, setFetchUpdate],
    );

    const handleSaveRowEdits = async ({
        exitEditingMode,
        row,
        table,
        values,
    }: any): Promise<void> => {
        // try {
        // Send a POST request to update the row in the server

        console.log("Values ===> ", values);
        console.log("Row ===> ", row);

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
                        "userId": values.userId,
                        "firstName": values.firstName,
                        "lastName": values.lastName,
                        "userName": values.userName,
                        "password": values.password,
                        "emailId": values.emailId,
                        "collegeId": values.collegeId,
                        "campusId": values.campusId,
                        "departmentId": values.departmentId,
                        "loggedInUser": loggedInUser,
                        "active": values.active === "true" ? true : false,
                        "staff": values.staff === "true" ? true : false,
                        "superUser": values.superUser === "true" ? true : false
                    };

                } else if (columnName === "ViewPrivileges") {
                    url = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/privileges/updatePrivilege";

                    // Fetch all the properties of the object [...tableData]
                    newValues = {
                        "userId": values.userId,
                        "firstName": values.firstName,
                        "lastName": values.lastName,
                        "userName": values.userName,
                        "password": values.password,
                        "emailId": values.emailId,
                        "collegeId": values.collegeId,
                        "campusId": values.campusId,
                        "departmentId": values.departmentId,
                        "loggedInUser": loggedInUser,
                        "active": values.active === "true" ? true : false,
                        "staff": values.staff === "true" ? true : false,
                        "superUser": values.superUser === "true" ? true : false
                    };

                } else {
                    url = "";
                    newValues = null;
                }

                if (url !== "" && newValues !== null) {
                    try {
                        const response = await axios.put(
                            url,
                            newValues,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-api-key": accessToken,
                                },
                            }
                        );
                        console.log("Response Data ==> ", response.data);
                        if (response.data.status === "OK") {
                            setFetchUpdate(true);
                            alert("User Updated Successfully");
                        }
                    } catch (err) {
                        console.log("Error Updating User ===> ", err);
                        alert("Error Updating User : " + err);
                    }
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
        
        // Exit editing mode
        exitEditingMode();
    }



    return (
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
                                size: 120,
                            },
                        }}
                        // sx={{
                        //     '& .MuiTableBody-root': {
                        //         height: 'calc(300px)',
                        //         overflowY: 'auto',
                        //     },
                        // }}
                        columns={columnsNew}
                        data={rowsNew}
                        editingMode="modal" //default
                        enableColumnOrdering
                        enableEditing
                        enableClickToCopy
                        onEditingRowSave={handleSaveRowEdits}
                        onEditingRowCancel={handleCancelRowEdits}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => {
                                        table.setEditingRow(row)
                                    }
                                    }>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Delete">
                                    <IconButton
                                        color="error"
                                        // @ts-ignore
                                        onClick={() => handleDeleteRow(row)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
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
                            {/* <CircularProgress
                            sx={{
                                width: "150px",
                                height: "150px",
                            }}
                             /> */}
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