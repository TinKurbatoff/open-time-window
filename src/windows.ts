'use strict';

const USER_ONE: number[][] = [[8.5,9],[9.5,10], [15,16]];
const USER_TWO: number[][] = [[9, 10], [11, 12]];
const TEST_OUTPUT: number[][] = [[10, 11], [12, 15], [16,17]];
const END_OF_WORK: number = 18;
const START_OF_WORK: number = 7;


function main(dayStart: number, 
			  dayEnd: number, 
			  userOne: number[][], 
			  userTwo: number[][]
			  ): number[][]
{
	let MyOutput: number[] = [];  // Resulted list (flat)
	var resultList: number[][] = []; // split by pairs
	let busy: number = 0; // now is busy (start of the day!)
	let currentTime: number = 0;
	let indexStart: number = 0;
	let indexEnd: number = 0;
	let starts: number[] = [];
	let ends: number[] = [];

	// Combining list and adding the two elements - morning and evening
	const combinedArray = [[0, dayStart], ...userOne, ...userTwo, [dayEnd, 24]];
	console.log(`combinedArray: ${combinedArray}`) // DEBUG
	combinedArray.forEach( (item) => 
		{	// Building arrays of starts and ends of windows
			starts.push(item[0]);
			ends.push(item[1]);
		});
	
	// Sorting
	starts = starts.sort( (a,b) => { return a - b; });
	ends = ends.sort( (a,b) => { return a - b; });
	console.log(`starts: ${starts}`)  // Sanity check
	console.log(`ends: ${ends}`)  // Sanity check
	
	// Building open windows
	while ((indexStart < starts.length) && (indexEnd < ends.length))
	{		
		// console.log(`indexStart:${indexStart}(${ends.length}) indexEnd:${indexEnd}(${ends.length})`)  // DEBUG
		if (starts[indexStart] <= ends[indexEnd])
		{
			currentTime = starts[indexStart];
			busy += 1;  // Catch
			indexStart += 1;  // Next element starts
		}
		else if(starts[indexStart] > ends[indexEnd])
		{			
			currentTime = ends[indexEnd];
			busy -= 1;  // Release
			indexEnd += 1;  // Next element ends
		}

		// Not busy!
		if ((busy > 0) && (MyOutput.length % 2 == 0))
		{	// Start free time
			MyOutput.push(currentTime)
				
		}		
		// Busy!
		else if ((busy === 0) && (MyOutput.length % 2 == 1))
		{	// Stop free time
			MyOutput.push(currentTime)
		}

	}

	// Split result by pairs
	for(var i = 0; i < MyOutput.length; i += 2)
		{
	    resultList.push(MyOutput.slice(i, i + 2));
		}
		
	return resultList;
}


const userOne = USER_ONE.map((arr) => { return arr.slice(); });
const userTwo = USER_TWO.map((arr) => { return arr.slice(); });

console.log(`Workday: ${START_OF_WORK}-${END_OF_WORK}`);
console.log(`User //1: ${userOne}`);
console.log(`User //2: ${userTwo}`);
const result = main(START_OF_WORK, END_OF_WORK, userOne, userTwo);

console.log(`———= Result list:`);
console.log(result);
