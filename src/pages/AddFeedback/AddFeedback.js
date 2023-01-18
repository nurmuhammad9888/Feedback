import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system'
import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import  addImg from "../../assets/images/plus-add.svg"
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

export const AddFeedback = () => {
    const navgate = useNavigate();

    const titlRef = useRef()
    const categoryRef = useRef()
    const bodyRef = useRef()
	const {token} = useContext(AuthContext);

    const handlerSubmit = (evt) => {
        evt.preventDefault();
        axios.post("http://localhost:9090/feedback/post", 
        {
            "feedback_title":titlRef.current.value,
            "feedback_detail": bodyRef.current.value,
            "feedback_category":categoryRef.current.value,
        },{headers:{
            token
        }}
        
        ).then(res => {
            if(res.status === 200){
                titlRef.current.value  = "";
                bodyRef.current.value  = "";
                categoryRef.current.value  = "";
            }
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    return (
        <Box sx={{width:"540px", mx:"auto", marginTop:"92px"}}>
            <Button sx={{fontWeight: "700",fontFamily:"inherit",fontSize: "14px" ,color:"#647196",width:"105px", textTransform:"capitalize"}} startIcon={<ArrowBackIosIcon  sx={{color: blue[800],'&:nth-of-type(1)': {fontSize:"14px"}}}  />} onClick={() => navgate(-1)}>Go Back</Button>
            <Box sx={{width:"100%", backgroundColor:"#fff", marginTop:"68px",borderRadius:"10px", padding:"52px 42px 40px 42px", position:"relative"}}>
                <img style={{position:"absolute", top:"-25px"}} src={addImg} alt="plus icon" />
                <Typography sx={{ fontWeight: "700",fontFamily:"inherit",fontSize: "24px",lineHeight: "35px", color:"#3A4374", marginBottom:"4px"}} variant='h2'>Create New Feedback</Typography>
                <Box sx={{marginTop:"40px"}}>
                    <form onSubmit={handlerSubmit}>
                        <Box>
                            <Typography sx={{ fontWeight: "700",fontFamily:"inherit",fontSize: "14px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>Feedback Title</Typography>
                            <Typography sx={{ fontWeight: "400",fontFamily:"inherit",fontSize: "14px", color:"#647196", marginBottom:"4px"}} variant='body2'>Add a short, descriptive headline</Typography>
                            <TextField inputRef={titlRef} sx={{width:"100%", marginTop:"24px", backgroundColor:"#F7F8FD"}} id="outlined-multiline-static" multiline inputProps={{ style:{ color: "#06135a" , fontFamily:"Jost"}}} required/>
                        </Box>
                        <Box sx={{marginTop:"24px"}}>
                            <Typography sx={{ fontWeight: "700",fontFamily:"inherit",fontSize: "14px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>Category</Typography>
                            <Typography sx={{ fontWeight: "400",fontFamily:"inherit",fontSize: "14px", color:"#647196", marginBottom:"4px"}} variant='body2'>Choose a category for your feedback</Typography>
                            <TextField inputRef={categoryRef} sx={{width:"100%", marginTop:"24px", backgroundColor:"#F7F8FD"}} id="outlined-multiline-static" select inputProps={{ style:{ color: "#06135a" , fontFamily:"Jost"}}} required> 
                                <MenuItem value={"UI"}>
                                    <option>UI</option>
                                </MenuItem>
                                <MenuItem value="UX">
                                    <option>UX</option>
                                </MenuItem>
                                <MenuItem value="Enhancement">
                                    <option>Enhancement</option>
                                </MenuItem>
                                <MenuItem value="Bug">
                                    <option>Bug</option>
                                </MenuItem>
                                <MenuItem value="Feature">
                                    <option>Feature</option>
                                </MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{marginTop:"24px"}}>
                            <Typography sx={{ fontWeight: "700",fontFamily:"inherit",fontSize: "14px", color:"#3A4374", marginBottom:"4px"}} variant='h5'>Feedback Detail</Typography>
                            <Typography sx={{ fontWeight: "400",fontFamily:"inherit",fontSize: "14px", color:"#647196", marginBottom:"4px"}} variant='body2'>Include any specific comments on what should be improved, added, etc.</Typography>
                            <TextField inputRef={bodyRef} sx={{width:"100%", marginTop:"24px", backgroundColor:"#F7F8FD"}} id="outlined-multiline-static" multiline rows={2} inputProps={{ style:{ color: "#06135a" , fontFamily:"Jost"}}} required/>
                        </Box>
                        <Button onClick={() => navgate(-1)} sx={{backgroundColor:"#3A4374",borderRadius: "10px",fontSize:"14px", color:"#F2F4FE", fontFamily:"inherit", fontWeight:"700", textTransform:"capitalize", padding:"12px 24px", marginLeft:"196px",marginTop:"32px",'&:hover': {backgroundColor:"#AD1FEA"}}}>Cancel</Button>
                        <Button sx={{backgroundColor:"#AD1FEA",borderRadius: "10px",fontSize:"14px", color:"#F2F4FE", fontFamily:"inherit", fontWeight:"700", textTransform:"capitalize", padding:"12px 24px", marginLeft:"16px", marginTop:"32px",'&:hover': {backgroundColor:"#AD1FEA"}}} type='submit'>Add Feedback</Button>
                    </form>
                </Box>
            </Box>
        </Box>
        )
    }
    