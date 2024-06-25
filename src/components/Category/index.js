import {useState} from 'react'
import './index.css'

const Category = props => {
  const {categoryItem, addCount, minusCount} = props

  const [dishQuantity, setQuantity] = useState(0)

  const {
    dishName,
    dishImage,
    dishPrice,
    dishDescription,
    dishCalories,
    addonCat,
    dishAvailability,
    dishCurrency,
  } = categoryItem

  let a
  if (addonCat === undefined) {
    a = 'Not Available'
  } else if (addonCat.length > 0) {
    a = 'Customizations available'
  }

  const increase = () => {
    addCount()
    setQuantity(preveState => preveState + 1)
  }

  const decrease = () => {
    minusCount()
    setQuantity(preveState => (preveState === 0 ? 0 : preveState - 1))
  }

  return (
    <div className="card">
      <div className="content">
        <h1 className="card-head">{dishName}</h1>
        <p className="dish-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && (
          <div className="btn-cont">
            <button type="button" onClick={decrease} className="btn">
              -
            </button>
            <p>{dishQuantity}</p>
            <button type="button" onClick={increase} className="btn">
              +
            </button>
          </div>
        )}
        <p className="avilable-dish">{a}</p>
        {!dishAvailability && <p className="not-dish">Not available</p>}
      </div>
      <div className="calories">
        <p>{dishCalories} calories</p>
      </div>
      <img alt="dish" className="dish-img" src={dishImage} />
    </div>
  )
}

export default Category
