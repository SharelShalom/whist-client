import React, { useEffect, useState } from "react";
import StatsCard from "../components/common/StatsCard";
import { transactionService } from "../services/transactionService";

const Stats = () => {
  const [transactions, setTransactions] = useState([]);
  const [topFiveSell, setTopFiveSell] = useState([]);
  const [topFiveUniqueSell, setTopFiveUniqueSell] = useState([]);
  const [pastFiveDays, setPastFiveDays] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const currentTransactions = await transactionService.get();
      setTransactions(currentTransactions);
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateTopFiveSell();
    calculateTopFiveUniqueSell();
    calculatePastFiveDays();
  }, [transactions]);

  const calculateTopFiveSell = () => {
    const map = [];
    const products = [];
    for (const transaction of transactions) {
      for (const product of transaction.products) {
        map[product._id] = (map[product._id] || 0) + 1;
        products[product._id] = product;
      }
    }
    const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);
    const top5 = sorted.slice(0, 5);

    const res = [];
    for (const productId of top5) {
      res.push({
        product: products[productId],
        times: map[productId],
      });
    }
    setTopFiveSell(res);
  };

  const calculateTopFiveUniqueSell = () => {
    const map = [];
    const products = [];
    let mapUnique = [];
    for (const transaction of transactions) {
      mapUnique = [];
      for (const product of transaction.products) {
        if (!mapUnique[product._id]) {
          map[product._id] = (map[product._id] || 0) + 1;
          products[product._id] = product;
          mapUnique[product._id] = true;
        }
      }
    }
    const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);
    const top5 = sorted.slice(0, 5);

    const res = [];
    for (const productId of top5) {
      res.push({
        product: products[productId],
        times: map[productId],
      });
    }
    setTopFiveUniqueSell(res);
  };

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };

  const calculatePastFiveDays = () => {
    const map = [];
    const mapSumDays = [];
    const lastFiveDaysDate = formatDate(new Date().setDate(-5));
    for (const transaction of transactions) {
      const transactionDay = formatDate(transaction.created_at);
      if (transactionDay >= lastFiveDaysDate) {
        for (const product of transaction.products) {
            mapSumDays[transactionDay] = (mapSumDays[transactionDay] || 0) + product.price;
        }
      }
    }
    setPastFiveDays(Object.entries({...mapSumDays}));
  };

  return (
    <>
      <h1>Stats</h1>
      {/* <button onClick={calculateTopFiveSell}>Top 5 sell</button> */}
      <StatsCard
        listTopFiveSell={topFiveSell}
        listTopFiveUniqueSell={topFiveUniqueSell}
        listPastFiveDays={pastFiveDays}
      />
    </>
  );
};

export default Stats;
