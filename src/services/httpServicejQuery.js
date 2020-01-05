import $ from 'jquery';
import {toast} from 'react-toastify';
const endPoint = "https://nmdevteam.com/laravel/api";

$.ajaxSetup({
    error : function(jqXHR, textStatus, errorThrown) {

        const expectedErrors =  jqXHR.status >= 400 &&
                                jqXHR.status < 500;

        if( !expectedErrors ) {
            toast.error("An unexpected error occurred!");
        }

        return Promise.reject(jqXHR);

    }
});

export default {
    get: $.get,
    post: $.post,
    put: $.post,
    delete: $.post,
    server: endPoint,
}