import React, {useContext, useState} from 'react';
import {NavLink as RoutLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import {UserContext} from "../../Context/UserContext";
import { Box, Typography, Link, TextField, Button, InputAdornment } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import loginBg from "../../assets/images/login-bg.png"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

export function Login() {
    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate()
    const [inputType, setInputType] = useState(false)
    const schema = Yup.object({
        email_address: Yup.string().email("Invalid format").required("Required"),
        password: Yup.string().min(3, "3 min").max(8, "max 8").required("Required"),
    })
const { register, handleSubmit, formState:{errors, isValid},} = useForm({
    mode:"all",
    defaultValues:{
        email_address:"",
        password:"",
    },
    resolver:yupResolver(schema)
})
const onSubmit = (data) =>{
    console.log(data);
    axios.post('http://localhost:9090/user/login', data)
    .then(res =>{ if(res.status === 200){
        console.log(res);
        setToken(res.data.token)
        navigate("/")
    }})
    .catch(err => console.log(err))
}
    return (
        <>
            <Box sx={{display:"flex",}}>
                <Box sx={{maxWidth:"444px", paddingTop:"265px", paddingLeft:"40px", width:"100%", height:"100vh", borderRadius:"16px", boxShadow:"0px 16px 32px -4px rgba(145, 158, 171, 0.12)", background:"radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)"}}>
                    <Typography sx={{fontWeight: "700", fontSize:" 32px", lineHeight:" 48px", color: "#FFFFFF",  fontFamily:"inherit"}} component="h4">
                    Hi, Welcome back
                    </Typography>
                    <img style={{marginTop:"40px"}} src={loginBg} width="364" height="273" alt="register bg" />
                </Box>
                <Box sx={{width:"100%"}}>
                    <Box sx={{display:"flex", justifyContent:"right", margin:"40px"}}>
                        <Typography sx={{fontWeight: "500",fontFamily:"inherit",fontSize: "14px",lineHeight: "22px",textAlign: "right",color:"#3A4374"}} variant='body2'>Don’t have an account? </Typography>
                        <Link component={RoutLink} sx={{fontWeight: "600",fontFamily:"inherit", marginLeft:"10px" ,fontSize: "14px", lineHeight: "22px", color: "#4661E6", textDecoration:"none"}} to={"/register"}>Get started</Link>
                    </Box>
                    <Box sx={{width:"526px", mx:"auto", marginTop:"180px"}}>
                        <Typography sx={{fontWeight: "700", fontSize:" 24px",fontFamily:"inherit", lineHeight:" 35px", color: "#3A4374"}} component={"h2"} className="text-danger"> Sign in </Typography>
                        <Typography sx={{color: "#647196",fontFamily:"inherit", marginTop:"4px"}}>Enter your details below</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField sx={{width:"525px", marginTop:"16px"}} {...register("email_address")} helperText={errors.email_address?.message} id="outlined-basic" type="email" label="Email address" variant="outlined" />
                            <TextField sx={{ width:"525px", marginTop:"16px"}} {...register("password")} helperText={errors.password?.message} id="outlined-basic" type={inputType ? "text" : "password"} label="Password" variant="outlined" InputProps={{endAdornment: ( <InputAdornment onClick={() => setInputType(!inputType)} position="end"> <RemoveRedEyeIcon cursor="pointer" /> </InputAdornment>)}}/>
                            <Button variant="contained" disabled={!isValid} sx={{marginTop:"24px" , fontWeight: "700", fontSize:" 14px", color: "#F2F4FE", padding:"13px", width:"100%", borderRadius:"10px", textTransform:"capitalize"}} type="submit">Login</Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
}