import React, { Component } from 'react'

export class AddTodo extends Component {

    state = {
        title: ''
    }
    /**
     * 
     * For single form field
     */
    //onChange = (e) => this.setState({ title: e.target.value });

    /**
     * IF we have multiple form fields we can use this below
     */
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
        e.target.reset();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display:'flex'}}>
                <input type="text" name="title" placeholder="Add Todo ..." style={{flex: '10', padding: '5px'}} value={this.state.value} onChange={this.onChange}/>
                <input type="submit" value="Submit" className="btn" style={{flex: '1' }} />
            </form>
        )
    }
}

export default AddTodo
