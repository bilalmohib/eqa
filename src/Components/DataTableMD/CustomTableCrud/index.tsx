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
import { Delete, Edit } from '@mui/icons-material';

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
}

const CustomTableCrud: FC<CustomTableProps> = ({
    searchText,
    data,
    states,
    columnValues,
    buttonTitle,
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
                header: 'ID',
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
                size: 80,
            },
            {
                accessorKey: 'firstName',
                header: 'First Name',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'lastName',
                header: 'Last Name',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'email',
                }),
            },
            {
                accessorKey: 'age',
                header: 'Age',
                size: 80,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),
            },
            {
                accessorKey: 'state',
                header: 'State',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: states.map((state) => (
                        <MenuItem key={state} value={state}>
                            {state}
                        </MenuItem>
                    )),
                },
            },
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

    return (
        <Box className={styles.container}>
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
            <CreateNewAccountModal
                columns={columnStateValues}
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
                buttonTitle={buttonTitle}
            />
        </Box>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal: FC<{
    columns: MRT_ColumnDef<any>[];
    onClose: () => void;
    onSubmit: (values: any) => void;
    open: boolean;
    buttonTitle?: string;
}> = ({ open, columns, onClose, onSubmit,buttonTitle }) => {
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