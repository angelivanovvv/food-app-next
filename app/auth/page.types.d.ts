type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export interface iProps {
  searchParams: SearchParams;
}
