import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import keys from '../data/key';

/* Routes
 *
 * GROUP
 * -----
 * Create Group
 * Search Group
 * GET ACTIVE GROUP
 * ADD GROUP MEMBER
 * GET GROUP MEMBER
 * LEAVE GROUP
 * DELETE GROUP
 *
 */
export const getGroupById = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(getGroupDataSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

/*
 *   CREATE GROUP
 */
export const createGroupSuccess = bool => {
  return {
    type: keys.CREATE_GROUP_SUCCESS,
    status: bool
  };
};

export const createGroupDataSuccess = data => {
  return {
    type: keys.CREATE_GROUP_DATA_SUCCESS,
    data: data
  };
};

export const createGroupError = data => {
  return {
    type: keys.CREATE_GROUP_ERROR,
    error: data
  };
};

export const createGroup = data => {
  let groupData = {
    groupName: data.groupName
  };

  console.log(data);

  return dispatch => {
    axios
      .post(API_URL + '/groups', groupData, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(createGroupDataSuccess(res.data));
        dispatch(createGroupSuccess(true));
      })
      .catch(err => {
        dispatch(createGroupSuccess(false));
        dispatch(createGroupError(err.response.data));
      });
  };
};

/*
 *   SEARCH FOR GROUP
 */
export const searchGroupSuccess = bool => {
  return {
    type: keys.SEARCH_GROUP_SUCCESS,
    searchStatus: bool
  };
};

export const searchGroupDataSuccess = data => {
  return {
    type: keys.SEARCH_GROUP_DATA_SUCCESS,
    searchData: data
  };
};

export const searchGroupError = data => {
  return {
    type: keys.SEARCH_GROUP_ERROR,
    searchGroupError: data
  };
};

export const searchGroup = data => {
  let searchArg = {
    groupName: data.groupName
  };

  return dispatch => {
    axios
      .post(API_URL + '/groups/search', searchArg, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        console.log('search Group Response: ', res);
        dispatch(searchGroupDataSuccess(res.data));
        dispatch(searchGroupSuccess(true));
      })
      .catch(err => {
        dispatch(searchGroupSuccess(false));
        dispatch(searchGroupError(err.response));
      });
  };
};

/*
 *   GET GROUPS THAT A USER IS A MEMBER
 */
export const getUserGroupsSuccess = bool => {
  return {
    type: keys.GET_USER_GROUP_SUCCESS,
    getUserGroupsStatus: bool
  };
};

export const getUserGroupsDataSuccess = data => {
  return {
    type: keys.GET_USER_GROUP_DATA_SUCCESS,
    getUserGroupsData: data
  };
};

export const getUserGroupsError = data => {
  return {
    type: keys.GET_USER_GROUP_ERROR,
    getUserGroupsError: data
  };
};

export const getUserGroups = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/user', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(getUserGroupsDataSuccess(res.data));
        dispatch(getUserGroupsSuccess(true));
      })
      .catch(err => {
        dispatch(getUserGroupsSuccess(false));
        dispatch(getUserGroupsError(err.response));
      });
  };
};

/*
 *   GET ACTIVE GROUP
 */
export const getActiveGroupSuccess = bool => {
  return {
    type: keys.GET_ACTIVE_GROUP_SUCCESS,
    getActiveGroupStatus: bool
  };
};

export const getActiveGroupDataSuccess = data => {
  return {
    type: keys.GET_ACTIVE_GROUP_DATA_SUCCESS,
    getActiveGroupData: data
  };
};

export const getActiveGroupError = data => {
  return {
    type: keys.GET_ACTIVE_GROUP_ERROR,
    getActiveGroupError: data
  };
};

export const getActiveGroup = data => {
  console.log(data);
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(getActiveGroupDataSuccess(res.data));
        dispatch(getActiveGroupSuccess(true));
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(getActiveGroupSuccess(false));
        dispatch(getActiveGroupError(err.response));
      });
  };
};

/*
 *   CHECK IF GROUP EXISTS
 */
export const groupExistsSuccess = bool => {
  return {
    type: keys.GROUP_EXISTS_SUCCESS,
    groupExistsStatus: bool
  };
};

export const groupExists = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId + '/exists', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(groupExistsSuccess(true));
      })
      .catch(err => {
        dispatch(groupExistsSuccess(false));
      });
  };
};

/*
 *   Add GROUP MEMBER
 */
export const addGroupMemberSuccess = bool => {
  return {
    type: keys.ADD_GROUP_MEMBER_SUCCESS,
    addGroupMemberStatus: bool
  };
};

export const addGroupMemberDataSuccess = data => {
  return {
    type: keys.ADD_GROUP_MEMBER_DATA_SUCCESS,
    addGroupMemberData: data
  };
};

export const addGroupMemberError = data => {
  return {
    type: keys.ADD_GROUP_MEMBER_ERROR,
    addGroupMemberError: data
  };
};

