import styled from 'styled-components'
import PhotoSlide from './PhotoSilde'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../reducers';
interface itemsProps {
  item: string,
  name: string
}

const SliderItem = styled.div`
  width: 100%;
  img{
    max-width: 100%;
    min-height: 400px;
    height: 500px;
    margin : 0 auto;
  }
`;

function SlideItem() {
  const item_img_link = useSelector((state: RootState) => state.view.item_img_link)
  
  return (
    <PhotoSlide>
      {item_img_link.map((item, index) => (
        <SliderItem key={index}>
          <img src={item}/>
        </SliderItem>
      ))}
    </PhotoSlide>
  );
}

export default SlideItem;