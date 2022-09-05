import "../assets/css/modal.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Col, Container, Row } from "reactstrap";

function BusScheduleModal(props) {
    let hrs = [];
    for( var h = 0; h < 24; h++) {
        (h < 10) ? hrs.push('0'+ h) : hrs.push(h);
    }
    let mins = [];
    for( var m = 0; m < 60; m++) {
        (m < 10) ? mins.push('0'+ m) : mins.push(m);
    }

    const [getTime, setTime] = useState({});

    const handleChange = (e) => {
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newTime = { ...getTime };
        newTime[fieldName] = fieldValue;

        setTime(newTime);
    }

    let timeToCinemaHr;
    let timeToCinemaMin = parseInt(getTime['busMin']) + 45;

    if(timeToCinemaMin > 60) {
        timeToCinemaHr = parseInt(getTime['busHr']) + 1;
        timeToCinemaMin = timeToCinemaMin - 60;
    } else {
        timeToCinemaHr = parseInt(getTime['busHr']);
    }

    let BusTimeSet = getTime['busHr'] + ':' + getTime['busMin'];
    let timeToCinema = ((timeToCinemaHr < 10) ? ('0'+ timeToCinemaHr) : timeToCinemaHr) + ':' + 
    ((timeToCinemaMin < 10) ? ('0'+ timeToCinemaMin) : timeToCinemaMin);

    const schedule = {};
    schedule['bus_time'] = BusTimeSet;
    schedule['time_to_cinema'] = timeToCinema;

    return (
        <div>
            <Modal {...props} size="md" onHide={props.onHide}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Bus Schedule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body' style={{ marginLeft: '20%', marginRight:'15%' }}>
                    <Container>
                        <Row className="row py-3 col col-md-12">
                            <Col md={4}>
                                Bus Time: 
                            </Col>
                            <Col md={6}>
                                <select name="busHr" onChange={handleChange} >
                                    <option key={0} value="" hidden>hr</option>
                                    {hrs.map((hr) => (
                                        <option key={hr} value={hr}>{hr}</option>
                                    ))}
                                </select>
                                <select name="busMin" onChange={handleChange} >
                                    <option key={0} value="" hidden>min</option>
                                    {mins.map((min) => (
                                        <option key={min} value={min}>{min}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Button className="row py-2 col" style={{ marginLeft: '40%', marginRight:'60%' }} onClick={(e)=>{ props.onSubmit(schedule) }} >Add</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default BusScheduleModal;