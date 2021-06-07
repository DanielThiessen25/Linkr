import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import {FaRegHeart, FaHeart} from "react-icons/fa";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { IoTrash } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { IconContext } from "react-icons";
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { FiSend } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { AiOutlineComment } from "react-icons/ai";
import { CgRepeat } from "react-icons/cg";
import LinkDialog from './LinkDialog';
import getYoutubeID from 'get-youtube-id';
import Youtube from 'react-youtube';

export default function Post(props) {
    const { userInformation, showMenu, setShowMenu } = useContext(UserContext);
    let description = props.object.text + "#teste";
    var string = description.split("#");
    var hashtags = string.splice(1, string.length);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(props.object.likes.length);
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ postComments, setPostComments ] = useState('')
    const [ toEditPost, setToEditPost ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const inputRef = useRef();
    const [comments, setComments] = useState();
    const [clickComment, setClickComment]= useState(false);
    const [clickRepost, setClickRepost]= useState(false);
    const [inputComment, setInputComment] = useState("");
    const [isReposted, setIsReposted] = useState(false);
    const [linkToDialog, setLinkToDialog] = useState(false);
    const [youtubeLinkPost, setYoutubeLinkPost] = useState(false);


    const config = {
        headers: {
            Authorization: "Bearer " + props.token
        }
    }

    function loadComments(){
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/"+props.object.id+"/comments", config);
        request.then(resposta=>setComments(resposta.data.comments));
    }

    useEffect(() => {
        for (let i = 0; i < props.object.likes.length; i++) {
            if (props.object.likes[i].userId === props.id) {
                setLiked(true);
            }
        }
        loadComments();

        if(props.object.repostedBy != null){
            setIsReposted(true);
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
       
        if (liked === false) {
            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/" + props.object.id + "/like", {}, config);
            setLiked(true);
            setLikes(likes + 1);

        }
        else {
            const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/" + props.object.id + "/dislike", {}, config);
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

    function Subtitle(item){
        if(item.user.username === props.object.user.username){
            return("• post’s author");
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
                            <h3>{item.user.username} <h5>{Subtitle(item)}</h5></h3>
                            <h4>{item.text}</h4>
                        </CommentContent>
                    </CommentItem>
                    
                    )}

                    <WriteComment>
                         <AvatarComment><img src={userInformation.user.avatar} /></AvatarComment>
                        <input  disabled={false} type="text" placeholder="write a comment..."  value={inputComment} onChange={e => setInputComment(e.target.value)} onKeyPress={e => {if(e.key === 'Enter') publishComment()}} />
                        <button onClick={publishComment}><FiSend size="1.4em" color="#FFFFFF"  /> </button>
                    </WriteComment>
                </CommentBox>
            );
        }

    }

    function showReposts(){
        if(clickRepost == true){
            return(
                <ConfirmBackground>
                    <Confirm>
                    Do you want to re-post this link?
                    <HorizontalSelector>
                        <button onClick={()=> setClickRepost(false)}><Cancel >No, cancel</Cancel></button>
                        <button onClick={repost}><Sure>Yes, share!</Sure></button>
                    </HorizontalSelector>

                    </Confirm>
                </ConfirmBackground>
            );
        }

        if(isReposted == true){
            return(
                <RepostSection>
                    <CgRepeat size="2.5em" color="#FFFFFF" />
                    <p>Re-posted by {(props.object.repostedBy.username == userInformation.user.username) ? "you" : props.object.repostedBy.username}</p>
                </RepostSection>
            );
        }
    }
    
    function repost(){
        
        setClickRepost(false);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/"+props.object.id+"/share", {}, config);
        request.then();
    }

    function publishComment(){
        const commentObject = {
            id:props.object.id, 
            text: inputComment,
            user:{
                id:userInformation.user.id,
                username:userInformation.user.username,
                avatar:userInformation.user.avatar
            }
        }
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/"+props.object.id+"/comment",commentObject,config);
        request.then(loadComments);
        setInputComment("");
    }

    if(linkToDialog){
        return(
            <LinkDialog link={props.object.link} setDialogState={setLinkToDialog}/>
        );
    }

    function deletePost(){
        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${props.object.id}`, config)
        request.then(reply => {
            const listPosts = props.listPosts
            const filteredPosts = listPosts.filter(post => post.id !== props.object.id)
            props.setListPosts([...filteredPosts])
        })
        request.catch(() => alert("Post was not possible to be deleted"))
    }

    function editPost(){
        inputRef.current.focus()
        setToEditPost(true)
        let hashtagsText = ""
        for(let i = 0; i < hashtags.length - 1; i++){
            if(i === hashtags.length - 2){
                hashtagsText += "#" + hashtags[i]    
            }
            else{
                hashtagsText += "#" + hashtags[i] + " "
            }
        }
        console.log("string " + string[0])
        if(string[0] === ''){
            setPostComments(hashtagsText) 
        }
        else{
            setPostComments(string[0] + hashtagsText)
        }
    }

    function removeEdit(){
        setToEditPost(false)
        setPostComments('')
    }

    function sendChanges(){
        setLoading(true)
        const body = {text: postComments}
        
        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${props.object.id}`, body, config)
        request.then(reply => {
            const listPosts = props.listPosts
            for(let i = 0; i < listPosts.length; i++ ){
                if(listPosts[i].id === props.object.id){
                    listPosts[i] = reply.data.post
                }
            }
            setToEditPost(false)
            setPostComments('')
            setLoading(false)
            props.setListPosts([...listPosts])
            
        })
        request.catch(() => {
            alert("falha ao fazer alterações no post")
            setLoading(false)
        })
    }

    
return (
    <PostContainer>
        {showReposts()}
        <Box isYoutubeLink={youtubeLinkPost} postUserId={props.object.user.id} userId={props.userId} toEditPost={toEditPost} >
            <VerticalSelector>
                <Link to={`/user/${props.object.user.id}`}><Avatar><img src={props.object.user.avatar} /></Avatar></Link>
                {printLikes()}
                <Option data-tip={showLikes()}>{likes} likes</Option>
                <ReactTooltip type="light" place="bottom" />
                <Option><button onClick={()=> setClickComment(!clickComment)}><AiOutlineComment size="1.8em" color="#FFFFFF" /></button><p>{printComments()}</p></Option>
                <Option><button onClick={()=> setClickRepost(true)}><CgRepeat size="2.5em" color="#FFFFFF" /></button><p>{props.object.repostCount + " re-posts"}</p></Option>
            </VerticalSelector>
            <Text toEditPost={toEditPost} >
                <Link to={`/user/${props.object.user.id}`}><Name>{props.object.user.username}</Name></Link>
                <Message toEditPost={toEditPost} onClick={() => {if(props.userId === props.object.user.id) editPost()}}>    {string}
                                                {hashtags.map((item,i) => <h5 key={i}>{"#"+ item + " "}</h5>)}
                </Message>
                <input disabled={isLoading} ref={inputRef} type="text" value={postComments} onChange={e => setPostComments(e.target.value)} onKeyDown={e => {if(e.key === 'Escape') removeEdit()
                                                                                                                                           if(e.key === 'Enter') sendChanges()}} />
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={modalStyles}
                >
                    <ModalTitle>Tem certeza que deseja excluir essa publicação?</ModalTitle>
                    <Buttons>
                        <CloseButton onClick={e => {e.stopPropagation()
                                                    setIsOpen(false)
                                                    }}>Não, voltar</CloseButton>
                        <ConfirmButton onClick={deletePost}>Sim, excluir</ConfirmButton>
                    </Buttons>
            </Modal>
            <IconContext.Provider value={{className: "trash-icon"}}>
                <IoTrash onClick={() => setIsOpen(true)} />
            </IconContext.Provider>
            <IconContext.Provider value={{className: "edit-icon"}} >
                <IoMdCreate onClick={() => {if(toEditPost) removeEdit()
                                            else editPost()}} />
            </IconContext.Provider>

        </Box>
        {showComments()}
    </PostContainer>
    );
}

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

