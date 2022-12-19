import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";


function Breadcrumbs({ breadcrumbItem, title }) {
    return (<>
        <Row>
            <Col xs="12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">{breadcrumbItem}</h4>
                    <div className="page-title-right">
                        <Breadcrumb listClassName="m-0">
                            <BreadcrumbItem>
                                {Array.isArray(title) ?
                                    <Link to={title[1]}>{title[0]}</Link> :
                                    <Link to="#">{title}</Link>}
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                <Link to="#">{breadcrumbItem}</Link>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
            </Col>
        </Row>
    </>)
}

Breadcrumbs.propTypes = {
    breadcrumbItem: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
}

export default Breadcrumbs