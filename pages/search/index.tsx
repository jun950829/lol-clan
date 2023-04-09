import type { NextPage } from "next";
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { searchBtn } from 'styles/globalstyle';
import Image from 'next/image';
import RankInfoLayer from '@/components/search/RankInfoLayer';
import MatchListLayer from '@/components/search/MatchListLayer';
import colors from "@styles/color/light";
import { radius } from "@styles/ui/spacing";


const SearchSection : NextPage = (props : any) => {
    const [inputs, setInputs] = useState({
        summonerId: '',
    })
    const [summonerData, setSummonerData] = useState(Object);
    const [isSearch = false, setIsSearch] = useState(Boolean);

    const { summonerId } = inputs;

    const onChange = (e : { target: { value: React.SetStateAction<string>, name : string;}; }) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name] : value
        })
    }

    const baseStyle = css`

        input {
            width: 60%;
            height: 50px;
            border: 1px solid #333333;
            border-radius: 5px;
            background: #E9E9E9;
            border-radius: 3px;
            border:none;
            padding-left: 10px;
        }

        .middle_layer {
            width : 1200px;
            margin: 50px auto;
        }

        .input_layer {
            width : 80%;
            height: 100px;
            margin: 0 auto;

            display : flex;
            flex-direction : row;
            justify-content : space-around;
            align-items : center;

            background-color : ${colors.main400};
            ${radius.m(10)}
        }

        .rank_info_layer {
            width: 100%;
            display : flex;
            flex-direction : row;
            justify-content : space-around;

        }

        .summoner_layer {
            width: 100%;

            p {
                margin : 10px 0;
                text-align : center;
            }

            .profile_icon {
                position : relative;
                width: 150px;
                height: 150px;
                margin : 0 auto;
                border-radius : 20%;
                overflow : hidden;
            }

            .profile_levl {
                position : absolute;
                width: 50px;
                height: 25px;
                lineheight : 25px;
                bottom : 0;
                left : 50%;
                transform : translateX(-50%);
                border-radius : 20%;
                background-color : #333333;
                color : #ffffff;
                font-size : 15px;
                text-align: center;
            } 
        }
    `;

    const apiTest = async (pid :string) => {

        const response = await fetch(`/api/search/${pid}`);
        if(response.ok) {
            const result = await response.json();
            // console.log(result);
            await setSummonerData(result);

            if(summonerData) {
                setIsSearch(true);
            }
        }
    }

    useEffect(()=> {

    },[summonerData])


    return (
        <section css={baseStyle} className="center">
            {isSearch ?
            <div className="middle_layer">
                <div className="summoner_layer">
                    <div className="profile_icon">
                        <Image src={summonerData.profileIconUrl} width={150} height={150} alt="소환사 아이콘"></Image>
                        <div className="profile_levl">{summonerData.summonerLevel}</div>
                    </div>
                    <p>최근 업데이트 날짜 : {summonerData.revisionDate}</p>
                </div>

                <div className="rank_info_layer">
                    {summonerData.rankData.map((rankData : any, idx : any) => (
                        <RankInfoLayer rankData={rankData} rankImageUrl={summonerData.rankImageUrl} key={idx}></RankInfoLayer>
                    ))}
                </div>

            </div> : <div css={css`width: 100%;height: 200px;`}></div>}

            <div className="input_layer">
                <input name="summonerId" className={'id_input'} placeholder={'소환사 이름을 입력하세요.'} value={summonerId} onChange={onChange}></input>
                <button css={searchBtn} onClick={() => {
                apiTest(summonerId)} }>검색</button>
            </div>

            {isSearch ?
            <MatchListLayer matchList={summonerData.matchDataList}></MatchListLayer>
            : <></>}

        </section>
    );

}


export default SearchSection;
