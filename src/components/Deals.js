import React, { useState } from 'react';
import { 
  DollarSign, 
  Edit, 
  Trash2, 
  Plus, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  X 
} from 'lucide-react';

function Deals() {
  const [deals, setDeals] = useState([
    { 
      id: 1, 
      title: 'Enterprise Deal', 
      value: 50000, 
      stage: 'Negotiation', 
      company: 'ABC Corp',
      progress: 75,
      lastActivity: '2 days ago' 
    },
    { 
      id: 2, 
      title: 'Software License', 
      value: 25000, 
      stage: 'Proposal', 
      company: 'XYZ Ltd',
      progress: 45,
      lastActivity: 'Today' 
    },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: '',
    company: '',
    value: '',
    stage: 'Proposal',
    progress: 10
  });
  const [formErrors, setFormErrors] = useState({});

  const handleDelete = (id) => {
    setDeals(deals.filter(deal => deal.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeal({
      ...newDeal,
      [name]: name === 'value' ? (value === '' ? '' : Number(value)) : value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newDeal.title.trim()) errors.title = 'Deal title is required';
    if (!newDeal.company.trim()) errors.company = 'Company name is required';
    if (!newDeal.value) errors.value = 'Deal value is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const highestId = deals.length > 0 ? Math.max(...deals.map(deal => deal.id)) : 0;
    
    const dealToAdd = {
      id: highestId + 1,
      ...newDeal,
      lastActivity: 'Just now'
    };
    
    setDeals([...deals, dealToAdd]);
    setNewDeal({
      title: '',
      company: '',
      value: '',
      stage: 'Proposal',
      progress: 10
    });
    setShowModal(false);
  };

  const getStageIcon = (stage) => {
    switch(stage) {
      case 'Proposal':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Negotiation':
        return <TrendingUp className="h-5 w-5 text-orange-500" />;
      case 'Closing':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case 'Won':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Deals</h2>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 shadow-md hover:shadow-lg"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Deal
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800">Active Deals</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deal</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, index) => (
                <tr 
                  key={deal.id} 
                  className={`hover:bg-gray-50 transition-colors duration-150 ${index !== deals.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{deal.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{deal.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                      <span className="font-semibold text-gray-900">{deal.value.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStageIcon(deal.stage)}
                      <span className="ml-2 text-sm">{deal.stage}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${deal.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{deal.progress}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{deal.lastActivity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-md hover:bg-blue-50 transition-colors duration-150">
                        <Edit className="h-5 w-5 text-blue-600" />
                      </button>
                      <button 
                        className="p-1 rounded-md hover:bg-red-50 transition-colors duration-150"
                        onClick={() => handleDelete(deal.id)}
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {deals.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No deals available. Click "New Deal" to create one.
          </div>
        )}
      </div>

      {/* Add New Deal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Deal</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newDeal.title}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${formErrors.title ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter deal title"
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name*
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={newDeal.company}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border ${formErrors.company ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter company name"
                  />
                  {formErrors.company && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.company}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Value*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="value"
                      name="value"
                      value={newDeal.value}
                      onChange={handleInputChange}
                      className={`w-full rounded-md border ${formErrors.value ? 'border-red-500' : 'border-gray-300'} shadow-sm pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  {formErrors.value && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.value}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                    Deal Stage
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    value={newDeal.stage}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closing">Closing</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                    Progress ({newDeal.progress}%)
                  </label>
                  <input
                    type="range"
                    id="progress"
                    name="progress"
                    min="0"
                    max="100"
                    value={newDeal.progress}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deals;