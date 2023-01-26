import React, { FC, useCallback, useMemo, useState } from 'react';
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
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Delete, Edit } from '@mui/icons-material';
// import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here

// Importing @@@@@@@@@@@@@@@@@@@ any @@@@@@@@@@@@@@@@@@@@@
import { CourseOfferingTypes } from '../../../Data/Tables/CourseOfferings/types';

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
    columnValues: string,
    buttonTitle: string,
    isOpen: Boolean
}

const CustomTableCrud: FC<CustomTableProps> = ({
    searchText,
    data,
    states,
    columnValues,
    buttonTitle,
    isOpen
}): JSX.Element => {

    const [columnStateValues, setColumnStateValues] = useState<any>(null);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [tableData, setTableData] = useState<any>(() => data);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});

    const handleCreateNewRow = (values: any) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits: MaterialReactTableProps<any>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<any>) => {
            if (
                // eslint-disable-next-line no-restricted-globals
                !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

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
    const columnsCourseOffering = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Course Code',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 120,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 200,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'section',
                header: 'Section',
                size: 40,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'noofstudent',
                header: 'No. of Students',
                size: 40,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'email',
                }),
            },
            {
                accessorKey: 'coordinator',
                header: 'Co-ordinator',
                size: 40,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'instructor',
                header: 'Instructor',
                size: 40,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: states.map((state) => (
                        <MenuItem key={state} value={state}>
                            {state}
                        </MenuItem>
                    )),
                },
            },
            {
                accessorKey: 'campus',
                header: 'Campus',
                size: 40,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'semester',
                header: 'Semester',
                size: 40,
                // enableClickToCopy: true,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            }
        ],
        [getCommonEditTextFieldProps],
    );


    useMemo(() => {
        if (columnValues === "CourseOfferingTypes") {
            setColumnStateValues(columnsCourseOffering);
        }
        else if (columnValues === "CourseOfferingTypes") {
            setColumnStateValues(columnsCourseOffering);
        }
        else {
            setColumnStateValues(columnsCourseOffering);
        }
    }, [data]);

    // const csvOptions = {
    //     fieldSeparator: ',',
    //     quoteStrings: '"',
    //     decimalSeparator: '.',
    //     showLabels: true,
    //     useBom: true,
    //     useKeysAsHeaders: false,
    //     headers: columnStateValues.map((c:any) => c.header),
    // };

    //const csvExporter = new ExportToCsv(csvOptions);

    const handleExportRows = (rows: MRT_Row<any>[]) => {

    };

    const handleExportData = () => {

    };

    return (
        <div className={styles.container}>
            <div className={styles.insideTableContainer}>
                {(false) ? (
                    <MaterialReactTable
                        displayColumnDefOptions={{
                            'mrt-row-actions': {
                                muiTableHeadCellProps: {
                                    align: 'center',
                                },
                                size: 120,
                            },
                        }}
                        enableColumnVirtualization
                        columns={columnStateValues}
                        data={tableData}
                        editingMode="modal" //default
                        enableColumnOrdering
                        enableEditing
                        //enableClickToCopy
                        onEditingRowSave={handleSaveRowEdits}
                        onEditingRowCancel={handleCancelRowEdits}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => table.setEditingRow(row)}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Delete">
                                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <Button
                                color="primary"
                                onClick={() => setCreateModalOpen(true)}
                                variant="outlined"
                            >
                                {buttonTitle}
                            </Button>
                        )}
                    />
                ) : (
                    <MaterialReactTable
                        displayColumnDefOptions={{
                            'mrt-row-actions': {
                                muiTableHeadCellProps: {
                                    align: 'center',
                                },
                                size: 120,
                            },
                        }}
                        columns={columnStateValues}
                        data={tableData}
                        editingMode="modal" //default
                        enableColumnOrdering
                        enableEditing
                        // enableClickToCopy
                        onEditingRowSave={handleSaveRowEdits}
                        onEditingRowCancel={handleCancelRowEdits}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => table.setEditingRow(row)}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Delete">
                                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <Button
                                color="primary"
                                onClick={() => setCreateModalOpen(true)}
                                variant="outlined"
                                sx={{
                                    backgroundColor: "#e79f43",
                                    border: "1px solid #e79f43",
                                    color:"white",
                                    // textTransform: "none",
                                    fontWeight: "bold",
                                    height: 40,
                                    mt: 1,
                                    "&:hover": {
                                        backgroundColor: "#e79f43",
                                        border: "1px solid #e79f43",
                                        color:"white"
                                    }
                                }}
                            >
                                {buttonTitle}
                            </Button>
                        )}
                    />
                )}
                <CreateNewAccountModal
                    columns={columnStateValues}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                    buttonTitle={buttonTitle}
                />
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