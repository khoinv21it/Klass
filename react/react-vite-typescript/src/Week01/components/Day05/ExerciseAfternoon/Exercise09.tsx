import React from 'react'

type Props = {}

export default function Exercise09({}: Props) {
    const [isChecked, setIsChecked] = React.useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }
  return (
    <div>
        <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
            Toggle me
        </label>
        <p>Checkbox is: {isChecked ? 'checked' : 'unchecked'}</p>
    </div>
  )
}