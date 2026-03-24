import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  type SystemStatus = {
    tds : Nat;
    temperature : Int;
    pumpState : Bool;
    waterClarity : Text;
  };

  type HydroponicsData = {
    userName : Text;
    plantName : Text;
    startDate : Time.Time;
    systemStatus : SystemStatus;
  };

  let defaultStatus : SystemStatus = {
    tds = 0;
    temperature = 0;
    pumpState = false;
    waterClarity = "clear";
  };

  let defaultData : HydroponicsData = {
    userName = "Anonymous";
    plantName = "Lettuce";
    startDate = 0;
    systemStatus = defaultStatus;
  };

  var data : HydroponicsData = defaultData;

  public shared ({ caller }) func setUserName(userName : Text) : async () {
    data := {
      data with
      userName;
    };
  };

  public shared ({ caller }) func setPlantName(plantName : Text) : async () {
    data := {
      data with
      plantName;
    };
  };

  public shared ({ caller }) func setStartDate(startDate : Time.Time) : async () {
    data := {
      data with
      startDate;
    };
  };

  public shared ({ caller }) func setTDS(tds : Nat) : async () {
    let newStatus = {
      data.systemStatus with
      tds;
    };
    data := {
      data with
      systemStatus = newStatus;
    };
  };

  public shared ({ caller }) func setTemperature(temperature : Int) : async () {
    let newStatus = {
      data.systemStatus with
      temperature;
    };
    data := {
      data with
      systemStatus = newStatus;
    };
  };

  public shared ({ caller }) func setPumpState(pumpState : Bool) : async () {
    let newStatus = {
      data.systemStatus with
      pumpState;
    };
    data := {
      data with
      systemStatus = newStatus;
    };
  };

  public shared ({ caller }) func setWaterClarity(waterClarity : Text) : async () {
    let newStatus = {
      data.systemStatus with
      waterClarity;
    };
    data := {
      data with
      systemStatus = newStatus;
    };
  };

  public query ({ caller }) func getUserName() : async Text {
    data.userName;
  };

  public query ({ caller }) func getPlantName() : async Text {
    data.plantName;
  };

  public query ({ caller }) func getStartDate() : async Time.Time {
    data.startDate;
  };

  public query ({ caller }) func getSystemStatus() : async SystemStatus {
    data.systemStatus;
  };

  public query ({ caller }) func getHydroponicsData() : async HydroponicsData {
    data;
  };
};
