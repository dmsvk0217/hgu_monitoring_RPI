const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// 시리얼 포트 정보 설정 (포트명은 실제 사용하는 포트에 맞게 변경)
const portName = '/dev/ttyUSB0'; // 리눅스 예시
const baudRate = 9600;

// 시리얼 포트 객체 생성
const port = new SerialPort(portName, { baudRate });

// 라인 단위로 데이터를 읽어오는 파서 생성
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// 데이터 수신 이벤트 핸들러
parser.on('data', (data) => {
  console.log('Received data:', data);
  // 여기에서 데이터를 처리하거나 원하는 동작을 수행할 수 있습니다.
});

// 포트 열기
port.open((err) => {
  if (err) {
    console.error('Error opening port:', err.message);
  } else {
    console.log('Serial port opened');
  }
});

// 프로세스 종료 시 시리얼 포트 닫기
process.on('SIGINT', () => {
  port.close((err) => {
    console.log('Serial port closed');
    process.exit(err ? 1 : 0);
  });
});
