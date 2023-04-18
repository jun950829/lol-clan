import Image from 'next/image';
import { css } from '@emotion/react';
import MatchInfoLayer from '@/components/search/MatchInfoLayer';
import { useEffect } from 'react';


const MatchListLayer = (Props : any) => {

    let matchDatas = Props.matchList;
    let summonerId = Props.searchId;
    // console.log(JSON.stringify(matchDatas[0].info.participants[0].summonerName));
    
    useEffect(() => {
    },[matchDatas])

    const baseStyle = css`
        width: 100%;
        margin-top : 30px;
    `;

    return (
    <div className="match_list_layer" css={baseStyle}>
        {matchDatas.map((match : any, idx : number) => {
            // if(idx == 1)
            if(true)
            return <div>
                {<MatchInfoLayer matchData={match.info} searchId={summonerId} key={idx}></MatchInfoLayer>
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