'use client';
import { TransitionImage } from './components/TransitionImage';
import { Container } from './styl';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import HourOpening from './components/hoursOpening';
import useGuiche from './hooks/useGuiche';
import useSlide from './hooks/useSlide';
import { useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';
import { useFormHook } from './hooks/useForm';
import { Controller, FormProvider } from 'react-hook-form';
import { useFormConfigHook } from './hooks/useFormConfig';

export default function Home() {
  const { caixa, clickMessage } = useGuiche();
  const { loading, slide } = useSlide();
  const { form, handleSubmit, iframeUrl } = useFormHook();
  const { form: formConfig, handleSubmit: handleSubmitConfig, portState  } = useFormConfigHook(clickMessage);
  useEffect(() => {
    document.documentElement.style.setProperty('--chamar', caixa.color);
  }, [caixa]);
  const [showModal, hideModal] = useModal(() => (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
      isOpen>
      <FormProvider {...form}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '20px',
            marginBottom: '20px',
          }}>
          Digite a url do youtube
        </h1>
        <Controller
          control={form.control}
          name="url"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => {
            return (
              <>
                <input
                  type="text"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  placeholder="Url Youtube"
                  autoCapitalize="none"
                  style={{
                    width: '350px',
                    padding: '10px',
                    marginBottom: '10px',
                    display: 'block',
                    background: '#f9f9f9',
                    height: '40px',
                  }}
                />
                {error && <span>{error.message}</span>}
              </>
            );
          }}
        />
        <div
          style={{
            textAlign: 'center',
          }}>
          <button
            type="submit"
            onClick={form.handleSubmit((data) => {
              handleSubmit(data);
              hideModal();
            })}
            style={{
              padding: '10px 20px',
              background: '#f9f9f9',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
            }}>
            SALVAR
          </button>
          <button
            style={{
              padding: '10px 20px',
              background: '#f9f9f9',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft: '10px',
            }}
            onClick={hideModal}>
            Cancelar
          </button>
        </div>
      </FormProvider>
    </ReactModal>
  ));
  const [showModalConfig, hideModalConfig] = useModal(() => (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
      isOpen>
      <FormProvider {...formConfig}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '20px',
            marginBottom: '20px',
          }}>
          Configurações do conexão
        </h1>
        <Controller
          control={formConfig.control}
          name="bitrate"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => {
            return (
              <>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                  }}>
                  Porta Serial
                </label>
                <select 
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  style={{
                    width: '350px',
                    padding: '10px',
                    marginBottom: '10px',
                    display: 'block',
                    background: '#f9f9f9',
                    height: '40px',
                  }}>
                  <option value="">Selecione</option>
                  <option value="4800">4800</option>
                  <option value="9600">9600</option>
                  <option value="19200">19200</option>
                  <option value="38400">38400</option>
                  <option value="57600">57600</option>
                  <option value="115200">115200</option>
                  </select>
                {error && <span>{error.message}</span>}
              </>
            );
          }}
        />
        <div
          style={{
            textAlign: 'center',
          }}>
          <button
            type="submit"
            onClick={formConfig.handleSubmit((data) => {
              handleSubmitConfig(data);
              hideModalConfig();
            })}
            style={{
              padding: '10px 20px',
              background: '#f9f9f9',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
            }}>
            SALVAR
          </button>
          <button
            style={{
              padding: '10px 20px',
              background: '#f9f9f9',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft: '10px',
            }}
            onClick={hideModalConfig}>
            Cancelar
          </button>
        </div>
      </FormProvider>
    </ReactModal>
  ));
  useEffect(() => {
    if(portState === 'closed') {
      showModalConfig();
    }
  } , [portState, showModalConfig]);
  return (
    <main>
      <Container>
        <section
          className="carrossel"
          onClick={() => {
            showModal();
          }}>
          {!loading && (
            <>
              {iframeUrl.indexOf('https://') !== -1 && (
                <>
                  <iframe
                    width="100%"
                    height="100%"
                    src={iframeUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </>
              )}
              {slide && !iframeUrl && (
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
