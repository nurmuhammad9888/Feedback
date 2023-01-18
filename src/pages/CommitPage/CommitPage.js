import { Box, Button, Divider, List, ListItem, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import  commitImg from "../../assets/images/comint-img.svg"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { blue } from '@mui/material/colors';
import  human from "../../assets/images/human.png";
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

export const CommitPage = () => {
    const navgate = useNavigate();
    const { id } = useParams();
    const commitRef = useRef()
    const [data, setData] = useState([])
    const [change, setChange] = useState(false)
    const {user} = useContext(UserContext);

    const handlerCommitSubmit = (evt) =>{
        evt.preventDefault();
        axios.post("http://localhost:9090/comments/post/" + id, 
            {
                "comments_detail": commitRef.current.value
            }
        ).then(res => {
            if(res.status === 200){
                console.log(res)
                setChange(true)
                commitRef.current.value = "";
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:9090/comments/get/" + id).then(res => {
            console.log(res);
            if(res.status === 200){
                setData(res.data)
                setChange(false)
            }
        })
            .catch(err => console.log(err))
    }, [id, change])

    return (
        <Box sx={{maxWidth:"730px", mx:"auto", marginTop:"52px"}}>
            <Button sx={{fontWeight: "700",fontFamily:"inherit",fontSize: "14px" ,color:"#647196",width:"105px", textTransform:"capitalize"}} startIcon={<ArrowBackIosIcon  sx={{color: blue[800],'&:nth-of-type(1)': {fontSize:"14px"}}}  />} onClick={() => navgate(-1)}>Go Back</Button>
            <ListItem sx={{display:"flex", marginTop:"20px",justifyContent:"space-between", alignItems:"center", padding:"28px 32px", backgroundColor:"#FFFFFF",borderRadius: "10px"}}>
                <Box>
                    <Typography sx={{ fontWeight: "600",fontFamily:"inherit",fontSize: "18px",lineHeight: "26px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>Add a dark theme option</Typography>
                    <Typography sx={{fontFamily:"inherit", color:"#3A4374"}} variant='subtitle1'>It would help people with light sensitivities and who prefer dark mode.</Typography>
                    <Typography sx={{marginTop:"12px", padding:"5px 16px", display:"inline-block", backgroundColor:"#F2F4FF",borderRadius: "10px", fontWeight: "600", fontFamily:"inherit", fontSize: "13px",lineHeight: "19px", color:"#4661E6"}} variant='body2'>Feature</Typography>
                </Box>
                <Box>
                    <Button to="/commit" sx={{display:"flex", alignItems:"center", textDecoration:"none"}}>
                        <img src={commitImg} alt="commint img" />
                        <Typography sx={{marginLeft:"8px", fontWeight: "700", fontFamily:"inherit",color:"#3A4374"}} variant='body2'>{data.length}</Typography>
                    </Button>
                </Box>
            </ListItem>
            <Box sx={{backgroundColor:"#FFFFFF",borderRadius: "10px", padding:"24px 34px", marginTop:"24px"}}>
                <Typography sx={{ fontWeight: "600",fontFamily:"inherit",fontSize: "18px",lineHeight: "26px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>{data?.length} Comments</Typography>
                <List>
                    <ListItem sx={{padding:"0", marginTop:"32px", display:"inline-block", borderBottom:"2px solid #8C92B355", paddingBottom:"32px"}}>
                        <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                            {data?.length ?    <Box sx={{display:"flex"}}>
                                {user.map(item => (
                                    <>
                                        {item?.avatar.length > 26 ? <img width={40} height={40} style={{borderRadius:"50%", width:"40px", height:"40px"}} src={item.avatar} alt="header img" /> : <img width={40} height={40} style={{borderRadius:"50%"}} src={human} alt="header img" />}
                                        <Box sx={{marginLeft:"32px"}}>
                                            <Typography sx={{ fontWeight: "700",fontFamily:"inherit",fontSize: "14px", color:"#3A4374"}} variant='h5'>{item.last_name}</Typography>
                                            <Typography sx={{fontFamily:"inherit",fontSize: "14px", color:"#647196", marginBottom:"4px"}} variant='body2'>{item.user_name}</Typography>
                                        </Box>
                                    </>
                                ))}
                            </Box> : "Comments not"}
                            <Button sx={{fontSize:"13px", color:"#4661E6", fontFamily:"inherit", fontWeight:"600", textTransform:"capitalize", padding:"0", display:"inline-block"}}>Reply</Button>
                        </Box>
                        {data.map((el) => (
                            <>
                            <Box key={el.comments_id} sx={{display:"flex", marginTop:"17px", marginLeft:"75px"}}>
                                <Typography sx={{ fontFamily:"inherit", fontSize: "14px",color:"#4661E6"}} variant='h6'>ID:{el.comments_id}</Typography>
                                <Typography sx={{ fontWeight: "400",fontFamily:"inherit", fontSize:"15px",lineHeight: "22px",color:"#647196", marginLeft:"17px", textAlign:"left"}} variant='body2'>{el.comments_detail}</Typography>
                            </Box>
                            <Divider sx={{marginLeft:"75px", marginTop:"15px"}}/>
                            </>
                        ))}
                    </ListItem>
                </List>
            </Box>
            <Box sx={{backgroundColor:"#FFFFFF",borderRadius: "10px", padding:"24px 34px", marginY:"24px"}}>
                <Typography sx={{ fontWeight: "700",fontFamily:"inherit",fontSize: "18px",lineHeight: "26px", color:"#3A4374"}} variant='h5'>Add Comment</Typography>
                <form onSubmit={handlerCommitSubmit}>
                    <TextField inputRef={commitRef} sx={{width:"100%", marginTop:"24px", backgroundColor:"#F7F8FD"}} id="outlined-multiline-static" multiline rows={2} placeholder="Type your comment here" inputProps={{ style:{ color: "#06135a" , fontFamily:"Jost"}}} required/>
                    <Button sx={{backgroundColor:"#AD1FEA",borderRadius: "10px",fontSize:"14px", color:"#F2F4FE", fontFamily:"inherit", fontWeight:"700", textTransform:"capitalize", padding:"12px 24px", display:"flex", marginLeft:"auto", marginTop:"16px", '&:hover': {backgroundColor:"#AD1FEA"}}} type='submit'>Post Comment</Button>
                </form>
            </Box>
        </Box>
        )
    }
