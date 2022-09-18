
import React from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'

export default function SelectItem({ itemname, itemvalue, itemchange, optionvalue }) {
  return (
    <div className="p-2">
      <div className='row'>
        <label style={{ fontSize: "12px" }} className="col-form-label">{itemname}</label>
      </div>
      <Form.Group className="row" >
        <div className='col-12'>
          <Select
            value={itemvalue}
            onChange={itemchange}
            options={optionvalue}
          />
        </div>
      </Form.Group>
    </div >
  )
}
