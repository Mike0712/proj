import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import ReactDrawer from 'react-drawer';
// import 'react-drawer/lib/react-drawer.css';
import { Link } from 'react-router-dom';
// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from 'reactstrap';
// Import menuDropdown
import LanguageDropdown from "components/CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "components/CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "components/CommonForBoth/TopbarDropdown/ProfileMenu";
// import RightSidebar from 'components/CommonForBoth/RightSidebar'
// import images
import github from "styles/images/brands/github.png";
import bitbucket from "styles/images/brands/bitbucket.png";
import dribbble from "styles/images/brands/dribbble.png";
import dropbox from "styles/images/brands/dropbox.png";
import mail_chimp from "styles/images/brands/mail_chimp.png";
import slack from "styles/images/brands/slack.png";
import logo from "styles/images/logo.svg";
import logoLightSvg from "styles/images/logo-light.svg";

//i18n
import { withTranslation } from "react-i18next"


function Header(props) {
    const [isSearch, setIsSearch] = useState(false);
    const [open, setOpen] = useState(false);
    const [socialDrp, setSocialDrp] = useState();
    // const [position, setPosition] = useState();

    const toggleMenu = () => {
        props.toggleMenuCallback()
    }

    const toggleRightDrawer = () => {
        // setPosition('right');
        setOpen(!open);
    }

    const toggleFullscreen = () => {
        if (
            !document.fullscreenElement &&
            /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                )
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }
    }
    return (
        <>
            <header id="page-topbar">
                <div className="navbar-header">

                    <div className="d-flex">
                        <div className="navbar-brand-box d-lg-none d-md-block">
                            <Link to="/" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={logo} alt="" height="22" />
                                </span>
                            </Link>

                            <Link to="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logoLightSvg} alt="" height="22" />
                                </span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="btn btn-sm px-3 font-size-16 header-item"
                            id="vertical-menu-btn"
                        >
                            <i className="fa fa-fw fa-bars"></i>
                        </button>

                        <form className="app-search d-none d-lg-block">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                // placeholder={props.t("Search") + "..."}
                                />
                                <span className="bx bx-search-alt"></span>
                            </div>
                        </form>

                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-inline-block d-lg-none ms-2">
                            <button
                                onClick={() => {
                                    setIsSearch(!isSearch);
                                }}
                                type="button"
                                className="btn header-item noti-icon"
                                id="page-header-search-dropdown"
                            >
                                <i className="mdi mdi-magnify"></i>
                            </button>
                            <div
                                className={
                                    isSearch
                                        ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                                        : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                }
                                aria-labelledby="page-header-search-dropdown"
                            >
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search ..."
                                                aria-label="Recipient's username"
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit">
                                                    <i className="mdi mdi-magnify"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <LanguageDropdown />

                        <Dropdown
                            className="d-none d-lg-inline-block ms-1"
                            isOpen={socialDrp}
                            toggle={() => setSocialDrp(!socialDrp)}
                        >
                            <DropdownToggle
                                className="btn header-item noti-icon"
                                tag="button"
                            >
                                <i className="bx bx-customize"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-lg dropdown-menu-end">
                                <div className="px-lg-2">
                                    <Row className="no-gutters">
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={github} alt="Github" />
                                                <span>GitHub</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={bitbucket} alt="bitbucket" />
                                                <span>Bitbucket</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={dribbble} alt="dribbble" />
                                                <span>Dribbble</span>
                                            </Link>
                                        </Col>
                                    </Row>

                                    <Row className="no-gutters">
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={dropbox} alt="dropbox" />
                                                <span>Dropbox</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={mail_chimp} alt="mail_chimp" />
                                                <span>Mail Chimp</span>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <Link className="dropdown-icon-item" to="#">
                                                <img src={slack} alt="slack" />
                                                <span>Slack</span>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </DropdownMenu>
                        </Dropdown>

                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button
                                type="button"
                                onClick={toggleFullscreen}
                                className="btn header-item noti-icon"
                                data-toggle="fullscreen"
                            >
                                <i className="bx bx-fullscreen"></i>
                            </button>
                        </div>

                        <NotificationDropdown />
                        <ProfileMenu />

                        <div
                            onClick={toggleRightDrawer} disabled={open}
                            className="dropdown d-inline-block"
                        >
                            <button
                                type="button"
                                className="btn header-item noti-icon right-bar-toggle"
                            >
                                <i className="bx bx-cog bx-spin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* <ReactDrawer
                open={open}
                position={position}
                onClose={() => setOpen(false)}
            >
                <RightSidebar onClose={() => setOpen(false)}/>
            </ReactDrawer> */}
        </>
    )
}

Header.propTypes = {
    t: PropTypes.any,
    toggleMenuCallback: PropTypes.any,
    toggleRightSidebar: PropTypes.func
}

export default withTranslation()(Header);