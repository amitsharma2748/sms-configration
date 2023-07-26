import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import BookIcon from "@mui/icons-material/Book";
import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { styled } from "@mui/material/styles";
import ModalEditAll from "./ModalEditAll";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import RuleSharpIcon from "@mui/icons-material/RuleSharp";
import Filter1SharpIcon from "@mui/icons-material/Filter1Sharp";
const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
 
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const ConfigurationUpdate = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditAllOpen, setEditAllModalOpen] = useState(false);
  const [poidData, setPoidData] = useState([]);
  const [oidData, setOidData] = useState([]);
  const [template,setTemplate]=useState(" No Template")
  const [tableData, setTableData] = useState([]);
  const [configID, setConfigID] = useState(0);
  const [data, setData] = useState({
    oid: " ",
    poid: " ",
    type:"read",
    newValue: "",
    typeOfValue: "String",
    systemKey: " ",
    id:null,
  });
  let newData = [];
  const handleChange = async (e) => {
    newData[e.target.name] = e.target.value;
    setData({
      ...data,
      ...newData,
    });

    if (e.target.name === "poid" && data !== " ") {
      setTableData([]);
      setData({
        ...data,
        category: "",
        poid: e.target.value,
      });
      const poidData = await axios.post(
        "http://localhost:4000/configurations/filter/poid",
        {
          poid: e.target.value,
        }
      );

      setFetchedData(poidData?.data);
      // setTableData(poidData?.data);
      const filteredOids = poidData?.data?.map((item) => item.OID);
      setOidData(Array.from(new Set(filteredOids)));
    }
    let filteredTableData = [];
    if (e.target.name === "oid" && data !== " ") {
      setData({
        ...data,

        oid: e.target.value,
      });
      filteredTableData = fetchedData?.filter(
        (item) => item?.OID === e.target.value
      );
      const fetchedDataByPoid = fetchedData?.filter(
        (item) => item.POID === data?.poid
      );
      const filteredTableDataOid = fetchedDataByPoid?.filter(
        (item) => item?.OID === e.target.value
      );
      setTableData(filteredTableDataOid);
    }
  };

  
  const handleClose = () => {
    setModalOpen(false);
  };
  const modalSubmithandle = async () => {
    const updatedvalue = {
      confID: configID,
      value: data?.newValue,
      systemKey: data?.systemKey,
      oid: data?.oid,
      poid: data?.poid,
      category: data?.category,
    };
    handleClose();
    // setTableData([]);
    if (data?.poid === 0) {
      await axios
        .patch(
          "http://localhost:4000/configurations/update/all/value",
          updatedvalue
        )
        .then((res) => setTableData(res?.data.newData));
    } else {
      await axios
        .patch(
          "http://localhost:4000/configurations/update/value",
          updatedvalue
        )
        .then((res) => setTableData(res?.data.newData))
        .catch((err) => console.log(err));
    }
  };
  const editAllModalHandler = (value, row) => {
    data["editChoosenField"] = value;
    data["choosenRow"] = row;
    setEditAllModalOpen(true);
  };
  
  const handleModalOpen=(value,type,id)=>{
    data["type"]=type
    data["id"]=id
    setEditAllModalOpen(true);
   
    setTemplate(value)
 
  }

  const handleEditClose=()=>{
    setEditAllModalOpen(false);
  }

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/configurations/unique/poid")
      .then((res) => setPoidData(res?.data?.oids))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
  }, [tableData]);
  console.log(tableData);
  return (
    <div>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box>
          <InputLabel id="demo-select-small-label">POID</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={data?.poid}
            name="poid"
            label="poid"
            onChange={(e) => handleChange(e)}
            fullWidth
          >
            <MenuItem value=" ">
              <em>Select Option</em>
            </MenuItem>
            {poidData?.map((item, id) => (
              <MenuItem key={id} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <InputLabel id="demo-select-small-label">OID</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={data?.oid}
            name="oid"
            label="oid"
            onChange={(e) => handleChange(e)}
            disabled={data?.poid === " "}
            fullWidth
          >
            <MenuItem value=" ">
              <em>Select Option</em>
            </MenuItem>
            {oidData?.map((item, id) => (
              <MenuItem key={id} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      <div>
        <Container maxWidth="xl" sx={{ marginTop: "15px" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ width: "100%" }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">S.No</StyledTableCell>
                  <StyledTableCell align="center">
                    SMS Description{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Active / Inactive
                  </StyledTableCell>
                  <StyledTableCell align="center"> Template</StyledTableCell>
                </TableRow>
              </TableHead>
              {tableData.length > 0 && (
                <TableBody>
                  <StyledTableRow
                
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                     
                      width={"5%"}
                      align="left"
                    >
                      1.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                      ASSIGN_PICK_DRV_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.ASSIGN_PICK_DRV}
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon  onClick={()=>handleModalOpen(tableData[0]?.ASSIGN_PICK_DRV_TEMPLATE,"read")}/>
                        <ModeEditIcon onClick={()=>handleModalOpen(tableData[0]?.ASSIGN_PICK_DRV_TEMPLATE,"edit",tableData[0]?.id)}/>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                   
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                   
                      width={"5%"}
                      align="left"
                    >
                      2.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    ASSIGN_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.ASSIGN_PICK_EMP}
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
               
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                 
                      width={"5%"}
                      align="left"
                    >
                      3.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    START_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.START_PICK_EMP}
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    key={tableData.ConfID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      value={tableData.ConfID}
                      width={"5%"}
                      align="left"
                    >
                      4.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    GEOIN_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.GEOIN_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    key={tableData.ConfID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      value={tableData.ConfID}
                      width={"5%"}
                      align="left"
                    >
                    5.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    GEOOUT_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.GEOOUT_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    key={tableData.ConfID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      value={tableData.ConfID}
                      width={"5%"}
                      align="left"
                    >
                      6.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    PICKED_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.PICKED_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    key={tableData.ConfID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      value={tableData.ConfID}
                      width={"5%"}
                      align="left"
                    >
                      7.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    NEXTPICK_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.NEXTPICK_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                    key={tableData.ConfID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      value={tableData.ConfID}
                      width={"5%"}
                      align="left"
                    >
                      8.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    DROPED_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.DROPED_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                      width={"5%"}
                      align="left"
                    >
                      9.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                  END_PICK_EMP_TEMPALTE

                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.END_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                  
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                
                      width={"5%"}
                      align="left"
                    >
                      10.
                    </StyledTableCell>

                    <StyledTableCell align="center" width={"10%"}>
                    NOSHOW_PICK_EMP_TEMPLATE
                    </StyledTableCell>
                    <StyledTableCell align="right" width={"10%"}>
                      <Switch
                        checked={tableData[0]?.NOSHOW_PICK_EMP   }
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"5%"}>
                      <Box display={"flex"} justifyContent={"space-evenly"}>
                        <BookIcon />
                        <ModeEditIcon />
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    11.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  WAITING_PICK_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.WAITING_PICK_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    12.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  ASSIGN_DROP_DRV_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.ASSIGN_DROP_DRV   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    13.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  ASSIGN_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.ASSIGN_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    14.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  START_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.START_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    15.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  GEOIN_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.GEOIN_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    16.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  GEOUT_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.GEOOUT_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    17.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  PICKED_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.PICKED_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    18.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  NEXTDROP_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.NEXTDROP_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    19.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  DROPED_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.DROPED_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    20.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  END_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.END_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    21.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  NOSHOW_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.NOSHOW_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    22.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  SAFEDROP_DROP_EMP_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.SAFEDROP_DROP_EMP   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    23.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  SOS_START_TPT_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.SOS_START_TPT   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    24.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  SOS_CLOSE_TPT_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.SOS_CLOSE_TPT   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow
                  
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
              
                    width={"5%"}
                    align="left"
                  >
                    25.
                  </StyledTableCell>

                  <StyledTableCell align="center" width={"10%"}>
                  SOS_ACTION_TPT_TEMPLATE
                  </StyledTableCell>
                  <StyledTableCell align="right" width={"10%"}>
                    <Switch
                      checked={tableData[0]?.SOS_ACTION_TPT   }
                      // onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  
                  </StyledTableCell>
                  <StyledTableCell align="center" width={"5%"}>
                    <Box display={"flex"} justifyContent={"space-evenly"}>
                      <BookIcon />
                      <ModeEditIcon />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Container>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} width={{ xs: "70%", md: "20%" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Value
          </Typography>
          <Box textAlign={"center"}>
            <TextField
              type={data?.typeOfValue === "Number" ? "number" : "text"}
              name="newValue"
              value={data?.newValue}
              placeholder="new value"
              onChange={(e) => handleChange(e)}
              fullWidth
            />
          </Box>

          <Button
            variant="contained"
            color="error"
            sx={{ marginTop: "15px" }}
            onClick={modalSubmithandle}
          >
            Submit
          </Button>
        </Box>
      </Modal>
      <Modal
        open={modalEditAllOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={"15px"}>
          <ModalEditAll
          template={template}
            close={handleEditClose}
            tableData={setTableData}
            data={data}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ConfigurationUpdate;
