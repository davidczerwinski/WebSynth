import { Grid } from '@mui/material'
import React ,{useState} from 'react'
export default function Master({gain, setGain, newSynth}) {
  gain?.gain&&console.log('gain', gain)
  let [gainLevel, setGainLevel]= useState(gain?.gain?.value??0)

console.log(gainLevel)
  const handleChange = (e) => {
    console.log(e.target.value)
    gain.gain.value= e.target.value
    setGainLevel(e.target.value)
  }

  return (
    <div className='float-btn'>
      <Grid item>
        <label>mastah volume</label>
        <input onChange={e=>handleChange(e)} step={.1} max={10} value={ gainLevel } type="range" />
      </Grid>
      <Grid item> 
      <button  onClick={newSynth}>New Synth</button>
      </Grid>
    </div>
  )
}
