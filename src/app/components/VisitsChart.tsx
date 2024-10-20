import { format, parseISO } from 'date-fns';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface VisitData {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  
}

interface VisitsChartProps {
  data: VisitData[];
}

const VisitsChart = ({ data }: VisitsChartProps) => {
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d')
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis
            dataKey="formattedDate"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: 'gray' }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: 'gray' }}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #ccc'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="pageViews"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            name="Page Views"
          />
          <Line
            type="monotone"
            dataKey="uniqueVisitors"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
            name="Unique Visitors"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitsChart;