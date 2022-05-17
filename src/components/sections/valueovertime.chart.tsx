import React, { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import AppContext from '../../utils/context';
import { useParams } from 'react-router-dom';
import { AuthApiProvider } from '../../providers/api.provider';

const { faker } = require('@faker-js/faker');






ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




export default function Hello() {
  const appContext = useContext(AppContext);
  const param = useParams();
  const apiProvider = new AuthApiProvider();

  const [labels, setLabel] = useState<any[]>();
  const [data1, setData] = useState<any[]>();
  
  useEffect(()=>{
    apiProvider.valueOvertime().then((res:any) => {
      console.log(res);
      var tempLabel:any = [];
      var tempData:any = [];
      res.forEach((data:any)=>{
      tempLabel.push(data._id);
      tempData.push(data.total);
      });
      setLabel(tempLabel);
      setData(tempData);
    }).catch((error) => {
      alert(error)
    })
  },[]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue Expenditure Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: data1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return <Line options={options} data={data} />;
}
