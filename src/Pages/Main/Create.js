import React, { forwardRef, useEffect, useRef, useState } from 'react'
import InputItem from '../Common/InputItem'
import SelectItem from '../Common/SelectItem'
import "../../Assets/Css/Create.css"
import { MainContext, useContext } from "../../Context"
import { IntervalTypes } from '../../Utils/Constants'
export function Create({ history }) {
    const { calcList, setcalcList } = useContext(MainContext)

    const [errorStates, seterrorStates] = useState({
        id: false,
        creaditname: false,
        creditvalue: false,
        installments: false,
        profitrate: false,
        interval: false,
        kkdf: false,
        bsmv: false,
    })

    const validationRefs = {
        id: useRef(),
        creaditname: useRef(),
        creditvalue: useRef(),
        installments: useRef(),
        profitrate: useRef(),
        interval: useRef(),
        kkdf: useRef(),
        bsmv: useRef(),
    }

    const [currentdata, setcurrentdata] = useState({
        id: 0,
        creaditname: '',
        creditvalue: 0,
        installments: 0,
        profitrate: 0,
        interval: 0,
        kkdf: 0,
        bsmv: 0
    })
    const [selectedIntervaltype, setselectedIntervaltype] = useState({})

    useEffect(() => {
        setselectedIntervaltype(IntervalTypes[0])
    }, [])

    const handleChange = (e) => {
        const { id, value } = e.target
        setcurrentdata({ ...currentdata, [id]: value })
    }

    const goBack = () => {
        history.push('/')
    }

    function CheckValidation() {
        let isok = true
        let _errorStates = errorStates
        Object.keys(currentdata).forEach(element => {
            if (element != "id" && element != "interval") {
                if (currentdata[element] == 0 || (currentdata[element] === '' && element == "creaditname")) {
                    isok = false
                    validationRefs[element].current.style.borderColor = 'red'
                    _errorStates[element] = true
                } else {
                    validationRefs[element].current.style.borderColor = '#ced4da'
                    _errorStates[element] = false
                }
            }
        });
        seterrorStates({ ...errorStates, ..._errorStates })
        return isok
    }

    const handleCreate = () => {
        if (CheckValidation()) {
            let arr = calcList
            let data = { ...currentdata, interval: selectedIntervaltype.value, id: calcList.length + 1 }
            arr.push(data)
            setcalcList(arr)
            history.push("/")
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                        <h4 className="card-title">New Registry Calculation</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <InputItem
                            ref={validationRefs["creaditname"]}
                            itemname="Calculation Name"
                            itemid="creaditname"
                            itemvalue={currentdata.creaditname}
                            itemtype="text"
                            itemplaceholder="Calculation Name"
                            itemchange={handleChange}
                            errmsg={"Please Enter Name"}
                            errshow={errorStates["creaditname"]}
                        />
                        <InputItem
                            ref={validationRefs["creditvalue"]}
                            itemname="Amount of Loan (Principal Amount)"
                            itemid="creditvalue"
                            itemvalue={currentdata.creditvalue}
                            itemtype="number"
                            itemplaceholder="Amount of Loan (Principal Amount) "
                            itemchange={handleChange}
                            errmsg={"Amount of Loan cannot be 0."}
                            errshow={errorStates["creditvalue"]}

                        />
                        <InputItem
                            ref={validationRefs["profitrate"]}
                            itemname="Earning Rate"
                            itemid="profitrate"
                            itemvalue={currentdata.profitrate}
                            itemtype="number"
                            itemplaceholder="Earning Rate"
                            itemchange={handleChange}
                            errmsg={"Earning Rate cannot be 0."}
                            errshow={errorStates["profitrate"]}
                        />
                    </div>
                    <div className="col-6">
                        <InputItem
                            ref={validationRefs["installments"]}
                            itemname="Installment"
                            itemid="installments"
                            itemvalue={currentdata.installments}
                            itemtype="number"
                            itemplaceholder="Installment"
                            itemchange={handleChange}
                            errshow={errorStates["installments"]}
                            errmsg={"Installment cannot be 0."}
                        />
                        <SelectItem
                            itemname="Installment Range"
                            itemvalue={selectedIntervaltype}
                            itemchange={(e) => { setselectedIntervaltype(e) }}
                            optionvalue={IntervalTypes}
                        />
                        <div className='row'>
                            <div className='col-6'>
                                <InputItem
                                    ref={validationRefs["kkdf"]}
                                    itemname="KKDF %"
                                    itemid="kkdf"
                                    itemvalue={currentdata.kkdf}
                                    itemtype="number"
                                    itemplaceholder="KKDF %"
                                    errmsg={"KKDF cannot be 0."}
                                    errshow={errorStates["kkdf"]}
                                    itemchange={handleChange}
                                />
                            </div>
                            <div className='col-6'>
                                <InputItem
                                    ref={validationRefs["bsmv"]}
                                    itemname="BSMV %"
                                    itemid="bsmv"
                                    itemvalue={currentdata.bsmv}
                                    itemtype="number"
                                    itemplaceholder="BSMV %"
                                    errmsg={"BSMV cannot be 0."}
                                    errshow={errorStates["bsmv"]}
                                    itemchange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex mt-5 pr-5 justify-content-end align-items-right'>
                    <button onClick={goBack} style={{ minWidth: '150px' }} className="btn btn-danger mr-2">Turn Back</button>
                    <button style={{ minWidth: '150px' }} onClick={handleCreate} className="btn btn-success mr-2">Add</button>
                </div>
            </div>
        </div>
    )
}
export default Create
