import React, { useEffect, useRef, useState } from "react";
import "./ExpenseForm.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../ReduxTookit/expenseSlice";
import { themeActions } from "../ReduxTookit/themeSlice";

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([]);
  const [editedExpense, setEditedExpense] = useState(null);

  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenses);
  // const totalAmount = useSelector((state) => state.expense.totalAmount);
  const isToggle = useSelector((state) => state.theme.toggle);
  
  
  const [data, setData] = useState({
    amountD: "",
    descriptionD: "",
    categoryD: "",
  });
  
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const email = localStorage.getItem("email").replace(/[@.]/g, "");

  const expenseSubmit = (e) => {
    e.preventDefault();

    if (editedExpense) {
      axios
        .put(
          `https://auth-token-791de-default-rtdb.firebaseio.com/${email}expense/${editedExpense.id}.json`,
          {
            amountP: editedExpense.amount,
            descriptionP: editedExpense.description,
            categoryP: editedExpense.category,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("Expense updated successfully!");
            setEditedExpense(null); // Reset the edited expense
            // Update the expenses state with the new data
            setExpenses((prevExpenses) =>
              prevExpenses.map((expense) =>
                expense[0] === editedExpense.id
                  ? [expense[0], res.data]
                  : expense
              )
            );
            setData({
              // Reset the data state to clear the input fields
              amountD: "",
              descriptionD: "",
              categoryD: "",
            });
          } else {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          }
        })
        .catch((err) => console.log("err", err.message));
    } else {
      const amountE = data.amountD;
      const descriptionE = data.descriptionD;
      const categoryE = data.categoryD;

      e.preventDefault();
      let url = `https://auth-token-791de-default-rtdb.firebaseio.com/${email}expense.json`;
      axios
        .post(url, {
          amountP: amountE,
          descriptionP: descriptionE,
          categoryP: categoryE,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Expense added successfully!");
            // Update the expenses state with the new expense
            setExpenses((prevExpenses) => [
              ...prevExpenses,
              [res.data.name, res.data],
            ]);
            setData({
              // Reset the data state to clear the input fields
              amountD: "",
              descriptionD: "",
              categoryD: "",
            });
            // return res.data;
          } else {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          }
        })
        .then((data) => {
          console.log("Post request is successfully sent!");
          const newData = {
            amount: amountE,
            description: descriptionE,
            category: categoryE,
          };
          dispatch(
            expenseAction.addExpense({
              expenses: [newData],
              totalAmount: newData.amount,
            })
          );
        })
        .catch((err) => console.log("err", err.message));
    }
  };

  useEffect(() => {
    let url = `https://auth-token-791de-default-rtdb.firebaseio.com/${email}expense.json`;
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
        if (data) {
          setExpenses(Object.entries(data));
        }

        const retrievedData = [];
        let totalAmount = 0;
       
        for (let key in data) {
          retrievedData.push({ id: key, ...data[key] });
          totalAmount = Number(totalAmount) + Number(data[key].amount);
        }
        dispatch(
          expenseAction.addExpense({
            expenses: retrievedData,
            totalAmount: totalAmount,
          })
        );

      })
      .catch((err) => console.log("err", err.message));
  }, [email,expenses,dispatch,expenseList.length]);

  function handleDelete(ID) {
    axios
      .delete(
        `https://auth-token-791de-default-rtdb.firebaseio.com/${email}expense/${ID}.json`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("Expense deleted successfully!");
          // Remove the expense from the screen
          const updatedExpenses = expenses.filter(
            (expense) => expense[0] !== ID
          );
          setExpenses(updatedExpenses);
        } else {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        }
      })
      .catch((err) => console.log("err", err.message));
  }

  const editHandler = (idED, amountED, descriptionED, categoryED) => {
    console.log("data", idED, amountED, descriptionED, categoryED);

    const updatedExpenses = expenses.map((expense) =>
      expense[0] === idED
        ? [
            expense[0],
            {
              amountP: amountED,
              descriptionP: descriptionED,
              categoryP: categoryED,
            },
          ]
        : expense
    );
    setData({
      amountD: amountED,
      descriptionD: descriptionED,
      categoryD: categoryED,
    });

    setExpenses(updatedExpenses);
    setEditedExpense({
      id: idED,
      amount: amountED,
      description: descriptionED,
      category: categoryED,
    });

    axios
      .put(
        `https://auth-token-791de-default-rtdb.firebaseio.com/${email}expense/${idED}.json`,
        {
          amountP: amountED,
          descriptionP: descriptionED,
          categoryP: categoryED,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("Expense updated successfully!");
          // Update the expenses state with the new data
          setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
              expense[0] === idED ? [expense[0], res.data] : expense
            )
          );
          return res.data; 
        } else {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {

        let amount = data.amountP;
        let description = data.descriptionP;
        let category = data.categoryP;
        console.log("amount", amount);
        console.log("desc", description);
        console.log("category", category);
      })
      .catch((err) => console.log("err", err.message));
  };

  const inputHandler = (el) => {
    setData({
      amountD: amountRef.current.value,
      descriptionD: descriptionRef.current.value,
      categoryD: categoryRef.current.value,
    });

    if (editedExpense) {
      setEditedExpense({
        ...editedExpense,
        amount: amountRef.current.value,
        description: descriptionRef.current.value,
        category: categoryRef.current.value,
      });
    } else {
      setEditedExpense(null);
    }

    amountRef.current.value = amountRef.current.defaultValue;
    descriptionRef.current.value = descriptionRef.current.defaultValue;
    categoryRef.current.value = categoryRef.current.defaultValue;
  };

   // Calculate the total amount
   const totalAmount = expenses.reduce(
    (total, expense) => total + parseFloat(expense[1].amountP),
    0
  );
  // Calculate the updated minimum expense
  const minExpense = 10000 - totalAmount;
  
  const activateHandler = () => {
    dispatch(themeActions.activateToggle())
  }
  
  const title = ["Category", "Amount", "Description"];
  const data1 = [title];
  
  expenses.forEach((item) => {
    data1.push([item[1].categoryP, item[1].amountP, item[1].descriptionP]);
  });
  
  const creatingCSV = data1.map((row) => row.join(",")).join("\n");
  const blob = new Blob([creatingCSV]);
  
      
  
  return (
    <>
      <div className="box">
      <div className="amount">
      <h5>Total Amount: ${totalAmount}</h5>
      </div>
      <div className="premium">
      {totalAmount >= 10000 ? (
        <button className="premium-button" onClick={activateHandler}>Activate Premium</button>
      ) : (
        <div> 
      <h5>Premium Access</h5>
        <span>Req. Expense:&nbsp;<b>{minExpense}</b></span>
      </div>
      )}
      </div>
      </div>
      <form className="form1" onSubmit={expenseSubmit}>
        <div>
          <label htmlFor="number">Expense Amount</label>
          <br />
          <input
            type="number"
            id="number"
            value={data.amountD}
            ref={amountRef}
            onChange={inputHandler}
            required
          />
        </div>

        <div>
          <label htmlFor="text">Description</label>
          <br />
          <input
            type="text"
            id="text"
            value={data.descriptionD}
            ref={descriptionRef}
            onChange={inputHandler}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select
            id="category"
            value={data.categoryD}
            ref={categoryRef}
            onChange={inputHandler}
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
            <th scope="col">S.No</th>
            <th scope="col">Amount</th>
            <th scope="col">Desc</th>
            <th scope="col">Category</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense[0]}>
              <td>{index + 1}</td>
              <td>${expense[1].amountP}</td>
              <td>{expense[1].descriptionP}</td>
              <td>{expense[1].categoryP}</td>
              <td>
                <button
                  onClick={() =>
                    editHandler(
                      expense[0],
                      expense[1].amountP,
                      expense[1].descriptionP,
                      expense[1].categoryP
                    )
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(expense[0])}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dwl">
      {isToggle && <a className="csv" href={URL.createObjectURL(blob)} download="expenses.csv"  id="a2">Download CSV File</a>}
      </div>
    </>
  );
};

export default ExpenseForm;
