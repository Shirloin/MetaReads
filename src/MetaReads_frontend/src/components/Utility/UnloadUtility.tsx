export const initBeforeUnLoad = (action: () => void) => {
    window.onbeforeunload = (event) => {
        action();
      const e = event || window.event;
        e.preventDefault();
        if (e) {
          e.returnValue = '';
        }
        return '';
    };
};