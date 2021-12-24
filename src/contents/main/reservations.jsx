import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import util from "../../utils/util";
import apiUtil from "../../utils/apiUtil";
import viewUtil from "../../utils/viewUtil";

const Reservations = (props) => {
    const [reservationObjects, setReservationObjects] = useState(null);

    let reservations = [];
    if (reservationObjects === null) {
        apiUtil.getReservations(setReservationObjects, props.state.roomId, props.state.date);
        return viewUtil.loading();
    } else if (reservationObjects === []) {
        reservations = (<p>予約がありません。</p>);
    } else if (reservationObjects === "error") {
        return viewUtil.error();
    } else {
        reservationObjects.reservations.forEach((v) => {
            v.startAt = new Date(v.start_at);
            v.endAt = new Date(v.end_at);
            reservations.push(<tr><td>{util.time2String(v.startAt)}</td><td>{util.time2String(v.endAt)}</td><td>{v.name}</td></tr>);
        });
    }

    // 画面遷移
    const handleSubmit = () => {
        props.setPage("createReserve");
    }


    return (<>
        <Row py="2">
            <Col className="12 px-2">
                <table className="table"><thead><tr><th>開始時刻</th><th>終了時刻</th><th>名前</th></tr></thead>
                    <tbody>{reservations}</tbody>
                </table>
            </Col>
        </Row>
        <Row py="2">
            <Col className="12 p-2 text-end">
                <Button onClick={()=>{handleSubmit()}} variant="success">新規</Button>
            </Col>
        </Row>
        </>);
}

export default Reservations;