import axios from 'axios';

const FCS_API_KEY = 'YOUR_FCS_API_KEY'; // Get your free API key from https://fcsapi.com/

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
}

const parseFCSResponse = (data: any[]): MarketData[] => {
  return data.map(item => {
    const price = parseFloat(item.c || item.price_ask || item.price_bid);
    const change = parseFloat(item.change || '0');
    const changePercent = parseFloat((item.change_percent || '0%').replace('%', ''));
    const isPositive = change >= 0;
    return {
      symbol: item.symbol,
      price,
      change,
      changePercent,
      isPositive,
    };
  });
};

export const fetchForexData = async (symbols: string[]): Promise<MarketData[]> => {
  if (!FCS_API_KEY || FCS_API_KEY === 'YOUR_FCS_API_KEY') {
    throw new Error('Please set your FCS API key in marketService.ts. Get your free API key from https://fcsapi.com/');
  }
  const symbolStr = symbols.join(',');
  const url = `https://fcsapi.com/api-v3/forex/latest?symbol=${symbolStr}&access_key=${FCS_API_KEY}`;
  const response = await axios.get(url);
  if (!response.data.status) {
    throw new Error('Failed to fetch forex data');
  }
  return parseFCSResponse(response.data.response);
};

export const fetchCryptoData = async (symbols: string[]): Promise<MarketData[]> => {
  if (!FCS_API_KEY || FCS_API_KEY === 'YOUR_FCS_API_KEY') {
    throw new Error('Please set your FCS API key in marketService.ts. Get your free API key from https://fcsapi.com/');
  }
  const symbolStr = symbols.map(s => s.replace('USD', '')).join(',');
  const url = `https://fcsapi.com/api-v3/crypto/latest?symbol=${symbolStr}&access_key=${FCS_API_KEY}`;
  const response = await axios.get(url);
  if (!response.data.status) {
    throw new Error('Failed to fetch crypto data');
  }
  return parseFCSResponse(response.data.response);
};

export const fetchMetalData = async (symbols: string[]): Promise<MarketData[]> => {
  if (!FCS_API_KEY || FCS_API_KEY === 'YOUR_FCS_API_KEY') {
    throw new Error('Please set your FCS API key in marketService.ts. Get your free API key from https://fcsapi.com/');
  }
  const symbolStr = symbols.join(',');
  const url = `https://fcsapi.com/api-v3/commodities/latest?symbol=${symbolStr}&access_key=${FCS_API_KEY}`;
  const response = await axios.get(url);
  if (!response.data.status) {
    throw new Error('Failed to fetch metal data');
  }
  return parseFCSResponse(response.data.response);
};

export const fetchOilData = async (symbols: string[]): Promise<MarketData[]> => {
  if (!FCS_API_KEY || FCS_API_KEY === 'YOUR_FCS_API_KEY') {
    throw new Error('Please set your FCS API key in marketService.ts. Get your free API key from https://fcsapi.com/');
  }
  const symbolStr = symbols.join(',');
  const url = `https://fcsapi.com/api-v3/commodities/latest?symbol=${symbolStr}&access_key=${FCS_API_KEY}`;
  const response = await axios.get(url);
  if (!response.data.status) {
    throw new Error('Failed to fetch oil data');
  }
  return parseFCSResponse(response.data.response);
};

export const fetchCFDData = async (symbols: string[]): Promise<MarketData[]> => {
  if (!FCS_API_KEY || FCS_API_KEY === 'YOUR_FCS_API_KEY') {
    throw new Error('Please set your FCS API key in marketService.ts. Get your free API key from https://fcsapi.com/');
  }
  const symbolStr = symbols.join(',');
  const url = `https://fcsapi.com/api-v3/stock/latest?symbol=${symbolStr}&access_key=${FCS_API_KEY}`;
  const response = await axios.get(url);
  if (!response.data.status) {
    throw new Error('Failed to fetch CFD data');
  }
  return parseFCSResponse(response.data.response);
};