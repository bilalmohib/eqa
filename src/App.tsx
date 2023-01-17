import { useEffect, useState } from "react";
// importing App Router
import AppRouter from "./Router";
// importing Header
import Header from "./Components/Header";

const App = () => {
    // Three Containers will be there 
    // 1) Login
    // 2) About Us
    // 3) Announcements
    const [mobileViewContainer, setMobileViewContainer] = useState<String>("Login");

    const [currentTab, setCurrentTab] = useState<Number>(1);

    const [showHeader, setShowHeader] = useState<Boolean>(false);

    useEffect(() => {
        // The current location.
        console.clear();
        console.log("The current location is: ", window.location.pathname);
        const url = window.location.pathname;

        if (url === "/" || url === "/dashboard") {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }
    }, [showHeader, setShowHeader]);

    return (
        <div>
            {(showHeader) && (
                <Header
                    setCurrentTab={setCurrentTab}
                    setMobileViewContainer={setMobileViewContainer}
                />
            )}
            <AppRouter
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                mobileViewContainer={mobileViewContainer}
            />
        </div>
    )
}
export default App;
