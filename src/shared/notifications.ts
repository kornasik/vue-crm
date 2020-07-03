import { SnackbarProgrammatic as Snackbar } from "buefy";
import { ToastConfig, SnackbarConfig } from "buefy/types/components";

let snackbarSuccessConfig: SnackbarConfig = {
  duration: 5000,
  message: ``,
  position: "is-bottom",
  type: "is-success"
};
let snackbarDangerConfig: SnackbarConfig = {
  duration: 5000,
  message: ``,
  position: "is-bottom",
  type: "is-danger"
};

let snackbarDanger: SnackbarConfig = {
  duration: 5000,
  message: ``,
  position: 'is-bottom',
  type: 'is-danger'
};

function showSnackBar_success(msg: string) {
  const config = snackbarSuccessConfig;
  config.message = msg;
  Snackbar.open(config);
}

function showSnackBar_danger(msg: string) {
  const config = snackbarDangerConfig;
  config.message = msg;
  Snackbar.open(config);
}

let toastSuccessConfig: ToastConfig = {
  duration: 5000,
  message: ``,
  position: "is-bottom",
  type: "is-success"
};
let toastDangerConfig: ToastConfig = {
  duration: 5000,
  message: ``,
  position: "is-bottom",
  type: "is-danger"
};

function showToast_success(msg: string) {
  const config = toastSuccessConfig;
  config.message = msg;
  Snackbar.open(config);
}
function showToast_danger(msg: string) {
  const config = toastDangerConfig;
  config.message = msg;
  Snackbar.open(config);
}

export {
  showSnackBar_success,
  showToast_success,
  showToast_danger,
  showSnackBar_danger
};
