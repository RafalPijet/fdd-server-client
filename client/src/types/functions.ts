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