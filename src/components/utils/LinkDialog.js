import styled from "styled-components";
import { IoClose } from 'react-icons/io5';

export default function LinkDialog(props){
    return(
        <EntirePage>
            <DialogBox>
                <LineControls>
                    <a target='_blank' href={props.link}>Open in new tab</a>
                    <IoClose size={'25px'} color={'#FFFFFF'}
                    onClick={()=>props.setDialogState(false)}
                    />
                </LineControls>
                <iframe src={props.link} />
            </DialogBox>
        </EntirePage>
    );
}

const EntirePage = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 2;
    display: flex;
    justify-content: center;
    padding-top: 63px;
    padding-bottom: 57px;
`;

const DialogBox = styled.div`
    width: 966px;
    height: 904px;
    background: #333333;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding-left: 27px;
    padding-right: 27px;
    padding-bottom: 27px;
    padding-top: 15px;
    iframe{
        width: 100%;
        height: 100%;
    }
`;

const LineControls = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    a{
        width: 138px;
        height: 31px;
        background: #1877F2;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        font-size: 14px;
    }
`;