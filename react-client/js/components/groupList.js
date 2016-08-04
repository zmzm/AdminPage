import React, {Component} from 'react';
import {Pagination} from 'react-bootstrap';
import Group from './group';

class GroupList extends Component {
    componentWillMount() {
        this.activePage = 1;
        this.props.fetchGroups();
    }

    renderGroups(groups) {
        return groups.map(function (group) {
            return <Group key={group._id} group={group}/>
        })
    }

    handleSelect(event) {
        this.activePage = event;
        this.props.fetchGroups(event);
    }

    render() {
        const {groups, totalCount} = this.props;
        console.log(this.props);
        return (
            <div>
                <div style=
                         {{backgroundColor:'white',
                         borderRadius: '8px',
                         boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3)'}}>
                    <table className="table table-bordered user-table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Groupname</th>
                            <th>Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderGroups(groups)}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    className={groups.length === 0? 'hidden':'shown'}
                    prev
                    next
                    first
                    last
                    ellipsis
                    items={Math.ceil(totalCount / 5)}
                    activePage={this.activePage}
                    onSelect={this.handleSelect.bind(this)}>
                </Pagination>
            </div>
        );
    }
}

export default GroupList;