import React from "react";
import { Link } from "react-router-dom";
const CategoryItem = ({ category }) => {
  return (
    <div className="col-md-3 col-sm-6 col-6">
      <div className="services-item text-center">
        <div className="text">
          <Link to={`/categories/${category.name}`}>
            <h3 className="title">{category.name}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
