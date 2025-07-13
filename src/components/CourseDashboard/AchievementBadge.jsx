import React from 'react';
import PropTypes from 'prop-types';
import { Trophy, Award, Star, Zap, CheckCircle, Flame, Bookmark, Gem } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';

/**
 * AchievementBadge - Displays a user achievement with interactive tooltip
 * @param {Object} props
 * @param {string} props.title - Achievement title
 * @param {string} props.description - Achievement description
 * @param {string} props.type - Type of achievement
 * @param {string} props.tier - Tier of achievement (bronze, silver, gold, platinum)
 * @param {boolean} props.unlocked - Whether the achievement is unlocked
 * @param {string} props.date - Date when achievement was unlocked
 * @param {boolean} props.small - Whether to display a small version
 */
export const AchievementBadge = ({ 
  title, 
  description, 
  type, 
  tier = 'bronze', 
  unlocked = false, 
  date, 
  small = false 
}) => {
  // Get icon based on achievement type
  const getIcon = () => {
    switch (type) {
      case 'completion':
        return <CheckCircle className="h-full w-full" />;
      case 'streak':
        return <Flame className="h-full w-full" />;
      case 'speed':
        return <Zap className="h-full w-full" />;
      case 'mastery':
        return <Bookmark className="h-full w-full" />;
      case 'perfect':
        return <Star className="h-full w-full" />;
      default:
        return <Award className="h-full w-full" />;
    }
  };

  // Get colors based on tier
  const getColors = () => {
    switch (tier) {
      case 'bronze':
        return {
          bg: unlocked ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-gray-100 dark:bg-gray-800',
          border: unlocked ? 'border-amber-300 dark:border-amber-700' : 'border-gray-300 dark:border-gray-700',
          text: unlocked ? 'text-amber-800 dark:text-amber-200' : 'text-gray-500 dark:text-gray-400',
          icon: unlocked ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'
        };
      case 'silver':
        return {
          bg: unlocked ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-800',
          border: unlocked ? 'border-gray-300 dark:border-gray-600' : 'border-gray-300 dark:border-gray-700',
          text: unlocked ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400',
          icon: unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
        };
      case 'gold':
        return {
          bg: unlocked ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-gray-100 dark:bg-gray-800',
          border: unlocked ? 'border-yellow-300 dark:border-yellow-700' : 'border-gray-300 dark:border-gray-700',
          text: unlocked ? 'text-yellow-800 dark:text-yellow-200' : 'text-gray-500 dark:text-gray-400',
          icon: unlocked ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500'
        };
      case 'platinum':
        return {
          bg: unlocked ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-800',
          border: unlocked ? 'border-blue-300 dark:border-blue-700' : 'border-gray-300 dark:border-gray-700',
          text: unlocked ? 'text-blue-800 dark:text-blue-200' : 'text-gray-500 dark:text-gray-400',
          icon: unlocked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
        };
      default:
        return {
          bg: unlocked ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-gray-100 dark:bg-gray-800',
          border: unlocked ? 'border-amber-300 dark:border-amber-700' : 'border-gray-300 dark:border-gray-700',
          text: unlocked ? 'text-amber-800 dark:text-amber-200' : 'text-gray-500 dark:text-gray-400',
          icon: unlocked ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'
        };
    }
  };

  const colors = getColors();
  const sizeClasses = small ? 'h-10 w-10' : 'h-16 w-16';
  const iconSize = small ? 'h-5 w-5' : 'h-8 w-8';

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(
          "rounded-full flex items-center justify-center border-2 relative transition-all",
          sizeClasses,
          colors.bg,
          colors.border,
          !unlocked && 'grayscale opacity-80'
        )}>
          <div className={cn(
            "flex items-center justify-center",
            iconSize,
            colors.icon
          )}>
            {getIcon()}
          </div>
          
          {/* Tier indicator */}
          {!small && (
            <div className={cn(
              "absolute -bottom-1 -right-1 rounded-full border-2 h-5 w-5 flex items-center justify-center",
              colors.border,
              tier === 'bronze' ? 'bg-amber-400 dark:bg-amber-600' :
              tier === 'silver' ? 'bg-gray-300 dark:bg-gray-500' :
              tier === 'gold' ? 'bg-yellow-400 dark:bg-yellow-600' :
              'bg-blue-400 dark:bg-blue-600'
            )}>
              {tier === 'bronze' && <span className="text-xs font-bold text-amber-900">B</span>}
              {tier === 'silver' && <span className="text-xs font-bold text-gray-900">S</span>}
              {tier === 'gold' && <span className="text-xs font-bold text-yellow-900">G</span>}
              {tier === 'platinum' && <span className="text-xs font-bold text-blue-900">P</span>}
            </div>
          )}
        </div>
      </TooltipTrigger>
      
      <TooltipContent className="max-w-xs">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className={cn(
              "rounded-full h-6 w-6 flex items-center justify-center mr-2",
              colors.bg,
              colors.border
            )}>
              <div className={cn("h-3 w-3", colors.icon)}>
                {getIcon()}
              </div>
            </div>
            <h3 className={cn("font-semibold", colors.text)}>{title}</h3>
          </div>
          <p className="text-sm">{description}</p>
          {unlocked ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Unlocked on {date || 'an unknown date'}
            </p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Locked - keep learning to unlock!
            </p>
          )}
          <div className="flex items-center text-xs">
            <span className={cn(
              "px-2 py-0.5 rounded-full capitalize",
              tier === 'bronze' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' :
              tier === 'silver' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' :
              tier === 'gold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200' :
              'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
            )}>
              {tier} tier
            </span>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

AchievementBadge.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['completion', 'streak', 'speed', 'mastery', 'perfect', 'other']).isRequired,
  tier: PropTypes.oneOf(['bronze', 'silver', 'gold', 'platinum']),
  unlocked: PropTypes.bool,
  date: PropTypes.string,
  small: PropTypes.bool,
};

AchievementBadge.defaultProps = {
  tier: 'bronze',
  unlocked: false,
  small: false,
};

export default AchievementBadge;