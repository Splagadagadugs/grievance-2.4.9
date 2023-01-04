import * as React from 'react';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Divider, MenuItem, Select, Typography } from '@mui/material';
import { db, firebaseApp } from "../../../../firebase";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AddForm2 from './AddForm2';
import EditForm2 from './EditForm2';


export default function Historylist2() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "Testing2");
  const [formid, setFormid] = useState("");
  const [open, setOpen] = useState(false); 
  const [editopen, setEditOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const userDoc = doc(db, "Testing2", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getUsers();
    }
  };
 
  const editData = (id, firstName, lastName, middleName, Email, StudentNumber, ContactNumber, CurrentCollege, CurrentYear, ClassificationConcern, NatureConcern, Concern, Status) => {
    const data = {
      id: id, 
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      Email: Email,
      StudentNumber: StudentNumber,
      ContactNumber: ContactNumber,
      CurrentCollege: CurrentCollege,
      CurrentYear: CurrentYear,
      ClassificationConcern: ClassificationConcern,
      NatureConcern: NatureConcern,
      Concern: Concern,
      // Status: Status,

    };
    setFormid(data);
    handleEditOpen();
  };



  return (
    <>
      <div>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddForm2 closeEvent={handleClose} />
        </Box>
      </Modal> 

      <Modal
        open={editopen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm2 closeEvent={handleEditClose} fid={formid}/>
        </Box>
      </Modal>

    </div>


    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Dashboard
          </Typography>
      <Divider />

      <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.Name || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Data" />
              )}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
              Add
            </Button>
          </Stack>
          <Box height={10} />

      <TableContainer sx={{ maxHeight: 300, maxWidth: 1200 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "130px" }}>
                    Action
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    First Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Last Name
                  </TableCell>
                  <TableCell align="left" zstyle={{ minWidth: "130px" }}>
                    Middle Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Email
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Student Number
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Contact Number
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Current College
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Current Year
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Classification of Concern
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "130px" }}>
                    Nature of Concern
                  </TableCell> 
                  <TableCell align="left" style={{ minWidth: "150px" }}>
                    Concern
                  </TableCell> 
                  {/* <TableCell align="left" style={{ minWidth: "150px" }}>
                    Status
                  </TableCell>  */}

            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell align="left">
                          <Stack spacing={2} direction="row">
                            <EditIcon
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              className="cursor-pointer"
                              onClick={() => {
                                editData(row.firstName,row.lastName,row.middleName,row.Email,row.StudentNumber,row.ContactNumber,row.CurrentCollege,row.CurrentYear,row.ClassificationConcern,row.NatureConcern,row.Concern);
                              }}
                            
                            />
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </Stack>
                        </TableCell>
                        
                        <TableCell align="left">{row.firstName}</TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.middleName}</TableCell>
                        <TableCell align="left">{row.Email}</TableCell>
                        <TableCell align="left">{row.StudentNumber}</TableCell>
                        <TableCell align="left">{row.ContactNumber}</TableCell>
                        <TableCell align="left">{row.CurrentCollege}</TableCell>
                        <TableCell align="left">{row.CurrentYear}</TableCell>
                        <TableCell align="left">{row.ClassificationConcern}</TableCell>
                        <TableCell align="left">{row.NatureConcern}</TableCell>
                        <TableCell align="left">{row.Concern}</TableCell>
                        {/* <TableCell align="left">{row.Status}</TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </>
  );
}
