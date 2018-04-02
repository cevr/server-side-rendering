import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/actions';

class UsersList extends Component {
    componentDidMount() {
        console.log('hey');
        this.props.fetchUsers();
    }

    renderUsers() {
        const { users } = this.props;

        return users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }

    render() {
        return (
            <div>
                Users:
                <ul>{this.renderUsers()}</ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { users } = state;
    return { users };
};

export default {
    component: connect(mapStateToProps, { fetchUsers })(UsersList),
    loadData: ({ dispatch }) => dispatch(fetchUsers())
};
