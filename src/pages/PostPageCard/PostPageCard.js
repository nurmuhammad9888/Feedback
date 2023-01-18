import { Link, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import  commitImg from "../../assets/images/comint-img.svg"
import {NavLink as RoutLink} from "react-router-dom";
import axios from 'axios';

export const PostPageCard = ({item}) => {
    const { feedback_category, feedback_detail, feedback_id, feedback_title, user_id} = item;
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9090/comments/get/" + feedback_id).then(res => {
            if(res.status === 200){
                setData(res.data)
            }
        })
            .catch(err => console.log(err))
    }, [feedback_id])

    return (
        <div>
            <ListItem sx={{display:"flex", marginTop:"20px",justifyContent:"space-between", alignItems:"center", padding:"28px 32px", backgroundColor:"#FFFFFF",borderRadius: "10px"}}>
                <Box>
                    <Typography sx={{ fontWeight: "600",fontFamily:"inherit",fontSize: "18px",lineHeight: "26px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>{feedback_title}</Typography>
                    <Typography sx={{fontFamily:"inherit", color:"#3A4374"}} variant='subtitle1'>{feedback_detail}</Typography>
                    <Typography sx={{marginTop:"12px", padding:"5px 16px", display:"inline-block", backgroundColor:"#F2F4FF",borderRadius: "10px", fontWeight: "600", fontFamily:"inherit", fontSize: "13px",lineHeight: "19px", color:"#4661E6"}} variant='body2'>{feedback_category}</Typography>
                </Box>
                <Box>
                    <Link to={`/commit/${feedback_id}`} sx={{display:"flex", alignItems:"center", textDecoration:"none"}} component={RoutLink}>
                        <img src={commitImg} alt="commint img" />
                        <Typography sx={{marginLeft:"8px", fontWeight: "700", fontFamily:"inherit",color:"#3A4374"}} variant='body2'>{data.length}</Typography>
                    </Link>
                </Box>
            </ListItem>
        </div>
        )
    }
    