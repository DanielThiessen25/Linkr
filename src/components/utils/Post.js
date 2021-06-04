import styled from 'styled-components';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";

export default function Post(props) {
    const { userInformation, showMenu, setShowMenu } = useContext(UserContext);
    let description = props.object.text + "#teste";
    var string = description.split("#");
    var hashtags = string.splice(1, string.length);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(props.object.likes.length);
    const [comments, setComments] = useState();
    const [clickComment, setClickComment]= useState(false);
    const [inputComment, setInputComment] = useState("");

    useEffect(() => {
        for (let i = 0; i < props.object.likes.length; i++) {
            if (props.object.likes[i].userId === props.id) {
                setLiked(true);
            }
        }
        const config = {
            headers: {
                Authorization: "Bearer " + props.token
            }
        }
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/"+props.object.id+"/comments", config);
        request.then(resposta=>setComments(resposta.data.comments));
        
    }, []);

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

    function printComments(){
        if(comments != null){
            return(comments.length + "  comments");
        }

    }

    function showComments(){
        if(clickComment == true){
            return(
                <CommentBox>

                    {comments.map(item =>
                    <CommentItem>
                        <AvatarComment><img src={item.user.avatar}/></AvatarComment>
                        <CommentContent>
                            <h3>{item.user.username}</h3>
                            <h4>{item.text}</h4>
                        </CommentContent>
                    </CommentItem>
                    
                    )}

                    <WriteComment>
                         <AvatarComment><img src={userInformation.user.avatar} /></AvatarComment>
                         <input  type="text" placeholder="write a comment..." value={inputComment} onChange={e => setInputComment(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') publishComment()}} />
                        <button><FiSend size="1.4em" color="#FFFFFF" onClick={publishComment} /> </button>
                    </WriteComment>
                </CommentBox>
            );
        }
    }

    function publishComment(){

    }

return (
    <PostContainer>
    <Box>
        <VerticalSelector>
            <Link to={`/user/${props.object.user.id}`}><Avatar><img src={props.object.user.avatar} /></Avatar></Link>
            {printLikes()}
            <Likes data-tip={showLikes()}>{likes} likes</Likes>
            <ReactTooltip type="light" place="bottom" />
            <Comment><button onClick={()=> setClickComment(true)}><AiOutlineComment size="1.8em" color="#FFFFFF" /></button><p>{printComments()}</p></Comment>
        </VerticalSelector>
        <Text>
            <Link to={`/user/${props.object.user.id}`}><Name>{props.object.user.username}</Name></Link>
            <Message>{string}
                {hashtags.map(item =>
                    <h5>{"#" + item + " "}</h5>
                )}

            </Message>
            <a href={props.object.link} target="_blank" rel="noopener noreferrer"><Bookmark>
                <Picture><img src={props.object.linkImage} /></Picture>
                <Info>
                    <h2>{props.object.linkTitle}</h2>
                    <h3>{props.object.linkDescription}</h3>
                    <h4>{props.object.link}</h4>
                </Info>

            </Bookmark>
            </a>
        </Text>

    </Box>
    {showComments()}
    </PostContainer>
);
}

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    position: relative;
`;

const Box = styled.div`
width: 100%;
height: 276px;
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
width: 75px;
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

    img{
        width: 100%;
        height: 100%;
        border-radius: 26.5px;
    }
`;

const Likes = styled.div`
margin-top: 5px;
margin-bottom: 12px;
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

const Comment = styled.div`
    margin-top: 5px;
font-family: Lato;
font-style: normal;
font-weight: normal;
font-size: 11px;
line-height: 13px;
text-align: center;
color: #FFFFFF;
display: flex;
flex-direction: column;
align-items: center;
`;

const CommentBox = styled.div`
    width: 100%;
    height: auto;
    background: #1E1E1E;
     border-radius: 16px;
     z-index: -1;
     margin-top: -32px;
     padding-top: 35px;
    
`;

const CommentItem = styled.div`
    width: 100%;
    height: 70px;
    padding:15px 25px 20px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #353535;
`;

const WriteComment = styled.div`
    height: 83px;
    width: 100%;
    padding: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    input{
        width: 100%;
        height: 40px;
        background: #252525;
        border-radius: 8px;
        border: none;
        padding-left: 15px;
    }

    input::placeholder{
        font-family: Lato;
        font-style: italic;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.05em;
        color: #575757;
    }
    button {
        position: absolute;
        right:38px;
        background: none;
        border:none;
        cursor: pointer;

    }
`;

const AvatarComment = styled.div`
    width: 39px;
    height: 39px;
    margin-right: 20px;
    border-radius: 26.5px;
    margin-right: 15px;
img{
        width: 100%;
        height: 100%;
        border-radius: 26.5px;
    }
`;

const CommentContent = styled.div`
    font-family: Lato;
    font-style: normal;
    font-size: 14px;
    line-height: 17px;

    h3{
        font-weight: bold;
        color: #F3F3F3;
        margin-bottom: 5px;
    }
    h4{
        font-weight: normal;
        color: #ACACAC;
    }

`;