const Box = styled.div`
position: relative;
width: 100%;
min-height: ${props => props.isYoutubeLink ? '433px': '276px'};
margin-bottom: 16px;
background: #171717;
border-radius: 16px;
display: flex;
flex-direction: row;
padding: 20px;
.trash-icon{
    display: ${props => (props.userId === props.postUserId) ? 'initial' : 'none'};
    cursor: pointer;
    color: #ffffff;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 15px;
    right: 25px;
}
.edit-icon{
    display: ${props => (props.userId === props.postUserId ) ? 'initial' : 'none'};
    cursor: pointer;
    color: #ffffff;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 15px;
    right: 50px;
}
z-index: 2;

@media(max-width: 600px){
    min-height: ${props => props.isYoutubeLink ? '433px': '230px'};
    border-radius: 0px;
    }
`;

const Text = styled.div`
    position: relative;
    width: 100%;
    margin-left: 18px;
    display: flex;
    flex-direction:column;
    input {
        position: absolute;
        top: 20px;
        left: 0;
        min-width: 100%;
        max-width: 100%;
        background: #FFFFFF;
        border-radius: 7px;
        border: none;
        margin-top: 9px;
        padding: 3px;
        font-weight: normal;
        font-size: 16px;
        color: #4C4C4C;
        font-family: Lato;
        z-index: ${props => props.toEditPost ? 'initial' : '-1'};
    }
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

    @media(max-width: 600px){
    font-size: 17px;
    line-height: 20px;
    }

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

    @media(max-width: 600px){
        width: 40px;
        height: 40px;
    }
    
`;


