'use strict';

const USER_ONE: number[][] = [[8.5,9],[9.5,10], [15,16]];
const USER_TWO: number[][] = [[9, 10], [11, 12]];
const TEST_OUTPUT: number[][] = [[10, 11], [12, 15], [16,17]];
const END_OF_WORK: number = 18;
const START_OF_WORK: number = 7;


function main(day_start: number, 
			  day_end: number, 
			  user_one: number[][], 
			  user_two: number[][]
			  ): number[][]
{
	let MyOutput: number[] = [];  // Resulted list (flat)
	var resultList: number[][] = []; // split by pairs
	let busy: number = 0; // now is busy (start of the day!)
	let current_time: number = 0;
	let index_start: number = 0;
	let index_end: number = 0;
	let starts: number[] = [];
	let ends: number[] = [];

	// Combining list and adding the two elements - morning and evening
	const combined_array = [[0, day_start], ...user_one, ...user_two, [day_end, 24]];
	console.log(`combined_array: ${combined_array}`) // DEBUG
	combined_array.forEach( (item) => 
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
	while ((index_start < starts.length) && (index_end < ends.length))
	{		
		// console.log(`index_start:${index_start}(${ends.length}) index_end:${index_end}(${ends.length})`)  // DEBUG
		if (starts[index_start] <= ends[index_end])
		{
			current_time = starts[index_start];
			busy += 1;  // Catch
			index_start += 1;  // Next element starts
		}
		else if(starts[index_start] > ends[index_end])
		{			
			current_time = ends[index_end];
			busy -= 1;  // Release
			index_end += 1;  // Next element ends
		}

		// Not busy!
		if ((busy > 0) && (MyOutput.length % 2 == 0))
		{	// Start free time
			MyOutput.push(current_time)
				
		}		
		// Busy!
		else if ((busy === 0) && (MyOutput.length % 2 == 1))
		{	// Stop free time
			MyOutput.push(current_time)
		}

	}

	// Split result by pairs
	for(var i = 0; i < MyOutput.length; i += 2)
		{
	    resultList.push(MyOutput.slice(i, i + 2));
		}
		
	return resultList;
}


const user_one = USER_ONE.map((arr) => { return arr.slice(); });
const user_two = USER_TWO.map((arr) => { return arr.slice(); });

console.log(`Workday: ${START_OF_WORK}-${END_OF_WORK}`);
console.log(`User //1: ${user_one}`);
console.log(`User //2: ${user_two}`);
const result = main(START_OF_WORK, END_OF_WORK, user_one, user_two);

console.log(`———= Result list:`);
console.log(result);
