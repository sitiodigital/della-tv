import { useCallback, useContext, useState } from 'react';
import { AuthContext } from 'routes/auth.context';

export const useCopa2022 = ({ play }: { play: any }) => {
    const { alertConfirm } = useContext(AuthContext);
    const [iframeUrl, setIframeUrl] = useState('');
    const handleTypeAds = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const resultConfirm = await alertConfirm({
                tipo: 'input',
                titulo: 'Assistir Copa 2022',
                textOk: 'Sim',
                textCancelar: 'Não',
                conteudo:
                    'Preencha o formulário com o embed do vídeo para assistir a Copa 2022',
            });

            if (
                typeof resultConfirm === 'string' &&
                resultConfirm.indexOf('https') > -1
            ) {
                const youtube = `https://www.youtube-nocookie.com/embed/ID_KEY?controls=0&autoplay=1`;
                if (resultConfirm.indexOf('https://youtu.be/') > -1) {
                    setIframeUrl(
                        youtube.replace(
                            'ID_KEY',
                            resultConfirm.trim().split('/').pop()
                        )
                    );
                } else if (
                    resultConfirm.indexOf('https://www.youtube.com') > -1
                ) {
                    setIframeUrl(
                        youtube.replace(
                            'ID_KEY',
                            resultConfirm.trim().split('=').pop()
                        )
                    );
                } else {
                    setIframeUrl(resultConfirm.trim());
                }
            }
            play();
            event.preventDefault();
        },
        []
    );
    return { handleTypeAds, iframeUrl };
};
