import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from './components/Header'
import Slide from './components/SlideBar'
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
    categories: [],
    count: 0,
    activeTab: 'slads',
  }

  componentDidMount() {
    this.getApiInfo()
  }

  changeActive = id => {
    this.setState({activeTab: id})
  }

  convertCamelCase = dataObject => ({
    tableMenuList: dataObject.table_menu_list,
  })

  camelCaseConvert = data => ({
    categoryDishes: data.category_dishes,
    menuCategory: data.menu_category,
    menuCategoryId: data.menu_category_id,
    menuCategoryImage: data.menu_category_image,
  })

  converting = eachCategory => ({
    addonCat: eachCategory.addonCat,
    dishAvailability: eachCategory.dish_Availability,
    dishType: eachCategory.dish_Type,
    dishCalories: eachCategory.dish_calories,
    dishCurrency: eachCategory.dish_currency,
    dishDescription: eachCategory.dish_description,
    dishId: eachCategory.dish_id,
    dishImage: eachCategory.dish_image,
    dishName: eachCategory.dish_name,
    dishPrice: eachCategory.dish_price,
    nexturl: eachCategory.nexturl,
  })

  categryCamelCase = categoryArray => {
    const updateDishes = categoryArray.map(eachCategory =>
      this.converting(eachCategory),
    )
    return updateDishes
  }

  getApiInfo = async () => {
    this.setState({apiStatus: constanceApiStatus.inProgress})

    const url = 'https://run.mocky.io/v3/2477b10c-ee18-4487-9962-1b3d073432c4'
    const response = await fetch(url)

    const data = await response.json()
    const updatedDataObject = this.convertCamelCase(data[0])
    const updatedData = updatedDataObject.tableMenuList.map(eachObject =>
      this.camelCaseConvert(eachObject),
    )

    const updateCategoryDishes = updatedData.map(eachObject =>
      this.categryCamelCase(eachObject.categoryDishes),
    )

    this.setState({
      apiResponse: updatedData,
      apiStatus: constanceApiStatus.success,
      categories: updateCategoryDishes,
    })
  }

  addCount = () => {
    this.setState(preveState => ({count: preveState.count + 1}))
  }

  minusCount = () => {
    const {count} = this.state
    if (count !== 0) {
      this.setState(preveState => ({count: preveState.count - 1}))
    }
  }

  loadingView = () => (
    <div className="loader">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {apiResponse, categories, activeTab} = this.state
    console.log(apiResponse)
    console.log(categories)
    return (
      <div className="card-container">
        <Slide
          menuList={apiResponse}
          changeActive={this.changeActive}
          activeTab={activeTab}
        />
        {categories[0].map(eachCategoryObject => (
          <Category
            key={eachCategoryObject.dishId}
            categoryItem={eachCategoryObject}
            addCount={this.addCount}
            minusCount={this.minusCount}
            addDishCount={this.addDishCount}
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
    const {count} = this.state
    return (
      <div className="bg-container">
        <Header count={count} />
        {this.switchCase()}
      </div>
    )
  }
}

export default App
