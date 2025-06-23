"use client"

import { useEffect, useRef } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void

/**
 * A hook that triggers a callback when a click occurs outside of a specified element.
 * 
 * @param refOrHandler The ref or the function to call when a click outside occurs
 * @param callback Optional callback function when using with a ref
 * @returns A ref to attach to the element
 */
export default function useClickOutside<T extends HTMLElement = HTMLElement>(
  refOrHandler: React.RefObject<T> | Handler,
  callback?: () => void
) {
  const ref = useRef<T>(null);
  
  // If the first parameter is a function, use it as the handler
  const isRefProvided = 'current' in refOrHandler;
  const handlerRef = isRefProvided ? callback : refOrHandler as Handler;
  const elementRef = isRefProvided ? refOrHandler as React.RefObject<T> : ref;

  useEffect(() => {
    if (!handlerRef) return;
    
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = elementRef.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      (handlerRef as Handler)(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [elementRef, handlerRef]);

  return ref;
}