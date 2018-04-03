import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../redux/actions';
import requireAuth from '../components/hocs/requireAuth';
class AdminsPage extends Component {
    componentDidMount() {
        const { admins, fetchAdmins } = this.props;
        fetchAdmins();
    }
    renderAdmins() {
        const { admins } = this.props;

        return admins.map(admin => <li key={admin.id}>{admin.name}</li>);
    }
    render() {
        return (
            <div>
                Admins:
                <ul>{this.renderAdmins()}</ul>
            </div>
        );
    }
}

const mapStateToProps = ({ admins }) => {
    return { admins };
};

export default {
    component: connect(mapStateToProps, { fetchAdmins })(
        requireAuth(requireAuth(AdminsPage))
    ),
    loadData: ({ dispatch }) => dispatch(fetchAdmins())
};
