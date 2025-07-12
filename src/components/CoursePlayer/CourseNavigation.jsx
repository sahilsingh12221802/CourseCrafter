import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const CourseNavigation = ({
  modules,
  activeModule,
  onSelectModule,
}) => (
  <Card className="w-full md:w-60">
    <CardContent>
      <h2 className="text-lg font-semibold mb-4">Modules</h2>
      <ul className="space-y-2">
        {modules.map((mod, idx) => (
          <li key={mod.id}>
            <Button
              variant={activeModule === idx ? "default" : "outline"}
              className="w-full justify-start"
              aria-current={activeModule === idx ? "page" : undefined}
              onClick={() => onSelectModule(idx)}
            >
              {mod.title}
            </Button>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

CourseNavigation.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeModule: PropTypes.number.isRequired,
  onSelectModule: PropTypes.func.isRequired,
};

export default CourseNavigation;
