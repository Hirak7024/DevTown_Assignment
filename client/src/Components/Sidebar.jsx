import React from 'react';
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";

export default function Sidebar({
    showSideBar,
    setShowSideBar,
    setSelectedCategory,
    selectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
}) {
    const handleSelectedCategory = (event) => {
        setSelectedCategory(event.target.value);
    }
    return (
        <SidebarWrapper>
            <div className="sideBar_Container">
                <RxCross1 size={22} className='cross_icon' onClick={() => setShowSideBar(false)} />
                <div className="category_container">
                    <h1 className="category_heading">Select Category</h1>
                    <div className='categories'>
                        <label className='sidebar_label'>
                            <input
                                type="radio"
                                checked={selectedCategory === "all"}
                                name="category"
                                value="all"
                                onChange={handleSelectedCategory} />
                            <span className="checkmark">All</span>
                        </label>
                        <label className='sidebar_label'>
                            <input
                                type="radio"
                                checked={selectedCategory === "laptops"}
                                name="category"
                                value="laptops"
                                onChange={handleSelectedCategory} />
                            <span className="checkmark">Laptops</span>
                        </label>
                        <label className='sidebar_label'>
                            <input
                                type="radio"
                                checked={selectedCategory === "smartphones"}
                                name="category"
                                value="smartphones"
                                onChange={handleSelectedCategory} />
                            <span className="checkmark">Smartphones</span>
                        </label>
                    </div>
                </div>
                <div className="category_container">
                    <h1 className="category_heading">Select Price Range</h1>
                    <div className='categories'>
                        <label className='sidebar_label'>
                            <input
                                type="radio"
                                name="price_range"
                                onChange={()=>{
                                    setMinPrice(1000);
                                    setMaxPrice(10000);
                                }}
                                />
                            <span className="checkmark">Under &#8377;10,000</span>
                        </label>
                        <label className='sidebar_label'>
                            <input
                                type="radio"
                                name="price_range"
                                onChange={()=>{
                                    setMinPrice(10000);
                                    setMaxPrice(20000);
                                }}
                                />
                            <span className="checkmark">&#8377;10,000 - &#8377;20,000</span>
                        </label>
                        <label className='sidebar_label'>
                            <input
                                type="radio"
                                name="price_range"
                                onChange={()=>{
                                    setMinPrice(20000);
                                    setMaxPrice(30000);
                                }}
                                 />
                            <span className="checkmark">&#8377;20,000 - &#8377;30,000</span>
                        </label>
                    </div>
                </div>

            </div>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
.sideBar_Container{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 15rem;
    height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    /* padding: 20px 15px; */
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 80px;
    padding-left: 20px;
    z-index: 10;
    .cross_icon {
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }
    .category_container{
        display: flex;
        flex-direction: column;
        .category_heading{
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .categories{
            display: flex;
            flex-direction: column;
            gap: 7px;
            .sidebar_label{
                display: flex;
                gap: 10px;
                .checkmark{
                    font-size: 17px;
                }
            }
        }
    }
}
`;

