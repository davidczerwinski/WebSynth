import { Grid } from '@mui/material'
import React ,{useState} from 'react'
export default function Master({gain, newSynth}) {
  let [gainLevel, setGainLevel]= useState(gain?.gain?.value??0)


  function formatVolume(volume) {

    if (volume < 0) {
      return -Infinity;
    }
    // Convert the volume value to a decibel level using the formula:
    // decibelLevel = 20 * log10(volume)
    const decibelLevel = 20 * Math.log10(volume);
    // Non-linearly format the decibel level for human hearing using the formula:
    // formattedLevel = (10 ** (decibelLevel / 10)) / 10
    const formattedLevel = (Math.pow(10, decibelLevel / 10)) / 10;
  
    // Return the formatted volume level
    return formattedLevel;
  }


  const handleChange = (e) => {
    let gainVal= e.target.value
    gain.gain.value = formatVolume(gainVal)
    setGainLevel(gainVal)
  }

  return (
    <div className='masterVolume'>
      <Grid item>
        <label>Master Volume</label>
        <input onChange={e=>handleChange(e)} step={.01} min ={0} max={5} value={ gainLevel } type="range" />
      </Grid>
      <Grid item> 
      <button id='newSynthButton' onClick={newSynth}>New Synth</button>
      </Grid>
    </div>
  )
}
