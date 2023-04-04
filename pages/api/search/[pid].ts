import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (req: NextApiRequest, res : NextApiResponse) {
    let result = {};
    const {pid} = req.query;

    const API_RIOT_URL = process.env.NEXT_PUBLIC_RIOT_URL;

    const api_key = process.env.NEXT_DEV_RIOT_KEY;
    const summonersRequestUrl = `${API_RIOT_URL}summoner/v4/summoners/by-name/${pid}?api_key=` + api_key;
    
    const summonerResponse = await fetch(summonersRequestUrl); 
    const summonersData = await summonerResponse.json();
console.log(summonersData)

    let utcTime = new Date(summonersData.revisionDate);
    let time = utcTime.getFullYear() + '-' + (utcTime.getMonth() + 1 ).toString().padStart(2, '0') + '-' + utcTime.getDate().toString().padStart(2, '0');
    
    let summonerIconUrl = process.env.NEXT_DEV_RIOT_SUMMONERICON_IMG_URL + `profileIcon${summonersData.profileIconId}.jpg?image=q_auto,f_webp,w_auto&amp;`
    const rankRequestUrl = `${API_RIOT_URL}league/v4/entries/by-summoner/${summonersData.id}?api_key=` + api_key;
    const rankResponse = await fetch(rankRequestUrl);
    const rankResponseData = await rankResponse.json();
console.log(rankResponseData)

    res.status(200).json({
        profileIconUrl: summonerIconUrl,
        summonerName: summonersData.name,
        revisionDate : time,
        summonerLevel : summonersData.summonerLevel,
        rankImageUrl : process.env.NEXT_DEV_RIOT_RANK_TIER_IMG_URL,
        rankData : rankResponseData
    })
}