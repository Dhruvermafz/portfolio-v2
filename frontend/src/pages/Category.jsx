import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { API_URL } from "../config"; // Assuming you have the API URL in the config file
import CategoryItem from "../components/Category/CategoryItem";
import ProfileCard from "../components/Cards/ProfileCard";
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`); // Using axios for GET request
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section class="content-box-area mt-4">
      <div class="container">
        <div class="row g-4">
          <ProfileCard />

          <div class="col-xl-8">
            <div class="card content-box-card">
              <div class="card-body">
                <div className="top-info">
                  <div className="text">
                    <h1 className="main-title">
                      <span>Total Categories Listed</span>
                    </h1>
                  </div>
                </div>

                {loading ? (
                  <p>Loading categories...</p>
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
