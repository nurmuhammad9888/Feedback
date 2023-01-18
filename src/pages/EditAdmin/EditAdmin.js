import React, {useContext, useRef, useState} from 'react';
import {NavLink as RoutLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {UserContext} from "../../Context/UserContext";
import { Box, TextField, Button, InputAdornment } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { blue } from '@mui/material/colors';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import pincelPost from "../../assets/images/pencil-post.svg"
import  humanBig from "../../assets/images/IMG.png";
import axios from 'axios';

export function EditAdmin() {
    const {token} = useContext(AuthContext);
    const navgate = useNavigate();
    const [inputType, setInputType] = useState(false)
    const {user} = useContext(UserContext);

    const first_name = useRef()
    const last_name = useRef()
    const user_name = useRef()
    const email_address = useRef()
    const password = useRef()
    const avatar = useRef()

const handleSubmit = (evt) =>{
    evt.preventDefault();
    const newFormData = new FormData();

    newFormData.append('first_name', first_name.current.value);
    newFormData.append('last_name', last_name.current.value);
    newFormData.append('user_name', user_name.current.value);
    newFormData.append('email_address', email_address.current.value);
    newFormData.append('password', password.current.value);
    newFormData.append('avatar', avatar.current.files[0]);

    axios.put('http://localhost:9090/user/put', newFormData,{headers:{
        token
    }})
    .then(res =>{ if(res.status === 200){
        console.log(res);
        navgate(-1)
    }})
    .catch(err => console.log(err))
}
    return (
        <Box className='container' sx={{marginY:"92px"}}>
            <Button sx={{fontWeight: "700",fontFamily:"inherit",fontSize: "14px" ,color:"#647196",width:"105px", textTransform:"capitalize"}} startIcon={<ArrowBackIosIcon  sx={{color: blue[800],'&:nth-of-type(1)': {fontSize:"14px"}}}  />} onClick={() => navgate(-1)}>Go Back</Button>
            <Box sx={{width:"100%"}}>
                <Box sx={{width:"526px", mx:"auto", marginTop:"80px"}}>
                    <Box sx={{display:"flex", justifyContent:"center" , alignItems:"center"}}>
                        {
                            user.map(item => (
                                item?.avatar.length > 26 ? <img src={item.avatar} width={175} height={175} style={{borderRadius:"50%", width:"175px", height:"175px"}} alt="edit img" />: <img src={humanBig} width={175} height={175} style={{borderRadius:"50%"}} alt="edit img" />
                            ))
                        }
                    </Box>
                    <form style={{position:"relative"}} onSubmit={handleSubmit}>
                        <label style={{width:"32px", height:"32px", borderRadius:"50%", display:"inline-block", position:"absolute", top:"-19px", right:"190px", cursor:"pointer"}}>
                            <img src={pincelPost} alt="edit img " />
                            <TextField inputRef={avatar} sx={{visibility:"hidden", width:"0" ,height:"0"}} name="avatar" id="outlined-basic" type="file" variant="outlined" required/>
                        </label>
                        <TextField inputRef={first_name} sx={{ width:"525px", marginTop:"42px"}}  name="first_name" color="info" id="outlined-basic" type="text" label="First name" variant="outlined"  required/>
                        <TextField inputRef={last_name} sx={{ width:"525px", marginTop:"16px"}}  name="last_name" id="outlined-basic" type="text" label="Last name" variant="outlined" />
                        <TextField inputRef={user_name} sx={{ width:"525px", marginTop:"16px"}}  name="user_name" color="info" id="outlined-basic" type="text" label="User name" variant="outlined"  required/>
                        <TextField inputRef={email_address} sx={{width:"525px", marginTop:"16px"}}  name="email_address" id="outlined-basic" type="email" label="Email address" variant="outlined"  required/>
                        <TextField inputRef={password} sx={{ width:"525px", marginTop:"16px"}}  name="password" color="info" id="outlined-basic" type={inputType ? "text" : "password"} label="Password" variant="outlined" InputProps={{endAdornment: ( <InputAdornment onClick={() => setInputType(!inputType)} position="end"> <RemoveRedEyeIcon cursor="pointer" /> </InputAdornment>)}} required/>
                        <Button variant="contained" sx={{marginTop:"24px",fontFamily:"inherit", fontWeight: "700", fontSize:" 14px", color: "#F2F4FE", padding:"13px", width:"100%", borderRadius:"10px", textTransform:"capitalize"}} type="submit">Save Changes</Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}