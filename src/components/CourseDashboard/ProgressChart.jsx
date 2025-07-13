import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';
import { Bookmark, Award, Clock, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { useTheme } from '../../lib/hooks/useTheme';

/**
 * ProgressChart - Visualizes user learning progress
 * @param {Object} props
 * @param {Array} props.courseProgress - Course progress data
 * @param {Object} props.stats - Learning statistics
 */
export const ProgressChart = ({ courseProgress, stats }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('modules');

  // Custom shape for bar chart with rounded tops
  const CustomBarShape = (props) => {
    const { x, y, width, height, fill } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={4}
          ry={4}
        />
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-900 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Progress: </span>
            {payload[0].value}%
          </p>
          {payload[0].payload.completedLessons && (
            <p className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Completed: </span>
              {payload[0].payload.completedLessons} of {payload[0].payload.totalLessons}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Data for time spent chart
  const timeSpentData = [
    { name: 'Mon', value: stats.timeSpent[0] || 0 },
    { name: 'Tue', value: stats.timeSpent[1] || 0 },
    { name: 'Wed', value: stats.timeSpent[2] || 0 },
    { name: 'Thu', value: stats.timeSpent[3] || 0 },
    { name: 'Fri', value: stats.timeSpent[4] || 0 },
    { name: 'Sat', value: stats.timeSpent[5] || 0 },
    { name: 'Sun', value: stats.timeSpent[6] || 0 }
  ];

  // Color scheme based on theme
  const colors = {
    primary: theme === 'dark' ? '#3b82f6' : '#2563eb',
    secondary: theme === 'dark' ? '#7c3aed' : '#6d28d9',
    background: theme === 'dark' ? '#1e293b' : '#f1f5f9',
    text: theme === 'dark' ? '#f8fafc' : '#0f172a'
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Learning Progress
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="ml-auto">
            <TabsList>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <TabsContent value="modules" className="mt-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courseProgress}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} 
                  horizontal={false}
                />
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  tick={{ fill: colors.text }}
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tick={{ fill: colors.text }}
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f1f5f9' }}
                />
                <Bar
                  dataKey="progress"
                  shape={<CustomBarShape />}
                  background={{ fill: colors.background, radius: 4 }}
                >
                  {courseProgress.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.progress === 100 ? colors.secondary : colors.primary}
                    />
                  ))}
                  <LabelList
                    dataKey="progress"
                    position="right"
                    formatter={(value) => `${value}%`}
                    fill={colors.text}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="time" className="mt-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeSpentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} 
                />
                <XAxis 
                  dataKey="name"
                  tick={{ fill: colors.text }}
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                />
                <YAxis 
                  tick={{ fill: colors.text }}
                  stroke={theme === 'dark' ? '#64748b' : '#94a3b8'}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-900 p-3 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                          <p className="font-medium">{payload[0].payload.name}</p>
                          <p className="text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Minutes: </span>
                            {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f1f5f9' }}
                />
                <Bar
                  dataKey="value"
                  shape={<CustomBarShape />}
                  background={{ fill: colors.background, radius: 4 }}
                >
                  {timeSpentData.map((entry, index) => (
                    <Cell 
                      key={`time-cell-${index}`} 
                      fill={entry.value >= 60 ? colors.secondary : colors.primary}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Bookmark className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Modules</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {stats.completedModules}/{stats.totalModules}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.round((stats.completedModules / stats.totalModules) * 100)}% completed
            </p>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Achievements</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.achievements}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stats.recentAchievement || 'Keep learning!'}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Time Spent</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stats.dailyAverage} min/day average
            </p>
          </div>

          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-primary" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Streak</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.streak} days</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stats.streak > 0 ? 'Keep it up!' : 'Start a streak today!'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ProgressChart.propTypes = {
  courseProgress: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      completedLessons: PropTypes.number.isRequired,
      totalLessons: PropTypes.number.isRequired,
    })
  ).isRequired,
  stats: PropTypes.shape({
    completedModules: PropTypes.number.isRequired,
    totalModules: PropTypes.number.isRequired,
    achievements: PropTypes.number.isRequired,
    recentAchievement: PropTypes.string,
    totalMinutes: PropTypes.number.isRequired,
    dailyAverage: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    timeSpent: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

ProgressChart.defaultProps = {
  courseProgress: [],
  stats: {
    completedModules: 0,
    totalModules: 0,
    achievements: 0,
    recentAchievement: '',
    totalMinutes: 0,
    dailyAverage: 0,
    streak: 0,
    timeSpent: [0, 0, 0, 0, 0, 0, 0],
  },
};

export default ProgressChart;