import AuthScreen from './pages/AuthTest'
import Sidebar from './layouts/sidebar'
import { Toaster } from 'react-hot-toast'
import AllMusicsModal from './components/modals/AllMusicsModal'
import Shortcut from './layouts/shortcut'
import MusicModal from './components/modals/MusicModal'

export default function App() {
  return (
    <>
      <Toaster />
      <AllMusicsModal />
      <MusicModal />
      <div className='flex justify-between'>
        <div className='w-1/3'>
          <Sidebar />
        </div>
        <Shortcut />
        <AuthScreen />
      </div>
    </>

  )
}
