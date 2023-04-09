import Image from 'next/image';
import { css } from '@emotion/react';
import MatchInfoLayer from '@/components/search/MatchInfoLayer';


const MatchListLayer = (Props : any) => {

    const matchDatas = Props.matchList;
    console.log(JSON.stringify(matchDatas[0].info.participants[0].summonerName));
    
    const baseStyle = css`
        width: 100%;
        margin-top : 30px;
    `;

    return (
    <div className="match_list_layer" css={baseStyle}>
        {matchDatas.map((match : any, idx : number) => {
            if(idx == 1)
            return <div>
                {<MatchInfoLayer matchData={match.info} key={match.info.gameId}></MatchInfoLayer>
                }
                <br/>
            </div>
            else {
                return <div key={idx}></div>
            }
        })}
    </div>
    )
} 

export default MatchListLayer;