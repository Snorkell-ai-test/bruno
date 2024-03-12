import toast from 'react-hot-toast';
import { createSlice } from '@reduxjs/toolkit';
import { getAppInstallDate } from 'utils/common/platform';

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
const getReadNotificationIds = () => {
  try {
    let readNotificationIdsString = window.localStorage.getItem('bruno.notifications.read');
    let readNotificationIds = readNotificationIdsString ? JSON.parse(readNotificationIdsString) : [];
    return readNotificationIds;
  } catch (err) {
    toast.error('An error occurred while fetching read notifications');
  }
};

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
const setReadNotificationsIds = (val) => {
  try {
    window.localStorage.setItem('bruno.notifications.read', JSON.stringify(val));
  } catch (err) {
    toast.error('An error occurred while setting read notifications');
  }
};

const initialState = {
  loading: false,
  notifications: [],
  readNotificationIds: getReadNotificationIds() || []
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setFetchingStatus: (state, action) => {
      state.loading = action.payload.fetching;
    },
    setNotifications: (state, action) => {
      console.log('notifications', notifications);
      let notifications = action.payload.notifications || [];
      let readNotificationIds = state.readNotificationIds;

      // Ignore notifications sent before the app was installed
      let appInstalledOnDate = getAppInstallDate();
      notifications = notifications.filter((notification) => {
        const notificationDate = new Date(notification.date);
        const appInstalledOn = new Date(appInstalledOnDate);

        notificationDate.setHours(0, 0, 0, 0);
        appInstalledOn.setHours(0, 0, 0, 0);

        return notificationDate >= appInstalledOn;
      });

      state.notifications = notifications.map((notification) => {
        return {
          ...notification,
          read: readNotificationIds.includes(notification.id)
        };
      });
    },
    markNotificationAsRead: (state, action) => {
      if (state.readNotificationIds.includes(action.payload.notificationId)) return;

      const notification = state.notifications.find(
        (notification) => notification.id === action.payload.notificationId
      );
      if (!notification) return;

      state.readNotificationIds.push(action.payload.notificationId);
      setReadNotificationsIds(state.readNotificationIds);
      notification.read = true;
    },
    markAllNotificationsAsRead: (state) => {
      let readNotificationIds = state.notifications.map((notification) => notification.id);
      state.readNotificationIds = readNotificationIds;
      setReadNotificationsIds(readNotificationIds);

      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    }
  }
});

export const { setNotifications, setFetchingStatus, markNotificationAsRead, markAllNotificationsAsRead } =
  notificationSlice.actions;

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
export const fetchNotifications = () => (dispatch, getState) => {
  return new Promise((resolve) => {
    const { ipcRenderer } = window;
    dispatch(setFetchingStatus(true));
    ipcRenderer
      .invoke('renderer:fetch-notifications')
      .then((notifications) => {
        dispatch(setNotifications({ notifications }));
        dispatch(setFetchingStatus(false));
        resolve(notifications);
      })
      .catch((err) => {
        dispatch(setFetchingStatus(false));
        console.error(err);
        resolve([]);
      });
  });
};

export default notificationSlice.reducer;
