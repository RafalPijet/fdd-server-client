import moment from 'moment';

export const cutText = (content: string, maxLength: number) => {

    if (maxLength > 0) {

        if (maxLength < content.length) {
            let cutOutText = content.substr(0, maxLength + 1);
            let checkChar = cutOutText.substring(cutOutText.length - 1, cutOutText.length);

            if (checkChar === " ") {
                return `${cutOutText.substring(0, cutOutText.length - 1)}...`;
            } else {
                return `${cutOutText.substr(0, cutOutText.lastIndexOf(" "))}...`;
            }
        } else {
            return content;
        }
    } else {
        return "Error";
    }
};

export const calculateAge = (date: string, resultIsString: boolean) => {
    enum availableUnits {
        rok = 'rok',
        lata = 'lata',
        lat = 'lat',
        miasiac = 'miesiąc',
        miesiace = 'miesiące',
        miesiecy = 'miesięcy'
    }
    const today = moment();
    const birthDate = moment(date);
    const age = moment.duration(today.diff(birthDate))
    let result: number | string = age.years()

    if (result > 0 && resultIsString) {
        if (result === 1) result = `${result} ${availableUnits.rok}`;
        if (result > 1 && result < 5) result = `${result} ${availableUnits.lata}`;
        if (result > 4) result = `${result} ${availableUnits.lat}`;
    }
    if (result === 0 && resultIsString) {
        result = age.months();
        if (result === 1) result = `${result} ${availableUnits.miasiac}`;
        if (result > 1 && result < 5) result = `${result} ${availableUnits.miesiace}`;
        if (result > 4) result = `${result} ${availableUnits.miesiecy}`
    }
    return result
}

export const urltoFile = (url: string, filename: string, mimeType?: any) => {
    mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

export const isEven = (value: number) => {
    return (value % 2 === 0)
}