const Option = styled.div`
margin-top: 3px;
margin-bottom: 3px;
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
@media(max-width: 600px){
    font-size: 9px;
    line-height: 11px;
    }
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
flex-wrap: wrap;
flex-direction: row;
cursor: pointer;
transition: all .3s;
z-index: ${props => props.toEditPost ? '-1' : 'initial'};
h5{
    margin-left: 9px;
    color: white;
}
&:hover{
    background-color: #333333;
}
@media(max-width: 600px){
    font-size: 15px;
    line-height: 18px;

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
    @media(max-width: 600px){
        padding-left: 10px;
    height: 115px;
    }
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

    @media(max-width: 600px){
        h2{
    font-size: 11px;
    line-height: 13px;
    }
    h3{
    font-size: 9px;
    line-height:11px;

    }
    h4{
    font-size: 9px;
    line-height: 11px;
    }
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

const ModalTitle = styled.div`
    font-size: 34px;
    line-height: 41px;
    color: #FFFFFF;
    text-align: center;
    width: 70%;
    @media(max-width: 600px){
        font-size: 18px;
    }

`


const CommentBox = styled.div`
    width: 100%;
    height: auto;
    background: #1E1E1E;
    border-radius: 16px;
    margin-top: -32px;
    padding-top: 35px;
    
`;


const RepostSection = styled.div`
    height: 65px;
    width: 100%;
    background: #1E1E1E;
    border-radius: 16px;
    margin-bottom: -33px;
    padding-top: 5px;
    padding-left: 15px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 13px;
    color: #FFFFFF;

    p{
        margin-top: 5px;
    }
    @media(max-width: 600px){
        border-radius: 0px;
    }
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
        color: white;
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
        display: flex;
        flex-direction: row;

        h5{
            margin-left: 5px;
            color: #565656;
        }
    }
    h4{
        font-weight: normal;
        color: #ACACAC;
    }

`;

const ConfirmBackground = styled.div`
    position: fixed;
    z-index: 6;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.8);
    
`;

const Confirm = styled.div`
    position: fixed;
    width: 597px;
    height: 210px;
    z-index: 7;
    padding: 0px 120px 0px 120px ;
    left: 15%;
    top: 25%;
    background: #333333;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;

    @media(max-width: 600px){
        width: 70%;
        padding: 0px 50px 0px 50px ;
        font-size: 25px;
        line-height: 28px;
    }

`;


    
const Buttons = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;

    margin-top: 20px;
    padding: 0 50px;
    @media(max-width: 600px){
        padding: 0 20px;
    }
`

const ConfirmButton = styled.div`
    width: 134px;
    height: 37px;
    color: #FFFFFF;
    border-radius: 5px;
    background-color: #1877F2;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media(max-width: 600px){
        width: 70px;
        height: 20px;
        font-size: 10px;
    }
`

const CloseButton = styled.div`
    width: 134px;
    height: 37px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-size: 18px;
    color: #1877F2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @media(max-width: 600px){
        width: 70px;
        height: 20px;
        font-size: 10px;
    }
`

const modalStyles = {
    content : {
        'width': '42%',
        'height': '28%',   
        'top': 'calc(50% - 12.5%)',
        'left': 'calc(30%)',
        'backgroundColor': '#333333',
        'borderRadius': '50px',
        'fontFamily': 'font-family: Lato',
        'fontWeight': 'bold',
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center',
    }
  };
  const HorizontalSelector = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;

    button{
        background: none;
        border: none;
        cursor: pointer;
    }

    @media(max-width: 600px){
        flex-direction: column;
        align-items: center;
        
        button{
            margin-bottom: 10px;
        }
    }
`;

const Cancel = styled.div`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    color: #1877F2;
    display: flex;
    align-items: center;
    justify-content: center;

`;

const Sure = styled.div`
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;

`;
