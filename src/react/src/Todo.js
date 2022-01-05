import React, { Component } from 'react';
import { Header, Message, Table } from 'semantic-ui-react';

import { API_BASE_URL } from './config'

class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: null,
            isLoading: null
        };
    }

    componentDidMount() {
        this.getTodo();
    }

    async getTodo() {
        if (! this.state.todos) {
            try {
                this.setState({ isLoading: true });
                const accessToken = this.props.authState.accessToken;
                const response = await fetch(API_BASE_URL + '/todo', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const todoList = await response.json();
                this.setState({ todos: todoList.data, isLoading: false});
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div>
                <Header as="h1">Players</Header>
                {this.state.isLoading && <Message info header="Loading todo list..." />}
                {this.state.todos &&
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.todos.map(
                                    todo =>
                                        <tr id={todo.id} key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.name}</td>
                                            <td>
                                                Action buttons placeholder
                                            </td>
                                        </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        );
    }

};

export default Todo;