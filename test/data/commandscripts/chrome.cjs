module.exports = async function (context, commands) {
  const responses = [];
  await commands.cdp.on('Network.responseReceived', params => {
    responses.push(params);
  });
  await commands.measure.start('http://127.0.0.1:3000/simple/');
  await commands.cdp.send('Network.clearBrowserCookies');
  return commands.cdp.sendAndGet('Memory.getDOMCounters');
};
