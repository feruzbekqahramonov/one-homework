import { useEffect, useRef, useState } from "react";

import "./App.css";
import Card from "./componentes/Card";

function App() {
  const nameRef = useRef("");
  const priceRef = useRef(0);
  const descRef = useRef("");
  const statusRef = useRef("active");
  const [pending, setPending] = useState(false);
  const [phones, setPhones] = useState([]);
  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPhones(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    setPending(true);
    const phone = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      desciription: descRef.current.value,
      status: statusRef.current.value,
      cetegory_id: 2,
    };

    fetch("https://auth-rg69.onrender.com/api/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(phone),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          let copied = JSON.parse(JSON.stringify(phones));
          copied.push(data);
          setPhones(copied);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        nameRef.current.value = "";
        priceRef.current.value = "";
        statusRef.current.value = "";
        descRef.current.value = "";
        setPending(false);
      });
  }

  function handleDelete(id) {
    let isDelete = confirm("Rostan ham ushbu mmalumotni o`chirmoqchimisiz?");
    if (isDelete && id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
        if(data.massage == "Mahsulot muvaffaqiyatli o'chirildi") {
          let copied = JSON.parse(JSON.stringify(phones))
          copied = copied.filter(el=> {
            return el.id != id
          })
          setPhones(copied)
        }
        window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="mt-4 text-center">Phones</h1>
        <form className="d-flex w-50 gap-2 flex-wrap m-auto">
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            placeholder="Enter name..."
          />
          <input
            ref={priceRef}
            type="number"
            className="form-control"
            placeholder="Enter price..."
          />

          <textarea
            ref={descRef}
            className="form-control"
            rows="3"
            placeholder="Enter description..."
          ></textarea>
          <select ref={statusRef} className="form-control">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
          <button
            disabled={pending ? true : false}
            onClick={handleClick}
            className="btn btn-primary w-100"
          >
            {pending ? "Loding..." : "Save"}
          </button>
        </form>
      </div>

      <div className="card-wrapper mt-3 d-flex flex-wrap gap-3 justify-content-center">
        {
        phones.map((el, index) => {
          return (
          <Card deleteItem = {handleDelete} key = {index} phone = {el}></Card>
          )
        })
        }

      </div>
    </>
  );
}

export default App;
