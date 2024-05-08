import { makeAutoObservable } from "mobx";

export default class RoleStore {
  constructor() {
    this._roles = [];
    this._users = [];
    this._popupCreateRole = "none";
    this._popupAddRole = "none";
    this._showAddRole = "none";
    this._showAddUser = "none";
    this._popupDeleteRole = "none";
    this._selectedUser = [];
    this._selectedRole = [];
    makeAutoObservable(this);
  }

  setRoles(role) {
    this._roles = role;
  }
  setUsers(users) {
    this._users = users;
  }
  setShowAddRole(str) {
    this._showAddRole = str;
  }
  setShowAddUser(str) {
    this._showAddUser = str;
  }
  setPopupCreateRole(str) {
    this._popupCreateRole = str;
  }
  setPopupAddRole(str) {
    this._popupAddRole = str;
  }
  setPopupDeleteRole(str) {
    this._popupDeleteRole = str;
  }
  setSelectedUser(user) {
    this._selectedUser = user;
  }
  setSelectedRole(role) {
    this._selectedRole = role;
  }
  get roles() {
    return this._roles;
  }
  get users() {
    return this._users;
  }
  get showAddRole() {
    return this._showAddRole;
  }
  get showAddUser() {
    return this._showAddUser;
  }
  get popupCreateRole() {
    return this._popupCreateRole;
  }
  get popupAddRole() {
    return this._popupAddRole;
  }
  get popupDeleteRole() {
    return this._popupDeleteRole;
  }
  get selectedUser() {
    return this._selectedUser;
  }
  get selectedRole() {
    return this._selectedRole;
  }
}
