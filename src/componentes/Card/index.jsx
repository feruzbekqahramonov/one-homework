import { FaTrashCan } from "react-icons/fa6";
function Card(props) {
    const {name, description, price, status, id} = props.phone
   const {deleteItem} = props;
    return (
    <div className="card" style={{width: '18rem'}}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{price}$</h6>
        <h6 className="card-subtitle mb-2 text-body-secondary">{status}</h6>
        <p className="card-text">
         {description}
        </p>
        <FaTrashCan onClick={() => {deleteItem(id)}} style={{color: 'red', cursor: 'pointer'}}/>
      </div>
    </div>
  );
}

export default Card;
