import React, {useState} from 'react'
import { Grid,Button } from '@mui/material'
import Synth from './Synth'
import Effect from './Effect'
import Visualizer from './Visualizer'
export default function SynthRack({synth, trackVolume,i}) {
    const [isMounted, setIsMounted]= useState(true)

    const displayInstrument=(synth)=>{
        if(synth.name==='Synth'){
          return <Synth id={synth.id} synth={synth}/>
        }
    }


  return (
    <Grid key={`synth_${i}`} alignItems='center' container gap={2} item xs={12} className='synthRack'>
                  <Grid container gap={1} direction='column' xs={1} item className='synthBlock' key={synth.id} >
                    {displayInstrument(synth)}
                    <select  id='effect_selection' value='' onChange={e=>addEffect(e,synth.id)}>
                      <option value='' disabled hidden>Effects</option>
                      <option value='reverb'>Reverb</option>
                      <option value='distortion'>Distortion</option>
                      <option value='bitCrusher'>BitCrusher</option>
                      <option value='delay'>Delay</option>
                      <option value='chebyshev'>Chebyshev</option>
                    </select>
                    <Button variant='contained' color='error' onClick={e=>deleteSynth(e)} id={i} className='btn'>delete</Button>
                  </Grid>
                  <Grid item xs={1}> 
                  <input type='range' id={trackVolume.id} step={.01} min={0} max={10}className='slider' style={{rotate:'270deg'}} value = {trackVolume.gain.value} onChange={e=>handleTrackVolumeChange(e)}/>
                  </Grid>
                  <Grid item xs={2} className='visualizer' id='canvasContainer'>
                    <Visualizer synth={synth} isMounted={isMounted}/>
                    </Grid>
                  <Grid item xs={7} container>
                    {synth.effectsRack.length>0?(
                    <Grid item container gap={1} className='effectsRack' style={{ width:'inherit', overflowX:'auto', flexWrap:'nowrap'}}>
                      {
                      synth.effectsRack.map((effect,i)=>{
                      return (
                          <Effect id={effect.id} effect={effect} synth={synth} deleteEffect={deleteEffect} placement={i} key={`effect_${i}`}/>
                      )  
                    })
                    }
                    </Grid>
                  ):(null)
                }
                  </Grid>
                </Grid>   
  )
}
