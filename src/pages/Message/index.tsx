import Button from '../../components/Button';
import './Message.scss'
function Message() {
  return (
    <div className="message-container">
      <p className="text">
        Envie uma mensagem para a pessoa ou instituição que está cuidando do animal:
      </p>
      <div>
        <form className='form' action="">
          <div className='field'>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              placeholder='Insira seu nome completo'
              id="name"
            />
          </div>
          <div className='field'>
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              placeholder='Insira seu telefone e/ou whatsapp'
              id="phone"
            />
          </div>
          <div className='field'>
            <label htmlFor="pet-name">Nome do animal</label>
            <input
              type="text"
              placeholder='Por qual animal você se interessou?'
              id="pet-name"
            />
          </div>
          <div className='field'>
            <label htmlFor="msg">Mensagem</label>
            <textarea
              rows={4}
              cols={15}
              placeholder='Escreva usa mensagem'
              id="msg"
            />
          </div>
          <input className='submit-button' type="submit" value="Enviar" />
        </form>
      </div>
    </div>
  );
}

export default Message;