export const addGroupMember = data => {
  return dispatch => {
    axios
      .post(
        API_URL + '/groups/' + data.groupId,
        { newGroupMember: data.newGroupMember },
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        dispatch(addGroupMemberDataSuccess(res.data));
        dispatch(addGroupMemberSuccess(true));
      })
      .catch(err => {
        dispatch(addGroupMemberSuccess(false));
        dispatch(addGroupMemberError(err.response.data));
      });
  };
};

/*
 *   GET GROUP MEMBER
 */
export const getGroupMemberSuccess = bool => {
  return {
    type: keys.GET_GROUP_MEMBER_SUCCESS,
    getGroupMemberStatus: bool
  };
};

export const getGroupMemberDataSuccess = data => {
  return {
    type: keys.GET_GROUP_MEMBER_DATA_SUCCESS,
    getGroupMemberData: data
  };
};

export const getGroupMemberError = data => {
  return {
    type: keys.GET_GROUP_MEMBER_ERROR,
    getGroupMemberError: data
  };
};

export const getGroupMember = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId + '/member', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(getGroupMemberDataSuccess(res.data));
        dispatch(getGroupMemberSuccess(true));
      })
      .catch(err => {
        dispatch(getGroupMemberSuccess(false));
        dispatch(getGroupMemberError(err.response.data));
      });
  };
};

/*
 *   UPDATE GROUP MEMBER
 */
export const updateGroupMemberSuccess = bool => {
  return {
    type: keys.UPDATE_GROUP_MEMBER_SUCCESS,
    updateGroupMemberStatus: bool
  };
};

export const updateGroupMemberDataSuccess = data => {
  return {
    type: keys.UPDATE_GROUP_MEMBER_DATA_SUCCESS,
    updateGroupMemberData: data
  };
};

export const updateGroupMemberError = data => {
  return {
    type: keys.UPDATE_GROUP_MEMBER_ERROR,
    updateGroupMemberError: data
  };
};

export const updateGroupMember = data => {
  let newData = {
    memberId: data.memberId,
    groupRolePermisionLevel: data.groupRolePermisionLevel
  };
  return dispatch => {
    axios
      .put(API_URL + '/groups/' + data.groupId + '/member', newData, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(updateGroupMemberDataSuccess(res.data));
        dispatch(updateGroupMemberSuccess(true));
      })
      .catch(err => {
        dispatch(updateGroupMemberSuccess(false));
        dispatch(updateGroupMemberError(err.response.data));
      });
  };
};

/*
 *   GET All GROUP MEMBER
 */
export const getAllGroupMemberSuccess = bool => {
  return {
    type: keys.GET_ALL_GROUP_MEMBER_SUCCESS,
    getAllGroupMemberStatus: bool
  };
};

export const getAllGroupMemberDataSuccess = data => {
  return {
    type: keys.GET_ALL_GROUP_MEMBER_DATA_SUCCESS,
    getAllGroupMemberData: data
  };
};

export const getAllGroupMemberError = data => {
  return {
    type: keys.GET_ALL_GROUP_MEMBER_ERROR,
    getAllGroupMemberError: data
  };
};

export const getAllGroupMember = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId + '/allmembers', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(getAllGroupMemberDataSuccess(res.data));
        dispatch(getAllGroupMemberSuccess(true));
      })
      .catch(err => {
        dispatch(getAllGroupMemberSuccess(false));
        dispatch(getAllGroupMemberError(err.response.data));
      });
  };
};

/*
 *   REQUEST TO JOIN GROUP
 */
export const requestToJoinGroupSuccess = bool => {
  return {
    type: keys.REQUEST_TO_JOIN_GROUP_SUCCESS,
    getRequestToJoinGroupStatus: bool
  };
};

export const requestToJoinGroupDataSuccess = data => {
  return {
    type: keys.REQUEST_TO_JOIN_GROUP_DATA_SUCCESS,
    getRequestToJoinGroupData: data
  };
};

export const requestToJoinGroupError = data => {
  return {
    type: keys.REQUEST_TO_JOIN_GROUP_ERROR,
    getRequestToJoinGroupError: data
  };
};

export const requestToJoinGroup = data => {
  return dispatch => {
    axios
      .post(
        API_URL + '/groups/' + data.groupId + '/join',
        {},
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        dispatch(requestToJoinGroupDataSuccess(res.data));
        dispatch(requestToJoinGroupSuccess(true));
      })
      .catch(err => {
        dispatch(requestToJoinGroupSuccess(false));
        dispatch(requestToJoinGroupError(err.response.data));
      });
  };
};

/*
 *   REVIEW JOIN GROUP REQUESTS
 */
export const reviewJoinGroupRequestsSuccess = bool => {
  return {
    type: keys.REVIEW_JOIN_GROUP_REQUESTS_SUCCESS,
    getReviewJoinGroupRequestsStatus: bool
  };
};

export const reviewJoinGroupRequestsDataSuccess = data => {
  return {
    type: keys.REVIEW_JOIN_GROUP_REQUESTS_DATA_SUCCESS,
    getReviewJoinGroupRequestsData: data
  };
};

