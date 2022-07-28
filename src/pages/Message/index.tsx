import { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import * as Yup from 'yup';
import './Message.scss'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';

interface MessageFormValues {
  nome: string,
  telefone: string,
  petName: string,
  mensagem?: string
}

const messageSchemaValidation = Yup.object().shape({
  nome: Yup.string().min(3, 'O nome deve ter no mínimo 3 caracteres').required('Seu nome é obrigatório'),
  telefone: Yup.string()
    .matches(/^[0-9- ()]+$/g, 'Número inválido'),
  petName: Yup.string().required('O nome do animal deve ser informado'),
  mensagem: Yup.string().required('Envie uma mensagem para nós!')
})

function Message() {
  const { user } = useAuth()
  const { state: petName } = useLocation()
  const [isLoading, setIsLoading] = useState(false);
  const messageCollectionRef = collection(db, 'messages')

  const handleMessageSend = async (values: MessageFormValues, {resetForm}: any) => {
    setIsLoading(true)
    try {
      await addDoc(messageCollectionRef, {
        userId: user?.uid,
        nome: values.nome,
        telefone: values.telefone,
        petName: values.petName,
        mensagem: values.mensagem
      })

      toast.success('Mensagem enviada com sucesso. Obrigado!')
      resetForm()
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="message-container">
      <p className="text">
        Envie uma mensagem para a pessoa ou instituição que está cuidando do animal:
      </p>
      <div className='form-container'>
        <Formik
          initialValues={{
            nome: user?.displayName ||'',
            telefone: '',
            petName: petName as string || '',
            mensagem: '',
          }}
          validationSchema={messageSchemaValidation}
          onSubmit={handleMessageSend}
        >
          {({ errors, handleChange }) => (
            <Form noValidate className='form'>
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
                  id="phone"
                />
                <ErrorMessage
                  name='telefone'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="petName">Nome do animal</label>
                <Field
                  type="text"
                  name='petName'
                  placeholder='Por qual animal você se interessou?'
                  id="petName"
                />
                <ErrorMessage
                  name='petName'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="msg">Mensagem</label>
                <Field
                  as='textarea'
                  rows={6}
                  cols={15}
                  name='mensagem'
                  placeholder='Escreva uma mensagem'
                  id="msg"
                />
                <ErrorMessage
                  name='mensagem'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className="field-submit">
                {isLoading ? <span className='loader' />
                  : <input className='submit-button' type="submit" value="Enviar" />
                }
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Message;