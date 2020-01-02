// Importing react libraries, css and components
import React from 'react';
import ReactDOM from 'react-dom';
import './Custom.css';
import helpers from './helpers';
import Header from './components/Header';
import StartActivity from './components/StartActivity';
import ActivityGrid from './components/ActivityGrid';

class App extends React.Component {
    constructor(props) {
        super(props);

        var tempActivities = [];
        var tempCurrActivityIndex = 1;

        //Checking local storage for activities on page reload
        if (sessionStorage.getItem('activities')) {
            tempActivities = helpers.getSession('activities');
            for (var key in tempActivities) {
                tempActivities[key].startTime = new Date(tempActivities[key].startTime);
                tempActivities[key].savedDuration = helpers.timeDiff(new Date(), tempActivities[key].startTime);
            }
        }

        //Checking local storage for current activity index in array on page reload
        if(sessionStorage.getItem('currActivityIndex')) {
            tempCurrActivityIndex = helpers.getSession('currActivityIndex');
        }

        this.state = {
            activities: tempActivities,
            currActivityIndex: tempCurrActivityIndex,
            activityStopped: false
        }
    }

    componentDidUpdate() {
        //Storing latest data in session storage after state update
        helpers.storeSession("activities", this.state.activities);
        helpers.storeSession("currActivityIndex", this.state.currActivityIndex);
    }

    updateActivity = (description, startTime, endTime, id) => {
        
        var activity = this.state.activities;

        //When data is to be updated e.g. stop activity
        if(id) {
            const index = activity.findIndex((e) => e.id === id);
            const tempActivity = activity.find((activity) => activity.id === id);
            var tempEndTime = new Date();
            tempActivity.endTime = tempEndTime.toLocaleTimeString();
            tempActivity.duration = helpers.secondsToHms(helpers.timeDiff(tempEndTime, tempActivity.startTime));
            activity[index] = tempActivity;
            this.setState({
                activities: activity,
                activityStopped: true
            });
        } else { //When new activity is added in the list
            let singleActivity = {
                id: this.state.currActivityIndex,
                    description: description,
                    startTime: startTime,
                    endTime: endTime,
                    duration: 0
                };
            if(activity.find((activity) => activity.description === description))
                alert("Activity with this description already exists, kindly add one with different content");
            else {
                activity.push(singleActivity);
                this.setState({
                    activities: activity,
                    currActivityIndex: this.state.currActivityIndex + 1
                });
            }
        }
    }

    startActivity = (description) => {
        this.updateActivity(description, new Date(), '');

    };

    stopActivity = (id) => {
        this.updateActivity('', '', '', id);
    };

    render() {
        return (
            <div className="container-fluid">
                <Header />
                <div className="container content-wrapper">
                    <StartActivity onStartActivity={this.startActivity} />
                    <br/><br/>
                    <div className="row">
                        <div className="col-12">
                            <ActivityGrid stopActivity={this.stopActivity} activityStopped={this.state.activityStopped} activities={this.state.activities}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

