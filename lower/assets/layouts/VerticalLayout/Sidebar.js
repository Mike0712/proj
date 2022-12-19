import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from "styles/images/logo.svg";
import logoLightPng from "styles/images/logo-light.png";
import logoLightSvg from "styles/images/logo-light.svg";
import logoDark from "styles/images/logo-dark.png";

function Sidebar(props) {

    const leftSidebarColor = useSelector(state => state.layout.leftSidebarColor);

    useEffect(() => {
        if (leftSidebarColor) {
            document.body.setAttribute('data-sidebar', leftSidebarColor);
        }
    }, [leftSidebarColor]);


    return (
        <>
            <div className="vertical-menu">
                <div className="navbar-brand-box">
                    <Link to="/" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src={logo} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoDark} alt="" height="17" />
                        </span>
                    </Link>

                    <Link to="/" className="logo logo-light">
                        <span className="logo-sm">
                            <img src={logoLightSvg} alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src={logoLightPng} alt="" height="19" />
                        </span>
                    </Link>
                </div>
                <div data-simplebar className="h-100">
                    {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
                </div>
                <div className="sidebar-background"></div>
            </div>
        </>
    );
}

Sidebar.propTypes = {
    type: PropTypes.string,
};


export default withTranslation()(Sidebar);
