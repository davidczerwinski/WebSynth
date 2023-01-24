import React, {useState} from 'react'
import { Grid, Typography, Button} from '@mui/material'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function Effect({effect, placement, synth, deleteEffect}) {
  const [effectObj, setEffectObj] = useState({...effect});
  const props = effect.get()
  const [bypass,setBypass]=useState(true)
    //effect node bypass
  // const togglePower=(e)=>{
  //   let effectCopy = {...effectObj}
  //   e.preventDefault()
  //   if(!effect.power){
  //     effect.power = true
  //     effectObj.power=true
  //     setEffectObj(effectCopy)
  //   }else{
  //     effect.power = false
  //     effectObj.power=false
  //     effect.wet.value=0
  //     effectObj.wet.value=0
  //     setEffectObj(effectCopy)
  //   }
  // }

  const bypassEffect = ()=>{
    const effectCopy = {...effectObj}
    if(!bypass){
      effectCopy.bypass=true
      setBypass(true)
    }else{
    effectCopy.bypass=false
    setBypass(false)
    }
    setEffectObj(effectCopy)
  }

  const editEffectSetting = (e)=>{
    const effectCopy= {...effectObj}
    const setting= e.target.id
    const {value} = e.target
    if (effect[setting].value!== undefined ) {
      effect[setting].value=value
      effectCopy[setting].value=value
    } else {
      effectCopy[setting]=value
      effect[setting]=value
      
    }
      setEffectObj(effectCopy)
    }
    const displayEffect = ()=>{ 
      let effectSettings = Object.entries(props).map(item=> {
        return item})
      return (

        <Grid item container sx={[styles[effect.name],{padding: '10px 5px', borderRadius:'5px', height:'max-content'}]} textAlign='center' direction='column' justifyContent='space-around' xs={10}>
          <Grid item> 
          <Typography>{effect.name}</Typography>
          </Grid>
          <Grid item>
            <PowerSettingsNewIcon  fontSize='large' onClick={bypassEffect} className='pwr-btn' color={(!bypass?'success':'default')}/>
          </Grid>
          <Grid item direction='column' container>

          {effectSettings.map(( setting, i)=>{

            if (setting[0] === 'maxDelay') {return null} 
            if (setting[0] === 'wet' || setting[0] === 'feedback' || setting[0] === 'delayTime' || setting[0] === 'roomSize'  ) {
              return( 
                <Grid item key={setting[0]}> 
                  <p>{setting[0]}: {effect[setting[0]].value} </p>
                  <input id={setting[0]} onChange={e=>editEffectSetting(e)} max={1} step={.01} value={effect[setting[0]].value} type='range' />
                </Grid>
              )
            }
            if (setting[0] === 'bits') {
              return( 
                <Grid item key={setting[0]}> 
                  <p>{setting[0]}: {effect[setting[0]].value} </p>
                  <input id={setting[0]} onChange={e=>editEffectSetting(e)} max={16} min={1} step={1} value={effect[setting[0]].value} type='range' />
                </Grid>
              )
            }
            if(setting[0]==='oversample'){
              return(
              <Grid item key={setting[0]}> 
                  {setting[0]}: 
              <select  className='effect_selection' id={setting[0]} value={effect[setting[0]]} onChange={e=>editEffectSetting(e)}>
                      <option value='none'>None</option>
                      <option value='2x'>2x</option>
                      <option value='4x'>4x</option>
                    </select>
              </Grid>)
              
            } 
            
              return(
              <Grid item key={setting[0]}> 
              <p>{setting[0]}: {effect[setting[0]]?.value ?? effect[setting[0]]} </p>
              <input id={setting[0]} onChange={e=>editEffectSetting(e)} value={effect[setting[0]]?.value ?? effect[setting[0]]} type='range'/>
              </Grid>
              ) 
            })}
          </Grid>
        </Grid>
      )
    }

  return (
    <Grid className='effect' item container  direction='column' spacing='space-between' style={{width:'min-content', height:'inherit', padding:'10px'}} xs={12}>
{displayEffect()}
<Grid item xs={1}> 
<Button style={{width:'100%'}} variant='contained' size='small' name='delete'  color='error' onClick={e=>deleteEffect(e, synth.id, effect.id)} className='btn'>delete</Button>
</Grid>
    </Grid>
  )
}


let styles = {
  Reverb: {
    background:`linear-gradient(360deg, #203473 20% , #5A5F97)`,
  },
  Distortion: {
    background:`linear-gradient(to bottom, #F29840 , #F27329)`
  },
  BitCrusher: {
    backgroundRepeat: 'repeat',
    background:'linear-gradient(60deg, #F29840 50%, transparent 50%), linear-gradient(120deg, transparent 49%, #F29840 50%), #F27329',
    backgroundSize:'30px 30px',
    backgroundPosition:'0px 10px',
    border:`1px solid #27282F5e`,
    fontSize:'1.5rem'
  },
  FeedbackDelay: {
    backgroundSize:'',
    opacity: '0.8',
    background: 'conic-gradient( from 135deg, #020681 0,#020681 90deg, #000337 90deg, #000337 180deg, #0818ff 180deg, #0818ff 270deg, #0f9bfe 270deg, #0f9bfe 360deg)'
    // background:'#5A5F97'
  },
  Chebyshev:{
    backgroundColor:'blue'
  }
}