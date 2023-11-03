import React from 'react';
import styled from "styled-components";

export default function Card({post}) {
  return (
    <CardWrapper>
        <div className="card_container">
          <div className="productImg_Container">
            <img src={post.Image} alt="" className="product_img" />
          </div>
            <h1 className="product_title">{post.Title}</h1>
            <p className="product_desc">{post.Description}</p>
            <p className="product_price">&#8377; {post.Price}</p>
        </div>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
    .card_container{
      display: flex;
      flex-direction: column;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
      width: 17rem;
      height: fit-content;
      padding: 25px 20px;
      border-radius: 5px;
      transition-property: all;
      transition-duration: 0.3s;
      cursor: pointer;
      .productImg_Container{
        width: 100%;
        /* overflow: hidden; */
        /* cursor: pointer; */
        .product_img{
          width: 100%;
          height: auto;
          /* transition-property: all;
          transition-duration: 0.5s; */
        }
        /* .product_img:hover{
          transform: scale(1.1);
        } */
      }
      .product_title{
        font-size: 23px;
        font-weight: 700;
        margin-top: 15px;
      }
      .product_desc{
        font-size: 14px;
        font-weight: 400;
        margin: 10px 0;
      }
      .product_price{
        font-size: 18px;
        font-weight: 500;
      }
    }
    .card_container:hover{
      transform: scale(1.05);
    }
`