import { RefObject, useEffect, useRef, useState } from "react";

import autoAnimate, {
  AnimationController,
  AutoAnimateOptions,
  AutoAnimationPlugin
} from "utils/autoAnimateUtils";

export const useAutoAnimate = <T extends Element>(
  options?: Partial<AutoAnimateOptions> | AutoAnimationPlugin
): [RefObject<T>, (enabled: boolean) => void] => {
  const element = useRef<T>(null);
  const [controller, setController] = useState<AnimationController | undefined>();
  const setEnabled = (enabled: boolean) => {
    if (controller) {
      enabled ? controller.enable() : controller.disable();
    }
  };

  useEffect(() => {
    if (element.current instanceof HTMLElement)
      setController(autoAnimate(element.current, options || {}));
  }, []);

  return [element, setEnabled];
};
