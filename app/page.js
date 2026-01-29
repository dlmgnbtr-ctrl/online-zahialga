"use client";

import { useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    model: "",
  });

  const PRODUCT = {
    name: "Minimal T-shirt",
    price: 35000,
    link: "https://yourshop.vercel.app/order-tshirt",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [status, setStatus] = useState({ loading: false, message: "" });

  // ❌ fetch ашиглах шаардлагагүй – form-оо шууд Google Apps Script рүү POST хийнэ


  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>{PRODUCT.name}</h1>
      <p>Үнэ: {PRODUCT.price.toLocaleString()}₮</p>

      <form
        method="POST"
        target="_self"
        action="https://script.google.com/macros/s/AKfycbwzRFSEqXSzBETnTQjj9haE76etgFvOHFx-OXYzxvJYbcuoAUTIck1FkVNb1myOyduc/exec"
      >
        {/* hidden fields */}
        <input type="hidden" name="date" value={new Date().toLocaleString()} />
        <input type="hidden" name="product" value={PRODUCT.name} />
        <input type="hidden" name="price" value={PRODUCT.price} />
        <input type="hidden" name="link" value={PRODUCT.link} />

        {/* user inputs */}
        <input name="name" placeholder="Нэр" required />
        <input name="phone" placeholder="Утас" required />
        <input name="address" placeholder="Хаяг" />
        <input name="model" placeholder="Загвар" />
        <input name="quantity" type="number" min="1" defaultValue={1} />

        <button type="submit">Захиалах</button>
      </form>
    </div>
  );
}


