import React from "react"

export const Form = ({ children, ...props }) => {
    return <form {...props} noValidate>{children}</form>
}