import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

const Modal = ({ largeImg, onClose }) => {
  useEffect(() => {
    const handleEsc = e => {
      e.code === 'Escape' && onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

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
