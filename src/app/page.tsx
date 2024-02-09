'use client';
import { TransitionImage } from './components/TransitionImage';
import { Container } from './styl';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import HourOpening from './components/hoursOpening';
import useGuiche from './hooks/useGuiche';
import useSlide from './hooks/useSlide';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const toast: any = useRef(null);
  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have accepted',
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Rejected',
      detail: 'You have rejected',
      life: 3000,
    });
  };
  const { caixa } = useGuiche();
  const { loading, slide } = useSlide();
  useEffect(() => {
    document.documentElement.style.setProperty('--chamar', caixa.color);
  }, [caixa]);
  return (
    <main>
      <Container>
        <section
          className="carrossel"
          onClick={() => {}}>
          {!loading && (
            <>
              {slide && (
                <TransitionImage name={slide.name}>
                  {slide.type === 'jpg' ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.src}
                      alt={slide.name}
                    />
                  ) : (
                    <video
                      width="300"
                      height="200">
                      <source
                        src={slide.src}
                        type="video/mp4"
                      />
                    </video>
                  )}
                </TransitionImage>
              )}
            </>
          )}
        </section>
        <section className="guiche">
          <header>
            <h2>CAIXA LIVRE</h2>
            {caixa && caixa.code && (
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={`title-${caixa.code}-${caixa.typeId}`}
                  addEndListener={
                    ((node: any, done: any) =>
                      node.addEventListener(
                        'transitionend',
                        done,
                        false
                      )) as any
                  }
                  classNames="zoom">
                  <h4>{caixa.typeName}</h4>
                </CSSTransition>
              </SwitchTransition>
            )}
          </header>
          <div className="warp-guiche">
            {caixa && caixa.code && (
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={`content-${caixa.code}-${caixa.typeId}`}
                  addEndListener={
                    ((node: any, done: any) =>
                      node.addEventListener(
                        'transitionend',
                        done,
                        false
                      )) as any
                  }
                  classNames="zoom">
                  <h1>{caixa.code}</h1>
                </CSSTransition>
              </SwitchTransition>
            )}
          </div>
          <HourOpening />
        </section>
      </Container>
    </main>
  );
}
