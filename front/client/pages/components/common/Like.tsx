import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Styled from 'styled-components'

const Like = (props) => {
    return (
        <>
            <LikeBtn onClick={props.doLike}>
                {
                    props.like
                    ? <button><FavoriteIcon /></button>
                    : <button><FavoriteBorderIcon /></button>
                }
            </LikeBtn>
        </>
    )
}

export default Like


const LikeBtn = Styled.span`
    width : 30%;

    & > button {
        width: 100%;
        height: 64px;
        display: inline-block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #aab4be;
        box-sizing: border-box;
        border-radius: 4px;
        height: 100%;
    }

    & > button:focus{
        box-shadow: 0 0 0 0.2rem rgb(30 115 250 / 25%);
    }

    & > button > svg {
        font-size : 30px;
    }
`