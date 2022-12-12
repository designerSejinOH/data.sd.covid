import React from "react";
import { useCovidData } from "../hooks/useCovidData";

export default function DataBoard() {
  const { data: covidData } = useCovidData();

  return (
    <>
      <div className="absolute justify-self-center self-center z-10 text-white ">
        <div className="text-2xl font-bold m-10">
          성동구소재 코로나현황 데이터 시각화 프로젝트
        </div>
        <div className="m-10 hidden mobile:block">
          <div className="text-base w-fit leading-10">
            <li>도시 : {covidData.city}</li>
            <li> 도시 밀집도 : {covidData.lvl}</li>
            <li>기준날짜 : {covidData.date}</li>
            <li>총 생활인구 수 : {covidData.pp}</li>
            <li>내국인 생활인구 수 : {covidData.inpp}</li>
            <li>도시 코로나 확진자 수 : {covidData.covid}</li>
            <li>도시 추가 확진자 수 : {covidData.nCovid}</li>
            <li>도시 확진자 비율 : {covidData.perCovid}</li>
          </div>
        </div>
      </div>
    </>
  );
}
