import { useState } from 'react';
import { selectRemoteArea } from '../apis/orderCheckApi';

const useRemoteArea = (onChanged: () => void) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggle = async () => {
    try {
      setIsSelected(await selectRemoteArea(!isSelected));
      onChanged();
    } catch (error) {
      console.error(error);
    }
  };

  return { isSelected, toggle };
};

export default useRemoteArea;
