import css from './../assets/styles/components/whatsapp.module.scss';
import { FaWhatsapp } from 'react-icons/fa';

const Whatsapp = () => {
  return (
    <a
      href='https://wa.me/+5492494629504'
      target='_blank'
      rel='noopener noreferrer'
      className={css.whatsappLink}
    >
      <FaWhatsapp size={40} className={css.whatsappIcon} />
    </a>
  );
};

export default Whatsapp;
