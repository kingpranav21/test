const fs = require('fs');
const readline = require('readline');

async function processLargeFile(filePath) {
  // Create a readable stream with a custom 64KB chunk buffer size
  const fileStream = fs.createReadStream(filePath, { 
    highWaterMark: 64 * 1024 
  });

  // Read the file line by line to prevent memory spikes
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
    // Process your line data here
    if (lineCount % 1000 === 0) {
      console.log(`Processed ${lineCount} lines...`);
    }
  }

  console.log(`Finished! Total lines: ${lineCount}`);
}

// Execute the function
processLargeFile('path/to/your/large-file.txt')
  .catch(err => console.error('Error processing file:', err));
