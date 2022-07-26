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

interface MessageFormValues {
  nome: string,
  telefone: string,
  'pet-name': string,
  mensagem?: string
}

const messageSchemaValidation = Yup.object().shape({
  nome: Yup.string().min(3, 'nome deve ter no mínimo 3 caracteres').required('nome é obrigatório'),
  telefone: Yup.string()
    .matches(/^[0-9- ()]+$/g, 'número inválido'),
  'pet-name': Yup.string().required('nome do animal deve ser informado'),
  mensagem: Yup.string()
})

function Message() {
  const { state: petName } = useLocation()

  const handleMessageSend = (values: MessageFormValues) => {
    console.log(values)
  }

  return (
    <div className="message-container">
      <p className="text">
        Envie uma mensagem para a pessoa ou instituição que está cuidando do animal:
      </p>
      <div className='form-container'>
        <Formik
          initialValues={{
            nome: '',
            telefone: '',
            'pet-name': petName as string || '',
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
                <label htmlFor="pet-name">Nome do animal</label>
                <Field
                  type="text"
                  name='pet-name'
                  placeholder='Por qual animal você se interessou?'
                  id="pet-name"
                />
                <ErrorMessage
                  name='pet-name'
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
              <input className='submit-button' type="submit" value="Enviar" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Message;