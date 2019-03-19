import $ from 'jquery';
import {ApiError} from '../api-error/api-error';


class ApiRequest{
  constructor(api_method, data, requestMethod) {
    let def = new $.Deferred();
    $.ajax(api_method, {
      method: requestMethod,
      // contentType: 'application/json; charset=utf-8',
      // data: JSON.stringify($.extend({}, params, _params)),
      data: data,
      // dataType: 'json' // Отправка данных на сервер в виде JSON, а не url
    })
      .done(response=>{
        let errors = ApiRequest.getResponseErrors(response);
        if (errors) {
          def.reject((errors));
        } else {
          def.resolve(response);
        }
      })
      .fail(function (xhr) {
        let error = xhr.responseJSON
          ? ApiRequest.getResponseErrors(xhr.responseJSON)
          : ApiError.fromHttpError(xhr);
        def.reject(error);
      });

    this.promise = def.promise();
  }

  /**
   * Проверка, что от сервера пришла ошибка
   * @param data
   * @return {boolean}
   */
  static getResponseErrors(data){
    return ApiError.fromApiResponse(data);
  }
}

export class Api {
  getUrl(method) {
    return method;
  };

  send(method, params) {
    let self = this;
    return (_params) => {

      return new ApiRequest(
        this.getUrl(method),
        $.extend({}, params && params.data, _params),
        params && params.requestMethod || 'POST',
      ).promise;
    }

  }
}
