import { ToastProgrammatic as Toast } from "buefy";
import { SnackbarProgrammatic as Snackbar } from "buefy";
import { ToastConfig, SnackbarConfig } from "buefy/types/components";

export default (response: any) => {
  switch (response.status) {
    case 200: {
      switch (response.data.errorCode) {
        //success
        case 0: {
          break;
        }
        default: {
          // alert(`Error code - ${response.data.errorCode},/n ${response.data.errorMessage}`)
          // let toastConfig: SnackbarConfig = {
          //   duration: 5000,
          //   message: `Error code - ${response.data.errorCode}, \n ${response.data.errorMessage}`,
          //   position: "is-bottom",
          //   type: "is-danger"
          // };
          // Snackbar.open(toastConfig);
          console.log(
            `Error code - ${response.data.errorCode},/n ${response.data.errorMessage}`
          );
        }
      }
      break;
    }
    default:
    // default case
  }
  // TODO: can return response.data and get rif of .data in store files
  return response;
};
