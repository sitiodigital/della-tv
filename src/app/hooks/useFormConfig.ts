import { zodResolver } from '@hookform/resolvers/zod';
import { configFormSchema } from './validation';
import { FieldValues, useForm } from 'react-hook-form';
import { useCallback, useEffect, useRef, useState } from 'react';

export type PortState = "closed" | "closing" | "open" | "opening";
export const useFormConfigHook = (clickMessage: (code: any) => void) => {
  const [canUseSerial] = useState(() => true);
  const portRef = useRef<any | null>(null);
  const [portState, setPortState] = useState<PortState>("closed");
    const form = useForm({
        resolver: zodResolver(configFormSchema),
        mode: 'onChange',
    });

    function requestFullScreen(element: any)
{
        if (element.requestFullscreen)
            element.requestFullscreen();
        else if (element.msRequestFullscreen)
            element.msRequestFullscreen();
        else if (element.mozRequestFullScreen)
            element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen)
            element.webkitRequestFullscreen();
    }

    const onPortDisconnect = useCallback(() => {
        portRef.current = null;
        setPortState("closed");
    } , [portRef]);

    const handleSubmit = async (data: FieldValues) => {
        try {
          const validatedData = configFormSchema.parse(data)
          await autoConnect(validatedData.bitrate);
        } catch (err: any) {
          alert(err.errors);
        }
    }

    const openPort = useCallback(async (port: any, bitrate: string) => {
        try {
            await port.open({ baudRate: Number(bitrate) });
            portRef.current = port;
            setPortState("open");
        } catch (error) {
            setPortState("closed");
            console.error('Error openPort', error);
        }
    } , []);

    const requestPermissionPort = useCallback(async (bitrate: string) => {
        try {
            if (!canUseSerial) return;
            setPortState("opening");
            // @ts-ignore
            const port = await navigator.serial.requestPort();
            await openPort(port, bitrate);
        } catch (error) {
            console.error('Error requestPermissionPort', error);
        }

    } , [canUseSerial, openPort]);

    const autoConnect = useCallback(async (bitrate: string) => {
        if (!canUseSerial || !bitrate) return;
        try {
            setPortState("opening");
            await requestPermissionPort(bitrate);
            requestFullScreen(document.documentElement);
            return true;
        } catch (error) {
            setPortState("closed");
        }
    } , [canUseSerial, requestPermissionPort]);


      useEffect(() => {
        const port = portRef.current;
        if (portState === "open" && port) {
          // @ts-ignore
          navigator.serial.addEventListener("disconnect", onPortDisconnect);

          return () => {
            // @ts-ignore
            navigator.serial.removeEventListener("connect", onPortDisconnect);
            // @ts-ignore
            navigator.serial.removeEventListener("disconnect", onPortDisconnect);
          };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [portState]);

    useEffect(() => {
      const port = portRef.current;
      if (portState === "open" && port) {
        const reader = port.readable.getReader();
        const readData = async () => {
          try {
            while (port.readable) {
              const { value, done } = await reader.read();
              if (done) break;

              const decoder = new TextDecoder("utf8");
              let code = decoder.decode(value).replace(/[\r|\n]/gi, "");
              clickMessage(code);
            }
          } catch (error) {
            console.error('Error reading data:', error);
          } finally {
            reader.releaseLock();
          }
        };
  
        readData();
  
        return () => {
          reader.cancel().then(() => {
            console.log('Reader cancelled');
          }).catch((error: any) => {
            console.error('Error cancelling reader:', error);
          });
        };
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portState]);

    return { configFormSchema, handleSubmit, form, portState };
}