import React, { useEffect } from 'react'
import { MainContext, DetailContext, useContext } from "../../Context"
import { IntervalTypes } from '../../Utils/Constants'
import "../../Assets/Css/Main.css"
export function Index(props) {
    console.log("geldin")
    const { Detailobj, setDetailobj } = useContext(DetailContext)
    const { calcList } = useContext(MainContext)
    
    
    const { history } = props

    const HandleAddNew = () => {
        history.push("/Newdata")
    }

    const HandleUpdateStatus = (e) => {
        history.push(`/Edit/${e.target.id}`)
    }



    const HandleDetail = (e) => {
        setDetailobj(calcList.find(item => item.id == e.target.id))
        history.push(`/Details/${e.target.id}`)
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                        <h4 className="card-title">Kayıtlar</h4>
                    </div>
                    <div className='col-6 d-flex justify-content-end align-items-center'>
                        <button className="btn btn-secondary mr-2 AddNewBtn" onClick={HandleAddNew}>Yeni Hesaplama Girişi</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-light table-bordered table-hover mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Kredi Adı</th>
                                    <th scope="col">Kredi Tutarı</th>
                                    <th scope="col">Taksit sayısı</th>
                                    <th scope="col">Kâr oranı</th>
                                    <th scope="col">Taksit aralığı</th>
                                    <th scope="col">KKDF Oranı</th>
                                    <th scope="col">BSMV Oranı</th>
                                    <th scope="col">Düzenle</th>
                                    <th scope="col">Detay Görüntüle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calcList.map(item => {
                                    return <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.creaditname}</td>
                                        <td>{item.creditvalue}</td>
                                        <td>{item.installments}</td>
                                        <td>{item.profitrate}</td>
                                        <td>{IntervalTypes.find(e => e.value === item.interval).label}</td>
                                        <td>{item.kkdf}</td>
                                        <td>{item.bsmv}</td>
                                        <td>
                                            <button id={item.id} type="button" onClick={HandleUpdateStatus} className="btn btn-primary" >
                                                Düzenle
                                            </button>
                                        </td>
                                        <td>
                                            <button id={item.id} type="button" onClick={HandleDetail} className="btn btn-primary" >
                                                Detay
                                            </button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index