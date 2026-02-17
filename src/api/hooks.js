import { useState, useEffect, useCallback } from "react";
import {
  getPaths,
  getPathById,
  updatePath,
  deletePath,
  approvePath,
  rejectPath,
  getPublicPaths,
  createPath,
  getConnectedUsers,
} from "./apiService";

// ────────────────
// Hook générique pour GET
// ────────────────
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

// ────────────────
// PATHS
// ────────────────
export const usePathsList = () => useFetch(getPaths);
export const usePathDetail = (id) => useFetch(() => getPathById(id), [id]);
export const usePublicPaths = () => useFetch(getPublicPaths);

// ────────────────
// USERS
// ────────────────
export const useConnectedUsers = () => useFetch(getConnectedUsers);

// ────────────────
// PATH ACTIONS: approve / reject / update / delete
// ────────────────
export const usePathActions = (onSuccess) => {
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
    approve: (id) => run(() => approvePath(id)),
    reject: (id) => run(() => rejectPath(id)),
    update: (id, payload) => run(() => updatePath(id, payload)),
    remove: (id) => run(() => deletePath(id)),
  };
};

// ────────────────
// CREATE PATH
// ────────────────
export const useCreatePath = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createPath(formData);
      onSuccess?.();
      return result;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create: run, loading, error };
};
