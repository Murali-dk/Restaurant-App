import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from './components/Header'
import Category from './components/Category'
import './App.css'

const constanceApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}
class App extends Component {
  state = {
    apiStatus: constanceApiStatus.initial,
    apiResponse: [],
    cartList: [],
    activeTab: '',
  }

  componentDidMount() {
    this.getApiInfo()
  }

  changeActive = id => {
    this.setState({activeTab: id})
  }

  camelCaseConvert = data => {
    const convertData = data.map(eachData => ({
      categoryDishes: eachData.category_dishes.map(item => ({
        addonCat: item.addonCat,
        dishAvailability: item.dish_Availability,
        dishType: item.dish_Type,
        dishCalories: item.dish_calories,
        dishCurrency: item.dish_currency,
        dishDescription: item.dish_description,
        dishId: item.dish_id,
        dishImage: item.dish_image,
        dishName: item.dish_name,
        dishPrice: item.dish_price,
        nexturl: item.nexturl,
      })),
      menuCategory: eachData.menu_category,
      menuCategoryId: eachData.menu_category_id,
      menuCategoryImage: eachData.menu_category_image,
    }))
    return convertData
  }

  getApiInfo = async () => {
    this.setState({apiStatus: constanceApiStatus.inProgress})

    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = this.camelCaseConvert(data[0].table_menu_list)
    console.log(data)
    this.setState({
      apiResponse: updatedData,
      apiStatus: constanceApiStatus.success,
      activeTab: updatedData[0].menuCategoryId,
    })
  }

  addCart = dish => {
    const {cartList} = this.state
    const alreadyInsideDish = cartList.find(item => item.dishId === dish.dishId)
    if (!alreadyInsideDish) {
      const newDish = {...dish, quantity: 1}
      this.setState(preveState => ({
        cartList: [...preveState.cartList, newDish],
      }))
    } else {
      this.setState(preveState => ({
        cartList: preveState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    }
  }

  removeItemFromCart = dish => {
    const {cartList} = this.state
    const isAlreadyExits = cartList.find(item => item.dishId === dish.dishId)
    if (isAlreadyExits) {
      this.setState(prev => ({
        cartList: prev.cartList
          .map(item =>
            item.dishId === dish.dishId
              ? {...dish, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  changeActiveTab = id => {
    this.setState({activeTab: id})
  }

  loadingView = () => (
    <div className="loader">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {apiResponse, activeTab, cartList} = this.state
    const filterCategory = apiResponse.find(
      eachCategory => eachCategory.menuCategoryId === activeTab,
    )

    return (
      <div className="card-container">
        <ul className="menu-list">
          {apiResponse.map(eachItem => {
            const isActive =
              activeTab === eachItem.menuCategoryId ? 'active' : null

            return (
              <li
                key={eachItem.menuCategoryId}
                onClick={() => this.changeActiveTab(eachItem.menuCategoryId)}
              >
                <button type="button" className={`menu-list-btn ${isActive}`}>
                  {eachItem.menuCategory}
                </button>
              </li>
            )
          })}
        </ul>
        {filterCategory.categoryDishes.map(eachCategoryObject => (
          <Category
            key={eachCategoryObject.dishId}
            categoryItem={eachCategoryObject}
            addCart={this.addCart}
            removeItemFromCart={this.removeItemFromCart}
            cartList={cartList}
          />
        ))}
      </div>
    )
  }

  switchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constanceApiStatus.inProgress:
        return this.loadingView()
      case constanceApiStatus.success:
        return this.successView()
      default:
        return null
    }
  }

  getingCartQuantity = () => {
    const {cartList} = this.state
    let total = 0
    cartList.map(item => {
      total += item.quantity
      return total
    })
    return total
  }

  render() {
    const getTotal = this.getingCartQuantity()
    return (
      <div className="bg-container">
        <Header count={getTotal} />
        {this.switchCase()}
      </div>
    )
  }
}

export default App
