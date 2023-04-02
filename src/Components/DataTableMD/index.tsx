/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, FC } from "react";

// Importing Icons
import { BsPrinter } from "react-icons/bs";

import { ExportToCsv } from 'export-to-csv';

import { useTranslation } from "react-i18next";

// For copying to clipboard
import copy from 'copy-to-clipboard';

import SnackBar from "../../Components/SnackBar";

import {
    Button,
    Box,
    Typography,
    Grid,
    TextField,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    Autocomplete,
    Switch,
    FormGroup
} from '@mui/material';

// Importing Ripples
import { createRipples } from 'react-ripples';

import { BsCardChecklist } from "react-icons/bs";

import RefreshIcon from '@mui/icons-material/Refresh';

// For printing the table.
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Importing components
// import CustomTable from "./CustomTable";
import CustomTableCrud from "./CustomTableCrud";

// Importing Styles
import styles from "./style.module.css";
import { ButtonBase } from "@mui/material";

// Creating Button Ripples
const ButtonRipples = createRipples({
    color: 'rgba(0, 0, 0, .1)',
    during: 600,
})

const colorArray = [
    "#4f598c",
    "#70519f",
    "#0d8aee",
    "#0b7cd6",
    "#0e769e",
    "#0d6886",
    "#26848a",
    "#18a193",
    "#be0a67"
];

interface DataTableMDProps {
    isOpen: Boolean
    data: any
    states: any
    columnName: string
    buttonTitle: string,
    tableTitle: string,
    ColHeader: any,
    tableInfo: any,
    currentLang: string,
    setFetchUpdate: any
}

