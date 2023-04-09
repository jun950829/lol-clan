import Image from 'next/image';
import { css } from '@emotion/react';
import { RANK_TYPE, RANK_MENU } from '@/data/ranks';

interface RANK_LAYER_INTERFACE {
    leagueId : string;
    queueType : RANK_TYPE;
    rankImageUrl : string;
    tier : string;
    rank : string;
    summonerId: string;
    summonerName: string;
    leaguePoints : number;
    wins : number;
    losses : number;
    veteran: Boolean;
    inactive: Boolean;
    freshBlood: Boolean;
    hotStreak: Boolean;
}

const returnRankType = (rank : RANK_TYPE) => {
    return RANK_MENU[rank];
}

const RankInfoLayer = (Props : {rankData : RANK_LAYER_INTERFACE, rankImageUrl: any}) => {

    const rankData = Props.rankData;
    const rankImageUrl = Props.rankImageUrl;

    const baseStyle = css`
        width: 380px;
        height: 150px;
        border : 1px solid #000;
        border-radius : 10px;

        font-size : 14px;
        color : #202D37;

        .rank_type {
            padding : 5px 20px;    
            border-bottom : 1px solid #333333;
        }

        .rank_info {
            width: 100%;
            height: 120px;
            padding : 0 20px ;

            display : flex;
            flex-direction : row;
            justify-content : space-between;
            align-item : center;
        }

        .rank_info_left {
            display : flex;
            flex-direction : row;
            justify-content : space-between;
            align-item : center;
        }
        
        .tier_image {
            width: 100px;
            height: 100px;
            border-radius : 50%;
            background-color : #9AA4AF;

            margin : auto;
        }

        .tier_txt {
            margin: auto 10px;
        }

        .winloss_info {
            margin: auto 10px;
            text-align : right;
        }

        .bold_700 {
            font-weight : 700;
        }

    `;

    return (
        <div className="rank_layer" css={baseStyle}>
            <div className='rank_type'>{returnRankType(rankData.queueType)} </div>
            <div className='rank_info'>
                <div className='rank_info_left'>
                    <div className="tier_image"> 
                        <Image src={`${rankImageUrl}${rankData.tier.toLowerCase()}.png?image=q_auto,f_webp,w_80&amp`} width={100} height={100} alt="티어 이미지"></Image>
                    </div>
                    <div className='tier_txt'>
                        <p className='bold_700'>{rankData.tier} {rankData.rank}</p>
                        <p>{rankData.leaguePoints} LP</p>
                    </div>
                </div>
                <div className='winloss_info'>
                    <p>{rankData.wins}승 {rankData.losses}패</p>
                    <p>승률 {(rankData.wins / (rankData.wins + rankData.losses) * 100).toFixed(0)}%</p>
                </div>
            </div>
        </div>
    )
}

export default RankInfoLayer;
