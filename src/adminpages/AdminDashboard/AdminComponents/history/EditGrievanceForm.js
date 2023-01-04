import { Box, Button, CardActions, IconButton, Select, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from '@mui/material/MenuItem';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db, firebaseApp } from "../../../../firebase";
import Swal from 'sweetalert2';
import Actions from './Actions';


export default function EditGrievanceForm({fid,closeEvent}) {
    const [status, setStatus] = useState("");
    const [studentNumber, setStudentNumber] = useState();
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName ] = useState("");
    const [middleName, setmiddleName ] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber ] = useState();
    const [currentCollege, setCurrentCollege ] = useState("");
    const [currentYear, setCurrentYear ] = useState("");
    const [classConcern, setClassificationConcern ] = useState("");
    const [natureConcern, setNatureConcern ] = useState("");
    const [concern, setConcern ] = useState("");

    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "forms");

    useEffect(() => {
        console.log("FID: " + fid.id);
        setStatus(fid.status);
        setStudentNumber(fid.StudentNumber)
        setfirstName(fid.firstName);
        setlastName(fid.lastName);
        setmiddleName(fid.middleName);
        setEmail(fid.email);
        setContactNumber(fid.contactNumber);
        setCurrentCollege(fid.currentCollege);
        setCurrentYear(fid.currentYear);
        setClassificationConcern(fid.classificationConcern);
        setNatureConcern(fid.natureConcern);
        setConcern(fid.concern);
    }, []);


    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleStudentNumberChange = (event) => {
        setStudentNumber(event.target.value);
    };

    const handlefirstNameChange = (event) => {
        setfirstName(event.target.value);
    };

    const handlelastNameChange = (event) => {
        setlastName(event.target.value);
    };

    const handlemiddleNameChange = (event) => {
        setmiddleName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleContactNumberChange = (event) => {
        setContactNumber(event.target.value);
    };

    const handleCurrentCollegeChange = (event) => {
        setCurrentCollege(event.target.value);
    };

    const handleCurrentYearChange = (event) => {
        setCurrentYear(event.target.value);
    };

    const handleClassificationConcernChange = (event) => {
        setClassificationConcern(event.target.value);
    };

    const handleNatureConcernChange = (event) => {
        setNatureConcern(event.target.value);
    };
    
    const handleConcernChange = (event) => {
        setConcern(event.target.value);
    };


    useEffect(() => {
        getUsers();
      }, []);

    
    const createUser = async () => {
        const userDoc = doc(db, "forms", fid.id);
        const newFields = {
            // status: Status,
            // studentNumber: StudentNumber,
            // lastName: lastName,
            // firstName: firstName,
            // middleName: middleName,
            // email: Email,
            // contactNumber: ContactNumber,
            // currentCollege: CurrentCollege,
            // currentYear: CurrentYear,
            // classConcern: ClassificationConcern,
            // natureConcern: NatureConcern,
            // concern: Concern,
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
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Submitted", "Your file has been updated.", " success");

    };
    
    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    

      const StatusOption = [
        {
          value: 'pending',
          label: 'Pending',
        },
        {
          value: 'fulfilled',
          label: 'Fulfilled',
        },
        {
          value: 'rejected',
          label: 'Rejected',
        },
  
      ];

      const CurrentCollegeOption = [
        {
          value: 'College of Architecture and Urban Planning',
          label: 'College of Architecture and Urban Planning',
        },
        {
          value: 'College of Education',
          label: 'College of Education',
        },
        {
          value: 'College of Engineering and Technology',
          label: 'College of Engineering and Technology',
        },
        {
          value: 'College of Humanities, Arts, and Social Sciences',
          label: 'College of Humanities, Arts, and Social Sciences',
        },
        {
          value: 'College of Law',
          label: 'College of Law',
        },
        {
          value: 'College of Nursing',
          label: 'College of Nursing',
        },
        {
          value: 'College of College of Physical Therapy',
          label: 'College of College of Physical Therapy',
        },
        {
          value: 'College of Science',
          label: 'College of Science',
        },
        {
          value: 'PLM Business School',
          label: 'PLM Business School',
        },
        {
          value: 'PLM School of Government',
          label: 'PLM School of Government',
        },
    
  
      ];

      const CurrentYearOption = [
        {
          value: '1st Year',
          label: '1st Year',
        },
        {
          value: '2nd Year',
          label: '2nd Year',
        },
        {
          value: '3rd Year',
          label: '3rd Year',
        },
        {
          value: '4th Year',
          label: '4th Year',
        },
        {
          value: '5th Year',
          label: '5th Year',
        },
        {
          value: '6th Year',
          label: '6th Year',
        },
        {
          value: '7th Year',
          label: '7th Year',
        },

      ];

      const ClassificationConcernOption = [
        {
          value: 'Grievances',
          label: 'Grievances',
        },
        {
          value: 'Queries',
          label: 'Queries',
        },
        {
          value: 'Suggestions',
          label: 'Suggestions',
        },
  
      ];


  return (
    <>
        <Box sx ={{ m :2}}/>
        <Typography variant="h5" align="center">
            Edit Grievance Form
        </Typography>
        <IconButton
            style = {{ position: "absolute", top: "0", right: "0"}}
            onClick = {closeEvent}
        >
            <CloseIcon/>
        </IconButton>
        <Box height={20}/>
        <Grid container spacing = {2}>
            <Grid item xs={6}>
                <TextField 
                id ="outlined-basic" 
                label="Status"
                select 
                variant="outlined" 
                size ="small" 
                sx = {{ minWidth: "100%"}}
                onChange={handleStatusChange}
                value={status}
                >
                {StatusOption.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Student Number" 
                    variant="outlined" 
                    size ="small" 
                    type="number"
                    onChange={handleStudentNumberChange}
                    value={studentNumber}
                    sx = {{ minWidth: "100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Last Name" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handlelastNameChange}
                    value={lastName}
                    sx = {{ minWidth: "100%"}}
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handlefirstNameChange}
                    value={firstName}
                    sx = {{ minWidth: "100%"}}
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Middle Name" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handlemiddleNameChange}
                    value={middleName}
                    sx = {{ minWidth: "100%"}}
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleEmailChange}
                    value={email}
                    sx = {{ minWidth: "100%"}}
                    inputProps={{
                        type: "text",
                        pattern: ".*@plm.edu.ph$",
                      }}
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Contact Number" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleContactNumberChange}
                    value={contactNumber}
                    sx = {{ minWidth: "100%"}}
                    type="number"
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Current College" 
                    variant="outlined" 
                    size ="small" 
                    select
                    onChange={handleCurrentCollegeChange}
                    value={currentCollege}
                    sx = {{ minWidth: "100%"}}
                    >
                        {CurrentCollegeOption.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Current Year" 
                    variant="outlined" 
                    select
                    size ="small" 
                    onChange={handleCurrentYearChange}
                    value={currentYear}
                    sx = {{ minWidth: "100%"}}
                    
                    >
                        {CurrentYearOption.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Classification Concern" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleClassificationConcernChange}
                    value={classConcern}
                    sx = {{ minWidth: "100%"}}
                    >
                         {ClassificationConcernOption.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Nature Concern" 
                    variant="outlined" 
                    size ="small" 
                    onChange={handleNatureConcernChange}
                    value={natureConcern}
                    sx = {{ minWidth: "100%"}}
                    type="number"
                    />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Concern" 
                    multiline
                    variant="outlined" 
                    size ="small" 
                    onChange={handleConcernChange}
                    value={concern}
                    sx = {{ minWidth: "100%"}}
                    type="number"
                    />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    <Button variant ="contained" onClick={createUser}>
                        Submit
                    </Button>
                </Typography>
            </Grid>
        </Grid>
        <Box sx ={{ m: 4}}/>
    </>
  )
};
