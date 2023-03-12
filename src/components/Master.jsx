import { Grid, Select,MenuItem, FormControl, InputLabel,Zoom, Grow } from '@mui/material'
import React ,{useState} from 'react'
export default function Master({gain, newInstrument}) {
  const [gainLevel, setGainLevel]= useState(gain?.gain?.value??0)
  const [instrumentSelect, setInstrumentSelect]= useState(false)


  function formatVolume(volume) {
    if (volume <= 0) {
      return -Infinity;
    }
    const decibelLevel = 20 * Math.log10(volume);
    const formattedLevel = (Math.pow(10, decibelLevel / 20));
    return formattedLevel;
  }


  const handleChange = (e) => {
    document.getElementById(e.target.id).style.cursor='none'
    let gainVal= e.target.value
    gainVal = formatVolume(gainVal)
    gain.gain.value = gainVal
    setGainLevel(gainVal)
    document.getElementById(e.target.id).style.cursor='auto'

  }


  
  return (
    <div className='masterVolume'>
      <Grid item mt={1}>
        <label>Master Volume</label>
        <input onChange={e=>handleChange(e)} step={.001} min ={0} max={1} value={ gainLevel } type="range" id='master' />
      </Grid>
      <Grid item my={1} >
        {instrumentSelect?
        (
          <Zoom in={instrumentSelect}> 
          <FormControl sx={{width:200, color:'white' }}>
            <InputLabel style={{color:'white'}} id ='addInstrumentLabel'>Add Track</InputLabel>
            <Select
            defaultOpen={true}
              variant='standard'
              labelId='addInstrumentLabel'
              label='Add Instrument'
              value=''
              onChange={(e)=>{
                setInstrumentSelect(false)
                newInstrument(e.target.value)
              }}
            >
            <MenuItem value='newSynth' >Synth</MenuItem>
            <MenuItem disabled >More coming soon!</MenuItem>
          </Select>
          </FormControl>
          </Zoom>
        ):(
        <Grow in={!instrumentSelect}> 
        <button id='newSynthButton' onClick={(e)=>{
          setInstrumentSelect(true)
          newInstrument(e.target.value)
        }}>
          New Track
        </button>
        </Grow>
        )}
        
      </Grid>
    </div>
  )
}
