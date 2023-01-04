import React, {useEffect} from 'react'

const Table = ({setSelectedLink, link}) => {
  useEffect(() => {
    setSelectedLink(link)
  }, []);
  
  return (
    <div>Table</div>
  )
}

export default Table;