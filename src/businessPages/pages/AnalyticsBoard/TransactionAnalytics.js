import React,{useState} from 'react'
import { Table } from 'reactstrap'
import './Analytics.css';

const Transactions = () => {
  const [sortBy,setSortBy] = useState("all_time")
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")
  const [value, setValue] = useState('');
  return (
    <div>
      <div className='text-end mt-3 me-5'>
        <input type='date' className='me-3'
 value={startDate} onChange={(e)=>setStartDate(e.target.value)}  placeholder='start date'/>
        <input type='date' className='me-3' value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
        <button className='me-3 px-3'>Filter</button>
        <span>Sort By: </span>
        <select name="languages" id="lang" onChange={(e)=>setSortBy(e.target.value)}>
        <option value="all_time">All Time</option>
        <option value="1_week">1 Week</option>
        <option value="30_days">30 Days</option>
        <option value="1_year">1 Year</option>
      </select>
      </div>
      <div className='mt-5 table-section'>
      <Table className="table table-hover borderless responsive striped">
                          <thead className='table-header-analytics' style={{backgroundColor:"#E3E3E3"}}>
                            <tr >
                              <th className="table_theader py-2" style={{backgroundColor:"#E3E3E3",color:"#6E6E6E"}}>BUSINESSES</th>
                              <th className="table_theader" style={{backgroundColor:"#E3E3E3",color:"#6E6E6E"}}>
                                TRANSACTIONS
                              </th>
                              <th className="table_theader" style={{backgroundColor:"#E3E3E3",color:"#6E6E6E"}}>REVENUE GENERATED</th>
                              <th className="table_theader" style={{backgroundColor:"#E3E3E3",color:"#6E6E6E"}}>ADDRESS</th>
                              <th className="table_theader" style={{backgroundColor:"#E3E3E3",color:"#6E6E6E"}}>ACTION</th>
                            </tr>
                          </thead>
                          <tbody className="body__txt">
                            {/* {orderData?.map((item, index) => (
                              <tr key={item.id}>
                                <td className="body__elemnts">
                                  {item.patient_name}
                                </td>
                                <td className="body__elemnts">
                                  {item.equipment_name}
                                </td>
                                <td className="body__elemnts">
                                  {item.street_address}, {item.city},{" "}
                                  {item.state}, {item.country}, {item.zip_code}
                                </td>
                                <td className="body__elemnts">
                                 <select
                                    value={item.delivery_status}
                                    style={{
                                      color: getOrderStatusColor(
                                        item.delivery_status
                                      ),
                                      fontWeight: "600",
                                      border: "none",
                                      outline: "none",
                                      backgroundColor:
                                        getBackgroundOrderStatusColor(
                                          item.delivery_status
                                        ),
                                    }}
                                    onChange={(e) =>
                                      handleOrderStatusChange(
                                        item.id,
                                        item.business_user,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="">Select Status</option>
                                    <option value="On the Way">
                                      On the Way
                                    </option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Delivered">Delivered</option>
                                  </select>
                                  
                                </td>
                                
                              </tr>
                            ))} */}
                          </tbody>
                        </Table>
      </div>
    </div>
  )
}

export default Transactions
