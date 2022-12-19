import React from "react";

function Preloader() {

    return (
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
    );
}

export default Preloader;