import React, {useContext, useState} from "react";
import {UserContext} from "../Context/AuthContext";
import Header from "../Header";
import Footer from "../Footer";

export default function Home() {
    const {currentUser} = useContext(UserContext)

    return (
        <>
            {/*<Header index={"home"}/>*/}
            {/*<Header index={"home"}/>*/}
                <div className='contentStyle'>
                    <p>
                        Hello!
                        {currentUser===null ? "" :currentUser.name}
                    </p>
                </div>
        </>
    );
}