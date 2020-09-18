import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id && props.match.path == "/category/:id" ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const pageNumber = props.match.params.id && props.match.path == "/page/:id" ? props.match.params.id : 1;
  const numberOfPages = products ? Math.ceil(products.length/12) : 0
  const getPages = () => {
    const pagesArray = []
    for (var i=1; i <= numberOfPages; i++) {
      pagesArray.push(i)
      console.log(i)
        }
        return pagesArray;
        }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select onInput={(e) => setSortOrder(e.target.value)} name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="highest">Price: High - Low</option>
            <option value="lowest">Price: Low - High</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.slice(0+((pageNumber-1)*12), 12+((pageNumber-1)*12)).map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">$<b>{product.price}</b></div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews === 1 ?
                      ' 1 review' : !product.numReviews ? ' No reviews'
                        : (' ' + product.numReviews + ' reviews')}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      { products ?
        <div className="page-number">
          Page: {getPages().map((page) => (
          <Link to={"/page/" + page}>{page}</Link>
        ))}
        </div> :
        <div></div>
      }

    </>
  );
}
export default HomeScreen;
