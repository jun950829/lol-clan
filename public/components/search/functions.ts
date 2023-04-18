export const calDate = (time : number) => {
    let now = new Date();
    let diff = now.getTime() - time;
    
    let day = diff / (24 * 60 * 60 * 1000);
    let hours = (diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
    let minutes = ((diff % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000);
    if(day > 1) {
        return `${day.toFixed(0)}일 전`;
    } else if(day < 1 && hours >= 1 ) {
        return `${hours.toFixed(0)}시간 전`;
    } else if(day < 1 && hours < 1) {
        return `${minutes.toFixed(0)}분 전`;
    }
}

export const calTime = (time : number) => {
    let hours = (time % (24 * 60 * 60)) / (60 * 60);
    let minutes = ((time % (24 * 60 * 60)) % (60 * 60)) / (60);
    let seconds =  (((time % (24 * 60 * 60)) % (60 * 60)) % (60));

    if(hours > 1) {
        return '1시간 이상';
    } else {
        return `${minutes.toFixed(0)}분 ${seconds.toFixed(0)}초`;
    }

}