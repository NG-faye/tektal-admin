import { useState, useEffect, useCallback } from "react";
import {
  getPaths,
  createPath,
  approvePath,
  rejectPath,
  deletePath
} from "./apiService";

// ===== Hook générique pour fetch =====
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

// ===== HOOKS ADMIN =====
export const usePathsList = (token) =>
  useFetch(() => getPaths(token));

export const usePathActions = (token, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    approve: (id) => run(() => approvePath(id, token)),
    reject: (id) => run(() => rejectPath(id, token)),
    remove: (id) => run(() => deletePath(id, token))
  };
};

export const useCreatePath = (token, onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createPath(formData, token);
      onSuccess?.();
      return result;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};
