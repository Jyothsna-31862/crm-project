import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Users, DollarSign, CheckSquare } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState([
    { 
      title: 'Total Contacts', 
      value: '1,234', 
      icon: <Users className="h-6 w-6" />,
      change: '+12%',
      trend: 'up',
      color: 'bg-blue-500'
    },
    { 
      title: 'Active Deals', 
      value: '45', 
      icon: <Activity className="h-6 w-6" />,
      change: '+5%',
      trend: 'up',
      color: 'bg-purple-500'
    },
    { 
      title: 'Revenue', 
      value: '$123,456', 
      icon: <DollarSign className="h-6 w-6" />,
      change: '-3%',
      trend: 'down',
      color: 'bg-green-500'
    },
    { 
      title: 'Tasks', 
      value: '23', 
      icon: <CheckSquare className="h-6 w-6" />,
      change: '+8%',
      trend: 'up',
      color: 'bg-orange-500'
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.title} 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-1 border border-gray-100"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="mt-4 flex items-center">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} since last month
                </span>
              </div>
            </div>
            <div className={`h-1 w-full ${stat.color}`}></div>
          </div>
        ))}
      </div>
      
      {/* Additional dashboard components could go here */}
    </div>
  );
}

export default Dashboard;