import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import apiUtil from "../../utils/apiUtil";


const stateIsValid = (state) => {
    switch (state.roomId) {
        case "loading":
            return false;
        case "error":
            return false;
        case "none":
            return false;
    }

    if (state.date == "") {
        return false;
    }

    return true;
}

const Selector = (props) => {
    const [roomObjects, setRoomObjects] = useState(null);
    const [formState, setFormState] = useState({
        roomId: "loading",
        date: ""
    });
    const changeFormState = (key, val) => {
        if (formState[key] !== val) {
            setFormState(s => ({...s, [key]: val}));
        }
    }
    
    if (roomObjects === null) {
        setRoomObjects("loading");
        apiUtil.getRooms(setRoomObjects);
    }
    
    
    let date = new Date();
    const today = new Date();
    let dates = [];

    for(let i=0; i< 30; i++) {
        let dateStr = (date.getMonth() + 1) + "月" + date.getDate() + "日";
        let dateVal = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        if (today.getTime() === date.getTime()) {
            dates.push(<option id={"date_" + dateVal} value={dateVal}>{dateStr}（本日）</option>);
        } else {
            dates.push(<option id={"date_" + dateVal} value={dateVal}>{dateStr}</option>);
        }
        date.setDate(date.getDate() + 1);
    }

    let rooms = [];
    if ((roomObjects === null)  || (roomObjects === "loading")) {
        rooms.push(<option id="rooms_loading" value="loading">読み込み中...</option>);
    } else if (roomObjects === "error") {
        rooms.push(<option id="rooms_error" value="error">お部屋情報を読み込めません</option>);
        changeFormState("roomId", "error");
    } else if ((roomObjects.rooms === undefined) || (roomObjects.rooms === [])) {
        rooms.push(<option id="rooms_none" value="none">お部屋情報がありません</option>);
        changeFormState("roomId", "none");
    } else {
        roomObjects.rooms.forEach((v) => {
            rooms.push(<option id={"rooms_" + v.id} value={v.id}>{v.name}</option>);
        });
        changeFormState("roomId", roomObjects.rooms[0].id);
    }

    let viewButton = false;
    
    if (stateIsValid(formState)) {
        viewButton = true;
    }
    
    
    const handleChange = (e) => {
        let k = e.target.name;
        setFormState(s => ({...s, [k]: e.target.value}));
    }

    const handleSubmit = () => {
        return true;
    }

    return (<>
        <Row py="2">
            <Col xs="12" md="5" px="2">
                <p>使用する場所</p>
            </Col>
            <Col xs="12" md="7" px="2">
                <select name="roomId" value={formState.roomId} onChange={handleChange}>{rooms}</select>
            </Col>
        </Row>
        <Row py="2">
            <Col xs="12" md="5" px="2">
                <p>日付</p>
            </Col>
            <Col xs="12" md="7" px="2">
                <select name="date" value={formState.date} onChange={handleChange}>{dates}</select>
            </Col>
        </Row>
        <Row py="2">
            <Col xs="12" md="5" px="2">
            </Col>
            <Col xs="12" md="2" p="2">
                {viewButton && <Button onClick={()=>{handleSubmit()}} variant="success">表示</Button>}
            </Col>
        </Row>
    </>);
    
}

export default Selector;
