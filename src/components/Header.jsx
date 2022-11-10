import React from 'react'
export default function Header({newSynth}) {
  return (
    <div style={{backgroundColor: '#242424',position: 'fixed',}}><button onClick={newSynth} style={{backgroundColor:'white', color:'black'}}>New Synth</button></div>
  )
}
