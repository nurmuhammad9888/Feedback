import React, {useContext, useState} from 'react';
import {NavLink as RoutLink, Route, Routes, useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";
import { Box, Typography, Link, TextField, Button, InputAdornment } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import registerBg from "../../assets/images/register-bg.png"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Login } from '../Login/Login';

export function Register() {
    const {setToken} = useContext(AuthContext);
    const [inputType, setInputType] = useState(false)
    const navigate = useNavigate()

    const schema = Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        user_name: Yup.string().required("Required"),
        email_address: Yup.string().email("Invalid format").required("Required"),
        password: Yup.string().min(3, "3 min").max(8, "max 8").required("Required"),
    })
    
    const { register, handleSubmit, formState:{errors, isValid},} = useForm({
    mode:"all",
    defaultValues:{
        first_name:"", 
        last_name:"",
        user_name:"",
        email_address:"",
        password:"",
    },
    resolver:yupResolver(schema)
})

const onSubmit = (data) =>{
    console.log(data);
    axios.post('http://localhost:9090/users/post', data)
    .then(res =>{ if(res.status === 200){
        console.log(res);
        setToken(res.data.token)
        navigate("/")
    }})
    .catch(err => console.log(err))
}
    return (
        <Box sx={{display:"flex"}}>
            <Box sx={{maxWidth:"444px", paddingTop:"265px", paddingLeft:"40px", width:"100%", height:"100vh", borderRadius:"16px", boxShadow:"0px 16px 32px -4px rgba(145, 158, 171, 0.12)", background:"radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)"}}>
                <Typography sx={{fontWeight: "700", fontSize:" 32px", lineHeight:" 48px", color: "#FFFFFF",  fontFamily:"inherit"}} component="h4">
                    Manage the job <br />
                    more effectively with Manimal
                </Typography>
                <img style={{marginTop:"40px"}} src={registerBg} width="364" height="273" alt="register bg" />
            </Box>
            <Box sx={{width:"100%"}}>
                <Box sx={{display:"flex", justifyContent:"right", margin:"40px"}}>
                    <Typography sx={{fontWeight: "500", fontFamily:"inherit",fontSize: "14px",lineHeight: "22px",textAlign: "right",color:"#3A4374"}} variant='body2'>Already have an account? </Typography>
                    <Link component={RoutLink} sx={{fontWeight: "600", marginLeft:"10px" ,fontSize: "14px", lineHeight: "22px", color: "#4661E6", textDecoration:"none"}} to={"/login"}>Login</Link>
                </Box>
                <Box sx={{width:"526px", mx:"auto", marginTop:"80px"}}>
                    <Typography sx={{fontWeight: "700", fontFamily:"inherit",fontSize:" 24px", lineHeight:" 35px", color: "#3A4374"}} component={"h2"} className="text-danger"> Get started absolutely free. </Typography>
                    <Typography sx={{color: "#647196",fontFamily:"inherit", marginTop:"4px"}}>Free forever. No credit card needed.</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField sx={{ width:"255px", marginTop:"32px"}} {...register("first_name")} helperText={errors.first_name?.message} color="info" id="outlined-basic" type="text" label="First name" variant="outlined" />
                        <TextField sx={{ width:"255px", marginTop:"32px", marginLeft:"16px"}} {...register("last_name")} helperText={errors.last_name?.message} id="outlined-basic" type="text" label="Last name" variant="outlined" />
                        <TextField sx={{ width:"525px", marginTop:"16px"}} {...register("user_name")} helperText={errors.user_name?.message} color="info" id="outlined-basic" type="text" label="User name" variant="outlined" />
                        <TextField sx={{width:"525px", marginTop:"16px"}} {...register("email_address")} helperText={errors.email_address?.message} id="outlined-basic" type="email" label="Email address" variant="outlined" />
                        <TextField sx={{ width:"525px", marginTop:"16px"}} {...register("password")} helperText={errors.password?.message} color="info" id="outlined-basic" type={inputType ? "text" : "password"} label="Password" variant="outlined" InputProps={{endAdornment: ( <InputAdornment onClick={() => setInputType(!inputType)} position="end"> <RemoveRedEyeIcon cursor="pointer" /> </InputAdornment>)}}/>
                        <Button variant="contained" disabled={!isValid} sx={{marginTop:"24px",fontFamily:"inherit", fontWeight: "700", fontSize:" 14px", color: "#F2F4FE", padding:"13px", width:"100%", borderRadius:"10px", textTransform:"capitalize"}} type="submit">Register</Button>
                    </form>
                </Box>
            </Box>
            <Routes>
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
        </Box>
    );
}