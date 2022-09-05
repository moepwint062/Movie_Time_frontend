import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Col, Container, Row } from "reactstrap";

function TimeScheduleModal(props) {
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

    let timeAfterTeethHr;
    let timeAfterTeethMin = parseInt(getTime['teethMin']) + 15;

    if(timeAfterTeethMin > 60) {
        timeAfterTeethHr = parseInt(getTime['teethHr']) + 1;
        timeAfterTeethMin = timeAfterTeethMin - 60;
    } else {
        timeAfterTeethHr = parseInt(getTime['teethHr']);
    }

    let timeAfterBreakfastHr;
    let timeAfterBreakfastMin = parseInt(getTime['breakfastMin']) + 15;

    if(timeAfterBreakfastMin > 60) {
        timeAfterBreakfastHr = parseInt(getTime['breakfastHr']) + 1;
        timeAfterBreakfastMin = timeAfterBreakfastMin - 60;
    } else {
        timeAfterBreakfastHr = parseInt(getTime['breakfastHr']);
    }

    let walkingHr;
    let walkingMin = timeAfterBreakfastMin + 15;

    if(walkingMin > 60) {
        walkingHr = timeAfterBreakfastHr + 1;
        walkingMin = walkingMin - 60;
    } else {
        walkingHr = timeAfterBreakfastHr;
    }

    let alarmSet = getTime['alarmHr'] + ':' + getTime['alarmMin'];
    let teethSet = getTime['teethHr'] + ':' + getTime['teethMin'];
    let breakfastSet = getTime['breakfastHr'] + ':' + getTime['breakfastMin'];
    let afterTeethSet = ((timeAfterTeethHr < 10) ? ('0'+ timeAfterTeethHr) : timeAfterTeethHr) + ':' + 
    ((timeAfterTeethMin < 10) ? ('0'+ timeAfterTeethMin) : timeAfterTeethMin);
    let afterbreakfastSet = ((timeAfterBreakfastHr < 10) ? ('0'+ timeAfterBreakfastHr) : timeAfterBreakfastHr) + ':' + 
    ((timeAfterBreakfastMin < 10) ? ('0'+ timeAfterBreakfastMin) : timeAfterBreakfastMin);
    let walkingSet = ((walkingHr < 10) ? ('0'+ walkingHr) : walkingHr) + ':' + 
    ((walkingMin < 10) ? ('0'+ walkingMin) : walkingMin);

    const schedule = {};
    schedule['alarm'] = alarmSet;
    schedule['time_to_teeth'] = teethSet;
    schedule['time_taken_after_teeth'] = afterTeethSet;
    schedule['breakfast_time'] = breakfastSet;
    schedule['time_taken_after_breakfast'] = afterbreakfastSet;
    schedule['walking_time'] = walkingSet;

    // console.log(schedule);

    return (
        <div>
            <Modal {...props} size="lg" onHide={props.onHide}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Save Time Schedule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <Container fluid>
                        <Row className="row py-2 col col-md-8">
                            <Col xs={8} md={6}>
                                Set Alarm Time: 
                            </Col>
                            <Col xs={6} md={4}>
                                <select name="alarmHr" onChange={handleChange} >
                                <option key={0} value="" hidden>hr</option>
                                    {hrs.map((hr) => (
                                        <option key={hr} value={hr}>{hr}</option>
                                    ))}
                                </select>
                                <select name="alarmMin" onChange={handleChange} >
                                    <option key={0} value="" hidden>min</option>
                                    {mins.map((min) => (
                                        <option key={min} value={min}>{min}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="row py-2 col col-md-8">
                            <Col xs={12} md={8}>
                                Time taken to brush teeth and take a bath
                            </Col>
                            <Col xs={6} md={4}>
                                <select name="teethHr" onChange={handleChange} >
                                    <option key={0} value="" hidden>hr</option>
                                    {hrs.map((hr) => (
                                        <option key={hr} value={hr}>{hr}</option>
                                    ))}
                                </select>
                                <select name="teethMin" onChange={handleChange} >
                                    <option key={0} value="" hidden>min</option>
                                    {mins.map((min) => (
                                        <option key={min} value={min}>{min}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="row py-2 col col-md-8">
                            <Col xs={8} md={6}>
                                Time taken for breakfast
                            </Col>
                            <Col xs={6} md={4}>
                                <select name="breakfastHr" onChange={handleChange} >
                                    <option key={0} value="" hidden>hr</option>
                                    {hrs.map((hr) => (
                                        <option key={hr} value={hr}>{hr}</option>
                                    ))}
                                </select>
                                <select name="breakfastMin" onChange={handleChange} >
                                    <option key={0} value="" hidden>min</option>
                                    {mins.map((min) => (
                                        <option key={min} value={min}>{min}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Button className="row py-2 col col-md-1" style={{ marginLeft: '45%', marginRight:'55%' }} onClick={(e)=>{ props.onSubmit(schedule) }} >Save</Button>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TimeScheduleModal;