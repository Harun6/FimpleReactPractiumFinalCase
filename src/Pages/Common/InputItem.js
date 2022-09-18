import React from 'react'
import { Form } from 'react-bootstrap'

const InputItem = React.forwardRef(({ itemname, itemid, itemvalue, itemtype, itemplaceholder, itemchange, errmsg, errshow }, ref) => (
    <div className="p-2">
        <div className='row'>
            <label style={{ fontSize: "12px" }} className="col-form-label">{itemname}</label>
        </div>
        <Form.Group className="row" >
            <Form.Control
                ref={ref}
                id={itemid}
                value={itemvalue}
                type={itemtype}
                placeholder={itemplaceholder}
                onChange={itemchange}
            />
        </Form.Group>
        {errshow ? <small style={{ fontSize: '10px', color: 'red', display: 'flex', position: 'absolute' }}>{errmsg}</small> : null}
    </div>
));

export default InputItem
