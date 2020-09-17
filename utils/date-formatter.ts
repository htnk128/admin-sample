const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
};

const formatDate = (epochMilli: number): string => {
    return formatDateTime(epochMilli).split(" ")[0];
};

const formatTime = (epochMilli: number): string => {
    return formatDateTime(epochMilli).split(" ")[1];
};

const formatDateTime = (epochMilli: number): string => {
    const d = new Date(epochMilli);
    const year = d.getFullYear();
    const month = padZero(d.getMonth() + 1);
    const date = padZero(d.getDate());
    const hours = padZero(d.getHours());
    const minutes = padZero(d.getMinutes());
    const seconds = padZero(d.getSeconds());
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export { formatDate, formatTime, formatDateTime }
