const listener = (proc, onShutdownSignal) => {
  Object.keys({'SIGHUP': 1, 'SIGINT': 2, 'SIGTERM': 15 })
  .forEach(function (signal) {
    proc.on(signal, function () {
      onShutdownSignal(signal);
    });
  });
}

module.exports = listener;