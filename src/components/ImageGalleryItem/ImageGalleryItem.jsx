import { useState } from 'react';
import { ImageGalleryItemStyle, Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ smallImg, largeImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ImageGalleryItemStyle>
      <Image src={smallImg} alt="" onClick={openModal} />
      {isModalOpen && <Modal largeImg={largeImg} onClose={closeModal} />}
    </ImageGalleryItemStyle>
  );
};
export default ImageGalleryItem;
