import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/utils';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700', className)}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));

Progress.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number
};

Progress.displayName = 'Progress';

export { Progress };