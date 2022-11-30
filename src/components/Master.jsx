import { Grid } from '@mui/material'
import React ,{useState} from 'react'
export default function Master({gain, setGain, newSynth}) {
  let [gainLevel, setGainLevel]= useState(gain?.gain?.value??0)

  const handleChange = (e) => {
    gain.gain.value= e.target.value
    setGainLevel(e.target.value)
  }

  return (
    <div className='float-btn'>
      <Grid item>
        <label>Master Volume</label>
        <input onChange={e=>handleChange(e)} step={.1} max={10} value={ gainLevel } type="range" />
      </Grid>
      <Grid item> 
      <button  onClick={newSynth}>New Synth</button>
      </Grid>
    </div>
  )
}
