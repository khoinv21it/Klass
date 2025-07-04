import React from 'react'

type Props = {}

export default function Exercise07({}: Props) {

    const [showMessage, setShowMessage] = React.useState(false);
    const handleDoubleClick = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    }
  return (
    <div>
        <button onDoubleClick={handleDoubleClick} >
            Double Click Me!
        </button>
        {showMessage && <p>Double-clicked!</p>}
    </div>
  )
}
