const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

const serialport = new SerialPort({ path: '/dev/serial0', baudRate: 9600 })
const parser = serialport.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
  console.log('Received data:', data);
});

serialport.open((err) => {
  if (err) {
    console.error('Error opening port:', err.message);
  } else {
    console.log('Serial port opened');
  }
});

process.on('SIGINT', () => {
  serialport.close((err) => {
    console.log('Serial port closed');
    process.exit(err ? 1 : 0);
  });
});
