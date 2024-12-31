'use client';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
// @ts-ignore
import useSound from 'use-sound';

interface IItem {
    code: number;
    typeId: number;
    typeName: string;
    color: string;
    hour?: string;
}
interface IList {
    [key: string]: IItem;
}
const list: IList = {
    '2EC298B1': { code: 2, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2EC298B2': {
        code: 2,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2EC298B3': {
        code: 2,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '2509C4B3': { code: 5, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2343C4B2': {
        code: 5,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2343C4B3': {
        code: 5,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '2187E8B1': { code: 3, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2187E8B2': {
        code: 3,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2187E8B3': {
        code: 3,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '2509C4B1': { code: 4, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2509C4B2': {
        code: 4,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2509C4B3': {
        code: 4,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '28822BB1': { code: 7, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' }, //APAGAR
    '28822BB2': {
        code: 7,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    }, // APAGAR
    '28822BB3': {
        code: 7,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    // START NEW
    '22F498B1': { code: 7, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '22F498B2': {
        code: 7,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '22F498B3': {
        code: 7,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    //END NEW
    '2E14F8B1': { code: 6, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2E14F8B2': {
        code: 6,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2E14F8B3': {
        code: 6,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '238224B1': { code: 1, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '238224B2': {
        code: 1,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '238224B3': {
        code: 1,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
};

export const useGuiche = (): { caixa: IItem; play: any, clickMessage: (code: any) => void } => {
    const [play] = useSound('campainha.mp3', {
        interrupt: true,
        playbackRate: 1,
        onload: () => console.info('loaded'),
    });
    const currentDate = useCallback(() => {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }, []);
    const [caixa, setCaixa] = useState<IItem>({} as IItem);

    const clickMessage = (code: any) => {
        const caixa = list[code];
        if (caixa) {
            setCaixa({
                ...caixa,
                hour: currentDate(),
            });
            play();
        }
    };

    // useEffect(() => {

    //     setCaixa({
    //         ...list['29D1B5B1'],
    //         hour: currentDate(),
    //     });
    // }, []);

    // useEffect(() => {
    //     play();
    // }, [caixa, play]);

    // useEffect(() => {
    //     const clickMessage = (event: any) => {
    //         const { peso, id } = event.data;
    //         const caixa = list[peso];
    //         if (caixa) {
    //             setCaixa({
    //                 ...caixa,
    //                 hour: currentDate(),
    //             });
    //             play();
    //         }
    //     };
    //     window.addEventListener('message', clickMessage);
    //     return () => {
    //         window.removeEventListener('click', clickMessage);
    //     };
    // }, [currentDate, play]);
    return { caixa, play, clickMessage };
};

export default useGuiche;
