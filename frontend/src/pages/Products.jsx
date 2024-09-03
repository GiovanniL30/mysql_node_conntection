import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null); // Use null to better differentiate between errors
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:1099/products", {
          method: "GET",
        });

        if (response.ok) {
          const resData = await response.json();
          setData(resData);
        } else {
          const errorData = await response.json();
          // Encode message for safe URL usage
          const encodedMessage = encodeURIComponent(errorData.message);
          navigate(`/login?message=${encodedMessage}`);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching products.");
      }
    }

    fetchProducts();
  }, [navigate]); // Add navigate to the dependency array

  // Conditional rendering for error handling
  if (error) {
    return <div>{error}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Products;
