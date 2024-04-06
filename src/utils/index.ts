import { useEffect, useState, useRef } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = object[key];
    if (isVoid(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const resetRoute = () => (window.location.href = window.location.origin);

// 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false, 反之返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};


export const useArray = <T>(params: T []) => {
   
  const [value, setValue] = useState(params);
  

  const clear = () => {
     setValue([])
  }

  const removeIndex = (index: number) => {
      let arr = [...value];
      arr.splice(index, 1 );
      console.log('删除了哪个', arr)
      setValue(arr);
  }

  const add = (parm: T) => {
    setValue([...value, parm]);
  }



  return {
    value, 
    clear, 
    removeIndex, 
    add
  }
}
