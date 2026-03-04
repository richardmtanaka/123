export type Theme = 'light' | 'dark' | 'system';

export interface StepConfig {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
}

export type Route =
  | { view: 'library' }
  | { view: 'edit'; prdId: string; step: number };
