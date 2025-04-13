// src/services/fontService.js

import axios from 'axios';
import { saveFontsToDB } from '../utils/fontDB';
import { API_BASE_URL } from '../constants/apiConfig';

const FONT_URL = API_BASE_URL + '/fonts/list';

export const fetchAndCacheFonts = async () => {
    const response = await axios.get(FONT_URL);
  
    const fonts = (response.data || []).map((font) => ({
      family: font.family,
      category: font.category,
      variants: font.variants || [],
      subsets: font.subsets || [],
    }));
  
    await saveFontsToDB(fonts);
    return fonts;
  };
  