import { useState, useEffect, FC } from 'react';

import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
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

// interface CustomTableProps {
//     searchText: string,
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rows2 = [
    {
        "field": "id",
        "hide": true
    },
    {
        "field": "avatar",
        "headerName": "Avatar",
        "sortable": false,
        "filterable": false,
        "groupable": false,
        "aggregable": false,
        "disableExport": true
    },
    {
        "field": "name",
        "headerName": "Name",
        "dataGeneratorUniquenessEnabled": true,
        "width": 120,
        "editable": true,
        "groupable": false,
        "aggregable": false
    },
    {
        "field": "website",
        "headerName": "Website",
        "width": 160,
        "editable": true,
        "groupable": false,
        "aggregable": false
    },
    {
        "field": "rating",
        "headerName": "Rating",
        "width": 180,
        "type": "number",
        "editable": true,
        "availableAggregationFunctions": [
            "avg",
            "min",
            "max",
            "size"
        ]
    },
    {
        "field": "email",
        "headerName": "Email",
        "width": 150,
        "editable": true
    },
    {
        "field": "phone",
        "headerName": "Phone",
        "width": 150,
        "editable": true
    },
    {
        "field": "username",
        "headerName": "Username",
        "width": 150,
        "editable": true
    },
    {
        "field": "city",
        "headerName": "City",
        "editable": true
    },
    {
        "field": "country",
        "headerName": "Country",
        "type": "singleSelect",
        "valueOptions": [
            {
                "value": "AF",
                "code": "AF",
                "label": "Afghanistan",
                "phone": "93"
            },
            {
                "value": "AL",
                "code": "AL",
                "label": "Albania",
                "phone": "355"
            },
            {
                "value": "DZ",
                "code": "DZ",
                "label": "Algeria",
                "phone": "213"
            },
            {
                "value": "AX",
                "code": "AX",
                "label": "Alland Islands",
                "phone": "358"
            },
            {
                "value": "AS",
                "code": "AS",
                "label": "American Samoa",
                "phone": "1-684"
            },
            {
                "value": "AD",
                "code": "AD",
                "label": "Andorra",
                "phone": "376"
            },
            {
                "value": "AO",
                "code": "AO",
                "label": "Angola",
                "phone": "244"
            },
            {
                "value": "AI",
                "code": "AI",
                "label": "Anguilla",
                "phone": "1-264"
            },
            {
                "value": "AQ",
                "code": "AQ",
                "label": "Antarctica",
                "phone": "672"
            },
            {
                "value": "AG",
                "code": "AG",
                "label": "Antigua and Barbuda",
                "phone": "1-268"
            },
            {
                "value": "AR",
                "code": "AR",
                "label": "Argentina",
                "phone": "54"
            },
            {
                "value": "AM",
                "code": "AM",
                "label": "Armenia",
                "phone": "374"
            },
            {
                "value": "AW",
                "code": "AW",
                "label": "Aruba",
                "phone": "297"
            },
            {
                "value": "AU",
                "code": "AU",
                "label": "Australia",
                "phone": "61",
                "suggested": true
            },
            {
                "value": "AT",
                "code": "AT",
                "label": "Austria",
                "phone": "43"
            },
            {
                "value": "AZ",
                "code": "AZ",
                "label": "Azerbaijan",
                "phone": "994"
            },
            {
                "value": "BS",
                "code": "BS",
                "label": "Bahamas",
                "phone": "1-242"
            },
            {
                "value": "BH",
                "code": "BH",
                "label": "Bahrain",
                "phone": "973"
            },
            {
                "value": "BD",
                "code": "BD",
                "label": "Bangladesh",
                "phone": "880"
            },
            {
                "value": "BB",
                "code": "BB",
                "label": "Barbados",
                "phone": "1-246"
            },
            {
                "value": "BY",
                "code": "BY",
                "label": "Belarus",
                "phone": "375"
            },
            {
                "value": "BE",
                "code": "BE",
                "label": "Belgium",
                "phone": "32"
            },
            {
                "value": "BZ",
                "code": "BZ",
                "label": "Belize",
                "phone": "501"
            },
            {
                "value": "BJ",
                "code": "BJ",
                "label": "Benin",
                "phone": "229"
            },
            {
                "value": "BM",
                "code": "BM",
                "label": "Bermuda",
                "phone": "1-441"
            },
            {
                "value": "BT",
                "code": "BT",
                "label": "Bhutan",
                "phone": "975"
            },
            {
                "value": "BO",
                "code": "BO",
                "label": "Bolivia",
                "phone": "591"
            },
            {
                "value": "BA",
                "code": "BA",
                "label": "Bosnia and Herzegovina",
                "phone": "387"
            },
            {
                "value": "BW",
                "code": "BW",
                "label": "Botswana",
                "phone": "267"
            },
            {
                "value": "BV",
                "code": "BV",
                "label": "Bouvet Island",
                "phone": "47"
            },
            {
                "value": "BR",
                "code": "BR",
                "label": "Brazil",
                "phone": "55"
            },
            {
                "value": "IO",
                "code": "IO",
                "label": "British Indian Ocean Territory",
                "phone": "246"
            },
            {
                "value": "VG",
                "code": "VG",
                "label": "British Virgin Islands",
                "phone": "1-284"
            },
            {
                "value": "BN",
                "code": "BN",
                "label": "Brunei Darussalam",
                "phone": "673"
            },
            {
                "value": "BG",
                "code": "BG",
                "label": "Bulgaria",
                "phone": "359"
            },
            {
                "value": "BF",
                "code": "BF",
                "label": "Burkina Faso",
                "phone": "226"
            },
            {
                "value": "BI",
                "code": "BI",
                "label": "Burundi",
                "phone": "257"
            },
            {
                "value": "KH",
                "code": "KH",
                "label": "Cambodia",
                "phone": "855"
            },
            {
                "value": "CM",
                "code": "CM",
                "label": "Cameroon",
                "phone": "237"
            },
            {
                "value": "CA",
                "code": "CA",
                "label": "Canada",
                "phone": "1",
                "suggested": true
            },
            {
                "value": "CV",
                "code": "CV",
                "label": "Cape Verde",
                "phone": "238"
            },
            {
                "value": "KY",
                "code": "KY",
                "label": "Cayman Islands",
                "phone": "1-345"
            },
            {
                "value": "CF",
                "code": "CF",
                "label": "Central African Republic",
                "phone": "236"
            },
            {
                "value": "TD",
                "code": "TD",
                "label": "Chad",
                "phone": "235"
            },
            {
                "value": "CL",
                "code": "CL",
                "label": "Chile",
                "phone": "56"
            },
            {
                "value": "CN",
                "code": "CN",
                "label": "China",
                "phone": "86"
            },
            {
                "value": "CX",
                "code": "CX",
                "label": "Christmas Island",
                "phone": "61"
            },
            {
                "value": "CC",
                "code": "CC",
                "label": "Cocos (Keeling) Islands",
                "phone": "61"
            },
            {
                "value": "CO",
                "code": "CO",
                "label": "Colombia",
                "phone": "57"
            },
            {
                "value": "KM",
                "code": "KM",
                "label": "Comoros",
                "phone": "269"
            },
            {
                "value": "CD",
                "code": "CD",
                "label": "Congo, Democratic Republic of the",
                "phone": "243"
            },
            {
                "value": "CG",
                "code": "CG",
                "label": "Congo, Republic of the",
                "phone": "242"
            },
            {
                "value": "CK",
                "code": "CK",
                "label": "Cook Islands",
                "phone": "682"
            },
            {
                "value": "CR",
                "code": "CR",
                "label": "Costa Rica",
                "phone": "506"
            },
            {
                "value": "CI",
                "code": "CI",
                "label": "Cote d'Ivoire",
                "phone": "225"
            },
            {
                "value": "HR",
                "code": "HR",
                "label": "Croatia",
                "phone": "385"
            },
            {
                "value": "CU",
                "code": "CU",
                "label": "Cuba",
                "phone": "53"
            },
            {
                "value": "CW",
                "code": "CW",
                "label": "Curacao",
                "phone": "599"
            },
            {
                "value": "CY",
                "code": "CY",
                "label": "Cyprus",
                "phone": "357"
            },
            {
                "value": "CZ",
                "code": "CZ",
                "label": "Czech Republic",
                "phone": "420"
            },
            {
                "value": "DK",
                "code": "DK",
                "label": "Denmark",
                "phone": "45"
            },
            {
                "value": "DJ",
                "code": "DJ",
                "label": "Djibouti",
                "phone": "253"
            },
            {
                "value": "DM",
                "code": "DM",
                "label": "Dominica",
                "phone": "1-767"
            },
            {
                "value": "DO",
                "code": "DO",
                "label": "Dominican Republic",
                "phone": "1-809"
            },
            {
                "value": "EC",
                "code": "EC",
                "label": "Ecuador",
                "phone": "593"
            },
            {
                "value": "EG",
                "code": "EG",
                "label": "Egypt",
                "phone": "20"
            },
            {
                "value": "SV",
                "code": "SV",
                "label": "El Salvador",
                "phone": "503"
            },
            {
                "value": "GQ",
                "code": "GQ",
                "label": "Equatorial Guinea",
                "phone": "240"
            },
            {
                "value": "ER",
                "code": "ER",
                "label": "Eritrea",
                "phone": "291"
            },
            {
                "value": "EE",
                "code": "EE",
                "label": "Estonia",
                "phone": "372"
            },
            {
                "value": "ET",
                "code": "ET",
                "label": "Ethiopia",
                "phone": "251"
            },
            {
                "value": "FK",
                "code": "FK",
                "label": "Falkland Islands (Malvinas)",
                "phone": "500"
            },
            {
                "value": "FO",
                "code": "FO",
                "label": "Faroe Islands",
                "phone": "298"
            },
            {
                "value": "FJ",
                "code": "FJ",
                "label": "Fiji",
                "phone": "679"
            },
            {
                "value": "FI",
                "code": "FI",
                "label": "Finland",
                "phone": "358"
            },
            {
                "value": "FR",
                "code": "FR",
                "label": "France",
                "phone": "33",
                "suggested": true
            },
            {
                "value": "GF",
                "code": "GF",
                "label": "French Guiana",
                "phone": "594"
            },
            {
                "value": "PF",
                "code": "PF",
                "label": "French Polynesia",
                "phone": "689"
            },
            {
                "value": "TF",
                "code": "TF",
                "label": "French Southern Territories",
                "phone": "262"
            },
            {
                "value": "GA",
                "code": "GA",
                "label": "Gabon",
                "phone": "241"
            },
            {
                "value": "GM",
                "code": "GM",
                "label": "Gambia",
                "phone": "220"
            },
            {
                "value": "GE",
                "code": "GE",
                "label": "Georgia",
                "phone": "995"
            },
            {
                "value": "DE",
                "code": "DE",
                "label": "Germany",
                "phone": "49",
                "suggested": true
            },
            {
                "value": "GH",
                "code": "GH",
                "label": "Ghana",
                "phone": "233"
            },
            {
                "value": "GI",
                "code": "GI",
                "label": "Gibraltar",
                "phone": "350"
            },
            {
                "value": "GR",
                "code": "GR",
                "label": "Greece",
                "phone": "30"
            },
            {
                "value": "GL",
                "code": "GL",
                "label": "Greenland",
                "phone": "299"
            },
            {
                "value": "GD",
                "code": "GD",
                "label": "Grenada",
                "phone": "1-473"
            },
            {
                "value": "GP",
                "code": "GP",
                "label": "Guadeloupe",
                "phone": "590"
            },
            {
                "value": "GU",
                "code": "GU",
                "label": "Guam",
                "phone": "1-671"
            },
            {
                "value": "GT",
                "code": "GT",
                "label": "Guatemala",
                "phone": "502"
            },
            {
                "value": "GG",
                "code": "GG",
                "label": "Guernsey",
                "phone": "44"
            },
            {
                "value": "GN",
                "code": "GN",
                "label": "Guinea",
                "phone": "224"
            },
            {
                "value": "GW",
                "code": "GW",
                "label": "Guinea-Bissau",
                "phone": "245"
            },
            {
                "value": "GY",
                "code": "GY",
                "label": "Guyana",
                "phone": "592"
            },
            {
                "value": "HT",
                "code": "HT",
                "label": "Haiti",
                "phone": "509"
            },
            {
                "value": "HM",
                "code": "HM",
                "label": "Heard Island and McDonald Islands",
                "phone": "672"
            },
            {
                "value": "VA",
                "code": "VA",
                "label": "Holy See (Vatican City State)",
                "phone": "379"
            },
            {
                "value": "HN",
                "code": "HN",
                "label": "Honduras",
                "phone": "504"
            },
            {
                "value": "HK",
                "code": "HK",
                "label": "Hong Kong",
                "phone": "852"
            },
            {
                "value": "HU",
                "code": "HU",
                "label": "Hungary",
                "phone": "36"
            },
            {
                "value": "IS",
                "code": "IS",
                "label": "Iceland",
                "phone": "354"
            },
            {
                "value": "IN",
                "code": "IN",
                "label": "India",
                "phone": "91"
            },
            {
                "value": "ID",
                "code": "ID",
                "label": "Indonesia",
                "phone": "62"
            },
            {
                "value": "IR",
                "code": "IR",
                "label": "Iran, Islamic Republic of",
                "phone": "98"
            },
            {
                "value": "IQ",
                "code": "IQ",
                "label": "Iraq",
                "phone": "964"
            },
            {
                "value": "IE",
                "code": "IE",
                "label": "Ireland",
                "phone": "353"
            },
            {
                "value": "IM",
                "code": "IM",
                "label": "Isle of Man",
                "phone": "44"
            },
            {
                "value": "IL",
                "code": "IL",
                "label": "Israel",
                "phone": "972"
            },
            {
                "value": "IT",
                "code": "IT",
                "label": "Italy",
                "phone": "39"
            },
            {
                "value": "JM",
                "code": "JM",
                "label": "Jamaica",
                "phone": "1-876"
            },
            {
                "value": "JP",
                "code": "JP",
                "label": "Japan",
                "phone": "81",
                "suggested": true
            },
            {
                "value": "JE",
                "code": "JE",
                "label": "Jersey",
                "phone": "44"
            },
            {
                "value": "JO",
                "code": "JO",
                "label": "Jordan",
                "phone": "962"
            },
            {
                "value": "KZ",
                "code": "KZ",
                "label": "Kazakhstan",
                "phone": "7"
            },
            {
                "value": "KE",
                "code": "KE",
                "label": "Kenya",
                "phone": "254"
            },
            {
                "value": "KI",
                "code": "KI",
                "label": "Kiribati",
                "phone": "686"
            },
            {
                "value": "KP",
                "code": "KP",
                "label": "Korea, Democratic People's Republic of",
                "phone": "850"
            },
            {
                "value": "KR",
                "code": "KR",
                "label": "Korea, Republic of",
                "phone": "82"
            },
            {
                "value": "XK",
                "code": "XK",
                "label": "Kosovo",
                "phone": "383"
            },
            {
                "value": "KW",
                "code": "KW",
                "label": "Kuwait",
                "phone": "965"
            },
            {
                "value": "KG",
                "code": "KG",
                "label": "Kyrgyzstan",
                "phone": "996"
            },
            {
                "value": "LA",
                "code": "LA",
                "label": "Lao People's Democratic Republic",
                "phone": "856"
            },
            {
                "value": "LV",
                "code": "LV",
                "label": "Latvia",
                "phone": "371"
            },
            {
                "value": "LB",
                "code": "LB",
                "label": "Lebanon",
                "phone": "961"
            },
            {
                "value": "LS",
                "code": "LS",
                "label": "Lesotho",
                "phone": "266"
            },
            {
                "value": "LR",
                "code": "LR",
                "label": "Liberia",
                "phone": "231"
            },
            {
                "value": "LY",
                "code": "LY",
                "label": "Libya",
                "phone": "218"
            },
            {
                "value": "LI",
                "code": "LI",
                "label": "Liechtenstein",
                "phone": "423"
            },
            {
                "value": "LT",
                "code": "LT",
                "label": "Lithuania",
                "phone": "370"
            },
            {
                "value": "LU",
                "code": "LU",
                "label": "Luxembourg",
                "phone": "352"
            },
            {
                "value": "MO",
                "code": "MO",
                "label": "Macao",
                "phone": "853"
            },
            {
                "value": "MK",
                "code": "MK",
                "label": "Macedonia, the Former Yugoslav Republic of",
                "phone": "389"
            },
            {
                "value": "MG",
                "code": "MG",
                "label": "Madagascar",
                "phone": "261"
            },
            {
                "value": "MW",
                "code": "MW",
                "label": "Malawi",
                "phone": "265"
            },
            {
                "value": "MY",
                "code": "MY",
                "label": "Malaysia",
                "phone": "60"
            },
            {
                "value": "MV",
                "code": "MV",
                "label": "Maldives",
                "phone": "960"
            },
            {
                "value": "ML",
                "code": "ML",
                "label": "Mali",
                "phone": "223"
            },
            {
                "value": "MT",
                "code": "MT",
                "label": "Malta",
                "phone": "356"
            },
            {
                "value": "MH",
                "code": "MH",
                "label": "Marshall Islands",
                "phone": "692"
            },
            {
                "value": "MQ",
                "code": "MQ",
                "label": "Martinique",
                "phone": "596"
            },
            {
                "value": "MR",
                "code": "MR",
                "label": "Mauritania",
                "phone": "222"
            },
            {
                "value": "MU",
                "code": "MU",
                "label": "Mauritius",
                "phone": "230"
            },
            {
                "value": "YT",
                "code": "YT",
                "label": "Mayotte",
                "phone": "262"
            },
            {
                "value": "MX",
                "code": "MX",
                "label": "Mexico",
                "phone": "52"
            },
            {
                "value": "FM",
                "code": "FM",
                "label": "Micronesia, Federated States of",
                "phone": "691"
            },
            {
                "value": "MD",
                "code": "MD",
                "label": "Moldova, Republic of",
                "phone": "373"
            },
            {
                "value": "MC",
                "code": "MC",
                "label": "Monaco",
                "phone": "377"
            },
            {
                "value": "MN",
                "code": "MN",
                "label": "Mongolia",
                "phone": "976"
            },
            {
                "value": "ME",
                "code": "ME",
                "label": "Montenegro",
                "phone": "382"
            },
            {
                "value": "MS",
                "code": "MS",
                "label": "Montserrat",
                "phone": "1-664"
            },
            {
                "value": "MA",
                "code": "MA",
                "label": "Morocco",
                "phone": "212"
            },
            {
                "value": "MZ",
                "code": "MZ",
                "label": "Mozambique",
                "phone": "258"
            },
            {
                "value": "MM",
                "code": "MM",
                "label": "Myanmar",
                "phone": "95"
            },
            {
                "value": "NA",
                "code": "NA",
                "label": "Namibia",
                "phone": "264"
            },
            {
                "value": "NR",
                "code": "NR",
                "label": "Nauru",
                "phone": "674"
            },
            {
                "value": "NP",
                "code": "NP",
                "label": "Nepal",
                "phone": "977"
            },
            {
                "value": "NL",
                "code": "NL",
                "label": "Netherlands",
                "phone": "31"
            },
            {
                "value": "NC",
                "code": "NC",
                "label": "New Caledonia",
                "phone": "687"
            },
            {
                "value": "NZ",
                "code": "NZ",
                "label": "New Zealand",
                "phone": "64"
            },
            {
                "value": "NI",
                "code": "NI",
                "label": "Nicaragua",
                "phone": "505"
            },
            {
                "value": "NE",
                "code": "NE",
                "label": "Niger",
                "phone": "227"
            },
            {
                "value": "NG",
                "code": "NG",
                "label": "Nigeria",
                "phone": "234"
            },
            {
                "value": "NU",
                "code": "NU",
                "label": "Niue",
                "phone": "683"
            },
            {
                "value": "NF",
                "code": "NF",
                "label": "Norfolk Island",
                "phone": "672"
            },
            {
                "value": "MP",
                "code": "MP",
                "label": "Northern Mariana Islands",
                "phone": "1-670"
            },
            {
                "value": "NO",
                "code": "NO",
                "label": "Norway",
                "phone": "47"
            },
            {
                "value": "OM",
                "code": "OM",
                "label": "Oman",
                "phone": "968"
            },
            {
                "value": "PK",
                "code": "PK",
                "label": "Pakistan",
                "phone": "92"
            },
            {
                "value": "PW",
                "code": "PW",
                "label": "Palau",
                "phone": "680"
            },
            {
                "value": "PS",
                "code": "PS",
                "label": "Palestine, State of",
                "phone": "970"
            },
            {
                "value": "PA",
                "code": "PA",
                "label": "Panama",
                "phone": "507"
            },
            {
                "value": "PG",
                "code": "PG",
                "label": "Papua New Guinea",
                "phone": "675"
            },
            {
                "value": "PY",
                "code": "PY",
                "label": "Paraguay",
                "phone": "595"
            },
            {
                "value": "PE",
                "code": "PE",
                "label": "Peru",
                "phone": "51"
            },
            {
                "value": "PH",
                "code": "PH",
                "label": "Philippines",
                "phone": "63"
            },
            {
                "value": "PN",
                "code": "PN",
                "label": "Pitcairn",
                "phone": "870"
            },
            {
                "value": "PL",
                "code": "PL",
                "label": "Poland",
                "phone": "48"
            },
            {
                "value": "PT",
                "code": "PT",
                "label": "Portugal",
                "phone": "351"
            },
            {
                "value": "PR",
                "code": "PR",
                "label": "Puerto Rico",
                "phone": "1"
            },
            {
                "value": "QA",
                "code": "QA",
                "label": "Qatar",
                "phone": "974"
            },
            {
                "value": "RE",
                "code": "RE",
                "label": "Reunion",
                "phone": "262"
            },
            {
                "value": "RO",
                "code": "RO",
                "label": "Romania",
                "phone": "40"
            },
            {
                "value": "RU",
                "code": "RU",
                "label": "Russian Federation",
                "phone": "7"
            },
            {
                "value": "RW",
                "code": "RW",
                "label": "Rwanda",
                "phone": "250"
            },
            {
                "value": "BL",
                "code": "BL",
                "label": "Saint Barthelemy",
                "phone": "590"
            },
            {
                "value": "SH",
                "code": "SH",
                "label": "Saint Helena",
                "phone": "290"
            },
            {
                "value": "KN",
                "code": "KN",
                "label": "Saint Kitts and Nevis",
                "phone": "1-869"
            },
            {
                "value": "LC",
                "code": "LC",
                "label": "Saint Lucia",
                "phone": "1-758"
            },
            {
                "value": "MF",
                "code": "MF",
                "label": "Saint Martin (French part)",
                "phone": "590"
            },
            {
                "value": "PM",
                "code": "PM",
                "label": "Saint Pierre and Miquelon",
                "phone": "508"
            },
            {
                "value": "VC",
                "code": "VC",
                "label": "Saint Vincent and the Grenadines",
                "phone": "1-784"
            },
            {
                "value": "WS",
                "code": "WS",
                "label": "Samoa",
                "phone": "685"
            },
            {
                "value": "SM",
                "code": "SM",
                "label": "San Marino",
                "phone": "378"
            },
            {
                "value": "ST",
                "code": "ST",
                "label": "Sao Tome and Principe",
                "phone": "239"
            },
            {
                "value": "SA",
                "code": "SA",
                "label": "Saudi Arabia",
                "phone": "966"
            },
            {
                "value": "SN",
                "code": "SN",
                "label": "Senegal",
                "phone": "221"
            },
            {
                "value": "RS",
                "code": "RS",
                "label": "Serbia",
                "phone": "381"
            },
            {
                "value": "SC",
                "code": "SC",
                "label": "Seychelles",
                "phone": "248"
            },
            {
                "value": "SL",
                "code": "SL",
                "label": "Sierra Leone",
                "phone": "232"
            },
            {
                "value": "SG",
                "code": "SG",
                "label": "Singapore",
                "phone": "65"
            },
            {
                "value": "SX",
                "code": "SX",
                "label": "Sint Maarten (Dutch part)",
                "phone": "1-721"
            },
            {
                "value": "SK",
                "code": "SK",
                "label": "Slovakia",
                "phone": "421"
            },
            {
                "value": "SI",
                "code": "SI",
                "label": "Slovenia",
                "phone": "386"
            },
            {
                "value": "SB",
                "code": "SB",
                "label": "Solomon Islands",
                "phone": "677"
            },
            {
                "value": "SO",
                "code": "SO",
                "label": "Somalia",
                "phone": "252"
            },
            {
                "value": "ZA",
                "code": "ZA",
                "label": "South Africa",
                "phone": "27"
            },
            {
                "value": "GS",
                "code": "GS",
                "label": "South Georgia and the South Sandwich Islands",
                "phone": "500"
            },
            {
                "value": "SS",
                "code": "SS",
                "label": "South Sudan",
                "phone": "211"
            },
            {
                "value": "ES",
                "code": "ES",
                "label": "Spain",
                "phone": "34"
            },
            {
                "value": "LK",
                "code": "LK",
                "label": "Sri Lanka",
                "phone": "94"
            },
            {
                "value": "SD",
                "code": "SD",
                "label": "Sudan",
                "phone": "249"
            },
            {
                "value": "SR",
                "code": "SR",
                "label": "Suriname",
                "phone": "597"
            },
            {
                "value": "SJ",
                "code": "SJ",
                "label": "Svalbard and Jan Mayen",
                "phone": "47"
            },
            {
                "value": "SZ",
                "code": "SZ",
                "label": "Swaziland",
                "phone": "268"
            },
            {
                "value": "SE",
                "code": "SE",
                "label": "Sweden",
                "phone": "46"
            },
            {
                "value": "CH",
                "code": "CH",
                "label": "Switzerland",
                "phone": "41"
            },
            {
                "value": "SY",
                "code": "SY",
                "label": "Syrian Arab Republic",
                "phone": "963"
            },
            {
                "value": "TW",
                "code": "TW",
                "label": "Taiwan, Province of China",
                "phone": "886"
            },
            {
                "value": "TJ",
                "code": "TJ",
                "label": "Tajikistan",
                "phone": "992"
            },
            {
                "value": "TH",
                "code": "TH",
                "label": "Thailand",
                "phone": "66"
            },
            {
                "value": "TL",
                "code": "TL",
                "label": "Timor-Leste",
                "phone": "670"
            },
            {
                "value": "TG",
                "code": "TG",
                "label": "Togo",
                "phone": "228"
            },
            {
                "value": "TK",
                "code": "TK",
                "label": "Tokelau",
                "phone": "690"
            },
            {
                "value": "TO",
                "code": "TO",
                "label": "Tonga",
                "phone": "676"
            },
            {
                "value": "TT",
                "code": "TT",
                "label": "Trinidad and Tobago",
                "phone": "1-868"
            },
            {
                "value": "TN",
                "code": "TN",
                "label": "Tunisia",
                "phone": "216"
            },
            {
                "value": "TR",
                "code": "TR",
                "label": "Turkey",
                "phone": "90"
            },
            {
                "value": "TM",
                "code": "TM",
                "label": "Turkmenistan",
                "phone": "993"
            },
            {
                "value": "TC",
                "code": "TC",
                "label": "Turks and Caicos Islands",
                "phone": "1-649"
            },
            {
                "value": "TV",
                "code": "TV",
                "label": "Tuvalu",
                "phone": "688"
            },
            {
                "value": "UG",
                "code": "UG",
                "label": "Uganda",
                "phone": "256"
            },
            {
                "value": "UA",
                "code": "UA",
                "label": "Ukraine",
                "phone": "380"
            },
            {
                "value": "AE",
                "code": "AE",
                "label": "United Arab Emirates",
                "phone": "971"
            },
            {
                "value": "GB",
                "code": "GB",
                "label": "United Kingdom",
                "phone": "44"
            },
            {
                "value": "TZ",
                "code": "TZ",
                "label": "United Republic of Tanzania",
                "phone": "255"
            },
            {
                "value": "US",
                "code": "US",
                "label": "United States",
                "phone": "1",
                "suggested": true
            },
            {
                "value": "UY",
                "code": "UY",
                "label": "Uruguay",
                "phone": "598"
            },
            {
                "value": "VI",
                "code": "VI",
                "label": "US Virgin Islands",
                "phone": "1-340"
            },
            {
                "value": "UZ",
                "code": "UZ",
                "label": "Uzbekistan",
                "phone": "998"
            },
            {
                "value": "VU",
                "code": "VU",
                "label": "Vanuatu",
                "phone": "678"
            },
            {
                "value": "VE",
                "code": "VE",
                "label": "Venezuela",
                "phone": "58"
            },
            {
                "value": "VN",
                "code": "VN",
                "label": "Vietnam",
                "phone": "84"
            },
            {
                "value": "WF",
                "code": "WF",
                "label": "Wallis and Futuna",
                "phone": "681"
            },
            {
                "value": "EH",
                "code": "EH",
                "label": "Western Sahara",
                "phone": "212"
            },
            {
                "value": "YE",
                "code": "YE",
                "label": "Yemen",
                "phone": "967"
            },
            {
                "value": "ZM",
                "code": "ZM",
                "label": "Zambia",
                "phone": "260"
            },
            {
                "value": "ZW",
                "code": "ZW",
                "label": "Zimbabwe",
                "phone": "263"
            }
        ],
        "width": 150,
        "editable": true
    },
    {
        "field": "company",
        "headerName": "Company",
        "width": 180,
        "editable": true
    },
    {
        "field": "position",
        "headerName": "Position",
        "width": 180,
        "editable": true
    },
    {
        "field": "lastUpdated",
        "headerName": "Updated on",
        "type": "dateTime",
        "width": 180,
        "editable": true
    },
    {
        "field": "dateCreated",
        "headerName": "Created on",
        "type": "date",
        "width": 120,
        "editable": true
    },
    {
        "field": "isAdmin",
        "headerName": "Is admin?",
        "type": "boolean",
        "width": 150,
        "editable": true
    },
    {
        "field": "salary",
        "headerName": "Salary",
        "type": "number"
    }
]

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
            <div className={styles.insideTableContainer}>
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