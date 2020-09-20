import React from 'react'

export default function PageLayout(props){
  return(
    <div style={{display:"flex", flexDirection:"column", padding:"1px"}}>
      {props.children}
    </div>
    )
  }