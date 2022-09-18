import React, { useEffect, useState } from 'react'
import { MainContext, DetailContext, useContext } from "../../Context"

export function Detail({ history }) {
  const { Detailobj, setDetailobj } = useContext(DetailContext)
  const { calcList, setcalcList } = useContext(MainContext)

  const [currentitem, setcurrentitem] = useState([])
  const [periodicalPayment, setperiodicalPayment] = useState(0)


  useEffect(() => {
    if (!Detailobj || !Detailobj.id || (calcList.find(u => u.item == Detailobj.id))) {
      history.push('/')
    } else {

      const { creditvalue, installments, interval, profitrate, kkdf, bsmv } = Detailobj
      const taxvaluepercent = (profitrate / 100) * (interval / 30)
      const kkdfpercent = taxvaluepercent * kkdf / 100
      const bsmvpercent = taxvaluepercent * bsmv / 100
      const totaltaxvaluepercent = (taxvaluepercent + kkdfpercent + bsmvpercent)
      const periodicalpaymentvalue = (creditvalue * ((totaltaxvaluepercent * ((1 + totaltaxvaluepercent) ** (installments))) / ((((1 + totaltaxvaluepercent) ** (installments)) - 1))))
      setperiodicalPayment(periodicalpaymentvalue)

      let totalcreditvalue = creditvalue
      for (let index = 0; index < installments; index++) {
        let taxvalue = (totalcreditvalue * taxvaluepercent)
        let kkdfvalue = (taxvalue * kkdf / 100)
        let bsmvvalue = (taxvalue * bsmv / 100)
        let perCreditvalue = (periodicalpaymentvalue - taxvalue - kkdfvalue - bsmvvalue)
        totalcreditvalue = (totalcreditvalue - perCreditvalue)
        let prevdata = currentitem
        prevdata.push({
          id: index + 1,
          paymentvalue: Math.round(periodicalpaymentvalue * 100) / 100,
          perCreditvalue: Math.round(perCreditvalue * 100) / 100,
          totalcreditvalue: Math.round(totalcreditvalue * 100) / 100,
          taxvalue: Math.round(taxvalue * 100) / 100,
          kkdf: Math.round(kkdfvalue * 100) / 100,
          bsmv: Math.round(bsmvvalue * 100) / 100
        })
        setcurrentitem(prevdata)
      }
    }
  }, [])


  const goBack = () => {
    history.push('/')
  }

  return (
    <div>
      <div className='row d-flex mt-1 pr-5 justify-content-end align-items-right'>
        <button onClick={goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-dark table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Taksit Tutarı</th>
                <th scope="col">Ana Para</th>
                <th scope="col">Kalan Ana Para</th>
                <th scope="col">Kar Tutarı</th>
                <th scope="col">KKDF</th>
                <th scope="col">BSMV</th>
              </tr>
            </thead>
            <tbody>
              {currentitem.map(item => {
                return <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.paymentvalue}</td>
                  <td>{item.perCreditvalue}</td>
                  <td>{item.totalcreditvalue}</td>
                  <td>{item.taxvalue}</td>
                  <td>{item.kkdf}</td>
                  <td>{item.bsmv}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Detail
