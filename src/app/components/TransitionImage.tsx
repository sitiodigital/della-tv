import React, { FC } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const TransitionImage: FC<{
  name: string;
  mode?: 'in-out' | 'out-in';
  children?: any;
}> = ({ children, name, mode = 'in-out' }: any) => {
  return (
    <div className="transition">
      <div className="container">
        <SwitchTransition mode={mode}>
          <CSSTransition
            key={name}
            addEndListener={
              ((node: any, done: any) =>
                node.addEventListener('transitionend', done, false)) as any
            }
            classNames="fade">
            {children}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};
export default TransitionImage;
