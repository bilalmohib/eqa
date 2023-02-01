import { useState, FC } from "react";

// Importing Icons
import { BsPrinter, BsSearch } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

// Importing Ripples
import { createRipples } from 'react-ripples';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { Line } from 'react-chartjs-2';

// Importing components

// Importing Styles
import styles from "./style.module.css";
import { ButtonBase } from "@mui/material";
import Chart from "../Chart";

// Creating Button Ripples
const ButtonRipples = createRipples({
    color: 'rgba(0, 0, 0, .1)',
    during: 600,
})

interface GradeComparisonProps {
    isOpen: Boolean
    data: any
    states: any
    columnValues: string
    buttonTitle: string,
    tableTitle: string
}

const GradeComparison: FC<GradeComparisonProps> = ({
    isOpen,
    data,
    states,
    columnValues,
    buttonTitle,
    tableTitle
}): JSX.Element => {

    const [searchText, setSearchText] = useState<string>("");

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
                        {/* <div className="input-group" style={{ backgroundColor: "#f3f3f3" }}>
                            <span className="input-group-text" id="Search">
                                <BsSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="Search"
                                value={searchText}
                                onChange={(e: any) => setSearchText(e.target.value)}
                            />
                        </div> */}
                        {/* <div>
                            <LibraryBooksIcon sx={{ color: "#4f747a" }} />
                        </div>
                        <h5 className={styles.tableSubTitleTopLeft}>
                            <b>
                                Following courses are offered
                            </b>
                        </h5> */}

                    </div>
                    <div>
                        {/* Standard */}
                        {/* <div className={styles.btnContainerTable}>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`}>CSV</button>
                                </ButtonRipples>
                            </div>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`}>Copy</button>
                                </ButtonRipples>
                            </div>
                            <div className={styles.btnControl}>
                                <ButtonRipples>
                                    <button className={`btn btn-light ${styles.insideBtnControl}`}><BsPrinter style={{ marginTop: -5 }} size={20} /></button>
                                </ButtonRipples>
                            </div>
                        </div> */}
                    </div>
                </header>
                {/* Body of Header Ends Here */}

                {/* Body of Body Container Starts Here */}
                <div className={styles.bodyOfBodyContainer}>
                    <Chart />
                </div>
                {/* Body of Body Container Ends Here */}

            </section>
            {/* Body Ends here */}

            {/* Footer Stats here */}
            {/* <section className={styles.footerContainer}>
                Footer
            </section> */}
        </div>
    )
}
export default GradeComparison;