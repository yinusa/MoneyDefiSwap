import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import '../assets/css/tokeninsertmodal.css'
import { FaTimes } from "react-icons/fa";
import BNB from '../assets/img/icon-bnb.svg';

const customStyles = {
  content: {
    width: '420px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    color: '#FFF',
    marginRight: '-50%',
    backgroundColor: '#151C2F',
    transform: 'translate(-50%, -50%)',
    borderRadius: '32px',
  },
  overlay: {zIndex: 1500}
};

const TokenInsertModal = (props) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  const handleClose = (index) => {
    props.closeModal(index)
  }

  return(
    <Modal
      isOpen={props.isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={() => handleClose(0)}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className='modal-header'>
        <h2 className='modal-header-title'>Select a Token</h2>
        <FaTimes className='modal-close' onClick={() => handleClose(0)} />
      </div>
      <div className='modal-body'>
        <input className='modal-token-insert' placeholder='Search name or paste address' />
        <div className='modal-token-list'>
          {props.listToken.map((cell, index) => {
            if(cell && cell.symbol && props.disableToken && props.disableToken.symbol) {
              return(<div key={index} className={`modal-cell-main ${cell.symbol == props.disableToken.symbol && 'disable-color'}`} onClick={cell.symbol != props.disableToken.symbol ? () =>handleClose(index+1) : null}>
              <img src={BNB} />
              <div className='modal-cell-type'>
                <div className='modal-cell-symbol'>{cell.symbol}</div>
                <div>{cell.name}</div>
              </div>
              <div className='modal-cell-balance'>{cell.balance}</div>
            </div>);
            }
            
          })}
        </div>
      </div>
      
    </Modal>
  )
}
 
export default TokenInsertModal;