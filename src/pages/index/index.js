import '../../blocks/date-dropdown/date-dropdown';
import '../../blocks/select-counter/select-counter';
import '../../blocks/header/header';
import './index.scss';
import 'material-design-icons/iconfont/material-icons.css';

const imageUrls = [require('../../assets/img/green-room.jpg'), require('../../assets/img/blue-chair.jpg'), require('../../assets/img/sofa.jpg')];
let imageIndex = 0;

const changeImage = () => {
  $('.main-page').css('background-image', `url(${imageUrls[imageIndex]})`);
  imageIndex++;
  if (imageIndex === imageUrls.length) {
    imageIndex = 0;
  }
}

setInterval(changeImage, 5000);
