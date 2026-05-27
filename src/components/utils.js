export const FALLBACK_COVER = "https://placehold.co/360x480?text=No+Cover";

export function normalizeTags(tag) {
  if (Array.isArray(tag)) return tag;

  if (typeof tag === "string") {
    return tag
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function formatDate(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getLatestDate(item) {
  return item.updatedAt || item.createdAt;
}

export function getReviewCountByBookId(reviews, bookId) {
  return reviews.filter((review) => Number(review.bookId) === Number(bookId)).length;
}

export function hslFromName(name) {
  const text = (name || "?").trim() || "?";
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return `hsl(${hash % 360}, 65%, 55%)`;
}
