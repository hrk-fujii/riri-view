import { useState } from "react";
import { Button } from "react-bootstrap";

import apiUtil from "../../utils/apiUtil";

const stateIsValid = (state) => {
    if ((state.hour === "none") || (state.minute === "none")) {
        return false;
    }
    if (state.name.length <= 5) {
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
    let hours = [(<option id="hour_none" value="none">時間を選択</option>)];
    let minutes = [(<option id="minute_none" value="none">分を選択</option>)];
    for (let i = now.getHours(); i <= 23; i++){
        hours.push(<option id={"hour_" + i} value={i}>{("00" + i).slice(-2)}</option>);
    }
    for (let i1 = 0; i1 < 60; i1 += 5) {
        if ((now.getHours() === parseInt(formState.hour)) && (now.getMinutes() >= i1)) {
            continue;
        }
        minutes.push(<option id={"minutes_" + i1} value={i1}>{("00" + i1).slice(-2)}</option>);
    }

    const handleChange = (e) => {
        let k = e.target.name;
        changeFormState(k, e.target.value);
    }

    const handleSubmit = () => {
        apiUtil.createReservation(setPageState, {
            name: formState.name,
            roomId: props.state.roomId,
            startAt: new Date(props.state.date + " " + formState.hour + ":" + formState.minute),
            endAt: new Date(props.state.date + " " + (parseInt(formState.hour) + 1) + ":" + formState.minute),
            type: 0,
            userInfo: {
                id: 1
            }
        });
    }


    // 予約作成ボタンの制御
    let createButton = stateIsValid(formState);
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
        <select name="hour" value={formState.hour} onChange={handleChange}>{hours}</select>
        <select name="minute" value={formState.minute} onChange={handleChange}>{minutes}</select>
        <input id="reserver" name="name" value={formState.name} onChange={handleChange} />
        {createButton && <Button onClick={()=>{handleSubmit()}} variant="success">{createButtonValue}</Button>}
    </>);
}

export default CreateReserve;