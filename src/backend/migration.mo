import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";

import Text "mo:core/Text";
module {
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

  type OldActor = {
    var data : HydroponicsData;
  };

  type NewActor = {
    var data : HydroponicsData;
    var readings : [SensorReading];
  };

  public func run(old : OldActor) : NewActor {
    {
      var data = old.data;
      var readings = [] : [SensorReading];
    };
  };
};
