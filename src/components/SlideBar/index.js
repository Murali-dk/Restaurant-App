import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const Slide = props => {
  const {menuList, changeActive} = props
  console.log(menuList)

  const activeChange = id => {
    changeActive(id)
  }

  const settings = {
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 0,
  }

  return (
    <div className="slide-bar">
      <Slider {...settings}>
        <p className="slide-bar active">{menuList[0].menuCategory}</p>
        <p className="slide-bar">{menuList[1].menuCategory}</p>
        <p className="slide-bar">{menuList[2].menuCategory}</p>
        <p className="slide-bar">{menuList[3].menuCategory}</p>
        <p className="slide-bar">{menuList[4].menuCategory}</p>
        <p className="slide-bar">{menuList[5].menuCategory}</p>
      </Slider>
    </div>
  )
}

export default Slide
