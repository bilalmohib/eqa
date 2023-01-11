import logo from "../../assets/Images/Navbar/logo.png";
// Language Images
import eng from "../../assets/Images/Navbar/united-kingdom.png";
import styles from './style.module.css';

const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoMobileContainer}>
                <img
                    className={styles.logo}
                    src={logo}
                    alt="EQA University"
                    title="EQA University"
                />
            </div>
            <div className={styles.mobileDropStyle}>
                <div className="dropdown" title="Select a language for the site">
                    <div className={`${styles.langDropDown}`} id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
                        <img
                            width={25}
                            height={25}
                            src={eng}
                            alt="English"
                            title="English"
                        />
                        <p>Eng <i className="fas fa-chevron-down"></i></p>
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" href="#">About Us</a></li>
                        <li><a className="dropdown-item" href="#">Notice Board</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header;