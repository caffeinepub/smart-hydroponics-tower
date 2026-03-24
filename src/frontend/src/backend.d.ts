import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface HydroponicsData {
    userName: string;
    plantName: string;
    systemStatus: SystemStatus;
    startDate: Time;
}
export interface SystemStatus {
    tds: bigint;
    pumpState: boolean;
    temperature: bigint;
    waterClarity: string;
}
export interface backendInterface {
    getHydroponicsData(): Promise<HydroponicsData>;
    getPlantName(): Promise<string>;
    getStartDate(): Promise<Time>;
    getSystemStatus(): Promise<SystemStatus>;
    getUserName(): Promise<string>;
    setPlantName(plantName: string): Promise<void>;
    setPumpState(pumpState: boolean): Promise<void>;
    setStartDate(startDate: Time): Promise<void>;
    setTDS(tds: bigint): Promise<void>;
    setTemperature(temperature: bigint): Promise<void>;
    setUserName(userName: string): Promise<void>;
    setWaterClarity(waterClarity: string): Promise<void>;
}
