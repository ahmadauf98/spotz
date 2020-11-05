export const state = () => ({
  notification: {
    alert: '',
    alertIcon: '',
    alertIconStyle: '',
    snackbar: false,
    timeout: 5000,
  },
})

export const mutations = {
  SET_NOTIFICATION(state, { alert, alertIcon, alertIconStyle, snackbar }) {
    state.notification.alert = alert
    state.notification.alertIcon = alertIcon
    state.notification.alertIconStyle = alertIconStyle
    state.notification.snackbar = snackbar
  },
}
