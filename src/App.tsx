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
      <div className='flex'>
        <Sidebar />
        <div className='p-4'>
          <Shortcut />
        </div>
        <AuthScreen />
      </div>
    </>

  )
}
