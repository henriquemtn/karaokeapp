// MusicList.tsx
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const MusicList: React.FC = () => {
  const [musics, setMusics] = useState<any[]>([]);

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        // Referência para a coleção "musics"
        const musicCollection = collection(firestore, 'musics');
        const snapshot = await getDocs(musicCollection);

        // Mapeando os documentos e adicionando ao estado
        const musicData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMusics(musicData);
      } catch (error) {
        console.error('Erro ao buscar músicas:', error);
      }
    };

    fetchMusics();
  }, []);

  return (
    <div>
      <h1>Músicas Disponíveis:</h1>
      <ul>
        {musics.map((music) => (
          <li key={music.id}>
            <strong>Título:</strong> {music.title}, <strong>Artista:</strong> {music.artist}, <strong>Link:</strong> {music.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicList;
