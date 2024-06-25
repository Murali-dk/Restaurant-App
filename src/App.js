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
    cartCount: 0,
    activeTab: '11',
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

    const url = 'https://run.mocky.io/v3/2477b10c-ee18-4487-9962-1b3d073432c4'
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = this.camelCaseConvert(data[0].table_menu_list)

    console.log(data)
    this.setState({
      apiResponse: updatedData,
      apiStatus: constanceApiStatus.success,
    })
  }

  addCount = () => {
    this.setState(preveState => ({cartCount: preveState.cartCount + 1}))
  }

  minusCount = () => {
    const {cartCount} = this.state
    if (cartCount !== 0) {
      this.setState(preveState => ({cartCount: preveState.cartCount - 1}))
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
    const {apiResponse, activeTab} = this.state
    const filterCategory = apiResponse.find(
      eachCategory => eachCategory.menuCategoryId === activeTab,
    )
    console.log(filterCategory)
    return (
      <div className="card-container">
        <ul className="menu-list">
          {apiResponse.map(eachItem => {
            const isActive =
              activeTab === eachItem.menuCategoryId ? 'active' : null
            return (
              <li key={eachItem.menuCategoryId}>
                <button
                  onClick={() => this.changeActiveTab(eachItem.menuCategoryId)}
                  type="button"
                  className={`menu-list-btn ${isActive}`}
                >
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
            addCount={this.addCount}
            minusCount={this.minusCount}
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

  render() {
    const {cartCount} = this.state
    return (
      <div className="bg-container">
        <Header count={cartCount} />
        {this.switchCase()}
      </div>
    )
  }
}

export default App
