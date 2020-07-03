import { ToastProgrammatic as Toast } from "buefy";
import { SnackbarProgrammatic as Snackbar } from "buefy";
import { ToastConfig, SnackbarConfig } from "buefy/types/components";
import {
  permissionsGroupsresponse,
  permissionsModulesResponse,
  permissionsUsersResponse
} from "../stubs";
import { showToast_danger } from "@/shared/notifications";

export default (error: any) => {
  if (error && error.response && error.response.status) {
    switch (error.response.status) {
      case 400: {
        let toastConfig: SnackbarConfig = {
          duration: 5000,
          message: `Nothing to display. Data Not Found. Error status \n ${error.response.status}`,
          position: "is-bottom",
          type: "is-danger"
        };
        Snackbar.open(toastConfig);
        break;
      }
      case 401: {
        showToast_danger(
          `Please login again. Session Expired. Error status \n ${error.response.status}`
        );
        localStorage.removeItem(`token`);
        break;
      }
      default: {
        let toastConfig: SnackbarConfig = {
          duration: 5000,
          message: `Server Error. Error status: \n ${error.response.status}`,
          position: "is-bottom",
          type: "is-danger"
        };
        Snackbar.open(toastConfig);
        showToast_danger(
          `Server Error. Error status. Error status \n ${error.response.status}`
        );
      }
    }
  } else if (error && error.response === undefined) {
    showToast_danger(`Page not found. Check the url. Error status 404`);
    switch (error.config.url) {
      case "http://api.ohi-s.by/permissions/groups/list": {
        let res = JSON.parse(
          localStorage.getItem("permissionsGroupsresponse") as string
        );
        if (!res) {
          localStorage.setItem(
            "permissionsGroupsresponse",
            JSON.stringify(permissionsGroupsresponse)
          );
          res = JSON.parse(
            localStorage.getItem("permissionsGroupsresponse") as string
          );
        }
        return Promise.resolve(res);
      }
      case "http://api.ohi-s.by/permissions/modules/list": {
        return Promise.resolve(permissionsModulesResponse);
      }
      case "http://api.ohi-s.by/permissions/groups": {
        return Promise.reject();
      }
      case "http://api.ohi-s.by/permissions/users/list": {
        let res = JSON.parse(
          localStorage.getItem("permissionsUsersResponse") as string
        );
        if (!res) {
          localStorage.setItem(
            "permissionsUsersResponse",
            JSON.stringify(permissionsUsersResponse)
          );
          res = JSON.parse(
            localStorage.getItem("permissionsUsersResponse") as string
          );
        }
        return Promise.resolve(res);
      }
    }
  }
  return Promise.reject(error);
};
