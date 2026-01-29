"use client";

import { useRef, useState } from "react";

export default function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    model: "",
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });
  const iframeRef = useRef(null);

  const PRODUCT = {
    name: "Minimal T-shirt",
    price: 35000,
    // ✅ өөрийн production линкээ энд тавина
    link: "https://online-zahialga.vercel.app",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    // form submit хийгдэхээс өмнө хэрэглэгчид мэдэгдэл харуулна
    setStatus({ type: "loading", message: "Илгээж байна…" });

    // iframe ачаалж дуусах үед OK гэж үзээд амжилтын мессеж харуулна
    // (Apps Script "OK" буцааж байгаа тул ихэнх тохиолдолд найдвартай)
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setStatus({ type: "success", message: "✅ Амжилттай захиалга илгээгдлээ!" });
      setForm({ name: "", phone: "", address: "", quantity: 1, model: "" });

      // listener-ийг цэвэрлэнэ
      iframe.removeEventListener("load", onLoad);
    };

    iframe.addEventListener("load", onLoad);
  };

  const cardStyle = {
    maxWidth: 420,
    margin: "48px auto",
    padding: 20,
    border: "1px solid #eee",
    borderRadius: 16,
    boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: 14,
  };

  const labelStyle = { fontSize: 13, marginBottom: 6, color: "#374151" };

  const buttonStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "none",
    background: "#111827",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#f3f4f6",
    fontSize: 12,
    color: "#374151",
  };

  const statusBoxStyle = (type) => ({
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 13,
    border: "1px solid",
    borderColor:
      type === "success" ? "#bbf7d0" : type === "loading" ? "#fde68a" : "#fecaca",
    background:
      type === "success" ? "#f0fdf4" : type === "loading" ? "#fffbeb" : "#fef2f2",
    color:
      type === "success" ? "#166534" : type === "loading" ? "#92400e" : "#991b1b",
  });

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>{PRODUCT.name}</h1>
        <span style={badgeStyle}>Онлайн захиалга</span>
      </div>

      <p style={{ marginTop: 10, marginBottom: 16, color: "#111827" }}>
        Үнэ: <b>{PRODUCT.price.toLocaleString()}₮</b>
      </p>

      {/* iframe рүү submit хийгээд, хэрэглэгчийг өөр тийш үсрүүлэхгүй */}
      <iframe
        ref={iframeRef}
        name="hidden_iframe"
        title="hidden_iframe"
        style={{ display: "none" }}
      />

      <form
        method="POST"
        target="hidden_iframe"
        action="https://script.google.com/macros/s/AKfycbwzRFSEqXSzBETnTQjj9haE76etgFvOHFx-OXYzxvJYbcuoAUTIck1FkVNb1myOyduc/exec"
        onSubmit={handleSubmit}
      >
        {/* hidden fields */}
        <input type="hidden" name="date" value={new Date().toLocaleString()} />
        <input type="hidden" name="product" value={PRODUCT.name} />
        <input type="hidden" name="price" value={PRODUCT.price} />
        <input type="hidden" name="link" value={PRODUCT.link} />

        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <div style={labelStyle}>Нэр *</div>
            <input
              style={inputStyle}
              name="name"
              placeholder="Жишээ: Dulmaa"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <div style={labelStyle}>Утас *</div>
            <input
              style={inputStyle}
              name="phone"
              placeholder="Жишээ: 9999-9999"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <div style={labelStyle}>Хаяг</div>
            <input
              style={inputStyle}
              name="address"
              placeholder="Дүүрэг / Хороо / Байр…"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <div style={labelStyle}>Загвар</div>
            <input
              style={inputStyle}
              name="model"
              placeholder="Жишээ: Хар / M size"
              value={form.model}
              onChange={handleChange}
            />
          </div>

          <div>
            <div style={labelStyle}>Тоо ширхэг</div>
            <input
              style={inputStyle}
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

          <button style={buttonStyle} type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Илгээж байна…" : "Захиалах"}
          </button>
        </div>
      </form>

      {status.type !== "idle" && (
        <div style={statusBoxStyle(status.type)}>{status.message}</div>
      )}

      <div style={{ marginTop: 14, fontSize: 12, color: "#6b7280" }}>
        * Нэр, утас заавал. Захиалга Sheet дээр автоматаар бүртгэгдэнэ.
      </div>
    </div>
  );
}

