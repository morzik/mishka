export class ApiError{
  static PREVENT = 'prevent';

  /**
   * Ошибка верификации данных
   * @type {string}
   */
  static VERIFICATION_ERROR = "VERIFICATION_ERROR";

  /**
   * Ошибка входных фильров апи
   * @type {string}
   */
  static IN_FILTERS_ERROR = "IN_FILTERS_ERROR";

  /**
   * Ошибка выходных фильтрв апи
   * @type {string}
   */
  static OUT_FILTERS_ERROR = "OUT_FILTERS_ERROR";

  /**
   * API вернул ошибку
   * @type {string}
   */
  static ERROR_RESPONSE = "ERROR_RESPONSE";

  /**
   * Необработанная ошибка сервера - вернулся не json файл
   * @type {string}
   */
  static SERVER_ERROR = "SERVER_ERROR";

  /**
   * @param {number|string} [code] - код ошибки
   * @param {{}|{name:string, message:string}[]} [fields] - список ошибок в конкретном поле
   * @param {string|{title:string, body:string}} [message] - общее сообщение
   * @param {string} [response] - необработанный ответ от сервера
   */
  constructor({code, fields, message, response}) {
    this.code = code;
    this.fields = fields;
    this.message = message;
    this.response = response;
    this.errors = {};
    this.errorsCount = 0;
  }



  static fromApiResponse(response) {
    return response.hasOwnProperty('errors') ? new ApiError(response.errors) : false;
  }

  static fromHttpError(xhr) {
    return new ApiError({
      code: xhr.status,
      message: xhr.statusText,
      response: xhr.responseText
    })
  }



  isError() {
    return this.errorsCount > 0;
  };


  addErrorMessage(label, message) {
    if (message){
      if (!Array.isArray(message)) {
        message = [message];
      }

      if (message.length > 0) {
        this.errors[label] = (this.errors[label] || []).concat(message);
        this.errorsCount+= message.length;
      }
    }
  }

  /**
   * @param {Object} error
   */
  extend(error) {
    if (error.errors){
      Object.keys(error.errors).forEach(key=>this.addErrorMessage(key, error.errors[key]));
    }
  }
}
