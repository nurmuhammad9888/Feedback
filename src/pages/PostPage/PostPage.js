import { Button, IconButton, Link, List, Menu, MenuItem, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState} from 'react'
import {NavLink as RoutLink, useNavigate, useParams} from "react-router-dom";
import lamp from "../../assets/images/lamp.svg"
import  human from "../../assets/images/human.png"
import  erorImg from "../../assets/images/error-img.png"
import { PostPageCard } from '../PostPageCard/PostPageCard';
import { UserContext } from '../../Context/UserContext';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';


export const PostPage = () => {
    const {setToken} = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const [data, setData] = useState([])
    const [dataError, setError] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()
    const header = id =="All" ? "" : id;

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        axios.get("http://localhost:9090/feedback/get/" + header).then(res => {
            if(res.status === 200){
                setData(res.data)
                setError("")
            }
        })
            .catch(err => {
                setError(err.message)
                setData("")
                console.log(err)
            })
    }, [header])

    return (
        <div className='container'>
            <Box sx={{display:"flex", paddingTop:"94px"}}>
                <Box sx={{maxWidth:"255px", width:"100%"}}>
                    <Box sx={{padding:"62px 0 24px 24px", borderRadius:"10px", background: "radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)"}}>
                        <Typography sx={{fontWeight: "700", fontFamily:"inherit",fontSize: "20px",lineHeight: "29px",color:"#fff"}} variant='h5'>Frontend Mentor</Typography>
                        <Typography sx={{fontWeight: "500", fontFamily:"inherit",color:"#fff", opacity:"0.75"}} variant='body2'>Feedback Board</Typography>
                    </Box>
                    <Box sx={{backgroundColor:"#FFFFFF",borderRadius: "10px", marginTop:"24px", padding:"24px"}}>
                        <Link sx={{padding:"5px 16px", marginRight:"8px",fontWeight: "600", fontFamily:"inherit",fontSize: "13px",color:"#4661E6", backgroundColor:"#F2F4FF", textDecoration:"none",borderRadius:"10px", '&.active': {color: '#fff',backgroundColor:"#4661E6"}}} component={RoutLink} to="/home/All">All</Link>
                        <Link sx={{padding:"5px 16px", marginRight:"8px",fontWeight: "600", fontFamily:"inherit",fontSize: "13px",color:"#4661E6", backgroundColor:"#F2F4FF", textDecoration:"none",borderRadius:"10px", '&.active': {color: '#fff',backgroundColor:"#4661E6"}}} component={RoutLink} to="/home/UL" >UL</Link>
                        <Link sx={{padding:"5px 16px",fontWeight: "600", fontFamily:"inherit",fontSize: "13px",color:"#4661E6", backgroundColor:"#F2F4FF", textDecoration:"none",borderRadius:"10px", '&.active': {color: '#fff',backgroundColor:"#4661E6"}}} component={RoutLink} to="/home/UX">UX</Link>
                        <Box sx={{marginY:"14px"}}>
                            <Link sx={{padding:"5px 16px",marginRight:"14px",fontWeight: "600", fontFamily:"inherit",fontSize: "13px",color:"#4661E6", backgroundColor:"#F2F4FF", textDecoration:"none",borderRadius:"10px", '&.active': {color: '#fff',backgroundColor:"#4661E6"}}} component={RoutLink} to="/home/Enhancement">Enhancement</Link>
                            <Link sx={{padding:"5px 16px",fontWeight: "600", fontFamily:"inherit",fontSize: "13px",color:"#4661E6", backgroundColor:"#F2F4FF", textDecoration:"none",borderRadius:"10px", '&.active': {color: '#fff',backgroundColor:"#4661E6"}}} component={RoutLink} to="/home/Bug">Bug</Link>
                        </Box>
                        <Link sx={{padding:"5px 16px",fontWeight: "600", fontFamily:"inherit",fontSize: "13px",color:"#4661E6", backgroundColor:"#F2F4FF", textDecoration:"none",borderRadius:"10px", '&.active': {color: '#fff',backgroundColor:"#4661E6"}}} component={RoutLink} to="/home/Feature">Feature</Link>
                    </Box>
                </Box>
                <Box sx={{width:"100%", marginLeft:"30px"}}>
                    <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"space-between", backgroundColor:"#373F68",borderRadius: "10px", padding:"14px 24px"}}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <img src={lamp} alt="header img"/>
                            <Typography sx={{fontWeight: "700", margin:"0 38px 0 16px", fontFamily:"inherit", fontSize: "18px",lineHeight: "26px",color:"#fff"}} variant='h6'>{data.length} Suggestions</Typography>
                            <Typography sx={{fontWeight: "400", fontFamily:"inherit",fontSize: "14px", color:"#fff"}} variant='body2'>Sort by : Most Upvotes</Typography>
                            <TextField sx={{color:"#fff" ,'& svg': {color:"#fff"}}} id="standard-select-currency-native" select  variant="standard">
                                <MenuItem> UL </MenuItem>
                                <MenuItem> UX </MenuItem>
                                <MenuItem> Bug </MenuItem>
                                <MenuItem> BugEnhancement </MenuItem>
                                <MenuItem> Feature </MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {user.map(el => (
                                    el?.avatar.length > 26 ? <img width={44} height={44} style={{borderRadius:"50%", width:"44px", height:"44px"}} src={el.avatar} alt="header img" /> : <img width={44} height={44} style={{borderRadius:"50%"}} src={human} alt="header img"/>
                                    ))}
                                </IconButton>
                            </Tooltip>
                            <Menu sx={{ mt: '65px'}} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                <MenuItem onClick={handleCloseUserMenu} sx={{borderBottom:"1px solid #3A437455", display:"block", width:"255px"}}>
                                    <Link sx={{padding:"2px 10px", fontFamily:"Jost",color:"#647196", fontSize:"16px",display:"block",textDecoration:"none"}} component={RoutLink} to="/settings" >Settings</Link>
                                </MenuItem>
                                <MenuItem sx={{pb:"0", alignItems:"flex-start" , width:"100%", display:"inline-block"}} onClick={handleCloseUserMenu}>
                                    <Button onClick={() => {
                                        setToken("")
                                        navigate("/register")
                                    }} sx={{display:"block",textAlign:"left",width:"100%", fontFamily:"Jost", fontSize:"14px", color:"#D73737"}}>Log out</Button>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                    {data?.length && !dataError.length ?  (
                        <List sx={{marginY:"24px", padding:"0"}}>
                            {data.map(item => (
                                <PostPageCard key={item.feedback_id} item={item} />
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
        </div>
        )
    }
    