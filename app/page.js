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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "Илгээж байна..." });

    try {
      // Google Apps Script Web App нь ихэвчлэн CORS header өгдөггүй тул
      // browser дээр fetch хийхэд "Failed to fetch" гэж унах магадлалтай.
      // mode: "no-cors" ашиглавал request явж, sheet рүү бичигдэнэ.
      // ✅ CORS-оос зайлсхийх хамгийн найдвартай арга: form-urlencoded хэлбэрээр илгээх
      const payload = new URLSearchParams({
        date: new Date().toLocaleString(),
        product: PRODUCT.name,
        link: PRODUCT.link,
        price: String(PRODUCT.price),
        name: form.name,
        phone: form.phone,
        address: form.address,
        model: form.model,
        quantity: String(Number(form.quantity || 1)),
      });

      await fetch(
        "https://script.google.com/macros/s/AKfycbwzRFSEqXSzBETnTQjj9haE76etgFvOHFx-OXYzxvJYbcuoAUTIck1FkVNb1myOyduc/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: payload.toString(),
        }
      );

      setStatus({ loading: false, message: "✅ Захиалга илгээгдлээ" });
      alert("Захиалга амжилттай илгээгдлээ");

      // хүсвэл form-оо цэвэрлэж болно
      // setForm({ name: "", phone: "", address: "", quantity: 1, model: "" });
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, message: "❌ Илгээхэд алдаа гарлаа" });
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>{PRODUCT.name}</h1>
      <p>Үнэ: {PRODUCT.price.toLocaleString()}₮</p>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Нэр" required onChange={handleChange} />
        <input name="phone" placeholder="Утас" required onChange={handleChange} />
        <input name="address" placeholder="Хаяг" onChange={handleChange} />
        <input name="model" placeholder="Загвар" onChange={handleChange} />
        <input name="quantity" type="number" min="1" onChange={handleChange} />

        <button type="submit">Захиалах</button>
      </form>
    </div>
  );
}
