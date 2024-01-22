import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import toast from "react-hot-toast";
import { useMusicModal } from "../../hooks/useMusicModal";
import { useAllMusicsModal } from "../../hooks/useAllMusicsModal";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const MusicModal = () => {
    const musicModal = useMusicModal();
    const [isLoading] = useState(false);

    const [novaMusica, setNovaMusica] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        link: ''
    });

    const adicionarMusica = async () => {
        try {
            // Verifica se todos os campos da música estão preenchidos
            if (Object.values(novaMusica).some(value => !value)) {
                toast.error('Por favor, preencha todos os campos da música.');
                return;
            }
    
            // Referência para a coleção "musics"
            const musicCollection = collection(firestore, 'musics');
    
            // Adiciona um novo documento à coleção
            const docRef = await addDoc(musicCollection, novaMusica);
            
            toast.success("Música adicionada com Sucesso!");
            console.log('Musica adicionada com ID:', docRef.id);
        } catch (error) {
            console.error('Erro ao adicionar música:', error);
            toast.error("Erro ao adicionar música!");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log('handleChange:', name, value); // Adicione este log para verificar

        setNovaMusica((prevMusica) => ({
            ...prevMusica,
            [name]: value,
        }));
    };

    const allMusicsModal = useAllMusicsModal();

    const onToggle = useCallback(() => {
        musicModal.onClose();
        allMusicsModal.onOpen();
    }, [musicModal, allMusicsModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <Input
                    name="title"
                    placeholder="Titulo"
                    value={novaMusica.title}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <Input
                    name="artist"
                    placeholder="Artista"
                    value={novaMusica.artist}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>
            <div className="flex gap-4">
                <Input
                    name="album"
                    placeholder="Álbum"
                    value={novaMusica.album}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <Input
                    name="genre"
                    placeholder="Gênero"
                    value={novaMusica.genre}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>
            <div className="flex gap-4">
                <Input
                    name="link"
                    placeholder="Link"
                    value={novaMusica.link}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Gostaria de gerenciar as músicas?
                <span
                    onClick={onToggle}
                    className="
            text-blue-600 
            cursor-pointer 
            hover:underline
            ml-1
          "
                > Clique aqui</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={musicModal.isOpen}
            title="Adicionar nova música"
            actionLabel="Adicionar"
            onClose={musicModal.onClose}
            onSubmit={adicionarMusica}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default MusicModal;