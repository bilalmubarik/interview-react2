import React from 'react';
import SecondTicker from './SecondTicker';

class ActivityGrid extends React.Component {
    //Updating parent to stop specific activity on click
    stopActivity = (id) => {
        this.props.stopActivity(id);
    }

    render() {
        return (
            <div>
                <h4>List of Activities</h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.activities.map((row, key) => (
                            <tr key={key}>
                                <td>{row.id}</td>
                                <td>{row.description}</td>
                                <td>{row.startTime.toLocaleTimeString()}</td>
                                <td>{row.endTime}</td>
                                <td>{(row.endTime ? row.duration : <SecondTicker duration={row.savedDuration} activityStopped={row.endTime} />)}</td>
                                <td>
                                    {row.duration ? 'Activity Stopped' : <button onClick={() => this.stopActivity(row.id)} className="btn btn-warning btn-sm">Stop Activity</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default ActivityGrid;