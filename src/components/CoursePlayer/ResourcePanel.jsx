import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FileText, Download, ExternalLink, ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useTheme } from '../../lib/hooks/useTheme';
import { Skeleton } from '../ui/skeleton';

/**
 * ResourcePanel - Component for displaying supplementary learning materials
 * @param {Object} props
 * @param {Array} props.resources - Array of resource objects
 * @param {Function} props.onResourceOpen - Callback when a resource is opened
 */
export const ResourcePanel = ({ resources, onResourceOpen }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Filter resources based on search and active tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Group resources by category
  const resourcesByCategory = filteredResources.reduce((acc, resource) => {
    const category = resource.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {});

  // Get all unique resource types for tabs
  const resourceTypes = [...new Set(resources.map(r => r.type))];

  const handleResourceClick = (resource) => {
    onResourceOpen?.(resource);
    // Track resource opens in localStorage
    const openedResources = JSON.parse(localStorage.getItem('openedResources') || '{}');
    localStorage.setItem('openedResources', 
      JSON.stringify({
        ...openedResources,
        [resource.id]: (openedResources[resource.id] || 0) + 1
      })
    );
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Learning Resources
        </h2>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Resource Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="px-4 border-b border-gray-200 dark:border-gray-700"
      >
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          {resourceTypes.map(type => (
            <TabsTrigger key={type} value={type} className="flex-1 capitalize">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Resource List */}
      <ScrollArea className="flex-1 p-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-1/3 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
            ))}
          </div>
        ) : Object.keys(resourcesByCategory).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500">
            <FileText className="h-12 w-12 mb-4 opacity-30" />
            <p>No resources found</p>
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
              <div key={category} className="space-y-2">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex items-center w-full text-left font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
                >
                  {expandedCategories[category] ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  {category} ({categoryResources.length})
                </button>

                {expandedCategories[category] !== false && (
                  <div className="ml-6 space-y-3">
                    {categoryResources.map(resource => (
                      <div 
                        key={resource.id}
                        className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1 mr-3 text-primary">
                            {resource.type === 'pdf' && <FileText className="h-5 w-5" />}
                            {resource.type === 'link' && <ExternalLink className="h-5 w-5" />}
                            {resource.type === 'cheatsheet' && <FileText className="h-5 w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{resource.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {resource.description}
                            </p>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {resource.type}
                              </span>
                              {resource.fileSize && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {resource.fileSize}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleResourceClick(resource)}
                                >
                                  {resource.type === 'link' ? (
                                    <ExternalLink className="h-4 w-4" />
                                  ) : (
                                    <Download className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {resource.type === 'link' ? 'Open link' : 'Download'}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        {filteredResources.length} resources found
      </div>
    </div>
  );
};

ResourcePanel.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      type: PropTypes.oneOf(['pdf', 'cheatsheet', 'link', 'video', 'code']).isRequired,
      category: PropTypes.string,
      url: PropTypes.string.isRequired,
      fileSize: PropTypes.string,
      lastUpdated: PropTypes.string,
    })
  ).isRequired,
  onResourceOpen: PropTypes.func,
};

ResourcePanel.defaultProps = {
  resources: [],
};

export default ResourcePanel;