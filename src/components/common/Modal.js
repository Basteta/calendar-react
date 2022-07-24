import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>
            <div className={classes.header}>
                <div className={classes.title}>{props.title}</div>
                <button className={classes.close} onClick={props.onClose}>
                    &#10005;
                </button>
            </div>
            <div>{props.children}</div>
        </div>
    </div>
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay title={props.title} onClose={props.onClose}>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
};

export default Modal;