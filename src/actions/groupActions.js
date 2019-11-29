import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import { Actions, ActionConst } from "react-native-router-flux";

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


export const loadingData = bool => {
  return {
    type: keys.LOADING_DATA,
    loadingData: bool,
  };
};

export const loadingScreen = data => {
  return (dispatch, getState) => {
    Actions.loadingScreen();
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
    groupName: data.groupName,
  };

  return async dispatch => {
    try {

      // Display Loading Screen
      Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.post(API_URL + '/groups', groupData, { headers: { 'authentication': data.token } });
      const newGroupData = {
        groupId: res.data._id,
        token: data.token
      }
      await dispatch(getUserGroups({ token: data.token }));
      dispatch(getActiveGroup(newGroupData));
      dispatch(createGroupDataSuccess(res.data));
      dispatch(createGroupSuccess(true));

    } catch (error) {
      dispatch(createGroupSuccess(false));
      dispatch(createGroupError(err.response.data));
    }
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
  return dispatch => {
    dispatch(searchGroupDataSuccess(data));
    dispatch(searchGroupSuccess(true));
  };
};


/*
*   GET ALL GROUPS FOR LOCAL SEARCH
*/
export const getGroupsSuccess = bool => {
  return {
    type: keys.GET_GROUPS_SUCCESS,
    getGroupsSuccess: bool,
  };
};

export const getGroupsData = data => {
  return {
    type: keys.GET_GROUPS_DATA_SUCCESS,
    getGroupsData: data,
  };
};

export const getGroupsError = data => {
  return {
    type: keys.GET_GROUPS_ERROR,
    getGroupsError: data,
  };
};

export const getGroups = data => {
  return async dispatch => {
    try {
      const res = await axios.get(API_URL + '/groups', { headers: { 'authentication': data.token } });
      dispatch(getGroupsData(res.data));
      dispatch(getGroupsSuccess(true));
    } catch (err) {
      dispatch(getGroupsSuccess(false));
      dispatch(getGroupsError(err.response));
    }
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
  return async dispatch => {
    try {
      const res = await axios.get(API_URL + '/groups/user', { headers: { 'authentication': data.token } });
      dispatch(getUserGroupsDataSuccess(res.data));
      dispatch(getUserGroupsSuccess(true));
    } catch (err) {
      dispatch(getUserGroupsSuccess(false));
      dispatch(getUserGroupsError(err.response));
    }
  };
};

/*
*   GET ACTIVE GROUP
*/
import { connectToGroupChat } from "./groupChatRoomAction"
import { connectToGroupFeed, setGroupFeedData } from "./groupFeedAction"

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
  // Reset all states that relate to the old group and load new group

  return (dispatch, getState) => {
    const newData = {
      token: data.token,
      groupId: data.groupId,
    }

    // Display Loading Screen
    Actions.loadingScreen({ type: ActionConst.RESET });
    // clear groupFeed 
    dispatch(setGroupFeedData(undefined));
    // connect to the new group chat
    dispatch(connectToGroupChat(newData));
    // connect to the new group feed
    dispatch(connectToGroupFeed(newData));
    // Get group member
    dispatch(getGroupMember(newData));


    axios
      .get(API_URL + '/groups/' + data.groupId, { headers: { 'authentication': data.token } })
      .then(res => {
        dispatch(getActiveGroupDataSuccess(res.data));
        dispatch(getActiveGroupSuccess(true));

        // Go to home after loading new group
        Actions.navTab({ type: ActionConst.RESET });
      })
      .catch(err => {
        //console.log(err.response.data)
        Actions.initial({ type: ActionConst.RESET });
        dispatch(getActiveGroupSuccess(false));
        dispatch(getActiveGroupError(err.response));
      });
  };
};

export const getActiveGroupNoLoadingScreen = data => {
  // Reset all states that relate to the old group and load new group
  return async (dispatch, getState) => {
    try {
      const newData = {
        token: data.token,
        groupId: data.groupId,
      }

      // clear groupFeed 
      dispatch(setGroupFeedData([]));
      // connect to the new group chat
      dispatch(connectToGroupChat(newData));
      // connect to the new group feed
      dispatch(connectToGroupFeed(newData));
      // Get group member
      dispatch(getGroupMember(newData));

      const res = await axios.get(API_URL + '/groups/' + data.groupId, { headers: { 'authentication': data.token } });

      dispatch(getActiveGroupDataSuccess(res.data));
      dispatch(getActiveGroupSuccess(true));

    } catch (err) {
      console.log(err)
      Actions.initial({ type: ActionConst.RESET });
      dispatch(getActiveGroupSuccess(false));
      dispatch(getActiveGroupError(err.response));
    }
  };
};


export const getActiveGroupRefreshDataOnly = data => {
  // Reset all states that relate to the old group and load new group
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(API_URL + '/groups/' + data.groupId, { headers: { 'authentication': data.token } });

      dispatch(getActiveGroupDataSuccess(res.data));
      dispatch(getActiveGroupSuccess(true));

    } catch (err) {
      console.log(err.response.data)
      Actions.initial({ type: ActionConst.RESET });
      dispatch(getActiveGroupSuccess(false));
      dispatch(getActiveGroupError(err.response));
    }
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
*   GET EDITING GROUP MEMBER
*/
export const getEditingGroupMemberSuccess = bool => {
  return {
    type: keys.GET_EDITING_GROUP_MEMBER_SUCCESS,
    getEditingGroupMemberStatus: bool,
  };
};

export const getEditingGroupMemberDataSuccess = data => {
  return {
    type: keys.GET_EDITING_GROUP_MEMBER_DATA,
    getEditingGroupMemberData: data,
  };
};

export const getEditingGroupMemberError = data => {
  return {
    type: keys.GET_EDITING_GROUP_MEMBER_ERROR,
    getEditingGroupMemberError: data,
  };
};

export const getEditingGroupMember = data => {
  return async dispatch => {
    try {
      const res = await axios.get(API_URL + '/groups/' + data.groupId + '/member', { headers: { 'authentication': data.token } });
      dispatch(getEditingGroupMemberDataSuccess(res.data));
      dispatch(getEditingGroupMemberSuccess(true));
    } catch (err) {
      console.log(err.response.data)
      dispatch(getEditingGroupMemberSuccess(false));
      dispatch(getEditingGroupMemberError(err.response.data));
    }
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
  return async (dispatch) => {
    try {
      const res = await axios.post(API_URL + '/groups/' + data.groupId + '/join', {}, { headers: { 'authentication': data.token } });

      await dispatch(getUserGroups({ token: data.token }));
      await dispatch(getGroups({ token: data.token }));

      dispatch(requestToJoinGroupDataSuccess(res.data));
      dispatch(requestToJoinGroupSuccess(true));
    } catch (err) {
      dispatch(requestToJoinGroupSuccess(false));
      dispatch(requestToJoinGroupError(err.response.data));
    }
  }
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
    pendingUserId: data.pendingUserId,
  }
  return dispatch => {
    axios
      .post(API_URL + '/groups/' + data.groupId + '/reviewPending', accepted, { headers: { 'authentication': data.token } })
      .then(res => {
        dispatch(allJoinGroupRequestsSuccess(false));
        dispatch(reviewJoinGroupRequestsDataSuccess(res.data));
        dispatch(reviewJoinGroupRequestsSuccess(true));
      })
      .catch(err => {
        console.log(err.response.data)
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
 *   GET BANED USER FROM GROUP
 */

export const bannedUserData = data => {
  return {
    type: keys.BANNED_USER_DATA,
    bannedUserData: data
  };
};

export const getBannedUsers = data => {
  return async dispatch => {
    try {
      const res = await axios.get(API_URL + '/groups/' + data.groupId + '/ban', { headers: { 'authentication': data.token } });
      dispatch(bannedUserData(res.data));
    } catch (err) {
      console.log(err.response)
    }
  };
};

/*
 *   BAN MEMBER FROM GROUP
 */
export const banMemberFromGroup = data => {
  return async dispatch => {
    try {
      // Display Loading Screen
      Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.post(API_URL + '/groups/' + data.groupId + '/banMember/' + data.memberId, {}, { headers: { 'authentication': data.token } });
      await dispatch(getEditingGroupMember({
        token: data.token,
        groupId: data.groupId,
      }));

      // Go to home after loading new group
      Actions.navTab({ type: ActionConst.RESET });
      // Go to myGroups
      Actions.myGroupsMenu();
      // Go to Edit Group Menu
      Actions.editGroupMenu();
      // Go to Member List
      Actions.groupMembersListMenu();
    } catch (err) {
      console.log(err.response)
    }
  };
};

/*
 *   BAN USER FROM GROUP
 */
export const banUserFromGroup = data => {
  return async dispatch => {
    try {
      const res = await axios.post(API_URL + '/groups/' + data.groupId + '/ban/' + data.pendingUserId, {}, { headers: { 'authentication': data.token } });
    } catch (err) {
      console.log(err.response)
    }
  };
};

/*
 *   UN-BAN USER FROM GROUP
 */
export const unBanUserFromGroup = data => {
  return async dispatch => {
    try {
      const res = await axios.delete(API_URL + '/groups/' + data.groupId + '/ban/' + data.userId, { headers: { 'authentication': data.token } });
    } catch (err) {
    }
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
    groupImg: data.groupImg,
    groupIsPublic: data.groupIsPublic,
  };

  return async dispatch => {
    try {
      // Display Loading Screen
      Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.put(API_URL + '/groups/' + data.groupId, groupData, { headers: { 'authentication': data.token } });

      dispatch(updateGroupDataSuccess(res.data));
      dispatch(updateGroupSuccess(true));

      await dispatch(getGroups({ token: data.token }))
      await dispatch(getUserGroups({ token: data.token }));
      // Refresh active group if active group is the updated group
      if (data.activeGroupId == data.groupId) {
        await dispatch(getActiveGroupRefreshDataOnly({ groupId: data.activeGroupId, token: data.token }));
      }

      // Go to home after loading new group
      Actions.navTab({ type: ActionConst.RESET });
      // Go to myGroups
      Actions.myGroupsMenu();

    } catch (err) {
      dispatch(updateGroupSuccess(false));
      dispatch(updateGroupError(err.response.data));
    }
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
  let deleteByMember = "";
  if (data.memberId) {
    deleteByMember = "/" + data.memberId;
  }
  return async dispatch => {
    try {
      // Display Loading Screen
      Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.delete(API_URL + '/groups/' + data.groupId + '/member' + deleteByMember, { headers: { 'authentication': data.token } });
      await dispatch(getUserGroups({ token: data.token }));
      await dispatch(getGroups({ token: data.token }));
      dispatch(leaveGroupDataSuccess(res.data));
      dispatch(leaveGroupSuccess(true));

      if (data.activeGroupId == data.groupId) {
        // Clear active group data
        dispatch(getActiveGroupSuccess(false));
        dispatch(getActiveGroupDataSuccess(""));
        dispatch(getActiveGroupError(""));

        // Go to initial select group page if deleting active group
        Actions.initial({ type: ActionConst.RESET });
      } else {
        // Go to home after loading new group
        Actions.navTab({ type: ActionConst.RESET });
        // Go to myGroups
        Actions.myGroupsMenu();
      }

    } catch (err) {
      // Clear active group data
      dispatch(getActiveGroupSuccess(false));
      dispatch(getActiveGroupDataSuccess(""));
      dispatch(getActiveGroupError(""));

      // Go to initial select group page if deleting active group
      Actions.initial({ type: ActionConst.RESET });

      console.log(err.response);
      dispatch(leaveGroupSuccess(false));
      dispatch(leaveGroupError(err.response.data));
    }
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
  return async dispatch => {
    try {
      // Display Loading Screen
      Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.delete(API_URL + '/groups/' + data.groupId, { headers: { 'authentication': data.token } });

      // Refresh user groups after deleting group
      await dispatch(getUserGroups({ token: data.token }));
      await dispatch(getGroups({ token: data.token }))
      dispatch(deleteGroupDataSuccess(res.data));
      dispatch(deleteGroupSuccess(true));

      if (data.activeGroupId == data.groupId) {
        // Clear active group data
        dispatch(getActiveGroupSuccess(false));
        dispatch(getActiveGroupDataSuccess(""));
        dispatch(getActiveGroupError(""));

        // Go to initial select group page if deleting active group
        Actions.initial({ type: ActionConst.RESET });
      } else {
        // Go to home after loading new group
        Actions.navTab({ type: ActionConst.RESET });
        // Go to myGroups
        Actions.myGroupsMenu();
      }
    } catch (err) {
      // If error send to initial select group page
      Actions.initial({ type: ActionConst.RESET });
      dispatch(deleteGroupSuccess(false));
      dispatch(deleteGroupError(err.response.data));
    }
  };
};
