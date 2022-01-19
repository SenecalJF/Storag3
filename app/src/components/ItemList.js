import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Item from './Item';

const ItemList = () => {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get('/item');

        res = await Promise.all(
          res.data.map(async (item) => {
            return { ...item };
          })
        );

        setListItems(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Fragment>
      {listItems.length > 0 ? (
        <div>
          {listItems.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
      ) : (
        <>
          {' '}
          <h4>No items found</h4>
        </>
      )}
    </Fragment>
  );
};

export default ItemList;
