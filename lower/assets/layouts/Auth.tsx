import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
// import images

import profile from "styles/images/profile-img.png";
import logo from "styles/images/logo.svg";

interface AuthProps {
    children: ReactNode,
    preloader: any
}

export const Auth: FC<AuthProps> = ({ children, preloader }) => {

    return (<>
        <div className="home-btn d-none d-sm-block">
            <Link to="/" className="text-dark">
                <i className="fas fa-home h2" />
            </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                        <Card className="overflow-hidden">
                            <div className="bg-primary bg-soft">
                                <Row>
                                    <Col xs={7}>
                                        <div className="text-primary p-4">

                                        </div>
                                    </Col>
                                    <Col className="col-5 align-self-end">
                                        <img src={profile} alt="" className="img-fluid" />
                                    </Col>
                                </Row>
                            </div>
                            <CardBody className="pt-0">
                                <div>
                                    <Link to="/" className="auth-logo-light">
                                        <div className="avatar-md profile-user-wid mb-4">
                                            <span className="avatar-title rounded-circle bg-light">
                                                <img
                                                    src={logo}
                                                    alt=""
                                                    className="rounded-circle"
                                                    height="34"
                                                />
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="p-2">
                                    {preloader ?
                                        <div id="preloader-local" style={{ height: '12em' }}>
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
                                        </div> : children}
                                </div>
                            </CardBody>
                        </Card>
                        <div className="mt-5 text-center">
                            <p>
                                © {new Date().getFullYear()} KJ2DEBT{" "}
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>)
}