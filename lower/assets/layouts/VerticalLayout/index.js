import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
// import { useSelector } from 'react-redux';

function Layout(props) {

    // const preloader = useSelector((state) => state.preloader.value)

    useEffect(() => {
        // Scroll Top to 0
        window.scrollTo(0, 0)
        // let currentage = this.capitalizeFirstLetter(this.props.location.pathname)

        // document.title =
        //   currentage + " | Skote - React Admin & Dashboard Template"
        if (props.leftSideBarTheme) {
            props.changeSidebarTheme(props.leftSideBarTheme)
        }

        if (props.leftSideBarThemeImage) {
            props.changeSidebarThemeImage(props.leftSideBarThemeImage)
        }

        if (props.layoutWidth) {
            props.changeLayoutWidth(props.layoutWidth)
        }

        if (props.leftSideBarType) {
            props.changeSidebarType(props.leftSideBarType)
        }
        if (props.topbarTheme) {
            props.changeTopbarTheme(props.topbarTheme)
        }

        if (props.showRightSidebar) {
            toggleRightSidebar()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleRightSidebar = () => {
        props.toggleRightSidebar()
    }

    const toggleMenuCallback = () => {
        var body = document.body;
        if (window.screen.width <= 998) {
            body.classList.toggle("sidebar-enable");
        } else {
            body.classList.toggle("vertical-collpsed");
            body.classList.toggle("sidebar-enable");
        }
    }
    return (
        <>
            {/* {preloader ?
                <div id="preloader">
                    <div id="status">
                        <div className="spinner-chase">
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                            <div className="chase-dot"></div>
                        </div>
                    </div>
                </div>
                : */}
            <div id="layout-wrapper">
                <Header
                    toggleMenuCallback={toggleMenuCallback}
                    toggleRightSidebar={toggleRightSidebar}
                />
                <Sidebar
                    theme={``}
                    type={``}
                    isMobile={``}
                />
                <div className="main-content">{props.children}</div>
                <Footer />
            </div>
        </>
    )
}

Layout.propTypes = {
    changeLayoutWidth: PropTypes.func,
    changeSidebarTheme: PropTypes.func,
    changeSidebarThemeImage: PropTypes.func,
    changeSidebarType: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    children: PropTypes.any,
    isPreloader: PropTypes.bool,
    layoutWidth: PropTypes.any,
    leftSideBarTheme: PropTypes.any,
    leftSideBarThemeImage: PropTypes.any,
    leftSideBarType: PropTypes.any,
    location: PropTypes.object,
    showRightSidebar: PropTypes.any,
    toggleRightSidebar: PropTypes.any,
    topbarTheme: PropTypes.any
}

export default Layout;