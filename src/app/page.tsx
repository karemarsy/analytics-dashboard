// app/page.tsx
"use client";

import { Activity, BarChart, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import CustomerTable from "./components/CustomerTable";
import StatsCard from "./components/StatsCard";
import VisitsChart from "./components/VisitsChart";

interface DashboardData {
  visits: Array<{
    date: string;
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: string;
    avgSessionDuration: number;
  }>;
  customers: Array<{
    id: number;
    name: string;
    email: string;
    signupDate: string;
    lastActivity: string;
  }>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mock-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error || "No data available"}
      </div>
    );
  }

  // Calculate summary statistics
  const totalVisitors = data.visits.reduce(
    (sum, day) => sum + day.uniqueVisitors,
    0
  );
  const avgBounceRate = (
    data.visits.reduce((sum, day) => sum + parseFloat(day.bounceRate), 0) /
    data.visits.length
  ).toFixed(1);
  const avgSessionDuration = Math.floor(
    data.visits.reduce((sum, day) => sum + day.avgSessionDuration, 0) /
      data.visits.length
  );

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor your website performance and customer data
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Total Visitors"
          value={totalVisitors.toLocaleString()}
          icon={BarChart}
        />
        <StatsCard
          title="Avg. Bounce Rate"
          value={`${avgBounceRate}%`}
          icon={Activity}
        />

        <StatsCard
          title="Avg. Session Duration"
          value={`${Math.floor(avgSessionDuration / 60)}m ${
            avgSessionDuration % 60
          }s`}
          icon={Clock}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Website Visits Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitsChart data={data.visits} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Data</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerTable customers={data.customers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
