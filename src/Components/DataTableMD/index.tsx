/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, FC } from "react";

// Importing Icons
import { BsPrinter } from "react-icons/bs";

import { ExportToCsv } from 'export-to-csv';

import { useTranslation } from "react-i18next";

// For copying to clipboard
import copy from 'copy-to-clipboard';

// Importing Ripples
import { createRipples } from 'react-ripples';

// Importing types
import { CourseOfferingTypes } from "../../Data/Tables/CourseOfferings/types";

// Importing material ui components
import {
    Button,
    Typography
} from '@mui/material';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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

    // For search
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchText, setSearchText] = useState<string>("");

    const printTable = () => {
        // console.clear();
        // console.log("Print Table DATA ===> ", data);
        // console.log(ColHeader);

        const doc = new jsPDF()

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

        doc.save(tableTitle);
        console.log(`./${tableTitle}.pdf generated`);
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

    return (
        <div className={styles.container}>
            {/* Header Starts here */}
            <header className={styles.headerContainer}>
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
                    <div className={styles.btnDropDownTableBtn}>
                        <div className="dropdown">
                            <a className="dropdown-toggle hidden-arrow" type="button" id="dropdownMenuicon" data-mdb-toggle="dropdown" aria-expanded="false" style={{}}>
                                <ButtonRipples>
                                    <div style={{ width: "30px", display: "flex", justifyContent: "center", height: "48px" }}>
                                        <i className="fas fa-ellipsis-v" style={{ paddingTop: 14, fontSize: 20, color: "grey" }} />
                                    </div>
                                </ButtonRipples>
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuicon">
                                {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <li><a className="dropdown-item" href="#"> <i className="fas fa-user-alt pe-2" />My Profile</a></li>
                                <li><a className="dropdown-item" href="#"> <i className="fas fa-cog pe-2" />Settings</a></li>
                                <li><a className="dropdown-item" href="#"> <i className="fas fa-door-open pe-2" />Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </header>
            {/* Header Ends here */}

            {/* Body Starts here */}
            <section className={styles.bodyContainer}>
                {/* Body of Header Starts Here */}
                <header className={styles.containerbodyHeader}>
                    <div className="d-flex" style={{ marginTop: 3 }}>
                        <div>
                            <LibraryBooksIcon sx={{ color: "#4f747a" }} />
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
                                    <button className={`btn btn-light ${styles.insideBtnControl}`} onClick={() => setFetchUpdate(true)}>
                                        {/* <BsPrinter style={{ marginTop: -5 }} size={20} /> */}
                                        <RefreshIcon style={{ display: "block",color:"blue" }} />
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
                        searchText={searchText}
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

            </section>
            {/* Body Ends here */}
        </div>
    )
}
export default DataTableMD;