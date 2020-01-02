import React from 'react';
import Button from './assets/Button';

class StartActivity extends React.Component {
    state = { description: '' };

    //Passing state description to parent class for
    //state management and adding activity record
    onFormSubmit = event => {
        event.preventDefault();

        if (this.state.description === '')
            alert('Kindly add description before submitting');
        else
            this.props.onStartActivity(this.state.description);

        //Clearing description field after form subission
        this.setState({description: ''})
    };

    render() {
        return (
            <div className="row">
                <div className="col-5">
                    <h4>Start Activity</h4>
                    <form onSubmit={this.onFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                value={this.state.description}
                                onChange={e => this.setState({ description: e.target.value })}
                                placeholder="Enter description" />
                        </div>
                        <Button btnType="submit" btnDesign="btn-primary" btnName="Start Activity" />
                    </form>
                </div>
            </div>
        )
    }
};

export default StartActivity;