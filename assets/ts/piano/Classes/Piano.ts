import * as Tone from 'tone';
import { Logger } from '../Log/Logger';

export class Piano {
  // Responsible for playing sounds
  pianoSampler: Tone.Sampler;

  constructor() {
    this.pianoSampler = new Tone.Sampler({
      urls: {
        "C4": "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        "A4": "A4.mp3",
        "C5": "C5.mp3",
        "D#5": "Ds5.mp3",
        "F#5": "Fs5.mp3",
        "A5": "A5.mp3",
        "C6": "C6.mp3",
      },
      release: 1,
      baseUrl: "salamander/",
    }).toDestination();
  }

  playNote(frequency: string, duration?: string): string {
    let noteAudioOn = this.pianoSampler.triggerAttack(frequency, duration);
    return frequency;
  }

  releaseNote(frequency: string, duration?: string): string {
    let noteAudioOff = this.pianoSampler.triggerRelease(frequency, duration);
    return frequency;
  }

  playSequence(line: {}[]) {
    // Stop, rewind and clear all events from the transport (from previous plays)
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    Tone.Transport.cancel();
    // const seq = new Tone.Sequence((time, note) => {
    //   this.pianoSampler.triggerAttackRelease(note, 0.1, time);
    //   // subdivisions are given as subarrays
    //   Tone.Draw.schedule(() => {
    //     console.log(time);
    //   }, time);
    // }, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);
    let mariaPitches = ["Eb4","A4","Bb4","Eb4","A4","Bb4","C5","A4","Bb4","C5","A4","Bb4","Bb4","A4","G4","F4","Eb4","F4","Bb4","Ab4","G4","F4","Eb4","F4","Eb4","G4"];
    let mariaDurations = ["8n","8n","2n + 4n","8n","4t","4t","4t","4t","4t","4t","8n","2n + 4n","8n","8n","8n","8n","8n","4n + 8n","8n","8n","8n","8n","8n","4n","4n","2n"];

    // processDurationNotation() is called inside mergeDurationsAndPitch()
    let myMelody = this.mergeDurationsAndPitch(mariaDurations, mariaPitches);

    console.log(this.pianoSampler);

    //use an array of objects as long as the object has a "time" attribute
    const part = new Tone.Part((time, value) => {
      //the value is an object which contains both the note and the duration
      this.pianoSampler.triggerAttackRelease(value.note, value.duration, time);
    }, myMelody).start(0);
    part.loop = false;
    Logger.log("ToneJS Sequence", {"sequence": part});
    Tone.Transport.start('+0.1'); // '+0.1' helps avoid pops
  }

  // this function removes the 'r' from rest notation
	processRestNotation(restNotationValue) {
		let restValue = "";
		for(let i=0; i<restNotationValue.length; i++) {
			if(restNotationValue.charAt(i)  !== "r")
				restValue += restNotationValue.charAt(i);
		}
		return restValue;
	}

  removeRestsFromDurations(duration_array) {
		let newDurations = [];
		for(let i=0; i<duration_array.length; i++) {
			if(duration_array[i].includes("r") === false) {
				newDurations.push(duration_array[i]);
			}
		}
		return newDurations;
	}

  processDurationArrayIntoSingleDuration(duration_array) {
    let single_duration = 0;
    let duration;
    let is_rest = false;
    for(let i=0; i < duration_array.length; i++) {
        single_duration = Tone.Time(single_duration + Tone.Time(duration_array[i]));
        is_rest = duration_array[i].includes("r")? true: false;
    }
    duration = single_duration.toNotation();
    if(is_rest) {
        duration = duration + "r" 
    }
    return duration;
}

  // this function adds the durations of an array to create a single duration
  processDurationArrays(durs) {
    let durations = []; 
    for(let i = 0; i < durs.length; i++) {
        let current_dur_is_array = typeof(durs[i]) === 'object'? true: false;
        if(current_dur_is_array) { 
            durations.push(this.processDurationArrayIntoSingleDuration(durs[i]))            
        } else {
            durations.push(durs[i])
        }
    }
    return durations;
  }

