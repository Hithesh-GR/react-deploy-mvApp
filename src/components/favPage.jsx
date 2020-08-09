import React from "react";
import { Button } from '@material-ui/core';
import "../App.css";
export default class favPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleBack = e => {
        try {
            e.preventDefault();
            this.props.history.push('/');
        } catch (err) {
            console.log("error at handleBack");
        }
    };
    render() {
        return (
            <div className="dashboard">
                <div style={{ marginRight: "96%" }}>
                    <Button variant="contained" size="large" onClick={this.handleBack}>Back</Button>
                </div>
                {this.props.allMovies}
            </div>
        );
    }
}
