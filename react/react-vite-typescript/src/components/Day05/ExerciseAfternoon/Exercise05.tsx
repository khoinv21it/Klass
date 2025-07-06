import React, { useState } from 'react';

type Props = {};

export default function Exercise05({}: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    alert(`You submitted: ${inputValue}`);
    setInputValue(""); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type something..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}