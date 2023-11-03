import React from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";

export default function Navbar({ setShowSideBar}) {
    return (
        <NavbarWrapper>
            <div className="navbar_container">
                <RxHamburgerMenu size={25} className='burger_icon' onClick={()=>setShowSideBar(true)}/>
                <h1 className='title'>ECommerce</h1>
            </div>
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.div`
    .navbar_container{
        position: relative;
        width: 100vw;
        height: 80px;
        display: flex;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        justify-content: center;
        .burger_icon{
            position: absolute;
            left: 2rem;
            cursor: pointer;
        }
        .title{
            font-size: 30px;
            font-weight: 600;
        }
    }
`