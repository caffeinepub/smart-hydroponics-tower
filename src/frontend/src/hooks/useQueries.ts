import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetHydroponicsData() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["hydroponicsData"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHydroponicsData();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserName() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userName"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getUserName();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetUserName() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userName: string) => {
      if (!actor) throw new Error("No actor");
      return actor.setUserName(userName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userName"] });
      queryClient.invalidateQueries({ queryKey: ["hydroponicsData"] });
    },
  });
}

export function useGetPlantName() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["plantName"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getPlantName();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetPlantName() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (plantName: string) => {
      if (!actor) throw new Error("No actor");
      return actor.setPlantName(plantName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plantName"] });
      queryClient.invalidateQueries({ queryKey: ["hydroponicsData"] });
    },
  });
}

export function useGetStartDate() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["startDate"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getStartDate();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSetStartDate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (startDate: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.setStartDate(startDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["startDate"] });
      queryClient.invalidateQueries({ queryKey: ["hydroponicsData"] });
    },
  });
}

export function useGetSystemStatus() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["systemStatus"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSystemStatus();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

export function useGetReadingHistory() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["readingHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReadingHistory();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3000,
  });
}

export function useSetTDS() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tds: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.setTDS(tds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemStatus"] });
      queryClient.invalidateQueries({ queryKey: ["hydroponicsData"] });
    },
  });
}

export function useSetTemperature() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (temp: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.setTemperature(temp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemStatus"] });
    },
  });
}

export function useSetPumpState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pumpState: boolean) => {
      if (!actor) throw new Error("No actor");
      return actor.setPumpState(pumpState);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemStatus"] });
      queryClient.invalidateQueries({ queryKey: ["hydroponicsData"] });
    },
  });
}

export function useSetWaterClarity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (clarity: string) => {
      if (!actor) throw new Error("No actor");
      return actor.setWaterClarity(clarity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemStatus"] });
      queryClient.invalidateQueries({ queryKey: ["hydroponicsData"] });
    },
  });
}
