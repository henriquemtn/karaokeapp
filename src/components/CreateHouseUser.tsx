import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

const CreateHouseUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [houseName, setHouseName] = useState('');
  const [houseTel, setHouseTel] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [housePic, setHousePic] = useState('');

  const handleCreateHouseUser = async () => {
    try {
      console.log('Iniciando criação do usuário...');
  
      // Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      console.log('Usuário criado com sucesso:', userCredential.user);
  
      // Obter o UID do usuário recém-criado
      const uid = userCredential.user.uid;
  
      // Adicionar informações da casa ao Firestore
      const docRef = await addDoc(collection(firestore, 'houses'), {
        uid,
        houseName,
        houseTel,
        houseAddress,
        housePic,
      });
  
      console.log('Informações da casa adicionadas ao Firestore:', docRef);
  
      console.log('Usuário "house" registrado com sucesso:', userCredential.user);
    } catch (error: any) {
      console.error('Erro ao criar usuário "house":', error.code, error.message);
    }
  };

  return (
    <div className='flex flex-col bg-slate-500 p-4  font-medium text-2xl'>
      <h2>Criar Usuário "House"</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Senha:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Nome da Casa:</label>
      <input type="text" value={houseName} onChange={(e) => setHouseName(e.target.value)} />
      <label>Telefone da Casa:</label>
      <input type="tel" value={houseTel} onChange={(e) => setHouseTel(e.target.value)} />
      <label>Endereço da Casa:</label>
      <input type="text" value={houseAddress} onChange={(e) => setHouseAddress(e.target.value)} />
      <label>URL da Imagem da Casa:</label>
      <input type="text" value={housePic} onChange={(e) => setHousePic(e.target.value)} />
      <button onClick={handleCreateHouseUser}>Criar Usuário "House"</button>
    </div>
  );
};

export default CreateHouseUser;
