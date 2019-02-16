export function ClickCluck(target, timeout = 500) {
  // Names were chosen according to spec
  let onclick;
  let ondblclick;

  let timerId;

  return {
    get onclick() {
      return onclick;
    },

    set onclick(listener) {
      onclick = listener;
      target.onclick = (event) => {
        if (event.detail === 1) { // First click
          setupClick(() => listener(event));
        }
      };
    },

    get ondblclick() {
      return ondblclick;
    },

    set ondblclick(listener) {
      ondblclick = listener;
      target.ondblclick = (event) => {
        preventClick();
        listener(event);
      };
    },
  };

  function setupClick(callback) {
    timerId = setTimeout(() => {
      timerId = undefined;
      callback();
    }, timeout);
  }

  function preventClick() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = undefined;
    }
  }
}
