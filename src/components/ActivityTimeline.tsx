import React from 'react';
import {
  Check,
  AlertTriangle,
  Clock
} from 'lucide-react'; // Lucide icons

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'resolved' | 'sterilized' | 'registered' | 'assigned' | 'unassigned';
}

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  const getIconForType = (type: ActivityItem['type']) => {
      let bgColor;
      let icon
    switch (type) {
      case 'resolved':
      case 'sterilized':
      case 'unassigned':
         icon = <Check size={16} className="text-green-400 mt-[2px]" />;
      bgColor = 'bg-green-100';
      break;
    case 'registered':
      icon = <AlertTriangle size={16} className="text-yellow-400 mt-[2px]" />;
      bgColor = 'bg-yellow-100';
      break;
    case 'assigned':
      icon = <Clock size={16} className="text-gray-400 mt-[2px]" />;
      bgColor = 'bg-gray-100';
      break;
    default:
      return null;
  }
  
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center ${bgColor} shadow-sm`}>
      {icon}
    </div>
  );
};

  return (
    <div className="bg-white p-4 rounded-md shadow h-full">
      <h2 className="text-lg font-semibold mb-4 text-[#0e3624]">Recent Inspections</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start justify-between">
            <div className="flex gap-5 items-start">
              {getIconForType(activity.type)}
              <div>
                <p className="font-medium text-sm text-black">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{activity.timeAgo}</span>
          </div>
        ))}
      </div>

      <div className="text-left pt-4">
        <button
          className="text-sm font-medium"
          style={{ color: '#0e3624', cursor: 'pointer' }}
        >
          View All Inspections
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;
