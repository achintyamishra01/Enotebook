import React from 'react'

export default function Alert(props) {
    const capital = (words) => {
        if(words==="danger"){
            words="error";
        }
        const lower = words.toLowerCase()
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div className="content" style={{
            height: "50px"
        }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} id="animate" role="alert" >
                <strong>{capital(props.alert.type)}</strong> : {props.alert.msg}

            </div>}</div>
    )
}
