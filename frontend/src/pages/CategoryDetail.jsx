import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const CategoryDetail = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/${id}`);
        setCategory(response.data);
        setItems(response.data.items || []); // Items can be blogs, projects, etc.
      } catch (error) {
        console.error("Error fetching category details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  return (
    <section className="content-box-area mt-4">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card content-box-card">
              <div className="card-body">
                {loading ? (
                  <p>Loading category details...</p>
                ) : category ? (
                  <>
                    <h1 className="main-title">{category.name}</h1>
                    <p>{category.description}</p>

                    <div className="row g-4">
                      {items.length > 0 ? (
                        items.map((item) => (
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
