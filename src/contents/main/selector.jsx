import { useState } from "react";
import { Button } from "react-bootstrap";

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
    
    let date = new Date();
    const today = new Date();
    let dates = [];

    for(i=0; i< 30; i++) {
        dateStr = date.getMonth() + "月" + date.getDate() + "日";
        let dateVal = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
        if (today === date) {
            dates.push(<option id={"date_" + dateVal} value={dateVal}>{dateStr}（本日）</option>);
        } else {
            dates.push(<option id={"date_" + dateVal} value={dateVal}>{dateStr}</option>);
        }
        date = date.setDate(date.getDate() + 1);
    }

    let rooms = [];
    if (roomObjects === null) {
        rooms.push(<option id="rooms_loading" value="loading">読み込み中...</option>);
    } else if (roomObjects === "error") {
        rooms.push(<option id="rooms_error" value="error">お部屋情報を読み込めません</option>);
        setFormState(s => ({...s, roomId: "error"}));
    } else if ((roomObjects.rooms === undefined) || (roomObjects.rooms === [])) {
        rooms.push(<option id="rooms_none" value="none">お部屋情報がありません</option>);
        setFormState(s => ({...s, roomId: "none"}));
    } else {
        roomObjects.rooms.forEach((v) => {
            rooms.push(<option id={"rooms_" + v.id} value={v.id}>{v.name}</option>);
        }
        setFormState(s => ({...s, roomId: roomObjects.rooms[0].id}));
    }

    let viewButton = false;
    
    if (stateIsValid(formState)) {
        viewButton = true;
    }
    
    
    const handleChange = (e) => {
        let k = e.target.name;
        setFormState(s => ({...s, [k]: e.target.value}));
    }

    return (<>
        <select name="roomId" value={formState.roomId} onChange={handleChange}>{rooms</select>
        <select name="date" value={formState.date} onChange={handleChange}>{dates}</select>
        {viewButton && <Button onClick={()=>{handleSubmit()}} variant="success">表示</Button>}
    </>);
    
}
