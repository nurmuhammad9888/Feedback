import { Button, Link, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import {NavLink as RoutLink, useNavigate} from "react-router-dom";
import pincel from "../../assets/images/pincel.svg"
import  erorImg from "../../assets/images/error-img.png";
import  human from "../../assets/images/human.png";
import { UserContext } from '../../Context/UserContext';
import { AuthContext } from '../../Context/AuthContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AdminPost } from '../AdminPost/AdminPost';
import axios from 'axios';

export const Admin = () => {
    const {token} = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const navgate = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9090/feedback/user/get", {headers:{
            token
        }})
        .then(res => {
            if(res.status === 200){
                setData(res.data)
            }})
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='container'>
            <Box sx={{paddingTop:"94px"}}>
                    <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"space-between", backgroundColor:"#373F68",borderRadius: "10px", padding:"34px 24px"}}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Button sx={{fontWeight: "700",fontFamily:"inherit",fontSize: "14px" ,color:"#fff",width:"105px", textTransform:"capitalize"}} startIcon={<ArrowBackIosIcon  sx={{'&:nth-of-type(1)': {fontSize:"14px"}}}  />} onClick={() => navgate(-1)}>Go Back</Button>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                        <Link to={`/adminFeedback`} sx={{textDecoration:"none"}} component={RoutLink}>
                            <Button sx={{backgroundColor:"#AD1FEA",borderRadius: "10px",fontSize:"14px", color:"#F2F4FE", fontFamily:"inherit", fontWeight:"700", textTransform:"capitalize", padding:"12px 24px", display:"flex", marginLeft:"auto", '&:hover': {backgroundColor:"#AD1FEA"}}} type='submit'>+ Add Feedback</Button>
                        </Link>
                        </Box>
                    </Box>
                <Box sx={{display:"flex", marginTop:"24px"}}>
                    <Box sx={{maxWidth:"255px", width:"100%", height:"174px", padding:"24px", borderRadius:"10px", background: "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)"}}>
                            {user.map(item => (
                                <>
                                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                {item?.avatar.length > 26 ? <img width={48} height={48} style={{borderRadius:"50%", width:"48px", height:"48px"}} src={item.avatar} alt="header img" /> : <img width={48} height={48} style={{borderRadius:"50%"}} src={human} alt="header img" />}
                                    <Link to={`/editAdmin`} sx={{textDecoration:"none"}} component={RoutLink}>
                                        <img src={pincel} alt="header img" />
                                    </Link>
                                </Box>
                                <Typography sx={{marginTop:"10px",fontWeight: "700", fontFamily:"inherit",fontSize: "20px",lineHeight: "29px",color:"#fff"}} variant='h5'>{item.last_name}</Typography>
                                <Typography sx={{fontFamily:"inherit",color:"#ffffff", opacity:"0.75"}} variant='body2'>{item.user_name}</Typography>
                                <Typography sx={{fontFamily:"inherit",fontSize: "13px", color:"#ffffff", opacity:"0.75"}} variant='body2'>{item.email_address}</Typography>                                
                                </>
                            ))}
                    </Box>
                    <Box sx={{width:"100%", marginLeft:"30px"}}>
                        {data?.length ? (
                            <List sx={{marginY:"24px", padding:"0"}}>
                                {data.map(item => (
                                    <AdminPost key={item.id} item={item} />
                                ))}
                            </List> 
                        ):(
                            <List sx={{width:"410px", display:"flex", flexDirection:"column", justifyContent:"center", mx:"auto",marginTop:"100px", alignItems:"center", textAlign:"center"}}>
                                <img src={erorImg} alt="error img" />
                                <Typography sx={{fontWeight: "700", marginTop:"50px", fontFamily:"inherit", fontSize: "24px",lineHeight: "26px",color:"#3A4374"}} variant='h6'>There is no feedback yet.</Typography>
                                <Typography sx={{ marginTop:"16px",fontFamily:"inherit",fontSize: "15px", color:"#647196"}} variant='body2'>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</Typography>
                            </List>
                        )}
                    </Box>
                </Box>
            </Box>
        </div>
        )
    }
    