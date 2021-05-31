import styled from 'styled-components';
import React, { useDebugValue } from 'react';
import Header from "./utils/Header";
import Post from "./utils/Post";

export default function MyPosts (){
return(
    <Screen>
    <Header></Header>
    <Content>
        <PageName>my posts</PageName>
        <ContainerPosts></ContainerPosts>
        <Post />
    </Content>
    
    </Screen>
    
);

}

const Screen = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display:flex;
    flex-direction: column;
    align-items: center;
`;

const PageName = styled.div `
    margin-top: 53px;
    font-family: Oswald;
    font-style: normal;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
     
`;

const Content = styled.div `
    width: 70%;
    position: fixed;
    top: 72px;

    
`;

const ContainerPosts = styled.div`
    margin-top: 42px;
    
`;