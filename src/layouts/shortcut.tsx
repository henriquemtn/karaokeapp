import Widget from '../components/Widget'
import { useMusicModal } from '../hooks/useMusicModal';

export default function Shortcut() {

  const musicModal = useMusicModal();

  const handleMusicClick = () => {
      musicModal.onOpen();
  };

  return (
    <div className='flex gap-4 px-8'>
        <Widget
        title='Criar uma nova Casa'
        text='Crie um login para um novo estabelecimento'
        navigate='Criar uma nova Casa'
        onclick={() => {}}
        />
        <Widget
        title='Adicionar música'
        text='Adicione uma nova música ao banco de dados'
        navigate='Adicionar uma nova música'
        onclick={handleMusicClick}
        />
    </div>
  )
}
