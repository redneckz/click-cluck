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
      if (onclick === listener) {
        // Nothing changed, nothing to do
        return;
      }
      onclick = listener;
      target.onclick = createClickHandler(listener);
    },

    get ondblclick() {
      return ondblclick;
    },

    set ondblclick(listener) {
      if (ondblclick === listener) {
        // Nothing changed, nothing to do
        return;
      }
      ondblclick = listener;
      target.ondblclick = createDoubleClickHandler(listener);
    },
  };

  function createClickHandler(listener) {
    if (typeof listener !== 'function') {
      // Invalid or empty listener provided
      return undefined; // Return empty listener
    }
    return (event) => {
      if (event.detail === 1) { // First click
        setupClick(() => listener(event));
      }
    };
  }

  function setupClick(callback) {
    timerId = setTimeout(() => {
      timerId = undefined;
      callback();
    }, timeout);
  }

  function createDoubleClickHandler(listener) {
    if (typeof listener !== 'function') {
      // Invalid or empty listener provided
      return undefined; // Return empty listener
    }
    return (event) => {
      preventClick();
      listener(event);
    };
  }

  function preventClick() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = undefined;
    }
  }
}
