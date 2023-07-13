import { FC, Fragment } from "react";
import "./modal.scss";
import TemplateOne from '../Forms/template1/index';

interface templateOneResponse {
  title: string,
  titleOnCal:string,
  place: string,
  description:string;
  patternType:string;
}

interface ModalProps {
  isVisible: boolean;
  isOutsideClickActive: boolean;
  title: string | null;
  onAddEvent: (obj: templateOneResponse) => void;
  onClose: () => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { isVisible, isOutsideClickActive, title, onAddEvent, onClose } = props;
  return (
    <Fragment>
      {isVisible ? <><div className="backdrop"></div>
      <div className="modalWrapper">
        <div className="modalContainer">
            <div className="title">
                {title}
                <span className="close" onClick={onClose}>X</span>
            </div>
            <div className="body">
            <TemplateOne onCreate={onAddEvent} />
            </div>
        </div>
      </div></> : null}
    </Fragment>
  );
};

export default Modal;
