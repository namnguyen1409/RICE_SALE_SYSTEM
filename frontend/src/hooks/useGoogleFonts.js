import { useEffect, useState, useMemo } from "react";
import { fetchAndCacheFonts } from "../services/fontService";
import { getFontsFromDB } from "../utils/fontDB";

const CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 24 giờ

/**
 * @param {Object} filters
 * @param {string} filters.searchTerm - Tên font (tuỳ chọn)
 * @param {string|null} filters.category - Loại font như 'sans-serif' (tuỳ chọn)
 * @param {string|null} filters.subset - Ngôn ngữ như 'vietnamese' (tuỳ chọn)
 */
const useGoogleFonts = ({ searchTerm = "", category = null, subset = null }) => {
  const [allFonts, setAllFonts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isCacheExpired = () => {
    const timestamp = localStorage.getItem("fonts_cache_timestamp");
    if (!timestamp) return true;
    return Date.now() - parseInt(timestamp, 10) > CACHE_EXPIRE_TIME;
  };

  useEffect(() => {
    const loadFonts = async () => {
      setLoading(true);
      try {
        if (isCacheExpired()) {
          const fonts = await fetchAndCacheFonts();
          localStorage.setItem("fonts_cache_timestamp", Date.now().toString());
          setAllFonts(fonts);
        } else {
          const fonts = await getFontsFromDB();
          setAllFonts(fonts);
        }
      } catch (err) {
        console.error("Error loading fonts:", err);
        setError("Không thể tải danh sách font");
      } finally {
        setLoading(false);
      }
    };

    loadFonts();
  }, []);

  const filteredFonts = useMemo(() => {
    return allFonts.filter((font) => {
      const matchesSearch = font.family.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category ? font.category === category : true;
      const matchesSubset = subset ? font.subsets.includes(subset) : true;
      return matchesSearch && matchesCategory && matchesSubset;
    });
  }, [allFonts, searchTerm, category, subset]);

  return { fonts: filteredFonts, loading, error };
};

export default useGoogleFonts;
