import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import LinkDialog from './LinkDialog';
import getYoutubeID from 'get-youtube-id';
import Youtube from 'react-youtube';

export default function Post(props) {
    let description = props.object.text + "#teste";
    var string = description.split("#");
    var hashtags = string.splice(1, string.length);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(props.object.likes.length);
    const [linkToDialog, setLinkToDialog] = useState(false);
    const [youtubeLinkPost, setYoutubeLinkPost] = useState(false);

    useEffect(() => {
        for (let i = 0; i < props.object.likes.length; i++) {
            if (props.object.likes[i].userId === props.id) {
                setLiked(true);
            }
        }
    }, []);
    useEffect(()=>{
        if(getYoutubeID(props.object.link) !== null){
            setYoutubeLinkPost(true);
        }
    })

    function printLikes() {
        if (liked === true) {
            return (
                <button><FaHeart size="1.7em" color="#AC0000" onClick={clickLikes} /></button>
            );
        }
        else {
            return (
                <button><FaRegHeart size="1.7em" color="#FFFFFF" onClick={clickLikes} /></button>
            );

        }
    }

    function clickLikes() {
        const config = {
            headers: {
                Authorization: "Bearer " + props.token
            }
        }
        if (liked === false) {
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/" + props.object.id + "/like", {}, config);
            setLiked(true);
            setLikes(likes + 1);

        }
        else {
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/" + props.object.id + "/dislike", {}, config);
            setLiked(false);
            setLikes(likes - 1);
        }
    }

    function showLikes() {
        let sentence = "";
        if (liked === true) {
            if (likes === 1) {
                sentence = "Você";
            }
            else if (likes === 2) {

                if (props.object.likes[0].userId === props.id) {
                    sentence = "Você e " + props.object.likes[1]['user.username'];
                }
                else {
                    sentence = "Você e " + props.object.likes[0]['user.username'];
                }

            }
            else if (likes >= 3) {
                if (props.object.likes[0].userId === props.id) {
                    sentence = "Você, " + props.object.likes[1]['user.username'] + " e outras " + (props.object.likes.length - 2) + " pessoas";
                }
                else {
                    sentence = "Você, " + props.object.likes[0]['user.username'] + " e outras " + (props.object.likes.length - 2) + " pessoas";
                }

            }

        }
        else {
            if (likes === 1) {
                sentence = props.object.likes[0]['user.username'];
            }
            else if (likes === 2) {
                sentence = props.object.likes[0]['user.username'] + " e " + props.object.likes[1]['user.username'];
            }
            else if (likes >= 3) {
                sentence = props.object.likes[0]['user.username'] + ", " + props.object.likes[1]['user.username'] + " e outras " + (props.object.likes.length - 2) + " pessoas";
            }
        }
        return (
            sentence
        );
    }
    
    if(linkToDialog){
        return(
            <LinkDialog link={props.object.link} setDialogState={setLinkToDialog}/>
        );
    }

return (
    <Box isYoutubeLink={youtubeLinkPost}>
        <VerticalSelector>
            <Link to={`/user/${props.object.user.id}`}><Avatar><img src={props.object.user.avatar} /></Avatar></Link>
            {printLikes()}
            <Likes data-tip={showLikes()}>{likes} likes</Likes>
            <ReactTooltip type="light" place="bottom" />
        </VerticalSelector>
        <Text>
            <Link to={`/user/${props.object.user.id}`}><Name>{props.object.user.username}</Name></Link>
            <Message>{string}
                {hashtags.map(item =>
                    <h5>{"#" + item + " "}</h5>
                )}
            </Message>
            { youtubeLinkPost ? 
                    <><Youtube videoId={getYoutubeID(props.object.link)}/>
                    <p onClick={()=>setLinkToDialog(true)}>{props.object.link}</p></>
                : <Bookmark onClick={()=>setLinkToDialog(true)}>
                    <Picture><img src={props.object.linkImage} /></Picture>
                    <Info>
                        <h2>{props.object.linkTitle}</h2>
                        <h3>{props.object.linkDescription}</h3>
                        <h4>{props.object.link}</h4>
                    </Info>
                    
                </Bookmark>}
            </Text>
            
        </Box>
    );
}

const Box = styled.div`
width: 100%;
height: ${props => props.isYoutubeLink ? '433px': '276px'};
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
    iframe{
        height: 281px;
        width: 100%;
        margin-bottom: 6px;
    }
    p{
        color: #B7B7B7;
        font-size: 17px;
    }
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

    button{
        background: none;
        border: none;
        cursor: pointer;
    }

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
margin-top: 10px;
margin-bottom: 10px;
display: flex;
flex-direction: row;
h5{
    margin-left: 9px;
    color: white;
}

`;

const Bookmark = styled.div`
    width: 100%;
    height: 155px;
    padding-left: 20px;
    border: 1px solid #4D4D4D;
    box-sizing: border-box;
    border-radius: 11px;
    position: relative;
    display: flex;
    align-items: center;
`;

const Info = styled.div`
    width: 60%;
    height:70%;
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
    width: 35%;

    img{
        width: 100%;
        height: 100%;
        border-radius: 0px 12px 13px 0px;
    }
    
`;