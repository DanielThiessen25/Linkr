import { useParams } from "react-router";
import Header from "../utils/Header";
import { TimelinePage, Title, Content, Posts } from '../Timeline';
import Hashtags from "./Hashtags";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Post from "../utils/Post";

export default function HashtagPage(){
    const { hashtag } = useParams();
    const { userInformation} = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    function getHashtagPosts(){
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`;
        const config = {
            headers: {
                "Authorization": `Bearer ${userInformation.token}`
            }
        }
        const requestPromise = axios.get(url, config);
        requestPromise.then((request)=>{
            setPosts(request.data.posts)
        });
        requestPromise.catch(()=>{
            window.alert('Não foi possível carregar as hashtags')
        })
    }


    return(
        <TimelinePage>
            <Header/>
            <Title># {hashtag}</Title>
            <Content>
                <Posts>
                    {getHashtagPosts()}
                    {posts.length === 0 ?
                        <h2>Carregando posts dessa hashtag</h2>
                    :   posts.map((post)=>{
                            return(
                                <Post object={post}
                                token={userInformation.token}
                                id={userInformation.user.id}
                                />
                            );
                    })
                    }
                </Posts>
                <Hashtags token={userInformation.token}/>
            </Content>
        </TimelinePage>
    );
}

