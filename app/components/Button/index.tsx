import React from 'react';

type CustomButtonProps = {
  color?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements['button'] & CustomButtonProps
>(({ color, className = '', ...props }, ref) => {
  let classNames = 'py-1 px-2 border rounded';

  if (color === 'primary') {
    classNames +=
      ' bg-primary-700 hover:bg-primary-800 border-primary-500 text-primary-light';
  }

  if (className) {
    classNames += ` ${className}`;
  }

  return <button {...props} ref={ref} className={classNames} />;
});
