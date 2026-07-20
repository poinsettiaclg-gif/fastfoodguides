const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:\\Users\\Poins\\.gemini\\antigravity\\brain\\87c6438c-7f26-41c2-95ce-3574a39a38ff\\.system_generated\\logs\\transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('wrangler') && line.includes('run_command')) {
      try {
        const data = JSON.parse(line);
        if (data.tool_calls) {
          data.tool_calls.forEach(call => {
            if (call.name === 'run_command' && call.args.CommandLine.includes('wrangler')) {
              console.log(data.created_at, call.args.CommandLine);
            }
          });
        }
      } catch (e) {}
    }
  }
}

processLineByLine();
