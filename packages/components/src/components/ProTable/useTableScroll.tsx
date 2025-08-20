export const useTableScroll = (params: {
  extraHeight?: number;
  tableDom: any;
}) => {
  const { extraHeight = 0, tableDom } = params;
  if (!tableDom) return '0';

  const domOffName = [
    'ant-pro-table-search',
    'ant-pro-table-list-toolbar',
    'ant-table-thead',
  ];

  const {
    height: tableDomHeight,
    bottom,
    top,
  } = tableDom.getBoundingClientRect();
  const domsOffHeight = domOffName.reduce(
    (acc, name: string) => {
      let a =
        tableDom
          .getElementsByClassName(name)[0]
          ?.getBoundingClientRect().height || 0;
      if (name === 'ant-table-thead') a = a + (a > 50 ? 0 : 22);
      return acc + a;
    },
    0
  );
  return `${tableDomHeight - domsOffHeight - extraHeight}px`;
};
