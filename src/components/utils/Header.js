import styled from 'styled-components';
import React from 'react';
import { IoChevronDown } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);


    function openToolbar(){
        if(isOpen === true){
            return(
                <Options>
                    <Link to={"/myposts"} style={{ textDecoration: 'none' }}><p>My posts</p></Link>
                    <Link to={"/mylikes"} style={{ textDecoration: 'none' }}><p>My likes</p></Link>
                    <Link to={"/logout"} style={{ textDecoration: 'none' }}><p>Logout</p></Link>
                </Options>
            );
        }

    }

    return (
        <Container>
            <Logo>linkr</Logo>
            <Toolbar >
            <button onClick={()=>setIsOpen(!isOpen)}><IoChevronDown size="2em" color="#FFFFFF" /></button>
            <Picture onClick={()=>setIsOpen(!isOpen)}></Picture>
            {openToolbar()}
            </Toolbar> 
        </Container>

    );
}

const Container = styled.div`
    width: 100%;
    height: 72px;
    background: #151515;
    position: fixed;
    top: 0;
    padding: 0 2% 0 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    font-family: 'Passion One', cursive;
    font-style: normal;
    font-weight: bold;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`;
const Picture = styled.div`
    width: 53px;
    height: 53px; 
    margin-left: 15px;
    background: dodgerblue;
    border-radius: 26.5px;
    cursor: pointer;
 `;

const Toolbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    button{
        background: none;
        border: none;
        cursor: pointer;
    }
`;

const Options = styled.div`
    position: absolute;
    width: 150px;
    height: 109px;
    right: 0;
    top: 72px;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
     
    p{
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #FFFFFF;

    }
`;


