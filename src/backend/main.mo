import Text "mo:core/Text";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Array "mo:core/Array";
import List "mo:core/List";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Migration "migration";

(with migration = Migration.run)
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

  type SensorReading = {
    tds : Nat;
    temperature : Int;
    turbidity : Float;
    pumpState : Bool;
    waterClarity : Text;
    timestamp : Int;
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
  var readings : [SensorReading] = [];

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

  public shared ({ caller }) func updateSensorReading(tds : Nat, temperature : Int, turbidity : Float, pumpState : Bool, waterClarity : Text) : async () {
    let newReading : SensorReading = {
      tds;
      temperature;
      turbidity;
      pumpState;
      waterClarity;
      timestamp = Time.now();
    };

    let readingsList = List.fromIter<SensorReading>(readings.values());
    readingsList.add(newReading);
    let maxReadings = 50;
    let newReadingsIter = readingsList.values();
    readings := newReadingsIter.take(maxReadings).toArray();

    data := {
      data with
      systemStatus = {
        tds;
        temperature;
        pumpState;
        waterClarity;
      };
    };
  };

  public query ({ caller }) func getReadingHistory() : async [SensorReading] {
    readings;
  };
};
