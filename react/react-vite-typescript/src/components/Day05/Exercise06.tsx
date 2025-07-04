import React from 'react'

type Props = {}

export default function Exercise06({}: Props) {
  const [lastKey, setLastKey] = React.useState<string | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  }
  return (
    <div>
      <input type="text"  onKeyDown={handleKeyDown}/>
      <p>Last key: {`${lastKey  ? [`${lastKey}`] : ''}`}</p>
    </div>
  )
}