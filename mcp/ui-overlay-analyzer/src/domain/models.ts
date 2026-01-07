export type IsoTimestamp = string;

export type MonitorEventKind =
  | "console"
  | "pageerror"
  | "request"
  | "response"
  | "requestfailed";

export interface MonitorEvent {
  seq: number;
  kind: MonitorEventKind;
  at: IsoTimestamp;
  message: string;
  data?: Record<string, unknown>;
}

export interface OverlapNode {
  selector: string;
  tag: string;
  id?: string;
  classes: string[];
  rect: { x: number; y: number; width: number; height: number };
}

export interface OverlapFinding {
  a: OverlapNode;
  b: OverlapNode;
  intersectionArea: number;
}


