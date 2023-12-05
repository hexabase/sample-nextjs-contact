import { REVERSED_DATE_FORMAT } from "@/common/constants/dateFormat";
import moment from "moment";

export const storage = {
  get: (key: string) => {
    if (typeof Storage !== "undefined") {
      return localStorage.getItem(key);
    }
  },
  getObject: (key: string) => {
    const data: any = storage.get(key);
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  },
  set: (key: string, obj: any) => {
    if (typeof Storage !== "undefined") {
      localStorage.setItem(key, typeof obj === "string" ? obj : JSON.stringify(obj));
    }
  },
  remove: (key: string) => {
    if (typeof Storage !== "undefined") {
      localStorage.removeItem(key);
    }
  },
};

export const session = {
  get: (key: string) => {
    if (typeof Storage !== "undefined") {
      return sessionStorage.getItem(key);
    }
  },
  set: (key: string, obj: any) => {
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem(key, typeof obj === "string" ? obj : JSON.stringify(obj));
    }
  },
  remove: (key: string) => {
    if (typeof Storage !== "undefined") {
      sessionStorage.removeItem(key);
    }
  },
};

export const formatTime = (date: any, type = REVERSED_DATE_FORMAT) => {
  return date ? moment(date).format(type) : "";
};

export const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
