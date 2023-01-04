import { Box, Button, IconButton, Select, TextField, Typography } from '@mui/material';
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
import { Email } from '@mui/icons-material';


function AddForm({closeEvent}) {
    const [Name, setName] = useState("");
    const [Price, setPrice] = useState(0);
    const [Category, setCategory] = useState("");
 
    const [rows, setRows] = useState([]);
    const empCollectionRef = collection(db, "Testing");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };


    const createUser = async () => {
        await addDoc(empCollectionRef, {
            Name: Name,
            Price: Price,
            Category: Category,
            
        });
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your File has been Submitted.","success")

    };

    useEffect(() => {
        getUsers();
      }, []);
    
    const getUsers = async () => {
        const data = await getDocs(empCollectionRef);
        setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
    

    const currencies = [
        {
          value: 'pending',
          label: 'Pending',
        },
        {
          value: 'completed',
          label: 'Completed',
        },
  
      ];


  return (
    <>
        <Box sx ={{ m :2}}/>
        <Typography variant="h5" align="center">
            Add Entry
        </Typography>
        <IconButton
            style = {{ position: "absolute", top: "0", right: "0"}}
            onClick = {closeEvent}
        >
            <CloseIcon/>
        </IconButton>
        <Box height={20}/>
        <Grid container spacing = {2}>
            <Grid item xs={12}>
                <TextField 
                id ="outlined-basic" 
                label="Name" 
                variant="outlined" 
                size ="small" 
                sx = {{ minWidth: "100%"}}
                onChange={handleNameChange}
                value={Name}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Price" 
                    variant="outlined" 
                    size ="small" 
                    type="number"
                    onChange={handlePriceChange}
                    value={Price}
                    sx = {{ minWidth: "100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    id ="outlined-basic" 
                    label="Category" 
                    variant="outlined" 
                    select
                    size ="small" 
                    onChange={handleCategoryChange}
                    value={Category}
                    sx = {{ minWidth: "100%"}}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}

                    </TextField>
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
}

export default AddForm;