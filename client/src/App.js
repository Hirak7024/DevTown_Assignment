import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from "styled-components";
import axios from "axios";
import Card from './Components/Card';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Pagination from './Components/Pagination';

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(30000);

  //For Pagination
  const { pageNumber } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber || 1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, minPrice,maxPrice]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/getProducts?page=${page}&category=${selectedCategory === "all" ? "" : selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}`)

        setPages(res.data.pages);
        setPosts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some Error Occured");
      }
    }
    fetchPosts();
  }, [page, minPrice, maxPrice, selectedCategory])

  console.log(selectedCategory);
  console.log("MinPrice : ", minPrice);
  console.log("MaxPrice : ", maxPrice);
  return (
    <AppWrapper>
      <div className="app_container">
        <Navbar setShowSideBar={setShowSideBar} />
        {showSideBar && <Sidebar
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />}
        <div className="productCards_Container">
          {loading ? (
            <h3 className="loading-text">Loading...</h3>
          ) : error ? (
            <h3 className="error-text">{error}</h3>
          ) : (
            <>
              <div className="paginated_products">
                <div className="app_products">
                  {posts.map((post) => (
                    <Card key={post._id} post={post} />
                  ))}
                </div>
                <Pagination page={page} pages={pages} changePage={setPage} />
              </div>
            </>
          )}
        </div>
      </div>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  .app_container{
    display: flex;
    flex-direction: column;
    width: 100vw;
    align-items: center;
    .productCards_Container{
      padding-top: 2rem;
      height: calc(100vh - 80px);
      overflow: scroll;
      .paginated_products{
        display: flex;
        flex-direction: column;
        align-items: center;
        .app_products{
          width: 100%;
          padding: 2rem 13vw;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2vw;
        }
      }
    }
    .productCards_Container::-webkit-scrollbar{
        width: 0;
      }
  }
`

export default App;

