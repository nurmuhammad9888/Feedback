import { Link, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {NavLink as RoutLink} from "react-router-dom";
import pincelPost from "../../assets/images/pencil-post.svg"

export const AdminPost = ({item}) => {
    const { feedback_title, feedback_detail, feedback_category, feedback_id} = item;

    return (
        <div>
            <ListItem sx={{display:"flex", marginTop:"20px",justifyContent:"space-between", alignItems:"center", padding:"28px 32px", backgroundColor:"#FFFFFF",borderRadius: "10px"}}>
                <Box>
                    <Typography sx={{ fontWeight: "600",fontFamily:"inherit",fontSize: "18px",lineHeight: "26px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>{feedback_title}</Typography>
                    <Typography sx={{fontFamily:"inherit", color:"#3A4374"}} variant='subtitle1'>{feedback_detail}</Typography>
                    <Typography sx={{marginTop:"12px", padding:"5px 16px", display:"inline-block", backgroundColor:"#F2F4FF",borderRadius: "10px", fontWeight: "600", fontFamily:"inherit", fontSize: "13px",lineHeight: "19px", color:"#4661E6"}} variant='body2'>{feedback_category}</Typography>
                </Box>
                <Box>
                    <Link to={`/editFeedback/${feedback_id}`} sx={{display:"flex", alignItems:"center", textDecoration:"none"}} component={RoutLink}>
                        <img src={pincelPost} alt="commint img" />
                    </Link>
                </Box>
            </ListItem>
        </div>
        )
    }
    