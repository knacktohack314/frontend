import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/api/axios";
import { setAnalyticsData } from "@/state/slices/analyticsSlice";
import UserWiseAnalytics from "./UserWiseAnalytics";
import SixHourAnalysis from "./analytics/SixHourAnalysis";
import DailyAnalytics from "./analytics/DailyAnalytics";
export default function AdminAnalytics() {
  const dispatch = useDispatch();
  const analyticsData = useSelector(
    (state) => state.analyticsData.analyticsData
  );

  // fetch the data here

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/analytics");
      console.log(response.data);
      dispatch(setAnalyticsData(response.data));
      localStorage.setItem("analyticsData", JSON.stringify(response.data));
    };

    fetchData();
  }, [dispatch]);

  return (
    // <main className=" flex-1 flex-col gap-4 justify-center items-center  overflow-auto md:grid-cols-2 p-4 lg:grid-cols-2 border-2 border-primary">
    <Tabs defaultValue="daily">
      <TabsList className="top-2 w-fit text-xs sticky">
        <TabsTrigger value="daily">Daily Analytics</TabsTrigger>
        {/* <TabsTrigger value="six_hrs" variant="primary">
          6 hrs Analytics
        </TabsTrigger> */}
        <TabsTrigger value="userwise">User Wise Analysis</TabsTrigger>
      </TabsList>
      {/* <TabsContent value="six_hrs">
        <SixHourAnalysis analyticsData={analyticsData} />
      </TabsContent> */}
      <TabsContent value="daily">
        <DailyAnalytics analyticsData={analyticsData} />
      </TabsContent>
      <TabsContent value="userwise">
        <UserWiseAnalytics analyticsData={analyticsData} />
      </TabsContent>
    </Tabs>
    // </main>
  );
}
