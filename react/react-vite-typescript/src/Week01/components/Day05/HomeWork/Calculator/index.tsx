import React, { useState } from 'react'
import styles from './Calculator.module.css'
import Button from './Button'

type Props = {}

export default function Calculator({}: Props) {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState<string | number>('')

  const operators = ['+', '-', '×', '÷']

  const handleClick = (value: string) => {
    if (value === 'C') {
      setExpression('')
      setResult('')
      return
    }

    if (value === '=') {
      try {
        const safeExpression = expression.replace(/×/g, '*').replace(/÷/g, '/')

        if (/\/0(?![\d.])/.test(safeExpression)) {
          setResult('Error')
          return
        }

        const evalResult = Function(`return ${safeExpression}`)()
        setResult(evalResult)
      } catch {
        setResult('Error')
      }
      return
    }

    if (value === '.') {
      const parts = expression.split(/[\+\-\×\÷]/)
      const last = parts[parts.length - 1]
      if (last.includes('.')) return
    }

    const lastChar = expression.slice(-1)
    if (operators.includes(value) && operators.includes(lastChar)) return

    setExpression((prev) => prev + value)
    setResult('')
  }

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ]

  const getBackground = (btn: string) => {
    if (btn === '=') return '#90be6d'
    if (btn === 'C') return '#f94144'
    if (operators.includes(btn)) return '#f9c74f'
    return '#fff'
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div>{expression || '0'}</div>
        <div className={styles.result}>{result !== '' ? result : ''}</div>
      </div>
      <div className={styles.buttons}>
        {buttons.map((btn) => (
          <div key={btn} style={btn === '=' ? { gridColumn: 'span 4' } : {}}>
            <Button
              text={btn}
              background={getBackground(btn)}
              onClick={() => handleClick(btn)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
