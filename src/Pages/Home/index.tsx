import { useState } from "react";

//importing navbar
import Navbar from "../../Components/Navbar";
import AssessmentDashboard from "../../Components/Pages/Home/AssessmentDashboard";
import Sidebar from "../../Components/Sidebar";

import styles from "./style.module.css";

const Home = () => {

    const [hideExtra, setHideExtra] = useState<Number>(1);
    const [loading, setLoading] = useState<Boolean>(true);

    const [isOpen, setIsOpen] = useState<Boolean>(true);

    const [currentMenuItem, setCurrentMenuItem] = useState<Number>(1);

    const [currentFullLengthItem, setCurrentFullLengthItem] = useState<Number>(1);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className='d-flex'>
                    <Sidebar currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem} isOpen={isOpen} setIsOpen={setIsOpen} />

                    <div className={`${(isOpen) ? (styles.Home) : (styles.onSideClose)}`}>
                        <AssessmentDashboard />
                    </div>

                </div>
            </main>

            <footer className={styles.footer}>
               
            </footer>
        </div>
    )
}
export default Home;