import { useState, useEffect, useCallback } from "react";
import {
  getPaths,
  approvePath,
  rejectPath,
  createPath
} from "./apiService";

// Hook générique pour fetch
const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
};

// ── ADMIN PATHS ──
export const usePathsList = () => useFetch(getPaths);

export const usePathActions = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  const run = async (fn) => {
    setLoading(true);
    try {
      const result = await fn();
      onSuccess?.();
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    approve: (id) => run(() => approvePath(id)),
    reject: (id) => run(() => rejectPath(id))
  };
};

export const useCreatePath = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  const create = async (formData) => {
    setLoading(true);
    try {
      await createPath(formData);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};
