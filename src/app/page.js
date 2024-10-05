// "use client"; 

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategories, fetchProducts } from '../services/api';
// import { setCategories, setProducts, setSelectedCategory, incrementPage, setSearchQuery } from '../store/store';
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { categories, products, selectedCategory, page, searchQuery } = useSelector((state) => state.product);

//   useEffect(() => {
//     async function loadCategories() {
//       const categoriesData = await fetchCategories();
//       dispatch(setCategories(categoriesData));
//     }
//     loadCategories();
//   }, [dispatch]);

//   useEffect(() => {
//     async function loadProducts() {
//       const productsData = await fetchProducts(selectedCategory, 10, (page - 1) * 10);
//       dispatch(setProducts(productsData.products));
//     }
//     loadProducts();
//   }, [dispatch, selectedCategory, page]);

//   const handleCategorySelect = (category) => {
//     dispatch(setSelectedCategory(category));
//     router.push(`/?category=${category}`);
//   };

//   const handleSearch = (e) => {
//     const search = e.target.value;
//     dispatch(setSearchQuery(search));
//     router.push(`/?search=${search}`);
//   };

//   const loadMoreProducts = () => {
//     dispatch(incrementPage());
//   };

//   return (
//     <div>
//       <h1>Product Store</h1>

//       <input
//         type="text"
//         placeholder="Search products..."
//         onChange={handleSearch}
//         value={searchQuery}
//       />

//       <div>
//         <h2>Categories</h2>
//         <ul>
//           {categories.map((category) => (
//             <li key={category.slug} onClick={() => handleCategorySelect(category.slug)}>
//               {category.name} 
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Products</h2>
//         <ul>
//           {products
//             .filter((product) =>
//               product.title.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             .map((product) => (
//               <li key={product.id}>
//                 <h3>{product.title}</h3>
//                 <p>Slug: {product.slug}</p>
//                 <p>URL: <a href={product.url} target="_blank" rel="noopener noreferrer">{product.url}</a></p>
//               </li>
//             ))}
//         </ul>
//         <button onClick={loadMoreProducts}>Load More</button>
//       </div>
//     </div>
//   );
// }



// src/app/page.js
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../services/api"; // Define API functions
import { setCategories, setProducts, setSelectedCategory, incrementPage, setSearchQuery } from "../store/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories, products, selectedCategory, searchQuery } = useSelector((state) => state.product);

  // Load categories on component mount
  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await fetchCategories();
      dispatch(setCategories(categoriesData));
    }
    loadCategories();
  }, [dispatch]);

  // Load products whenever the category or search query changes
  useEffect(() => {
    async function loadProducts() {
      const productsData = await fetchProducts(selectedCategory, 10);
      dispatch(setProducts(productsData.products));
    }
    loadProducts();
  }, [dispatch, selectedCategory]);

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    router.push(`/?category=${category}`);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    dispatch(setSearchQuery(search));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Store</h1>

      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
        value={searchQuery}
        className="mb-4 p-2 border rounded"
      />

      <div>
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <ul className="mb-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="cursor-pointer p-2 border rounded hover:bg-gray-100"
              onClick={() => handleCategorySelect(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Title</th>
              <th className="py-2 px-4 border-b">Category Name</th>
              <th className="py-2 px-4 border-b">Slug</th>
              <th className="py-2 px-4 border-b">URL</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.slug}</td>
                  <td className="py-2 px-4 border-b">
                    <a href={product.url} target="_blank" rel="noopener noreferrer">
                      {product.url}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



