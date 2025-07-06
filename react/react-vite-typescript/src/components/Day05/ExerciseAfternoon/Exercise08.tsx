import React from 'react'

type Props = {}

export default function Exercise08({}: Props) {
    const [selectedFruit, setSelectedFruit] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFruit(event.target.value);
    }

  return (
    <>
    <select value={selectedFruit} onChange={handleChange}>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
    </select>
    {selectedFruit && <p>You selected: {selectedFruit}</p>}
    </>
    
  )
}