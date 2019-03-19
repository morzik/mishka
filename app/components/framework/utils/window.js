import {URL} from './url';

export function popup(link, width = 800, height = 600) {
  let params = {
    width: width,
    height: height,
    menubar: false,
    toolbar: false,
    location: false,
    status : false
  };

  if (window.screen) {
    params.top = (window.screen.height - params.height) >> 1;
    params.left = (window.screen.width - params.width) >> 1;
  }

  window.open(link, "share", URL.fromObject(params, ',', ''))
}
