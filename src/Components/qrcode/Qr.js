import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from "react";
import { toast } from 'react-hot-toast';
import QrReader from "react-qr-reader";
import './Qr.css'

function Qr() {
    
    const [data, setData] = useState();
    const [startScan, setStartScan] = useState(false);
    const [state, setState] = useState(0)
    const [ticket, setTicket] = useState()
    const [loading, setLoading] = useState(false)
    // 0 => reset
    // 1 => success
    // 2 => Failed
    const [selected, setSelected] = useState("environment");
    const [toastid, setToastid] = React.useState(null)
    // const [res, setRes] = React.useState(null)

    //api call to verify the ticket
    const verifyTicket = async (payload) => {

        let r = await axios.post('/ticket/get-ticket', { id: Number(payload) })
        .then(res => {
            
            if(res.data.code === 200) {
                // toast.success("Success")
                setState(1)
                setTicket(res.data.data)
            }
            else {
                // toast.error("Ticket Not Found")
                setState(2)
                setTicket(null)
            }
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            alert("Error")
        });
        return r
    }

    useEffect(() => {
        var canvas 
    })


    let handleScan = async(data) => {
        if (data) {
            console.log({ data })
            setData(data);
            setStartScan(false);
            verifyTicket(data);
            toast.promise(verifyTicket(data), {
                loading: 'Loading',
                success: 'Success',
                error: 'Error',
            })
        }
    };

    let checkIn = async() => {
        //api call to check in
        await axios.post('/ticket/check-in', { id: Number(data) })
        .then(res => {

            if(res.data.code === 200) {
                toast.success("Success")
            }
            else {
                toast.error("Ticket Not Found")
            }
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            alert("Error")
        })
        verifyTicket(data);
    }

    let checkOut = async () => {
        //api call to check in
        await axios.post('/ticket/check-out', { id: Number(data) })
            .then(res => {
                if (res.data.code === 200) {
                    toast.success("Success")
                }
                else {
                    toast.error("Ticket Not Found")
                }
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                alert("Error")
            })
        verifyTicket(data);
    }

    let handleError = err => {
        //handle typeerror when user denies camera access
        if(err.name === "TypeError") {
            alert("Please allow camera access")
            setStartScan(false)
        }
        alert(err);
    };

  return (
      <div className='qrr'>
            <h1>Ticket Scanner</h1>
          <div className="settings">
              <button
                  className='btn-scan'
                  onClick={() => {
                      setStartScan(!startScan);
                  }}
              >{startScan ? "Stop Scan" : "Start Scan"}</button>
              <select className='btn-select' onChange={(e) => setSelected(e.target.value)}>
                  <option value={"environment"}>Back Camera</option>
                  <option value={"user"}>Front Camera</option>
              </select>
          </div>
          {startScan && (
              <>
                  
                  <div className={startScan ? "qr_reader" : "hidden"}>
                  <QrReader
                      
                      facingMode={selected}
                      delay={1000}
                      onError={handleError}
                      onScan={handleScan}
                      // chooseDeviceId={()=>selected}
                      style={{ width: "300px" }}
                  />
                  </div>
              </>
          )}
          {
                state === 1 && (
                    <div className="success">
                        <h1>Ticket Verified </h1>
                        <hr />
                        <div className="details">
                            <div className="details_heading">Attendee Details</div>
                            <hr />
                            <div className="details_body">
                                <div className="detail_title">Registration ID</div>
                                <div className="detail_value"> {ticket["Registration Id"]} </div>
                            </div>
                          <div className="details_body">
                              <div className="detail_title">Attendee Name</div>
                              <div className="detail_value"> {ticket["Attendee Name"]} </div>
                          </div>
                          <div className="details_body">
                              <div className="detail_title">Attendee Email</div>
                              <div className="detail_value"> {ticket["Attendee Email"]} </div>
                          </div>
                          <div className="details_body">
                              <div className="detail_title">Check In Time</div>
                              <div className="detail_value"> {ticket["Check-In Time"]} </div>
                          </div>
                          <div className="details_body">
                              <div className="detail_title">Check Out Time</div>
                              <div className="detail_value"> {ticket["Check-Out Time"]} </div>
                          </div>
                          <div className="button_container">
                              <button className="button_in" onClick={() => checkIn()} >Check In</button>
                              <button className="button_reset" onClick={() => { setState(0); setData(null) }} >Reset</button>
                              <button className="button_out" onClick={() => checkOut()} >Check Out</button>

                          </div>

                        </div>
                    </div>
                )
                } {
                state === 2 && (
                    <div className="failed">
                        <h1>Ticket Not Found</h1>
                    </div>
                )
          }
          <p className='scan'> {data ? "" : 'Please Scan the Ticket'} </p>
          
      </div>
  )
}

export default Qr