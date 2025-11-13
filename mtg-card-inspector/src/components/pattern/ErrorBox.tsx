import React from "react";

interface ErrorBoxProps extends React.PropsWithChildren {
  title?: string;
  message: string;
}

export function ErrorBox({
  title = "Error",
  message,
  children,
}: ErrorBoxProps) {
  return (
    <div className={`bg-red-50 border border-red-200 p-3`}>
      <div className='flex'>
        <div className='ml-3'>
          <span>{title}</span>
          <div>
            <span>{message}</span>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
