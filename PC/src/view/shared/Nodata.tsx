import React from 'react'

function Nodata() {
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center' ,padding:20 , fontSize:15, flexDirection:'column'}}>
      
      
      <img src='/icons/nofound.svg' />
      
      
    <span style={{color:'#8C8C8C', fontWeight:500}}> There's no transactions till now! </span> </div>
  ) 
}

export default Nodata