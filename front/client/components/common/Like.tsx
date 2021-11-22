import React, { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Styled from 'styled-components'
import {useRouter} from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../../reducers";
import { likeInsert_REQUEST } from "../../reducers/like";
import { useEffect } from "react";

const Like = (props) => {
    const {likeList, params, likeState, doLike} = props
   
    return (
        <>
            <LikeBtn onClick={doLike}>
                {
                    likeState
                    ? <button><FavoriteIcon /></button>
                    : <button><FavoriteBorderIcon /></button>
                }
            </LikeBtn>
        </>
    )
}

export default Like


const LikeBtn = Styled.span`
    & > button {
        width : 127px;
        height : 60px;
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
    }

    & > button:focus{
        box-shadow: 0 0 0 0.2rem rgb(30 115 250 / 25%);
    }

    & > button > svg {
        font-size : 30px;
    }
`