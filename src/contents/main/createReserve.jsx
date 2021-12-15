import { useState } from "react";
import { Button } from "react-bootstrap";

import apiUtil from "../../utils/apiUtil";

const stateIsValid = (props, state) => {
    if ((state.startHour === "none") || (state.startMinute === "none") || (state.endHour === "none") || (state.endMinute === "none")) {
        return false;
    }
    if (state.name.length <= 5) {
        return false;
    }
    let startAt = new Date(props.state.date + " " + state.startHour + ":" + state.startMinute);
    let endAt = new Date(props.state.date + " " + state.endHour + ":" + state.endMinute);
    if (startAt.getTime() >= endAt.getTime()) {
        return false;
    }
    return true;
}

const CreateReserve = (props) => {
    const [pageState, setPageState] = useState({});
    const [formState, setFormState] = useState({
        hour: "none",
        minute: "none",
        name: ""
    });
    const changeFormState = (key, val) => {
        if (formState[key] !== val) {
            setFormState(s => ({...s, [key]: val}));
        }
    }

    
    const now = new Date();

    // 時刻ココンボの作成
    let hours = [(<option key="hour_none" value="none">時間を選択</option>)];
    let minutes = [(<option key="minute_none" value="none">分を選択</option>)];
    for (let i = now.getHours(); i <= 23; i++){
        hours.push(<option key={"starthour_" + i} value={i}>{("00" + i).slice(-2)}</option>);
    }
    for (let i1 = 0; i1 < 60; i1 += 5) {
        if ((now.getHours() === parseInt(formState.startHour)) && (now.getMinutes() >= i1)) {
            continue;
        }
        minutes.push(<option key={"startminutes_" + i1} value={i1}>{("00" + i1).slice(-2)}</option>);
    }

    let endHours = [(<option key="hour_none" value="none">時間を選択</option>)];
    let endMinutes = [(<option key="minute_none" value="none">分を選択</option>)];
    for (let i = now.getHours(); i <= 23; i++){
        endHours.push(<option key={"endhour_" + i} value={i}>{("00" + i).slice(-2)}</option>);
    }
    for (let i1 = 0; i1 < 60; i1 += 5) {
        if ((now.getHours() === parseInt(formState.endHour)) && (now.getMinutes() >= i1)) {
            continue;
        }
        endMinutes.push(<option key={"endminutes_" + i1} value={i1}>{("00" + i1).slice(-2)}</option>);
    }

    const handleChange = (e) => {
        let k = e.target.name;
        changeFormState(k, e.target.value);
    }

    const handleSubmit = () => {
        apiUtil.createReservation(setPageState, {
            name: formState.name,
            roomId: props.state.roomId,
            startAt: new Date(props.state.date + " " + formState.startHour + ":" + formState.startMinute),
            endAt: new Date(props.state.date + " " + formState.endHour + ":" + formState.endMinute),
            type: 0,
            userInfo: {
                id: 1
            }
        });
    }


    // 予約作成ボタンの制御
    let createButton = stateIsValid(props, formState);
    let createButtonValue = "予約作成";
    if (pageState === "loading") {
        createButton = false;
        createButtonValue = "通信中...";
    }

    
    // 通信結果処理分岐
    if (typeof(pageState) === "object") {
        if (pageState.success) {
            props.setPage("reserves");
        }
    }
    
    return (<>
        <select name="startHour" value={formState.startHour} onChange={handleChange}>{hours}</select>
        <select name="startMinute" value={formState.startMinute} onChange={handleChange}>{minutes}</select>
        <select name="endHour" value={formState.endHour} onChange={handleChange}>{endHours}</select>
        <select name="endMinute" value={formState.endMinute} onChange={handleChange}>{endMinutes}</select>
        <input id="reserver" name="name" value={formState.name} onChange={handleChange} />
        {createButton && <Button onClick={()=>{handleSubmit()}} variant="success">{createButtonValue}</Button>}
    </>);
}

export default CreateReserve;