import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import React, {useEffect} from 'react'
import Completed from '../../Completed';
import Historylist from './Historylist';
import Gtable from './Gtable';
import Historylist2 from './HistoryList2';


const History = ({setSelectedLink, link}) => {

  useEffect(() => {
    setSelectedLink(link)
  }, []);
  
  return (
    <>
      <div classname="bgcolor">
        <Box sx={{flexGrow: 1, p: 3}}>
          <Historylist/>
        </Box>
        <Box sx={{flexGrow: 1, p: 3}}>
          <Completed/>
        </Box>
        <Box sx={{flexGrow: 1, p: 3}}>
          <Gtable/>
        </Box>
        <Box sx={{flexGrow: 1, p: 3}}>
          <Historylist2/>
        </Box>
      </div>
    </>
  )
}

export default History;

