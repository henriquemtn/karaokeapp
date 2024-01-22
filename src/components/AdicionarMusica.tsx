import React, { useState } from 'react';
import { firestore } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdicionarMusica: React.FC = () => {
  const [novaMusica, setNovaMusica] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    link: ''
  });

  const adicionarMusica = async () => {
    try {
      // Referência para a coleção "musics"
      const musicCollection = collection(firestore, 'musics');

      // Adiciona um novo documento à coleção
      const docRef = await addDoc(musicCollection, novaMusica);

      console.log('Musica adicionada com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar música:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovaMusica((prevMusica) => ({ ...prevMusica, [name]: value }));
  };

  return (
    <div className='bg-slate-400 p-4 flex flex-col gap-2'>
      <h2>Adicionar Nova Música</h2>
      <label>
        Título:
        <input className='p-2' type="text" name="title" value={novaMusica.title} onChange={handleChange} />
      </label>
      <br />
      <label>
        Artista:
        <input type="text" name="artist" value={novaMusica.artist} onChange={handleChange} />
      </label>
      <br />
      <label>
        Álbum:
        <input type="text" name="album" value={novaMusica.album} onChange={handleChange} />
      </label>
      <br />
      <label>
        Gênero:
        <input type="text" name="genre" value={novaMusica.genre} onChange={handleChange} />
      </label>
      <br />
      <label>
        Link:
        <input type="text" name="link" value={novaMusica.link} onChange={handleChange} />
      </label>
      <br />
      <button onClick={adicionarMusica}>Adicionar Música</button>
    </div>
  );
};

export default AdicionarMusica;
