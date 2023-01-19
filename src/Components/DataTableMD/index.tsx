import { HiDotsVertical } from "react-icons/hi";

import styles from "./style.module.css";

const DataTableMD = () => {
    return (
        <div className={styles.container}>

            {/* Header Starts here */}
            <header className={styles.headerContainer}>
                <section className={styles.headerLeft}>
                    <h5 className={styles.headingTopLeft}><b style={{ fontWeight: "bold" }}>Offered</b> <i>Courses</i></h5>
                </section>
                <section className={styles.headerRight}>
                    <div className={styles.headerButtonContainer}>
                        <div className={styles.btnControls} style={{backgroundColor:"#6cc561"}}>
                        </div>
                        <div className={styles.btnControls} style={{backgroundColor:"#ffcc9f"}}>
                        </div>
                        <div className={styles.btnControls} style={{backgroundColor:"#ff5969"}}>
                        </div>
                    </div>
                    <div className={styles.btnDropDownTableBtn}>
                        <HiDotsVertical size={20} />
                    </div>
                </section>
            </header>

            {/* Body Starts here */}
            <section className={styles.bodyContainer}>

            </section>

            {/* Footer Stats here */}
            {/* <section className={styles.footerContainer}>
                Footer
            </section> */}
        </div>
    )
}
export default DataTableMD;