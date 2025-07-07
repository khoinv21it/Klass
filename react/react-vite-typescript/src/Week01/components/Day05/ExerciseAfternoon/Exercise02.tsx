import React from 'react'

type Props = {}

export default function Exercise02({}: Props) {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  return (
    <div>
      <input type="text" value={inputValue} placeholder='Type something...' onChange={handleInputChange} />
      <p>You type: {`${inputValue ? `${inputValue}`:'nothing!'}`} </p>
    </div>
  )
}