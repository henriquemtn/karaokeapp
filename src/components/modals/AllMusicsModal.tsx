import { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import toast from "react-hot-toast";
import Input from "../Input";
import List from "../List";
import { useAllMusicsModal } from "../../hooks/useAllMusicsModal";
import { useMusicModal } from "../../hooks/useMusicModal";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import MusicEmbed from "../MusicEmbed";

interface CustomProps {
    id: string;
    title: string;
    artist: string;
    link: string;
}

const AllMusicsModal = () => {
    const allMusicsModal = useAllMusicsModal();
    const [isLoading, setIsLoading] = useState(false);
    const [musics, setMusics] = useState<CustomProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Novo estado para o termo de pesquisa
    const musicModal = useMusicModal();
    const [showMusicEmbed, setShowMusicEmbed] = useState(false);
    const [musicLink, setMusicLink] = useState('');

    const fetchMusics = async () => {
        try {
            setIsLoading(true);
            const musicsCollection = collection(firestore, "musics");

            // Construir a consulta para filtrar pelo título e artista
            const musicsSnapshot = await getDocs(musicsCollection);
            const musicsData = musicsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CustomProps));

            // Filtrar as músicas com base no termo de pesquisa
            const filteredMusics = musicsData.filter(
                (music) =>
                    music.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    music.artist.toLowerCase().includes(searchTerm.toLowerCase())
            );

            setMusics(filteredMusics);
        } catch (error) {
            console.error("Error fetching musics:", error);
            toast.error("Erro ao buscar músicas.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMusics();
    }, [searchTerm]); // Executa a função sempre que o termo de pesquisa muda

    const onToggle = useCallback(() => {
        allMusicsModal.onClose();
        musicModal.onOpen();
    }, [musicModal, allMusicsModal]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (index: number) => {
        try {
            if (index < 0 || index >= musics.length) {
                console.error('Índice de música inválido:', index);
                return;
            }

            const musicToDelete = musics[index];

            if (!musicToDelete || typeof musicToDelete !== 'object' || !('id' in musicToDelete)) {
                console.error('Música inválida na posição especificada:', musicToDelete);
                return;
            }

            console.log('Tentando excluir música:', musicToDelete);

            const musicDocRef = doc(firestore, 'musics', musicToDelete.id);

            // Obtenha o snapshot do documento para verificar se ele existe antes de excluir
            const musicDocSnapshot = await getDoc(musicDocRef);

            if (musicDocSnapshot.exists()) {
                await deleteDoc(musicDocRef);
                const updatedMusics = musics.filter((_, i) => i !== index);
                setMusics(updatedMusics);
                toast.success('Música excluída com sucesso');
            } else {
                console.error('O documento da música não existe no Firestore:', musicToDelete.id);
                toast.error('Erro ao excluir música: documento não encontrado');
            }
        } catch (error) {
            console.error('Erro ao excluir música:', error);
            toast.error('Erro ao excluir música.');
        }
    };

    const handleEdit = (index: number) => {
        try {
            const musicToEdit = musics[index];
    
            if (!musicToEdit || typeof musicToEdit !== 'object' || !('id' in musicToEdit)) {
                console.error('Música inválida na posição especificada:', musicToEdit);
                return;
            }
    
            console.log('Editando música:', musicToEdit);
    
            // Agora, você pode usar o link da música no componente MusicEmbed
            setMusicLink(musicToEdit.link);
    
            // Alternar entre verdadeiro e falso
            setShowMusicEmbed((prevShowMusicEmbed) => !prevShowMusicEmbed);
    
            // Aqui, você pode adicionar lógica adicional para outras coisas relacionadas à edição
        } catch (error) {
            console.error('Erro ao editar música:', error);
            toast.error('Erro ao editar música.');
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Pesquise por uma música"
                onChange={handleSearchChange}
                value={searchTerm}
            />
            {musics.length === 0 ? (
                <p className="text-neutral-400 text-center mt-4">
                    Nenhuma música encontrada com o termo de pesquisa.
                </p>
            ) : (
                <List musics={musics} onDelete={handleDelete} onEdit={handleEdit} />
                
            )}
            {showMusicEmbed && <MusicEmbed videoId={musicLink} />}  
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                Gostaria de adicionar uma nova música?
                <span
                    onClick={onToggle}
                    className="
            text-blue-600 
            cursor-pointer 
            hover:underline
            ml-1
          "
                >
                    {" "}
                    Clique aqui
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={allMusicsModal.isOpen}
            title="Gerenciar todas as Músicas"
            onClose={allMusicsModal.onClose}
            onSubmit={() => { }}
            body={bodyContent}
            footer={footerContent}
        />
        
    );
};

export default AllMusicsModal;