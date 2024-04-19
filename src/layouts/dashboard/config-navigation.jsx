import { useMemo } from 'react';

export function useNavData() {
  const data = useMemo(
    () => [
      {
        items: [
          { title: 'Parser', path: '/parser' },
          { title: 'Table', path: '/table' },
        ],
      },
    ],
    []
  );

  return data;
}
