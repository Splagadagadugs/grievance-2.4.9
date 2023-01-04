import React, {useEffect } from 'react'

import { Email, Group, MapsHomeWork, SafetyDivider } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LineCharts from './LineCharts';
// import LineCharts from './LineCharts';
import Completed from '../../Completed';
// import FlexBetween from '../../../../components/ComponentTools/FlexBetween';
// import Header from '../../../../components/ComponentTools/Header';
import GrievanceChart from './GrievanceChart';
import GrievanceBarGraph from './GrievanceBarGraph';

// import moment from 'moment';


const Main = ({setSelectedLink, link}) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)")

  useEffect(() => {
    setSelectedLink(link)
  }, []);
  
  return (
    <>
   <Box
    sx={{
      display: { xs: 'flex', md: 'grid' },
      gridTemplateColumns: 'repeat(12,1fr)',
      gridAutoRows: 'minmax(50px, auto)',
      // gridTemplateColumns: 'repeat(4,1fr)',
      // gridAutoRows: 'minmax(100px, auto)',
      gap: 3,
      textAlign: 'center',
      flexDirection: 'column',
    }}
  > 
     {/*PIE GRAPHS*/}

    <Paper elevation={3} sx={{p:3, gridColumn:'1/5', gridRow: '1'}}>
      <GrievanceChart/>
    </Paper>

    <Paper elevation={3} sx={{p:3, gridColumn:'5/9', gridRow: '1'}}>
      <GrievanceChart/>
    </Paper> 

    <Paper elevation={3} sx={{p:3, gridColumn:'9/13', gridRow: '1'}}>
      <GrievanceChart/>
    </Paper> 

    {/* TABLE AND STATSTICS BOX COUNT*/}
    <Paper elevation = {3} sx={{p:3, gridColumn: '1/10', gridRow: '2/ span 3'}}>
      <Completed/>
    </Paper> 

    <Paper elevation={3} sx={{ p: 3, gridColumn: '10/13', gridRow: '2/ span 1' }}>
      <Typography variant="h5">Total Grievances</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      > 
        <Divider/>
        <Group sx={{ height: 70, width: 70, opacity: 0.3, mr: 1 }} /> 
        <Typography variant="h3">24</Typography>
      </Box>
    </Paper>

    <Paper elevation={3} sx={{ p: 3, gridColumn: '10/13'}}>
      <Typography variant="h5">Total Queries</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      > 
        <Group sx={{ height: 70, width: 70, opacity: 0.3, mr: 1 }} /> 
        <Typography variant="h3">24</Typography>
      </Box>
    </Paper>

    <Paper elevation={3} sx={{ p: 3, gridColumn: '10/13'}}>
      <Typography variant="h5">Total Suggestions</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      > 
        <Divider/>
        <Group sx={{ height: 70, width: 70, opacity: 0.3, mr: 1 }} /> 
        <Typography variant="h3">24</Typography>
      </Box>
    </Paper>



  </Box> 

  </>


  )
}

export default Main;