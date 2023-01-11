import { useEffect } from "react";

import logo from "../../assets/Images/Navbar/logo.png";
// Language Images
import eng from "../../assets/Images/Navbar/united-kingdom.png";
import styles from './style.module.css';

const Header = () => {

    useEffect(() => {
        // The debounce function receives our function as a parameter
        const debounce = (fn: any) => {
            // This holds the requestAnimationFrame reference, so we can cancel it if we wish
            let frame: any;
            // The debounce function returns a new function that can receive a variable number of arguments
            return (...params: any) => {
                // If the frame variable has been defined, clear it now, and queue for next frame
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                // Queue our function call for the next frame
                frame = requestAnimationFrame(() => {
                    // Call our function and pass any params we received
                    fn(...params);
                });
            }
        };

        // Reads out the scroll position and stores it in the data attribute
        // so we can use it in our stylesheets
        const storeScroll = () => {
            // @ts-ignore
            document.documentElement.dataset.scroll = window.scrollY;
        }

        // Listen for new scroll events, here we debounce our `storeScroll` function
        document.addEventListener('scroll', debounce(storeScroll), { passive: true });

        // Update scroll position for first time
        storeScroll();
    })

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
            <div className={`d-flex ${styles.mobileDropStyle}`}>
                <div>
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
                <div>
                    <div className="dropdown" title="Select a language for the site">
                        <div className={`${styles.menuDropDown}`} id="dropdownMenuButton" data-mdb-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-bars"></i>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">About Us</a></li>
                            <li><a className="dropdown-item" href="#">Notice Board</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;