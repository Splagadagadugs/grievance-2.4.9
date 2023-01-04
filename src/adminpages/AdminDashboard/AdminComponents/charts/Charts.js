import React, {useEffect} from 'react'

const Charts = ({setSelectedLink, link}) => {
  useEffect(() => {
    setSelectedLink(link)
  }, []);
  
  return (
    <div>Charts</div>
  )
}

export default Charts;