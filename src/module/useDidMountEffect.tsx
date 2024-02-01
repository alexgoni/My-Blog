import { useEffect, useRef } from "react";

export default function useDidMountEffect(func: any, deps: any) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return func();
    else didMount.current = true;
  }, deps);
}
