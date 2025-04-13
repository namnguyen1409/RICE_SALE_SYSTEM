export const loadGoogleFont = (fontFamily) => {
  const linkId = "dynamic-google-font";
  const existingLink = document.getElementById(linkId);

  const formattedFont = fontFamily.replace(/ /g, "+");
  const href = `https://fonts.googleapis.com/css2?family=${formattedFont}&display=swap`;

  const applyFont = () => {
    document.body.style.fontFamily = fontFamily;
  };

  if (existingLink) {
    existingLink.href = href;
  } else {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = href;

    // Chờ font tải xong
    link.onload = applyFont;

    document.head.appendChild(link);
  }

  // Áp dụng font ngay lập tức nếu font đã được tải từ trước
  if (existingLink && existingLink.href === href) {
    applyFont();
  }
};
