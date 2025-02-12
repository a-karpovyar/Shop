import React, { useState, useEffect } from "react";
import { API_URL, API_KEY } from "../config";

import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (itemIndex === index) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    setAlertName(item.name);
  };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(item => item.id !== itemId);
        setOrder(newOrder);

    }

    const addOne = (itemId) => {
        const newOrder = order.map(item => {
            if (item.id === itemId) {
                item = { ...item, quantity: item.quantity + 1, };
                console.log(item);
            }
            return item;
        });
        setOrder(newOrder);
    }
    const removeOne = (itemId) => {
        const newOrder = order.map(item => {
            if (item.id === itemId && item.quantity !== 1) {
                item = { ...item, quantity: item.quantity - 1 }
            }
            return item;
        });
        setOrder(newOrder);
    }

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const closeAlert = ()=>{
    setAlertName('');
  }

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        data.shop && setGoods(data.shop.splice(100));
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? (
        <Preloader />
      ) : (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      )}
      {isBasketShow && <BasketList 
      order={order} 
      handleBasketShow={handleBasketShow} 
      removeFromBasket={removeFromBasket}
      addOne={addOne}
      removeOne={removeOne}
      />}
      {alertName && <Alert name={alertName} closeAlert={closeAlert}/>}
    </main>
  );
}
export { Shop };
