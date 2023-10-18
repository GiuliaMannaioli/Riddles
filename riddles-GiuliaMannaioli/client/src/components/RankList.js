import {Table} from "react-bootstrap";

function RankRow(props) {

    return (
        (<>
            <tr  className="align-middle">
                <td>{props.rank.nickname}</td>
                <td>{props.rank.ranking}</td>

            </tr>
        </>)
    );
}

function RankList(props) { 

    return (<main>
        <h2>
            Ranking
        </h2>
        <Table bordered className='table-light'>
            <thead>
                <tr className="bg-gradient-info">
                    <th className='align-middle'>Nickname</th>
                    <th className='align-middle'>Score</th>
                </tr>
            </thead>
            <tbody>
                { props.rank.map((rank)=>
                    (<RankRow key={rank.id} rank={rank} 
                                loggedIn={props.loggedIn} /> ))}
            </tbody> 
        </Table>
    </main>);

    
}

export default RankList;