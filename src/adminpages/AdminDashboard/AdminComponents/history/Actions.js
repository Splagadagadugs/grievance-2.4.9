import React from 'react';
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
import AddForm from './AddForm';
import EditForm from './EditForm';
import EditGrievanceForm from './EditGrievanceForm';


// const Actions = ({params}) => {
//   return (
//     <>
//     </>
   
//   )
// }

// export default Actions;

export default function Actions({params}) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "forms");
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
    const userDoc = doc(db, "forms", id);
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

  const editData = (id, middleName, lastName, firstName,studentNumber, status, natureConcern, email, currentYear, currentCollege, contactNumber, concern, classConcern ) => {
    const data = {
      id: id, 
      // Status: status,
      // StudentNumber: studentNumber,
      // lastName: lastName,
      // firstName: firstName,
      // middleName: middleName,
      // Email: email,
      // ContactNumber: contactNumber,
      // CurrentCollege: currentCollege,
      // CurrentYear: currentYear,
      // ClassificationConcern: classConcern,
      // NatureConcern: natureConcern,
      // Concern: concern,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        Email: email,
        StudentNumber: studentNumber,
        ContactNumber: contactNumber,
        CurrentCollege: currentCollege,
        CurrentYear: currentYear,
        ClassificationConcern: classConcern,
        NatureConcern: natureConcern,
        Concern: concern,
        Status: status
    };
    setFormid(data);
    handleEditOpen();
  };


  return (
    <>
    {/* MODAL SYSTEM */}
        <div>
        <Modal
            open={editopen}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <EditGrievanceForm closeEvent={handleEditClose} fid={formid}/>
            </Box>
        </Modal>

        </div>
    {/* MAIN BUTTON FUNCTIONALITIES */}
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
                                editData(row.id, row.status, row.studentNumber,row.firstName, row.lastName, row.middleName, row.email,row.contactNumber, row.currentCollege, row.currentYear,row.classConcern, row.natureConcern, row.concern);
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
                  </TableRow>
                );
              })}
          </TableBody>

    </>
  );

};