import { useEffect, useState } from 'react';
import { Row, Alert, Col} from 'react-bootstrap';

function Timer(props) { 
    return(
        <>
          {props.riddle.startTimer === 0 ?  null : (props.riddle.startTimer === null ? <TempoScaduto  riddle={props.riddle} />
                                                                    : <StartTime riddle={props.riddle} addAnswer={props.addAnswer} showReply={props.showReply}/> ) }
        </>
    );
}

function StartTime(props) {
    
    const riddle = props.riddle;

    var d = +new Date(riddle.startTimer) + riddle.life * 1000;// timestamp prima risposta

    const [hint1Msg, setHint1Msg] = useState('');
    const [hint2Msg, setHint2Msg] = useState('');


    const [timeLeft, setTimeLeft] = useState(0);

    const calculateTimeLeft = () => {
        const difference = d - +new Date(); // tempo mancante
        let tempoMancante = {};

        if (difference > 0) { //vuol dire che ho il countdown
            tempoMancante = {
              hours: Math.floor(difference / (1000 * 60 * 60)),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
        
          } else {
            props.addAnswer({CodR: riddle.CodR , text: "TimeIsOver"});
            setHint1Msg(false);
            setHint2Msg(false);
          }
          setTimeLeft(tempoMancante);
    };
    
    useEffect(() => {
        setTimeout(() => {
            var seconds = timeLeft.seconds + (timeLeft.minutes * 60) + (timeLeft.hours * 3600);
            
            if(seconds <= (riddle.life * 0.5)) { // 50%
                setHint1Msg('First hint: ' + riddle.hint1);
            }
            if (seconds <= (riddle.life * 0.25)) {  // 25%
                
                setHint2Msg('Second hint: ' + riddle.hint2);
            }
            calculateTimeLeft();
        }, 1000);
      });

    return(
        <>
           {props.showReply ? <Row>
                <Col>
                    {hint1Msg ? <Alert variant='primary' onClose={() => setHint1Msg('')} dismissible>{hint1Msg}</Alert> : false}
                </Col>
                <Col>
                    {hint2Msg ? <Alert variant='info' onClose={() => setHint2Msg('')} dismissible>{hint2Msg}</Alert> : false}
                </Col>
            </Row> : null}
            <Row>
             { timeLeft.minutes || timeLeft.seconds ? 
                        <h2>Countdown : 

                            <span> {timeLeft.minutes}</span>
                            <span>:</span>
                            <span>{timeLeft.seconds}</span>
                        </h2>
                 : <TempoScaduto addAnswer={props.addAnswer} riddle={props.riddle}/> }
            </Row> 
        </>
    );
}

function TempoScaduto() {
    
    return(
        <>
        <h2>Time is over</h2>
        </>
    );
}

export default Timer;

