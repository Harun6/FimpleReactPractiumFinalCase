import React, { useEffect, useRef, useState } from 'react'
import InputItem from '../Common/InputItem'
import SelectItem from '../Common/SelectItem'
import "../../Assets/Css/Create.css"
import { MainContext, useContext } from "../../Context"
import { IntervalTypes } from '../../Utils/Constants'
export function Edit({ history, match }) {
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
        interval: '',
        taxrate: 0,
        kkdf: 0,
        bsmv: 0
    })

    const [selectedIntervaltype, setselectedIntervaltype] = useState({})

    useEffect(() => {
        if (calcList.find(u => u.id == match.params.DataID) == undefined) {
            history.push('/')
        } else {
            setselectedIntervaltype(IntervalTypes.find(e => e.value === calcList.find(item => item.id == match.params.DataID).interval))
            setcurrentdata(calcList.find(item => item.id == match.params.DataID))
        }
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

    const handleUpdate = () => {
        if (CheckValidation()) {
            let arr = calcList
            let data = calcList.find(u => u.id == match.params.DataID)
            data.creaditname = currentdata.creaditname
            data.creditvalue = currentdata.creditvalue
            data.installments = currentdata.installments
            data.profitrate = currentdata.profitrate
            data.interval = selectedIntervaltype.value
            data.kkdf = currentdata.kkdf
            data.bsmv = currentdata.bsmv
            setcalcList(arr)
            history.push("/")
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                        <h4 className="card-title">Hesaplama Kaydı Güncelleme</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <InputItem
                            ref={validationRefs["creaditname"]}
                            itemname="Hesaplama Adı"
                            itemid="creaditname"
                            itemvalue={currentdata.creaditname}
                            itemtype="text"
                            itemplaceholder="Hesaplama Adı"
                            itemchange={handleChange}
                            errmsg={"Lütfen İsim Giriniz"}
                            errshow={errorStates["creaditname"]}
                        />
                        <InputItem
                            ref={validationRefs["creditvalue"]}
                            itemname="Kredi tutarı (Ana para)"
                            itemid="creditvalue"
                            itemvalue={currentdata.creditvalue}
                            itemtype="number"
                            itemplaceholder="Kredi tutarı (Ana para) "
                            itemchange={handleChange}
                            errmsg={"Kredi Tutarı 0 olamaz"}
                            errshow={errorStates["creditvalue"]}

                        />
                        <InputItem
                            ref={validationRefs["profitrate"]}
                            itemname="Kâr oranı"
                            itemid="profitrate"
                            itemvalue={currentdata.profitrate}
                            itemtype="number"
                            itemplaceholder="Kâr oranı"
                            itemchange={handleChange}
                            errmsg={"Kar Oranı 0 olamaz"}
                            errshow={errorStates["profitrate"]}
                        />
                    </div>
                    <div className="col-6">
                        <InputItem
                            ref={validationRefs["installments"]}
                            itemname="Taksit sayısı"
                            itemid="installments"
                            itemvalue={currentdata.installments}
                            itemtype="number"
                            itemplaceholder="Taksit sayısı"
                            itemchange={handleChange}
                            errshow={errorStates["installments"]}
                            errmsg={"Taksit Tutarı 0 Olamaz"}
                        />
                        <SelectItem
                            itemname="Taksit aralığı seçimi"
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
                                    errmsg={"KKDF 0 olamaz"}
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
                                    errmsg={"BSMV 0 olamaz"}
                                    errshow={errorStates["bsmv"]}
                                    itemchange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex mt-5 pr-5 justify-content-end align-items-right'>
                    <button onClick={goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                    <button style={{ minWidth: '150px' }} onClick={handleUpdate} className="btn btn-primary mr-2">Güncelle</button>
                </div>
            </div>
        </div>
    )
}
export default Edit
