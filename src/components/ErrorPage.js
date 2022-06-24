import React from 'react';
import "../css/styles.css";
import { Link } from "react-router-dom";
import logo from "../../src/image/Mpact_logo-1200x720.jpg"


const Error = () => {


    return (
        <>

            <section className="wrapped position-relative">
                <a href='/'><img style={{'height' : '40px'}} id='logo' src={logo} alt="Logo" /></a>
                <div className="bgpurple"></div>

                <div className="containerss">

                    <div id="scene" className="scene" data-hover-only="false">


                        <div className="circle" data-depth="1.2"></div>

                        <div className="one" data-depth="0.9">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <div className="two" data-depth="0.60">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <div className="three" data-depth="0.40">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <p className="p404" data-depth="0.50">404</p>
                        <p className="p404" data-depth="0.10">404</p>

                    </div>

                    <div className="textc">
                        <article>
                            <p>Uh oh! Looks like you got lost. <br />Go back to the homepage if you dare!</p>
                            <a  href='/'><button>HOME</button></a>
                        </article>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Error
