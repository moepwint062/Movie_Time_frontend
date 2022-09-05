import React, { useEffect, useState } from 'react';
import { CREATE_BUSSCHEDULE_URL, CREATE_TIMESCHEDULE_URL, GET_BUSSCHEDULE_URL, GET_MOVIETIME_URL, GET_TODOLIST_URL, TOKEN } from '../../constants/api.path';
import TimeScheduleModal from '../../modalPopups/TimeScheduleModal';
import BusScheduleModal from '../../modalPopups/BusScheduleModal';
import MovieTimeModal from '../../modalPopups/MovieTimeModal';

function HomePage() {
    const [showTimeScheduleModal, setTimeScheduleModal] = useState(false);
    const [showBusScheduleModal, setBusScheduleModal] = useState(false);
    const [showMovieTimeModal, setMovieTimeModal] = useState(false);
    const [movieTime, setMovieTime] = useState([]);
    const [todoList, SetTodoList] = useState([]);
    const [busTime, setBusTime] = useState([]);

    useEffect(() => {
        fetch(GET_TODOLIST_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            }
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            SetTodoList(res.data.todoList);
        });
    
        fetch(GET_BUSSCHEDULE_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            }
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            setBusTime(res.data.busSchedule);
        });
    })
    
    function setTimeSchedule() {
        setTimeScheduleModal(true);
    };

    function saveTimeSchedule(schedule) {
        // console.log(schedule);
        fetch(CREATE_TIMESCHEDULE_URL, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(schedule),
        })
        .then(async (response) => {
            // console.log(response);
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                alert(res.message);
            } else {
                setTimeScheduleModal(true);
                alert(res.message);
            }
        })
    }

    function setBusSchedule() {
        setBusScheduleModal(true);
    };

    function saveBusSchedule(schedule) {
        // console.log(schedule);
        fetch(CREATE_BUSSCHEDULE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${TOKEN}`,
            },
            body: JSON.stringify(schedule),
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            if(res.result) {
                alert(res.message);
            } else {
                setBusScheduleModal(true);
                alert(res.message);
            }
        })
    }

    function decideMovieTime() {
        fetch(GET_MOVIETIME_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            }
        })
        .then(async (response) => {
            return response.json();
        })
        .then((res) => {
            // console.log(res.data);
            setMovieTime(res.data.movieTime);
        })
        setMovieTimeModal(true);
    };

    return (
        <div className="row justify-content-center main--body">
            <div className="col-md-2">
                <button type='submit' onClick={setTimeSchedule}>Save Time Schedule</button>
            </div>
            <div className="col-md-2">
                <button type='submit' onClick={setBusSchedule}>Bus Schedule</button>
            </div>
            <div className="col-md-2">
                <button type='submit' onClick={decideMovieTime} disabled={todoList.length === 0 || busTime.length === 0}>Decide Movie Time</button>
            </div>
            <TimeScheduleModal show={showTimeScheduleModal}
            onSubmit={(e)=>{ setTimeScheduleModal(false); saveTimeSchedule(e) }} onHide={()=>setTimeScheduleModal(false)}/>
            <BusScheduleModal show={showBusScheduleModal} 
            onSubmit={(e)=>{ setBusScheduleModal(false); saveBusSchedule(e)}} onHide={()=>setBusScheduleModal(false)}/>
            <MovieTimeModal show={showMovieTimeModal} details={movieTime} onHide={()=>setMovieTimeModal(false)}/>
        </div>
    );
}
export default HomePage;