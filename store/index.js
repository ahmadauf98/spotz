export const state = () => ({
  notification: {
    alert: '',
    alertIcon: '',
    alertIconStyle: '',
    colorIcon: '',
    snackbar: false,
    timeout: 5000,
  },
})

export const mutations = {
  SET_NOTIFICATION(
    state,
    { alert, alertIcon, alertIconStyle, colorIcon, snackbar }
  ) {
    state.notification.alert = alert
    state.notification.alertIcon = alertIcon
    state.notification.alertIconStyle = alertIconStyle
    state.notification.colorIcon = colorIcon
    state.notification.snackbar = snackbar
  },
}
