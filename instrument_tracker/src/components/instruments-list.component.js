import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Instrument = props => (   //  Switch statement?
    <tr>
        <td>{props.instrument.username}</td>
        <td>{props.instrument.description}</td>
        <td>{props.instrument.duration}</td>
        <td>{props.instrument.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.instrument._id}>edit</Link> | <a href="#" onClick={() => {props.deleteInstrument(props.instrument._id)}}>delete</a>
        </td>
    </tr>
)

export default class InstrumentsList extends Component {
    constructor(props) {
        super(props);

        this.deleteInstrument = this.deleteInstrument.bind(this);

        this.state = {instruments: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/instruments/')
            .then(res => {
                this.setState({instruments: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteInstrument(id) {  //  Doesn't actually delete from database so it shows up again
        axios.delete('http://localhost:5000/exercisses/' + id)
            .then(res => console.log(res.data));

        this.setState({
            instruments: this.state.instruments.filter(el => el._id !== id)
        })
    }

    instrumentList() {
        return this.state.instruments.map(currentInstrument => {
            return <Instrument instrument={currentInstrument} deleteInstrument={this.deleteInstrument} key={currentInstrument._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Instrument Practice</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.instrumentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}