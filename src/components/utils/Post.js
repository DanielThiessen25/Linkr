import styled from 'styled-components';
import React from 'react';
import {FaRegHeart} from "react-icons/fa";

export default function Post(props) {
    let description = props.object.text+ "#teste";
    var string = description.split("#");
    var hashtags = string.splice(1, string.length);

    console.log(string);
    console.log(hashtags);

    return (
        <Box>
            <VerticalSelector>
                <Avatar><img src={props.object.user.avatar} /></Avatar>
                <FaRegHeart size="1.7em" color="#FFFFFF" />
                <Likes>{props.object.likes.length} likes</Likes>
            </VerticalSelector>
            <Text>
                <Name>{props.object.user.username}</Name>
                <Message>{string}
                {hashtags.map(item => 
                <h5>{"#"+ item + " "}</h5>
                )}
                
                </Message>
                <Bookmark>
                <Picture><img src={props.object.linkImage} /></Picture>
                    <Info>
                        <h2>{props.object.linkTitle}</h2>
                        <h3>{props.object.linkDescription}</h3>
                        <h4>{props.object.link}</h4>
                    </Info>
                    
                </Bookmark> 
            </Text>
            
        </Box>
    );
}

const Box = styled.div`
width: 611px;
height: 276px;
margin-bottom: 16px;
background: #171717;
border-radius: 16px;
display: flex;
flex-direction: row;
padding: 20px;
`;

const Text = styled.div`
    width: 100%;
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

    img{
        width: 100%;
        height: 100%;
        border-radius: 26.5px;
    }
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
display: flex;
flex-direction: row;
h5{
    margin-left: 9px;
    color: white;
}

`;

const Bookmark = styled.div`
    width: 100%;
    height:100%;
    padding-left: 20px;
    border: 1px solid #4D4D4D;
    box-sizing: border-box;
    border-radius: 11px;
    position: relative;
`;

const Info = styled.div`
    width: 65%;
    height:70%;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;

    h2{
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
    }
    h3{
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
    }
    h4{
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    }
`;

const Picture = styled.div`
    position: absolute;
    right: 0;
    height: 100%;
    width: 155px;

    img{
        width: 100%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
    }
    
`;