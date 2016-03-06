# Musical Bubbles

Musical bubbles on HTML5 Canvas "pop" in 3D audio space with sound generated in realtime using Web Audio API 

## Basic Features

Each bubble has a:
- Color that corresponds to pitch
- Radius that corresponds to volume
- X-position that corresponds to left-right panning
- Y-position that corresponds to low-frequency filter cutoff

How properties are determined:
- Bubbles are generated at random times (may want to use Web Audio API timing later)
- Position is random
- Color is one of 21 colors, each corresponding to a note in A minor across 3 octaves
- Radius changes over time in the same way for every bubble

## Plan

Phase 1: Canvas and single bubble

- Create canvas with a single bubble that flashes on and off every second in center
- Make bubble's color and position upon each flash random
- Make bubble quickly grow from a point, and then gradually shrink back to nothing
- Make bubble generate a square wave whose volume matches radius (pitch does not vary)

Phase 2: Multiple bubbles with unique pitches, panning and cutoff

- Map colors onto 21 notes and apply to bubble
- Generate a new bubble at reasonable random times
- Map bubble x-position to left-right panning
- Map bubble y-position to low-frequency filter cutoff 

Phase 3: Make bubble sound more interesting!

- TBD

## General FLow

N times per second:
- Paint the canvas background
- Determine whether to create a new bubble. If you will:	
  - Initialize the bubble with visual and audio properties. This includes initiating the associated sound. 
  - Add it to an array.
- Determine whether any existing bubbles need to be removed from the array and destroyed.
- Paint all remaining bubbles.

