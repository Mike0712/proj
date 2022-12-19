import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert } from "reactstrap";
import { checkEmailVeryfyLinkThunk, verifyEmailThunk } from "store/reducers/userSlice";


function VerifyEmail() {

    const dispatch = useDispatch();
    const [verifyCode, setVerifyCode] = useState();
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    useEffect(() => {
        if (code && code.length === 15) {
            dispatch(checkEmailVeryfyLinkThunk(code))
                .then(({ payload }) => {
                    if (payload.status === 'success') {
                        setVerifyCode(code);
                        return setEmail(payload.email);
                    }
                    setVerifyCode('error');
                })
        } else {
            setVerifyCode('error')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div className="p-2 mt-4">
        <h4>Verify your email</h4>
        {verifyCode === 'error' ?
            <Alert color="danger">
                This link is wrong
            </Alert> :
            success ?
                <Alert color="Success">
                    Your profile has been verified
                </Alert>
                :
                <>
                    <p>
                        We have sent you verification email{" "}
                        <span className="font-weight-semibold">{email}</span>
                        , Please check it
                    </p>
                    <div className="mt-4">
                        <button onClick={() => {
                            dispatch(verifyEmailThunk({ code: verifyCode, email }))
                                .then(({ payload }) => {
                                    if (payload.status === 'success') {
                                        setSuccess(true)
                                    }
                                })

                        }}
                            className="btn btn-success w-md"
                        >
                            Verify email
                        </button>
                    </div>
                </>
        }
    </div>)
}

export default withTranslation()(VerifyEmail)