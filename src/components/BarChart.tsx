
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  complaints: number;
  sterilizations: number;
}

interface BarChartProps {
  data: DataPoint[];
  title: string;
}

const DogControlBarChart = ({ data, title }: BarChartProps) => {
  return (
    <div className="chart-container">
      <h2 className="text-lg font-semibold mb-4 text-[#0e3624]">{title}</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar dataKey="complaints" fill="#0e3624" name="Tree Planted" />
          <Bar dataKey="sterilizations" fill="#c5edd6" name="New Volunteers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DogControlBarChart;
