import   React,{useRef, useEffect, useState} from 'react'

export default function Visualizer({synth}) {
  const canvasRef=useRef(null)
  const scale =  (number, inMin, inMax, outMin, outMax)=> {
      return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    const draw= useRef(()=> {
        
      const canvas = canvasRef?.current;
      const canvasContext=canvas?.getContext('2d')   
      const data = synth?.analyser?.getValue();
if(canvasContext){
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.fillStyle = '#5A5F97';
  canvasContext.fillRect(0,0, canvas.width, canvas.height );
  canvasContext.strokeStyle = '#F29840';
  // canvasContext.fillStyle = '#F29840';
  canvasContext.lineWidth = 2;
}
      
      //look for change in polarity from - to +
      let start=0
      for (let i=1; i<data.length; i++){
        if( data.length[i-1]<0&&data.length[i]>=0){
          start=i
          break
        }
      }
      let end= start+data.length/2
      canvasContext.beginPath()
      for (let i = start; i < end; i++) {
        const pastValue =  (data[i-1]*canvas.height/1.25);
        const currentValue =  (data[i]*canvas.height/1.25);
        let x1=scale(i-1,0,end,0,canvas.width)
        let y1=scale(pastValue, 0, canvas.height, canvas.height, 0)/2
        let x2=scale(i,0,data.length,0,canvas.width*2)
        let y2=scale(currentValue, 0, canvas.height, canvas.height, 0)/2
        canvasContext.moveTo(x1,y1)
        canvasContext.lineTo(x2,y2)
        // canvasContext.toLine(scale(i-1,0,data.length,0,canvas.width*2),scale(pastValue, 0, canvas.height, canvas.height, 0)/2)
          canvasContext.fillRect(scale(i-1,0,data.length,0,canvas.width*2),scale(pastValue, 0, canvas.height, canvas.height, 0)/2,3,3)
        canvasContext.stroke()
      }
        // canvasContext.fill()
      requestAnimationFrame(draw.current);  
    })


    

    
    useEffect(()=>{
      requestAnimationFrame(draw.current);  
      

      return ()=>{
        cancelAnimationFrame(draw.current)
      }


}, [])


  return (
      <span> 
        <canvas ref={canvasRef}height={250} width={400} style={{border:'black 1px solid'}}/>
      </span>
  )
}
