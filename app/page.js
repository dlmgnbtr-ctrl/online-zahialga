"use client";

import { useEffect, useRef, useState } from "react";

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

  // 🖼️ Lightbox
  const [lightbox, setLightbox] = useState({ open: false, item: null });

  const PRODUCT = {
    name: "Minimal T-shirt",
    price: 35000,
    link: "https://online-zahialga.vercel.app",
    media: [
      // Imgur direct image
      { type: "image", src: "https://i.imgur.com/bzoSLTt.png" },
      // Нэмэлт зургууд (хүсвэл үлдээгээрэй эсвэл устгаарай)
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1400&auto=format&fit=crop",
      },
      {
        type: "image",
        src: "https://i.imgur.com/37p6LHj.jpeg",
      },
      // { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    setStatus({ type: "loading", message: "Илгээж байна…" });

    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      setStatus({ type: "success", message: "✅ Амжилттай захиалга илгээгдлээ!" });
      setForm({ name: "", phone: "", address: "", quantity: 1, model: "" });
      iframe.removeEventListener("load", onLoad);
    };

    iframe.addEventListener("load", onLoad);
  };

  const openLightbox = (item) => setLightbox({ open: true, item });
  const closeLightbox = () => setLightbox({ open: false, item: null });

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightbox.open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox.open]);

  const pageWrap = {
    minHeight: "100vh",
    padding: "32px 16px",
    background:
      "radial-gradient(900px 400px at 20% 0%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(800px 380px at 80% 20%, rgba(16,185,129,0.10), transparent 55%), #ffffff",
  };

  const cardStyle = {
    maxWidth: 460,
    margin: "24px auto",
    padding: 20,
    border: "1px solid #eee",
    borderRadius: 18,
    boxShadow: "0 10px 35px rgba(0,0,0,0.06)",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(6px)",
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
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
    transition: "transform .08s ease, opacity .2s ease",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
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

  const mediaGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
    marginBottom: 16,
  };

  const mediaTile = {
    width: "100%",
    height: 170,
    objectFit: "cover",
    borderRadius: 14,
    cursor: "zoom-in",
    border: "1px solid #eef2f7",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  };

  const lightboxOverlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.72)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 9999,
  };

  const lightboxContent = {
    width: "min(920px, 95vw)",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  const lightboxTop = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 13,
  };

  const closeBtn = {
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "#fff",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  };

  return (
    <div style={pageWrap}>
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>{PRODUCT.name}</h1>
            <div style={{ marginTop: 6, color: "#6b7280", fontSize: 12 }}>
              Нэг бараа = нэг линк. Захиалга Sheet дээр автоматаар бүртгэгдэнэ.
            </div>
          </div>
          <span style={badgeStyle}>🛒 Онлайн захиалга</span>
        </div>

        <p style={{ marginTop: 12, marginBottom: 12, color: "#111827" }}>
          Үнэ: <b>{PRODUCT.price.toLocaleString()}₮</b>
        </p>

        {/* 🖼️ Барааны зураг / 🎬 видео */}
        <div style={mediaGrid}>
          {PRODUCT.media.map((m, i) =>
            m.type === "image" ? (
              <img
                key={i}
                src={m.src}
                alt={`${PRODUCT.name} ${i + 1}`}
                style={mediaTile}
                loading="lazy"
                onClick={() => openLightbox(m)}
              />
            ) : (
              <video
                key={i}
                src={m.src}
                controls
                style={{ ...mediaTile, cursor: "default" }}
              />
            )
          )}
        </div>

        {/* iframe рүү submit хийгээд, хэрэглэгчийг өөр тийш үсрүүлэхгүй */}
        <iframe ref={iframeRef} name="hidden_iframe" title="hidden_iframe" style={{ display: "none" }} />

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

            <button
              style={{
                ...buttonStyle,
                opacity: status.type === "loading" ? 0.75 : 1,
                transform: status.type === "loading" ? "scale(0.99)" : "scale(1)",
              }}
              type="submit"
              disabled={status.type === "loading"}
            >
              {status.type === "loading" ? "Илгээж байна…" : "Захиалах"}
            </button>
          </div>
        </form>

        {status.type !== "idle" && <div style={statusBoxStyle(status.type)}>{status.message}</div>}

        <div style={{ marginTop: 14, fontSize: 12, color: "#6b7280" }}>
          * Манайхаар үйлчлүүлсэнд баярлалаа.Бид тун удахгүй тантай холбогдох болно.
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div style={lightboxOverlay} onClick={closeLightbox}>
          <div style={lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div style={lightboxTop}>
              <div>
                Томоор харах • <span style={{ opacity: 0.8 }}>Esc дарж хааж болно</span>
              </div>
              <button style={closeBtn} onClick={closeLightbox}>
                Хаах ✕
              </button>
            </div>
            {lightbox.item?.type === "image" ? (
              <img
                src={lightbox.item.src}
                alt="preview"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <video
                src={lightbox.item?.src}
                controls
                autoPlay
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
