import {Table} from "react-bootstrap";

function AnonymousRow(props) {

    return (
        (<>
            <tr  className="align-middle">
                <td>{props.riddle.question}</td>
                <td>{props.riddle.difficulty}</td>
                <td>{props.riddle.state===0 ? 'closed' : 'open'}</td>
            </tr>
        </>)
    );
}

function AnonymousList(props) { 

    return (<main>

        <Table bordered className='table-light'>
            <thead>
                <tr className="bg-gradient-info">
                    <th className='align-middle'>Question</th>
                    <th className='align-middle'>Difficulty</th>
                    <th className='align-middle'>State</th>
                </tr>
            </thead>
            <tbody>
                { props.riddles.map((r)=>
                    (<AnonymousRow key={r.CodR} riddle={r} 
                                loggedIn={props.loggedIn} /> ))}
            </tbody> 
        </Table>
    </main>);

    
}

export default AnonymousList;