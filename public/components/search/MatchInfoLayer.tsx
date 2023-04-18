import { MAP_TYPE, MAP_MENU } from '@/data/ranks';
import { css } from '@emotion/react';
import colors from '@styles/color/light';
import { radius, spacing } from '@styles/ui/spacing';
import { useState, useEffect } from 'react';

//functions
import { calDate, calTime } from './functions';

const returnMapType = (map : MAP_TYPE) => {
    return MAP_MENU[map];
}

const MatchInfoLayer = (Props : { matchData : any }) => {
    
    const matchData = Props.matchData;
    const [playerData = {}, setPlayerData] = useState(Object);
    const [isWin = false, setIsWin] = useState(Boolean);

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

        overflow : hidden;
        ${radius.m(2)}
        padding : 10px;

        ${spacing.df_sb()}
        .gb_line {
            width: 50px;
            height: 1px;
            ${spacing.my(3)}
        }

        &.lose {
            background-color : ${colors.red100};
            color : ${colors.red600};
            
            .gb_line {
                background-color : ${colors.red300};
            }
        }

        &.win {
            background-color : ${colors.blue100};
            color : ${colors.blue600};

            .gb_line {
                background-color : ${colors.blue300};
            }
        }


    `;
    

    return (
        <div className={'match_layer ' + (isWin == true ? 'win' : 'lose')} css={baseStyle}>
            <div className='left_layer'>
                <p>{returnMapType(matchData.gameMode)}</p>
                {/* <p>{JSON.stringify(matchData)}</p> */}
                <p className='ori_text_1 fs_10'>{calDate(matchData.gameEndTimestamp)}</p>
                <div className='gb_line'></div>
                <p>{isWin ? '승리' : '패배'}</p>    
                <p className='ori_text_1 fs_10'>{calTime(matchData.gameDuration)}</p>
            </div>
            
        </div>
    )

}

export default MatchInfoLayer;
