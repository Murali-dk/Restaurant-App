import './index.css'

const Category = props => {
  const {categoryItem, addCart, removeItemFromCart, cartList} = props

  const {
    dishId,
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
    addCart(categoryItem)
  }

  const decrease = () => {
    removeItemFromCart(categoryItem)
  }

  const getQuantity = () => {
    const cartItem = cartList.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
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
            <p>{}</p>
            <button type="button" onClick={increase} className="btn">
              +
            </button>
          </div>
        )}
        <p className="avilable-dish">{a}</p>
        {!dishAvailability && <p className="not-dish">Not available</p>}
      </div>
      <p className="calories">{dishCalories} calories</p>
      <img alt={dishName} className="dish-img" src={dishImage} />
    </div>
  )
}

export default Category
