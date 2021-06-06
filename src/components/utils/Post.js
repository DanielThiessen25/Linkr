import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {FaRegHeart, FaHeart} from "react-icons/fa";
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';

export default function Post(props) {
    let description = props.object.text+ "#teste";
    var string = description.split("#");
    var hashtags = string.splice(1, string.length);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(props.object.likes.length);
    const [ modalIsOpen, setIsOpen ] = useState(false);

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
    
    useEffect(() => {
        for(let i = 0; i < props.object.likes.length; i++){
            if(props.object.likes[i].userId === props.id){
                setLiked(true);
            }
        }  
    }, []);

    function printLikes(){
        if(liked === true){
            return(
                <button><FaHeart size="1.7em" color="#AC0000" onClick={clickLikes}/></button>
            );
        }
        else{
            return(
                <button><FaRegHeart size="1.7em" color="#FFFFFF" onClick={clickLikes}/></button>
            );
                
        }
    }

    function clickLikes(){
        const config = {
            headers: {
                Authorization: "Bearer " + props.token
            }
        }
        if(liked === false){
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/"+props.object.id+"/like", {}, config); 
            setLiked(true);
            setLikes(likes + 1);
           
        }
        else{
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/"+props.object.id+"/dislike", {}, config);
            setLiked(false);
            setLikes(likes -1);
        }
    }

    function showLikes(){
        let sentence = "";
        if(liked === true){
            if(likes === 1){
                sentence = "Você";
            }
            else if(likes === 2){
                console.log(props.object.likes);
                sentence = "Você e" + props.object.likes[1].username;
            }
            else if(likes === 3){
                console.log(props.object.likes);
                sentence = "Você,"+ props.object.likes[1].username + " e outras" + (props.object.likes.length - 1) + "pessoas";
            }
            
        }
        else{
            

        }
        return(
            sentence
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

    

    return (
        <Box >
            <VerticalSelector>
                <Avatar><img src={props.object.user.avatar} /></Avatar>
                {printLikes()}
                <Likes data-tip={showLikes()}>{likes} likes</Likes>
                <ReactTooltip type="light" place="bottom"/>
            </VerticalSelector>
            <Text>
                <Name>{props.object.user.username}</Name>
                <Message>{string}
                {hashtags.map((item,i) => 
                <h5 key={i}>{"#"+ item + " "}</h5>
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
        </Box>
    );
}

const Box = styled.div`
width: 100%;
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