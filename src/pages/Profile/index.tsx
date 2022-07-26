import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from '../../hooks/useAuth';
import { storage, db } from '../../firebase';
import { updateProfile, User } from 'firebase/auth';
import './Profile.scss'
import { addDoc, collection, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';

interface UserProfileValues {
  nome: string,
  telefone: string,
  cidade: string,
  sobre: string
}

const profileSchemaValidation = Yup.object().shape({
  nome: Yup.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .required('O Nome é obrigatório'),
  telefone: Yup.string()
    .matches(/^[0-9- ()]+$/g, 'Número inválido'),
  cidade: Yup.string()
    .min(3, 'Cidade deve ter no mínimo 3 caracteres')
    .required('A Cidade deve ser informada'),
  sobre: Yup.string()
    .min(3, "Sobre deve ter no mínimo 3 caracteres")
    .required('Sobre é obrigatório')
})

const DEFAULT_PROFILE_PIC = "https://blog.criteria.com.br/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"

function Profile() {
  const { user } = useAuth()
  const [avatar, setAvatar] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string>(DEFAULT_PROFILE_PIC)
  const [userData, setUserData] = useState<UserProfileValues | null>(null);
  const [docId, setDocId] = useState<string | null>(null);
  const usersInfoCollectionRef = collection(db, "usersInfo")

  const uploadPhoto = async (file: File, user: User) => {
    const fileRef = ref(storage, user.uid + '.png')

    const newAvatar = await uploadBytes(fileRef, file)
      .then(async () => {
        return await getDownloadURL(fileRef)
      })
      .catch(err => {
        console.log(err)
        return null
      })

    return newAvatar
  }

  // função que lida com a seleção da foto de perfil
  const handleAvatarChange = (e: any) => {
    let reader = new FileReader();

    if(e.target.files[0]) {
      setAvatar(e.target.files[0])

      reader.onload = () => {
        setPhotoURL(reader.result as string)
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleProfileSubmit = async (values: UserProfileValues) => {
    let newUserAvatar = null;
    if(avatar){
      newUserAvatar = await uploadPhoto(avatar, user as User)
      setPhotoURL(newUserAvatar as string)
    }

    updateProfile(user as User, {displayName: values.nome, photoURL: newUserAvatar})
    
    // caso seja a primeira vez preenchendo o perfil
    if(!docId) {
      await addDoc(usersInfoCollectionRef, {
        userId: user?.uid, 
        nome: values.nome,
        telefone: values.telefone || '',
        cidade: values.cidade,
        sobre: values.sobre
      })
      console.log("Usuário criado com sucesso!")
      return; // pra sair da função
    }

    //se estiver alterando o perfil, chama a função para atualizar no db
    const userDoc = doc(db, "usersInfo", docId)

    await updateDoc(userDoc, {...values})

    console.log("Informações do usuário atualizadas com sucesso!")
  }

  useEffect(() => {
    if(user?.photoURL) setPhotoURL(user.photoURL)

    // função que busca os dados do usuário no firebase
    const getUserDataFromFirebase = async () => {
      const q = query(usersInfoCollectionRef, where("userId", "==", user?.uid))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        let obj: UserProfileValues = JSON.parse(JSON.stringify(doc.data()))
        setDocId(doc.id)
        setUserData({
          nome: obj.nome,
          telefone: obj.telefone,
          cidade: obj.cidade,
          sobre: obj.sobre
        })
      })
    }

    getUserDataFromFirebase()
  }, []);

  return (
    <div className="profile-container">

      <p className='text'>
        Esse é o perfil que aparece para responsáveis ou ONGs que recebem sua mensagem.
      </p>
      <div className='form-container'>
        <Formik
          initialValues={{
            nome: user?.displayName || '',
            telefone: userData?.telefone ?? '',
            cidade: userData?.cidade ?? '',
            sobre: userData?.sobre ?? '',
          }}
          enableReinitialize
          validationSchema={profileSchemaValidation}
          onSubmit={handleProfileSubmit}
        >
          {({ errors, handleChange }) => (
            <Form noValidate className='form'>
              <h1 className='form-title'>Perfil</h1>
              <div className="field">
                <p>Foto</p>
                <label htmlFor="profile-pic-input" className='pic-label'>
                  <div className='pic-wrapper'>
                    <img src={photoURL} alt="Avatar" />
                    <input
                      type="file"
                      accept='image/*'
                      id='profile-pic-input'
                      onChange={handleAvatarChange}
                    />
                  </div>
                </label>
                <p className='pic-edit-info'>Clique na foto para editar</p>
              </div>
              <div className='field'>
                <label htmlFor="name">Nome</label>
                <Field
                  type="text"
                  name='nome'
                  placeholder='Insira seu nome completo'
                  onChange={handleChange}
                  id="name"
                />
                <ErrorMessage
                  name='nome'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="phone">Telefone</label>
                <Field
                  type="text"
                  name='telefone'
                  placeholder='Insira seu telefone e/ou whatsapp'
                  onChange={handleChange}
                  id="phone"
                />
                <ErrorMessage
                  name='telefone'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="city">Cidade</label>
                <Field
                  type="text"
                  name='cidade'
                  placeholder='Insira sua cidade'
                  onChange={handleChange}
                  id="city"
                />
                <ErrorMessage
                  name='cidade'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="sobre">Sobre</label>
                <Field  
                  as='textarea'
                  rows={4}
                  cols={15}
                  name='sobre'
                  placeholder='Conte um pouco sobre você'
                  onChange={handleChange}
                  id="sobre"
                />
                <ErrorMessage
                  name='sobre'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <input className='submit-button' type="submit" value="Salvar" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Profile;