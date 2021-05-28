import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const token = "fba5100c-7127-4f25-b09c-034e5b849bdd";

export default function Hashtags(){
    const [hashtags, setHashtaghs] = useState([]);
    useEffect(()=>{
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending";
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const requestPromise = axios.get(url, config);
        requestPromise.then((response)=>{
            setHashtaghs(response.data.hashtags);
            console.log(response.data);
        })
    }, []);

    return(
        <HashTagStyles>
            <Title>
                <h2>trending</h2>
            </Title>
            <Divider/>
            <HashLinks>
                {hashtags.map((hash, idx)=>{
                    return(
                        <li key={idx}>
                            <Link to={`/hashtag/${hash.name}`}># {hash.name}</Link>
                        </li>
                    );
                })}
            </HashLinks>
        </HashTagStyles>
    );
}

const HashTagStyles = styled.div`
    background: #171717;
    border-radius: 16px;
    width: 301px;
    h2{
        font-family: 'Oswald', sans-serif;
        font-weight: bold;
        font-size: 27px;
        color: #FFFFFF;
    }
`;
const Title = styled.div`
    padding-left: 16px;
    padding-top: 9px;
    padding-bottom: 12px;
`;

const Divider = styled.div`
    width: 100%auto;
    height: 1px;
    background: #484848;
`;

const HashLinks = styled.ul`
    padding-left: 16px;
    padding-top: 22px;
    padding-bottom: 30px;
    li{
        margin-bottom: 5px;
    }
    li a{
        font-family: 'Lato';
        font-weight: bold;
        font-size: 19px;
        color: #FFFFFF;
    }
`;
