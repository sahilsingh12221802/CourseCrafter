import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const ResourcePanel = ({
  resources,
  isLoading,
  error,
  onOpenResource,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-full mb-2" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <span className="text-red-600" role="alert">
            {error}
          </span>
        </CardContent>
      </Card>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto my-6">
        <CardContent>
          <p className="text-gray-600">No resources available for this lesson.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-6">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Resources</h2>
        <ul className="space-y-3">
          {resources.map((res, idx) => (
            <li key={idx}>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => onOpenResource(res)}
                aria-label={`Open resource: ${res.title}`}
              >
                <span className="font-medium">{res.title}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {res.type === "pdf" ? "PDF" : "Link"}
                </span>
              </Button>
              {res.description && (
                <p className="text-gray-500 text-sm mt-1">{res.description}</p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

ResourcePanel.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["pdf", "link"]).isRequired,
      description: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onOpenResource: PropTypes.func,
};

ResourcePanel.defaultProps = {
  resources: [],
  isLoading: false,
  error: "",
  onOpenResource: (res) => {
    // For UI demo: open in new tab
    window.open(res.url, "_blank", "noopener,noreferrer");
  },
};

export default ResourcePanel;
