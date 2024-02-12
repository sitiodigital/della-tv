import { zodResolver } from '@hookform/resolvers/zod';
import { youtubeFormSchema } from './validation';
import { FieldValues, set, useForm } from 'react-hook-form';
import { useState } from 'react';

export const useFormHook = () => {
    const [iframeUrl, setIframeUrl] = useState('');
    const form = useForm({
        resolver: zodResolver(youtubeFormSchema),
        mode: 'onChange',
    });

    const parser = (url: string) => {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\/)|(\?v=|\&v=))([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[8].length==11){
              return `https://www.youtube.com/embed/${match[8]}?si=UXWb8B1JYirGgdXn?rel=0?version=3&autoplay=0&controls=0&&showinfo=0&loop=1&showinfo=0`;
      }else{
              return '';
      }
  }

    const handleSubmit = async (data: FieldValues) => {
        try {
          const validatedData = youtubeFormSchema.parse(data)
          const youtubeId = parser(validatedData.url)
          setIframeUrl(youtubeId)
        } catch (err: any) {
          setIframeUrl('')
        }
      }

    return { youtubeFormSchema, handleSubmit, form, iframeUrl };
}