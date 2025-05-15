
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  complaints: number;
  sterilizations: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
}

const DogControlLineChart = ({ data, title }: LineChartProps) => {
  return (
    <div className="chart-container">
      <h2 className="text-lg font-semibold mb-4 text-[#0e3624]">{title}</h2>
      <ResponsiveContainer width="100%" height="90%">
      <LineChart
  data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend wrapperStyle={{ paddingTop: "10px" }} />
  
  {/* Thicker and smoother line for Complaints */}
  <Line 
    type="basis" 
    dataKey="complaints" 
    stroke="#0e3624" 
    strokeWidth={3}
    dot={false} 
    name="Tree Planted" 
  />
  
  {/* Thicker and smoother line for Sterilizations */}
  <Line 
    type="basis" 
    dataKey="sterilizations" 
    stroke="#c5edd6" 
    strokeWidth={3}
    dot={false} 
    name="Inspections" 
  />
</LineChart>

      </ResponsiveContainer>
    </div>
  );
};

export default DogControlLineChart;
