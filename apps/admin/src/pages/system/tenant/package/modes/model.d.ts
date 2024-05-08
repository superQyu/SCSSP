export declare namespace ModesApi {
  type ParamsType = Record<string, any>;

  type pageItemType = ParamsType & {
    pageSize: number | undefined;
    current: number | undefined;
    keyword: string | undefined;
  };
}
