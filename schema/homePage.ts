import { ReactNode } from 'react';

export type CategoriesType = {
  title: string;
  icon: ReactNode;
  color: string;
  link: string;
  show: boolean;
  action: () => void;
};

export type pageType = {
  title: string;
  link: string;
  icon: string;
  subtitle: string;
};

export type sectionType = {
  sectionId: number;
  keySection: string;
  icon: string;
  route: string;
  userSectionId: number;
  customerId: string;
};
