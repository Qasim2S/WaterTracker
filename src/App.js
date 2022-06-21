import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, {useState, useRef, useEffect} from "react";
import './App.css'

const LOCAL_STORAGE_KEY = 'water.waters'

function App() {
  const [water, setWater] = useState(0)
  const [waterval, setWaterval] = useState(0)
  const [watertotal, setWatertotal] = useState(0)
  const valnameref = useRef()
  const glassvalref = useRef()

  useEffect(() => {
    const storedwaterval = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedwaterval) setWatertotal(storedwaterval)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watertotal))
  }, [watertotal])

  function glassAddval(e) {
    const num = glassvalref.current.value
    if (num === '') return
    setWater(water + Number(num))
    glassvalref.current.value = null

  }

  function handleAddval(e) {
    const num = valnameref.current.value
    if (num === '') return
    setWaterval(waterval + Number(num))
    valnameref.current.value = null

  }

  function totalwaterval(e) {
    setWatertotal((water*0.236) + watertotal+waterval)
  }

  function resetval(e) {
    setWatertotal(0)
  }
  return (

    <>
      <div className="App">
        <header className="App-header">
          <h2>Water Tracker</h2>
          <h4>Enter the number of glasses of water you have drank today</h4>
          <input ref={glassvalref} type ='text'/>
          <button onClick={glassAddval}>Enter</button>
          <div>Glasses of water drank today: {water}</div>
          <h3> </h3>
          <h4>Enter the amount of water drank today</h4>
          <input ref={valnameref} type='text'/>
          <button onClick={handleAddval}>Enter</button>
          <div>Amount of water drank today: {waterval+(water*0.236)} L</div>
          <div> Total water drank: {watertotal}</div>
          <button onClick={totalwaterval}>Add total</button>
          <button onClick={resetval}>Reset</button>
        </header>
      </div>

    </>
  )
}

export default App;