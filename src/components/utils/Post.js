import styled from 'styled-components';
import React from 'react';
import {FaRegHeart} from "react-icons/fa";

export default function Post() {
    return (
        <Box>
            <VerticalSelector>
                <Avatar></Avatar>
                <FaRegHeart size="1.7em" color="#FFFFFF" />
                <Likes>13 likes</Likes>
            </VerticalSelector>
            <Text>
                <Name>Juvenal</Name>
                <Message>Muito maneiro esse tutorial de Material UI com React, deem uma olhada! #react #material</Message>
                <Bookmark></Bookmark>
            </Text>
            
        </Box>
    );
}

const Box = styled.div`
width: 611px;
height: 276px;
background: #171717;
border-radius: 16px;
display: flex;
flex-direction: row;
padding: 20px;
`;

const Text = styled.div`
    margin-left: 18px;
    display: flex;
    flex-direction:column;
`;

const Name = styled.div`
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;

`;

const VerticalSelector = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    margin-bottom:19px;
    border-radius: 26.5px;
    background: chocolate;
`;

const Likes = styled.div`
margin-top: 5px;
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 11px;
line-height: 13px;
text-align: center;
color: #FFFFFF;
`;

const Message = styled.div`
font-style: normal;
font-weight: normal;
font-size: 17px;
line-height: 20px;
color: #B7B7B7;
margin-top: 9px;
margin-bottom: 9px;
`;

const Bookmark = styled.div`
    width: 100%;
    height:100%;
    border: 1px solid #4D4D4D;
    box-sizing: border-box;
    border-radius: 11px;
`;