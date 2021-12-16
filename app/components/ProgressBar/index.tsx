/**
 *  @author: Razvan Rauta
 *  Date: Dec 17 2021
 *  Time: 00:51
 */

import type { MutableRefObject, ReactElement } from 'react';
import { useEffect, useRef } from 'react';
import { useTransition } from 'remix';

export function useProgress(): MutableRefObject<HTMLDivElement | undefined> {
  const el = useRef<HTMLDivElement>();
  const timeout = useRef<NodeJS.Timeout>();
  const { location } = useTransition();

  useEffect(() => {
    if (!location || !el.current) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    el.current.style.width = `0%`;

    const updateWidth = (ms: number) => {
      timeout.current = setTimeout(() => {
        const width = parseFloat(el.current?.style?.width || '');
        const percent = !isNaN(width) ? 10 + 0.9 * width : 0;
        if (el?.current?.style) {
          el.current.style.width = `${percent}%`;
        }

        updateWidth(100);
      }, ms);
    };

    updateWidth(300);

    return () => {
      clearTimeout(timeout.current as NodeJS.Timeout);

      if (el?.current?.style.width === `0%`) {
        return;
      }
      el.current.style.width = `100%`;
      timeout.current = setTimeout(() => {
        if (el.current?.style.width !== '100%') {
          return;
        }

        el.current.style.width = ``;
      }, 200);
    };
  }, [location]);

  return el;
}

export default function ProgressBar(): ReactElement {
  const progress = useProgress();

  return (
    <div className='fixed top-0 left-0 right-0 h-2 flex'>
      <div
        ref={progress}
        className='transition-all ease-out bg-gradient-to-r from-green-400 via-blue-500 to-pink-500'
      />
    </div>
  );
}
