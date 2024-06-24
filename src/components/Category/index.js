import {useState} from 'react'
import './index.css'

const Category = props => {
  const {categoryItem, addCount, minusCount} = props

  const [dishCount, setCount] = useState(0)

  const {
    dishName,
    dishImage,
    dishPrice,
    dishDescription,
    dishCalories,
    addonCat,
    dishId,
  } = categoryItem

  let a
  if (addonCat === undefined) {
    a = 'Not Available'
  } else if (addonCat.length > 0) {
    a = 'Custumization Available'
  }

  const increase = () => {
    addCount()
    setCount(preveState => preveState + 1)
  }

  const decrease = () => {
    minusCount(dishId)
    setCount(preveState => (preveState === 0 ? 0 : preveState - 1))
  }

  return (
    <div className="card">
      <div className="content">
        <p className="card-head">{dishName}</p>
        <p className="dish-price">SAR {dishPrice}</p>
        <p>{dishDescription}</p>
        <div className="btn-cont">
          <button type="button" onClick={decrease} className="btn">
            -
          </button>
          <span>{dishCount}</span>
          <button type="button" onClick={increase} className="btn">
            +
          </button>
        </div>
        <p>{a}</p>
      </div>
      <div className="calories">
        <p>{dishCalories} calories</p>
      </div>
      <img alt="dish" className="dish-img" src={dishImage} />
    </div>
  )
}

export default Category
