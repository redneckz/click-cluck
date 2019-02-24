import { ClickCluck } from './click-cluck';

describe('ClickCluck', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  let target;
  let targetCC;

  beforeEach(() => {
    jest.clearAllTimers();
    target = {};
    targetCC = ClickCluck(target);
  });

  requirementsFactory();

  function requirementsFactory(eventCreator = event => event) {
    it('should prevent click events preceding dblclick event', () => {
      const onclick = jest.fn();
      targetCC.onclick = onclick;
      const ondblclick = jest.fn();
      targetCC.ondblclick = ondblclick;

      target.onclick(eventCreator({ detail: 1 })); // First in sequence
      jest.advanceTimersByTime(300); // Not enough time for standalone click
      target.onclick(eventCreator({ detail: 2 })); // Second in sequence
      const event = {};
      target.ondblclick(event); // Finally double click

      jest.runAllTimers();
      expect(onclick).not.toBeCalled();
      expect(ondblclick).toBeCalledWith(event);
    });

    it('should delegate the only click event to target', () => {
      const onclick = jest.fn();
      targetCC.onclick = onclick;

      const event = eventCreator({ detail: 1 }); // Event mock
      target.onclick(event);

      jest.runAllTimers();
      expect(onclick).toBeCalledWith(event);
    });

    it('should delegate the only dblclick event to target', () => {
      const ondblclick = jest.fn();
      targetCC.ondblclick = ondblclick;

      const event = eventCreator({}); // Event mock
      target.ondblclick(event);

      expect(ondblclick).toBeCalledWith(event);
    });

    it('should postpone click event according to configured timeout (500ms by default)', () => {
      const onclick = jest.fn();
      targetCC.onclick = onclick;

      target.onclick(eventCreator({ detail: 1 }));

      jest.advanceTimersByTime(300); // Not enough time for standalone click
      expect(onclick).not.toBeCalled();

      jest.advanceTimersByTime(300); // 300ms + 300ms > 500ms
      expect(onclick).toBeCalledTimes(1);
    });
  }

  describe('for old browsers without MouseEvent.detail support', () => {
    requirementsFactory(({ detail, ...rest }) => rest);

    const unfortunatelyIt = it;
    unfortunatelyIt('should prevent second click event in sequence by timeout even no dblclick fired', () => {
      const onclick = jest.fn();
      targetCC.onclick = onclick;

      target.onclick({}); // First in sequence
      target.onclick({}); // Second in sequence

      jest.runAllTimers();
      expect(onclick).toBeCalledTimes(1);
    });
  });

  describe('auxiliary requirements', () => {
    it('should return registered onclick listener as is', () => {
      const onclick = () => {};
      targetCC.onclick = onclick;
      expect(targetCC.onclick).toBe(onclick);
    });

    it('should return registered ondblclick listener as is', () => {
      const ondblclick = () => {};
      targetCC.ondblclick = ondblclick;
      expect(targetCC.ondblclick).toBe(ondblclick);
    });

    it('should cache onclick listener and do not touch target if nothing changed', () => {
      const listener = () => {};
      targetCC.onclick = listener;
      const underlyingListener = target.onclick;
      targetCC.onclick = listener; // Nothing changed
      expect(target.onclick).toBe(underlyingListener);
      targetCC.onclick = () => {}; // New listener
      expect(target.onclick).not.toBe(underlyingListener);
    });

    it('should cache ondblclick listener and do not touch target if nothing changed', () => {
      const listener = () => {};
      targetCC.ondblclick = listener;
      const underlyingListener = target.ondblclick;
      targetCC.ondblclick = listener; // Nothing changed
      expect(target.ondblclick).toBe(underlyingListener);
      targetCC.ondblclick = () => {}; // New listener
      expect(target.ondblclick).not.toBe(underlyingListener);
    });

    it('should clear onclick listener on target if empty listener provided', () => {
      targetCC.onclick = () => {};
      expect(target.onclick).toBeInstanceOf(Function);
      targetCC.onclick = undefined; // Empty listener
      expect(target.onclick).toBe(undefined);
    });

    it('should clear ondblclick listener on target if empty listener provided', () => {
      targetCC.ondblclick = () => {};
      expect(target.ondblclick).toBeInstanceOf(Function);
      targetCC.ondblclick = undefined; // Empty listener
      expect(target.ondblclick).toBe(undefined);
    });
  });
});
