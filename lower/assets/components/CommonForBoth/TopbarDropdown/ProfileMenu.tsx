import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
// import { resendRegConfirm, logout as lg } from '@api';

//i18n
import { useTranslation } from "react-i18next";

// users
import user1 from "styles/images/users/avatar-1.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { status, userData } from 'store/reducers/userSlice';
import { RootState } from "store";

function ProfileMenu() {
    const { t } = useTranslation();
    const ud = useSelector((state: RootState) => state.user.userData);
    const role = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(false);
    const [name, setName] = useState('');
    const [showResendLink, setShowResendLink] = useState(false);

    useEffect(() => {
        if (ud && Object.keys(ud).length) {
            setName(`${ud.firstName} ${ud.lastName}`);
        }
    }, [ud]);

    const logout = () => {
        localStorage.removeItem('session.token');
        dispatch(status('guest'));
        dispatch(userData(null));
    }

    return (
        <>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={user1}
                        alt="Header Avatar"
                    />{" "}
                    <span className="d-none d-xl-inline-block ms-1">
                        {name}{role ? ` (${role.replace(/_/, ' ').toLowerCase()})` : ''}
                    </span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    {ud && Object.keys(ud).length ? <>
                        <Link to="/profile">
                            <DropdownItem tag="button">
                                <i className="bx bx-user font-size-16 align-middle ms-1" />
                                {t("Profile")}
                            </DropdownItem>
                        </Link>
                        <Link to="/crypto-wallet">
                            <DropdownItem tag="button">
                                <i className="bx bx-wallet font-size-16 align-middle me-1" />
                                {t("My Wallet")}
                            </DropdownItem>
                        </Link>
                        <DropdownItem tag="button">
                            <span className="badge bg-success float-end">11</span>
                            <i className="bx bx-wrench font-size-17 align-middle me-1" />
                            {t("Settings")}
                        </DropdownItem>
                        <Link to="auth-lock-screen">
                            <DropdownItem tag="button">
                                <i className="bx bx-lock-open font-size-16 align-middle me-1" />
                                {t("Lock screen")}
                            </DropdownItem>
                        </Link>
                    </> : <><p className={`dropdown-item`}>
                        {t('You need to confirm registration. Check your email {{email}}', { email: '' })}</p>
                        {showResendLink ? <><p className={`dropdown-item`}>{t('You have not received a letter in the mail?')}</p>
                            <div className="dropdown-divider" />
                            <div className="dropdown-item">
                                <button className={`btn btn-success w-md`} onClick={e => {
                                    // resendRegConfirm().then(resp => {
                                    //     if (resp.status === 'success') {
                                    //         setShowResendLink(false);
                                    //     }
                                    // });
                                }}>{t('Resend')}</button>
                            </div>
                        </> : null}
                    </>}
                    <div className="dropdown-divider" />
                    <Link onClick={logout} to="/login" className="dropdown-item">
                        <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                        <span>{t("Logout")}</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </>
    );
}

ProfileMenu.propTypes = {
    t: PropTypes.any,
    success: PropTypes.string
}


export default ProfileMenu;
