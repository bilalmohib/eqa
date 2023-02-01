import styles from "./style.module.css"

interface FooterProps {
    // For hiding the sidebar 
    isOpen: Boolean,

    // For minifying the sidebar
    isMinified: Boolean,
}

const Footer: React.FC<FooterProps> = ({
    // For hiding the sidebar
    isOpen,
    // For minifying the sidebar
    isMinified
}) => {
    return (
        // {/* Define a footer here with content copyright@2021 by EQA */}
        <footer className={`${styles.container} ${(isOpen) ? (styles.isOpen) : ("")} ${(isMinified) ? (styles.isMinified) : ("")}`}>
            <p
                style={
                    {
                        fontSize: (window.innerWidth > 600) ? (18) : (12),
                    }
                }
            >All rights reserved © EQA 2023.</p>
            {/* <br />
            <span
                style={
                    {
                        fontSize: 12,
                        color: "lightgrey"
                    }
                }
            >
                Connect with us: info@eqa.com | Follow us on social media for updates and promotions
            </span> 
        */}
        </footer>
    )
}
export default Footer;