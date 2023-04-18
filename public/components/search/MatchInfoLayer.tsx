import { MAP_TYPE, MAP_MENU } from '@/data/ranks';
import { SPELL_TYPE, SPELL_MENU } from '@/data/info';
import { css } from '@emotion/react';
import colors from '@styles/color/light';
import Image from 'next/image';
import { radius, spacing } from '@styles/ui/spacing';
import { useState, useEffect } from 'react';

//functions
import { calDate, calTime } from './functions';

const returnMapType = (map : MAP_TYPE) => {
    return MAP_MENU[map];
}

const returnSpellType = (spell : SPELL_TYPE) => {
    return SPELL_MENU[spell];
}

const MatchInfoLayer = (Props : { matchData : any, searchId : string }) => {
    
    const matchData = Props.matchData;
    const searchId = Props.searchId;
    const [playerData = null, setPlayerData] = useState(Object);
    const [isWin = false, setIsWin] = useState(Boolean);

    let champUrl = 'https://opgg-static.akamaized.net/meta/images/lol/champion/';
    let itemUrl = 'https://opgg-static.akamaized.net/meta/images/lol/item/';
    let spellUrl = 'https://opgg-static.akamaized.net/meta/images/lol/spell/';
    let perkUrl = 'https://opgg-static.akamaized.net/meta/images/lol/perk/';
    let perkStyleUrl = 'https://opgg-static.akamaized.net/meta/images/lol/perkStyle/';


    useEffect(() => {
        matchData.participants.forEach((data : any) => {
            if(data.summonerName == searchId) {
                // console.log(data);
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

        .game_layer {
            width: 300px;

            .champ_info, .items_layer {
                width: 100%;
                ${spacing.df_sb()}
                ${spacing.my(2)}
            }
            .items_layer {
                div {
                    ${radius.m(1)}
                    &.win {
                        background-color : ${colors.blue200};
                    }
                    &.lose {
                        background-color : ${colors.red200};
                    }
                }
                img {
                    ${radius.m(1)}
                    &:last-child {
                        ${radius.m(4)}
                    }
                }
            }

            .champ_img {

                ${spacing.df_sb()}
                position : relative;
                
                img {
                    ${radius.m(10)}
                    overflow : hidden;
                }

            }

            .spell_layer {
                img {
                    ${radius.m(10)}
                    overflow : hidden;
                    width: 40px;
                    height: 40px;
                }
            }
            
            .champ_levl {
                width: 20px;
                height : 20px;
                line-height : 20px;

                text-align : center;
                background-color : #000000;
                color : #ffffff;
                ${radius.m(10)}
                position : absolute;
                bottom : 0px;
                right : 0px;
                z-index : 10;
            }
        }
    `;
    

    return (
        <div className={'match_layer ' + (isWin == true ? 'win' : 'lose')} css={baseStyle}>
            <div className='left_layer'>
                <p className='fs_14'>{returnMapType(matchData.gameMode)}</p>
                {/* <p>{JSON.stringify(matchData)}</p> */}
                <p className='ori_text_1 fs_12'>{calDate(matchData.gameEndTimestamp)}</p>
                <div className='gb_line'></div>
                <p>{isWin ? '승리' : '패배'}</p>    
                <p className='ori_text_1 fs_12'>{calTime(matchData.gameDuration)}</p>
            </div>

            {playerData.championName !== undefined ?
                      <div className='game_layer'>
                      <div className='champ_info'>
                          <div className='champ_img'>
                              <Image  src={`${champUrl}${playerData.championName}.png`} width={80} height={80} alt={'챔프이름'}/>
                              <p className='champ_levl fs_12'>{playerData.champLevel}</p>
                          </div>
                          <div className='spell_layer'>
                              <Image  src={`${spellUrl}${returnSpellType(playerData.summoner1Id)}.png`} width={35} height={35} alt={'소환사주문'}/>
                              <Image  src={`${spellUrl}${returnSpellType(playerData.summoner2Id)}.png`} width={35} height={35} alt={'소환사주문'}/>
                          </div>
                          <div className='perk_layer'>
                              <Image  src={`${perkUrl}${playerData.perks.styles[0].selections[0].perk}.png`} width={40} height={40} alt={'메인룬'}/>
                              <Image  src={`${perkStyleUrl}${playerData.perks.styles[1].style}.png`} width={35} height={35} alt={'서브룬'}/>
                          </div>
                          <div className='kda_layer'>
                              <p>{playerData.kills} / {playerData.deaths} / {playerData.assists}</p>
                              <p className='ori_text_1'> {((playerData.kills + playerData.assists) / playerData.deaths).toFixed(2)}평점</p>
                          </div>
                      </div>
                      <div className='items_layer'>
                          {[playerData.item0,playerData.item1,playerData.item2,playerData.item3,playerData.item4,playerData.item5, playerData.item6].map((item, idx) => {
                              if(item == 0) {
                                  return <div className={(isWin == true ? 'win' : 'lose')} css={css`width: 40px; height: 40px;`}></div>
                              } else {
                                  return <Image src={`${itemUrl}${item}.png`} alt='아이템' width={40} height={40} key={idx}></Image>
                              }
                          })}
                      </div>
      
                  </div> : <></>
        }
  

            <div className='killscore_layer'>

            </div>

            <div className='summonerList'>
                <p>소환사들</p>
            </div>
            
        </div> 
    )

}

export default MatchInfoLayer;
