import { MAP_TYPE, MAP_MENU } from '@/data/ranks';
import { css } from '@emotion/react';
import colors from '@styles/color/light';
import { radius } from '@styles/ui/spacing';
import { useState, useEffect } from 'react';


const returnMapType = (map : MAP_TYPE) => {
    return MAP_MENU[map];
}

const MatchInfoLayer = (Props : { matchData : any }) => {
    
    const matchData = Props.matchData;
    const [playerData = {}, setPlayerData] = useState(Object);
    const [isWin = false, setIsWin] = useState(Boolean);

    const calDate =  (time : number) => {
        let now = new Date();
        
    }


    useEffect(() => {
        matchData.participants.forEach((data : any) => {
            if(data.summonerName == '윤루나') {
                setPlayerData(data);
                setIsWin(data.win)
            }
        })

    },[]);



    const baseStyle = css`
        width: 100%;
        height: 150px;
        
        border-radius : 5px;
        overflow : hidden;
        ${radius.m(2)}
        padding : 10px;

        &.lose {
            background-color : ${colors.red100}
        }


    `;
    

    return (
        <div className={'match_layer ' + (isWin == true ? 'win' : 'lose')} css={baseStyle}>
            {returnMapType(matchData.gameMode)}
            {JSON.stringify(matchData)}
            <br/>
            {JSON.stringify(isWin)}
        </div>
    )

}

export default MatchInfoLayer;
