// 게임별 픽셀 데모(어트랙트 모드) 320×180
(function () {
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function Attract(canvas, slug, c1, c2) {
  canvas.width = 320; canvas.height = 180;
  var ctx = canvas.getContext('2d'); ctx.imageSmoothingEnabled = false;
  var raf = 0, running = false, t0 = performance.now();
  var dungeon = null;
  function newDungeon(start) {
    var cols = 40, rows = 22, g = [], rooms = [], i, j;
    for (j = 0; j < rows; j++) { g.push([]); for (i = 0; i < cols; i++) g[j].push(0); }
    for (var n = 0; n < 40 && rooms.length < 7; n++) {
      var w = 4 + (Math.random() * 6 | 0), h = 3 + (Math.random() * 4 | 0), x = 1 + (Math.random() * (cols - w - 2) | 0), y = 1 + (Math.random() * (rows - h - 2) | 0);
      if (rooms.some(function (r) { return x < r.x + r.w + 1 && x + w + 1 > r.x && y < r.y + r.h + 1 && y + h + 1 > r.y; })) continue;
      rooms.push({ x: x, y: y, w: w, h: h });
    }
    rooms.sort(function (a, b) { return a.x - b.x; });
    return { cols: cols, rows: rows, rooms: rooms, start: start };
  }
  function frame(now) {
    var t = (now - t0) / 1000;
    if (slug === 'neon-drift') {
      ctx.fillStyle = '#12021f'; ctx.fillRect(0, 0, 320, 180);
      for (var y = 0; y < 80; y += 2) { ctx.fillStyle = y % 8 < 4 ? '#2a0a3d' : '#1a0530'; ctx.fillRect(0, y, 320, 2); }
      ctx.fillStyle = c1; for (var s = 0; s < 7; s++) { var sy = 40 + s * 5; ctx.fillRect(130, sy, 60, 3 - (s > 4 ? 1 : 0)); }
      ctx.fillStyle = '#0a0014'; ctx.fillRect(0, 80, 320, 100);
      ctx.fillStyle = c2; for (var k = 0; k < 12; k++) { var z = ((k / 12 + t * .8) % 1), py = 80 + z * z * 100; ctx.fillRect(0, py | 0, 320, 1); }
      for (var l = -6; l <= 6; l++) { ctx.strokeStyle = c1; ctx.beginPath(); ctx.moveTo(160 + l * 6, 80); ctx.lineTo(160 + l * 60, 180); ctx.stroke(); }
      var cx = 160 + Math.sin(t * 1.3) * 50, ang = Math.cos(t * 1.3) * .25;
      ctx.save(); ctx.translate(cx | 0, 150); ctx.rotate(ang);
      ctx.fillStyle = '#fff'; ctx.fillRect(-14, -8, 28, 14); ctx.fillStyle = c1; ctx.fillRect(-14, -8, 28, 4); ctx.fillStyle = c2; ctx.fillRect(-12, 6, 6, 3); ctx.fillRect(6, 6, 6, 3);
      ctx.restore();
      if (Math.abs(ang) > .18) { ctx.fillStyle = 'rgba(255,255,255,.35)'; for (var p = 0; p < 6; p++) ctx.fillRect((cx - ang * 60 - p * 6) | 0, 158 + (p % 2) * 3, 3, 2); }
      ctx.fillStyle = '#fff'; ctx.font = '8px monospace'; ctx.fillText('LAP 2/3  00:' + String(Math.floor(t * 7) % 60).padStart(2, '0'), 8, 12);
    } else if (slug === 'pocket-dungeon') {
      if (!dungeon || now - dungeon.start > 7000 || now < dungeon.start) dungeon = newDungeon(now);
      var el = (now - dungeon.start) / 1000, T = 8;
      ctx.fillStyle = '#120a06'; ctx.fillRect(0, 0, 320, 180);
      ctx.fillStyle = '#1f130b'; for (var gy = 0; gy < 22; gy++) for (var gx = 0; gx < 40; gx++) if ((gx + gy) % 2) ctx.fillRect(gx * T, gy * T + 2, T, T);
      var shown = Math.min(dungeon.rooms.length, Math.floor(el * 2.2));
      for (var r = 0; r < dungeon.rooms.length - 1 && r < shown - 1; r++) {
        var a = dungeon.rooms[r], b = dungeon.rooms[r + 1], ax = a.x + (a.w >> 1), ay = a.y + (a.h >> 1), bx = b.x + (b.w >> 1), by = b.y + (b.h >> 1);
        ctx.fillStyle = '#6b4a2b'; for (var xx = Math.min(ax, bx); xx <= Math.max(ax, bx); xx++) ctx.fillRect(xx * T, ay * T + 2, T, T); for (var yy = Math.min(ay, by); yy <= Math.max(ay, by); yy++) ctx.fillRect(bx * T, yy * T + 2, T, T);
      }
      for (r = 0; r < shown; r++) { var R = dungeon.rooms[r]; ctx.fillStyle = c1; ctx.fillRect(R.x * T - 2, R.y * T, R.w * T + 4, R.h * T + 4); ctx.fillStyle = '#3b2412'; ctx.fillRect(R.x * T, R.y * T + 2, R.w * T, R.h * T); }
      if (shown >= dungeon.rooms.length && dungeon.rooms.length) { var k2 = Math.floor((el - dungeon.rooms.length / 2.2) * 3) % dungeon.rooms.length, H2 = dungeon.rooms[k2]; ctx.fillStyle = '#fff'; ctx.fillRect((H2.x + 1) * T, (H2.y + 1) * T + 2, T, T); ctx.fillStyle = c2; ctx.fillRect((H2.x + H2.w - 2) * T, (H2.y + H2.h - 2) * T + 2, T, T); }
      ctx.fillStyle = '#fff'; ctx.font = '8px monospace'; ctx.fillText('FLOOR ' + (1 + (Math.floor(now / 7000) % 30)) + '  GEN ' + shown + '/' + dungeon.rooms.length, 6, 10);
    } else {
      var phase = Math.floor(t / 2.5), within = (t % 2.5) / 2.5, rot = (phase + Math.min(1, within * 2.5 > 1 ? 1 : within * 2.5)) * Math.PI / 2;
      var e = within < .4 ? (1 - Math.cos(within / .4 * Math.PI)) / 2 : 1, ang2 = (phase + e) * Math.PI / 2;
      ctx.fillStyle = '#04140f'; ctx.fillRect(0, 0, 320, 180);
      ctx.save(); ctx.translate(160, 92); ctx.rotate(ang2);
      ctx.fillStyle = '#0d3b2e'; ctx.fillRect(-70, -70, 140, 140);
      ctx.fillStyle = c2; ctx.fillRect(-70, -70, 140, 6); ctx.fillRect(-70, 64, 140, 6); ctx.fillRect(-70, -70, 6, 140); ctx.fillRect(64, -70, 6, 140);
      ctx.fillRect(-40, -10, 50, 6); ctx.fillRect(10, 30, 40, 6); ctx.fillRect(-20, -45, 6, 30);
      ctx.fillStyle = c1; var grow = Math.min(1, (t % 10) / 8); ctx.fillRect(28, 30 - grow * 26, 4, grow * 26); if (grow > .6) { ctx.fillRect(22, 30 - grow * 26, 16, 5); }
      ctx.restore();
      var fall = (t % 2.5) / 2.5; ctx.fillStyle = '#fef08a'; ctx.fillRect(157, (40 + fall * 90) | 0, 6, 6);
      ctx.fillStyle = '#fff'; ctx.font = '8px monospace'; ctx.fillText('STAGE 07  GRAVITY ' + ['↓', '←', '↑', '→'][phase % 4], 8, 12);
    }
  }
  function loop(now) { raf = requestAnimationFrame(loop); frame(now); }
  frame(performance.now() + 3000);
  return {
    start: function () { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); },
    stop: function () { running = false; cancelAnimationFrame(raf); },
    snap: function (ms) { dungeon = newDungeon(t0 + ms - 3000 - (ms % 2000)); frame(t0 + ms); return canvas.toDataURL(); }
  };
}


window.Attract = Attract;
})();
