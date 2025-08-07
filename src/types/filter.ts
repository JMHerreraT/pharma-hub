export interface WhereFilter {
  index: string;
  operator: string;
  value: string;

}

export interface OrderByFilter {
  field: string;
  direction: 'asc' | 'desc';
}
