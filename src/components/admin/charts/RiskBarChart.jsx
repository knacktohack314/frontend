/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";

const RiskBarChart = () => {
  const analyticsData = useSelector(
    (state) => state.analyticsData.analyticsData
  );
  const [riskChartData, setRiskChartData] = useState({
    labels: localStorage.getItem("risk_labels") || [],
    datasets: [
      {
        label: "Risk Count ",
        data: localStorage.getItem("risk_counts") || [],
        backgroundColor: ["#E11D47"],
        borderColor: "#E11D47",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (analyticsData.length === 0) return;

    // Count occurrences of each risk level
    function calculateRiskLevel() {
      const riskCounts = analyticsData.reduce((acc, entry) => {
        const risk = entry.risk;
        if (risk === undefined || risk === null || risk === 0) return acc;
        acc[risk] = (acc[risk] || 0) + 1;
        return acc;
      }, {});

      for (let i = 1; i <= 5; i++) {
        if (!(i in riskCounts)) {
          riskCounts[i] = 0;
        }
      }

      // Extract risk levels and counts
      const labels = Object.keys(riskCounts).map(
        (risk) => "Risk Level " + risk.toString()
      );
      const counts = Object.values(riskCounts);

      return { labels, counts };
    }

    const { labels, counts } = calculateRiskLevel();

    setRiskChartData({
      labels,
      datasets: [
        {
          label: "Risk Counts",
          data: counts,
          minBarLength: 5,
          backgroundColor: ["#E11D4780"],
          borderColor: "#E11D47",
          borderWidth: 1,
        },
      ],
    });
    console.log("Risk Chart Data", labels, counts);
    localStorage.setItem("risk_labels", labels);
    localStorage.setItem("risk_counts", counts);
  }, [analyticsData]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: "#fff",
      },
    },
    // scales: {
    //   yAxes: [
    //     {
    //       display: false,
    //       ticks: {
    //         beginAtZero: true,
    //         min: 0,
    //         suggestedMin: 0,
    //       },
    //     },
    //   ],
    //   xAxes: [
    //     {
    //       display: false,
    //       ticks: {
    //         beginAtZero: true,
    //         min: 0,
    //         suggestedMin: 0,
    //       },
    //     },
    //   ],
    // },
  };
  Chart.register(...registerables);
  return (
    <div className="col-span-12 rounded-xl  bg-black p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <Card className="bg-black text-black border-none">
        <CardHeader>
          <CardTitle className="text-white">
            Overall Risk Counts for all time
          </CardTitle>
          <CardDescription>
            This graph shows the counts for the 5 levels of risks that
            EthiCheck.AI categorizes the violations into
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 ">
          <Bar
            data={riskChartData}
            options={lineOptions}
            plugins={[ChartDataLabels]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskBarChart;
