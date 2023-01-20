import { useState, useEffect, FC } from 'react';

import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import styles from "./style.module.css";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: theme.palette.grey[200],
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(
                theme.palette.primary.main,
                ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        ODD_OPACITY + theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    },
}));

// const columns: GridColDef[] = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params: GridValueGetterParams) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];
interface CustomTableProps {
    searchText: string,
}

const CustomTable: FC<CustomTableProps> = ({
    searchText
}): JSX.Element => {

    const { data, loading } = useDemoData({
        dataSet: 'Employee',
        rowLength: 200,
    });

    const [filteredDataRows, setFilteredDataRows] = useState<any>(data.rows);
    const [filteredDataColumns, setFilteredDataColumns] = useState<any>(data.columns);

    useEffect(() => {
        console.log("Initial Row Data: ", filteredDataRows);
        console.log("Initial Columns Data: ", filteredDataColumns);
    });

    useEffect(() => {
        setFilteredDataRows(data.rows);
        setFilteredDataColumns(data.columns);
    }, [data, loading]);

    useEffect(() => {
        // filtered data based on search text : edss
        const text = searchText.toLowerCase();
        const fr = data.rows.filter((item: any) => {
            return (
                // const data = {
                //     "id": "f92aeb29-be73-5a11-b633-9f92a6cf0525",
                //     "avatar": "#ff9800",
                //     "name": "Charles Perkins",
                //     "website": "http://arfosjod.ee/bum",
                //     "rating": 2,
                //     "email": "fofkedog@seceto.uk",
                //     "phone": "(371) 936-8158",
                //     "username": "@adgibu",
                //     "city": "Kagdovjor",
                //     "country": {
                //         "value": "FM",
                //         "code": "FM",
                //         "label": "Micronesia, Federated States of",
                //         "phone": "691"
                //     },
                //     "company": "IMS Health Inc.",
                //     "position": "University Dean",
                //     "lastUpdated": "2023-01-19T16:50:51.440Z",
                //     "dateCreated": "2022-12-26T16:09:40.999Z",
                //     "isAdmin": false,
                //     "salary": 41410
                // }
                item.id.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.avatar.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.name.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.website.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.rating.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.email.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.phone.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.username.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.city.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.country.value.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.country.code.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.country.label.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.country.phone.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.company.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.position.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.lastUpdated.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.dateCreated.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.isAdmin.toString().toLowerCase().includes(text.toLowerCase()) ||
                item.salary.toString().toLowerCase().includes(text.toLowerCase())
            );
        });

        // No need to filter columns
        // const fc = data.columns.filter((item: any) => {
        //     return Object.keys(item).some((key) =>
        //         item[key].toString().toLowerCase().includes(text.toLowerCase())
        //     );
        // });

        setFilteredDataRows(fr);

        // No need to filter columns
        // setFilteredDataColumns(fc);
        // console.log("FilteredData:- ", fd);
        // 
    }, [searchText, data, loading]);

    return (
        <div className={styles.container}>
            <div style={{ height: 800, width: '100%' }}>
                <StripedDataGrid
                    loading={loading}
                    rows={filteredDataRows}
                    columns={data.columns}
                />
            </div>
        </div>
    )
}
export default CustomTable;