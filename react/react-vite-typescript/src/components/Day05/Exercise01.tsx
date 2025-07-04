import React from 'react'

type Props = {}

export default function Exercise01({}: Props) {
    const [count, setCount] = React.useState(0);

    const handleCount = () => {
        setCount(prevCount => prevCount + 1);
    }
  return (
    <div>
        <button onClick={handleCount}>Click me</button>
        <p>Click: {count} times</p>
    </div>
  )
}