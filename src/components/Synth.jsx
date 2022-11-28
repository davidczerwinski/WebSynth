import React from 'react'
import { useState } from 'react';
import { Grid } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function Synth({synth}) {
  const [power, setPower]=useState(synth.power)
  const [oscType, setOscType]= useState(synth.oscillator.type)
  const [volLevel, setVolLevel]= useState(synth.volume.value)
  const [freqLevel, setFreqLevel]= useState(synth.frequency.value)
  const [detune, setDetune]= useState(synth.detune.value)
  const [phase, setPhase]= useState(synth.oscillator.phase)

  const updateSynth=(e)=>{
    const {value}=e.target
    let prop = e.target.id
    if ( prop==='oscillator') {
      synth[prop].type=value
        setOscType(value)
    } else if (prop==='phase') {
      synth.oscillator.phase=value
      console.log(synth.oscillator.phase)
      setPhase(value)
    } else if (prop==='volume') {
      synth.volume.value=value
        setVolLevel(value)
    } else if(prop === 'frequency'){
      synth[prop].value=value
      setFreqLevel(value)
    } else {
      synth[prop].value=value
    }

    switch (prop) {
      case 'detune':
        setDetune(value)
        break;
      default:
        break;
    }
  }

  const togglePower=async (e)=>{
    e.preventDefault()
    if(!power){
      await synth.triggerAttack(freqLevel)
      synth.power=true
      setPower(true)
    }else{
      await synth.triggerRelease()
      synth.power=false
      setPower(false)
    }
  }
console.log(synth)
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item>
      <PowerSettingsNewIcon  fontSize='large' className='pwr-btn' onClick={(e)=>togglePower(e)} color={(power?'success':'default')}/>
      </Grid>
      <Grid item>
        <select id='oscillator' value={oscType} onChange={(e)=>updateSynth(e)}>
        <option value='sine'> Sine</option>
        <option value='triangle'> Triangle</option>
        <option value='square'> Square</option>
        <option value='sawtooth'> Sawtooth</option>
      </select>
      </Grid>
      
      <Grid item container>
        <Grid item>
          <h6>Volume</h6>
          <input value={volLevel} step={1} min={'-60'} max={60}onChange={(e)=> updateSynth(e)} id='volume' type='range'/>
        </Grid>
        <Grid item>
          <h6>Frequency</h6>
          <input value={freqLevel} step={.001} max={880} onChange={(e)=> updateSynth(e)} id='frequency' type='range'/>
        </Grid>
        <Grid item>
          <h6>Detune</h6>
          <input value={detune} step={.1} min={'-100'} onChange={(e)=> updateSynth(e)} id='detune' type='range'/>
        </Grid>
        <Grid item>
          <h6>Phase</h6>
          <input value={phase} max={360} onChange={(e)=> updateSynth(e)} id='phase' type='range'/>
        </Grid>
      </Grid>
      
    </Grid>
  )
}
