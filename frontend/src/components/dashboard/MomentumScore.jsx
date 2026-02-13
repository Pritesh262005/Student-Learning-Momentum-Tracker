import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getMomentumColor, getMomentumBgColor } from '../../utils/helpers';

const MomentumScore = ({ momentum }) => {
  if (!momentum) return null;

  const getTrendIcon = () => {
    if (momentum.trend === 'improving') return <TrendingUp className="text-green-600" />;
    if (momentum.trend === 'declining') return <TrendingDown className="text-red-600" />;
    return <Minus className="text-gray-600" />;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Momentum Score</h2>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`text-6xl font-bold ${getMomentumColor(momentum.score)}`}>
            {momentum.score}
          </div>
          <div className="flex items-center space-x-2">
            {getTrendIcon()}
            <span className="text-sm font-medium capitalize">{momentum.trend}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`inline-block px-4 py-2 rounded-full ${getMomentumBgColor(momentum.score)}`}>
            <span className={`font-medium ${getMomentumColor(momentum.score)}`}>
              {momentum.score >= 80 ? 'Excellent' : 
               momentum.score >= 60 ? 'Good' : 
               momentum.score >= 40 ? 'Fair' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{momentum.breakdown.consistency}</p>
          <p className="text-xs text-gray-600">Consistency</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{momentum.breakdown.studyTrend}</p>
          <p className="text-xs text-gray-600">Study Trend</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{momentum.breakdown.goalCompletion}</p>
          <p className="text-xs text-gray-600">Goal Completion</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{momentum.breakdown.assignmentPerformance}</p>
          <p className="text-xs text-gray-600">Assignment Performance</p>
        </div>
      </div>

      {/* Suggestions */}
      {momentum.suggestions && momentum.suggestions.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Suggestions</h3>
          <ul className="space-y-1">
            {momentum.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-primary mr-2">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MomentumScore;
