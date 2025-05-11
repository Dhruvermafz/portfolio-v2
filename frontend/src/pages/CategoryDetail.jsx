import React from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../api/categoryApi";
const CategoryDetail = () => {
  const { id } = useParams();

  // Use RTK Query to fetch category data by ID
  const { data: category, isLoading, isError } = useGetCategoryByIdQuery(id);

  // Check if category is not found
  if (isLoading) {
    return (
      <section className="content-box-area mt-4">
        <div className="container">
          <p>Loading category details...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="content-box-area mt-4">
        <div className="container">
          <p>Error fetching category details. Please try again.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card content-box-card">
              <div className="card-body">
                {category ? (
                  <>
                    <h1 className="main-title">{category.name}</h1>
                    <p>{category.description}</p>

                    <div className="row g-4">
                      {category.items && category.items.length > 0 ? (
                        category.items.map((item) => (
                          <div key={item.id} className="col-md-4">
                            <div className="card item-card">
                              <div className="card-body">
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No items available in this category.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <p>Category not found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryDetail;
