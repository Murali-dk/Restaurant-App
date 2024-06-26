import {FaCartArrowDown} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const {count} = props

  return (
    <div className="nav-bar">
      <h3>UNI Resto Cafe</h3>
      <div className="cartttt">
        <p className="my">My Orders</p>
        <div className="cart-icon">
          <FaCartArrowDown className="cart" />
        </div>
        <div className="count">
          <p>{count}</p>
        </div>
      </div>
    </div>
  )
}

export default Header
