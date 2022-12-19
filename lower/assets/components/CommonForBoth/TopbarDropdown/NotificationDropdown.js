import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
// import SimpleBar from "simplebar-react";
// import { getNotifications } from '@api';

//i18n
import { withTranslation } from "react-i18next";

function NotificationDropdown({ t }) {

  useEffect(() => {
    // getNotifications()
    //   .then(resp => setList(resp));
  }, [])

  const [menu, setMenu] = useState();
  const [list] = useState([])


  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="bx bx-bell bx-tada" />
          {list.length > 0 ? <span className="badge bg-danger rounded-pill">{list.length}</span> : null }
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {t("Notifications")} </h6>
              </Col>
              <div className="col-auto">
                <button className="small">
                  {" "}
                  View All
                </button>
              </div>
            </Row>
          </div>

          {/* <SimpleBar style={{ height: "230px" }}>
            {list.map((item, key) => (<Link to="" className="text-reset notification-item">
              <div className="media">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                    <i className="bx bx-cart" />
                  </span>
                </div>
                <div className="media-body">
                  <h6 className="mt-0 mb-1">{ item.title }</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">{ item.content }</p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />{" "}
                      {t("3 min ago")}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>))}
          </SimpleBar> */}
          <div className="p-2 border-top d-grid">
            <Link className="btn btn-sm btn-link font-size-14 text-center" to="#">
              <i className="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">{t("View More..")}</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

NotificationDropdown.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(NotificationDropdown)
