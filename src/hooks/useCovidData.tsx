import axios from "axios";
import { useEffect, useState } from "react";

export const useCovidData = () => {
  const [data, cookData] = useState({
    city: "",
    lvl: "",
    date: "",
    pp: 0,
    inpp: 0,
    ppMax: 0,
    ppMin: 0,
    covid: 0,
    nCovid: 0,
    perCovid: 0,
    perNCovid: 0,
    ppMaxVal: 0,
    ppMinVal: 0,
    ppCount: 0,
  });
  useEffect(() => {
    axios
      .get(
        "https://datacook.org/api/open/dishes?id=4388&token=SK6250UN3SUWvTEWKwOb81225"
      )
      .then((response) => {
        let ppCount_ = 0;
        cookData((prevData) => {
          if (response.data.lvl === "여유") {
            ppCount_ = 20;
          } else if (response.data.lvl === "보통") {
            ppCount_ = 40;
          } else if (response.data.lvl === "혼잡") {
            ppCount_ = 60;
          } else if (response.data.lvl === "매우혼잡") {
            ppCount_ = 80;
          } else if (response.data.lvl === "위험") {
            ppCount_ = 100;
          }

          return {
            ...prevData,
            city: response.data.city,
            lvl: response.data.lvl,
            date: response.data.date,
            pp: response.data.pp,
            inpp: response.data.inpp,
            ppMax: response.data.ppMax,
            ppMin: response.data.ppMin,
            covid: response.data.covid,
            nCovid: response.data.nCovid,
            perCovid: response.data.covid / response.data.pp,
            perNCovid: (response.data.nCovid / response.data.pp) * 50,
            ppMaxVal: response.data.ppMaxVal / 100,
            ppMinVal: response.data.ppMinVal / 100,
            ppCount: ppCount_,
          };
        });
      });
  }, []);

  return { data };
};
