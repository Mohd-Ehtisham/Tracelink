import React from 'react'
import Card from './Card'

const mainpage = (props) => {
    return (
        <>
            <div className="row header pt-2">
                <div className="col-6 ps-4"><h2>Movie Web</h2></div>
                <div className="col-6 text-end pe-5"><button onClick={props.handleLogout} className="logout btn">Logout</button></div>
            </div>
           <Card/>
        </>
    )
}

export default mainpage
