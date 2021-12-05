import { useState } from "react";
import { Row, Col } from "react-bootstrap";

import apiUtil from "../../utils/apiUtil";
import viewUtil from "../../utils/viewUtil";

const Reservations = (props) => {
    const [reservationObjects, setReservationObjects] = useState(null);

    let reservations = [];
    if (reservationObjects === null) {
        apiUtil.getReservations(setReservationObjects, props.data.roomId, props.data.date);
        return viewUtil.loading();
    } else if (reservationObjects === []) {
        reservations = (<p>予約がありません。</p>);
    } else if (reservationObjects === "error") {
        return viewUtil.error();
    } else {
        reservationObjects.foreach((v) => {
            reservations.push(<><td>{v.startAt.getHours()}</td><td>{v.endAt.getMinutes()}</td><td>{v.name}</td></>);
        });
    }


    return (
        <Row>
            <Col className="12">
                <table><th>開始時刻</th><th>終了時刻</th><th>名前</th>
                    {reservations}
                </table>
            </Col>
        </Row>
    );
}

export default Reservations;