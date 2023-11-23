import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

const Modal = ({ largeImg, onClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleEsc = e => {
    e.code === 'Escape' && onClose();
  };
  const handleClick = e => {
    e.target === e.currentTarget && onClose();
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalStyle>
        <img src={largeImg} alt="" />
      </ModalStyle>
    </Overlay>
  );
};
export default Modal;
