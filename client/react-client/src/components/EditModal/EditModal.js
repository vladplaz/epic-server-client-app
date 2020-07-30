import React, {createRef, useEffect, useRef, useState} from 'react'
import MaterializeService from '../../shared/MaterializeService'
import './EditModal.css'

export const EditModal = ({onEditFinish, todoText}) => {

  const [text, setText] = useState(todoText)
  const modalRef = useRef()
  let modal
  const input = createRef()

  useEffect(() => {
    modal = MaterializeService.initModal(modalRef.current)
    modal.open()
    input.current.focus()
  }, [])

  const onFinishConfirm = () => {
    if(text.trim()) {
      if(modal) {
        modal.close()
      }
      onEditFinish({
        status: 'ok',
        text
      })
    }
  }

  const keyHandler = ({key}) => {
    if(key === 'Enter') {
      onFinishConfirm()
    }
  }

  const onFinishCancel = () => {
    if(modal) {
      modal.close()
    }
    onEditFinish({status: 'cancel'})
  }

  return (
    <div id="modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <div className="input-field">
          <input type="text" value={text}
                 onChange={({target: {value}}) => {
                   setText(value)
                 }}
                 onKeyDown={keyHandler}
                 ref={input}/>
        </div>
      </div>
      <div className="modal-footer">
        <button
          onClick={onFinishCancel}
          className="btn waves-effect waves-green btn-flat">
          Cancel
        </button>
        <button
          onClick={onFinishConfirm}
          className="btn waves-effect waves-green btn-flat">
          Ok
        </button>
      </div>
    </div>
  )
}
