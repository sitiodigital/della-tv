import React from 'react';
import { useEffect, useState } from 'react';

export const Hour = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 500);
        return () => clearInterval(interval);
    });
    return (
        <div className="hour">
            <p>
                {now.getHours().toString().padStart(2, '0')}:
                {now.getMinutes().toString().padStart(2, '0')}:
                {now.getSeconds().toString().padStart(2, '0')}
            </p>
        </div>
    );
};
export default Hour;
