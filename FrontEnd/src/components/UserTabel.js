import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUser, updateUser, deleteUsers } from "../actions/UserActions";
import { USER_TABEL_COLUMNS } from '../common/TabelHeads';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Table from "../common/Tabel";
import CreateUser from './CreateUser'
import "./UserTabel.css";


class StandardTabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
            showSearch: false,
            diplayedUserList: [],

            //Default data send to API
            APIdata: {
                pageNo: 1,
                pageLimit: "",
                searchBy: "",
                searchFor: "",
                sortBy: "firstName",
                sortType: -1,
            },

            defaultSorted: [{
                dataField: "date",
                order: "desc"
            }],
            deleteFlag: false,
            show: false
        };
        this.selectForDelete = [];
        this.deleteLength = "";
    }

    //Call UserList API for fetch the list of alert history of
    getUserList() {
        var self = this;
        self.props.getAllUser(this.state.APIdata, function (response) {
            self.setState({
                displayedUserList: response.data,
                showSearch: true,
                showLoader: false
            });
        });
    }

    /**
    * @desc Calling a Action with Default props
    */
    componentWillMount() {
        this.getUserList();
    }

    /**
     * @name searchHandler
     * @param {} event
     * @desc applies search operation in tabel
     */
    searchHandler = (event) => {

        //getting a input value
        let searchQuery = event.target.value.toLowerCase();

        //search in a userList & set a result in displayedUsers
        let displayedUsers = this.state.displayedUserList.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
            displayedUserList: displayedUsers
        })

    };

    /**
     * @name toggleSearch
     * @param {}
     * @desc OnClick hide the the search
     */
    toggleSearch = () => {
        this.setState({
            showSearch: !this.state.showSearch,
            displayedUserList: this.state.displayedUserList
        }, () => {
            if (this.searchInput) {
                this.searchInput.focus();
            }
        });
    }

    //On press Esc hide the search field
    handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            this.setState({ showSearch: false, displayedAlertHistoryList: this.state.alertHistoryList });
        }
    }

    /**
     * It is pass as a props of a Tabel
     * @desc Create the cell Edit functionality in to the tabel 
     */
    cellEdit = cellEditFactory({
        mode: 'click',
        afterSaveCell: (oldValue, newValue, row, column) => {
            const data = {
                _id: row._id,
                dataField: column.dataField,
                newValue: newValue,

            }
            this.props.updateUser(data, () => {
                window.location.reload();
            })
        }
    })

    /**
     * It is pass as a props of a Tabel
     * @desc selectRow for performing delete operation
     */
    selectRow = {
        mode: "checkBox",
        clickToSelect: true,
        clickToEdit: true,
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                this.selectForDelete.push(row._id);
            } else {
                this.selectForDelete.pop(row._id)
            }
        }
    };

    /**
     * @name deleteAllSelectedUsers
     * @param
     * @desc first take confirmation ,If true(Ok) then perform deletion of Users
     * @returns false If confirmation false(cancel)
     */
    deleteAllSelectedUsers = () => {
        if (this.selectForDelete.length === 0) {
            alert("please select users for delete operation first !!")
        } else {

            //alert to confirm the action
            var confirmation = window.confirm("Do you want to delete the users?");
        }

        //If Confirmation is true then only Calling A delete Action 
        if (confirmation == true) {
            this.props.deleteUsers(this.selectForDelete, () => {

                //Reload the window after Deletion
                window.location.reload();
            })
        } else {
            return false;
        }
    }


    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
    render() {
        if (this.state.showLoader === true) {
            return <h1>Loading...</h1>
        }
        return (
            <div>
                {this.state.showSearch &&
                    <div className="input-form-group search-container">
                        <h3>Search</h3>
                        <div className="input-group ">
                            <div className="input-group form-group mb-0">
                                <div className="input-form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-primary"><i className="fa fa-search"></i></span>
                                        </div>
                                        <input
                                            ref={(input) => { this.searchInput = input; }}
                                            name="search"
                                            placeholder="Search"
                                            className="form-control d-inline"
                                            onChange={this.searchHandler}
                                            onKeyDown={this.handleKeyDown}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text btn btn-primary search-close" onClick={this.toggleSearch}>
                                                <i className="fa fa-window-close mr-0"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="container">
                    <div className="container-header row">
                        <div className="col"><h3>User Tabel</h3></div>
                        {!this.state.showSearch &&
                            <div className="btn btn-primary col-auto mr-3" onClick={this.toggleSearch}>
                                <i className="fa fa-search"></i>
                            </div>
                        }
                    </div>
                    <button className="btn btn-md btn-danger float-left deleteBtn " onClick={() => { this.deleteAllSelectedUsers() }}>Delete Selected Users</button>
                    
                    {/* Create User Btn Call a seperate Component */}
                    <CreateUser />
                    <Table
                        data={this.state.displayedUserList}
                        exportCSV={true}
                        action={true}
                        columns={USER_TABEL_COLUMNS}
                        keyField='email'
                        defaultSorted={this.state.defaultSorted}
                        cellEdit={this.cellEdit}
                        selectRow={this.selectRow}
                    />
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {

    let returnObj = {};
    returnObj.usersList = state.users.userList;
    return returnObj;
}

export default connect(mapStateToProps, { getAllUser, updateUser, deleteUsers })(StandardTabel);