  processDurationNotation(duration_array, startTime) {
    let myStartTime = startTime ?? 0;
		
		let nextIsRest = false;
		let restValue = '';
		let t = Tone.Time(startTime);  // holds the current accumulated time
//		let t = Tone.TransportTime(startTime);  // holds the current accumulated time
		let t_array = [];
		t_array.push(t.toSeconds());
		let accum;  // holds the accumulated time for associated note's start time (notes and durations are parallel array)  
	    let current_duration = 0;
	    let current_duration_is_rest = false;
		// the first element is the duration of the first note, but that note starts at time zero which as
		// already been added to t_array so the value of duration_array[0]
		// is the start time of notes[1] (if there aren't any rest to consider).
		// in other words duration_array[i] is setting the start time for NEXT note (i+1 of the parallel notes array)
		// this is tricky.
		for(let i=0; i<duration_array.length; i++) {
//		    console.log('typeof(duration_array['+i+'])='+typeof(duration_array[i])+' duration_array['+i+']='+duration_array[i]);
		    let current_dur_is_array = typeof(duration_array[i]) === 'object'? true: false;
            if(current_dur_is_array) {                
                // add the values together
                for(let idx=0; idx < duration_array[i].length; idx++) {
                    let array_value = duration_array[i][idx];
                    current_duration = current_duration + Tone.Time(array_value);
                    current_duration_is_rest = duration_array[i][idx].includes("r")
                }
            } else {
                current_duration = duration_array[i];
                current_duration_is_rest = duration_array[i].includes("r");
            }

			// check if the next element in the array is a rest
			if(i<(duration_array.length-2) && typeof(duration_array[i+1] === 'string') && duration_array[i+1].includes("r") ) {
				nextIsRest = true;
			} else if(i<(duration_array.length-2) && typeof(duration_array[i+1] === 'object') && duration_array[i+1][0].includes("r") ) {
				nextIsRest = true;
			} else {
				nextIsRest = false;  
			}
	
			// if current loop isn't rest (it's a note)
			if(current_duration_is_rest === false) {
				accum = Tone.Time( t + Tone.Time(current_duration) );
				if( !nextIsRest ) {
					// add accum to t_array, reset for repeat
					t_array.push( accum.valueOf() );
				}
				t = Tone.Time( accum.valueOf() );   
			}
			else { // current loop is a rest
				restValue = this.processRestNotation(current_duration);
				accum = Tone.Time( t + Tone.Time(restValue) );
				if(i===0) { // if the first duration is a rest, clear t_array
					t_array = [];				
				}
				if( !nextIsRest ) {
					// add accum to t_array, reset for repeat
					t_array.push( accum.valueOf() );
				}
				t = Tone.Time( accum.valueOf() );
			}
			current_duration_is_rest = false;
			nextIsRest = false;
			current_duration = 0;
		}
		return t_array;
	}

  /**
 * this function merges two arrays into a single array of objects
 * used by Tone.js
 * @param {object} durations (array of strings)
 * @param {object} pitches  (array of strings)
 * @param {string} startTime (optional)
 * @returns {object} the merged data
 * @example 
 * parameters: durations, ptiches
 * let durations = ['4n','8n','8n','4n+8n','8n'];
 * let pitches = ['A4','C5','C#5','E5','G#4'];
 * let noteObjects = mergeDurationsAndPitch(durations, pitches, '0');
 * // array of noteObjects (with three attributes) used in Tone.Part(function(time, value){ }, noteObjects );
 *   time = t_array[i] - returned from processDurations(durations)
 *   note  = pitches[i]
 *   duration = durations[i]
 *
 *   NOTE:  The note and duration are unpacked in the callback function as value.note and value.duration
 *          and are used as parameter to the Tone.js function 
 *          synth.triggerAttackRelease(value.note, value.duration, time)
 */
	mergeDurationsAndPitch(durations, pitches, startTime?) {
		if(pitches == "")
			return undefined;

    let myStartTime = startTime ?? 0;
	
		let melody = [];
		let rhythmValue;
    let lastDuration;
		let time_array = this.processDurationNotation(durations, myStartTime);
		let all_durations = this.processDurationArrays(durations);
		let myDurations = this.removeRestsFromDurations(all_durations);
		let j = 0;
		for(let i=0; i<pitches.length; i++) {
			// loop thru the rhythm array until the pitch array is completed.
			j = j % time_array.length; 
			rhythmValue = time_array[j]; // j incremented at end of loop
		
//		    console.log('rhythmValue='+rhythmValue+' time_array['+j+']='+time_array[j]);
	
			// if pitches[i] is a single note just add the one note object
			if(typeof(pitches[i]) == 'string') {
				let oneNote = {};
				Object.defineProperties(oneNote, {
				  'time': {
					value: rhythmValue,
				  },
				  'note': {
					value: pitches[i],
				  },
				  'duration': {
					value: myDurations[i],
				  }
				});
				melody.push(oneNote);
			} else {
				// if pitches[i] is array do a loop over pitches[i].length
				let chordLength = pitches[i].length;
				for(let index=0; index < chordLength; index++) { 
					let oneNote = {}; 
					Object.defineProperties(oneNote, {
					  'time': {
						value: rhythmValue,
					  },
					  'note': {
						value: pitches[i][index],
					  },
					  'duration': {
						value: myDurations[i],
					  }
					});
					melody.push(oneNote);
				}
			}
	
			j++;
			lastDuration = myDurations[i];
		}
//		totalTime = rhythmValue + " + " + lastDuration;
//		totalTime = rhythmValue + Tone.Time(lastDuration).valueOf();
		let totalTime = rhythmValue + Tone.TransportTime(lastDuration).toSeconds();

//		totalTime = rhythmValue + Tone.TransportTime(lastDuration).valueOf();

//		console.log('lastDuration='+lastDuration+' rhythmValue='+rhythmValue+' Tone.TransportTime(lastDuration)='+Tone.TransportTime(lastDuration) );
//		let lastIndex = time_array.length-1;
//		console.log('totalTime='+totalTime+' time_array['+lastIndex+']='+time_array[lastIndex] );
		return melody;
	}
}