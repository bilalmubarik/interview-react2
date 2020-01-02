import React from 'react';
import helpers from '../helpers';

class SecondTicker extends React.Component {
    constructor(props) {
        super(props);

        var duration = 0;

        //Passing prop 'duration' to see if page was reloaded
        //so that duration can be continued from there 
        if(this.props.duration)
            duration = this.props.duration;

        this.state = {
            duration: duration,
            stopActivity: false
        };

        //Passing prop 'activityStopped' to see if activity
        //has stopped
        if (this.props.activityStopped) {
            this.setState({ stopActivity: true });
        }
    }
    componentDidMount() {
        if (this.state.stopActivity === false)
            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            duration: this.state.duration+1
        });
    }
    
    render() {
        return helpers.secondsToHms(this.state.duration);
    }
}

export default SecondTicker;