const DataTableMD: FC<DataTableMDProps> = ({
    isOpen,
    data,
    states,
    columnName,
    buttonTitle,
    tableTitle,
    ColHeader,
    tableInfo,
    currentLang,
    setFetchUpdate
}): JSX.Element => {
    const { t } = useTranslation();

    ///////////////////////////////// Snackbar State /////////////////////////////////
    const [snackBarHandler, setSnackBarHandler] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    ///////////////////////////////// Snackbar State /////////////////////////////////

    const printTable = () => {
        // console.clear();
        // console.log("Print Table DATA ===> ", data);
        // console.log(ColHeader);

        const doc = new jsPDF();

        // Converting the data into the format required by the autoTable function.
        // Into Array of Arrays.
        const bodyData = data.map((obj: any) => {
            const keys = Object.keys(obj);
            return keys.map(key => obj[key]);
        });

        autoTable(doc, {
            head: ColHeader,
            body: bodyData,
        });

        doc.save(columnName);
        doc.setFillColor(60, 103, 102);
        console.log(`./${columnName}.pdf generated`);
    }

    const refreshTable = () => {
        setSnackBarHandler({
            open: true,
            message: "Table Refreshed Successfully",
            severity: 'success'
        });
        setFetchUpdate(true);
    }

    const generateCSV = () => {
        // console.clear();
        // console.log("Generate CSV DATA ===> ", data);
        // console.log(ColHeader);

        // Please generate a csv where first row is the column names and the rest of the rows are the data.
        // The data should be in the same order as the column names.

        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: tableTitle + ' Table',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
        };

        const csvExporter = new ExportToCsv(options);

        csvExporter.generateCsv(data);
    }

    const copyToClipboard = () => {
        // console.clear();
        // console.log("Copy to Clipboard DATA ===> ", data);
        // console.log(ColHeader);

        // Please copy the data in the same format as the csv.
        // The data should be in the same order as the column names.

        setSnackBarHandler({
            open: true,
            message: `Copied to clipboard`,
            severity: 'info'
        });

        const bodyData = data.map((obj: any) => Object.keys(obj).map(key => obj[key]));

        const csvData = ColHeader.concat(bodyData);

        console.log(csvData);

        copy(csvData);

        // Copy with options
        copy(csvData, {
            debug: true,
            message: `${tableTitle} copied to clipboard`,
        });
        // console.log("Copied to clipboard");
    }

    const [currentColor, setCurrentColor] = useState("white");

    return (
        <div className={styles.container}>
            {/* Header Starts here */}
            <header
                className={styles.headerContainer}
                style={{
                    backgroundColor: currentColor,
                    color: (currentColor === "white" ? "black" : "white")
                }}
            >
                <section className={styles.headerLeft}>
                    <h5
                        className={styles.headingTopLeft}
                        dangerouslySetInnerHTML={{ __html: tableTitle }}
                    />
                </section>
                <section className={styles.headerRight}>
                    <div className={styles.headerButtonContainer}>
                        <ButtonBase className={styles.btnControls} style={{ backgroundColor: "#6cc561" }}>
                        </ButtonBase>
                        <ButtonBase className={styles.btnControls} style={{ backgroundColor: "#ffcc9f" }}>
                        </ButtonBase>
                        <ButtonBase className={styles.btnControls} style={{ backgroundColor: "#ff5969" }}>
                        </ButtonBase>
                    </div>
                    <Box className={styles.btnDropDownTableBtn}
                        sx={{
                            backgroundColor: currentColor,
                            // Hover
                            "&:hover": {
                                backgroundColor: (currentColor === "white" ? "#f4f4f4" : "white"),
                            },
                        }}
                    >
                        <div className="dropdown">
                            <a className="dropdown-toggle hidden-arrow" type="button" id="dropdownMenuicon" data-mdb-toggle="dropdown" aria-expanded="false">
                                <ButtonRipples>
                                    <div style={{ width: "30px", display: "flex", justifyContent: "center", height: "48px" }}>
                                        <i
                                            className="fas fa-ellipsis-v"
                                            style={{
                                                paddingTop: 14,
                                                fontSize: 20,
                                                color: (currentColor === "white" ? "grey" : "white")
                                            }}
                                        />
                                    </div>
                                </ButtonRipples>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuicon"
                                style={{
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
                                {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <li>
                                    <a className="dropdown-item" href="#"> <i className="fas fa-exchange-alt pe-2" /> &nbsp;&nbsp;&nbsp; Panel Style &raquo; </a>
                                    <ul className="dropdown-menu dropdown-submenu" style={{
                                        // marginTop: 40,
                                        marginLeft: (currentLang === "ar") ? 0 : -160,
                                        marginRight: (currentLang === "ar") ? -100 : 0
                                    }}>
                                        <li>
                                            <a className="dropdown-item" href="#">
                                                <Box sx={{ width: 120, display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="flex mt-2">
                                                    {colorArray.slice(0, 3).map((color: string, index: number) => {
                                                        return (
                                                            <Box
                                                                onClick={() => {
                                                                    setCurrentColor(color);
                                                                }}
                                                            >
                                                                <div key={index} style={{ width: 30, height: 30, backgroundColor: color, borderRadius: 5, margin: 2 }} />
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>

                                                <Box sx={{ width: 120, display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="flex mt-2">
                                                    {colorArray.slice(3, 6).map((color: string, index: number) => {
                                                        return (
                                                            <Box
                                                                onClick={() => {
                                                                    setCurrentColor(color);
                                                                }}
                                                            >
                                                                <div key={index} style={{ width: 30, height: 30, backgroundColor: color, borderRadius: 5, margin: 2 }} />
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>

                                                <Box sx={{ width: 120, display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="flex mt-2">
                                                    {colorArray.slice(6, 9).map((color: string, index: number) => {
                                                        return (
                                                            <Box
                                                                onClick={() => {
                                                                    setCurrentColor(color);
                                                                }}
                                                            >
                                                                <div key={index} style={{ width: 30, height: 30, backgroundColor: color, borderRadius: 5, margin: 2 }} />
                                                            </Box>
                                                        )
                                                    })}
                                                </Box>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"> <i className="fas fa-redo pe-2" /> &nbsp;&nbsp;&nbsp; Reset Panel</a>
                                </li>
                            </ul>
                        </div>
                    </Box>
                </section>
            </header >
            {/* Header Ends here */}

            {/* Body Starts here */}
            <section className={styles.bodyContainer}>
                {/* Body of Header Starts Here */}
                <header className={styles.containerbodyHeader}>
                    <div className="d-flex" style={{ marginTop: 3 }}>
                        <div>
                            <BsCardChecklist style={{ color: "#4f747a", fontSize: 28 }} />
                        </div>
                        <h5 className={styles.tableSubTitleTopLeft}>
                            <b>
                                {tableInfo}
                            </b>
                        </h5>
                    </div>
                    <div className="d-flex justify-content-between">
                        {/* Standard */}
                        <div className={styles.btnContainerTable}>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`} onClick={() => generateCSV()}>
                                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.table.Buttons.btnCSV')}
                                    </button>
                                </ButtonRipples>
                            </div>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`} onClick={() => copyToClipboard()}>
                                        {t('Home.Sidebar.list.userManagement.subMenu.Users.details.table.Buttons.btnCopy')}
                                    </button>
                                </ButtonRipples>
                            </div>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`} onClick={() => printTable()}>
                                        <BsPrinter style={{ marginTop: -2 }} size={20} />
                                    </button>
                                </ButtonRipples>
                            </div>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`} onClick={() => refreshTable()}>
                                        {/* <BsPrinter style={{ marginTop: -5 }} size={20} /> */}
                                        <RefreshIcon style={{ display: "block", color: "blue" }} />
                                    </button>
                                </ButtonRipples>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Body of Header Ends Here */}

                {/* Body of Body Container Starts Here */}
                <div className={styles.bodyOfBodyContainer}>
                    <CustomTableCrud
                        data={data}
                        states={states}
                        columnName={columnName}
                        buttonTitle={buttonTitle}
                        isOpen={isOpen}
                        currentLang={currentLang}
                        ColHeader={ColHeader}
                        setFetchUpdate={setFetchUpdate}
                    />
                </div>
                {/* Body of Body Container Ends Here */}

                <SnackBar
                    isOpen={snackBarHandler.open}
                    message={snackBarHandler.message}
                    severity={snackBarHandler.severity}
                    setIsOpen={
                        // Only pass the setIsOpen function to the SnackBar component
                        // and not the whole state object
                        (isOpen: boolean) => setSnackBarHandler({ ...snackBarHandler, open: isOpen })
                    }
                />

            </section>
            {/* Body Ends here */}
        </div >
    )
}
export default DataTableMD;