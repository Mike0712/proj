import React from "react";

function Footer(props) {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">{new Date().getFullYear()} © KJ2DEBT.</div>
                        <div className="col-sm-6">
                            <div className="text-sm-end d-none d-sm-block"></div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;