import React from "react";
import { useGetAllCategoriesQuery } from "../api/categoryApi";
import CategoryItem from "../components/Category/CategoryItem";
import ProfileCard from "../components/Cards/ProfileCard";

const Category = () => {
  // Use the RTK Query hook to fetch categories
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();

  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row g-4">
          <ProfileCard />

          <div className="col-xl-8">
            <div className="card content-box-card">
              <div className="card-body">
                <div className="top-info">
                  <div className="text">
                    <h1 className="main-title">
                      <span>Total Categories Listed</span>
                    </h1>
                  </div>
                </div>

                {isLoading ? (
                  <p>Loading categories...</p>
                ) : isError ? (
                  <p>Error fetching categories. Please try again.</p>
                ) : (
                  <div className="services">
                    <div className="row g-4">
                      {categories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
