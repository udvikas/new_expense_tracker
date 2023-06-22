import React, {useEffect, useState } from "react";
import "./ExpenseForm.css";
import axios from "axios";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);

  const [expenseAmount, setExpenseAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const email = localStorage.getItem("email").replace(/[@.]/g, "");
  // const emailUrl = email.replace(/[@.]/g, "");
  console.log('emailurl',email)
  const expenseSubmit = (e) => {
    e.preventDefault();
    let url =
      `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/${email}expense.json`;
    axios
      .post(url, {
        amount: expenseAmount,
        desc: description,
        category: category,
      })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        console.log("successfully send!");
      })
      .catch((err) => console.log("err", err.message));
  };

  useEffect(() => {
    let url =
      `https://ecommerce-auth-a598c-default-rtdb.firebaseio.com/${email}expense.json`;
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        } else {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        let dummyArray = [];
          for(let item in data) {
            dummyArray.push(data[item])
          }
          setExpenses(dummyArray)
      })
      .catch((err) => console.log("err", err.message));
  }, [email]);

  return (
    <>
      <form className="form1" onSubmit={expenseSubmit}>
        <div>
          <label htmlFor="number">Expense Amount</label>
          <br />
          <input
            type="number"
            id="number"
            value={expenseAmount}
            // ref={amount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="text">Description</label>
          <br />
          <input
            type="text"
            id="text"
            value={description}
            // ref={desc}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            value={category}
            // ref={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="clothes">Clothes</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <button type="submit" className="btn1">
          Add Expense
        </button>
      </form>
      <table className="my-table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Amount</th>
            <th scope="col">Desc</th>
            <th scope="col">Category</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{expense.amount}</td>
                <td>{expense.desc}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    onClick={() =>
                      setExpenses((prevExpenses) =>
                        prevExpenses.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  );
};

export default ExpenseForm;
