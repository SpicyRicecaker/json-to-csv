// CSV files are literally just spreadsheets, but instead of using
// graphical lines to separate each cell, we use "," or ";" etc.

// Gets path of json file using the command line arguments
const getJsonPath = (): string => {
  if (Deno.args[0]) {
    return Deno.args[0];
  }
  console.log(
    "Path to json file not provided!\n\nPlease provide path to json file as parameter",
  );
  Deno.exit(1);
};

const getObj = async (path: string) =>
  JSON.parse(await Deno.readTextFile(path));

const jsonCsv = <T>(objects: Array<T>): string => {
  // String builder
  let csv = "";

  // Index to store all headers
  const index: Map<string, boolean> = new Map();
  
  // For every object in object
  for (let i = 0; i < objects.length; i++) {
    // Get keys in object
    Object.keys(objects[i]).forEach((key) => {
      // If it doesn't exist in the index
      if (!index.get(key)) {
        // Add it
        index.set(key, true);
      }
    });
  }

  // Add index to csv
  index.forEach((value, key) => {
    csv = `"${csv};"`;
  });
  csv += "\n";
  
  // Now loop through every object again
  for (let i = 0; i < objects.length; i++) {
    // For each entry
    Object.entries(objects[i]).forEach(([key, value]) => {
      // If the index matches
      if (index.get(key)) {
        csv = `"${csv};"`;
      } else {
        csv = `${csv};`;
      }
    });
    csv += "\n";
  }
  
  console.log(`successfullly converted ${objects.length} cards!`)
  
  return csv
};

const main = async () => {
  // Get the path to json
  // Next read json and return object
  // Convert json obj to csv
  // Write to file
  await Deno.writeTextFile('output.csv', jsonCsv(await getObj(getJsonPath())));
};

main();
