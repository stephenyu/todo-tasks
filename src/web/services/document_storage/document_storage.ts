export interface DocumentStorage {
  save(document: string): Promise<void>;
  retrieve(): Promise<string>;
}
