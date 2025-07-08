import FillerSideBar from '../components/FillerSideBar'
import NavigationHeader from '../components/NavigationHeader'
import { Outlet } from 'react-router'
import ProductContainer from '../components/ProductContainer'

type Props = {}

export default function DefautLayout({}: Props) {
  return (
    <div>
        <NavigationHeader />
        <main>
            <Outlet />
        </main>
        {/* <FillerSideBar />
        <ProductContainer /> */}
        {/* <div>
            <Outlet />
        </div> */}
    </div>
  )
}