export const reviewJoinGroupRequestsError = data => {
  return {
    type: keys.REVIEW_JOIN_GROUP_REQUESTS_ERROR,
    getReviewJoinGroupRequestsError: data
  };
};

export const reviewJoinGroupRequests = data => {
  let accepted = {
    status: data.status,
    pendingUserId: data.pendingUserId
  };
  return dispatch => {
    axios
      .post(API_URL + '/groups/' + data.groupId + '/reviewPending', accepted, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(reviewJoinGroupRequestsDataSuccess(res.data));
        dispatch(reviewJoinGroupRequestsSuccess(true));
      })
      .catch(err => {
        dispatch(reviewJoinGroupRequestsSuccess(false));
        dispatch(reviewJoinGroupRequestsError(err.response.data));
      });
  };
};

/*
 *   GET ALL JOIN GROUP REQUESTS
 */
export const allJoinGroupRequestsSuccess = bool => {
  return {
    type: keys.GET_ALL_JOIN_GROUP_REQUESTS_SUCCESS,
    getAllJoinGroupRequestsStatus: bool
  };
};

export const allJoinGroupRequestsDataSuccess = data => {
  return {
    type: keys.GET_ALL_JOIN_GROUP_REQUESTS_DATA_SUCCESS,
    getAllJoinGroupRequestsData: data
  };
};

export const allJoinGroupRequestsError = data => {
  return {
    type: keys.GET_ALL_JOIN_GROUP_REQUESTS_ERROR,
    getAllJoinGroupRequestsError: data
  };
};

export const getAllJoinGroupRequests = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId + '/reviewPending', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(allJoinGroupRequestsDataSuccess(res.data));
        dispatch(allJoinGroupRequestsSuccess(true));
      })
      .catch(err => {
        dispatch(allJoinGroupRequestsSuccess(false));
        dispatch(allJoinGroupRequestsError(err.response.data));
      });
  };
};

/*
 * UPDATE GROUP
 */
export const updateGroupSuccess = bool => {
  return {
    type: keys.UPDATE_GROUP_SUCCESS,
    updateGroupStatus: bool
  };
};

export const updateGroupDataSuccess = data => {
  return {
    type: keys.UPDATE_GROUP_DATA_SUCCESS,
    updateGroupData: data
  };
};

export const updateGroupError = data => {
  return {
    type: keys.UPDATE_GROUP_ERROR,
    updateGroupError: data
  };
};

export const updateGroup = data => {
  let groupData = {
    groupName: data.groupName,
    groupDescription: data.groupDescription,
    groupImg: data.groupImg
  };

  return dispatch => {
    axios
      .put(API_URL + '/groups/' + data.groupId, groupData, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(updateGroupDataSuccess(res.data));
        dispatch(updateGroupSuccess(true));
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(updateGroupSuccess(false));
        dispatch(updateGroupError(err.response.data));
      });
  };
};

/*
 *   LEAVE GROUP
 */
export const leaveGroupSuccess = bool => {
  return {
    type: keys.LEAVE_GROUP_SUCCESS,
    leaveGroupStatus: bool
  };
};

export const leaveGroupDataSuccess = data => {
  return {
    type: keys.LEAVE_GROUP_DATA_SUCCESS,
    leaveGroupData: data
  };
};

export const leaveGroupError = data => {
  return {
    type: keys.LEAVE_GROUP_ERROR,
    leaveGroupError: data
  };
};

export const leaveGroup = data => {
  let deleteByMember = '';
  if (data.memberId) {
    deleteByMember = '/' + data.memberId;
  }
  return dispatch => {
    axios
      .delete(
        API_URL + '/groups/' + data.groupId + '/member' + deleteByMember,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        dispatch(leaveGroupDataSuccess(res.data));
        dispatch(leaveGroupSuccess(true));
      })
      .catch(err => {
        dispatch(leaveGroupSuccess(false));
        dispatch(leaveGroupError(err.response.data));
      });
  };
};

/*
 *   DELETE GROUP
 */
export const deleteGroupSuccess = bool => {
  return {
    type: keys.DELETE_GROUP_SUCCESS,
    deleteGroupStatus: bool
  };
};

export const deleteGroupDataSuccess = data => {
  return {
    type: keys.DELETE_GROUP_DATA_SUCCESS,
    deleteGroupData: data
  };
};

export const deleteGroupError = data => {
  return {
    type: keys.DELETE_GROUP_ERROR,
    deleteGroupError: data
  };
};

export const deleteGroup = data => {
  return dispatch => {
    axios
      .delete(API_URL + '/groups/' + data.groupId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(deleteGroupDataSuccess(res.data));
        dispatch(deleteGroupSuccess(true));
      })
      .catch(err => {
        dispatch(deleteGroupSuccess(false));
        dispatch(deleteGroupError(err.response.data));
      });
  };
};
