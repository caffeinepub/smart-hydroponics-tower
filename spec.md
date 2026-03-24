# Smart Hydroponics Tower

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Welcome screen with name entry
- Home page with 6 icon buttons: Choose Plant, Plant Guide, Nutrient Settings, Growth Tracker, Harvest Timer, System Status
- Choose Plant page listing 7 Indian crops with full plant data
- Plant detail view showing seed source, germination days, sunlight, transplant timing, TDS range, turbidity levels, temperature range, harvest days, and notes
- Growth Tracker page: shows selected plant, day count, days remaining, progress bar
- Harvest Timer page: calculates harvest date from transplant date + harvest days, shows countdown
- Nutrient Settings page: TDS input with safe/warning indicators, turbidity indicator
- System Status page: pump on/off toggle, water clarity, TDS value, temperature display

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: store user name, selected plant, growth start date, system status values (TDS, temperature, pump state, turbidity)
2. Frontend: multi-page mobile app with green agriculture theme, large text, simple icons
3. All 7 plants hardcoded with full data on frontend
4. Growth tracker and harvest timer computed from stored dates
