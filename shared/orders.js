/* 订单平台与工作台共用的假数据。柜号、客户、单号都是演示值。 */
(function () {
  const KEY = 'bbtex.shared.v1';
  const mem = {};
  const ls = (typeof localStorage !== 'undefined') ? localStorage : {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
    setItem: function (k, v) { mem[k] = String(v); },
    removeItem: function (k) { delete mem[k]; }
  };

  const NODES = ['订单审核','ISF 申报','财务开票','转关到港','提柜完成','到仓拆柜','转装出仓','清关过境','派送签收','催款回款'];

  const FIELD_SEED = [
    {k:'consignee', demo:'DEMO Consignee'},
    {k:'recisf', demo:'09/24'},
    {k:'isdone', demo:'09/25'},
    {k:'isno', demo:'ISF-DEMO-7781'},
    {k:'isco', demo:'DEMO-ISF-01'},
    {k:'isdate', demo:'09/26'},
    {k:'isfile', demo:'isf-receipt-demo.pdf'},
    {k:'recvdoc', demo:'09/24'},
    {k:'sendte', demo:'09/27'},
    {k:'laemail', demo:'已发'},
    {k:'ordnote', demo:'DEMO 备注'},
    {k:'arr', demo:'10/04'},
    {k:'term', demo:'DEMO-TML-2'},
    {k:'an', demo:'AN-demo.pdf'},
    {k:'ted', demo:'10/04'},
    {k:'teclose', demo:'10/06'},
    {k:'teno', demo:'TE-DEMO-5520'},
    {k:'teco', demo:'DEMO-转关-01'},
    {k:'tmode', demo:'火车'},
    {k:'box', demo:'10/03 在码头'},
    {k:'av', demo:'10/02'},
    {k:'plan', demo:'10/05 09:00'},
    {k:'lfd', demo:'10/05'},
    {k:'pkdone', demo:'10/05'},
    {k:'pkco', demo:'DEMO-拖车-03'},
    {k:'destwh', demo:'DEMO-仓-LA1'},
    {k:'nostack', demo:''},
    {k:'shorttruck', demo:'DEMO-短驳-01'},
    {k:'rtn', demo:'10/06'},
    {k:'trnote', demo:''},
    {k:'trfile', demo:'transit-demo.pdf'},
    {k:'wh', demo:'DEMO-仓-LA1'},
    {k:'indate', demo:'10/04'},
    {k:'hold', demo:'不拦截'},
    {k:'holdgo', demo:''},
    {k:'devand', demo:'10/04'},
    {k:'devqty', demo:'18 / 1120'},
    {k:'shortover', demo:'0'},
    {k:'devco', demo:'DEMO-拆柜-01'},
    {k:'dv', demo:'DV-DEMO-5301'},
    {k:'trarr', demo:'10/05 08:00'},
    {k:'loadqty', demo:'18 / 1120'},
    {k:'loadco', demo:'DEMO-装柜-01'},
    {k:'split', demo:'无'},
    {k:'merge', demo:'无'},
    {k:'loadd', demo:'10/05'},
    {k:'outd', demo:'10/05'},
    {k:'gps', demo:'GPS-DEMO-118'},
    {k:'trtrans', demo:'DEMO-TR-09'},
    {k:'mode', demo:'火车'},
    {k:'seal', demo:'SEAL-DEMO-0912'},
    {k:'cd', demo:'10/03'},
    {k:'xd', demo:'10/04'},
    {k:'cval', demo:'DEMO'},
    {k:'decl', demo:'PED-DEMO-4471'},
    {k:'raild', demo:'10/04'},
    {k:'xbco', demo:'DEMO-过境行-01'},
    {k:'xbwh', demo:'DEMO-仓-MX1'},
    {k:'carno', demo:'CAR-DEMO-12'},
    {k:'seal2', demo:'SEAL-DEMO-220'},
    {k:'lock', demo:'LOCK-DEMO-19'},
    {k:'car', demo:'DEMO-派送-02'},
    {k:'depart', demo:'10/04 18:00'},
    {k:'extra', demo:'0'},
    {k:'s1', demo:'DEMO-分拨-1'},
    {k:'s1a', demo:'10/05 08:00'},
    {k:'s1b', demo:'10/05 12:00'},
    {k:'s2', demo:'DEMO-主拨-1'},
    {k:'s2a', demo:'10/06 08:00'},
    {k:'s2b', demo:'10/06 12:00'},
    {k:'etacdmex', demo:'10/06'},
    {k:'trucknt', demo:'10/05'},
    {k:'pdel', demo:'10/05'},
    {k:'dlarr', demo:'10/05'},
    {k:'unload', demo:'10/05'},
    {k:'sign', demo:'10/05'},
    {k:'ipod', demo:'pod-internal-demo.pdf'},
    {k:'upCntr', demo:''},
    {k:'ph', demo:''},
    {k:'pkpod', demo:''}
  ];

  const EXTRA_FIELDS = [
    {k:'an', l:'A/N 到货通知', sec:'tr', t:'file'},
    {k:'xd', l:'过境日期', sec:'dl'},
    {k:'dlarr', l:'到仓时间', sec:'dl'},
    {k:'unload', l:'卸货完成', sec:'dl'},
    {k:'sign', l:'签收日期', sec:'dl'},
    {k:'ipod', l:'内部 POD', sec:'dl', t:'file'}
  ];

  const ORDER_MAP = {
    isf: {recv:'recisf', co:'isco', done:'isdone', no:'isno', rf:'isfile'},
    arrive: {term:'term', arr:'arr', an:'an', teco:'teco', ted:'ted', teno:'teno'},
    pickup: {av:'av', lfd:'lfd', plan:'plan', co:'pkco', done:'pkdone', pod:'pkpod'},
    devan: {upCntr:'upCntr'},
    outbound: {dv:'dv', mode:'mode', seal:'seal', gps:'gps', out:'outd', ph:'ph'},
    customs: {cd:'cd', decl:'decl', xb:'xbco', xd:'xd'},
    deliver: {car:'car', nt:'trucknt', plan:'pdel', arr:'dlarr', sign:'sign', pod:'ipod'}
  };

  const AI_SRC = {
    bl: {name:'提单', loc:'提单第 2 页'},
    pl: {name:'装箱单', loc:'装箱单第 1 页'},
    an: {name:'到港通知', loc:'A/N 抬头'}
  };
  const GATE_KEYS = {
    recisf:1, isdone:1, arr:1, av:1, plan:1, pkdone:1, indate:1, devand:1,
    trarr:1, loadd:1, outd:1, cd:1, raild:1, carno:1, seal2:1, lock:1, depart:1, pdel:1,
    isco:1, isfile:1, term:1, an:1, lfd:1, xd:1, etacdmex:1, trucknt:1, dlarr:1, unload:1, sign:1, ipod:1
  };
  const DEMO_AI = {
    TEST2468024: [
      {k:'ordnote', label:'订单备注', value:'装箱单备注-DEMO', src:'pl', conf:'91%'},
      {k:'laemail', label:'LA出仓邮件', value:'提单已通知-DEMO', src:'bl', conf:'74%'},
      {k:'isdone', label:'ISF完成', value:'10/02', src:'bl', conf:'88%'},
      {k:'isco', label:'ISF申报公司', value:'DEMO-ISF-AI', src:'an', conf:'80%'},
      {k:'isdate', label:'ISF回执日期', value:'10/03', src:''}
    ]
  };

  const LEGACY = [
    {id:'TEST1234560', node:4, empty:'pkdone', mode:'火车', cc:'DEMO-A01', ty:'40HQ', co:'保利通', route:'LAX → MTY', lfd:'10/05', ord:'S2610-1001', mbl:'MBL-DEMO-0001', cu:'客户A', pr:'特急', eta:'10/08', inv:'INV-DEMO-0401'},
    {id:'TEST4455667', node:7, empty:'cd', mode:'卡车', cc:'DEMO-A01', ty:'40HQ', co:'总公司', route:'LAX → MTY', ord:'S2610-1012', mbl:'MBL-DEMO-0012', cu:'客户A', pr:'紧急', eta:'10/06', lfd:'09/29', inv:'INV-DEMO-0402'},
    {id:'TEST7654321', node:3, empty:'arr', mode:'火车', cc:'DEMO-B12', ty:'40HQ', co:'新通智联', route:'LGB → GDL', exc:'码头 hold · 等放行后才能预约提柜', ord:'S2610-1008', mbl:'MBL-DEMO-0008', cu:'客户B', pr:'紧急', eta:'10/11', lfd:'10/12', inv:'INV-DEMO-0403'},
    {id:'TEST5566778', node:9, empty:null, mode:'火车', cc:'DEMO-C07', ty:'40HQ', co:'总公司', route:'LAX → MTY', ord:'S2610-1022', mbl:'MBL-DEMO-0022', cu:'客户C', pr:'普通', eta:'已送达', inv:'INV-DEMO-0390', dun:'第 1 次提醒已发 10/04'},
    {id:'TEST2468024', node:1, empty:'isdone', mode:'卡车', cc:'DEMO-D03', ty:'40HQ', co:'保利通', route:'LGB → MTY', doc:'装箱单被退回', ord:'S2610-1033', mbl:'MBL-DEMO-0033', cu:'客户D', pr:'普通', eta:'10/13', inv:''},
    {id:'TEST9988776', node:1, empty:'recisf', mode:'火车', cc:'DEMO-C07', ty:'20GP', co:'总公司', route:'LAX → MTY', ord:'S2610-1015', mbl:'MBL-DEMO-0015', cu:'客户C', pr:'普通', eta:'10/15', inv:'', dt:'11:05'},
    {id:'TEST1122334', node:5, empty:'devand', mode:'火车', cc:'DEMO-B12', ty:'40HQ', co:'保利通', route:'LGB → GDL', exc:'拆柜少 3 件 · 仓库已拍照，待客服核实', ord:'S2610-1020', mbl:'MBL-DEMO-0020', cu:'客户B', pr:'紧急', eta:'10/09', lfd:'10/02', inv:'INV-DEMO-0398'},
    {id:'TEST1357913', node:6, empty:'outd', mode:'卡车', cc:'DEMO-E19', ty:'45HQ', co:'新通智联', route:'LAX → MEX', ord:'S2610-1041', mbl:'MBL-DEMO-0041', cu:'客户E', pr:'普通', eta:'10/09', lfd:'09/30', inv:'INV-DEMO-0399', dt:'10:15'},
    {id:'TEST8642086', node:8, empty:'pdel', mode:'火车', cc:'DEMO-D03', ty:'40HQ', co:'总公司', route:'LAX → MTY', fh:1, ord:'S2610-1038', mbl:'MBL-DEMO-0038', cu:'客户D', pr:'普通', eta:'今天', inv:'INV-DEMO-0394'},
    {id:'TEST7788990', node:1, empty:'isdone', mode:'卡车', cc:'DEMO-B12', ty:'20GP', co:'总公司', route:'LAX → MTY', ord:'S2610-1030', mbl:'MBL-DEMO-0030', cu:'客户B', pr:'普通', eta:'10/15', inv:'', dt:'09:40'},
    {id:'TEST3344556', node:10, empty:null, paid:1, mode:'火车', cc:'DEMO-A01', ty:'20GP', co:'总公司', route:'LAX → MTY', ord:'S2610-1025', mbl:'MBL-DEMO-0025', cu:'客户A', pr:'普通', eta:'已送达', inv:'INV-DEMO-0381'},
    {id:'TEST3141592', node:10, empty:null, paid:1, mode:'火车', cc:'DEMO-E19', ty:'40HQ', co:'保利通', route:'LGB → MTY', ord:'S2610-1019', mbl:'MBL-DEMO-0019', cu:'客户E', pr:'普通', eta:'已送达', inv:'INV-DEMO-0379'},
    {id:'TEST8899001', node:4, empty:'pkdone', mode:'火车', cc:'DEMO-F02', ty:'40HQ', co:'总公司', route:'LAX → MTY', lfd:'10/05', insp:'海关查验（CET）· 10/03', ord:'S2610-1044', mbl:'MBL-DEMO-0044', cu:'客户F', pr:'紧急', eta:'10/07', inv:'INV-DEMO-0406'},
    {id:'TEST1618033', node:0, empty:'consignee', mode:'火车', cc:'DEMO-G09', ty:'40HQ', co:'保利通', route:'LGB → GDL', doc:'A/N 到货通知未上传', ord:'S2610-1048', mbl:'MBL-DEMO-0048', cu:'客户G', pr:'特急', eta:'10/08', inv:''}
  ];

  function has(f, k) { return String(f[k] == null ? '' : f[k]).trim() !== ''; }
  function miss(f, pairs) {
    const out = [];
    pairs.forEach(function (p) { if (!has(f, p[0])) out.push({k:p[0], l:p[1]}); });
    return out;
  }
  function pos(node, label, sub, missing, note) {
    return {node:node, label:label, sub:sub || '', missing:missing || [], note:note || '', focus: (missing && missing[0]) ? missing[0].k : ''};
  }

  function derive(o) {
    const f = o.fields;
    const train = o.mode === '火车';
    const note = train ? '' : '卡车单跳过「运输中」：过境之后直接准备派送。';
    if (o.paid) return pos(10, '已回款', '', []);
    if (!o.reviewOk) return pos(0, '订单审核', '', []);
    if (!(has(f,'isco') && has(f,'isdone') && has(f,'isfile'))) {
      return pos(1, 'ISF 申报', '', miss(f, [['isco','ISF申报公司'],['isdone','ISF完成'],['isfile','ISF回执文件']]));
    }
    if (!o.finOk) return pos(2, '财务开票', '', []);
    if (!(has(f,'term') && has(f,'arr') && has(f,'an'))) {
      return pos(3, '转关到港', '', miss(f, [['term','码头'],['arr','到港日期'],['an','A/N 到货通知']]));
    }
    if (!(has(f,'av') && has(f,'lfd'))) {
      return pos(3, 'ETA确认', '', miss(f, [['av','可提柜日期'],['lfd','货柜LFD']]));
    }
    if (!has(f,'plan')) return pos(3, '可提柜', '', miss(f, [['plan','预计提柜时间']]));
    if (!has(f,'pkdone')) return pos(3, '已排期', '', miss(f, [['pkdone','提柜完成']]));
    if (!has(f,'indate')) return pos(5, '到仓拆柜', '待入仓', miss(f, [['indate','入仓日期']]));
    if (!has(f,'devand')) return pos(5, '到仓拆柜', '已入仓', miss(f, [['devand','拆柜日期']]));
    if (!has(f,'outd')) return pos(6, '转装出仓', '', miss(f, [['outd','出仓日期']]));
    const customs = miss(f, [['cd','清关完成'],['xd','过境日期']]);
    if (customs.length) return pos(7, '清关过境', has(f,'cd') ? '清关完成' : '', customs, note);
    if (train && !(has(f,'depart') && has(f,'etacdmex'))) {
      if (!has(f,'depart')) return pos(7, '过境完成', '', miss(f, [['depart','发车时间'],['etacdmex','预计到达']]), note);
      return pos(7, '运输中', '', miss(f, [['etacdmex','预计到达']]), note);
    }
    if (!(has(f,'trucknt') && has(f,'pdel'))) {
      return pos(8, '派送准备', '', miss(f, [['trucknt','卡车通知可派'],['pdel','预计派送']]), note);
    }
    if (!has(f,'dlarr')) return pos(8, '预计派送', '', miss(f, [['dlarr','到仓时间']]), note);
    if (!(has(f,'unload') && has(f,'sign') && has(f,'ipod'))) {
      return pos(8, '派送到仓', '', miss(f, [['unload','卸货完成'],['sign','签收日期'],['ipod','内部 POD']]), note);
    }
    return pos(9, '催款回款', '签收完成', [], note);
  }

  function autofill(o) {
    const f = o.fields;
    if (has(f, 'plan')) {
      if (!has(f, 'trtrans')) f.trtrans = 'DEMO-Trailer-02';
      if (!has(f, 'mode')) f.mode = o.mode || f.tmode || '火车';
    }
  }

  function seedFields(cab) {
    const v = {};
    let blank = false;
    FIELD_SEED.forEach(function (f) {
      if (cab.empty && f.k === cab.empty) blank = true;
      v[f.k] = blank ? '' : (f.demo || '');
    });
    v.mode = cab.mode || v.mode || '火车';
    if (!v.tmode) v.tmode = cab.mode || '火车';
    if (cab.lfd && v.lfd) v.lfd = cab.lfd;
    if (cab.id === 'TEST1122334') v.shortover = '少 3';
    v.boxLines = [];
    return v;
  }

  function blankOrder(cab) {
    return {
      id: cab.id,
      node: cab.node,
      legacyNode: cab.node,
      mode: cab.mode || '火车',
      cc: cab.cc || '', ty: cab.ty || '', co: cab.co || '', route: cab.route || '',
      lfd: cab.lfd || '', ord: cab.ord || '', mbl: cab.mbl || '', cu: cab.cu || '',
      pr: cab.pr || '普通', eta: cab.eta || '', inv: cab.inv || '',
      exc: cab.exc || '', insp: cab.insp || '', doc: cab.doc || '', dun: cab.dun || '',
      fh: cab.fh ? 1 : 0,
      dt: cab.dt || '',
      reviewOk: cab.node > 0,
      finOk: cab.node > 2,
      paid: !!cab.paid,
      fields: seedFields(cab),
      ai: {},
      audit: [],
      label: '', sub: '', missing: [], note: ''
    };
  }

  function applyDerived(o) {
    autofill(o);
    const d = derive(o);
    o.node = d.node;
    o.label = d.label;
    o.sub = d.sub;
    o.missing = d.missing;
    o.note = d.note;
    o.focus = d.focus;
    return d;
  }

  let db = null;

  function fresh() {
    const orders = {};
    LEGACY.forEach(function (cab) { orders[cab.id] = blankOrder(cab); });
    const fin = {2:1, 9:1};
    const todayIds = LEGACY.filter(function (c) {
      return (c.node < 10 && !fin[c.node]) || !!c.dt;
    }).map(function (c) { return c.id; });
    db = {v:1, orders:orders, todayIds:todayIds};
    Object.keys(orders).forEach(function (id) {
      applyDerived(orders[id]);
      seedAi(orders[id]);
    });
    return db;
  }

  function load() {
    try {
      const raw = ls.getItem(KEY);
      if (raw) {
        db = JSON.parse(raw);
        if (db && db.orders) return db;
      }
    } catch (e) {}
    fresh();
    persist();
    return db;
  }

  function persist() {
    ls.setItem(KEY, JSON.stringify(db));
  }

  function order(id) {
    if (!db) load();
    return db.orders[id] || null;
  }

  function hhmm() {
    const t = new Date();
    const p = function (x) { return String(x).padStart(2, '0'); };
    return p(t.getHours()) + ':' + p(t.getMinutes());
  }

  function commit(id) {
    const o = order(id);
    if (!o) return {leaveToday:false, sayAdvanced:false, message:'没有这一柜。', label:'', missing:[]};
    const beforeNode = o.node;
    const beforeSub = o.sub;
    const beforeLabel = o.label;
    if (o.exc) {
      persist();
      return {leaveToday:false, sayAdvanced:false, message:'有异常，字段已留下，状态先不往前走。', label:o.label, missing:o.missing || []};
    }
    if (o.fh && has(o.fields, 'pdel') === false && beforeNode >= 8) {
      /* 财控锁预计派送及以后，不在这里改锁的范围 */
    }
    applyDerived(o);
    const nodeMoved = o.node !== beforeNode;
    if (nodeMoved && !o.dt && db.todayIds.indexOf(id) >= 0) o.dt = hhmm();
    persist();
    let message;
    if (nodeMoved) message = '已推进到「' + o.label + '」。';
    else if (o.label !== beforeLabel || (o.sub && o.sub !== beforeSub)) {
      message = '停在「' + o.label + '」' + (o.sub ? ' · ' + o.sub : '') + '。';
      if (o.missing && o.missing.length) message += '还差' + o.missing.map(function (m) { return m.l; }).join('、') + '。';
    } else if (o.missing && o.missing.length) {
      message = '停在「' + o.label + '」。还差' + o.missing.map(function (m) { return m.l; }).join('、') + '。';
    } else message = '已保存。停在「' + o.label + '」。';
    return {leaveToday:nodeMoved, sayAdvanced:nodeMoved, message:message, label:o.label, missing:o.missing || [], note:o.note || ''};
  }

  function recompute(id) {
    const o = order(id);
    if (!o) return null;
    applyDerived(o);
    persist();
    return o;
  }

  function today() {
    if (!db) load();
    const ids = db.todayIds || [];
    const done = ids.filter(function (id) { return db.orders[id] && db.orders[id].dt; }).length;
    return {ids:ids.slice(), total:ids.length, done:done};
  }

  function gateKey(node) {
    if (node === 1) return 'isf';
    if (node === 3) return 'arrive';
    if (node === 5) return 'devan';
    if (node === 6) return 'outbound';
    if (node === 7) return 'customs';
    if (node === 8) return 'deliver';
    return '';
  }

  function writeFromOrder(c) {
    const o = order(c.id);
    if (!o || !c.v) return;
    const key = gateKey(o.node);
    const map = ORDER_MAP[key];
    if (!map) return;
    Object.keys(map).forEach(function (gk) {
      const canon = map[gk];
      if (c.v[gk]) o.fields[canon] = c.v[gk];
      else o.fields[canon] = '';
    });
    persist();
  }

  function overlay(c) {
    const o = order(c.id);
    if (!o) return c;
    c.d = o.node;
    c.dt = o.dt || '';
    c.exc = o.exc || '';
    c.fh = o.fh ? 1 : 0;
    c.mode = o.mode || c.mode;
    c.label = o.label;
    c.sub = o.sub;
    const key = gateKey(o.node);
    const map = ORDER_MAP[key];
    c.v = c.v || {};
    if (map) {
      Object.keys(map).forEach(function (gk) {
        const val = o.fields[map[gk]] || '';
        if (val) c.v[gk] = val; else delete c.v[gk];
      });
    }
    return c;
  }

  function pullUnload(c, u) {
    const o = order(c.id);
    if (!o || !u) return u;
    const f = o.fields;
    u.seal = f.seal || '';
    u.gps = f.gps || '';
    u.checkIn = f.indate || '';
    u.checkOut = f.outd || '';
    if (f.upCntr) u.upCntr = f.upCntr;
    return u;
  }

  function pushUnload(c) {
    const o = order(c.id);
    const u = c.unload;
    if (!o || !u) return;
    const f = o.fields;
    f.seal = u.seal || '';
    f.gps = u.gps || '';
    f.indate = u.checkIn || '';
    f.outd = u.checkOut || '';
    f.upCntr = u.upCntr || '';
    if (f.upCntr) {
      const pallet = String(f.devqty || '').split('/')[0].trim() || '0';
      f.devqty = pallet + ' / ' + String(f.upCntr).trim();
    }
    const boxes = u.boxes || [];
    f.split = boxes.map(function (b) { return b.trailer; }).filter(Boolean).join(', ') || '无';
    f.merge = (u.mergeCabs || []).map(function (s) { return String(s).trim(); }).filter(Boolean).join(', ') || '无';
    if (boxes[0] && boxes[0].trailer) f.dv = boxes[0].trailer;
    persist();
  }

  function isGate(k) { return !!GATE_KEYS[k]; }
  function canonKey(section, k) {
    const map = ORDER_MAP[section];
    return (map && map[k]) || k;
  }

  function seedAi(o) {
    if (!o.ai) o.ai = {};
    if (!o.audit) o.audit = [];
    (DEMO_AI[o.id] || []).forEach(function (row) {
      if (has(o.fields, row.k) || o.ai[row.k]) return;
      o.ai[row.k] = {value:row.value, src:row.src || '', conf:row.conf || '', label:row.label || row.k};
      if (row.src && AI_SRC[row.src]) {
        o.audit.push({kind:'建议', who:'AI', k:row.k, text:'AI 建议 · ' + row.label + ' · ' + AI_SRC[row.src].name + ' · ' + row.conf});
      }
    });
  }

  function fieldView(id, k) {
    const o = order(id);
    const gate = isGate(k);
    if (!o) return {state:'empty', value:'', source:'', loc:'', conf:'', gate:gate, label:k};
    const sug = o.ai && o.ai[k];
    const sourced = sug && sug.src && AI_SRC[sug.src];
    if (sourced && !has(o.fields, k)) {
      return {state:'suggest', value:sug.value, source:AI_SRC[sug.src].name, loc:AI_SRC[sug.src].loc, conf:sug.conf || '', gate:gate, label:sug.label || k};
    }
    if (has(o.fields, k)) return {state:'human', value:o.fields[k], source:'', loc:'', conf:'', gate:gate, label:(sug && sug.label) || k};
    return {state:'empty', value:'', source:'', loc:'', conf:'', gate:gate, label:(sug && sug.label) || k};
  }

  function accept(id, k, who, edited) {
    const o = order(id);
    if (!o || !who) return null;
    const sug = o.ai && o.ai[k];
    const sourced = sug && sug.src && AI_SRC[sug.src];
    if (!sourced && !edited) return null;
    const val = edited || (sourced ? sug.value : '');
    if (!val) return null;
    o.fields[k] = val;
    const label = (sug && sug.label) || k;
    if (o.ai) delete o.ai[k];
    const kind = edited ? '改' : '接受';
    o.audit = o.audit || [];
    o.audit.push({kind:kind, who:who, k:k, text:who + ' ' + kind + ' · ' + label});
    persist();
    return fieldView(id, k);
  }

  function rejectAi(id, k, who) {
    const o = order(id);
    if (!o || !who) return null;
    const view = fieldView(id, k);
    const label = view.label || k;
    if (o.ai) delete o.ai[k];
    o.fields[k] = '';
    o.audit = o.audit || [];
    o.audit.push({kind:'拒绝', who:who, k:k, text:who + ' 拒绝 · ' + label});
    persist();
    return fieldView(id, k);
  }

  function acceptAll(id, sec, who, metas) {
    const taken = [];
    (metas || []).forEach(function (m) {
      if (!m || m.sec !== sec) return;
      if (m.gate || isGate(m.k)) return;
      const view = fieldView(id, m.k);
      if (view.state !== 'suggest') return;
      if (accept(id, m.k, who, '')) taken.push(m.k);
    });
    return taken;
  }

  function paint(id) {
    const o = id ? order(id) : null;
    const t = today();
    let todayEl = document.getElementById('bbtex-today');
    if (!todayEl) {
      todayEl = document.createElement('span');
      todayEl.id = 'bbtex-today';
      const host = document.querySelector('.top') || document.body;
      host.appendChild(todayEl);
    }
    todayEl.textContent = '今日应处理 ' + t.total + ' / 已推进 ' + t.done;
    if (!o) return;
    let box = document.getElementById('bbtex-status');
    if (!box) {
      box = document.createElement('div');
      box.id = 'bbtex-status';
      const host = document.querySelector('.top') || document.body;
      host.appendChild(box);
    }
    box.innerHTML = '<span id="bbtex-label"></span><span id="bbtex-missing"></span><span id="bbtex-note"></span>';
    document.getElementById('bbtex-label').textContent = o.label + (o.sub ? ' · ' + o.sub : '');
    document.getElementById('bbtex-missing').textContent = (o.missing || []).map(function (m) { return m.l; }).join('、');
    document.getElementById('bbtex-note').textContent = o.note || '';
    const stop = document.querySelector('.stop.c .nm');
    if (stop) stop.textContent = o.label;
    const chips = document.querySelectorAll('#hero .chips .chip');
    if (chips[1]) chips[1].textContent = o.label;
    const ring = document.getElementById('ringLabel');
    if (ring) ring.textContent = t.done + '/' + t.total;
  }

  function install(ctx) {
    load();
    if (ctx.page === 'order') installOrder(ctx);
    else installWb(ctx);
  }

  function installOrder(ctx) {
    const DATA = ctx.DATA;
    DATA.forEach(overlay);
    const origRender = window.render;
    const origDetail = window.renderDetail;
    const origBind = window.bind;
    const origUnload = window.unloadModel;
    window.todayTotal = function () { return today().total; };
    window.todayDone = function () { return today().done; };
    window.inToday = function (c) { return today().ids.indexOf(c.id) >= 0; };
    window.unloadModel = function (c) {
      const fresh = !c.unload;
      const u = origUnload(c);
      if (fresh) pullUnload(c, u);
      return u;
    };
    window.render = function () {
      DATA.forEach(overlay);
      origRender();
      const id = window.curId ? window.curId() : '';
      paint(id);
    };
    function paintOrderAi(c) {
      if (!c || !ctx.NODES || !ctx.NODES[c.d] || ctx.NODES[c.d].fin) return;
      const section = ctx.NODES[c.d].k || '';
      document.querySelectorAll('#gatePanel .fv').forEach(function (fv) {
        const inp = fv.querySelector('input[data-k], select[data-k]');
        if (!inp) return;
        const canon = canonKey(section, inp.dataset.k);
        inp.dataset.canon = canon;
        const view = fieldView(c.id, canon);
        fv.dataset.state = view.state;
        fv.classList.remove('st-empty', 'st-human', 'st-suggest');
        fv.classList.add(view.state === 'suggest' ? 'st-suggest' : view.state === 'human' ? 'st-human' : 'st-empty');
        let tag = fv.querySelector('.ai-state');
        if (!tag) {
          tag = document.createElement('i');
          tag.className = 'ai-state';
          const lab = fv.querySelector('label');
          if (lab) lab.appendChild(tag);
        }
        tag.textContent = view.state === 'suggest' ? 'AI建议待确认' : view.state === 'human' ? '人工已填' : '空';
        const prev = fv.querySelector('.ai-row');
        if (prev) prev.remove();
        if (view.state === 'suggest' && view.source) {
          const row = document.createElement('div');
          row.className = 'ai-row';
          const val = document.createElement('span');
          val.className = 'ai-val';
          val.textContent = view.value;
          row.appendChild(val);
          ['ai-src', 'ai-ok', 'ai-edit', 'ai-no'].forEach(function (act) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'btn secondary sm';
            b.dataset.act = act;
            b.dataset.k = canon;
            b.textContent = act === 'ai-src' ? (view.source + ' · ' + view.conf) : act === 'ai-ok' ? '接受' : act === 'ai-edit' ? '改' : '拒绝';
            row.appendChild(b);
          });
          fv.appendChild(row);
        }
      });
      const host = document.querySelector('.op-line .tn.c .bd');
      if (!host) return;
      let loc = document.getElementById('aiLoc');
      if (!loc) {
        loc = document.createElement('div');
        loc.id = 'aiLoc';
        loc.hidden = true;
        host.appendChild(loc);
      }
      let all = document.getElementById('aiAll');
      if (!all) {
        all = document.createElement('button');
        all.type = 'button';
        all.id = 'aiAll';
        all.className = 'btn secondary sm';
        all.dataset.act = 'ai-all';
        all.textContent = '全部接受';
        host.appendChild(all);
      }
      let log = document.getElementById('aiLog');
      if (!log) {
        log = document.createElement('ul');
        log.id = 'aiLog';
        host.appendChild(log);
      }
      while (log.firstChild) log.removeChild(log.firstChild);
      const o = order(c.id);
      ((o && o.audit) || []).forEach(function (a) {
        const li = document.createElement('li');
        li.textContent = a.text;
        log.appendChild(li);
      });
    }
    window.renderDetail = function () {
      const id = window.curId ? window.curId() : '';
      const c = DATA.filter(function (x) { return x.id === id; })[0];
      if (c) overlay(c);
      origDetail();
      paint(id);
      paintOrderAi(c);
    };
    document.body.addEventListener('click', function (e) {
      const el = e.target.closest('[data-act]');
      if (!el) return;
      const act = el.dataset.act;
      if (act !== 'ai-src' && act !== 'ai-ok' && act !== 'ai-edit' && act !== 'ai-no' && act !== 'ai-all') return;
      const id = window.curId ? window.curId() : '';
      const c = DATA.filter(function (x) { return x.id === id; })[0];
      if (!c) return;
      const who = (ctx.NODES[c.d] && ctx.NODES[c.d].who) || '';
      const section = (ctx.NODES[c.d] && ctx.NODES[c.d].k) || '';
      if (act === 'ai-src') {
        const view = fieldView(id, el.dataset.k);
        const box = document.getElementById('aiLoc');
        if (box) { box.hidden = false; box.textContent = '来源位置：' + (view.loc || ''); }
        return;
      }
      if (act === 'ai-edit') {
        const view = fieldView(id, el.dataset.k);
        const inp = document.querySelector('#gatePanel [data-canon="' + el.dataset.k + '"]');
        if (inp) { inp.value = view.value || ''; inp.focus(); }
        return;
      }
      if (act === 'ai-ok') {
        const sug = ((order(id) || {}).ai || {})[el.dataset.k];
        const inp = document.querySelector('#gatePanel [data-canon="' + el.dataset.k + '"]');
        const typed = inp ? String(inp.value || '').trim() : '';
        accept(id, el.dataset.k, who, typed && (!sug || typed !== sug.value) ? typed : '');
        overlay(c);
        window.renderDetail();
        return;
      }
      if (act === 'ai-no') {
        rejectAi(id, el.dataset.k, who);
        overlay(c);
        window.renderDetail();
        return;
      }
      const metas = [];
      document.querySelectorAll('#gatePanel input[data-k], #gatePanel select[data-k]').forEach(function (inp) {
        const canon = canonKey(section, inp.dataset.k);
        metas.push({k:canon, sec:section, gate:isGate(canon)});
      });
      acceptAll(id, section, who, metas);
      overlay(c);
      window.renderDetail();
    });
    window.bind = function (c) {
      origBind(c);
      const save = document.getElementById('btnSave');
      if (save) save.onclick = function () {
        window.readGate(c);
        writeFromOrder(c);
        const res = commit(c.id);
        overlay(c);
        window.toast(res.message);
        window.render();
      };
      const usave = document.getElementById('btnUnloadSave');
      if (usave) usave.onclick = function () {
        window.readUnload(c);
        pushUnload(c);
        const res = commit(c.id);
        overlay(c);
        window.toast(res.message);
        window.render();
      };
    };
  }

  function installWb(ctx) {
    const CABS = ctx.CABS;
    const FIELDS = ctx.FIELDS;
    EXTRA_FIELDS.forEach(function (f) {
      if (!FIELDS.some(function (x) { return x.k === f.k; })) FIELDS.push(f);
    });
    function sync() {
      Object.keys(CABS).forEach(function (id) {
        const o = order(id);
        if (!o) return;
        CABS[id].node = o.node;
        CABS[id].mode = o.mode;
        CABS[id].exc = o.exc || '';
        CABS[id].fh = o.fh ? 1 : 0;
        CABS[id].label = o.label;
      });
    }
    window.vals = function (id) {
      const o = order(id);
      return o ? o.fields : null;
    };
    window.nextGate = function (id) {
      const o = order(id);
      if (!o || !o.focus) return null;
      return {g:{name:o.label, keys:[o.focus]}, key:o.focus};
    };
    window.tryAdvance = function (t, quiet) {
      const res = commit(t.id);
      sync();
      if (!quiet && res.message) window.toast(res.message);
      return !!res.leaveToday;
    };
    const origRender = window.render;
    window.render = function () {
      sync();
      origRender();
      const cur = window.current ? window.current() : null;
      const id = cur && CABS[cur.id] ? cur.id : '';
      paint(id);
    };
    sync();
  }

  function selfCheck() {
    ls.removeItem(KEY);
    fresh();
    const errs = [];
    function eq(name, cond) { if (!cond) errs.push(name); }
    const a = order('TEST2468024');
    eq('4.1 start ISF', a.label === 'ISF 申报');
    a.fields.isdone = '10/01';
    applyDerived(a);
    eq('4.1 date only stays', a.label === 'ISF 申报' && a.node === 1);
    a.fields.isco = 'DEMO-ISF-01';
    a.fields.isfile = 'isf-receipt-demo.pdf';
    applyDerived(a);
    eq('4.1 trio to finance', a.node === 2 && a.label === '财务开票');

    const b = order('TEST7654321');
    b.exc = '';
    b.fields.an = '';
    b.fields.term = '';
    b.fields.arr = '10/04';
    applyDerived(b);
    eq('4.2 arr only', b.label === '转关到港' && b.label !== '提柜完成');
    b.fields.term = 'DEMO-TML-2';
    b.fields.an = 'AN-demo.pdf';
    applyDerived(b);
    eq('4.2 leave 转关', b.label === 'ETA确认');
    b.fields.av = '10/02';
    applyDerived(b);
    eq('4.3 one side not 可提柜', b.label !== '可提柜' && b.label !== '提柜完成');
    b.fields.lfd = '10/05';
    applyDerived(b);
    eq('4.3 both 可提柜', b.label === '可提柜');
    b.fields.plan = '10/06';
    b.fields.trtrans = '';
    b.fields.mode = '';
    applyDerived(b);
    eq('4.4 已排期', b.label === '已排期' && b.fields.trtrans === 'DEMO-Trailer-02' && !!b.fields.mode && b.label !== '提柜完成');

    const w = order('TEST1357913');
    w.exc = '';
    w.fields.indate = '';
    w.fields.devand = '';
    w.fields.outd = '';
    applyDerived(w);
    eq('4.5 wait inbound', w.node === 5 && w.sub === '待入仓');
    const before = w.node;
    w.fields.indate = '10/11';
    applyDerived(w);
    eq('4.5 sub moves node stays', w.node === before && w.sub === '已入仓' && w.label === '到仓拆柜');
    w.fields.devand = '10/12';
    applyDerived(w);
    eq('4.6 leaves devan', w.node === 6 && w.label === '转装出仓');
    w.fields.trarr = '10/12 08:00';
    w.fields.loadd = '10/12';
    applyDerived(w);
    eq('4.13 not 已出仓 before outd', w.label !== '已出仓' && w.node === 6);
    w.fields.outd = '10/13';
    w.fields.cd = '';
    w.fields.xd = '';
    w.fields.raild = '10/14';
    applyDerived(w);
    eq('4.7 stay customs', w.label === '清关过境' && w.missing.some(function (m) { return m.l === '清关完成' || m.l === '过境日期'; }));
    eq('4.13 raild stays', w.label === '清关过境' && w.label !== '派送签收');
    w.fields.cd = '10/13';
    applyDerived(w);
    eq('4.7 names 过境', w.label === '清关过境' && w.missing.some(function (m) { return m.l === '过境日期'; }));
    w.fields.xd = '10/14';
    w.fields.carno = 'CAR-1';
    w.fields.seal2 = 'S2';
    w.fields.lock = 'L1';
    w.fields.depart = '10/14 18:00';
    applyDerived(w);
    eq('4.8 truck not 派送签收', w.mode === '卡车' && w.label !== '派送签收' && w.label !== '运输中');
    eq('4.10 truck note', (w.note || '').indexOf('运输中') >= 0 && (w.note || '').indexOf('跳过') >= 0);

    const tr = order('TEST1234560');
    tr.exc = '';
    tr.finOk = true;
    tr.reviewOk = true;
    tr.fields.pkdone = '10/05';
    tr.fields.indate = '10/05';
    tr.fields.devand = '10/05';
    tr.fields.outd = '10/05';
    tr.fields.cd = '10/06';
    tr.fields.xd = '10/07';
    tr.fields.depart = '';
    tr.fields.etacdmex = '';
    tr.fields.trucknt = '';
    tr.fields.pdel = '';
    tr.fields.dlarr = '';
    tr.fields.unload = '';
    tr.fields.sign = '';
    tr.fields.ipod = '';
    applyDerived(tr);
    eq('4.10 train needs depart', tr.label === '过境完成' && tr.label !== '派送签收');
    tr.fields.depart = '10/08 09:00';
    applyDerived(tr);
    eq('4.10 运输中', tr.label === '运输中');
    tr.fields.etacdmex = '10/09';
    tr.fields.carno = 'C';
    tr.fields.seal2 = 'S';
    tr.fields.lock = 'L';
    applyDerived(tr);
    eq('4.8 train four not signed', tr.label !== '派送签收');
    tr.fields.trucknt = '10/09';
    tr.fields.pdel = '10/10';
    applyDerived(tr);
    eq('4.9 预计派送', tr.label === '预计派送' && tr.node !== 9);
    tr.fields.dlarr = '10/10';
    applyDerived(tr);
    eq('4.9 派送到仓', tr.label === '派送到仓' && tr.node !== 9);
    tr.fields.unload = '10/10';
    tr.fields.sign = '10/11';
    tr.fields.ipod = 'pod-demo.pdf';
    applyDerived(tr);
    eq('4.9 then 催款', tr.label === '催款回款' && tr.sub === '签收完成');

    eq('4.12 same object', order('TEST2468024').fields === order('TEST2468024').fields);
    return errs;
  }

  const api = {
    KEY: KEY,
    NODES: NODES,
    load: load,
    reset: function () { ls.removeItem(KEY); fresh(); persist(); return db; },
    order: order,
    commit: commit,
    recompute: recompute,
    today: today,
    overlay: overlay,
    writeFromOrder: writeFromOrder,
    pullUnload: pullUnload,
    pushUnload: pushUnload,
    install: install,
    selfCheck: selfCheck,
    paint: paint,
    isGate: isGate,
    canonKey: canonKey,
    fieldView: fieldView,
    accept: accept,
    rejectAi: rejectAi,
    acceptAll: acceptAll
  };
  const root = typeof window !== 'undefined' ? window : globalThis;
  root.BBTEX = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})();
