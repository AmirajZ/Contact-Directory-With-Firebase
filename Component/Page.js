import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { uid } from "uid";
import { set, ref, onValue, update, remove } from "firebase/database";

export default function Page(props) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [tempUuid, setTempUuid] = useState("");
  const [dir, setDir] = useState([]);

  //Create
  const UpdateInfo = async () => {
    if (text1 === "" || text2 === "" || text3 === "") {
      alert("Every Field Is Mandatory");
    }

    if (!!tempUuid) {
      update(ref(db, `/${tempUuid}`), {
        id: tempUuid,
        name: text1,
        email: text2,
        phoneNumber: text3,
      }).catch(() => {
        alert("Something went wrong!");
      });
      setTempUuid("");
    } else {
      const uuid = uid();
      set(ref(db, `/${uuid}`), {
        id: uuid,
        name: text1,
        email: text2,
        phoneNumber: text3,
      }).catch(() => {
        alert("Something went wrong!");
      });
    }

    setText1("");
    setText2("");
    setText3("");
  };

  // Read;
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setDir([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((item) => {
          setDir((oldDir) => [...oldDir, item]);
        });
      }
    });
  }, []);

  const DeleteInfo = (id) => () => {
    remove(ref(db, `/${id}`));
  };
  const editInfo = (item) => (e) => {
    setTempUuid(item.id);
    setText1(item.name);
    setText2(item.email);
    setText3(item.phoneNumber);
  };

  const Handlechange1 = (event) => {
    setText1(event.target.value);
  };
  const Handlechange2 = (event) => {
    setText2(event.target.value);
  };
  const Handlechange3 = (event) => {
    setText3(event.target.value);
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="htmlForm-label">
            {props.as}
          </label>
          <input
            type="name"
            className="htmlForm-control"
            value={text1}
            onChange={Handlechange1}
            id="exampleInputName"
            placeholder="Enter Your Name"
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="htmlForm-label">
            {props.at}
          </label>
          <input
            type="email"
            className="htmlForm-control"
            value={text2}
            onChange={Handlechange2}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder=" Ex:abc@mail.com"
          />
          <div id="emailHelp" className="htmlForm-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="exampleInputNumber" className="htmlForm-label">
            {props.no}
          </label>
          <input
            type="int"
            className="htmlForm-control"
            value={text3}
            onChange={Handlechange3}
            id="exampleInputNumber"
            placeholder="Enter you 10 digit Number"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={UpdateInfo}>
          {!!tempUuid ? "Update" : "Create"}
        </button>
        <br />
      </form>
      {dir.map((item) => (
        <div key={item.id}>
          <div>
            <h3>{item.name}</h3>
          </div>
          <div>
            <p>{item.email}</p>
            <span>{item.phoneNumber}</span>
          </div>
          <button className="btn btn-primary" onClick={DeleteInfo(item.id)}>
            Delete
          </button>
          <button className="btn btn-primary" onClick={editInfo(item)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
