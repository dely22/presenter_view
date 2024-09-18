const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// تقديم ملفات HTML
app.use(express.static(__dirname)); // لخدمة الملفات الثابتة مثل HTML وCSS وJS

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/control.html'); // صفحة التحكم (الهاتف)
});

app.get('/display', (req, res) => {
  res.sendFile(__dirname + '/display.html'); // صفحة العرض (الشاشة الكبيرة)
});

// التعامل مع الاتصالات عبر Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');

  // استقبال الفيديو المطلوب من جهاز التحكم
  socket.on('play_video', (videoSrc) => {
    // إرسال الفيديو المطلوب إلى شاشة العرض
    io.emit('play_video', videoSrc);
  });

  // التعامل مع فصل الاتصال
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// بدء الخادم على المنفذ 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});
