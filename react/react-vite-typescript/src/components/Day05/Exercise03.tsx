import React from 'react'

export const Exercise03 = () => {
    const [isOn, setIsOn] = React.useState(false);
    const toggleState = () => {
        setIsOn(prev => !prev);
    }
  return (
    <div>
        <button onClick={toggleState}>{isOn? "Turn Off" : "Turn On"}</button>
        <p>State: {isOn ? "ON" : "OFF"}</p>
    </div>
  )
}
