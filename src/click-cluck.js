const MACOS_DBLCLICK_TIMEOUT = 500; // 500ms
const WIN_DBLCLICK_TIMEOUT = 500; // 500ms
const DEFAULT_DBLCLICK_TIMEOUT = Math.max(
  MACOS_DBLCLICK_TIMEOUT,
  WIN_DBLCLICK_TIMEOUT,
);

export function ClickCluck(target, timeout = DEFAULT_DBLCLICK_TIMEOUT) {
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
      if (
        !event.detail // No data about click sequential number (IE)
        || event.detail === 1 // Postpone only first/standalone click
      ) {
        setupClick(() => listener(event));
      }
    };
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

  function setupClick(callback) {
    preventClick(); // Prevent previous click in sequence
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
