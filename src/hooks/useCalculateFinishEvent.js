import React from 'react';

export const NormalizeTitle = ( value ) => {

    return Number(value) < 10 ? '0' + value : value;

}


export const useCalculateFinishEvent = ( startHour, startMinutes, duration ) => {

    const [finishEvent, setFinishEvent ] = React.useState('');

    const hours = Array(24).fill('').map( ( _, index ) => {
        const newItem = {
            value:  index ,
            title:  index ,
        }
        return newItem;
    });
    const minutes = Array(60).fill('').map( ( _, index ) => {
        const newItem = {
            value:  index ,
            title:  index ,
        }
        return newItem;
    });

    // React.useEffect(() => {
    const calculateFinalResult = ( startHour, startMinutes, duration ) => {

        let hour = Number( startHour );
        let minutes = Number( startMinutes );

        const convertToHour = duration / 60;

        if ( convertToHour <= 1 || convertToHour < 2 || convertToHour < 3) {
            const minutesLikeMinutes = Number( convertToHour ) * 60;

            minutes = Number( startMinutes ) + minutesLikeMinutes;

            if ( minutes >= 60 ) {
                hour = hour + 1;
                minutes =  minutes - 60 ;

                if( minutes >= 60 ) {
                    hour = hour + 1;
                    minutes = minutes - 60;

                    if (minutes >= 60 ) {
                        hour = hour + 1;
                        minutes = minutes - 60;
                    }

                }

            }

        } else {

            let minutesLikeHours;
            let hourLikeHour;

            if ( !Number.isInteger( +convertToHour ) ) {
                hourLikeHour = String( convertToHour ).split( '.' )[ 0 ];
                minutesLikeHours = String( convertToHour ).split( '.' )[ 1 ];

                if ( Number( minutesLikeHours ) === 5 ) {
                    minutesLikeHours = Number( minutesLikeHours ) * 10;
                }

                const minutesLikeMinutes = ( Number( minutesLikeHours ) / 100 ) * 60;
                minutes = startMinutes + minutesLikeMinutes;
                hour = hour + Number( hourLikeHour );

                if ( minutes >= 60 ) {
                    hour = hour + 1;
                    minutes = minutes - 60;

                }

            } else {

                hourLikeHour = String( convertToHour ).split( '.' )[ 0 ];
                hour = hour + Number( hourLikeHour );
                minutes = startMinutes;

            }
        }

        setFinishEvent(`${ hour < 10 ? ` 0${ hour }` : hour }:${ minutes < 10 ? `0${ minutes }` : minutes }`)
        return `${ NormalizeTitle(hour) }:${ NormalizeTitle(minutes) }`;
    };

    // }, [startHour,startMinutes, duration])

    return {
        finishEvent, hours, minutes,  calculateFinalResult
    }
}