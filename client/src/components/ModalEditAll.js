import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const valueFromPropHandler = (obj, key) => {
  if (key === "Category") {
    return obj?.Category;
  } else if (key === "DisplayKeyName") {
    return obj?.DisplayKeyName;
  } else if (key === "Helptext") {
    return obj?.Helptext;
  } else {
    return false;
  }
};

const ModalEditAll = (props) => {
  const { choosenRow,template, editChoosenField, type, id} = props?.data;
  console.log( template );
  const [data, setData] = useState({
    co:props?.template[1].split(":")[1],
    route:props?.template[2].split(":")[1],
    Date:props?.template[3].split(":")[1],
    Time:props?.template[4].split(":")[1],
    Loc:props?.template[5].split(":")[1],
    Vnd:props?.template[6].split(":")[1],   
  });
  const [categoryData, setCategoryData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/configurations/unique/category")
      .then((res) => setCategoryData(res?.data?.categories))
      .catch((err) => console.log(err));
  };
  let newData = [];
  const handleChange = (e) => {
    newData[e.target.name] = e.target.value;
    setData({
      ...data,
      ...newData,
    });
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   props.close()
  // };
  const updateHandler=async()=>{
  const Updateddata=``
    axios
          .patch(
            "http://localhost:4000/configurations/update/template",
            data
          )}
  
  const handleUpdate = async () => {
    const updatedvalue = {
      category: data?.category,
      systemKey: data?.systemKey,
    };
    switch (editChoosenField) {
      case "Category":
        return axios
          .patch(
            "http://localhost:4000/configurations/update/all/category",
            data
          )
          .then((res) => {
            setOpen(false);
            props.close();
            props.tableData(res?.data.newData);
            props.data["category"] = data?.category;
          });
      case "DisplayKeyName":
        return axios
          .patch(
            "http://localhost:4000/configurations/update/all/DisplayKeyName",
            data
          )
          .then((res) => {
            setOpen(false);
            props.close();
            props.tableData(res?.data.newData);
            props.data["category"] = data?.category;
          });
      case "Helptext":
        return axios
          .patch(
            "http://localhost:4000/configurations/update/all/Helptext",
            data
          )
          .then((res) => {
            setOpen(false);
            props.close();
            props.tableData(res?.data.newData);
            props.data["category"] = data?.category;
          });
      default:
        return false;
    }
  };
  const valuehandle=(id)=>{
    switch(id){
      case 0:
        return data?.co;
      case 1 :
        return data?.route;
      case 2 :
        return data?.Date;
      case 3 :
        return data?.Time;
      case 4 :
        return data?.Loc;
      case 5 :
          return data?.Vnd;
      default: 
       return 0; 
        
    }
  }
  const tempArray = props.template ?.slice(1);

  
  return (
    <div>
      <Grid container>
        <Grid item sm={12}>
        <Typography variant="h4"> {props.template[0]}</Typography>
        </Grid>
      
     
        {type === "edit" ?  (
        
              <Grid container marginTop={"10px"} spacing={2}>
            {tempArray.slice(0,tempArray.length-1).map((item,index) => (
              <>
              <Grid item sm={3} display={"flex"} alignItems={"center"} >
              <Typography
                  variant="subtitle1"
                  fontFamily={"sans-serif"}
                  fontWeight={"300"}
                  lineHeight={"5px"}
                >
                  {item.split(':')[0]}
                </Typography>
              </Grid>
              <Grid item sm={9}>
                
                <TextField type="text" fullWidth size="small" name={(index===0)?'co':((index===1)?'route':item.split(':')[0])} value={valuehandle(index)} onChange={handleChange}/>
                </Grid>
                
                <br />
              </>
            ))}
            
               <Grid item sm={12}>
               <Typography variant="h6"> { tempArray[tempArray.length-1]}</Typography>
               </Grid>
             
               <Grid item sm={12}>
               <Button variant="contained" onClick={updateHandler}>Update</Button>
               </Grid>
            
          </Grid>
         
        ) : (
          <Box marginTop={"10px"}>
            {tempArray.map((item) => (
              <>
                <Typography
                  variant="subtitle1"
                  fontFamily={"sans-serif"}
                  fontWeight={"300"}
                  lineHeight={"5px"}
                >
                  {item}
                </Typography>
                <br />
              </>
            ))}
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default ModalEditAll;
