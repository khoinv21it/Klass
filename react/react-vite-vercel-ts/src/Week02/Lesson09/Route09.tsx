import {  Route, Routes } from 'react-router'
import Form01 from './components/Form01'
import Form02 from './components/Form02'
import Lesson09 from '.'
import Form03 from './components/Form03'
import Homework from './components/Homework'

type Props = {}

export default function Route09({}: Props) {
  return (
    
    <Routes>
      <Route path="/" element={<Lesson09 />}>
        <Route index element={<div>Lesson09 main page</div>} />
        <Route path="afternoon/form01" element={<Form01 />} />
        <Route path="afternoon/form02" element={<Form02 />} />
        <Route path="afternoon/form03" element={<Form03 />} />
        <Route path="homework" element={<Homework />} />
      </Route>
    </Routes>
    
  )
}