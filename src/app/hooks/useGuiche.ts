'use client';
import { useCallback, useEffect, useState } from 'react';
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
    '29D1B5B1': { code: 2, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '29D1B5B2': {
        code: 2,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '29D1B5B3': {
        code: 2,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '247D0BB1': { code: 5, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '247D0BB2': {
        code: 5,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '247D0BB3': {
        code: 5,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '23EDEDB1': { code: 3, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '23EDEDB2': {
        code: 3,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '23EDEDB3': {
        code: 3,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '2708FDB1': { code: 4, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2708FDB2': {
        code: 4,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2708FDB3': {
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
    '2FFA0AB1': { code: 7, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2FFA0AB2': {
        code: 7,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2FFA0AB3': {
        code: 7,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    //END NEW
    '268B13B1': { code: 6, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '268B13B2': {
        code: 6,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '268B13B3': {
        code: 6,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
    '2091EDB1': { code: 1, typeId: 0, color: '#2f1c00', typeName: 'NORMAL' },
    '2091EDB2': {
        code: 1,
        typeId: 1,
        color: '#ef5451',
        typeName: 'PREFERENCIAL',
    },
    '2091EDB3': {
        code: 1,
        typeId: 2,
        color: '#2f84cc',
        typeName: 'APENAS CARTÃO',
    },
};

export const useGuiche = (): { caixa: IItem; play: any } => {
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

    // useEffect(() => {

    //     setCaixa({
    //         ...list['29D1B5B1'],
    //         hour: currentDate(),
    //     });
    // }, []);

    // useEffect(() => {
    //     play();
    // }, [caixa, play]);

    useEffect(() => {
        const clickMessage = (event: any) => {
            const { peso, id } = event.data;
            const caixa = list[peso];
            if (caixa) {
                setCaixa({
                    ...caixa,
                    hour: currentDate(),
                });
                play();
            }
        };
        window.addEventListener('message', clickMessage);
        return () => {
            window.removeEventListener('click', clickMessage);
        };
    }, [currentDate, play]);
    return { caixa, play };
};

export default useGuiche;
