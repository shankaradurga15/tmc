import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red';
}

const StatCard = ({ title, value, description, icon, color }: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-500';
      case 'green': 
        return 'bg-green-100 text-green-500';
      case 'orange':
        return 'bg-orange-100 text-orange-500';
      case 'red':
        return 'bg-red-100 text-red-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
   <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
      {/* Text content on the left */}
      <div className="flex flex-col">
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <p className="text-3xl font-semibold mb-1">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Colored icon circle on the right */}
      <div className={`p-3 rounded-full ${getColorClasses()} flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
