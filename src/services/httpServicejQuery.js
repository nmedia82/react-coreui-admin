import $ from "jquery";
import { toast } from "react-toastify";
const endPoint = "https://nmdevteam.com/laravel/api";

// Authorization

$.ajaxSetup({
  error: function(jqXHR, textStatus, errorThrown) {
    const expectedErrors = jqXHR.status >= 400 && jqXHR.status < 500;

    if (!expectedErrors) {
      toast.error("An unexpected error occurred!");
    }

    return Promise.reject(jqXHR);
  },

  beforeSend: function(xhr) {
    const api_token =
      "932RDNvg0XkGcq2f3Dcfpvl1rlURFCGA0L454kHR0IIcb3sN2MXbH7FSXrU1";
    // console.log("Auth Token", api_token);
    xhr.setRequestHeader("Authorization", "Bearer " + api_token);
  }
});

export default {
  get: $.get,
  post: $.post,
  put: $.put,
  delete: $.post,
  server: endPoint
};
