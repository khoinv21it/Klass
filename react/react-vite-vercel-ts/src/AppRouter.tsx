
import { Route, Routes } from 'react-router'
import Lesson09 from './Week02/Lesson09'
import Form01 from './Week02/Lesson09/components/Form01'
import Form02 from './Week02/Lesson09/components/Form02'
import Form03 from './Week02/Lesson09/components/Form03'
import Homework from './Week02/Lesson09/components/Homework'

type Props = {}

export default function AppRouter({}: Props) {
  return (
    <Routes>
      <Route path="/lesson09" element={<Lesson09 />}>
        <Route index element={<div>Direct page here</div>} />
        <Route path='afternoon/form01' element={<Form01/>}/>
        <Route path='afternoon/form02' element={<Form02/>} />
        <Route path='afternoon/form03' element={<Form03/>} />
        <Route path='afternoon/homework' element={<Homework/>} />
      </Route>

      <Route path="/about" element={<div>About</div>} />
    </Routes>
  )
}