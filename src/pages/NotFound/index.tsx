import p404 from '../../assets/page_not_found.svg'
import './NotFound.scss'

function NotFound() {
  return ( 
    <div className="notfound">
      <h1>Page not found, sorry :{'('}</h1>
      <img src={p404} alt="" />
    </div>
   );
}

export default NotFound;