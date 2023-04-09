import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (req: NextApiRequest, res : NextApiResponse) {
    let result = {};
    const {pid} = req.query;

    const API_RIOT_KR_URL = process.env.NEXT_PUBLIC_RIOT_KR_URL;
    const API_RIOT_ASIA_URL = process.env.NEXT_PUBLIC_RIOT_ASIA_URL;

    const api_key = process.env.NEXT_DEV_RIOT_KEY;
    const summonersRequestUrl = `${API_RIOT_KR_URL}summoner/v4/summoners/by-name/${pid}?api_key=` + api_key;
    
    const summonerResponse = await fetch(summonersRequestUrl); 
    const summonersData = await summonerResponse.json();

    console.log(summonersData)
    let utcTime = new Date(summonersData.revisionDate);
    let time = utcTime.getFullYear() + '-' + (utcTime.getMonth() + 1 ).toString().padStart(2, '0') + '-' + utcTime.getDate().toString().padStart(2, '0');
    
    let summonerIconUrl = process.env.NEXT_DEV_RIOT_SUMMONERICON_IMG_URL + `profileIcon${summonersData.profileIconId}.jpg?image=q_auto,f_webp,w_auto&amp;`
    const rankRequestUrl = `${API_RIOT_KR_URL}league/v4/entries/by-summoner/${summonersData.id}?api_key=` + api_key;
    const rankResponse = await fetch(rankRequestUrl);

    const matchRequestUrl = `${API_RIOT_ASIA_URL}match/v5/matches/by-puuid/${summonersData.puuid}/ids?start=0&count=5&api_key=` + api_key;
    const matchResponse = await fetch(matchRequestUrl);
    const matchData = await matchResponse.json();

    let rankResponseData = await rankResponse.json();
    rankResponseData.forEach((data : any, idx : number) => {
        if(data.queueType == 'RANKED_FLEX_SR' || data.queueType == 'RANKED_SOLO_5x5') {
            //
        } else {
            rankResponseData.splice(idx, 1);
        }
    })

    

    let matchDataList: any[] = [];
    //경기 개별 조회
    for(let i = 0; i < matchData.length; i++) {
        let matchInfoRequestUrl = `${API_RIOT_ASIA_URL}match/v5/matches/${matchData[i]}?api_key=` + api_key;
        let matchInfoResponse = await fetch(matchInfoRequestUrl);
        let matchInfoData = await matchInfoResponse.json();
    
        await matchDataList.push(matchInfoData);
    }

    console.log('send');

    res.status(200).json({
        profileIconUrl: summonerIconUrl,
        summonerName: summonersData.name,
        revisionDate : time,
        summonerLevel : summonersData.summonerLevel,
        rankImageUrl : process.env.NEXT_DEV_RIOT_RANK_TIER_IMG_URL,
        rankData : rankResponseData,
        matchDataList : matchDataList
    })
}