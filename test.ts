(async () => {
  const text = await Deno.readTextFile('test.txt')
  console.log(JSON.stringify(text.replaceAll(';', '\\;')));
})();